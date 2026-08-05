# GitHub Pages deployment

## Production target

`https://shivayogih.github.io/shivayogi-portfolio/`

The repository path is part of the URL. GitHub Actions sets `NEXT_PUBLIC_GITHUB_PAGES=true` and `NEXT_PUBLIC_BASE_PATH=/shivayogi-portfolio`, which causes Next.js to prefix framework assets and repository-owned downloads correctly.

## Automated workflow

`.github/workflows/deploy-pages.yml` runs for pushes to `main` and manual dispatches. It:

1. checks out the repository;
2. installs Node.js 22.23.1 and dependencies from `package-lock.json`;
3. configures GitHub Pages;
4. runs linting, type checks, tests, and resume verification;
5. creates and verifies the static export;
6. uploads `out/` as the Pages artifact;
7. deploys it through the `github-pages` environment.

The workflow requests only `contents: read`, `pages: write`, and `id-token: write`.

## Repository setting

If automatic Pages enablement is rejected by repository policy, set exactly:

**Repository Settings → Pages → Build and deployment → Source → GitHub Actions**

No branch-based Pages publishing or manual `gh-pages` branch is required.

## Local Pages-path build

PowerShell:

```powershell
$env:GITHUB_ACTIONS = "true"
$env:NEXT_PUBLIC_GITHUB_PAGES = "true"
$env:NEXT_PUBLIC_BASE_PATH = "/shivayogi-portfolio"
npm run verify:resume
npm run build
npm run verify:export
```

On macOS or Linux, set the same environment variables before the commands.

## Production verification

After deployment:

1. confirm the Pages workflow completes successfully;
2. request the production URL and confirm HTTP 200;
3. inspect home, admin, resume, project, and 404 routes;
4. verify navigation, the light-only theme, mobile menu, worked-app links/icons, admin credential safeguards, PDF downloads, SVG assets, and `_next` assets under the repository path;
5. capture the final production screenshot and update `docs/portfolio-preview.png` if presentation changed.
