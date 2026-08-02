import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TagList } from "@/components/common/tag-list";
import { withBasePath } from "@/config/site";
import { getProject, portfolio } from "@/content/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolio.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const url = `${portfolio.site.url}projects/${project.slug}/`;
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.name} case study`,
      description: project.summary,
      url,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="case-study">
      <header className="case-study__hero">
        <div className="shell shell--reading">
          <a className="back-link" href={withBasePath("/#projects")}>
            ← Back to projects
          </a>
          <p className="eyebrow">{project.eyebrow}</p>
          <h1>{project.name}</h1>
          <p className="case-study__summary">{project.summary}</p>
          <span className={`status status--${project.statusTone}`}>{project.status}</span>
        </div>
      </header>
      <div className="shell shell--reading case-study__body">
        <section aria-labelledby="overview-heading">
          <p className="case-study__index">01</p>
          <div>
            <h2 id="overview-heading">Overview</h2>
            <p>{project.overview}</p>
          </div>
        </section>
        <section aria-labelledby="problem-heading">
          <p className="case-study__index">02</p>
          <div>
            <h2 id="problem-heading">Problem</h2>
            <p>{project.problem}</p>
          </div>
        </section>
        <section aria-labelledby="role-heading">
          <p className="case-study__index">03</p>
          <div>
            <h2 id="role-heading">Role</h2>
            <p>{project.role}</p>
          </div>
        </section>
        <section aria-labelledby="approach-heading">
          <p className="case-study__index">04</p>
          <div>
            <h2 id="approach-heading">Approach</h2>
            <ul className="check-list">
              {project.approach.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>
        <section aria-labelledby="architecture-heading">
          <p className="case-study__index">05</p>
          <div>
            <h2 id="architecture-heading">Architecture</h2>
            <p>{project.architecture}</p>
          </div>
        </section>
        <section aria-labelledby="decisions-heading">
          <p className="case-study__index">06</p>
          <div>
            <h2 id="decisions-heading">Technical decisions</h2>
            <ul className="check-list">
              {project.decisions.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>
        <section aria-labelledby="challenges-heading">
          <p className="case-study__index">07</p>
          <div>
            <h2 id="challenges-heading">Challenges</h2>
            <ul className="check-list">
              {project.challenges.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>
        <section aria-labelledby="outcome-heading">
          <p className="case-study__index">08</p>
          <div>
            <h2 id="outcome-heading">Outcome and current status</h2>
            <p>{project.outcome}</p>
          </div>
        </section>
        <section aria-labelledby="technology-heading">
          <p className="case-study__index">09</p>
          <div>
            <h2 id="technology-heading">Technologies</h2>
            <TagList items={project.technologies} />
          </div>
        </section>
        <section aria-labelledby="links-heading">
          <p className="case-study__index">10</p>
          <div>
            <h2 id="links-heading">Links</h2>
            {project.links.length ? (
              <div className="button-row">
                {project.links.map((link) => (
                  <a
                    className="button button--secondary"
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                  >
                    {link.label}
                    {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </a>
                ))}
              </div>
            ) : (
              <p>No public source link is shown for this project.</p>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}
