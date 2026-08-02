export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export type SocialLink = {
  label: string;
  href?: string;
};

export type Experience = {
  company: string;
  client?: string;
  role: string;
  period: string;
  project?: string;
  summary: string;
  highlights: readonly string[];
  technologies: readonly string[];
  earlier?: boolean;
};

export type ProjectLink = {
  label: string;
  href: string;
  external: boolean;
};

export type Project = {
  slug: string;
  name: string;
  eyebrow: string;
  status: string;
  statusTone: "active" | "public" | "concept" | "enterprise";
  summary: string;
  overview: string;
  problem: string;
  role: string;
  approach: readonly string[];
  architecture: string;
  decisions: readonly string[];
  challenges: readonly string[];
  outcome: string;
  technologies: readonly string[];
  links: readonly ProjectLink[];
  featured: boolean;
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: readonly string[];
};

export type Principle = {
  title: string;
  description: string;
};

export type PortfolioContent = {
  person: {
    name: string;
    titles: readonly string[];
    location: string;
    email: string;
    availability: string;
    hero: string;
    heroSupport: string;
    summary: string;
    github: string;
  };
  site: {
    title: string;
    description: string;
    url: string;
    repository: string;
  };
  navigation: readonly NavigationItem[];
  socials: readonly SocialLink[];
  strengths: readonly { title: string; description: string }[];
  experience: readonly Experience[];
  projects: readonly Project[];
  skillGroups: readonly SkillGroup[];
  principles: readonly Principle[];
  leadership: readonly string[];
  education: {
    degree: string;
    university: string;
    college: string;
    completed: string;
  };
};

