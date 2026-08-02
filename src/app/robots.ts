import type { MetadataRoute } from "next";
import { portfolio } from "@/content/portfolio";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${portfolio.site.url}sitemap.xml`,
    host: portfolio.site.url,
  };
}
