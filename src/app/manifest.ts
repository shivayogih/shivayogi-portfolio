import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shivayogi Hiremath — Portfolio",
    short_name: "SH Portfolio",
    description: "Lead Android Developer and Mobile Architect portfolio.",
    start_url: "/shivayogi-portfolio/",
    display: "standalone",
    background_color: "#0c1017",
    theme_color: "#6754e2",
    icons: [
      {
        src: "/shivayogi-portfolio/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
