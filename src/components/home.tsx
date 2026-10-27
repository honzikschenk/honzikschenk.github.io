import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
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

// The flight explorer is optional, so keep it out of the main bundle until requested.
const FlightExplorer = lazy(() => import("./flight/FlightExplorer"));

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [flightOpen, setFlightOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      // The active section is the last one whose top has crossed this line; comparing
      // section centers breaks down for tall sections, which are common on mobile.
      const targetY = window.innerHeight * 0.45;
      let closestSection = sections[0]?.id ?? "hero";

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= targetY) {
          closestSection = section.id;
        }
      });

      // The last section may be too short to ever reach the line, so pin it at the page bottom.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && sections.length > 0) {
        closestSection = sections[sections.length - 1].id;
      }

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
        onLaunchFlight={() => setFlightOpen(true)}
      />

      <motion.main
        className="relative z-10"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <section id="hero" className="min-h-svh">
          <HeroSection
            {...heroContent}
            onExploreClick={() => handleSectionClick("about")}
            onLaunchFlight={() => setFlightOpen(true)}
            scrollProgress={scrollYProgress}
          />
        </section>

        <section id="about" className="relative min-h-svh scroll-mt-14 nav:scroll-mt-0">
          <AboutSection {...aboutContent} skillGroups={skillGroups} />
        </section>

        <section id="projects" className="relative min-h-svh scroll-mt-14 nav:scroll-mt-0">
          <ProjectsGrid {...projectsIntro} projects={projects} />
        </section>

        <section id="experience" className="relative min-h-svh scroll-mt-14 nav:scroll-mt-0">
          <Experience {...experienceIntro} experiences={experiences} />
        </section>

        <section id="contact" className="relative min-h-svh scroll-mt-14 nav:scroll-mt-0">
          <Footnote {...contactContent} />
        </section>
      </motion.main>

      {flightOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#04101f]">
              <p className="hud-label">Preparing for takeoff…</p>
            </div>
          }
        >
          <FlightExplorer onExit={() => setFlightOpen(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default HomePage;
