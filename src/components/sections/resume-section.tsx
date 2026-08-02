import { SectionHeading } from "@/components/common/section-heading";
import { withBasePath } from "@/config/site";

export function ResumeSection() {
  return (
    <section className="section section--muted" id="resume" aria-labelledby="resume-title">
      <div className="shell resume-panel">
        <div>
          <SectionHeading
            eyebrow="Resume"
            title="The right level of detail for every review."
            description="Start with the concise two-page Lead Android Engineer resume, or download the detailed three-page CV for the full role and achievement history."
            headingId="resume-title"
          />
          <div className="button-row">
            <a className="button button--primary" href={withBasePath("/resume/")}>
              View HTML resume
            </a>
            <a
              className="button button--secondary"
              href={withBasePath("/Shivayogi-Hiremath-Resume.pdf")}
              download
            >
              Download 2-page resume
            </a>
            <a
              className="button button--ghost"
              href={withBasePath("/Shivayogi-Hiremath-Detailed-CV.pdf")}
              download
            >
              Download detailed CV
            </a>
          </div>
        </div>
        <div className="resume-panel__document" aria-hidden="true">
          <div className="resume-panel__monogram">SH</div>
          <span />
          <span />
          <span />
          <span className="short" />
          <strong>Android · Kotlin · Architecture</strong>
        </div>
      </div>
    </section>
  );
}
