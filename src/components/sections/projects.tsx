import { SectionHeading } from "@/components/common/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { portfolio } from "@/content/portfolio";

export function Projects() {
  return (
    <section className="section section--muted" id="projects" aria-labelledby="projects-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Featured products and projects"
          title="Purposeful mobile systems, presented with honest status."
          description="Product architecture, technical decisions, and current state—without invented outcomes, private source links, or confidential client material."
          headingId="projects-title"
        />
        <div className="project-grid">
          {portfolio.projects
            .filter((project) => project.featured)
            .map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
        </div>
      </div>
    </section>
  );
}
