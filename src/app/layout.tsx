import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { portfolio } from "@/content/portfolio";
import "./globals.css";

const productionBasePath = "/shivayogi-portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.site.url),
  title: {
    default: portfolio.site.title,
    template: `%s | ${portfolio.person.name}`,
  },
  description: portfolio.site.description,
  authors: [{ name: portfolio.person.name, url: portfolio.person.github }],
  creator: portfolio.person.name,
  publisher: portfolio.person.name,
  alternates: {
    canonical: portfolio.site.url,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: portfolio.site.url,
    siteName: `${portfolio.person.name} — Portfolio`,
    title: portfolio.site.title,
    description: portfolio.site.description,
    images: [
      {
        url: `${productionBasePath}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: `${portfolio.person.name}, Lead Android Developer and Mobile Architect`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.site.title,
    description: portfolio.site.description,
    images: [`${productionBasePath}/og-image.svg`],
  },
  icons: {
    icon: `${productionBasePath}/icon.svg`,
    apple: `${productionBasePath}/apple-touch-icon.svg`,
  },
  manifest: `${productionBasePath}/manifest.webmanifest`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1017" },
  ],
};

const themeScript = `
  (function () {
    try {
      var saved = localStorage.getItem('theme');
      var dark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
      var theme = dark ? 'dark' : 'light';
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (_) {}

    function initializeInteractions() {
      var themeToggle = document.querySelector('[data-theme-toggle]');
      if (themeToggle) {
        themeToggle.addEventListener('click', function () {
          var current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
          var next = current === 'dark' ? 'light' : 'dark';
          document.documentElement.dataset.theme = next;
          document.documentElement.style.colorScheme = next;
          try { localStorage.setItem('theme', next); } catch (_) {}
        });
      }

      var navigation = document.querySelector('[data-mobile-navigation]');
      if (navigation) {
        var menuToggle = navigation.querySelector('[data-menu-toggle]');
        var menu = navigation.querySelector('#mobile-navigation-menu');
        var openIcon = navigation.querySelector('[data-menu-icon-open]');
        var closeIcon = navigation.querySelector('[data-menu-icon-close]');

        function setMenuOpen(open) {
          menuToggle.setAttribute('aria-expanded', String(open));
          menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
          menu.hidden = !open;
          openIcon.style.display = open ? 'none' : '';
          closeIcon.style.display = open ? '' : 'none';
          if (open) {
            var firstLink = menu.querySelector('a');
            if (firstLink) firstLink.focus();
          }
        }

        menuToggle.addEventListener('click', function () {
          setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
        });
        menu.addEventListener('click', function (event) {
          if (event.target.closest('a')) setMenuOpen(false);
        });
        window.addEventListener('keydown', function (event) {
          if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            setMenuOpen(false);
            menuToggle.focus();
          }
        });
      }

      document.querySelectorAll('[data-copy-email]').forEach(function (button) {
        button.addEventListener('click', async function () {
          var email = button.getAttribute('data-copy-email');
          var status = button.parentElement.querySelector('[data-copy-status]');
          try {
            await navigator.clipboard.writeText(email);
            status.textContent = 'Email copied to clipboard.';
          } catch (_) {
            status.textContent = 'Copy failed. Email: ' + email;
          }
        });
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeInteractions, { once: true });
    } else {
      initializeInteractions();
    }
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
