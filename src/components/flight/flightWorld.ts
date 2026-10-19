import {
  aboutContent,
  contactContent,
  experiences,
  projects,
  skillGroups,
  type AboutContent,
  type ContactContent,
  type ExperienceItem,
  type ProjectItem,
  type SkillGroup,
} from "@/content/siteContent";

export type WaypointKind = "about" | "project" | "experience" | "contact";

interface WaypointBase {
  id: string;
  kind: WaypointKind;
  label: string;
  x: number;
  y: number;
  radius: number;
}

export type Waypoint =
  | (WaypointBase & { kind: "about"; about: AboutContent; skills: SkillGroup[] })
  | (WaypointBase & { kind: "project"; project: ProjectItem })
  | (WaypointBase & { kind: "experience"; experience: ExperienceItem })
  | (WaypointBase & { kind: "contact"; contact: ContactContent });

export interface NoFlyZone {
  x: number;
  y: number;
  radius: number;
}

export interface FieldPatch {
  x: number;
  y: number;
  w: number;
  h: number;
  angle: number;
  hue: number;
  rows: boolean;
}

export interface ZoneLabel {
  text: string;
  x: number;
  y: number;
}

export interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface FlightWorld {
  waypoints: Waypoint[];
  noFlyZones: NoFlyZone[];
  fields: FieldPatch[];
  roads: [number, number][][];
  labels: ZoneLabel[];
  experiencePath: [number, number][];
  home: { x: number; y: number; radius: number };
  bounds: Bounds;
}

export const KIND_COLORS: Record<WaypointKind, string> = {
  about: "#62c8ff",
  project: "#fbbf63",
  experience: "#7ee0b5",
  contact: "#c4a6ff",
};

export const KIND_LABELS: Record<WaypointKind, string> = {
  about: "Home base",
  project: "Project",
  experience: "Experience",
  contact: "Comms",
};

const WAYPOINT_RADIUS = 78;

// Deterministic PRNG so the map is identical on every visit.
const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const buildFlightWorld = (): FlightWorld => {
  const rand = mulberry32(401);
  const waypoints: Waypoint[] = [];

  const home = { x: 0, y: 0, radius: 110 };

  waypoints.push({
    id: "about",
    kind: "about",
    label: aboutContent.title,
    x: home.x,
    y: home.y,
    radius: home.radius,
    about: aboutContent,
    skills: skillGroups,
  });

  // Projects district: a loose grid to the east of home base.
  const projectCols = 4;
  const projectSpacingX = 430;
  const projectSpacingY = 400;
  const projectOriginX = 760;
  const projectRows = Math.ceil(projects.length / projectCols);
  const projectOriginY = -((projectRows - 1) * projectSpacingY) / 2;

  projects.forEach((project, index) => {
    const col = index % projectCols;
    const row = Math.floor(index / projectCols);
    waypoints.push({
      id: `project-${slugify(project.title)}`,
      kind: "project",
      label: project.title,
      x: projectOriginX + col * projectSpacingX + (rand() - 0.5) * 120 + (row % 2) * 90,
      y: projectOriginY + row * projectSpacingY + (rand() - 0.5) * 110,
      radius: WAYPOINT_RADIUS,
      project,
    });
  });

  // Experience corridor: a winding route to the west, most recent first.
  const experiencePath: [number, number][] = [];
  experiences.forEach((experience, index) => {
    const x = -720 - index * 360;
    const y = Math.sin(index * 1.1) * 330 + (rand() - 0.5) * 60;
    experiencePath.push([x, y]);
    waypoints.push({
      id: `experience-${index}-${slugify(experience.company)}`,
      kind: "experience",
      label: experience.company,
      x,
      y,
      radius: WAYPOINT_RADIUS,
      experience,
    });
  });

  const contactPoint = { x: 120, y: 1050 };
  waypoints.push({
    id: "contact",
    kind: "contact",
    label: contactContent.title,
    x: contactPoint.x,
    y: contactPoint.y,
    radius: WAYPOINT_RADIUS + 10,
    contact: contactContent,
  });

  const xs = waypoints.map((waypoint) => waypoint.x);
  const ys = waypoints.map((waypoint) => waypoint.y);
  const margin = 650;
  const bounds: Bounds = {
    minX: Math.min(...xs) - margin,
    maxX: Math.max(...xs) + margin,
    minY: Math.min(...ys) - margin,
    maxY: Math.max(...ys) + margin,
  };

  const clearOfWaypoints = (x: number, y: number, clearance: number) =>
    waypoints.every((waypoint) => Math.hypot(waypoint.x - x, waypoint.y - y) > waypoint.radius + clearance);

  // Restricted airspace: soft obstacles that push the drone away.
  const noFlyZones: NoFlyZone[] = [];
  let attempts = 0;
  while (noFlyZones.length < 6 && attempts < 400) {
    attempts += 1;
    const radius = 110 + rand() * 90;
    const x = bounds.minX + margin * 0.6 + rand() * (bounds.maxX - bounds.minX - margin * 1.2);
    const y = bounds.minY + margin * 0.6 + rand() * (bounds.maxY - bounds.minY - margin * 1.2);
    const clearOfZones = noFlyZones.every((zone) => Math.hypot(zone.x - x, zone.y - y) > zone.radius + radius + 160);
    const clearOfCorridor = experiencePath.every(
      ([px, py]) => Math.hypot(px - x, py - y) > radius + 200
    );
    if (clearOfWaypoints(x, y, radius + 130) && clearOfZones && clearOfCorridor) {
      noFlyZones.push({ x, y, radius });
    }
  }

  const fields: FieldPatch[] = [];
  for (let i = 0; i < 90; i += 1) {
    fields.push({
      x: bounds.minX + rand() * (bounds.maxX - bounds.minX),
      y: bounds.minY + rand() * (bounds.maxY - bounds.minY),
      w: 160 + rand() * 340,
      h: 120 + rand() * 260,
      angle: (rand() - 0.5) * 0.5,
      hue: 150 + rand() * 70,
      rows: rand() > 0.45,
    });
  }

  const roads: [number, number][][] = [
    [
      [bounds.minX, 220],
      [-600, 260],
      [0, 160],
      [700, 300],
      [bounds.maxX, 260],
    ],
    [
      [380, bounds.minY],
      [320, -400],
      [260, 400],
      [340, bounds.maxY],
    ],
  ];

  const labels: ZoneLabel[] = [
    { text: "HOME BASE", x: home.x, y: home.y - home.radius - 46 },
    {
      text: "PROJECTS DISTRICT",
      x: projectOriginX + ((projectCols - 1) * projectSpacingX) / 2,
      y: projectOriginY - 230,
    },
    {
      text: "EXPERIENCE CORRIDOR",
      x: -720 - ((experiences.length - 1) * 360) / 2,
      y: -560,
    },
    { text: "COMMS TOWER", x: contactPoint.x, y: contactPoint.y + 150 },
  ];

  return { waypoints, noFlyZones, fields, roads, labels, experiencePath, home, bounds };
};
