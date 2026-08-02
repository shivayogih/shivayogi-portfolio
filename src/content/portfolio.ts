import type { PortfolioContent } from "@/types/portfolio";

export const portfolio: PortfolioContent = {
  person: {
    name: "Shivayogi Hiremath",
    titles: [
      "Lead Android Developer",
      "Senior Android Engineer",
      "Mobile Architect",
    ],
    location: "Bengaluru, Karnataka, India",
    email: "shivayogih72@gmail.com",
    availability: "Open to Senior and Lead Android engineering opportunities.",
    hero: "I build scalable, secure, and high-performance Android products.",
    heroSupport:
      "Senior Android engineer specialising in Kotlin, Jetpack Compose, Clean Architecture, scalable mobile platforms, and enterprise application development across travel, banking, retail, and mobility.",
    summary:
      "Senior and Lead Android engineer with professional Android development experience since 2017. I design maintainable mobile platforms, guide delivery across complex product areas, and stay hands-on from architecture and implementation through testing, performance work, and release support.",
    github: "https://github.com/shivayogih",
  },
  site: {
    title: "Shivayogi Hiremath | Lead Android Developer",
    description:
      "Portfolio of Shivayogi Hiremath, a Lead Android Developer and Mobile Architect specialising in Kotlin, Jetpack Compose, and scalable enterprise applications.",
    url: "https://shivayogih.github.io/shivayogi-portfolio/",
    repository: "https://github.com/shivayogih/shivayogi-portfolio",
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/shivayogih" },
    { label: "LinkedIn" },
    { label: "Medium" },
  ],
  strengths: [
    {
      title: "Android platform depth",
      description:
        "Kotlin, Compose, Android SDK, lifecycle-aware delivery, background work, local data, and modern platform APIs.",
    },
    {
      title: "Architecture that scales",
      description:
        "Clean boundaries, explicit state, modular systems, dependency injection, and designs that remain understandable as products grow.",
    },
    {
      title: "Reliable product delivery",
      description:
        "Automated tests, CI/CD, accessibility, localisation, performance analysis, regression fixes, and hands-on release support.",
    },
    {
      title: "Technical leadership",
      description:
        "Architecture discussions, focused code review, mentoring, cross-functional planning, and pragmatic technical documentation.",
    },
  ],
  experience: [
    {
      company: "Pyramid IT Consulting / Cognizant",
      client: "Royal Caribbean Group",
      role: "Lead Android Developer",
      period: "Nov 2025 – Jun 2026",
      project: "Royal Caribbean International Android application",
      summary:
        "Led hands-on Android delivery for a large travel and hospitality application, with work kept deliberately high level to respect client confidentiality.",
      highlights: [
        "Built Kotlin and Jetpack Compose features using MVVM, MVI, and Clean Architecture patterns.",
        "Integrated REST and GraphQL services with Coroutines and Flow.",
        "Created reusable UI components and contributed to architecture discussions and code reviews.",
        "Supported performance, regression, accessibility, localisation, release, and mentoring activities.",
      ],
      technologies: [
        "Kotlin",
        "Jetpack Compose",
        "MVVM",
        "MVI",
        "REST",
        "GraphQL",
        "Coroutines",
        "Flow",
      ],
    },
    {
      company: "Synechron",
      client: "Emirates NBD",
      role: "Senior Associate – Technology / Android Engineer",
      period: "Apr 2025 – Jul 2025",
      project: "Business Online X Android application — Payments module",
      summary:
        "Delivered Android payment workflows within an enterprise banking product while collaborating across engineering and quality disciplines.",
      highlights: [
        "Implemented payment workflows with Kotlin, Compose, MVVM, and MVI.",
        "Integrated APIs using RxJava and RxKotlin with Koin-based dependency injection.",
        "Added unit coverage and supported Appium UI automation.",
        "Worked within Jenkins CI/CD and an Agile delivery model.",
      ],
      technologies: [
        "Kotlin",
        "Jetpack Compose",
        "MVVM",
        "MVI",
        "RxJava",
        "Koin",
        "Appium",
        "Jenkins",
      ],
    },
    {
      company: "Ascendion / Collabera",
      client: "Walmart — Sam’s Club",
      role: "Lead / Senior Android Engineer",
      period: "Aug 2024 – Feb 2025",
      summary:
        "Contributed to modular retail application flows spanning pharmacy, authentication, photos, protection plans, and platform routing.",
      highlights: [
        "Worked on pharmacy flows including date-of-birth validation, prescription transfer, and family-member features.",
        "Supported two-factor authentication and Photos PrintBox single sign-on integrations.",
        "Contributed to Protection Plan migration and Travel and Entertainment routing.",
        "Implemented platform route handlers and automated tests without exposing proprietary business rules.",
      ],
      technologies: [
        "Kotlin",
        "Jetpack Compose",
        "GraphQL",
        "Deep links",
        "Modular architecture",
        "Automated testing",
      ],
    },
    {
      company: "TropoGo Technologies",
      role: "Lead Software Engineer – Android",
      period: "Nov 2020 – Feb 2024",
      project: "TropoGo and SuperLens",
      summary:
        "Owned hands-on Android architecture and delivery across mobility and productivity products from feature development through release management.",
      highlights: [
        "Developed Kotlin and Java applications with maps, location, OTP authentication, notifications, and offline support.",
        "Built BLE, file, and PDF workflows for mobile use cases.",
        "Led code reviews and collaborated with product, design, QA, and backend partners.",
        "Supported release planning, issue investigation, and production delivery.",
      ],
      technologies: [
        "Kotlin",
        "Java",
        "Android SDK",
        "Maps",
        "Location",
        "BLE",
        "Offline support",
      ],
    },
    {
      company: "Smarter Biz Technologies",
      role: "Android Software Engineer",
      period: "Aug 2020 – Oct 2020",
      summary:
        "Professional Android engineering role, retained in the full timeline and intentionally condensed where further verified detail is unavailable.",
      highlights: [],
      technologies: ["Android", "Java", "Kotlin"],
      earlier: true,
    },
    {
      company: "NeumSoft Innovations",
      role: "Senior Android Developer",
      period: "Mar 2019 – Mar 2020",
      summary:
        "Senior Android development role, retained in the full timeline and intentionally condensed where further verified detail is unavailable.",
      highlights: [],
      technologies: ["Android", "Java", "Kotlin"],
      earlier: true,
    },
    {
      company: "DigiRetails Software India",
      role: "Senior Software Developer",
      period: "Jan 2017 – Feb 2019",
      summary:
        "Android software development role marking the beginning of the verified professional timeline in 2017.",
      highlights: [],
      technologies: ["Android", "Java"],
      earlier: true,
    },
  ],
  projects: [
    {
      slug: "toolly",
      name: "Toolly",
      eyebrow: "Privacy-first mobile product",
      status: "Private product — active development",
      statusTone: "active",
      summary:
        "An offline-first document scanning and productivity utility designed around private, on-device workflows.",
      overview:
        "Toolly combines document scanning, QR utilities, and business-card workflows in a privacy-conscious mobile experience. Android is the current focus, with a future iOS and Kotlin Multiplatform direction.",
      problem:
        "Everyday capture and utility tasks often require several disconnected apps or cloud-first processing. Toolly explores a cohesive workflow that keeps useful data local wherever practical.",
      role:
        "Product direction, mobile architecture, Android implementation, quality strategy, and CI/CD.",
      approach: [
        "Design offline-first flows before introducing network dependencies.",
        "Keep scanning and recognition work on-device where supported.",
        "Model features as composable utilities sharing secure local foundations.",
      ],
      architecture:
        "A Kotlin and Jetpack Compose application using MVI and MVVM boundaries, Room for structured local data, DataStore for preferences, and encrypted local handling where sensitive information is involved.",
      decisions: [
        "Use ML Kit Document Scanner for device-native document capture.",
        "Prefer local persistence and explicit data ownership.",
        "Keep future Kotlin Multiplatform adoption as an architectural direction rather than a released capability claim.",
      ],
      challenges: [
        "Balancing a broad utility surface with a coherent, accessible navigation model.",
        "Handling document and card information without weakening local privacy expectations.",
      ],
      outcome:
        "The product remains under active private development. Release status and adoption are intentionally not claimed.",
      technologies: [
        "Kotlin",
        "Jetpack Compose",
        "ML Kit Document Scanner",
        "Room",
        "DataStore",
        "MVI",
        "MVVM",
        "CI/CD",
      ],
      links: [],
      featured: true,
    },
    {
      slug: "dataloom",
      name: "DataLoom",
      eyebrow: "Android-first synchronisation SDK",
      status: "Public — active pre-V1 development",
      statusTone: "public",
      summary:
        "A deterministic synchronisation SDK foundation for native Android and Kotlin Multiplatform applications targeting Android and iOS.",
      overview:
        "DataLoom is an Android-first, Jetpack-style SDK working toward six explicit synchronisation strategies: offline-first, remote-first, cache-first, network-only, hybrid, and adaptive.",
      problem:
        "Synchronisation logic is frequently scattered across repositories, workers, caches, queues, and retry code. DataLoom aims to make policy and runtime behaviour explicit, deterministic, and testable.",
      role:
        "SDK product direction, Kotlin architecture, contracts, runtime design, testing foundations, and documentation.",
      approach: [
        "Separate strategy policy from transfer direction, transfer mode, and triggers.",
        "Keep application payloads opaque so domain truth stays with consumers.",
        "Build durable recovery, deterministic planning, and observability as first-class systems.",
      ],
      architecture:
        "A modular Kotlin foundation spanning dependency-root models, public APIs, provider lifecycle, shared runtime orchestration, deterministic testing tools, Android adapters, Room-backed queues, WorkManager scheduling, and Apple compilation paths.",
      decisions: [
        "Publish versioned contracts for all six intended strategies before representing them as complete.",
        "Keep provider resolution and orchestration modular across Android and KMP consumer paths.",
        "Document explicit production-readiness gates and no-go conditions.",
      ],
      challenges: [
        "Durable decision persistence and several strategy runtimes remain incomplete.",
        "Platform qualification, asset transfer, governance, and complete operational systems remain V1 gates.",
      ],
      outcome:
        "The public repository contains substantial foundations and direct network-only and remote-first slices, but its own documentation explicitly states that it is not production-ready and has no stable V1 release.",
      technologies: [
        "Kotlin",
        "Kotlin Multiplatform",
        "Coroutines",
        "Room",
        "WorkManager",
        "Gradle",
        "Deterministic testing",
      ],
      links: [
        {
          label: "View public repository",
          href: "https://github.com/dataloom-sdk/dataloom",
          external: true,
        },
      ],
      featured: true,
    },
    {
      slug: "galaxy-gaze",
      name: "GalaxyGaze",
      eyebrow: "Modern Android architecture study",
      status: "Portfolio project — source link unverified",
      statusTone: "concept",
      summary:
        "A NASA Astronomy Picture of the Day application demonstrating resilient data flow and contemporary Android architecture.",
      overview:
        "GalaxyGaze presents NASA Astronomy Picture of the Day content in a Compose interface with image and video handling, refresh behaviour, and offline caching.",
      problem:
        "Media-rich API content needs clear loading, error, refresh, and offline states while preserving a responsive user experience.",
      role:
        "Android architecture, feature implementation, local caching strategy, and unit testing.",
      approach: [
        "Model UI state explicitly through MVVM and Clean Architecture boundaries.",
        "Cache content with Room so previously loaded information remains available offline.",
        "Handle distinct image and video media types without coupling them to network models.",
      ],
      architecture:
        "A Kotlin and Compose application with presentation, domain, and data layers, Hilt dependency injection, Retrofit networking, Room persistence, and repository-based data coordination.",
      decisions: [
        "Use swipe-to-refresh as an explicit user-driven synchronisation action.",
        "Treat cached content as a resilience feature rather than claiming a full synchronisation engine.",
        "Keep the source link hidden because a matching public repository could not be verified.",
      ],
      challenges: [
        "Representing mixed NASA media types consistently.",
        "Balancing fresh remote data with useful offline behaviour.",
      ],
      outcome:
        "A focused demonstration of modern Android application structure. No usage, release, or production-readiness claims are made.",
      technologies: [
        "Kotlin",
        "Jetpack Compose",
        "MVVM",
        "Clean Architecture",
        "Hilt",
        "Retrofit",
        "Room",
        "Unit testing",
      ],
      links: [],
      featured: true,
    },
    {
      slug: "enterprise-android-delivery",
      name: "Enterprise Android delivery",
      eyebrow: "Travel, banking, and retail",
      status: "Selected client experience — confidential details omitted",
      statusTone: "enterprise",
      summary:
        "A high-level view of Android delivery across Royal Caribbean, Emirates NBD, and Walmart / Sam’s Club engagements.",
      overview:
        "Selected enterprise work across travel, banking, and retail products, described only at a level suitable for a public professional portfolio.",
      problem:
        "Large Android products require reliable delivery across modular codebases, evolving APIs, release constraints, accessibility needs, and cross-functional teams.",
      role:
        "Hands-on Lead and Senior Android Engineer contributing architecture, implementation, testing, review, defect analysis, mentoring, and release support.",
      approach: [
        "Break product requirements into testable, incremental mobile changes.",
        "Use established application architecture and platform conventions rather than introducing unnecessary novelty.",
        "Collaborate closely with product, design, backend, QA, and release stakeholders.",
      ],
      architecture:
        "Publicly shareable themes include Kotlin, Jetpack Compose, MVVM and MVI, Clean Architecture, modularisation, REST and GraphQL integration, deep links, dependency injection, and automated testing.",
      decisions: [
        "Keep proprietary APIs, code, diagrams, rules, screenshots, and credentials out of the case study.",
        "Describe contribution areas without inventing metrics or client endorsements.",
        "Prioritise accessibility, localisation, regression safety, and release readiness alongside feature work.",
      ],
      challenges: [
        "Supporting complex flows while preserving regression safety in mature applications.",
        "Coordinating delivery across multiple disciplines and established enterprise processes.",
      ],
      outcome:
        "Delivered and supported Android product work across the stated engagements. Confidential outcomes and unsupported quantitative impact are intentionally omitted.",
      technologies: [
        "Kotlin",
        "Jetpack Compose",
        "MVVM",
        "MVI",
        "Clean Architecture",
        "REST",
        "GraphQL",
        "Automated testing",
        "CI/CD",
      ],
      links: [],
      featured: true,
    },
  ],
  skillGroups: [
    {
      title: "Android platform",
      description: "Native Android foundations and modern user-interface delivery.",
      skills: [
        "Kotlin",
        "Java",
        "Android SDK",
        "Jetpack Compose",
        "Android lifecycle",
        "Navigation",
        "WorkManager",
        "AppSearch",
        "Media3",
        "Biometric APIs",
        "Notifications",
        "Maps and location",
        "BLE",
      ],
    },
    {
      title: "Architecture",
      description: "Structures that make product behaviour explicit and maintainable.",
      skills: [
        "MVVM",
        "MVI",
        "MVP",
        "Clean Architecture",
        "SOLID",
        "Modularisation",
        "Repository pattern",
        "Dependency injection",
        "Offline-first architecture",
      ],
    },
    {
      title: "Asynchronous programming",
      description: "Predictable state and background work across reactive systems.",
      skills: [
        "Coroutines",
        "Flow",
        "StateFlow",
        "SharedFlow",
        "RxJava",
        "RxKotlin",
      ],
    },
    {
      title: "Data and networking",
      description: "Reliable service integration and resilient local data handling.",
      skills: [
        "Retrofit",
        "OkHttp",
        "REST",
        "GraphQL",
        "WebSockets",
        "Room",
        "DataStore",
        "Local caching",
      ],
    },
    {
      title: "Dependency injection",
      description: "Explicit dependency boundaries suited to each product context.",
      skills: ["Hilt", "Dagger", "Koin"],
    },
    {
      title: "Testing",
      description: "Fast feedback from unit boundaries through automated UI flows.",
      skills: [
        "JUnit",
        "Mockito",
        "MockK",
        "Compose UI testing",
        "Appium",
        "Unit testing",
        "Integration testing",
      ],
    },
    {
      title: "Security and quality",
      description: "Product quality treated as an architectural responsibility.",
      skills: [
        "HTTPS",
        "Encryption",
        "Secure local storage",
        "ProGuard / R8",
        "Performance profiling",
        "ANR analysis",
        "Memory optimisation",
        "Accessibility",
        "Localisation",
      ],
    },
    {
      title: "DevOps and collaboration",
      description: "Delivery practices that keep teams aligned and releases dependable.",
      skills: [
        "Git",
        "GitHub",
        "Jenkins",
        "GitHub Actions",
        "CI/CD",
        "Pull-request reviews",
        "Agile",
        "Mentoring",
        "Technical documentation",
      ],
    },
  ],
  principles: [
    {
      title: "Maintainable architecture",
      description:
        "Keep responsibilities and dependencies visible so teams can change behaviour without unravelling unrelated features.",
    },
    {
      title: "Clear state management",
      description:
        "Represent loading, content, empty, and failure states explicitly, with one understandable source of truth.",
    },
    {
      title: "Offline resilience",
      description:
        "Design useful behaviour for intermittent networks and make synchronisation decisions deliberate.",
    },
    {
      title: "Security by design",
      description:
        "Minimise sensitive data, secure local storage, use trusted platform APIs, and review boundaries early.",
    },
    {
      title: "Performance awareness",
      description:
        "Measure startup, rendering, memory, and ANR behaviour, then optimise the bottleneck that evidence identifies.",
    },
    {
      title: "Accessible by default",
      description:
        "Build semantics, focus, readable contrast, localisation, and adaptable interactions into the component system.",
    },
    {
      title: "Automated confidence",
      description:
        "Use focused unit, integration, and UI tests to protect important behaviour without slowing useful change.",
    },
    {
      title: "Observable delivery",
      description:
        "Make failures diagnosable through clear logging, operational signals, documentation, and reproducible builds.",
    },
  ],
  leadership: [
    "Guide architecture discussions while remaining accountable for implementation details.",
    "Review pull requests for correctness, clarity, maintainability, testing, and product risk.",
    "Mentor developers through context, examples, and constructive technical feedback.",
    "Break complex requirements into incremental, testable changes with visible trade-offs.",
    "Collaborate with product, QA, design, backend, and stakeholders throughout delivery.",
    "Support releases, investigate defects and performance issues, and improve development practices and documentation.",
  ],
  education: {
    degree: "Bachelor of Engineering in Electronics and Communication Engineering",
    university: "Visvesvaraya Technological University",
    college: "Government Engineering College, Haveri",
    completed: "2015",
  },
};

export function getProject(slug: string) {
  return portfolio.projects.find((project) => project.slug === slug);
}
