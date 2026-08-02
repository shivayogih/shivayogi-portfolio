import { withBasePath } from "@/config/site";
import { portfolio } from "@/content/portfolio";
import { MobileNavigation } from "./mobile-navigation";

export function Header() {
  const navigationLinks = portfolio.navigation.map((item) => ({
    label: item.label,
    href: withBasePath(`/${item.href}`),
  }));

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a className="brand" href={withBasePath("/#home")} aria-label="Shivayogi Hiremath home">
          <span className="brand__mark" aria-hidden="true">
            SH
          </span>
          <span className="brand__text">Shivayogi Hiremath</span>
        </a>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          {navigationLinks.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <MobileNavigation links={navigationLinks} />
        </div>
      </div>
    </header>
  );
}
