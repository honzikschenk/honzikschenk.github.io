import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import HeroSection from "./HeroSection";
import ProjectsGrid from "./ProjectsGrid";
import ScrollNav from "./ScrollNav";
import BackgroundEffects from "./BackgroundEffects";
import AboutSection from "./AboutSection";
import Footnote from "./Footnote";
import Experience from "./Experience";
import {
  aboutContent,
  contactContent,
  experienceIntro,
  experiences,
  heroContent,
  navigationSections,
  projects,
  projectsIntro,
  skillGroups,
} from "@/content/siteContent";

const sections = navigationSections;

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const targetY = window.innerHeight * 0.45;
      let closestSection = sections[0]?.id ?? "hero";
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (!element) {
          return;
        }

        const rect = element.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - targetY);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = section.id;
        }
      });

      setActiveSection((current) =>
        current === closestSection ? current : closestSection
      );
    };

    const onScrollOrResize = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: window.matchMedia("(max-width: 768px)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      <BackgroundEffects />

      <ScrollNav
        sections={sections}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      <motion.main
        className="relative z-10"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <section id="hero" className="min-h-screen">
          <HeroSection
            {...heroContent}
            onExploreClick={() => handleSectionClick("about")}
            scrollProgress={scrollYProgress}
          />
        </section>

        <section id="about" className="relative min-h-screen">
          <AboutSection {...aboutContent} skillGroups={skillGroups} />
        </section>

        <section id="projects" className="relative min-h-screen">
          <ProjectsGrid {...projectsIntro} projects={projects} />
        </section>

        <section id="experience" className="relative min-h-screen">
          <Experience {...experienceIntro} experiences={experiences} />
        </section>

        <section id="contact" className="relative min-h-screen">
          <Footnote {...contactContent} />
        </section>
      </motion.main>
    </div>
  );
};

export default HomePage;
