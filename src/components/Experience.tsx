import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import OptimizedImage from "./OptimizedImage";
import { Cpu, Zap, Cog, CircuitBoard, Rocket, Target } from "lucide-react";

interface Experience {
  logo?: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  tags?: string[];
}

interface ExperienceProps {
  Experience?: Experience[];
}

const Experience = ({
  Experience = [
    {
      logo: "cowtech.webp",
      company: "Cowden Technologies, Inc.",
      position: "Robotics and Autonomous Systems Intern",
      duration: "May 2025 - Present",
      description:
        "Assisting in the design, development, and optimization of autonomous systems technologies. Designing various solutions to UAV sensors for autonomy such as PCB design, ROS development, and Pixhawk configuration.",
      tags: ["UAV", "ROS", "PCB Design", "Pixhawk", "Autonomous Systems"],
    },
    {
      logo: "warg.webp",
      company: "Waterloo Aerial Robotics Group",
      position: "Autonomy Subteam Lead, prev. Project Manager - Simulation/Testing",
      duration: "November 2024 - Present",
      description:
        "Lead a subteam on a competition drone project focused on autonomous fire detection and suppression. Managed the development for a new Hardware in the Loop project, emulating a physical drone layout",
      tags: ["UAV", "OpenCV", "Python", "IR Camera", "Autonomous Systems", "Competition"],
    },
    {
      logo: "atc.webp",
      company: "Appalachian Trial Conservancy",
      position: "Campsite Inventory Technician",
      duration: "July 2024 - August 2024",
      description:
        "Worked independently to inventory campsites along assigned sections of the Appalachian Trail. Navigated Geographic information system (GIS) to document scientific assessments.",
      tags: ["GIS", "Field Work", "Data Collection", "Scientific Assessment"],
    },
    {
      logo: "vt.webp",
      company: "Virginia Tech Computer Science Department",
      position: "Back-End Cybersecurity Intern",
      duration: "February 2023 - May 2023",
      description:
        "Created a model of Virginia Tech's Smart Grid system to protect against cyber attacks. Used Internet of Things devices to interface with a Next.js and MongoDB app to control and monitor system. Presented our model at Virginia Tech's ICAT Day, winning the People's Choice Award.",
      tags: ["Next.js", "MongoDB", "IoT", "Cybersecurity", "Smart Grid"],
    },
    {
      logo: "401.webp",
      company: "FIRST Robotics Competition Team 401",
      position: "Programming Lead, Electrical Lead",
      duration: "September 2021 - May 2024",
      description:
        "Led a 12-person team, organizing weekly standups and task assignments. Used Java to program a custom, autonomous 125-pound robot. Implemented industry-standards such as state-space control, real-time AprilTag localization, and CAN bus protocol. Collaborated using Github Pull Requests and Actions to achieve a Continuous Integration (CI) workflow. Personally wrote and received $2,500 in grants, and presented at annual autonomous systems symposium. Qualified for the international championships, making it to the quarter-finals two years in a row. Presented internationally to faculty and students at the Technical University of Ostrava, CZ.",
      tags: ["Java", "Team Leadership", "AprilTag", "CAN Bus", "CI/CD", "International Competition"],
    },
  ],
}: ExperienceProps) => {
  return (
    <motion.section
      className="w-full py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-16 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Animated Tech Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Circuit Elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`circuit-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, -25, 0],
              y: [0, -30, 20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          >
            {i % 4 === 0 ? (
              <Cpu className="w-4 h-4 text-blue-500/30" />
            ) : i % 4 === 1 ? (
              <Zap className="w-4 h-4 text-green-500/30" />
            ) : i % 4 === 2 ? (
              <Cog className="w-4 h-4 text-blue-400/30" />
            ) : (
              <CircuitBoard className="w-4 h-4 text-green-400/30" />
            )}
          </motion.div>
        ))}

        {/* Animated Grid Lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`grid-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Orbiting Elements */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute w-20 h-20 rounded-full border border-green-500/20"
            style={{
              right: `${10 + i * 15}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500/60 rounded-full"
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

        {/* Data Stream Lines */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-blue-500/20 via-green-500/20 to-blue-500/20"
            style={{
              left: `${25 + i * 20}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleY: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Blue-Green gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-green-500/5 -z-10" />
      
      <div className="max-w-6xl mx-auto w-full relative">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-3 sm:mb-4"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Experience
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
          >
            My journey through robotics, autonomous systems, and software development
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Enhanced Timeline with Moving Parts */}
          <motion.div
            className="hidden sm:block absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500/40 via-green-500/60 to-blue-500/40 rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.1 }}
          />

          {/* Animated Data Pulses on Timeline */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="hidden sm:block absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-8 bg-gradient-to-b from-blue-500/80 to-green-500/80 rounded-full z-20"
              animate={{
                y: ["-10%", "500%", "600%"],
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          ))}

          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {Experience.map((experience, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-start gap-4 sm:gap-6 md:gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true, margin: "-20px" }}
              >
                {/* Enhanced Timeline Dot with Rotating Ring */}
                <motion.div
                  className="hidden sm:block absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {/* Rotating outer ring */}
                  <motion.div
                    className="w-8 h-8 rounded-full border-2 border-blue-500/30"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg"
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(34, 197, 94, 0.7)",
                          "0 0 0 6px rgba(34, 197, 94, 0)",
                          "0 0 0 0 rgba(34, 197, 94, 0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Enhanced Content Card */}
                <motion.div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? "md:ml-auto" : ""
                  } ml-0 sm:ml-12 md:ml-0`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-4 sm:p-5 md:p-6 bg-background/95 backdrop-blur-sm border-2 border-blue-500/20 hover:border-green-500/40 transition-all duration-100 shadow-lg hover:shadow-2xl relative overflow-hidden">
                    {/* Animated corner elements */}
                    <motion.div
                      className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-bl-full"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    
                    {/* Moving tech lines */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-500/40 via-green-500/40 to-blue-500/40"
                      animate={{
                        x: ["-100%", "100%"],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    />

                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 relative z-10">
                      {experience.logo && (
                        <motion.div
                          className="flex-shrink-0 self-center sm:self-start"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-lg shadow-md p-1.5 sm:p-2 flex items-center justify-center border border-blue-500/20">
                            <OptimizedImage
                              src={experience.logo}
                              alt={`${experience.company} logo`}
                              className="w-full h-full object-contain"
                              style={{ objectFit: "contain" }}
                              sizes="(max-width: 640px) 64px, (max-width: 768px) 72px, 80px"
                            />
                          </div>
                        </motion.div>
                      )}
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <motion.h3
                          className="text-lg sm:text-xl font-bold text-foreground mb-1 leading-tight"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {experience.position}
                        </motion.h3>
                        <motion.h4
                          className="text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-1"
                        >
                          {experience.company}
                        </motion.h4>
                        <motion.p
                          className="text-xs sm:text-sm text-blue-400 font-medium mb-3"
                        >
                          {experience.duration}
                        </motion.p>
                        <motion.p
                          className="text-muted-foreground leading-relaxed mb-4 text-xs sm:text-sm"
                        >
                          {experience.description}
                        </motion.p>
                        {experience.tags && (
                          <motion.div
                            className="flex flex-wrap gap-1 sm:gap-1.5 justify-center sm:justify-start"
                          >
                            {experience.tags.map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                className="px-2 py-0.5 sm:py-1 bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-400 text-xs font-medium rounded-md border border-blue-500/30 hover:border-green-500/40 transition-colors duration-200"
                                whileHover={{ scale: 1.05, y: -2 }}
                                transition={{ duration: 0.1 }}
                                animate={{
                                  boxShadow: [
                                    "0 0 0 0 rgba(59, 130, 246, 0.5)",
                                    "0 0 0 2px rgba(59, 130, 246, 0.1)",
                                    "0 0 0 0 rgba(59, 130, 246, 0.5)",
                                  ],
                                }}
                                style={{
                                  animationDelay: `${tagIndex * 0.1}s`,
                                  animationDuration: "3s",
                                  animationIterationCount: "infinite",
                                }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
