import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { chromium, type Page } from "playwright-core";

const origin = "http://127.0.0.1:4173";
const sitePath = "/shivayogi-portfolio/";
const siteUrl = `${origin}${sitePath}`;

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(siteUrl);
      if (response.ok) return;
    } catch {
      // The preview process may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Static preview did not become ready.");
}

async function assertInternalLinks(page: Page) {
  const hrefs = await page.locator("a[href]").evaluateAll((anchors) =>
    anchors.map((anchor) => (anchor as HTMLAnchorElement).href),
  );
  const internal = [...new Set(hrefs)]
    .filter((href) => href.startsWith(origin))
    .map((href) => href.split("#")[0]);

  for (const href of internal) {
    const response = await fetch(href);
    if (!response.ok) {
      throw new Error(`Broken internal link: ${href} returned ${response.status}.`);
    }
  }
}

async function assertAccessibility(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  if (results.violations.length) {
    const summary = results.violations
      .map((violation) => {
        const nodes = violation.nodes
          .map((node) => `  ${node.target.join(" ")} — ${node.failureSummary ?? "No detail"}`)
          .join("\n");
        return `${violation.id}: ${violation.help} (${violation.nodes.length} nodes)\n${nodes}`;
      })
      .join("\n");
    throw new Error(`Accessibility violations:\n${summary}`);
  }
}

await mkdir(path.resolve("docs"), { recursive: true });
await mkdir(path.resolve(".tools"), { recursive: true });

const preview = spawn(process.execPath, ["scripts/preview.mjs"], {
  cwd: process.cwd(),
  stdio: "ignore",
});

let browser;
try {
  await waitForServer();
  browser = await chromium.launch({
    ...(process.env.CHROME_PATH
      ? { executablePath: process.env.CHROME_PATH }
      : { channel: "msedge" as const }),
    headless: true,
    args: ["--no-first-run", "--disable-gpu"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: "dark",
    reducedMotion: "reduce",
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  const browserErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));

  const response = await page.goto(siteUrl, { waitUntil: "networkidle" });
  if (response?.status() !== 200) {
    throw new Error(`Homepage returned ${response?.status()}.`);
  }

  await page.screenshot({
    path: path.resolve("docs", "portfolio-preview.png"),
    animations: "disabled",
  });
  await page.screenshot({
    path: path.resolve(".tools", "portfolio-full.png"),
    fullPage: true,
    animations: "disabled",
  });

  await page.keyboard.press("Tab");
  const firstFocusedText = await page.locator(":focus").textContent();
  if (!firstFocusedText?.includes("Skip to main content")) {
    throw new Error(`First keyboard focus was not the skip link: ${firstFocusedText}`);
  }

  const initialTheme = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  const toggledTheme = await page.locator("html").getAttribute("data-theme");
  if (initialTheme === toggledTheme) throw new Error("Theme toggle did not change the document theme.");
  await page.reload({ waitUntil: "networkidle" });
  if ((await page.locator("html").getAttribute("data-theme")) !== toggledTheme) {
    throw new Error("Theme preference did not persist after reload.");
  }

  await page.getByRole("button", { name: "Copy email" }).click();
  const copyStatus = await page.getByRole("status").textContent();
  if (copyStatus !== "Email copied to clipboard.") {
    throw new Error(`Copy-email control feedback was: ${copyStatus}`);
  }

  await assertInternalLinks(page);
  await assertAccessibility(page);

  if (browserErrors.length) {
    throw new Error(`Browser console errors:\n${browserErrors.join("\n")}`);
  }

  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: "light",
    reducedMotion: "reduce",
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(siteUrl, { waitUntil: "networkidle" });
  await mobilePage.getByRole("button", { name: "Open navigation menu" }).click();
  if (
    (await mobilePage.getByRole("button", { name: "Close navigation menu" }).getAttribute("aria-expanded")) !==
    "true"
  ) {
    throw new Error("Mobile navigation did not open accessibly.");
  }
  await mobilePage.keyboard.press("Escape");
  if (
    (await mobilePage.getByRole("button", { name: "Open navigation menu" }).getAttribute("aria-expanded")) !==
    "false"
  ) {
    throw new Error("Mobile navigation did not close with Escape.");
  }

  const horizontalOverflow = await mobilePage.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  if (horizontalOverflow) throw new Error("Mobile layout has horizontal overflow.");

  await mobilePage.screenshot({
    path: path.resolve(".tools", "portfolio-mobile-viewport.png"),
    animations: "disabled",
  });
  await mobilePage.screenshot({
    path: path.resolve(".tools", "portfolio-mobile.png"),
    fullPage: true,
    animations: "disabled",
  });
  await assertAccessibility(mobilePage);
  await mobileContext.close();

  const responsiveContext = await browser.newContext({ reducedMotion: "reduce" });
  const responsivePage = await responsiveContext.newPage();
  for (const viewport of [
    { name: "tablet", width: 768, height: 1024, compactNavigation: true },
    { name: "laptop", width: 1280, height: 800, compactNavigation: false },
    { name: "wide desktop", width: 1920, height: 1080, compactNavigation: false },
  ]) {
    await responsivePage.setViewportSize({ width: viewport.width, height: viewport.height });
    await responsivePage.goto(siteUrl, { waitUntil: "networkidle" });
    const overflow = await responsivePage.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    if (overflow) throw new Error(`${viewport.name} layout has horizontal overflow.`);

    const compactVisible = await responsivePage
      .getByRole("button", { name: "Open navigation menu" })
      .isVisible();
    if (compactVisible !== viewport.compactNavigation) {
      throw new Error(`${viewport.name} uses the wrong navigation layout.`);
    }
  }
  await responsiveContext.close();
  await context.close();

  console.log("Browser QA passed: HTTP, links, console, keyboard, theme, mobile navigation, four responsive widths, overflow, and WCAG AA checks.");
} finally {
  await browser?.close();
  preview.kill();
}
