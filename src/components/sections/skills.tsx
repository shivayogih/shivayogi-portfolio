import { SectionHeading } from "@/components/common/section-heading";
import { TagList } from "@/components/common/tag-list";
import { portfolio } from "@/content/portfolio";

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Technical skills"
          title="A practical toolkit for modern Android products."
          description="Capabilities are grouped by how they contribute to a product—not reduced to arbitrary percentage ratings."
          headingId="skills-title"
        />
        <div className="skills-grid">
          {portfolio.skillGroups.map((group) => (
            <article className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <TagList items={group.skills} compact />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
