import Image from "next/image";
import { portfolio } from "@/content/portfolio";
import { withBasePath } from "@/config/site";

export function Hero() {
  const visibleSocials = portfolio.socials.filter(
    (social): social is (typeof portfolio.socials)[number] & { href: string } =>
      Boolean(social.href),
  );
  const socialMarks: Record<string, string> = {
    GitHub: "GH",
    LinkedIn: "in",
    Medium: "M",
  };

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="shell hero__grid">
        <div className="hero__content">
          <p className="hero__role">Lead Android Engineer · Kotlin · Jetpack Compose</p>
          <h1 id="hero-title">
            <span>Hi, I&apos;m </span>
            <span className="hero__name">
              Shivayogi <span className="hero__wave" aria-hidden="true">👋</span>
            </span>
          </h1>
          <h2 className="hero__headline">{portfolio.person.hero}</h2>
          <p className="hero__support">{portfolio.person.heroSupport}</p>
          <div className="hero__meta" aria-label="Location and availability">
            <span>
              <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {portfolio.person.location}
            </span>
            <span className="hero__available">
              <i aria-hidden="true" />
              {portfolio.person.availability}
            </span>
          </div>
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
          </div>
          <nav className="hero__socials" aria-label="Social profiles">
            {visibleSocials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.label} (opens in a new tab)`}>
                <span aria-hidden="true">{socialMarks[social.label] ?? social.label.slice(0, 2)}</span>
              </a>
            ))}
          </nav>
        </div>

        <figure className="hero-portrait">
          <div className="hero-portrait__frame">
            <Image
              src={withBasePath(portfolio.person.profileImage)}
              alt={portfolio.person.profileAlt}
              width={370}
              height={378}
              priority
              sizes="(max-width: 760px) 72vw, 370px"
            />
          </div>
          <div className="hero-portrait__accent hero-portrait__accent--purple" aria-hidden="true" />
          <div className="hero-portrait__accent hero-portrait__accent--mint" aria-hidden="true" />
        </figure>
      </div>
    </section>
  );
}
