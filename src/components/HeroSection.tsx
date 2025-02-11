import React, { useEffect } from "react";
import { motion, MotionValue, useTransform } from "motion/react";
import { Button } from "./ui/button";
import { ArrowDown, Cpu, Zap } from "lucide-react";

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
      className="relative h-screen w-full bg-background overflow-hidden flex items-center justify-center"
    >
      {/* Robotic Elements */}
      <motion.div>
      <div className="absolute inset-0 pointer-events-none">
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
          <div className="w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-green-500/10 flex items-center justify-center">
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative w-72 h-72 rounded-full border border-blue-500/20"
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
                    className="absolute -top-3 left-1/2 -translate-x-1/2 p-2 rounded-full bg-background border border-green-500/20"
                  >
                    {i === 0 ? (
                      <Cpu className="w-4 h-4 text-green-500" />
                    ) : i === 1 ? (
                      <Zap className="w-4 h-4 text-blue-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500" />
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
        className="relative z-10 text-center max-w-4xl px-4"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-8"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={onExploreClick}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
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
            <Button onClick={onExploreClick} className="bg-background shadow-none hover:bg-background">
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
