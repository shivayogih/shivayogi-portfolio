import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { portfolio } from "../src/content/portfolio";

const out = path.resolve("out");
const requiredFiles = [
  "index.html",
  "404.html",
  "admin/index.html",
  "resume/index.html",
  "robots.txt",
  "sitemap.xml",
  "manifest.webmanifest",
  "Shivayogi-Hiremath-Resume.pdf",
  "Shivayogi-Hiremath-Detailed-CV.pdf",
  "shivayogi-hiremath-profile.png",
  "icon.svg",
  "apple-touch-icon.svg",
  "og-image.svg",
  ...portfolio.apps.flatMap((app) => (app.icon ? [app.icon.replace(/^\//, "")] : [])),
  ...portfolio.projects.map((project) => `projects/${project.slug}/index.html`),
];

for (const file of requiredFiles) {
  await access(path.join(out, file));
}

const nextAssets = await readdir(path.join(out, "_next", "static"));
if (nextAssets.length === 0) {
  throw new Error("Static export does not contain Next.js assets.");
}

const resume = await stat(path.join(out, "Shivayogi-Hiremath-Resume.pdf"));
if (resume.size < 100_000) {
  throw new Error("Exported resume PDF is missing or unexpectedly small.");
}

const detailedCv = await stat(path.join(out, "Shivayogi-Hiremath-Detailed-CV.pdf"));
if (detailedCv.size < 400_000) {
  throw new Error("Exported detailed CV is missing or unexpectedly small.");
}

const index = await readFile(path.join(out, "index.html"), "utf8");
if (!index.includes(portfolio.person.name) || !index.includes(portfolio.person.email)) {
  throw new Error("Exported homepage is missing required identity content.");
}

for (const app of portfolio.apps) {
  if (!index.includes(app.name) || !index.includes(app.href.replaceAll("&", "&amp;"))) {
    throw new Error(`Exported homepage is missing the worked-app link for ${app.name}.`);
  }
}

if (index.includes("Toggle color theme") || index.includes("data-theme-toggle")) {
  throw new Error("The exported portfolio still includes dark-theme controls.");
}

const admin = await readFile(path.join(out, "admin", "index.html"), "utf8");
if (!admin.includes("Portfolio admin") || !admin.includes("noindex")) {
  throw new Error("The static export is missing the protected admin workspace metadata.");
}

const robots = await readFile(path.join(out, "robots.txt"), "utf8");
if (!robots.includes("Disallow: /shivayogi-portfolio/admin/")) {
  throw new Error("Robots metadata does not exclude the admin workspace.");
}

const socialImage = new URL("og-image.svg", portfolio.site.url).toString();
if (!index.includes(socialImage)) {
  throw new Error("Exported homepage is missing the canonical social preview image URL.");
}

if (index.includes(`${portfolio.site.url}shivayogi-portfolio/og-image.svg`)) {
  throw new Error("Exported homepage contains a duplicated GitHub Pages base path.");
}

const toolly = portfolio.projects.find((project) => project.slug === "toolly");
if (portfolio.projects.length !== 2 || !toolly) {
  throw new Error("The public project collection must contain only Toolly Scan and DataLoom.");
}

if (!toolly.links[0]?.href.startsWith("https://github.com/")) {
  throw new Error("Toolly must expose a public GitHub repository.");
}

if (process.env.GITHUB_ACTIONS === "true") {
  const basePath = "/shivayogi-portfolio";
  if (index.includes('src="/_next/') || index.includes('href="/_next/')) {
    throw new Error("GitHub Pages export contains root-relative Next.js assets.");
  }
  if (!index.includes(`${basePath}/_next/`)) {
    throw new Error("GitHub Pages export is missing the repository base path.");
  }
}

console.log(`Verified static export: ${requiredFiles.length} required files and ${nextAssets.length} asset groups.`);
