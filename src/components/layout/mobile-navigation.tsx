type MobileNavigationProps = {
  links: readonly { label: string; href: string }[];
};

export function MobileNavigation({ links }: MobileNavigationProps) {
  return (
    <div className="mobile-navigation" data-mobile-navigation>
      <button
        className="icon-button"
        type="button"
        data-menu-toggle
        aria-label="Open navigation menu"
        aria-expanded="false"
        aria-controls="mobile-navigation-menu"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" data-menu-icon-open />
          <path
            d="m6 6 12 12M18 6 6 18"
            data-menu-icon-close
            style={{ display: "none" }}
          />
        </svg>
      </button>
      <div className="mobile-navigation__panel" id="mobile-navigation-menu" hidden>
        <nav aria-label="Mobile navigation">
          {links.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
