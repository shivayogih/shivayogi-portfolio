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
import { portfolio } from "@/content/portfolio";

describe("portfolio content and interaction contract", () => {
  it("renders the verified hero identity and calls to action", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        name: "I build scalable, secure, and high-performance Android products.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view my work/i })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute(
      "href",
      "/Shivayogi-Hiremath-Resume.pdf",
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

  it("renders all featured projects without exposing Toolly source", () => {
    render(<Projects />);
    for (const project of portfolio.projects.filter((item) => item.featured)) {
      expect(screen.getByRole("heading", { name: project.name })).toBeInTheDocument();
    }
    const toollyCard = screen.getByRole("heading", { name: "Toolly" }).closest("article");
    expect(toollyCard).not.toBeNull();
    expect(within(toollyCard!).queryByRole("link", { name: /repository|source|github/i })).not.toBeInTheDocument();
    expect(portfolio.projects.find((project) => project.slug === "toolly")?.links).toHaveLength(0);
  });

  it("hides unverified empty social URLs", () => {
    render(<Footer />);
    expect(screen.queryByRole("link", { name: "LinkedIn" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Medium" })).not.toBeInTheDocument();
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
    expect(screen.getByRole("heading", { name: /purposeful mobile systems/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /practical toolkit for modern android products/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /strong systems make the right behaviour easier/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /full professional timeline/i })).toBeInTheDocument();
  });

  it("ships the downloadable PDF resume", () => {
    expect(existsSync(path.resolve("public", "Shivayogi-Hiremath-Resume.pdf"))).toBe(true);
  });
});
