import React from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

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
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
      className="w-full bg-background"
    >
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
        {" "}
        {/* h-[450px] */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative h-48 overflow-hidden"
        >
          <OptimizedImage 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>

          <p className="text-muted-foreground line-clamp-3">{description}</p>

          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`${tech.color || "bg-gray-500"} text-white`}
              >
                {tech.name}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              asChild
            >
              {demoLink.length === 0 ? (
                <></>
              ) : (
                <a href={demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </a>
              )}
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              asChild
            >
              {githubLink.length === 0 ? (
                <></>
              ) : (
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  Code
                </a>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
