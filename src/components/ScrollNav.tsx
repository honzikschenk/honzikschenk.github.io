import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Plane, X } from "lucide-react";
import { navigationSections, type NavSection } from "@/content/siteContent";

interface ScrollNavProps {
  sections?: NavSection[];
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
  onLaunchFlight?: () => void;
  brand?: string;
}

const ScrollNav = ({
  sections = navigationSections,
  activeSection = "hero",
  onSectionClick = () => {},
  onLaunchFlight,
  brand = "Honzik Schenk",
}: ScrollNavProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeLabel = sections.find((section) => section.id === activeSection)?.label;

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleMenuSelect = (sectionId: string) => {
    setMenuOpen(false);
    onSectionClick(sectionId);
  };

  const handleMenuFlight = () => {
    setMenuOpen(false);
    onLaunchFlight?.();
  };

  return (
    <>
      {/* Wide screens: vertical rail on the right edge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 nav:block"
      >
        <nav aria-label="Sections" className="sky-glass flex flex-col gap-2 rounded-2xl p-3">
          {sections.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <button
                type="button"
                key={section.id}
                onClick={() => onSectionClick(section.id)}
                aria-current={isActive ? "page" : undefined}
                className={`min-w-[90px] shrink-0 rounded-xl px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
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
              className="mt-1 inline-flex min-w-[90px] shrink-0 items-center justify-center gap-1.5 rounded-xl border border-accent/40 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-accent transition-colors duration-150 hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Plane className="h-3.5 w-3.5" aria-hidden="true" />
              Fly
            </button>
          )}
        </nav>
      </motion.div>

      {/* Narrow screens: top bar with a collapsible menu */}
      <div className="fixed inset-x-0 top-0 z-50 nav:hidden">
        <AnimatePresence>
          {menuOpen && (
            <motion.button
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-[#020812]/55 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="sky-glass relative !border-x-0 !border-t-0 pt-[env(safe-area-inset-top)]"
        >
          <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
            <button
              type="button"
              onClick={() => handleMenuSelect("hero")}
              className="flex min-w-0 items-baseline gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="truncate text-base font-semibold text-slate-50">{brand}</span>
              {activeLabel && activeSection !== "hero" && (
                <span className="hud-label hidden truncate min-[360px]:inline">/ {activeLabel}</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                id="mobile-nav-menu"
                aria-label="Sections"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="overflow-hidden border-t border-primary/15"
              >
                <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 sm:px-8">
                  {sections.map((section) => {
                    const isActive = activeSection === section.id;

                    return (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={() => handleMenuSelect(section.id)}
                          aria-current={isActive ? "page" : undefined}
                          className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-xs uppercase tracking-[0.18em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-primary/85 hover:bg-primary/15"
                          }`}
                        >
                          {section.label}
                        </button>
                      </li>
                    );
                  })}
                  {onLaunchFlight && (
                    <li className="pt-1">
                      <button
                        type="button"
                        onClick={handleMenuFlight}
                        className="flex w-full items-center gap-2 rounded-xl border border-accent/40 px-4 py-3 text-left text-xs uppercase tracking-[0.18em] text-accent transition-colors duration-150 hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <Plane className="h-4 w-4" aria-hidden="true" />
                        Flight mode
                      </button>
                    </li>
                  )}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.header>
      </div>
    </>
  );
};

export default ScrollNav;
