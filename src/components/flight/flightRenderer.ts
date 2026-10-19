import { KIND_COLORS, KIND_LABELS, type FlightWorld, type Waypoint } from "./flightWorld";

export interface DroneState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  heading: number;
  rotor: number;
  battery: number;
  boosting: boolean;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export interface Cloud {
  x: number;
  y: number;
  scale: number;
  speed: number;
  alpha: number;
}

export interface Camera {
  x: number;
  y: number;
  zoom: number;
}

export interface RenderState {
  drone: DroneState;
  camera: Camera;
  discovered: Set<string>;
  scanId: string | null;
  scanProgress: number;
  targetId: string | null;
  particles: Particle[];
  clouds: Cloud[];
  time: number;
  reducedMotion: boolean;
}

const MONO_FONT = '"IBM Plex Mono", "SF Mono", monospace';
const CLOUD_SPAN = 3200;
const CLOUD_PARALLAX = 1.35;

let cloudSprite: HTMLCanvasElement | null = null;

const getCloudSprite = () => {
  if (cloudSprite) {
    return cloudSprite;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 360;
  canvas.height = 200;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return canvas;
  }

  const puffs: [number, number, number][] = [
    [120, 110, 70],
    [180, 90, 82],
    [245, 112, 66],
    [160, 130, 60],
    [215, 135, 58],
  ];
  puffs.forEach(([x, y, r]) => {
    const gradient = ctx.createRadialGradient(x - r * 0.25, y - r * 0.3, r * 0.1, x, y, r);
    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(0.6, "rgba(225,240,255,0.45)");
    gradient.addColorStop(1, "rgba(200,225,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });

  cloudSprite = canvas;
  return canvas;
};

export const createClouds = (count: number): Cloud[] =>
  Array.from({ length: count }, (_, index) => ({
    x: ((index * 977) % CLOUD_SPAN) - CLOUD_SPAN / 2,
    y: ((index * 613) % CLOUD_SPAN) - CLOUD_SPAN / 2,
    scale: 0.8 + ((index * 37) % 10) / 10,
    speed: 10 + ((index * 13) % 18),
    alpha: 0.22 + ((index * 7) % 5) * 0.05,
  }));

const wrap = (value: number, span: number) => ((((value + span / 2) % span) + span) % span) - span / 2;

const drawGround = (
  ctx: CanvasRenderingContext2D,
  world: FlightWorld,
  view: { minX: number; minY: number; maxX: number; maxY: number }
) => {
  const { bounds } = world;

  ctx.fillStyle = "#0a1d2c";
  ctx.fillRect(bounds.minX, bounds.minY, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);

  world.fields.forEach((field) => {
    const reach = Math.max(field.w, field.h);
    if (
      field.x + reach < view.minX ||
      field.x - reach > view.maxX ||
      field.y + reach < view.minY ||
      field.y - reach > view.maxY
    ) {
      return;
    }

    ctx.save();
    ctx.translate(field.x, field.y);
    ctx.rotate(field.angle);
    ctx.fillStyle = `hsla(${field.hue}, 32%, 22%, 0.55)`;
    ctx.fillRect(-field.w / 2, -field.h / 2, field.w, field.h);
    if (field.rows) {
      ctx.strokeStyle = `hsla(${field.hue}, 40%, 34%, 0.35)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let rowY = -field.h / 2 + 10; rowY < field.h / 2; rowY += 14) {
        ctx.moveTo(-field.w / 2 + 6, rowY);
        ctx.lineTo(field.w / 2 - 6, rowY);
      }
      ctx.stroke();
    }
    ctx.restore();
  });

  world.roads.forEach((road) => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(20, 34, 52, 0.95)";
    ctx.lineWidth = 34;
    ctx.beginPath();
    road.forEach(([x, y], index) => (index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.stroke();

    ctx.strokeStyle = "rgba(251, 191, 99, 0.35)";
    ctx.lineWidth = 2;
    ctx.setLineDash([22, 18]);
    ctx.stroke();
    ctx.setLineDash([]);
  });

  const gridSize = 120;
  const startX = Math.max(bounds.minX, Math.floor(view.minX / gridSize) * gridSize);
  const endX = Math.min(bounds.maxX, view.maxX);
  const startY = Math.max(bounds.minY, Math.floor(view.minY / gridSize) * gridSize);
  const endY = Math.min(bounds.maxY, view.maxY);
  ctx.strokeStyle = "rgba(132, 188, 255, 0.07)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = startX; x <= endX; x += gridSize) {
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
  }
  for (let y = startY; y <= endY; y += gridSize) {
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
  }
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 110, 110, 0.55)";
  ctx.lineWidth = 3;
  ctx.setLineDash([26, 16]);
  ctx.strokeRect(bounds.minX, bounds.minY, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);
  ctx.setLineDash([]);

  ctx.font = `600 34px ${MONO_FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(170, 210, 255, 0.16)";
  world.labels.forEach((label) => {
    ctx.fillText(label.text, label.x, label.y);
  });

  ctx.strokeStyle = "rgba(126, 224, 181, 0.4)";
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 14]);
  ctx.beginPath();
  ctx.moveTo(world.home.x, world.home.y);
  world.experiencePath.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.stroke();
  ctx.setLineDash([]);
};

const drawNoFlyZones = (ctx: CanvasRenderingContext2D, world: FlightWorld, time: number) => {
  world.noFlyZones.forEach((zone) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 82, 82, 0.1)";
    ctx.fill();
    ctx.clip();

    ctx.strokeStyle = "rgba(255, 96, 96, 0.22)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    const offset = (time * 12) % 28;
    for (let d = -zone.radius * 2; d < zone.radius * 2; d += 28) {
      ctx.moveTo(zone.x + d + offset - zone.radius, zone.y - zone.radius);
      ctx.lineTo(zone.x + d + offset + zone.radius, zone.y + zone.radius);
    }
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = "rgba(255, 110, 110, 0.75)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = `600 15px ${MONO_FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255, 150, 150, 0.9)";
    ctx.fillText("RESTRICTED", zone.x, zone.y);
  });
};

const drawWaypoint = (
  ctx: CanvasRenderingContext2D,
  waypoint: Waypoint,
  state: RenderState,
  isHome: boolean
) => {
  const color = KIND_COLORS[waypoint.kind];
  const discovered = state.discovered.has(waypoint.id);
  const isTarget = state.targetId === waypoint.id;
  const { x, y, radius } = waypoint;
  const pulse = state.reducedMotion ? 0.5 : (Math.sin(state.time * 2.4 + x * 0.01) + 1) / 2;

  if (!discovered) {
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.18 + pulse * 0.25;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, radius + 10 + pulse * 16, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = discovered ? "rgba(10, 28, 48, 0.85)" : "rgba(6, 18, 34, 0.9)";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = color;
  ctx.globalAlpha = discovered ? 0.55 : 0.95;
  ctx.lineWidth = 3;
  ctx.setLineDash(discovered ? [] : [14, 9]);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.62, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (isHome) {
    ctx.font = `700 54px ${MONO_FONT}`;
    ctx.fillStyle = discovered ? color : "rgba(98, 200, 255, 0.85)";
    ctx.fillText("H", x, y + 2);
  } else if (discovered) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x - 18, y + 2);
    ctx.lineTo(x - 5, y + 15);
    ctx.lineTo(x + 20, y - 14);
    ctx.stroke();
  } else {
    ctx.font = `700 34px ${MONO_FONT}`;
    ctx.fillStyle = color;
    ctx.fillText("?", x, y + 2);
  }

  if (state.scanId === waypoint.id && state.scanProgress > 0 && !discovered) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(x, y, radius - 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * state.scanProgress);
    ctx.stroke();
  }

  if (isTarget) {
    const spin = state.time * 1.6;
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.8;
    ctx.lineWidth = 3;
    for (let i = 0; i < 4; i += 1) {
      const start = spin + (i * Math.PI) / 2;
      ctx.beginPath();
      ctx.arc(x, y, radius + 22, start, start + 0.6);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  const label = discovered || isHome ? waypoint.label : `Unknown ${KIND_LABELS[waypoint.kind].toLowerCase()}`;
  const shortLabel = label.length > 34 ? `${label.slice(0, 32)}…` : label;
  ctx.font = `600 16px ${MONO_FONT}`;
  const width = ctx.measureText(shortLabel).width + 20;
  ctx.fillStyle = "rgba(4, 14, 28, 0.78)";
  ctx.fillRect(x - width / 2, y + radius + 12, width, 26);
  ctx.fillStyle = discovered || isHome ? "#e6f3ff" : color;
  ctx.fillText(shortLabel, x, y + radius + 26);
};

const drawDrone = (ctx: CanvasRenderingContext2D, drone: DroneState, time: number) => {
  const speed = Math.hypot(drone.vx, drone.vy);
  const tiltX = drone.vx * 0.012;
  const tiltY = drone.vy * 0.012;

  // Shadow on the ground, offset to suggest altitude.
  ctx.save();
  ctx.translate(drone.x + 34 - tiltX, drone.y + 44 - tiltY);
  ctx.rotate(drone.heading);
  ctx.fillStyle = "rgba(0, 0, 0, 0.26)";
  ctx.beginPath();
  ctx.ellipse(0, 0, 30, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(drone.x, drone.y);
  ctx.rotate(drone.heading);

  const arm = 26;
  const rotorRadius = 13;
  const rotors: [number, number][] = [
    [arm, -arm],
    [arm, arm],
    [-arm, arm],
    [-arm, -arm],
  ];

  ctx.strokeStyle = "#9fdcff";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-arm, -arm);
  ctx.lineTo(arm, arm);
  ctx.moveTo(-arm, arm);
  ctx.lineTo(arm, -arm);
  ctx.stroke();

  rotors.forEach(([rx, ry], index) => {
    ctx.fillStyle = "rgba(180, 225, 255, 0.16)";
    ctx.beginPath();
    ctx.arc(rx, ry, rotorRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(180, 225, 255, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const angle = drone.rotor * (index % 2 === 0 ? 1 : -1);
    ctx.strokeStyle = "rgba(235, 248, 255, 0.85)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(rx + Math.cos(angle) * rotorRadius, ry + Math.sin(angle) * rotorRadius);
    ctx.lineTo(rx - Math.cos(angle) * rotorRadius, ry - Math.sin(angle) * rotorRadius);
    ctx.stroke();

    ctx.fillStyle = "#123150";
    ctx.beginPath();
    ctx.arc(rx, ry, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#16395c";
  ctx.strokeStyle = "#9fdcff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(-13, -10, 26, 20, 6);
  ctx.fill();
  ctx.stroke();

  // Camera gimbal at the nose.
  ctx.fillStyle = "#62c8ff";
  ctx.beginPath();
  ctx.arc(15, 0, 4, 0, Math.PI * 2);
  ctx.fill();

  // Navigation lights: port red, starboard green, white tail strobe.
  ctx.fillStyle = "#ff5a5a";
  ctx.beginPath();
  ctx.arc(arm + 6, -arm - 6, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#5dff9d";
  ctx.beginPath();
  ctx.arc(arm + 6, arm + 6, 3, 0, Math.PI * 2);
  ctx.fill();
  if (Math.floor(time * 2.5) % 2 === 0) {
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.beginPath();
    ctx.arc(-15, 0, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();

  if (drone.boosting && speed > 60) {
    ctx.strokeStyle = "rgba(251, 191, 99, 0.5)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(drone.x, drone.y, 44, 0, Math.PI * 2);
    ctx.stroke();
  }
};

const drawParticles = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
  particles.forEach((particle) => {
    const alpha = Math.max(0, particle.life / particle.maxLife);
    ctx.globalAlpha = alpha * 0.7;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * (0.5 + alpha * 0.5), 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
};

const drawClouds = (
  ctx: CanvasRenderingContext2D,
  state: RenderState,
  width: number,
  height: number
) => {
  const sprite = getCloudSprite();
  const { camera } = state;
  state.clouds.forEach((cloud) => {
    const relX = wrap(cloud.x - camera.x * CLOUD_PARALLAX, CLOUD_SPAN);
    const relY = wrap(cloud.y - camera.y * CLOUD_PARALLAX, CLOUD_SPAN);
    const drawWidth = sprite.width * cloud.scale * camera.zoom * 1.4;
    const drawHeight = sprite.height * cloud.scale * camera.zoom * 1.4;
    const screenX = width / 2 + relX * camera.zoom - drawWidth / 2;
    const screenY = height / 2 + relY * camera.zoom - drawHeight / 2;
    if (screenX > width || screenY > height || screenX + drawWidth < 0 || screenY + drawHeight < 0) {
      return;
    }
    ctx.globalAlpha = cloud.alpha;
    ctx.drawImage(sprite, screenX, screenY, drawWidth, drawHeight);
  });
  ctx.globalAlpha = 1;
};

const drawGuidance = (
  ctx: CanvasRenderingContext2D,
  state: RenderState,
  target: Waypoint | undefined,
  width: number,
  height: number
) => {
  if (!target) {
    return;
  }

  const { camera } = state;
  const sx = width / 2 + (target.x - camera.x) * camera.zoom;
  const sy = height / 2 + (target.y - camera.y) * camera.zoom;
  const pad = 46;
  if (sx > pad && sx < width - pad && sy > pad && sy < height - pad) {
    return;
  }

  const cx = width / 2;
  const cy = height / 2;
  const angle = Math.atan2(sy - cy, sx - cx);
  const scale = Math.min(
    Math.abs((width / 2 - pad) / Math.cos(angle)),
    Math.abs((height / 2 - pad) / Math.sin(angle))
  );
  const ax = cx + Math.cos(angle) * scale;
  const ay = cy + Math.sin(angle) * scale;
  const color = KIND_COLORS[target.kind];

  ctx.save();
  ctx.translate(ax, ay);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.moveTo(16, 0);
  ctx.lineTo(-10, -11);
  ctx.lineTo(-5, 0);
  ctx.lineTo(-10, 11);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  const distance = Math.hypot(target.x - state.drone.x, target.y - state.drone.y);
  ctx.font = `600 12px ${MONO_FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(
    `${Math.round(distance / 10)}m`,
    ax - Math.cos(angle) * 30,
    ay - Math.sin(angle) * 30
  );
};

export const renderScene = (
  ctx: CanvasRenderingContext2D,
  world: FlightWorld,
  state: RenderState,
  width: number,
  height: number,
  guidanceTarget: Waypoint | undefined
) => {
  const { camera } = state;

  ctx.fillStyle = "#04101f";
  ctx.fillRect(0, 0, width, height);

  const halfW = width / 2 / camera.zoom;
  const halfH = height / 2 / camera.zoom;
  const view = {
    minX: camera.x - halfW,
    maxX: camera.x + halfW,
    minY: camera.y - halfH,
    maxY: camera.y + halfH,
  };

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(camera.zoom, camera.zoom);
  ctx.translate(-camera.x, -camera.y);

  drawGround(ctx, world, view);
  drawNoFlyZones(ctx, world, state.reducedMotion ? 0 : state.time);
  world.waypoints.forEach((waypoint) => {
    const reach = waypoint.radius + 60;
    if (
      waypoint.x + reach < view.minX ||
      waypoint.x - reach > view.maxX ||
      waypoint.y + reach + 60 < view.minY ||
      waypoint.y - reach > view.maxY
    ) {
      return;
    }
    drawWaypoint(ctx, waypoint, state, waypoint.kind === "about");
  });
  drawParticles(ctx, state.particles);
  drawDrone(ctx, state.drone, state.time);

  ctx.restore();

  drawClouds(ctx, state, width, height);
  drawGuidance(ctx, state, guidanceTarget, width, height);
};

export const renderMinimap = (
  ctx: CanvasRenderingContext2D,
  world: FlightWorld,
  state: RenderState,
  width: number,
  height: number,
  viewport: { width: number; height: number }
) => {
  const { bounds } = world;
  const worldW = bounds.maxX - bounds.minX;
  const worldH = bounds.maxY - bounds.minY;
  const scale = Math.min(width / worldW, height / worldH);
  const offsetX = (width - worldW * scale) / 2;
  const offsetY = (height - worldH * scale) / 2;
  const toX = (x: number) => offsetX + (x - bounds.minX) * scale;
  const toY = (y: number) => offsetY + (y - bounds.minY) * scale;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(10, 29, 44, 0.9)";
  ctx.fillRect(toX(bounds.minX), toY(bounds.minY), worldW * scale, worldH * scale);

  ctx.fillStyle = "rgba(255, 90, 90, 0.35)";
  world.noFlyZones.forEach((zone) => {
    ctx.beginPath();
    ctx.arc(toX(zone.x), toY(zone.y), Math.max(2, zone.radius * scale), 0, Math.PI * 2);
    ctx.fill();
  });

  world.waypoints.forEach((waypoint) => {
    const discovered = state.discovered.has(waypoint.id);
    ctx.fillStyle = KIND_COLORS[waypoint.kind];
    ctx.globalAlpha = discovered ? 1 : 0.45;
    ctx.beginPath();
    ctx.arc(toX(waypoint.x), toY(waypoint.y), discovered ? 3.5 : 2.5, 0, Math.PI * 2);
    ctx.fill();
    if (state.targetId === waypoint.id) {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(toX(waypoint.x), toY(waypoint.y), 6, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
  ctx.globalAlpha = 1;

  const viewW = (viewport.width / state.camera.zoom) * scale;
  const viewH = (viewport.height / state.camera.zoom) * scale;
  ctx.strokeStyle = "rgba(180, 225, 255, 0.45)";
  ctx.lineWidth = 1;
  ctx.strokeRect(toX(state.camera.x) - viewW / 2, toY(state.camera.y) - viewH / 2, viewW, viewH);

  ctx.save();
  ctx.translate(toX(state.drone.x), toY(state.drone.y));
  ctx.rotate(state.drone.heading);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(6, 0);
  ctx.lineTo(-4, -4);
  ctx.lineTo(-4, 4);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};
