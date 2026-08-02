import { SectionHeading } from "@/components/common/section-heading";
import { portfolio } from "@/content/portfolio";

export function Leadership() {
  return (
    <section className="section" aria-labelledby="leadership-title">
      <div className="shell leadership-grid">
        <SectionHeading
          eyebrow="Leadership and collaboration"
          title="Lead from the code, connect through context."
          description="Hands-on technical leadership that helps teams make sound decisions and carry them through delivery."
          headingId="leadership-title"
        />
        <ul className="leadership-list">
          {portfolio.leadership.map((item) => (
            <li key={item}>
              <span aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
