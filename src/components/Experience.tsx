import React from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import OptimizedImage from "./OptimizedImage";

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
      position: "Autonomous Subteam Project Manager - Simulation/Testing",
      duration: "November 2024 - Present",
      description:
        "Work on a team developing a drone for competition that autonomously identifies fires and extinguishes them. Worked on IR Camera Calibration using OpenCV and Python to identify IR sources (fire substitute).",
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
      className="w-full py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-16 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Smooth gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent -z-10" />
      
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3 sm:mb-4"
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
          {/* Modern timeline line */}
          <motion.div
            className="hidden sm:block absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-primary/30 via-accent/50 to-primary/30 rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.1 }}
          />

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
                {/* Timeline dot */}
                <motion.div
                  className="hidden sm:block absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-primary shadow-lg z-10 border-2 border-background"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                />

                {/* Content card */}
                <motion.div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? "md:ml-auto" : ""
                  } ml-0 sm:ml-12 md:ml-0`}
                >
                  <Card className="p-4 sm:p-5 md:p-6 bg-background/95 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      {experience.logo && (
                        <motion.div
                          className="flex-shrink-0 self-center sm:self-start"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-white/10 rounded-lg shadow-md p-1.5 sm:p-2 flex items-center justify-center">
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
                        >
                          {experience.position}
                        </motion.h3>
                        <motion.h4
                          className="text-sm sm:text-base font-semibold text-primary mb-1"
                        >
                          {experience.company}
                        </motion.h4>
                        <motion.p
                          className="text-xs sm:text-sm text-foreground/70 font-medium mb-3"
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
                                className="px-2 py-0.5 sm:py-1 bg-primary/10 text-primary text-xs font-medium rounded-md border border-primary/20 hover:bg-primary/20 transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.15 }}
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
