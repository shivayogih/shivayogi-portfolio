import { withBasePath } from "@/config/site";
import { portfolio } from "@/content/portfolio";
import { CopyEmailButton } from "./copy-email-button";

export function Contact() {
  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="shell contact-panel">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Let’s build a mobile product that holds up in the real world.</h2>
          <p>{portfolio.person.availability}</p>
        </div>
        <div className="contact-panel__details">
          <div>
            <span>Email</span>
            <a href={`mailto:${portfolio.person.email}`}>{portfolio.person.email}</a>
          </div>
          <div className="button-row">
            <a className="button button--primary" href={`mailto:${portfolio.person.email}`}>
              Email me
            </a>
            <CopyEmailButton email={portfolio.person.email} />
            <a
              className="button button--secondary"
              href={portfolio.person.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              className="button button--secondary"
              href={withBasePath("/Shivayogi-Hiremath-Resume.pdf")}
              download
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

