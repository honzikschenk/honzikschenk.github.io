import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";

interface Experience {
  logo?: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface ExperienceProps {
  Experience?: Experience[];
}

const Experience = ({
  Experience = [
    {
      logo: "cowtech.png",
      company: "Cowden Technologies, Inc.",
      position: "Robotics and Autonomous Systems Intern",
      duration: "May 2025 - Present",
      description:
        "Assisting in the design, development, and optimization of autonomous systems technologies. Designing various solutions to UAV sensors for autonomy such as PCB design, ROS development, and Pixhawk configuration.",
    },
    {
      logo: "warg.png",
      company: "Waterloo Aerial Robotics Group",
      position: "Autonomous Subteam Project Manager - Simulation/Testing",
      duration: "November 2024 - Present",
      description:
        "Work on a team developing a drone for competition that autonomously identifies fires and extinguishes them. Worked on IR Camera Calibration using OpenCV and Python to identify IR sources (fire substitute).",
    },
    {
      logo: "atc.jpg",
      company: "Appalachian Trial Conservancy",
      position: "Campsite Inventory Technician",
      duration: "July 2024 - August 2024",
      description:
        "Worked independently to inventory campsites along assigned sections of the Appalachian Trail. Navigated Geographic information system (GIS) to document scientific assessments.",
    },
    {
        logo: "vt.png",
      company: "Virginia Tech Computer Science Department",
      position: "Back-End Cybersecurity Intern",
      duration: "February 2023 - May 2023",
      description:
        "Created a model of Virginia Tech's Smart Grid system to protect against cyber attacks. Used Internet of Things devices to interface with a Next.js and MongoDB app to control and monitor system. Presented our model at Virginia Tech's ICAT Day, winning the People's Choice Award.",
    },
    {
      logo: "401.png",
      company: "FIRST Robotics Competition Team 401",
      position: "Programming Lead, Electrical Lead",
      duration: "September 2021 - May 2024",
      description:
        "Led a 12-person team, organizing weekly standups and task assignments. Used Java to program a custom, autonomous 125-pound robot. Implemented industry-standards such as state-space control, real-time AprilTag localization, and CAN bus protocol. Collaborated using Github Pull Requests and Actions to achieve a Continuous Integration (CI) workflow. Personally wrote and received $2,500 in grants, and presented at annual autonomous systems symposium. Qualified for the international championships, making it to the quarter-finals two years in a row. Presented internationally to faculty and students at the Technical University of Ostrava, CZ.",
    },
  ],
}: ExperienceProps) => {
    return (
        <motion.section
          className="w-full min-h-screen py-20 px-4 md:px-8 lg:px-16 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileInView={{ opacity: 0.99 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 text-foreground"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: false }}
            >
              Experience
            </motion.h2>
            <div className="relative">
              <div className="border-l-2 border-muted-foreground absolute h-full lg:left-1/2 lg:transform lg:-translate-x-1/2"></div>
              <div className="space-y-8">
                {Experience.map((experience, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center ${
                      index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
                    }`}
                  >
                    <div className="bg-background p-6 rounded-lg shadow-lg w-full lg:w-1/2 flex items-center">
                      {experience.logo && (
                        <img
                          src={experience.logo}
                          alt={`${experience.company} logo`}
                          className="w-16 mr-4"
                        />
                      )}
                      <div>
                        <h4 className="text-2xl font-semibold mb-2">
                          {experience.position}
                        </h4>
                        <h5 className="text-xl text-muted-foreground mb-2">
                          {experience.company}
                        </h5>
                        <p className="text-muted-foreground mb-2">
                          {experience.duration}
                        </p>
                        <p className="text-muted-foreground">{experience.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      );
    };
    
    export default Experience;
