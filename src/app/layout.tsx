import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { portfolio } from "@/content/portfolio";
import "./globals.css";

const productionBasePath = "/shivayogi-portfolio";
const socialImage = new URL("og-image.svg", portfolio.site.url).toString();

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
        url: socialImage,
        width: 1200,
        height: 630,
        alt: `${portfolio.person.name}, Lead Android Engineer and Mobile Architect`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.site.title,
    description: portfolio.site.description,
    images: [socialImage],
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
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
