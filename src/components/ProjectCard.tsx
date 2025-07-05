import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";

interface TechStack {
  name: string;
  color?: string;
}

interface ProjectCardProps {
  title?: string;
  description?: string;
  image?: string;
  techStack?: TechStack[];
  demoLink?: string;
  githubLink?: string;
}

const ProjectCard = ({
  title = "",
  description = "",
  image = "",
  techStack = [
    { name: "React", color: "bg-blue-500" },
    { name: "TypeScript", color: "bg-blue-600" },
    { name: "Tailwind", color: "bg-cyan-500" },
  ],
  demoLink = "https://demo.example.com",
  githubLink = "https://github.com/example/project",
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 bg-background/95 backdrop-blur-sm border border-border/50 hover:border-primary/30 rounded-xl">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.6 }}
          className="relative h-48 overflow-hidden rounded-t-xl"
        >
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>
        <div className="p-6 space-y-4 bg-background/95 backdrop-blur-sm">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
            {title}
          </h3>

          <p className="text-muted-foreground line-clamp-3">{description}</p>

          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`${tech.color || "bg-gray-500"} text-white border-0 transition-transform duration-200`}
              >
                {tech.name}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            {demoLink.length > 0 && (
              <Button
                variant="outline"
                className="flex items-center gap-2 hover:bg-blue-500/10 hover:border-blue-500/50 transition-colors duration-200"
                asChild
              >
                <a href={demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </a>
              </Button>
            )}
            {githubLink.length > 0 && (
              <Button
                variant="outline"
                className="flex items-center gap-2 hover:bg-green-500/10 hover:border-green-500/50 transition-colors duration-200"
                asChild
              >
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
