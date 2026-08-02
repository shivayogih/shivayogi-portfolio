import { SectionHeading } from "@/components/common/section-heading";
import { portfolio } from "@/content/portfolio";

export function Principles() {
  return (
    <section className="section section--dark" aria-labelledby="principles-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Architecture and engineering principles"
          title="Strong systems make the right behaviour easier."
          description="The principles I use to turn mobile requirements into dependable, understandable software."
          headingId="principles-title"
        />
        <div className="principle-grid">
          {portfolio.principles.map((principle, index) => (
            <article key={principle.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
