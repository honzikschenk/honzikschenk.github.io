import React from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import OptimizedImage from "./OptimizedImage";
import { Building2, CalendarDays } from "lucide-react";
import type { ExperienceItem, SectionIntro } from "@/content/siteContent";

interface ExperienceProps extends SectionIntro {
  experiences: ExperienceItem[];
}

const Experience = ({
  eyebrow,
  title,
  description,
  experiences,
}: ExperienceProps) => {
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

        <div className="relative">
          <div className="absolute left-[11px] top-0 hidden h-full w-px bg-gradient-to-b from-primary/10 via-primary/60 to-primary/10 sm:block" />

          <div className="space-y-6 sm:space-y-8">
            {experiences.map((experience, index) => (
              <motion.article
                key={`${experience.company}-${experience.duration}`}
                className="relative"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <div className="absolute left-0 top-7 hidden h-6 w-6 items-center justify-center rounded-full border border-primary/50 bg-[#0a2444] sm:flex">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>

                <Card className="sky-glass overflow-hidden rounded-2xl border-primary/20 p-5 sm:ml-10 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    {experience.logo && (
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-primary/25 bg-[#06172e] p-2 sm:h-20 sm:w-20">
                        <OptimizedImage
                          src={experience.logo}
                          alt={`${experience.company} logo`}
                          className="h-full w-full object-contain"
                          style={{ objectFit: "contain" }}
                          sizes="80px"
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-slate-100 sm:text-xl">{experience.position}</h3>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-primary/90 sm:text-sm">
                        <span className="inline-flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5" />
                          {experience.company}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {experience.duration}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-slate-100/85 sm:text-base">
                        {experience.description}
                      </p>

                      {experience.tags && experience.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {experience.tags.map((tag) => (
                            <Badge
                              key={`${experience.company}-${tag}`}
                              variant="secondary"
                              className="rounded-md border border-primary/25 bg-[#0a2545] px-2 py-1 text-[11px] text-primary"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
