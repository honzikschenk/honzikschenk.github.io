import React from "react";
import { motion } from "framer-motion";
import { navigationSections, type NavSection } from "@/content/siteContent";

interface ScrollNavProps {
  sections?: NavSection[];
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
}

const ScrollNav = ({
  sections = navigationSections,
  activeSection = "hero",
  onSectionClick = () => {},
}: ScrollNavProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed right-3 top-1/2 z-50 -translate-y-1/2"
    >
      <nav className="sky-glass flex flex-col gap-2 rounded-2xl p-3">
        {sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <button
              type="button"
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 rounded-xl px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors duration-150 min-w-[72px] sm:min-w-[90px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-primary/85 hover:bg-primary/15"
              }`}
            >
              {section.label}
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default ScrollNav;
