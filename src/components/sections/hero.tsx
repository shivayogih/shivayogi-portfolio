import Image from "next/image";
import { portfolio } from "@/content/portfolio";
import { withBasePath } from "@/config/site";

export function Hero() {
  const linkedIn = portfolio.socials.find((social) => social.label === "LinkedIn")?.href;

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="shell hero__grid">
        <div className="hero__content">
          <div className="availability-pill">
            <span aria-hidden="true" />
            {portfolio.person.availability}
          </div>
          <p className="hero__role">Lead Android Engineer · Kotlin · Jetpack Compose</p>
          <h1 id="hero-title">{portfolio.person.hero}</h1>
          <p className="hero__support">{portfolio.person.heroSupport}</p>
          <div className="button-row" aria-label="Portfolio actions">
            <a className="button button--primary" href="#projects">
              Explore my work <span aria-hidden="true">↘</span>
            </a>
            <a
              className="button button--secondary"
              href={withBasePath("/Shivayogi-Hiremath-Resume.pdf")}
              download
            >
              Download resume
            </a>
            {linkedIn ? (
              <a className="button button--ghost" href={linkedIn} target="_blank" rel="noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </div>

        <figure className="hero-portrait">
          <div className="hero-portrait__frame">
            <Image
              src={withBasePath("/shivayogi-hiremath-profile.jpeg")}
              alt="Shivayogi Hiremath wearing a navy suit"
              width={1228}
              height={1333}
              priority
              sizes="(max-width: 760px) 88vw, (max-width: 1040px) 520px, 42vw"
            />
          </div>
          <div className="hero-portrait__badge" aria-hidden="true">
            <strong>8+</strong>
            <span>years building Android products</span>
          </div>
          <figcaption>
            <span>Based in Bengaluru</span>
            <strong>Available for Lead &amp; Senior Android roles</strong>
          </figcaption>
        </figure>
        <dl className="hero__facts" aria-label="Professional profile highlights">
          <div>
            <dt>Experience</dt>
            <dd>8+ years in Android</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{portfolio.person.location}</dd>
          </div>
          <div>
            <dt>Leadership</dt>
            <dd>Mentored 8 engineers</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
