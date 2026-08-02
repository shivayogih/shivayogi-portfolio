import { withBasePath } from "@/config/site";
import { portfolio } from "@/content/portfolio";
import type { SocialLink } from "@/types/portfolio";

export function Footer() {
  const links = portfolio.socials.filter(
    (link): link is SocialLink & { href: string } => Boolean(link.href),
  );

  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div>
          <p className="site-footer__name">{portfolio.person.name}</p>
          <p>Lead Android Developer · Senior Android Engineer · Mobile Architect</p>
        </div>
        <nav aria-label="Footer links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
          <a href={withBasePath("/resume/")}>Resume</a>
        </nav>
        <p className="site-footer__copyright">
          © {new Date().getFullYear()} Shivayogi Hiremath
        </p>
      </div>
    </footer>
  );
}
