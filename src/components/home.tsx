import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { scroll } from "framer-motion";
import HeroSection from "./HeroSection";
import ProjectsGrid from "./ProjectsGrid";
import ScrollNav from "./ScrollNav";
import BackgroundEffects from "./BackgroundEffects";
import AboutSection from "./AboutSection";
import Footnote from "./Footnote";
import Experience from "./Experience";
import SpaceGame from "./SpaceGame";
import { TooltipProvider } from "./ui/tooltip";

const sections = [
  { id: "hero", label: "Home", color: "bg-blue-500" },
  { id: "about", label: "About", color: "bg-purple-500" },
  { id: "projects", label: "Projects", color: "bg-green-500" },
  { id: "experience", label: "Experience", color: "bg-red-500" },
  { id: "contact", label: "Connections", color: "bg-orange-500" },
];

const HomePage = () => {

  const [activeSection, setActiveSection] = useState("hero");
  const [isSpaceGameOpen, setIsSpaceGameOpen] = useState(false);
  const containerRef = useRef();

  const scrollYProgress = useMotionValue(0);

  const roboticCoreScale = useTransform(scrollYProgress, [0, 500], [1, 2]);
  const roboticCoreX = useTransform(scrollYProgress, [0, 500], [0, 300]);
  const roboticCoreOpacity = useTransform(scrollYProgress, [0, 200, 500], [1, 1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 200], [1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px",
        threshold: 0,
      }
    );

    const { current } = containerRef;
    if (current) {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.observe(element);
        }
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreClick = () => {
    handleSectionClick("about");
  };

  const handleSpaceGameClick = () => {
    setIsSpaceGameOpen(true);
  };

  const handleSpaceGameClose = () => {
    setIsSpaceGameOpen(false);
  };

  return (
    <TooltipProvider>
      <motion.div
        ref={containerRef}
        className="relative w-full min-h-screen bg-gradient-to-br from-background via-background/98 to-primary/5 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
      <ScrollNav
        sections={sections}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      <BackgroundEffects />

      <motion.div
        className="snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <section id="hero" className="snap-start snap-always min-h-screen overflow-hidden">
          <HeroSection
            onExploreClick={handleExploreClick}
            onSpaceGameClick={handleSpaceGameClick}
            roboticCoreScale={roboticCoreScale}
            roboticCoreX={roboticCoreX}
            roboticCoreOpacity={roboticCoreOpacity}
            contentOpacity={contentOpacity}
          />
        </section>

        <motion.section
          id="about"
          className="snap-start snap-always min-h-screen relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <AboutSection />
        </motion.section>

        <motion.section
          id="projects"
          className="snap-start snap-always min-h-screen relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <ProjectsGrid />
        </motion.section>

        <motion.section
          id="experience"
          className="snap-start snap-always min-h-screen relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Experience />
        </motion.section>

        <motion.section
          id="contact"
          className="snap-start snap-always min-h-screen relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Footnote />
        </motion.section>
      </motion.div>

      {/* Space Game Modal */}
      <SpaceGame open={isSpaceGameOpen} onClose={handleSpaceGameClose} />
      </motion.div>
    </TooltipProvider>
  );
};

export default HomePage;
