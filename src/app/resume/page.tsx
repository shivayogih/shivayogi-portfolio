import type { Metadata } from "next";
import { TagList } from "@/components/common/tag-list";
import { withBasePath } from "@/config/site";
import { portfolio } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Resume",
  description: `Professional resume of ${portfolio.person.name}, Lead Android Developer and Mobile Architect.`,
  alternates: { canonical: `${portfolio.site.url}resume/` },
};

export default function ResumePage() {
  return (
    <article className="html-resume">
      <div className="shell shell--resume">
        <header className="html-resume__header">
          <div>
            <p className="eyebrow">Professional resume</p>
            <h1>{portfolio.person.name}</h1>
            <p className="html-resume__title">{portfolio.person.titles.join(" · ")}</p>
          </div>
          <div className="html-resume__contact">
            <p>{portfolio.person.location}</p>
            <a href={`mailto:${portfolio.person.email}`}>{portfolio.person.email}</a>
            <a href={portfolio.person.github}>{portfolio.person.github.replace("https://", "")}</a>
            <a
              className="button button--primary"
              href={withBasePath("/Shivayogi-Hiremath-Resume.pdf")}
              download
            >
              Download PDF
            </a>
          </div>
        </header>

        <section aria-labelledby="resume-summary">
          <h2 id="resume-summary">Summary</h2>
          <p>{portfolio.person.summary}</p>
        </section>

        <section aria-labelledby="resume-skills">
          <h2 id="resume-skills">Core skills</h2>
          <TagList
            items={[
              "Kotlin",
              "Java",
              "Android SDK",
              "Jetpack Compose",
              "Coroutines and Flow",
              "MVVM and MVI",
              "Clean Architecture",
              "Modularisation",
              "REST and GraphQL",
              "Room and DataStore",
              "Testing",
              "CI/CD",
              "Technical leadership",
            ]}
          />
        </section>

        <section aria-labelledby="resume-experience">
          <h2 id="resume-experience">Experience</h2>
          <div className="html-resume__timeline">
            {portfolio.experience.map((item) => (
              <article key={`${item.company}-${item.period}`}>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.company}{item.client ? ` · Client: ${item.client}` : ""}</p>
                </div>
                <p>{item.period}</p>
                <p className="html-resume__summary">{item.summary}</p>
                {item.highlights.length ? (
                  <ul>
                    {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="resume-projects">
          <h2 id="resume-projects">Selected projects</h2>
          <div className="html-resume__projects">
            {portfolio.projects.slice(0, 3).map((project) => (
              <article key={project.slug}>
                <h3>{project.name}</h3>
                <p>{project.status}</p>
                <p>{project.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="resume-education">
          <h2 id="resume-education">Education</h2>
          <h3>{portfolio.education.degree}</h3>
          <p>{portfolio.education.college}</p>
          <p>{portfolio.education.university} · Completed {portfolio.education.completed}</p>
        </section>
      </div>
    </article>
  );
}

