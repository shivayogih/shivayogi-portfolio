import { SectionHeading } from "@/components/common/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { portfolio } from "@/content/portfolio";

export function Projects() {
  return (
    <section className="section section--muted" id="projects" aria-labelledby="projects-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Featured products and projects"
          title="Two products. Two systems problems worth solving."
          description="Toolly Scan brings useful document and QR workflows together on Android. DataLoom explores deterministic synchronization across Android and Kotlin Multiplatform. Both repositories are public and linked below."
          headingId="projects-title"
        />
        <div className="project-grid">
          {portfolio.projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
}
