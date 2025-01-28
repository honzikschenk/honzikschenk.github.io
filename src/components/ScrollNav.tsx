import React from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Section {
  id: string;
  label: string;
  color?: string;
}

interface ScrollNavProps {
  sections?: Section[];
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
}

const ScrollNav = ({
  sections = [
    { id: "hero", label: "Home", color: "bg-blue-500" },
    { id: "projects", label: "Projects", color: "bg-green-500" },
    { id: "about", label: "About", color: "bg-purple-500" },
    { id: "contact", label: "Contact", color: "bg-orange-500" },
  ],
  activeSection = "hero",
  onSectionClick = () => {},
}: ScrollNavProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 bg-background/80 backdrop-blur-sm rounded-full py-4 px-2"
    >
      <TooltipProvider>
        <nav className="flex flex-col gap-4">
          {sections.map((section) => (
            <Tooltip key={section.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onSectionClick(section.id)}
                  className="relative w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <motion.div
                    className={`absolute inset-0 rounded-full ${section.color || "bg-primary"}`}
                    animate={{
                      scale: activeSection === section.id ? 1.5 : 1,
                      opacity: activeSection === section.id ? 1 : 0.5,
                    }}
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="mr-2">
                {section.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    </motion.div>
  );
};

export default ScrollNav;
