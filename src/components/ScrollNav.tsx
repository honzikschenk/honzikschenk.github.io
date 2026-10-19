import React from "react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { navigationSections, type NavSection } from "@/content/siteContent";

interface ScrollNavProps {
  sections?: NavSection[];
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
  onLaunchFlight?: () => void;
}

const ScrollNav = ({
  sections = navigationSections,
  activeSection = "hero",
  onSectionClick = () => {},
  onLaunchFlight,
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
        {onLaunchFlight && (
          <button
            type="button"
            onClick={onLaunchFlight}
            title="Explore the portfolio by flying a drone"
            className="mt-1 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-accent/40 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-accent transition-colors duration-150 min-w-[72px] sm:min-w-[90px] hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Plane className="h-3.5 w-3.5" aria-hidden="true" />
            Fly
          </button>
        )}
      </nav>
    </motion.div>
  );
};

export default ScrollNav;
