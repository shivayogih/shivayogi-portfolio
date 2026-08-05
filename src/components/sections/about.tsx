import { portfolio } from "@/content/portfolio";
import { SectionHeading } from "@/components/common/section-heading";

export function About() {
  return (
    <section className="section section--muted" id="about" aria-labelledby="about-title">
      <div className="shell about-grid">
        <SectionHeading
          eyebrow="Professional summary"
          title="Hands-on leadership, from architecture to release."
          headingId="about-title"
        />
        <div className="about-copy">
          <p className="about-copy__lead">
            {portfolio.person.summary}
          </p>
          <p>
            My work spans products serving millions of users across hospitality,
            banking, retail, insurance, and mobility. I pair architecture ownership
            with practical delivery: structured reviews, mentoring, automated
            quality checks, and systems the next engineer can understand.
          </p>
        </div>
      </div>
    </section>
  );
}
