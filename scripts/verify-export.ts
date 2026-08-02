import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { portfolio } from "../src/content/portfolio";

const out = path.resolve("out");
const requiredFiles = [
  "index.html",
  "404.html",
  "resume/index.html",
  "robots.txt",
  "sitemap.xml",
  "manifest.webmanifest",
  "Shivayogi-Hiremath-Resume.pdf",
  "icon.svg",
  "apple-touch-icon.svg",
  "og-image.svg",
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
if (resume.size < 8_000) {
  throw new Error("Exported resume PDF is missing or unexpectedly small.");
}

const index = await readFile(path.join(out, "index.html"), "utf8");
if (!index.includes(portfolio.person.name) || !index.includes(portfolio.person.email)) {
  throw new Error("Exported homepage is missing required identity content.");
}

const toolly = portfolio.projects.find((project) => project.slug === "toolly");
if (!toolly || toolly.links.length > 0) {
  throw new Error("Toolly must not expose a public source link.");
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
