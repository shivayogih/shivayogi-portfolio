import type { PortfolioContent, Project } from "@/types/portfolio";
import portfolioData from "./portfolio.json";

export const portfolio: PortfolioContent = {
  ...portfolioData,
  navigation: portfolioData.navigation.map((item) => ({
    ...item,
    href: item.href as `#${string}`,
  })),
  projects: portfolioData.projects.map((project) => ({
    ...project,
    statusTone: project.statusTone as Project["statusTone"],
  })),
};

export function getProject(slug: string) {
  return portfolio.projects.find((project) => project.slug === slug);
}
