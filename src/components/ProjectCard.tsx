import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github, Plane, SquareStack } from "lucide-react";

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
  const isFlightProject = /autonomous|uav|drone|navigation|robot|control/i.test(
    `${title} ${description} ${techStack.map((item) => item.name).join(" ")}`
  );
  const accentClasses = isFlightProject
    ? {
        pill: "border-primary/35 bg-[#091e38]/85 text-primary",
        title:
          "bg-gradient-to-r from-blue-100 via-primary to-emerald-200 bg-clip-text text-transparent",
      }
    : {
        pill: "border-violet-300/35 bg-[#1f1738]/85 text-violet-100",
        title:
          "bg-gradient-to-r from-violet-100 via-sky-100 to-amber-100 bg-clip-text text-transparent",
      };

  return (
    <Card className="sky-glass group w-full overflow-hidden rounded-2xl border-primary/20 shadow-[0_12px_24px_rgba(6,18,34,0.35)] transition-colors duration-200 hover:border-primary/45">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020a16]/85 via-[#020a16]/20 to-transparent" />

        <div className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${accentClasses.pill}`}>
          {isFlightProject ? <Plane className="h-3 w-3" /> : <SquareStack className="h-3 w-3" />}
          {isFlightProject ? "Robotics" : "Software"}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <h3 className={`text-xl font-bold sm:text-2xl ${accentClasses.title}`}>{title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-200/80">{description}</p>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge
              key={tech.name}
              variant="secondary"
              className={`${tech.color || "bg-slate-500"} border-0 text-white`}
            >
              {tech.name}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {demoLink.length > 0 && (
            <Button
              variant="outline"
              className="rounded-lg border-primary/35 bg-[#0b2545]/80 text-primary hover:bg-[#14365d] hover:text-primary"
              asChild
            >
              <a href={demoLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </a>
            </Button>
          )}
          {githubLink.length > 0 && (
            <Button
              variant="outline"
              className="rounded-lg border-amber-200/35 bg-[#2f2514]/65 text-amber-100 hover:bg-[#4a381a] hover:text-amber-100"
              asChild
            >
              <a href={githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
