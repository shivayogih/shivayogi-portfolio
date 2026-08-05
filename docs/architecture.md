# Architecture

## Goals

The portfolio is designed to be static, fast, accessible, easy to update, and reliable under the GitHub Pages repository path. It keeps personal facts separate from presentation and limits client-side JavaScript to interactions that genuinely require browser state.

## Content flow

`src/content/portfolio.json` is the editable source for identity, navigation, experience, worked apps, projects, skills, principles, leadership content, education, verified links, and SEO copy. `src/content/portfolio.ts` imports that JSON and applies the `PortfolioContent` boundary.

The model is checked by `PortfolioContent` in `src/types/portfolio.ts`. The downloadable resume, detailed CV, and portrait are supplied public assets validated separately from the typed website content.

## Rendering boundaries

- App Router pages and section components are React Server Components.
- The public portfolio renders in light mode only.
- Focused client components provide Escape and focus handling for the compact menu and accessible clipboard feedback.
- `/admin/` is a larger client island because it edits nested JSON, converts profile uploads to PNG, and publishes through the GitHub Git Data API.
- The admin token stays in React memory only and is cleared by refresh or tab close; no credential is persisted or bundled.

## Static routing

The site exports:

- `/`
- `/resume/`
- `/admin/` with `noindex` metadata
- `/projects/toolly/`
- `/projects/dataloom/`
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- a custom static 404 page

`next.config.ts` enables `output: "export"`, trailing slashes, and unoptimised images for static compatibility. In GitHub Actions it applies both `basePath` and `assetPrefix` as `/shivayogi-portfolio`; local development leaves them empty.

## Styling and themes

`src/app/globals.css` combines Tailwind CSS 4 with repository-owned tokens and components. CSS custom properties define a light cobalt, slate, and cool-neutral system. The document declares `color-scheme: light`; no dark-mode toggle or stored theme script is shipped.

Motion is limited to short CSS transitions and disabled when `prefers-reduced-motion: reduce` is active. Focus states, semantic landmarks, heading order, a skip link, and practical touch targets are built into the component system.

## Resume assets

`scripts/verify-resume.ts` validates the PDF headers, minimum sizes, and expected page counts of the supplied two-page resume and three-page detailed CV. Both files are committed so downloads are never broken between builds.

## Quality gates

- ESLint with no warnings
- strict TypeScript
- behavioural component tests
- resume structure verification
- production static build
- exported-route and asset verification
- project assertion limiting the public collection to Toolly Scan and DataLoom with verified repository links
- worked-app link and icon assertions
- admin route, noindex, credential gate, and publish-confirmation assertions
