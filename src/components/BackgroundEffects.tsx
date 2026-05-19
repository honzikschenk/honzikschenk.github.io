import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CloudConfig {
  id: string;
  revision: number;
  top: number;
  phase: number;
  restX: number;
  startX: number;
  endX: number;
  duration: number;
  width: number;
  height: number;
  opacity: number;
  layer: "near" | "far";
  direction: "east" | "west";
}

const FAR_COUNT = 4;
const NEAR_COUNT = 3;

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const getViewportWidth = () => {
  if (typeof window === "undefined") {
    return 1280;
  }

  return window.innerWidth;
};

type CloudSeed = Partial<Pick<CloudConfig, "top" | "phase" | "duration" | "width" | "height" | "opacity" | "direction">>;

const buildCloud = (
  id: string,
  layer: "near" | "far",
  revision: number,
  seed: CloudSeed = {}
): CloudConfig => {
  const viewportWidth = getViewportWidth();
  const width = seed.width ?? Math.round(layer === "near" ? randomBetween(220, 330) : randomBetween(150, 270));
  const height = seed.height ?? Math.round(width * randomBetween(0.3, 0.37));
  const travelPadding = Math.max(220, width + 90);
  const direction = seed.direction ?? (Math.random() > 0.5 ? "east" : "west");
  const topRange = layer === "near" ? [18, 74] : [8, 82];
  const top = seed.top ?? randomBetween(topRange[0], topRange[1]);
  const phase = seed.phase ?? Math.random();
  const startX = direction === "east" ? -travelPadding : viewportWidth + travelPadding;
  const endX = direction === "east" ? viewportWidth + travelPadding : -travelPadding;
  const restX = startX + (endX - startX) * phase;

  return {
    id,
    revision,
    top,
    phase,
    restX,
    startX,
    endX,
    duration: seed.duration ?? (layer === "near" ? randomBetween(29, 40) : randomBetween(41, 58)),
    width,
    height,
    opacity: seed.opacity ?? (layer === "near" ? randomBetween(0.72, 0.84) : randomBetween(0.48, 0.62)),
    layer,
    direction,
  };
};

const createClouds = (isMobile: boolean) => {
  const far = Array.from({ length: isMobile ? 3 : FAR_COUNT }, (_, index) =>
    buildCloud(`far-${index + 1}`, "far", 0)
  );
  const near = Array.from({ length: isMobile ? 2 : NEAR_COUNT }, (_, index) =>
    buildCloud(`near-${index + 1}`, "near", 0)
  );

  return [...far, ...near];
};

const refreshCloud = (cloud: CloudConfig) =>
  buildCloud(cloud.id, cloud.layer, cloud.revision + 1, {
    top: cloud.top,
    phase: cloud.phase,
    duration: cloud.duration,
    width: cloud.width,
    height: cloud.height,
    opacity: cloud.opacity,
    direction: cloud.direction,
  });

const BackgroundEffects = () => {
  const reduceMotion = useReducedMotion();
  const [cloudSet, setCloudSet] = useState<CloudConfig[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const applyScreenMode = (matches: boolean) => {
      setCloudSet(createClouds(matches));
    };

    const handleChange = (event: MediaQueryListEvent) => applyScreenMode(event.matches);

    applyScreenMode(media.matches);
    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      setCloudSet((currentClouds) =>
        currentClouds.map((cloud) => refreshCloud(cloud))
      );
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const farClouds = useMemo(() => cloudSet.filter((cloud) => cloud.layer === "far"), [cloudSet]);
  const nearClouds = useMemo(() => cloudSet.filter((cloud) => cloud.layer === "near"), [cloudSet]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 flight-grid opacity-[0.14]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(159,214,255,0.14),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(255,181,122,0.16),transparent_50%)]" />

      <div className="absolute inset-0">
        {farClouds.map((cloud) => (
          <div
            key={cloud.id}
            className="absolute"
            style={{
              top: `${cloud.top}%`,
              opacity: cloud.opacity,
            }}
          >
            {reduceMotion ? (
              <div style={{ transform: `translate3d(${cloud.restX}px, 0, 0)` }}>
                <div
                  className="cloud-body"
                  style={{
                    width: `${cloud.width}px`,
                    height: `${cloud.height}px`,
                  }}
                />
              </div>
            ) : (
              <motion.div
                key={`${cloud.id}-${cloud.revision}`}
                initial={{ x: cloud.startX }}
                animate={{ x: cloud.endX }}
                transition={{
                  duration: cloud.duration,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: -cloud.duration * cloud.phase,
                }}
              >
                <div
                  className="cloud-body"
                  style={{
                    width: `${cloud.width}px`,
                    height: `${cloud.height}px`,
                  }}
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-0">
        {nearClouds.map((cloud) => (
          <div
            key={cloud.id}
            className="absolute"
            style={{
              top: `${cloud.top}%`,
              opacity: cloud.opacity,
            }}
          >
            {reduceMotion ? (
              <div style={{ transform: `translate3d(${cloud.restX}px, 0, 0)` }}>
                <div
                  className="cloud-body"
                  style={{
                    width: `${cloud.width}px`,
                    height: `${cloud.height}px`,
                  }}
                />
              </div>
            ) : (
              <motion.div
                key={`${cloud.id}-${cloud.revision}`}
                initial={{ x: cloud.startX }}
                animate={{ x: cloud.endX }}
                transition={{
                  duration: cloud.duration,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: -cloud.duration * cloud.phase,
                }}
              >
                <div
                  className="cloud-body"
                  style={{
                    width: `${cloud.width}px`,
                    height: `${cloud.height}px`,
                  }}
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default BackgroundEffects;
