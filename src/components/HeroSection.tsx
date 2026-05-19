import { motion, MotionValue, useMotionValue, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import type { HeroContent } from "@/content/siteContent";

interface HeroSectionProps extends HeroContent {
  onExploreClick?: () => void;
  scrollProgress?: MotionValue<number>;
}

const HeroSection = ({
  eyebrow,
  name,
  role,
  summary,
  image,
  imageAlt,
  ctaLabel,
  onExploreClick,
  scrollProgress,
}: HeroSectionProps) => {
  const fallbackProgress = useMotionValue(0);
  const progress = scrollProgress ?? fallbackProgress;

  const headingY = useTransform(progress, [0, 1], [0, -90]);
  const headingOpacity = useTransform(progress, [0, 0.7], [1, 0.35]);
  const imageY = useTransform(progress, [0, 1], [0, -110]);
  const imageX = useTransform(progress, [0, 1], [0, 24]);

  const handleExploreClick = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }

    const target = document.getElementById("about");
    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: window.matchMedia("(max-width: 768px)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative flex min-h-screen w-full items-center overflow-hidden px-4 pb-16 pt-24 sm:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_360px] lg:gap-14">
        <motion.div
          className="space-y-7"
          style={{ y: headingY, opacity: headingOpacity }}
        >
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-[#09233f]/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary/90 backdrop-blur-md">
            {eyebrow}
          </div>

          <div className="space-y-3">
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl xl:text-7xl">
              {name}
              <span className="mt-2 block bg-gradient-to-r from-primary via-sky-200 to-amber-200 bg-clip-text text-transparent sm:text-[0.42em] sm:leading-tight">
                {role}
              </span>
            </h1>

            <p className="max-w-xl text-base text-slate-200/85 sm:text-lg">
              {summary}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:ml-auto"
          style={{ y: imageY, x: imageX }}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative px-2 py-3 sm:px-3 sm:py-4">
            <div className="pointer-events-none absolute inset-1 rounded-2xl bg-[radial-gradient(circle_at_28%_25%,rgba(242,251,255,0.52),rgba(184,224,255,0.12)_58%,transparent_90%)] blur-md" />
            <div className="absolute -left-8 top-7 h-20 w-32 cloud-body opacity-90" />
            <div className="absolute -right-7 top-12 h-18 w-28 cloud-body opacity-80" />
            <div className="absolute -bottom-6 left-9 h-16 w-28 cloud-body opacity-75" />

            <div className="sky-glass relative overflow-hidden rounded-2xl border-primary/28 p-2 shadow-[0_18px_46px_rgba(56,134,204,0.28)]">
              <div className="overflow-hidden rounded-xl border border-primary/28 bg-[#041121]">
                <div className="relative aspect-[2/3] w-full">
                  <img
                    src={image}
                    alt={imageAlt}
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(4,17,33,0.08),rgba(4,17,33,0.34))]" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <Button
          type="button"
          onClick={handleExploreClick}
          variant="ghost"
          className="h-auto rounded-full border border-primary/25 bg-[#06172d]/75 px-4 py-2 text-primary hover:bg-[#0d2948]"
        >
          <ArrowDown className="mr-2 h-4 w-4" />
          <span className="font-mono-flight text-[11px] uppercase tracking-[0.2em]">{ctaLabel}</span>
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
