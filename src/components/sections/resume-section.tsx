import { SectionHeading } from "@/components/common/section-heading";
import { withBasePath } from "@/config/site";

export function ResumeSection() {
  return (
    <section className="section section--muted" id="resume" aria-labelledby="resume-title">
      <div className="shell resume-panel">
        <div>
          <SectionHeading
            eyebrow="Resume"
            title="The full professional timeline, ready to review."
            description="A concise, ATS-friendly resume generated from the same typed source as this website."
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
              Download PDF
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
