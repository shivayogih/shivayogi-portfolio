# Content guide

## Source of truth

Update `src/content/portfolio.ts`. Avoid placing personal facts directly inside presentation components when they can reasonably belong in the typed model.

After every content change:

```bash
npm run generate:resume
npm run verify
```

## Verification rules

Only publish information that is supplied directly or verified from a public source.

Do not add:

- invented impact metrics, user counts, ratings, testimonials, awards, or certifications;
- unsupported employment responsibilities or modified dates;
- unverified LinkedIn, Medium, phone, or social links;
- private repository URLs or metadata;
- client screenshots, internal APIs, proprietary diagrams, credentials, or business rules;
- home address, date of birth, marital information, salary, marks, or GPA.

## Project status language

- Toolly must remain labelled `Private product — active development`. It must not expose a source URL or imply a public release.
- DataLoom must remain described as active pre-V1 development and not production-ready until its public repository documents otherwise.
- GalaxyGaze must not display a source link unless a matching public repository is verified.
- Enterprise case studies must remain high-level and free of client-confidential material.

## Adding a verified social link

Add a `{ label, href }` item to `portfolio.socials` only after verifying the public URL belongs to Shivayogi. Empty items are intentionally filtered from the interface and structured-data `sameAs` list.

## Adding a project

Supply every field in the `Project` type: overview, problem, role, approach, architecture, decisions, challenges, outcome, technologies, current status, and verified links. Use conservative outcome language when metrics or release state are unknown.

## Tone

Use concise professional language suitable for recruiters, engineering managers, architects, founders, and clients. Prefer concrete engineering choices to buzzwords and keep the spelling of “portfolio” consistent.
