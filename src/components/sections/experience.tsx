import { TagList } from "@/components/common/tag-list";
import { SectionHeading } from "@/components/common/section-heading";
import { portfolio } from "@/content/portfolio";

export function Experience() {
  const recentExperience = portfolio.experience.filter((item) => !item.earlier);
  const earlierExperience = portfolio.experience.filter((item) => item.earlier);

  return (
    <section className="section section--muted" id="experience" aria-labelledby="experience-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Career experience"
          title="Android delivery across complex product domains."
          description="Public-safe summaries of recent engagements, with dates and responsibilities presented without unsupported metrics or confidential implementation details."
          headingId="experience-title"
        />
        <div className="timeline">
          {recentExperience.map((item) => (
            <article className="timeline-item" key={`${item.company}-${item.period}`}>
              <div className="timeline-item__rail" aria-hidden="true">
                <span />
              </div>
              <div className="timeline-item__meta">
                <p>{item.period}</p>
                <span>{item.role}</span>
              </div>
              <div className="timeline-item__content">
                <h3>{item.company}</h3>
                {item.client ? <p className="timeline-item__client">Client: {item.client}</p> : null}
                {item.project ? <p className="timeline-item__project">{item.project}</p> : null}
                <p>{item.summary}</p>
                {item.highlights.length ? (
                  <ul className="check-list">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
                <TagList items={item.technologies} compact />
              </div>
            </article>
          ))}
        </div>

        <div className="earlier-experience">
          <h3>Earlier experience</h3>
          <div className="earlier-experience__grid">
            {earlierExperience.map((item) => (
              <article key={`${item.company}-${item.period}`}>
                <p>{item.period}</p>
                <h4>{item.company}</h4>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
