import Image from "next/image";
import { withBasePath } from "@/config/site";
import { portfolio } from "@/content/portfolio";

function StoreIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
      <path d="M4.1 2.8 13.6 12 4.1 21.2a2.1 2.1 0 0 1-.6-1.5V4.3c0-.6.2-1.1.6-1.5Z" fill="currentColor" opacity=".9" />
      <path d="m13.6 12 2.8-2.7 3.5 2c.8.5.8 1.4 0 1.9l-3.5 2-2.8-3.2Z" fill="currentColor" opacity=".62" />
    </svg>
  );
}

export function WorkedApps() {
  return (
    <section className="section section--muted worked-apps" id="apps" aria-labelledby="apps-title">
      <div className="shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Applications I have worked on</p>
            <h2 id="apps-title">Shipped across travel, banking, retail, drones, and services.</h2>
          </div>
          <p>
            Public store links for products referenced in my CV. My contribution was as part of the
            respective product and engineering teams.
          </p>
        </div>

        <div className="worked-apps__grid">
          {portfolio.apps.map((app) => (
            <a
              className="worked-app-card"
              href={app.href}
              key={app.name}
              target="_blank"
              rel="noreferrer"
            >
              <span className="worked-app-card__icon" aria-hidden="true">
                {app.icon ? (
                  <Image
                    src={withBasePath(app.icon)}
                    alt=""
                    width={72}
                    height={72}
                    sizes="72px"
                  />
                ) : (
                  <span className="worked-app-card__monogram">MD</span>
                )}
              </span>
              <span className="worked-app-card__body">
                <span className="worked-app-card__company">{app.company}</span>
                <strong>{app.name}</strong>
                <span>{app.contribution}</span>
              </span>
              <span className="worked-app-card__link">
                {app.archived ? null : <StoreIcon />}
                {app.platform} <span aria-hidden="true">↗</span>
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
