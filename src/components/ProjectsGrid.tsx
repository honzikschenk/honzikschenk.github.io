import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { ProjectItem, SectionIntro } from "@/content/siteContent";

interface ProjectsGridProps extends SectionIntro {
  projects: ProjectItem[];
}

const ProjectsGrid = ({
  eyebrow,
  title,
  description,
  projects,
}: ProjectsGridProps) => {
  return (
    <motion.section
      className="relative w-full overflow-hidden px-4 py-16 sm:px-8 sm:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center sm:mb-12">
          <p className="hud-label">{eyebrow}</p>
          <h2 className="mt-3 bg-gradient-to-r from-blue-400 via-primary to-emerald-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200/80 sm:text-base">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              viewport={{ once: true, margin: "-40px" }}
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
