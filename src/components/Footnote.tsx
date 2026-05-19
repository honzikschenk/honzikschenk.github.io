import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Globe, Mail } from "lucide-react";
import type { ContactContent, ContactLink } from "@/content/siteContent";

type FootnoteProps = ContactContent

const buttonStyles: Record<ContactLink["tone"], string> = {
  primary: "border-primary/35 bg-[#0a2444]/80 text-primary hover:bg-[#14365d]",
  accent: "border-amber-200/35 bg-[#35280f]/65 text-amber-100 hover:bg-[#4b3715]",
};

const Footnote = ({ eyebrow, title, description, links, webringLink }: FootnoteProps) => {
  return (
    <motion.section
      className="relative w-full overflow-hidden px-4 py-16 sm:px-8 sm:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="sky-glass rounded-3xl border-primary/20 p-6 text-center sm:p-10">
          <p className="hud-label">{eyebrow}</p>
          <h2 className="mt-3 bg-gradient-to-r from-blue-400 via-primary to-emerald-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200/85 sm:text-base">
            {description}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {links.map((link) => {
              const Icon =
                link.icon === "github"
                  ? FaGithub
                  : link.icon === "linkedin"
                    ? FaLinkedin
                    : link.icon === "mail"
                      ? Mail
                      : Globe;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 transition-colors ${buttonStyles[link.tone]}`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        {webringLink && (
          <div className="mt-4 sky-glass rounded-3xl border-amber-200/25 p-5 text-center sm:p-6">
            <p className="hud-label">Webring</p>
            <a
              href={webringLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-xl border border-amber-200/35 bg-[#35280f]/65 px-4 py-2 text-amber-100 transition-colors hover:bg-[#4b3715]"
            >
              <Globe className="h-4 w-4" />
              {webringLink.label}
            </a>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Footnote;
