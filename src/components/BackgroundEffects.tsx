import React from "react";
import { motion, MotionValue, useTransform } from "motion/react";

interface BackgroundEffectsProps {
  gridColor?: string;
  circuitColor?: string;
  scrollYProgress: MotionValue<number>;
}

const BackgroundEffects = ({
  gridColor = "rgba(64, 224, 208, 0.2)",
  circuitColor = "rgba(0, 255, 128, 0.05)",
  scrollYProgress,
}: BackgroundEffectsProps) => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Animated Clouds with Parallax */}
      {Array.from({ length: 16 }).map((_, i) => { // Increased cloud count to 16
        const depthFactor = Math.random() * 0.6 + 0.4; // Random factor between 0.4 and 1.0 for varied parallax (kept)
        
        // Adjusted Parallax movement for more pronounced effect
        const y = useTransform(scrollYProgress, [0, 1], [`-${20 + (1-depthFactor) * 80}%`, `${200 + (1-depthFactor) * 800}%`]);
        
        // Opacity: fade in at the start of scroll, fade out at the end (kept)
        const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
        
        // Adjusted Scale for refined depth perception without excessive size
        const scale = useTransform(scrollYProgress, [0,1], [0.4 + (1-depthFactor) * 0.4, 0.8 + (1-depthFactor) * 0.8]);

        return (
          <motion.div
            key={i}
            className="absolute" 
            style={{
              width: `${Math.random() * 250 + 150}px`, // Kept from previous adjustment
              height: `${Math.random() * 150 + 75}px`, // Kept from previous adjustment
              borderRadius: `${Math.random() * 20 + 40}% ${Math.random() * 20 + 40}% ${Math.random() * 20 + 40}% ${Math.random() * 20 + 40}% / ${Math.random() * 20 + 30}% ${Math.random() * 20 + 30}% ${Math.random() * 20 + 50}% ${Math.random() * 20 + 50}%`, // Kept
              // Adjusted alpha in gradient for a slightly softer cloud appearance
              background: `radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(220,220,220,0.5) 40%, rgba(200,200,200,0.15) 70%, transparent 100%)`, 
              left: `${Math.random() * 100}%`,
              filter: "blur(6px)", // Kept
              // Motion values
              y,
              opacity,
              scale,
            }}
            // Removed old animate and transition props
          />
        );
      })}

      {/* Grid Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Circuit Board Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0"
      >
        {/* Circuit Lines */}
        <svg className="w-full h-full" style={{ filter: "blur(1px)" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M${Math.random() * 100} ${Math.random() * 100} Q ${Math.random() * 300} ${Math.random() * 300} ${Math.random() * 500} ${Math.random() * 500}`}
              stroke={circuitColor}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.5,
              }}
            />
          ))}
        </svg>

        {/* Glowing Nodes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: circuitColor,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(2px)",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
              y: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default BackgroundEffects;
