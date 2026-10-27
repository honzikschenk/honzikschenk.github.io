import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Globe, Mail } from "lucide-react";
import type { AboutContent, ContactLink, SkillGroup } from "@/content/siteContent";

interface AboutSectionProps extends AboutContent {
  skillGroups: SkillGroup[];
  links?: ContactLink[];
}

const linkIcons: Record<ContactLink["icon"], React.ElementType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  mail: Mail,
  globe: Globe,
};

const AboutSection = ({
  eyebrow,
  title,
  bio,
  details,
  skillGroups,
  links = [],
}: AboutSectionProps) => {
  const skillToneClasses = [
    "border-blue-400/25 bg-blue-500/10 text-blue-100",
    "border-emerald-400/25 bg-emerald-500/10 text-emerald-100",
    "border-amber-300/25 bg-amber-400/10 text-amber-100",
    "border-violet-400/25 bg-violet-500/10 text-violet-100",
  ];

  return (
    <motion.section
      className="relative w-full overflow-hidden px-4 py-16 sm:px-8 sm:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center sm:mb-14">
          <p className="hud-label">{eyebrow}</p>
          <h2 className="mt-3 bg-gradient-to-r from-blue-400 via-primary to-emerald-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <Card className="sky-glass rounded-3xl border-primary/20 p-6">
              <p className="text-sm leading-relaxed text-slate-100/90 sm:text-base">{bio}</p>

              {links.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {links.map((link) => {
                    const Icon = linkIcons[link.icon];

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-slate-300/70 transition-colors hover:text-primary sm:text-sm"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {details.map((detail) => (
                  <div key={detail.label} className="rounded-xl border border-primary/20 bg-[#071a31]/80 p-3">
                    <p className="hud-label">{detail.label}</p>
                    <p className="mt-1 text-sm">{detail.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            viewport={{ once: true }}
          >
            <Card className="sky-glass rounded-3xl p-6">
              <p className="hud-label">Skills</p>
              <div className="mt-5 space-y-5">
                {skillGroups.map((group, index) => (
                  <div key={group.title}>
                    <h3 className="mb-2 text-base font-semibold text-slate-100">{group.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className={`rounded-md border px-2 py-1 text-[11px] ${skillToneClasses[index % skillToneClasses.length]}`}
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
