import type { ReactNode } from "react";
import { ExternalLink, Github, Mail, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { KIND_COLORS, KIND_LABELS, type Waypoint } from "./flightWorld";

interface WaypointPanelProps {
  waypoint: Waypoint;
  onClose: () => void;
}

const Chip = ({ label }: { label: string }) => (
  <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] text-sky-100">
    {label}
  </span>
);

const PanelLink = ({ href, label, icon }: { href: string; label: string; icon: ReactNode }) => (
  <a
    href={href}
    target={href.startsWith("mailto:") ? undefined : "_blank"}
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  >
    {icon}
    {label}
  </a>
);

const PanelBody = ({ waypoint }: { waypoint: Waypoint }) => {
  switch (waypoint.kind) {
    case "about":
      return (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-200/90">{waypoint.about.bio}</p>
          <dl className="space-y-2">
            {waypoint.about.details.map((detail) => (
              <div key={detail.label}>
                <dt className="hud-label">{detail.label}</dt>
                <dd className="text-sm text-slate-100">{detail.value}</dd>
              </div>
            ))}
          </dl>
          {waypoint.skills.map((group) => (
            <div key={group.title} className="space-y-2">
              <p className="hud-label">{group.title}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Chip key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "project": {
      const { project } = waypoint;
      return (
        <div className="space-y-4">
          {project.image.trim().length > 0 && (
            <img
              src={project.image}
              alt={project.title}
              className="aspect-video w-full rounded-lg border border-primary/20 object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
          <p className="text-sm leading-relaxed text-slate-200/90">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Chip key={tech.name} label={tech.name} />
            ))}
          </div>
          {(project.githubLink || project.demoLink) && (
            <div className="flex flex-wrap gap-2">
              {project.githubLink && (
                <PanelLink href={project.githubLink} label="Source" icon={<Github className="h-4 w-4" />} />
              )}
              {project.demoLink && (
                <PanelLink href={project.demoLink} label="Demo" icon={<ExternalLink className="h-4 w-4" />} />
              )}
            </div>
          )}
        </div>
      );
    }
    case "experience": {
      const { experience } = waypoint;
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {experience.logo && (
              <img
                src={experience.logo}
                alt={`${experience.company} logo`}
                className="h-12 w-12 rounded-lg border border-primary/20 bg-white/5 object-contain p-1"
                loading="lazy"
                decoding="async"
              />
            )}
            <div>
              <p className="text-sm font-semibold text-slate-100">{experience.position}</p>
              <p className="font-mono-flight text-xs text-primary/80">{experience.duration}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-200/90">{experience.description}</p>
          {experience.tags && (
            <div className="flex flex-wrap gap-1.5">
              {experience.tags.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </div>
          )}
        </div>
      );
    }
    case "contact":
      return (
        <div className="space-y-4">
          <p className="text-sm text-slate-200/90">Comms link established. Reach out on any channel.</p>
          <div className="flex flex-wrap gap-2">
            {waypoint.contact.links.map((link) => (
              <PanelLink
                key={link.label}
                href={link.href}
                label={link.label}
                icon={
                  link.icon === "github" ? (
                    <FaGithub className="h-4 w-4" />
                  ) : link.icon === "linkedin" ? (
                    <FaLinkedin className="h-4 w-4" />
                  ) : link.icon === "mail" ? (
                    <Mail className="h-4 w-4" />
                  ) : (
                    <ExternalLink className="h-4 w-4" />
                  )
                }
              />
            ))}
          </div>
        </div>
      );
  }
};

const WaypointPanel = ({ waypoint, onClose }: WaypointPanelProps) => {
  const color = KIND_COLORS[waypoint.kind];
  const title = waypoint.kind === "experience" ? waypoint.experience.company : waypoint.label;

  return (
    <section
      aria-live="polite"
      aria-label={`${KIND_LABELS[waypoint.kind]}: ${title}`}
      className="sky-glass pointer-events-auto flex min-h-0 max-h-full flex-col overflow-hidden rounded-2xl shadow-[0_18px_46px_rgba(4,12,26,0.6)]"
    >
      <header className="flex items-start justify-between gap-3 border-b border-primary/15 px-5 py-4">
        <div className="min-w-0">
          <p className="font-mono-flight text-[11px] uppercase tracking-[0.22em]" style={{ color }}>
            {KIND_LABELS[waypoint.kind]} · data recovered
          </p>
          <h2 className="mt-1 text-lg font-semibold leading-snug text-slate-50">{title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="shrink-0 rounded-lg p-1.5 text-primary/80 transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X className="h-4 w-4" />
        </button>
      </header>
      <div className="overflow-y-auto px-5 py-4">
        <PanelBody waypoint={waypoint} />
      </div>
    </section>
  );
};

export default WaypointPanel;
