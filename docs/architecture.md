# Architecture

## Goals

The portfolio is designed to be static, fast, accessible, easy to update, and reliable under the GitHub Pages repository path. It keeps personal facts separate from presentation and limits client-side JavaScript to interactions that genuinely require browser state.

## Content flow

`src/content/portfolio.ts` is the single typed source for identity, navigation, experience, projects, skills, principles, leadership content, education, verified links, SEO copy, and resume content.

The model is checked by `PortfolioContent` in `src/types/portfolio.ts`. Both website sections and `scripts/generate-resume.ts` consume it directly, preventing independent website and resume copies from drifting.

## Rendering boundaries

- App Router pages and section components are React Server Components.
- Theme, mobile-menu, and clipboard controls render as semantic HTML before JavaScript runs.
- A small progressive-enhancement script in the root layout adds persisted theme switching, Escape and focus handling for the compact menu, and accessible clipboard feedback.
- No hydrated React client island, global application state, or heavy animation library is needed.

## Static routing

The site exports:

- `/`
- `/resume/`
- `/projects/toolly/`
- `/projects/dataloom/`
- `/projects/galaxy-gaze/`
- `/projects/enterprise-android-delivery/`
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- a custom static 404 page

`next.config.ts` enables `output: "export"`, trailing slashes, and unoptimised images for static compatibility. In GitHub Actions it applies both `basePath` and `assetPrefix` as `/shivayogi-portfolio`; local development leaves them empty.

## Styling and themes

`src/app/globals.css` combines Tailwind CSS 4 with repository-owned tokens and components. CSS custom properties define the light and dark palettes. A small inline script applies the stored or system theme before paint to avoid a visible theme flash.

Motion is limited to short CSS transitions and disabled when `prefers-reduced-motion: reduce` is active. Focus states, semantic landmarks, heading order, a skip link, and practical touch targets are built into the component system.

## Resume generation

`scripts/generate-resume.ts` uses `pdf-lib` and standard embedded fonts to produce an ATS-friendly, searchable two-page PDF. `scripts/verify-resume.ts` validates its PDF header, metadata, size, and page count. The file is committed so the download is never broken between builds.

## Quality gates

- ESLint with no warnings
- strict TypeScript
- behavioural component tests
- resume structure verification
- production static build
- exported-route and asset verification
- privacy assertion preventing Toolly’s private repository URL from entering the output
