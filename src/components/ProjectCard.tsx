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
  title = "Project Title",
  description = "A brief description of the project and its key features. This is a placeholder text that can be replaced with actual project details.",
  image = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
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
      className="w-full bg-background"
    >
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300"> {/* h-[450px] */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative h-48 overflow-hidden"
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
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
              <a href={demoLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              asChild
            >
              <a href={githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                Code
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
