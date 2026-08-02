import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

const url = "http://127.0.0.1:4173/shivayogi-portfolio/";

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      // The static preview may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Static preview did not become ready for Lighthouse.");
}

await mkdir(path.resolve(".tools"), { recursive: true });
const preview = spawn(process.execPath, ["scripts/preview.mjs"], {
  cwd: process.cwd(),
  stdio: "ignore",
});

let browser;
try {
  await waitForServer();
  browser = await launch({
    chromePath: process.env.CHROME_PATH,
    chromeFlags: ["--headless=new", "--no-first-run", "--disable-gpu"],
  });

  const result = await lighthouse(
    url,
    {
      port: browser.port,
      logLevel: "error",
      output: "json",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    },
    desktopConfig,
  );

  if (!result) throw new Error("Lighthouse returned no result.");
  await writeFile(
    path.resolve(".tools", "lighthouse-report.json"),
    JSON.stringify(result.lhr, null, 2),
  );

  const scores = {
    performance: Math.round((result.lhr.categories.performance.score ?? 0) * 100),
    accessibility: Math.round((result.lhr.categories.accessibility.score ?? 0) * 100),
    bestPractices: Math.round((result.lhr.categories["best-practices"].score ?? 0) * 100),
    seo: Math.round((result.lhr.categories.seo.score ?? 0) * 100),
  };

  const failures = [
    scores.performance < 90 ? `Performance ${scores.performance} < 90` : "",
    scores.accessibility < 95 ? `Accessibility ${scores.accessibility} < 95` : "",
    scores.bestPractices < 95 ? `Best Practices ${scores.bestPractices} < 95` : "",
    scores.seo < 95 ? `SEO ${scores.seo} < 95` : "",
  ].filter(Boolean);

  if (failures.length) {
    throw new Error(`Lighthouse thresholds failed: ${failures.join(", ")}`);
  }

  console.log(
    `Lighthouse passed: Performance ${scores.performance}, Accessibility ${scores.accessibility}, Best Practices ${scores.bestPractices}, SEO ${scores.seo}.`,
  );
} finally {
  try {
    await browser?.kill();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EBUSY") throw error;
  }
  preview.kill();
}
