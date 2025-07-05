import React from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Cog, CircuitBoard, Rocket, Target } from "lucide-react";

interface BackgroundEffectsProps {
  gridColor?: string;
  circuitColor?: string;
}

const BackgroundEffects = ({
  gridColor = "rgba(59, 130, 246, 0.2)",
  circuitColor = "rgba(34, 197, 94, 0.15)",
}: BackgroundEffectsProps) => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Floating Tech Icons */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`tech-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            x: [0, 50, -25, 0],
            y: [0, -40, 25, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 15,
          }}
        >
          {i % 6 === 0 ? (
            <Cpu className="w-5 h-5 text-blue-500/30" />
          ) : i % 6 === 1 ? (
            <Zap className="w-5 h-5 text-green-500/30" />
          ) : i % 6 === 2 ? (
            <Cog className="w-5 h-5 text-blue-400/30" />
          ) : i % 6 === 3 ? (
            <CircuitBoard className="w-5 h-5 text-green-400/30" />
          ) : i % 6 === 4 ? (
            <Rocket className="w-5 h-5 text-blue-600/30" />
          ) : (
            <Target className="w-5 h-5 text-green-600/30" />
          )}
        </motion.div>
      ))}

      {/* Animated Circuit Connections */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`connection-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 8}%`,
            top: `${25 + (i % 3) * 15}%`,
            width: `${40 + Math.random() * 20}px`,
            height: "2px",
            background: `linear-gradient(90deg, ${i % 2 === 0 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(34, 197, 94, 0.3)'}, transparent)`,
            borderRadius: "1px",
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Orbiting Rings */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border"
          style={{
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            borderColor: i % 2 === 0 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(34, 197, 94, 0.2)',
            right: `${10 + i * 8}%`,
            top: `${25 + i * 12}%`,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(34, 197, 94, 0.6)',
              top: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}

      {/* Data Stream Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 2 === 0 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(34, 197, 94, 0.4)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 200, -100, 0],
            y: [0, -150, 100, 0],
            opacity: [0, 1, 0.5, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 15,
          }}
        />
      ))}

      {/* Enhanced Grid Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
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
