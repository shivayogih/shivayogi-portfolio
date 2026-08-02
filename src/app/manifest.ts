import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shivayogi Hiremath — Portfolio",
    short_name: "SH Portfolio",
    description: "Lead Android Engineer and Mobile Architect portfolio.",
    start_url: "/shivayogi-portfolio/",
    display: "standalone",
    background_color: "#f5f7fb",
    theme_color: "#3157d5",
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
