import { SectionHeading } from "@/components/common/section-heading";
import { portfolio } from "@/content/portfolio";

export function EnterpriseExperience() {
  const engagements = portfolio.experience.slice(0, 3);

  return (
    <section className="section" aria-labelledby="enterprise-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Selected enterprise experience"
          title="Trusted in established, multi-disciplinary product environments."
          description="Company names are presented as text. Proprietary product visuals, internal systems, and confidential architecture are not reproduced."
          headingId="enterprise-title"
        />
        <div className="enterprise-grid">
          {engagements.map((item) => (
            <article className="enterprise-card" key={item.client}>
              <p className="enterprise-card__client">{item.client}</p>
              <h3>{item.project ?? item.role}</h3>
              <p>{item.summary}</p>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
