import { portfolio } from "@/content/portfolio";
import { withBasePath } from "@/config/site";

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="shell hero__grid">
        <div className="hero__content">
          <div className="availability-pill">
            <span aria-hidden="true" />
            {portfolio.person.availability}
          </div>
          <p className="hero__role">Lead Android Developer · Mobile Architect</p>
          <h1 id="hero-title">{portfolio.person.hero}</h1>
          <p className="hero__support">{portfolio.person.heroSupport}</p>
          <div className="button-row" aria-label="Portfolio actions">
            <a className="button button--primary" href="#projects">
              View my work <span aria-hidden="true">↘</span>
            </a>
            <a
              className="button button--secondary"
              href={withBasePath("/Shivayogi-Hiremath-Resume.pdf")}
              download
            >
              Download resume
            </a>
            <a
              className="button button--ghost"
              href={`mailto:${portfolio.person.email}`}
            >
              Contact me
            </a>
            <a
              className="button button--ghost"
              href={portfolio.person.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <dl className="hero__facts" aria-label="Professional profile highlights">
            <div>
              <dt>Experience</dt>
              <dd>Android engineering since 2017</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{portfolio.person.location}</dd>
            </div>
            <div>
              <dt>Core focus</dt>
              <dd>Kotlin · Compose · Architecture</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual" aria-label="Android architecture illustration">
          <div className="hero-visual__orbit hero-visual__orbit--one" />
          <div className="hero-visual__orbit hero-visual__orbit--two" />
          <div className="hero-visual__device">
            <div className="hero-visual__topbar">
              <span />
              <span />
              <span />
              <p>mobile.architecture.kt</p>
            </div>
            <div className="code-block" aria-hidden="true">
              <p><span className="code-keyword">sealed interface</span> UiState</p>
              <p className="code-indent"><span className="code-keyword">data class</span> Ready(</p>
              <p className="code-indent code-indent--two">val product: Product</p>
              <p className="code-indent">) : UiState</p>
              <p className="code-space" />
              <p><span className="code-keyword">fun</span> build() = architecture &#123;</p>
              <p className="code-indent">state = <span className="code-value">explicit</span></p>
              <p className="code-indent">offline = <span className="code-value">resilient</span></p>
              <p className="code-indent">delivery = <span className="code-value">tested</span></p>
              <p>&#125;</p>
            </div>
            <div className="hero-visual__signal">
              <span aria-hidden="true">✓</span>
              <div>
                <strong>Release-ready thinking</strong>
                <p>Architecture through delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

