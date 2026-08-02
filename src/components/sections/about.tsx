import { portfolio } from "@/content/portfolio";
import { SectionHeading } from "@/components/common/section-heading";

export function About() {
  return (
    <section className="section section--muted" id="about" aria-labelledby="about-title">
      <div className="shell about-grid">
        <SectionHeading
          eyebrow="Professional summary"
          title="Senior mobile engineering, grounded in delivery."
          headingId="about-title"
        />
        <div className="about-copy">
          <p className="about-copy__lead">
            {portfolio.person.summary}
          </p>
          <p>
            My experience spans travel and hospitality, banking and fintech,
            retail and e-commerce, insurance, mobility, location-aware products,
            and enterprise mobile applications. I favour clear product language,
            evidence-led technical choices, and systems that the next engineer can
            understand.
          </p>
        </div>
      </div>
    </section>
  );
}
