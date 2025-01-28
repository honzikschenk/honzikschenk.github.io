import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroSection from "./HeroSection";
import ProjectsGrid from "./ProjectsGrid";
import ScrollNav from "./ScrollNav";
import BackgroundEffects from "./BackgroundEffects";
import AboutSection from "./AboutSection";

const sections = [
  { id: "hero", label: "Home", color: "bg-blue-500" },
  { id: "about", label: "About", color: "bg-purple-500" },
  { id: "projects", label: "Projects", color: "bg-green-500" },
];

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  const roboticCoreScale = useTransform(scrollY, [0, 500], [1, 2]);
  const roboticCoreX = useTransform(scrollY, [0, 500], [0, 300]);
  const roboticCoreOpacity = useTransform(scrollY, [0, 200, 500], [1, 1, 0]);
  const contentOpacity = useTransform(scrollY, [0, 200], [1, 0]);

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
      },
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

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

  return (
    <div className="relative w-full min-h-screen bg-background overflow-x-hidden">
      <BackgroundEffects />

      <ScrollNav
        sections={sections}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      <div
        ref={containerRef}
        className="snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth"
      >
        <section id="hero" className="snap-start h-screen">
          <HeroSection
            onExploreClick={handleExploreClick}
            roboticCoreScale={roboticCoreScale}
            roboticCoreX={roboticCoreX}
            roboticCoreOpacity={roboticCoreOpacity}
            contentOpacity={contentOpacity}
          />
        </section>

        <section id="about" className="snap-start min-h-screen">
          <AboutSection />
        </section>

        <section id="projects" className="snap-start min-h-screen">
          <ProjectsGrid />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
