import React, { useEffect } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown, Cpu, Zap, Plane, Cog } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  onExploreClick?: () => void;
  roboticCoreScale?: MotionValue<number>;
  roboticCoreX?: MotionValue<number>;
  roboticCoreOpacity?: MotionValue<number>;
  contentOpacity?: MotionValue<number>;
}

const HeroSection = ({
  title = "Jan \"Honzik\" Schenk",
  subtitle = "Software Engineering student at the University of Waterloo",
  onExploreClick = () => console.log("Explore clicked"),
  roboticCoreScale,
  roboticCoreX,
  roboticCoreOpacity,
  contentOpacity,
}: HeroSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen w-full bg-gradient-to-br from-background via-background/95 to-blue-500/5 flex items-center justify-center overflow-hidden"
    >
      {/* Floating Cloud Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 70 + 15}%`,
              top: `${Math.random() * 70 + 15}%`,
            }}
            animate={{
              x: [0, 30, -15, 0],
              y: [0, -20, 15, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 15,
            }}
          >
            {i % 4 === 0 ? (
              <Cpu className="w-6 h-6 text-blue-500/40" />
            ) : i % 4 === 1 ? (
              <Zap className="w-6 h-6 text-green-500/40" />
            ) : i % 4 === 2 ? (
              <Cog className="w-6 h-6 text-blue-400/40" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500/40 to-green-500/40" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Drone Flight Path */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: "-50px",
              top: `${25 + i * 15}%`,
            }}
            animate={{
              x: ["0px", "calc(100vw + 50px)"],
              y: [0, -30, 0, 30, 0],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 6,
            }}
          >
            <Plane className="w-4 h-4 text-blue-500/60 rotate-45" />
          </motion.div>
        ))}
      </div>

      {/* Robotic Elements */}
      <motion.div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central Core */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: {
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            scale: roboticCoreScale,
            x: roboticCoreX,
            y: 0, //TODO: Change - scrollYProgress
            opacity: roboticCoreOpacity,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
        >
          <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-blue-500/20 via-green-500/10 to-blue-500/20 backdrop-blur-sm flex items-center justify-center shadow-2xl border-2 border-blue-500/30">
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full border-2 border-green-500/40 shadow-lg"
            >
              {/* Orbiting Elements */}
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    width: "100%",
                    height: "100%",
                    transform: `rotate(${i * 120}deg)`,
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.5,
                      repeat: Infinity,
                    }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-blue-500/30 shadow-lg"
                  >
                    {i === 0 ? (
                      <Cpu className="w-4 h-4 text-blue-500" />
                    ) : i === 1 ? (
                      <Zap className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500 shadow-inner" />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 bg-size-200 animate-gradient-x leading-tight">
              {title}
            </h1>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 backdrop-blur-sm max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onExploreClick}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explore About Me
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
            <Button onClick={onExploreClick} className="bg-transparent hover:bg-transparent shadow-none border-none">
              <ArrowDown className="h-6 w-6 text-muted-foreground hover:text-blue-500 transition-colors duration-300" />
            </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
