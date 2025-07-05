import React from "react";
import { motion } from "framer-motion";
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
        "Autonomous campus navigator that leads users to their classes using Robot OS and Raspberry Pi",
      image:
        "/path-maxer.webp",
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
      title: "Degub Debacle (3rd place)",
      description:
        "3rd place at McHacks 2025 - Compete against others to fix bugs!",
      image:
        "/debug-debacle.webp",
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
        "Omnidirectional smart car controlled via web interface using ESP32 and Arduino",
      image:
        "/buddy-bot.webp",
      techStack: [
        { name: "ESP32", color: "bg-blue-600" },
        { name: "Arduino", color: "bg-red-500" },
        { name: "HTTP", color: "bg-purple-500" },
        { name: "HTTPS", color: "bg-green-500" },
      ],
      demoLink: "",
      githubLink: "https://github.com/honzikschenk/Omnidirectional-Smart-Car",
    },
    {
      title: "UTRA Hacks 2025 Competition Bot (2nd Place)",
      description:
        "Mini robot meant to solve UTRA Hack's 2025 capture the flag challenges. Won 2nd place (closed challenge) at UTRA Hacks 2025",
      image:
        "/utra.webp",
      techStack: [
        { name: "Adruino", color: "bg-blue-600" },
        { name: "C++", color: "bg-purple-500" },
        { name: "Embedded Sensors", color: "bg-orange-500" },
        { name: "State-Machines", color: "bg-green-500" },
      ],
      demoLink: "https://devpost.com/software/lebot-james-qgf9kw",
      githubLink: "https://github.com/vichua2006/UTRAHack2025",
    },
    {
      title: "Personal Portfolio Website",
      description:
        "This site - Modern portfolio site built with React",
      image:
        "/portfolio-site.webp",
      techStack: [
        { name: "React", color: "bg-blue-600" },
        { name: "TypeScript", color: "bg-blue-700" },
        { name: "Tailwind CSS", color: "bg-cyan-500" },
        { name: "Vite", color: "bg-purple-500" },
      ],
      demoLink: "https://honzikschenk.me",
      githubLink: "https://github.com/honzikschenk/honzikschenk.github.io",
    }
  ],
}: ProjectsGridProps) => {
  return (
    <motion.section
      className="w-full min-h-screen py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-16 flex items-center relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Tech Elements Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -30, 20, 0],
              rotate: [0, 180, 360],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: Math.random() * 12 + 18,
              repeat: Infinity,
              ease: "linear",
              delay: -Math.random() * 20,
            }}
          >
            <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-blue-500/25' : 'bg-green-500/25'}`} />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-green-500/5 -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.0, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                opacity: { delay: 0.0, duration: 0.6 },
                y: { delay: 0.0, duration: 0.6 },
                scale: { duration: 0.05 },
                default: { duration: 0.05 }
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.01, y: -8 }}
              whileTap={{ scale: 0.98 }}
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
