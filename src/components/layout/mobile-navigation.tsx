"use client";

import { useEffect, useRef, useState } from "react";

type MobileNavigationProps = {
  links: readonly { label: string; href: string }[];
};

export function MobileNavigation({ links }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const toggleButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) firstLink.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleButton.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <div className="mobile-navigation">
      <button
        className="icon-button"
        ref={toggleButton}
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation-menu"
        onClick={() => setOpen((current) => !current)}
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
          {open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <div className="mobile-navigation__panel" id="mobile-navigation-menu" hidden={!open}>
        <nav aria-label="Mobile navigation">
          {links.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              ref={index === 0 ? firstLink : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
