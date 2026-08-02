import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { EnterpriseExperience } from "@/components/sections/enterprise-experience";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Leadership } from "@/components/sections/leadership";
import { Principles } from "@/components/sections/principles";
import { Projects } from "@/components/sections/projects";
import { ResumeSection } from "@/components/sections/resume-section";
import { Skills } from "@/components/sections/skills";
import { Strengths } from "@/components/sections/strengths";
import { portfolio } from "@/content/portfolio";

export default function HomePage() {
  const verifiedProfiles = portfolio.socials
    .map((social) => social.href)
    .filter((href): href is string => Boolean(href));

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.person.name,
    jobTitle: portfolio.person.titles[0],
    url: portfolio.site.url,
    email: `mailto:${portfolio.person.email}`,
    homeLocation: {
      "@type": "Place",
      name: portfolio.person.location,
    },
    sameAs: verifiedProfiles,
    knowsAbout: [
      "Android development",
      "Kotlin",
      "Jetpack Compose",
      "Mobile architecture",
      "Clean Architecture",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${portfolio.person.name} — Portfolio`,
    url: portfolio.site.url,
    description: portfolio.site.description,
    author: {
      "@type": "Person",
      name: portfolio.person.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero />
      <About />
      <Strengths />
      <Experience />
      <EnterpriseExperience />
      <Projects />
      <Skills />
      <Principles />
      <Leadership />
      <ResumeSection />
      <Contact />
    </>
  );
}
