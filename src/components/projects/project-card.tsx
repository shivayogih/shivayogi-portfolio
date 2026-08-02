import { TagList } from "@/components/common/tag-list";
import { withBasePath } from "@/config/site";
import type { Project } from "@/types/portfolio";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card">
      <span className="project-card__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="project-card__topline">
        <p>{project.eyebrow}</p>
        <span className={`status status--${project.statusTone}`}>{project.status}</span>
      </div>
      <h3>{project.name}</h3>
      <p className="project-card__summary">{project.summary}</p>
      <TagList items={project.technologies.slice(0, 5)} compact />
      <div className="project-card__actions">
        <a href={withBasePath(`/projects/${project.slug}/`)}>
          Read case study <span aria-hidden="true">→</span>
        </a>
        {project.links.map((link) => (
          <a
            key={link.href}
            className="project-card__source"
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
          >
            {link.label}
            <span aria-hidden="true"> ↗</span>
            {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
          </a>
        ))}
      </div>
    </article>
  );
}
