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
      title: "Autonomous Drone Platform",
      description:
        "A cutting-edge drone control system with AI-powered navigation and real-time obstacle avoidance.",
      image:
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      techStack: [
        { name: "Python", color: "bg-blue-600" },
        { name: "TensorFlow", color: "bg-orange-500" },
        { name: "ROS", color: "bg-green-600" },
      ],
      demoLink: "https://demo.example.com/drone",
      githubLink: "https://github.com/example/drone-platform",
    },
    {
      title: "Smart City Monitor",
      description:
        "IoT-based urban monitoring system for tracking environmental metrics and city infrastructure status.",
      image:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      techStack: [
        { name: "React", color: "bg-blue-500" },
        { name: "Node.js", color: "bg-green-500" },
        { name: "MongoDB", color: "bg-green-600" },
      ],
      demoLink: "https://demo.example.com/smart-city",
      githubLink: "https://github.com/example/smart-city",
    },
    {
      title: "Robotics Control Interface",
      description:
        "Web-based control interface for industrial robotics with real-time monitoring and gesture control.",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      techStack: [
        { name: "TypeScript", color: "bg-blue-600" },
        { name: "WebSocket", color: "bg-purple-500" },
        { name: "Three.js", color: "bg-red-500" },
      ],
      demoLink: "https://demo.example.com/robotics",
      githubLink: "https://github.com/example/robotics-interface",
    },
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
