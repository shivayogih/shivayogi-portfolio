import type { MetadataRoute } from "next";
import { portfolio } from "@/content/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = portfolio.projects.map((project) => ({
    url: `${portfolio.site.url}projects/${project.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: portfolio.site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${portfolio.site.url}resume/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectPages,
  ];
}
