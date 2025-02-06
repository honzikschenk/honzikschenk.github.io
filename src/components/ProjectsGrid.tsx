import React from "react";
import { motion } from "motion/react";
import ProjectCard from "./ProjectCard";

interface Project {
  title: string;
  description: string;
  image: string;
  techStack: { name: string; color: string }[];
  demoLink: string;
  githubLink: string;
}

interface ProjectsGridProps {
  projects?: Project[];
}

const ProjectsGrid = ({
  projects = [
    {
      title: "Campus Navigation Vehicle",
      description:
        "Autonomous campus navigator that leads users to their classes using Robot OS and Raspberry Pi.",
      image:
        "path-maxer.jpg",
      techStack: [
        { name: "Robot OS", color: "bg-blue-600" },
        { name: "Raspberry Pi", color: "bg-red-500" },
        { name: "C++", color: "bg-purple-500" },
        { name: "React Native", color: "bg-green-500" },
        { name: "Bluetooth", color: "bg-blue-500" },
      ],
      demoLink: "https://drive.google.com/file/d/1TNJl6DPzvSaDpCO_igs-X81bE8GjgqE4/view?usp=sharing",
      githubLink: "",
    },
    {
      title: "Degub Debacle",
      description:
        "3rd place at McHacks 2025 - Compete against others to fix bugs!",
      image:
        "/debug-debacle.jpg",
      techStack: [
        { name: "React", color: "bg-blue-600" },
        { name: "Flask", color: "bg-orange-500" },
        { name: "Gumloops AI", color: "bg-green-500" },
        { name: "Typescript", color: "bg-yellow-500" },
        { name: "Python", color: "bg-blue-700" },
      ],
      demoLink: "https://debug-debacle.vercel.app/",
      githubLink: "https://github.com/honzikschenk/debug-debacle",
    },
    {
      title: "Omnidirectional Smart Car",
      description:
        "Omnidirectional smart car controlled via web interface using ESP32 and Arduino.",
      image:
        "buddy-bot.jpg",
      techStack: [
        { name: "ESP32", color: "bg-blue-600" },
        { name: "Arduino", color: "bg-red-500" },
        { name: "HTTP", color: "bg-purple-500" },
        { name: "HTTPS", color: "bg-green-500" },
      ],
      demoLink: "",
      githubLink: "",
    }

    // Campus Navigation Vehicle | Robot OS, Raspberry Pi, C/C++, React Native, Expo, Bluetooth
    // • Team developed a campus navigator that could autonomously lead a user to their classes
    // • Prototype used a Raspberry Pi with Robot OS and localized using AprilTags
    // • Took the user′s schedule via an Expo/React Native app and uploaded it to the vehicle using Bluetooth
    // • Detected obstacles in its path using an ultrasonic sensor and stopped to prevent collisions
    // GiveGain (Fullstack Website) | Next.js, PostgreSQL, Prisma, Javascript/Typescript
    // • Prototype social-media-style app that would serve as a way to connect volunteers with organizations
    // • Utilized Next.js, PostgreSQL, and Prisma to achieve a streamlined full-stack experience
    // Omnidirectional Smart Car for Microbots Hackathon | ESP32, EspNow (HTTP), Arduino, HTTPS
    // • Omnidirectional smart car that could be controlled using a web interface served by an HTTP request (EspNow)
    // • Car ran on an ESP32 chip and displayed emotions on an OLED screen
    // • Emotions shaped by user’s actions, such as shaking the car or putting it upside down
  ],
}: ProjectsGridProps) => {
  return (
    <motion.section
      className="w-full min-h-screen py-20 px-4 md:px-8 lg:px-16 flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 0.99 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsGrid;
