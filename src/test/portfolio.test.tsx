import { existsSync } from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout/header";
import { AdminEditor } from "@/components/admin/admin-editor";
import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Principles } from "@/components/sections/principles";
import { Projects } from "@/components/sections/projects";
import { ResumeSection } from "@/components/sections/resume-section";
import { Skills } from "@/components/sections/skills";
import { WorkedApps } from "@/components/sections/worked-apps";
import { withBasePath } from "@/config/site";
import { portfolio } from "@/content/portfolio";

describe("portfolio content and interaction contract", () => {
  it("renders the verified hero identity and calls to action", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        name: portfolio.person.hero,
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
    expect(screen.queryByRole("button", { name: /toggle color theme/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open navigation menu/i })).toBeInTheDocument();
  });

  it("renders verified public links for applications from the supplied CV", () => {
    render(<WorkedApps />);
    expect(portfolio.apps).toHaveLength(7);
    for (const app of portfolio.apps) {
      expect(screen.getByRole("link", { name: new RegExp(app.name, "i") })).toHaveAttribute(
        "href",
        app.href,
      );
    }
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
    expect(
      within(toollyCard!).getByRole("link", { name: /view public repository/i }).getAttribute("href"),
    ).toMatch(/^https:\/\/github\.com\//);
    expect(portfolio.projects.find((project) => project.slug === "dataloom")?.links[0]?.href).toMatch(
      /^https:\/\/github\.com\//,
    );
  });

  it("renders verified professional profiles", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      portfolio.socials.find((social) => social.label === "LinkedIn")?.href,
    );
    expect(screen.getByRole("link", { name: "Medium" })).toHaveAttribute(
      "href",
      portfolio.socials.find((social) => social.label === "Medium")?.href,
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

  it("renders the separate GitHub-backed admin publishing workspace", () => {
    render(<AdminEditor />);
    expect(screen.getByRole("heading", { name: "Portfolio admin" })).toBeInTheDocument();
    expect(screen.getByLabelText("GitHub token")).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: "Publish website changes" })).toBeDisabled();
  });

  it("ships the supplied resume, detailed CV, profile portrait, and worked-app icons", () => {
    expect(existsSync(path.resolve("public", "Shivayogi-Hiremath-Resume.pdf"))).toBe(true);
    expect(existsSync(path.resolve("public", "Shivayogi-Hiremath-Detailed-CV.pdf"))).toBe(true);
    expect(existsSync(path.resolve("public", "shivayogi-hiremath-profile.png"))).toBe(true);
    for (const app of portfolio.apps.filter((item) => item.icon)) {
      expect(existsSync(path.resolve("public", app.icon!.replace(/^\//, "")))).toBe(true);
    }
  });
});
