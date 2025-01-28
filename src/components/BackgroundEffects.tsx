import React from "react";
import { motion } from "framer-motion";

interface BackgroundEffectsProps {
  gridColor?: string;
  circuitColor?: string;
}

const BackgroundEffects = ({
  gridColor = "rgba(64, 224, 208, 0.1)",
  circuitColor = "rgba(0, 255, 128, 0.05)",
}: BackgroundEffectsProps) => {
  return (
    <div className="fixed inset-0 w-full h-full bg-background overflow-hidden pointer-events-none">
      {/* Animated Clouds */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          style={{
            width: `${Math.random() * 300 + 200}px`,
            height: `${Math.random() * 200 + 100}px`,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(64, 224, 208, 0.2) 0%, transparent 70%)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["-100%", "200%"],
            x: ["0%", `${(Math.random() - 0.5) * 50}%`],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: -Math.random() * 20,
          }}
        />
      ))}

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
