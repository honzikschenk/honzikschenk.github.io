import { createClouds, type RenderState } from "./flightRenderer";
import { KIND_COLORS, type FlightWorld, type Waypoint } from "./flightWorld";

export type FlightWarning = "nofly" | "geofence" | "battery-empty" | "battery-low";

export interface SimState extends RenderState {
  insideId: string | null;
  warning: FlightWarning | null;
  tooFast: boolean;
  charging: boolean;
  active: boolean;
}

export interface InputState {
  keys: Set<string>;
  joyX: number;
  joyY: number;
  touchBoost: boolean;
}

const ACCEL = 1500;
const MAX_SPEED = 430;
const BOOST_MAX_SPEED = 720;
const SCAN_SECONDS = 0.85;
const SCAN_MAX_SPEED = 280;
const MAX_PARTICLES = 160;

export const createSimState = (world: FlightWorld, reducedMotion: boolean): SimState => ({
  drone: {
    x: world.home.x,
    y: world.home.y,
    vx: 0,
    vy: 0,
    heading: -Math.PI / 2,
    rotor: 0,
    battery: 100,
    boosting: false,
  },
  camera: { x: world.home.x, y: world.home.y, zoom: 1 },
  discovered: new Set(),
  scanId: null,
  scanProgress: 0,
  targetId: null,
  particles: [],
  clouds: createClouds(16),
  time: 0,
  reducedMotion,
  insideId: null,
  warning: null,
  tooFast: false,
  charging: false,
  active: false,
});

const readManualInput = (input: InputState) => {
  const { keys } = input;
  let x = 0;
  let y = 0;
  if (keys.has("arrowleft") || keys.has("a")) x -= 1;
  if (keys.has("arrowright") || keys.has("d")) x += 1;
  if (keys.has("arrowup") || keys.has("w")) y -= 1;
  if (keys.has("arrowdown") || keys.has("s")) y += 1;
  x += input.joyX;
  y += input.joyY;

  const magnitude = Math.hypot(x, y);
  if (magnitude > 1) {
    x /= magnitude;
    y /= magnitude;
  }

  return { x, y, boost: keys.has("shift") || input.touchBoost };
};

const autopilotInput = (sim: SimState, world: FlightWorld, target: Waypoint) => {
  const { drone } = sim;
  const dx = target.x - drone.x;
  const dy = target.y - drone.y;
  const distance = Math.hypot(dx, dy);
  if (distance < target.radius * 0.35) {
    return null;
  }

  let x = dx / distance;
  let y = dy / distance;

  // Steer around restricted airspace on the way.
  world.noFlyZones.forEach((zone) => {
    const zx = drone.x - zone.x;
    const zy = drone.y - zone.y;
    const zoneDistance = Math.hypot(zx, zy);
    const influence = zone.radius + 170;
    if (zoneDistance < influence && zoneDistance > 0) {
      const strength = ((influence - zoneDistance) / influence) * 2.2;
      x += (zx / zoneDistance) * strength;
      y += (zy / zoneDistance) * strength;
    }
  });

  const magnitude = Math.hypot(x, y) || 1;
  // Ease off near the target so the drone settles over the pad.
  const throttle = Math.min(1, distance / 260);
  return { x: (x / magnitude) * throttle, y: (y / magnitude) * throttle };
};

const spawnParticle = (sim: SimState, particle: SimState["particles"][number]) => {
  if (sim.particles.length < MAX_PARTICLES) {
    sim.particles.push(particle);
  }
};

export const spawnDiscoveryBurst = (sim: SimState, waypoint: Waypoint) => {
  const count = sim.reducedMotion ? 8 : 34;
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    const speed = 120 + Math.random() * 180;
    spawnParticle(sim, {
      x: waypoint.x,
      y: waypoint.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.9,
      maxLife: 0.9,
      size: 5,
      color: KIND_COLORS[waypoint.kind],
    });
  }
};

export const stepSim = (
  sim: SimState,
  world: FlightWorld,
  input: InputState,
  dt: number,
  onDiscover: (waypoint: Waypoint) => void,
  onAutopilotArrive: () => void
) => {
  const { drone } = sim;
  sim.time += dt;

  sim.clouds.forEach((cloud) => {
    cloud.x += cloud.speed * dt * (sim.reducedMotion ? 0.3 : 1);
  });

  let thrustX = 0;
  let thrustY = 0;
  let boost = false;

  if (sim.active) {
    const manual = readManualInput(input);
    if (Math.hypot(manual.x, manual.y) > 0.05) {
      sim.targetId = null;
      thrustX = manual.x;
      thrustY = manual.y;
      boost = manual.boost;
    } else if (sim.targetId) {
      const target = world.waypoints.find((waypoint) => waypoint.id === sim.targetId);
      const steer = target ? autopilotInput(sim, world, target) : null;
      if (steer) {
        thrustX = steer.x;
        thrustY = steer.y;
      } else {
        sim.targetId = null;
        onAutopilotArrive();
      }
    }
  }

  const thrust = Math.hypot(thrustX, thrustY);
  const batteryEmpty = drone.battery <= 0;
  const powerScale = batteryEmpty ? 0.4 : 1;
  boost = boost && !batteryEmpty && thrust > 0.05;
  drone.boosting = boost;
  const maxSpeed = (boost ? BOOST_MAX_SPEED : MAX_SPEED) * powerScale;
  const accel = ACCEL * (boost ? 1.4 : 1) * powerScale;

  // Thrust minus linear drag gives a terminal velocity of maxSpeed.
  let ax = thrustX * accel - drone.vx * (accel / maxSpeed);
  let ay = thrustY * accel - drone.vy * (accel / maxSpeed);
  if (thrust < 0.05) {
    ax -= drone.vx * 2.2;
    ay -= drone.vy * 2.2;
  }

  let warning: FlightWarning | null = null;
  let batteryDrain = 0.12 + thrust * 0.75 + (boost ? 1.8 : 0);

  for (const zone of world.noFlyZones) {
    const dx = drone.x - zone.x;
    const dy = drone.y - zone.y;
    const distance = Math.hypot(dx, dy);
    if (distance < zone.radius && distance > 0) {
      const depth = 1 - distance / zone.radius;
      ax += (dx / distance) * (2400 + depth * 3000);
      ay += (dy / distance) * (2400 + depth * 3000);
      batteryDrain += 5;
      warning = "nofly";
    }
  }

  const { bounds } = world;
  const fenceForce = 9;
  if (drone.x < bounds.minX) ax += (bounds.minX - drone.x) * fenceForce;
  if (drone.x > bounds.maxX) ax += (bounds.maxX - drone.x) * fenceForce;
  if (drone.y < bounds.minY) ay += (bounds.minY - drone.y) * fenceForce;
  if (drone.y > bounds.maxY) ay += (bounds.maxY - drone.y) * fenceForce;
  const outside =
    drone.x < bounds.minX || drone.x > bounds.maxX || drone.y < bounds.minY || drone.y > bounds.maxY;
  if (outside && !warning) {
    warning = "geofence";
  }

  drone.vx += ax * dt;
  drone.vy += ay * dt;
  drone.x += drone.vx * dt;
  drone.y += drone.vy * dt;

  const speed = Math.hypot(drone.vx, drone.vy);
  if (speed > 25) {
    const desired = Math.atan2(drone.vy, drone.vx);
    let delta = desired - drone.heading;
    delta = Math.atan2(Math.sin(delta), Math.cos(delta));
    drone.heading += delta * Math.min(1, dt * 6);
  }
  drone.rotor += dt * (40 + thrust * 30);

  const homeDistance = Math.hypot(drone.x - world.home.x, drone.y - world.home.y);
  sim.charging = sim.active && homeDistance < world.home.radius;
  if (sim.active) {
    drone.battery = sim.charging
      ? Math.min(100, drone.battery + dt * 28)
      : Math.max(0, drone.battery - dt * batteryDrain);
  }

  if (!warning && sim.active) {
    if (drone.battery <= 0) warning = "battery-empty";
    else if (drone.battery < 20 && !sim.charging) warning = "battery-low";
  }
  sim.warning = warning;

  if (sim.active && thrust > 0.05 && Math.random() < (sim.reducedMotion ? 0.15 : 0.7)) {
    const back = drone.heading + Math.PI + (Math.random() - 0.5) * 0.8;
    spawnParticle(sim, {
      x: drone.x + Math.cos(back) * 30,
      y: drone.y + Math.sin(back) * 30,
      vx: Math.cos(back) * 90 + drone.vx * 0.2,
      vy: Math.sin(back) * 90 + drone.vy * 0.2,
      life: 0.5,
      maxLife: 0.5,
      size: boost ? 6 : 4,
      color: boost ? "#fbbf63" : "#9fdcff",
    });
  }

  for (let i = sim.particles.length - 1; i >= 0; i -= 1) {
    const particle = sim.particles[i];
    particle.life -= dt;
    if (particle.life <= 0) {
      sim.particles.splice(i, 1);
      continue;
    }
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vx *= 1 - dt * 2.5;
    particle.vy *= 1 - dt * 2.5;
  }

  let insideWaypoint: Waypoint | null = null;
  let insideDistance = Number.POSITIVE_INFINITY;
  for (const waypoint of world.waypoints) {
    const distance = Math.hypot(waypoint.x - drone.x, waypoint.y - drone.y);
    if (distance < waypoint.radius && distance < insideDistance) {
      insideWaypoint = waypoint;
      insideDistance = distance;
    }
  }
  sim.insideId = insideWaypoint?.id ?? null;
  sim.tooFast = false;

  if (sim.active && insideWaypoint && !sim.discovered.has(insideWaypoint.id)) {
    if (sim.scanId !== insideWaypoint.id) {
      sim.scanId = insideWaypoint.id;
      sim.scanProgress = 0;
    }
    if (speed <= SCAN_MAX_SPEED) {
      sim.scanProgress = Math.min(1, sim.scanProgress + dt / SCAN_SECONDS);
    } else {
      sim.tooFast = true;
    }
    if (sim.scanProgress >= 1) {
      sim.discovered.add(insideWaypoint.id);
      sim.scanId = null;
      sim.scanProgress = 0;
      spawnDiscoveryBurst(sim, insideWaypoint);
      onDiscover(insideWaypoint);
    }
  } else if (!insideWaypoint) {
    sim.scanId = null;
    sim.scanProgress = 0;
  }

  const lead = sim.reducedMotion ? 0 : 0.32;
  const camTargetX = drone.x + drone.vx * lead;
  const camTargetY = drone.y + drone.vy * lead;
  const follow = 1 - Math.exp(-dt * 4.5);
  sim.camera.x += (camTargetX - sim.camera.x) * follow;
  sim.camera.y += (camTargetY - sim.camera.y) * follow;
};

export const findGuidanceTarget = (sim: SimState, world: FlightWorld) => {
  if (sim.targetId) {
    return world.waypoints.find((waypoint) => waypoint.id === sim.targetId);
  }

  let nearest: Waypoint | undefined;
  let nearestDistance = Number.POSITIVE_INFINITY;
  world.waypoints.forEach((waypoint) => {
    if (sim.discovered.has(waypoint.id)) {
      return;
    }
    const distance = Math.hypot(waypoint.x - sim.drone.x, waypoint.y - sim.drone.y);
    if (distance < nearestDistance) {
      nearest = waypoint;
      nearestDistance = distance;
    }
  });
  return nearest;
};
