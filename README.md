# Shivayogi Hiremath — Professional Portfolio

A production-focused portfolio for Shivayogi Hiremath, Lead Android Developer, Senior Android Engineer, and Mobile Architect. The site presents verified experience, public-safe case studies, a generated resume, and a clear view of Shivayogi’s Android engineering practice.

[View the live website](https://shivayogih.github.io/shivayogi-portfolio/)

![Portfolio home page in dark theme](docs/portfolio-preview.png)

## Project status

Portfolio v1 is live at [shivayogih.github.io/shivayogi-portfolio](https://shivayogih.github.io/shivayogi-portfolio/). CI validates every pull request, and the GitHub Pages workflow publishes the reviewed static export from `main`.

## Technology

- Next.js 16 with the App Router and React Server Components
- React 19 and strict TypeScript
- Tailwind CSS 4 with a token-based custom visual system
- Static export for GitHub Pages under `/shivayogi-portfolio/`
- Vitest, Testing Library, and jest-dom
- A typed PDF resume generator built with `pdf-lib`
- GitHub Actions CI and official GitHub Pages deployment actions

## Local setup

Requirements:

- Node.js 22.23.1 LTS
- npm 10 or newer

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Local development intentionally runs without the GitHub Pages base path.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local Next.js development server |
| `npm run lint` | Run ESLint with zero warnings allowed |
| `npm run typecheck` | Run strict TypeScript validation |
| `npm run test` | Run component and content-contract tests |
| `npm run generate:resume` | Regenerate the downloadable PDF from typed content |
| `npm run verify:resume` | Validate the generated PDF structure and page count |
| `npm run build` | Create the static site in `out/` |
| `npm run verify:export` | Validate exported routes, assets, and privacy constraints |
| `npm run qa:browser` | Run browser, responsive, keyboard, and WCAG checks in Microsoft Edge |
| `npm run qa:lighthouse` | Run the desktop Lighthouse release thresholds |
| `npm run verify` | Run the complete local validation pipeline |

## Architecture

Personal content is isolated in [`src/content/portfolio.ts`](src/content/portfolio.ts). Server-rendered presentation components consume that model, while a small progressive-enhancement script handles theme selection, mobile navigation, and clipboard feedback without React hydration. Static export configuration applies the repository base path only in GitHub Actions so local navigation remains simple.

See [`docs/architecture.md`](docs/architecture.md) for the full structure and runtime boundaries.

## Updating content

1. Edit the typed source in `src/content/portfolio.ts`.
2. Regenerate the resume with `npm run generate:resume`.
3. Run `npm run verify`.
4. Review both the website and PDF before committing.

Do not add unverified employment metrics, social profiles, public project links, or confidential client material. See [`docs/content-guide.md`](docs/content-guide.md).

## Resume

The HTML resume is available at `/resume/`. The PDF at `public/Shivayogi-Hiremath-Resume.pdf` is generated from the same typed portfolio content:

```bash
npm run generate:resume
```

The output is a two-page, text-based, ATS-friendly PDF with no private address or sensitive personal information.

## Deployment

Merges to `main` trigger `.github/workflows/deploy-pages.yml`, which validates the source, builds the static export with the repository base path, uploads `out/`, and deploys through the official GitHub Pages environment.

See [`docs/deployment.md`](docs/deployment.md) for setup, verification, and troubleshooting.

## Contributing and security

- [Contributing guide](CONTRIBUTING.md)
- [Security policy](SECURITY.md)
- [Code of conduct](CODE_OF_CONDUCT.md)

## Licence and content rights

The source code is licensed under the [MIT Licence](LICENSE). Personal written content, resume content, profile assets, and Shivayogi Hiremath’s name and branding are not granted for reuse by the source-code licence.
