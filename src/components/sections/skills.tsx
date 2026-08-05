import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/common/section-heading";
import { TagList } from "@/components/common/tag-list";
import { portfolio } from "@/content/portfolio";

const featuredTechnologies = [
  { label: "Kotlin", mark: "K", color: "#7f52ff", tint: "#f1edff" },
  { label: "Jetpack Compose", mark: "JC", color: "#1d5fbf", tint: "#eaf2ff" },
  { label: "Android", mark: "A", color: "#18a957", tint: "#e8f8ef" },
  { label: "Coroutines", mark: "∞", color: "#f26d50", tint: "#fff0ec" },
  { label: "GraphQL", mark: "G", color: "#e10098", tint: "#ffe8f7" },
  { label: "Room", mark: "R", color: "#009688", tint: "#e6f7f5" },
  { label: "Firebase", mark: "F", color: "#f59e0b", tint: "#fff6dc" },
  { label: "Git", mark: "◆", color: "#f05032", tint: "#fff0ed" },
  { label: "GitHub Actions", mark: "GH", color: "#0b5fc4", tint: "#eaf4ff" },
  { label: "Jenkins", mark: "J", color: "#d33833", tint: "#fceceb" },
  { label: "Appium", mark: "AP", color: "#7c3aed", tint: "#f2eafe" },
  { label: "Clean Architecture", mark: "CA", color: "#0f766e", tint: "#e7f7f4" },
] as const;

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Technical skills"
          title="A practical toolkit for modern Android products."
          description="The technologies I use to turn Android requirements into reliable, maintainable products."
          headingId="skills-title"
          align="center"
        />
        <div className="technology-grid" aria-label="Core technologies">
          {featuredTechnologies.map((technology) => (
            <div
              className="technology-item"
              key={technology.label}
              style={{
                "--technology-color": technology.color,
                "--technology-tint": technology.tint,
              } as CSSProperties}
            >
              <span aria-hidden="true">{technology.mark}</span>
              <strong>{technology.label}</strong>
            </div>
          ))}
        </div>
        <div className="skills-grid">
          {portfolio.skillGroups.map((group) => (
            <article className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <TagList items={group.skills} compact />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
