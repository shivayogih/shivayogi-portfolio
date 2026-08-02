import { existsSync } from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Principles } from "@/components/sections/principles";
import { Projects } from "@/components/sections/projects";
import { ResumeSection } from "@/components/sections/resume-section";
import { Skills } from "@/components/sections/skills";
import { withBasePath } from "@/config/site";
import { portfolio } from "@/content/portfolio";

describe("portfolio content and interaction contract", () => {
  it("renders the verified hero identity and calls to action", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        name: "Android engineering for products where reliability is not optional.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore my work/i })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute(
      "href",
      withBasePath("/Shivayogi-Hiremath-Resume.pdf"),
    );
  });

  it("renders every required navigation link", () => {
    render(<Header />);
    for (const item of portfolio.navigation) {
      expect(screen.getAllByRole("link", { name: item.label }).length).toBeGreaterThan(0);
    }
    expect(screen.getByRole("button", { name: /toggle color theme/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open navigation menu/i })).toBeInTheDocument();
  });

  it("renders only Toolly Scan and DataLoom with verified public repositories", () => {
    render(<Projects />);
    const featuredProjects = portfolio.projects.filter((item) => item.featured);
    expect(featuredProjects.map((project) => project.slug)).toEqual(["toolly", "dataloom"]);
    for (const project of featuredProjects) {
      expect(screen.getByRole("heading", { name: project.name })).toBeInTheDocument();
    }
    const toollyCard = screen.getByRole("heading", { name: "Toolly Scan" }).closest("article");
    expect(toollyCard).not.toBeNull();
    expect(within(toollyCard!).getByRole("link", { name: /view public repository/i })).toHaveAttribute(
      "href",
      "https://github.com/shivayogih/Toolly",
    );
    expect(portfolio.projects.find((project) => project.slug === "dataloom")?.links[0]?.href).toBe(
      "https://github.com/dataloom-sdk/dataloom",
    );
  });

  it("renders verified professional profiles", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/shivayogi-h-45784594",
    );
    expect(screen.getByRole("link", { name: "Medium" })).toHaveAttribute(
      "href",
      "https://medium.com/@shivayogih25",
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", portfolio.person.github);
  });

  it("uses the verified contact email and exposes an accessible copy control", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: portfolio.person.email })).toHaveAttribute(
      "href",
      `mailto:${portfolio.person.email}`,
    );
    expect(screen.getByRole("button", { name: "Copy email" })).toHaveAttribute(
      "data-copy-email",
      portfolio.person.email,
    );
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });

  it("renders expected accessible section headings", () => {
    render(
      <>
        <Experience />
        <Projects />
        <Skills />
        <Principles />
        <ResumeSection />
      </>,
    );
    expect(screen.getByRole("heading", { name: /android delivery across complex product domains/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /two products/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /practical toolkit for modern android products/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /strong systems make the right behaviour easier/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /right level of detail/i })).toBeInTheDocument();
  });

  it("ships the supplied resume, detailed CV, and profile portrait", () => {
    expect(existsSync(path.resolve("public", "Shivayogi-Hiremath-Resume.pdf"))).toBe(true);
    expect(existsSync(path.resolve("public", "Shivayogi-Hiremath-Detailed-CV.pdf"))).toBe(true);
    expect(existsSync(path.resolve("public", "shivayogi-hiremath-profile.jpeg"))).toBe(true);
  });
});
