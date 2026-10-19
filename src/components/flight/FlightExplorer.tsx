import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { BatteryCharging, BookOpen, Crosshair, Gauge, LogOut, Navigation, Rocket, Trophy, X, Zap } from "lucide-react";
import { buildFlightWorld, KIND_COLORS, KIND_LABELS, type Waypoint, type WaypointKind } from "./flightWorld";
import { renderMinimap, renderScene } from "./flightRenderer";
import { createSimState, findGuidanceTarget, stepSim, type FlightWarning, type InputState } from "./flightSim";
import WaypointPanel from "./WaypointPanel";

type Phase = "briefing" | "flying" | "complete";

interface HudState {
  battery: number;
  speed: number;
  elapsed: number;
  warning: FlightWarning | null;
  insideId: string | null;
  scanning: boolean;
  tooFast: boolean;
  charging: boolean;
  targetId: string | null;
}

interface Toast {
  key: number;
  title: string;
  points: number;
  combo: number;
  kind: WaypointKind;
}

interface FlightExplorerProps {
  onExit: () => void;
}

const BEST_TIME_KEY = "flight-explorer-best-time";
const COMBO_WINDOW_SECONDS = 8;
const STEERING_KEYS = new Set(["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", "shift"]);

const WARNING_TEXT: Record<FlightWarning, string> = {
  nofly: "Restricted airspace: turn back",
  geofence: "Geofence breach: returning to area",
  "battery-empty": "Battery depleted: reduced power, return to home base",
  "battery-low": "Low battery: recharge on the home base pad",
};

const readBestTime = () => {
  try {
    const value = window.localStorage.getItem(BEST_TIME_KEY);
    return value ? Number(value) : null;
  } catch {
    return null;
  }
};

const writeBestTime = (seconds: number) => {
  try {
    window.localStorage.setItem(BEST_TIME_KEY, String(seconds));
  } catch {
    // Storage can be unavailable (private mode); the best time is just a nicety.
  }
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
};

const Joystick = ({ onChange }: { onChange: (x: number, y: number) => void }) => {
  const baseRef = useRef<HTMLDivElement>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const radius = 52;

  const update = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = baseRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    let dx = event.clientX - (rect.left + rect.width / 2);
    let dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);
    if (distance > radius) {
      dx = (dx / distance) * radius;
      dy = (dy / distance) * radius;
    }
    setKnob({ x: dx, y: dy });
    onChange(dx / radius, dy / radius);
  };

  const release = () => {
    setKnob({ x: 0, y: 0 });
    onChange(0, 0);
  };

  return (
    <div
      ref={baseRef}
      role="presentation"
      className="pointer-events-auto relative h-36 w-36 touch-none rounded-full border border-primary/30 bg-[#06172d]/60 backdrop-blur-sm"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        update(event);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          update(event);
        }
      }}
      onPointerUp={release}
      onPointerCancel={release}
    >
      <div
        className="absolute left-1/2 top-1/2 h-14 w-14 rounded-full border border-primary/60 bg-primary/30"
        style={{ transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))` }}
      />
    </div>
  );
};

const FlightExplorer = ({ onExit }: FlightExplorerProps) => {
  const world = useMemo(() => buildFlightWorld(), []);
  const reducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const isTouch = useMemo(() => window.matchMedia("(pointer: coarse)").matches, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const minimapRef = useRef<HTMLCanvasElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const simRef = useRef(createSimState(world, reducedMotion));
  const inputRef = useRef<InputState>({ keys: new Set(), joyX: 0, joyY: 0, touchBoost: false });
  const missionRef = useRef({ startedAt: 0, finishedAt: 0, lastDiscoveryAt: -Infinity, combo: 0, score: 0 });

  const [phase, setPhase] = useState<Phase>("briefing");
  const phaseRef = useRef<Phase>("briefing");
  const [hud, setHud] = useState<HudState>({
    battery: 100,
    speed: 0,
    elapsed: 0,
    warning: null,
    insideId: null,
    scanning: false,
    tooFast: false,
    charging: false,
    targetId: null,
  });
  const [discoveredIds, setDiscoveredIds] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [toast, setToast] = useState<Toast | null>(null);
  const [dismissedId, setDismissedId] = useState<string | null>(null);
  const [logbookOpen, setLogbookOpen] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(() => readBestTime());
  const [result, setResult] = useState<{ time: number; score: number; newBest: boolean } | null>(null);

  const total = world.waypoints.length;

  const setPhaseBoth = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const takeOff = useCallback(() => {
    const sim = simRef.current;
    sim.active = true;
    missionRef.current.startedAt = sim.time;
    setPhaseBoth("flying");
    canvasRef.current?.focus();
  }, [setPhaseBoth]);

  const handleDiscover = useCallback(
    (waypoint: Waypoint) => {
      const sim = simRef.current;
      const mission = missionRef.current;
      mission.combo = sim.time - mission.lastDiscoveryAt < COMBO_WINDOW_SECONDS ? mission.combo + 1 : 0;
      mission.lastDiscoveryAt = sim.time;
      const points = 100 + mission.combo * 25;
      mission.score += points;

      setScore(mission.score);
      setDiscoveredIds(Array.from(sim.discovered));
      setToast({ key: Date.now(), title: waypoint.label, points, combo: mission.combo, kind: waypoint.kind });

      if (sim.discovered.size === total && phaseRef.current === "flying") {
        mission.finishedAt = sim.time;
        const time = mission.finishedAt - mission.startedAt;
        const timeBonus = Math.max(0, Math.round(3000 - time * 12));
        mission.score += timeBonus;
        setScore(mission.score);
        const previousBest = readBestTime();
        const newBest = previousBest === null || time < previousBest;
        if (newBest) {
          writeBestTime(time);
          setBestTime(time);
        }
        setResult({ time, score: mission.score, newBest });
        setPhaseBoth("complete");
      }
    },
    [setPhaseBoth, total]
  );

  const handleDiscoverRef = useRef(handleDiscover);
  useEffect(() => {
    handleDiscoverRef.current = handleDiscover;
  }, [handleDiscover]);

  // Main loop: simulation and rendering stay outside React; the HUD syncs at ~10 Hz.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      simRef.current.camera.zoom = Math.max(0.5, Math.min(1, Math.min(width, height) / 820));

      const minimap = minimapRef.current;
      if (minimap) {
        minimap.width = Math.round(minimap.clientWidth * dpr);
        minimap.height = Math.round(minimap.clientHeight * dpr);
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let frame = 0;
    let last = performance.now();
    let lastHud = 0;
    let lastInsideId: string | null = null;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const sim = simRef.current;

      stepSim(
        sim,
        world,
        inputRef.current,
        dt,
        (waypoint) => handleDiscoverRef.current(waypoint),
        () => undefined
      );

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderScene(ctx, world, sim, width, height, sim.active ? findGuidanceTarget(sim, world) : undefined);

      const minimap = minimapRef.current;
      const minimapCtx = minimap?.getContext("2d");
      if (minimap && minimapCtx && minimap.clientWidth > 0) {
        minimapCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        renderMinimap(minimapCtx, world, sim, minimap.clientWidth, minimap.clientHeight, { width, height });
      }

      // A dismissed panel comes back once the drone flies to a different pad.
      if (sim.insideId !== lastInsideId) {
        lastInsideId = sim.insideId;
        setDismissedId(null);
      }

      if (now - lastHud > 100) {
        lastHud = now;
        const mission = missionRef.current;
        const elapsed =
          phaseRef.current === "complete"
            ? mission.finishedAt - mission.startedAt
            : sim.active
              ? sim.time - mission.startedAt
              : 0;
        const next: HudState = {
          battery: sim.drone.battery,
          speed: Math.hypot(sim.drone.vx, sim.drone.vy),
          elapsed,
          warning: sim.warning,
          insideId: sim.insideId,
          scanning: sim.scanId !== null && sim.scanProgress > 0,
          tooFast: sim.tooFast,
          charging: sim.charging && sim.drone.battery < 100,
          targetId: sim.targetId,
        };
        setHud(next);
      }

      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [world]);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  // Lock page scroll and restore focus to whatever launched flight mode.
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, []);

  const activePanelId = hud.insideId && discoveredIds.includes(hud.insideId) && dismissedId !== hud.insideId
    ? hud.insideId
    : null;
  const activePanel = activePanelId ? world.waypoints.find((waypoint) => waypoint.id === activePanelId) : undefined;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const target = event.target as HTMLElement | null;
      const inControl = target?.closest("a, button") && (key === " " || key === "enter");

      if (key === "escape") {
        event.preventDefault();
        if (logbookOpen) {
          setLogbookOpen(false);
        } else if (activePanelId) {
          setDismissedId(activePanelId);
        } else {
          onExit();
        }
        return;
      }

      if (phaseRef.current === "briefing" && (key === "enter" || key === " ") && !inControl) {
        event.preventDefault();
        takeOff();
        return;
      }

      if (key === "l" && phaseRef.current !== "briefing") {
        setLogbookOpen((open) => !open);
        return;
      }

      if (STEERING_KEYS.has(key)) {
        if (key.startsWith("arrow")) {
          event.preventDefault();
        }
        inputRef.current.keys.add(key);
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      inputRef.current.keys.delete(event.key.toLowerCase());
    };

    const clearKeys = () => inputRef.current.keys.clear();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", clearKeys);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", clearKeys);
    };
  }, [activePanelId, logbookOpen, onExit, takeOff]);

  const engageAutopilot = (id: string) => {
    simRef.current.targetId = id;
    setLogbookOpen(false);
  };

  const keepFlying = () => {
    setPhaseBoth("flying");
    simRef.current.active = true;
  };

  const restart = () => {
    const zoom = simRef.current.camera.zoom;
    simRef.current = createSimState(world, reducedMotion);
    simRef.current.camera.zoom = zoom;
    missionRef.current = { startedAt: 0, finishedAt: 0, lastDiscoveryAt: -Infinity, combo: 0, score: 0 };
    setDiscoveredIds([]);
    setScore(0);
    setResult(null);
    setDismissedId(null);
    setPhaseBoth("briefing");
  };

  const targetWaypoint = hud.targetId ? world.waypoints.find((waypoint) => waypoint.id === hud.targetId) : undefined;
  const groupedWaypoints = (["about", "project", "experience", "contact"] as WaypointKind[]).map((kind) => ({
    kind,
    items: world.waypoints.filter((waypoint) => waypoint.kind === kind),
  }));

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Flight mode portfolio explorer"
      tabIndex={-1}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#04101f] text-foreground focus:outline-none"
    >
      <canvas
        ref={canvasRef}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full touch-none focus:outline-none"
      />

      <div className="pointer-events-none absolute inset-0">
        {/* Top-left: mission status and telemetry */}
        <div className="sky-glass pointer-events-auto absolute left-3 top-3 w-[min(19rem,calc(100vw-9.5rem))] rounded-2xl p-3 sm:left-4 sm:top-4 sm:p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="hud-label">Survey mission</p>
            <p className="font-mono-flight text-xs text-slate-200">
              {discoveredIds.length}/{total}
            </p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary/15">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{ width: `${(discoveredIds.length / total) * 100}%` }}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 font-mono-flight text-[11px] text-slate-300">
            <div>
              <p className="text-primary/70">SCORE</p>
              <p className="text-sm text-slate-50">{score}</p>
            </div>
            <div>
              <p className="text-primary/70">TIME</p>
              <p className="text-sm text-slate-50">{formatTime(hud.elapsed)}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-primary/70">
                <Gauge className="h-3 w-3" aria-hidden="true" />
                SPD
              </p>
              <p className="text-sm text-slate-50">{Math.round(hud.speed / 10)} m/s</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between font-mono-flight text-[11px]">
              <span className="flex items-center gap-1 text-primary/70">
                {hud.charging ? (
                  <BatteryCharging className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <Zap className="h-3 w-3" aria-hidden="true" />
                )}
                {hud.charging ? "CHARGING" : "BATTERY"}
              </span>
              <span className="text-slate-100">{Math.round(hud.battery)}%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-primary/15">
              <div
                className={`h-full rounded-full transition-[width] duration-200 ${
                  hud.battery < 20 ? "bg-red-400" : hud.battery < 45 ? "bg-amber-300" : "bg-emerald-300"
                }`}
                style={{ width: `${hud.battery}%` }}
              />
            </div>
          </div>
        </div>

        {/* Top-right: controls */}
        <div className="pointer-events-auto absolute right-3 top-3 flex flex-col items-end gap-2 sm:right-4 sm:top-4 sm:flex-row">
          <button
            type="button"
            onClick={onExit}
            className="sky-glass inline-flex items-center gap-2 rounded-xl px-3 py-2 font-mono-flight text-[11px] uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Exit
          </button>
          {phase !== "briefing" && (
            <button
              type="button"
              onClick={() => setLogbookOpen((open) => !open)}
              aria-expanded={logbookOpen}
              className="sky-glass inline-flex items-center gap-2 rounded-xl px-3 py-2 font-mono-flight text-[11px] uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Logbook
            </button>
          )}
        </div>

        {/* Status banners */}
        <div className="absolute left-1/2 top-[8.75rem] flex w-[min(30rem,calc(100vw-1.5rem))] -translate-x-1/2 flex-col items-center gap-2 sm:top-4 sm:w-[min(26rem,calc(100vw-42rem))]">
          {hud.warning && phase === "flying" && (
            <div
              role="alert"
              className="rounded-xl border border-red-400/50 bg-red-950/70 px-4 py-2 text-center font-mono-flight text-xs uppercase tracking-[0.12em] text-red-200 backdrop-blur-md"
            >
              {WARNING_TEXT[hud.warning]}
            </div>
          )}
          {targetWaypoint && (
            <div className="sky-glass pointer-events-auto flex items-center gap-3 rounded-xl px-3 py-2 font-mono-flight text-[11px] uppercase tracking-[0.12em] text-slate-100">
              <Navigation className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="truncate">
                Autopilot →{" "}
                {discoveredIds.includes(targetWaypoint.id) || targetWaypoint.kind === "about"
                  ? targetWaypoint.label
                  : `Unidentified ${KIND_LABELS[targetWaypoint.kind].toLowerCase()}`}
              </span>
              <button
                type="button"
                onClick={() => {
                  simRef.current.targetId = null;
                }}
                aria-label="Cancel autopilot"
                className="rounded p-0.5 text-primary/80 hover:bg-primary/15"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Scan status near the drone */}
        {phase === "flying" && hud.insideId && !discoveredIds.includes(hud.insideId) && (
          <div className="absolute left-1/2 top-[calc(50%+4.5rem)] -translate-x-1/2 rounded-full border border-primary/30 bg-[#06172d]/80 px-4 py-1.5 font-mono-flight text-[11px] uppercase tracking-[0.18em] text-primary backdrop-blur-md">
            {hud.tooFast ? "Slow down to scan" : "Scanning…"}
          </div>
        )}

        {/* Discovery toast */}
        {toast && (
          <div
            key={toast.key}
            className="absolute bottom-[11rem] left-1/2 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2 rounded-xl border bg-[#06172d]/85 px-4 py-2 text-center backdrop-blur-md sm:bottom-24"
            style={{ borderColor: KIND_COLORS[toast.kind] }}
          >
            <p className="font-mono-flight text-[11px] uppercase tracking-[0.18em]" style={{ color: KIND_COLORS[toast.kind] }}>
              +{toast.points} data recovered{toast.combo > 0 ? ` · combo x${toast.combo + 1}` : ""}
            </p>
            <p className="truncate text-sm text-slate-100">{toast.title}</p>
          </div>
        )}

        {/* Waypoint details */}
        {activePanel && phase !== "briefing" && (
          <div className="absolute inset-x-3 top-[9.25rem] flex max-h-[calc(100%-19.5rem)] flex-col sm:inset-x-auto sm:bottom-[13rem] sm:right-4 sm:top-[4.5rem] sm:max-h-none sm:w-[24rem]">
            <WaypointPanel waypoint={activePanel} onClose={() => setDismissedId(activePanel.id)} />
          </div>
        )}

        {/* Minimap */}
        <div className="sky-glass absolute bottom-4 right-4 hidden overflow-hidden rounded-2xl p-2 sm:block">
          <p className="hud-label px-1 pb-1">Map</p>
          <canvas ref={minimapRef} aria-hidden="true" className="block h-[136px] w-[220px]" />
        </div>

        {/* Touch controls or keyboard legend */}
        {isTouch ? (
          phase === "flying" && (
            <>
              <div className="absolute bottom-6 left-5">
                <Joystick
                  onChange={(x, y) => {
                    inputRef.current.joyX = x;
                    inputRef.current.joyY = y;
                  }}
                />
              </div>
              <button
                type="button"
                aria-label="Boost"
                className="pointer-events-auto absolute bottom-10 right-6 flex h-20 w-20 touch-none select-none items-center justify-center rounded-full border border-amber-300/50 bg-amber-300/15 font-mono-flight text-[11px] uppercase tracking-[0.16em] text-amber-200 backdrop-blur-sm active:bg-amber-300/30"
                onPointerDown={() => {
                  inputRef.current.touchBoost = true;
                }}
                onPointerUp={() => {
                  inputRef.current.touchBoost = false;
                }}
                onPointerCancel={() => {
                  inputRef.current.touchBoost = false;
                }}
                onPointerLeave={() => {
                  inputRef.current.touchBoost = false;
                }}
              >
                Boost
              </button>
            </>
          )
        ) : (
          <div className="sky-glass absolute bottom-4 left-4 hidden rounded-2xl px-4 py-3 font-mono-flight text-[11px] text-slate-300 sm:block">
            <p><span className="text-primary">WASD / ↑↓←→</span> fly</p>
            <p><span className="text-primary">Shift</span> boost</p>
            <p><span className="text-primary">L</span> logbook · <span className="text-primary">Esc</span> exit</p>
          </div>
        )}
      </div>

      {/* Logbook */}
      {logbookOpen && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#020812]/60 p-4 backdrop-blur-sm">
          <section
            aria-label="Flight logbook"
            className="sky-glass flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl"
          >
            <header className="flex items-center justify-between border-b border-primary/15 px-5 py-4">
              <div>
                <p className="hud-label">Logbook</p>
                <p className="text-sm text-slate-300">Pick a waypoint to fly there on autopilot.</p>
              </div>
              <button
                type="button"
                onClick={() => setLogbookOpen(false)}
                aria-label="Close logbook"
                className="rounded-lg p-1.5 text-primary/80 hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </header>
            <div className="space-y-4 overflow-y-auto px-5 py-4">
              {groupedWaypoints.map(({ kind, items }) => (
                <div key={kind}>
                  <p className="font-mono-flight text-[11px] uppercase tracking-[0.2em]" style={{ color: KIND_COLORS[kind] }}>
                    {kind === "project" ? "Projects" : kind === "experience" ? "Experience" : KIND_LABELS[kind]}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {items.map((waypoint, index) => {
                      const known = discoveredIds.includes(waypoint.id);
                      return (
                        <li key={waypoint.id}>
                          <button
                            type="button"
                            onClick={() => engageAutopilot(waypoint.id)}
                            className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <span
                              className="h-2.5 w-2.5 shrink-0 rounded-full"
                              style={{ backgroundColor: KIND_COLORS[kind], opacity: known ? 1 : 0.35 }}
                            />
                            <span className={known ? "text-slate-100" : "text-slate-400"}>
                              {known
                                ? waypoint.label
                                : `Unknown ${KIND_LABELS[kind].toLowerCase()}${items.length > 1 ? ` #${index + 1}` : ""}`}
                            </span>
                            <Crosshair className="ml-auto h-3.5 w-3.5 shrink-0 text-primary/60" aria-hidden="true" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Briefing */}
      {phase === "briefing" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#020812]/55 p-4 backdrop-blur-[2px]">
          <section aria-label="Mission briefing" className="sky-glass w-full max-w-md rounded-2xl p-6 text-center">
            <p className="hud-label">Mission briefing</p>
            <h2 className="mt-2 text-2xl font-bold">Survey the portfolio</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Fly the drone over all {total} signals to recover data on projects, experience, and contact
              channels. Hold steady over a pad to scan it. Keep an eye on the battery: the home base pad
              recharges it. Avoid restricted airspace.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-left font-mono-flight text-[11px] text-slate-300">
              {isTouch ? (
                <>
                  <p><span className="text-primary">Left stick</span> fly</p>
                  <p><span className="text-primary">Boost</span> hold for speed</p>
                </>
              ) : (
                <>
                  <p><span className="text-primary">WASD / arrows</span> fly</p>
                  <p><span className="text-primary">Shift</span> boost</p>
                  <p><span className="text-primary">L</span> logbook + autopilot</p>
                  <p><span className="text-primary">Esc</span> exit</p>
                </>
              )}
            </div>
            {bestTime !== null && (
              <p className="mt-4 font-mono-flight text-xs text-amber-200">Best time: {formatTime(bestTime)}</p>
            )}
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={takeOff}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-mono-flight text-xs uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#04101f]"
              >
                <Rocket className="h-4 w-4" aria-hidden="true" />
                Take off
              </button>
              <button
                type="button"
                onClick={onExit}
                className="rounded-xl border border-primary/30 px-5 py-2.5 font-mono-flight text-xs uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Back to site
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Mission complete */}
      {phase === "complete" && result && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#020812]/55 p-4 backdrop-blur-[2px]">
          <section aria-label="Mission complete" className="sky-glass w-full max-w-md rounded-2xl p-6 text-center">
            <Trophy className="mx-auto h-8 w-8 text-amber-300" aria-hidden="true" />
            <p className="hud-label mt-3">Mission complete</p>
            <h2 className="mt-2 text-2xl font-bold">Portfolio fully surveyed</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 font-mono-flight">
              <div className="rounded-xl border border-primary/20 p-3">
                <p className="text-[11px] text-primary/70">TIME</p>
                <p className="text-lg text-slate-50">{formatTime(result.time)}</p>
              </div>
              <div className="rounded-xl border border-primary/20 p-3">
                <p className="text-[11px] text-primary/70">SCORE</p>
                <p className="text-lg text-slate-50">{result.score}</p>
              </div>
            </div>
            {result.newBest ? (
              <p className="mt-3 font-mono-flight text-xs text-amber-200">New best time!</p>
            ) : (
              bestTime !== null && (
                <p className="mt-3 font-mono-flight text-xs text-slate-400">Best time: {formatTime(bestTime)}</p>
              )
            )}
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={keepFlying}
                className="rounded-xl bg-primary px-4 py-2.5 font-mono-flight text-xs uppercase tracking-[0.16em] text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Keep flying
              </button>
              <button
                type="button"
                onClick={restart}
                className="rounded-xl border border-primary/30 px-4 py-2.5 font-mono-flight text-xs uppercase tracking-[0.16em] text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Fly again
              </button>
              <button
                type="button"
                onClick={onExit}
                className="rounded-xl border border-primary/30 px-4 py-2.5 font-mono-flight text-xs uppercase tracking-[0.16em] text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Back to site
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default FlightExplorer;
