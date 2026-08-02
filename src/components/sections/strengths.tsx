import { portfolio } from "@/content/portfolio";
import { SectionHeading } from "@/components/common/section-heading";

export function Strengths() {
  return (
    <section className="section" aria-labelledby="strengths-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Core engineering strengths"
          title="From platform detail to product direction."
          description="A hands-on approach that connects architecture, user experience, engineering quality, and dependable delivery."
          headingId="strengths-title"
        />
        <div className="strength-grid">
          {portfolio.strengths.map((strength, index) => (
            <article className="strength-card" key={strength.title}>
              <span className="strength-card__number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{strength.title}</h3>
              <p>{strength.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
