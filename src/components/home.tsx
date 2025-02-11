import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { scroll } from "motion";
import HeroSection from "./HeroSection";
import ProjectsGrid from "./ProjectsGrid";
import ScrollNav from "./ScrollNav";
import BackgroundEffects from "./BackgroundEffects";
import AboutSection from "./AboutSection";
import Footnote from "./Footnote";

const sections = [
  { id: "hero", label: "Home", color: "bg-blue-500" },
  { id: "about", label: "About", color: "bg-purple-500" },
  { id: "projects", label: "Projects", color: "bg-green-500" },
  { id: "contact", label: "Connections", color: "bg-orange-500" },
];

const HomePage = () => {

  const [activeSection, setActiveSection] = useState("hero");
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

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-background overflow-x-hidden">
      <ScrollNav
        sections={sections}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      <BackgroundEffects />

      <div className="snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth">
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

        <section id="contact" className="snap-start min-h-screen">
          <Footnote />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
