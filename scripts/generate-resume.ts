import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import { portfolio } from "../src/content/portfolio";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_X = 46;
const TOP = 796;
const BOTTOM = 42;

const ink = rgb(0.08, 0.1, 0.14);
const muted = rgb(0.32, 0.36, 0.43);
const accent = rgb(0.29, 0.25, 0.68);
const rule = rgb(0.81, 0.82, 0.85);

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

type Writer = {
  page: PDFPage;
  regular: PDFFont;
  bold: PDFFont;
  y: number;
};

function drawWrapped(
  writer: Writer,
  text: string,
  options: {
    size?: number;
    color?: ReturnType<typeof rgb>;
    font?: PDFFont;
    x?: number;
    maxWidth?: number;
    lineHeight?: number;
    after?: number;
  } = {},
) {
  const size = options.size ?? 8.5;
  const color = options.color ?? muted;
  const font = options.font ?? writer.regular;
  const x = options.x ?? MARGIN_X;
  const maxWidth = options.maxWidth ?? PAGE_WIDTH - MARGIN_X * 2;
  const lineHeight = options.lineHeight ?? size * 1.35;

  for (const line of wrapText(text, font, size, maxWidth)) {
    writer.page.drawText(line, { x, y: writer.y, size, font, color });
    writer.y -= lineHeight;
  }
  writer.y -= options.after ?? 4;
}

function drawSectionTitle(writer: Writer, title: string) {
  writer.y -= 7;
  writer.page.drawText(title.toUpperCase(), {
    x: MARGIN_X,
    y: writer.y,
    size: 7.3,
    font: writer.bold,
    color: accent,
  });
  writer.page.drawLine({
    start: { x: MARGIN_X + 115, y: writer.y + 2 },
    end: { x: PAGE_WIDTH - MARGIN_X, y: writer.y + 2 },
    thickness: 0.6,
    color: rule,
  });
  writer.y -= 18;
}

function drawExperience(writer: Writer, index: number, highlightLimit = 2) {
  const item = portfolio.experience[index];
  writer.page.drawText(item.role, {
    x: MARGIN_X,
    y: writer.y,
    size: 9.5,
    font: writer.bold,
    color: ink,
  });
  const periodWidth = writer.bold.widthOfTextAtSize(item.period, 8);
  writer.page.drawText(item.period, {
    x: PAGE_WIDTH - MARGIN_X - periodWidth,
    y: writer.y + 0.5,
    size: 8,
    font: writer.bold,
    color: accent,
  });
  writer.y -= 13;
  drawWrapped(
    writer,
    `${item.company}${item.client ? ` | Client: ${item.client}` : ""}`,
    { size: 8, color: ink, font: writer.bold, after: 3 },
  );
  drawWrapped(writer, item.summary, { size: 7.8, lineHeight: 10.4, after: 2 });
  for (const highlight of item.highlights.slice(0, highlightLimit)) {
    writer.page.drawCircle({
      x: MARGIN_X + 2,
      y: writer.y + 3.5,
      size: 1.6,
      color: accent,
    });
    drawWrapped(writer, highlight, {
      size: 7.55,
      x: MARGIN_X + 10,
      maxWidth: PAGE_WIDTH - MARGIN_X * 2 - 10,
      lineHeight: 10,
      after: 1,
    });
  }
  writer.y -= 8;
}

function drawFooter(page: PDFPage, font: PDFFont, pageNumber: number) {
  page.drawLine({
    start: { x: MARGIN_X, y: BOTTOM + 9 },
    end: { x: PAGE_WIDTH - MARGIN_X, y: BOTTOM + 9 },
    thickness: 0.5,
    color: rule,
  });
  page.drawText(`Shivayogi Hiremath · Resume · ${pageNumber}/2`, {
    x: MARGIN_X,
    y: BOTTOM - 2,
    size: 6.8,
    font,
    color: muted,
  });
}

async function generateResume() {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`${portfolio.person.name} — Resume`);
  pdf.setAuthor(portfolio.person.name);
  pdf.setSubject("Lead Android Developer and Mobile Architect resume");
  pdf.setKeywords([
    "Android",
    "Kotlin",
    "Jetpack Compose",
    "Mobile Architect",
    "Lead Android Developer",
  ]);
  pdf.setCreator("Shivayogi Hiremath portfolio resume generator");

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const pageOne = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const first: Writer = { page: pageOne, regular, bold, y: TOP };

  pageOne.drawText(portfolio.person.name, {
    x: MARGIN_X,
    y: first.y,
    size: 25,
    font: bold,
    color: ink,
  });
  first.y -= 22;
  drawWrapped(first, portfolio.person.titles.join(" · "), {
    size: 10.2,
    color: accent,
    font: bold,
    after: 4,
  });
  drawWrapped(
    first,
    `${portfolio.person.location}  |  ${portfolio.person.email}  |  github.com/shivayogih`,
    { size: 7.7, color: muted, after: 8 },
  );

  drawSectionTitle(first, "Professional summary");
  drawWrapped(first, portfolio.person.summary, {
    size: 8.2,
    lineHeight: 11.2,
    color: ink,
    after: 5,
  });

  drawSectionTitle(first, "Core skills");
  drawWrapped(
    first,
    [
      "Kotlin",
      "Java",
      "Android SDK",
      "Jetpack Compose",
      "Coroutines",
      "Flow",
      "MVVM",
      "MVI",
      "Clean Architecture",
      "Modularisation",
      "Hilt",
      "Dagger",
      "Koin",
      "REST",
      "GraphQL",
      "Room",
      "DataStore",
      "Testing",
      "CI/CD",
      "Code review",
      "Mentoring",
    ].join("  ·  "),
    { size: 7.7, lineHeight: 10.5, color: ink, after: 4 },
  );

  drawSectionTitle(first, "Relevant experience");
  drawExperience(first, 0, 2);
  drawExperience(first, 1, 2);
  drawExperience(first, 2, 2);
  drawExperience(first, 3, 2);

  if (first.y < BOTTOM + 15) {
    throw new Error(`Page one overflowed the printable area at y=${first.y}`);
  }

  const pageTwo = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const second: Writer = { page: pageTwo, regular, bold, y: TOP };

  pageTwo.drawText("Experience · Projects · Education", {
    x: MARGIN_X,
    y: second.y,
    size: 16,
    font: bold,
    color: ink,
  });
  second.y -= 25;

  drawSectionTitle(second, "Earlier experience");
  drawExperience(second, 4, 0);
  drawExperience(second, 5, 0);
  drawExperience(second, 6, 0);

  drawSectionTitle(second, "Selected projects");
  for (const project of portfolio.projects) {
    pageTwo.drawText(project.name, {
      x: MARGIN_X,
      y: second.y,
      size: 9.2,
      font: bold,
      color: ink,
    });
    const statusWidth = regular.widthOfTextAtSize(project.status, 7.2);
    pageTwo.drawText(project.status, {
      x: PAGE_WIDTH - MARGIN_X - statusWidth,
      y: second.y + 0.5,
      size: 7.2,
      font: regular,
      color: accent,
    });
    second.y -= 13;
    drawWrapped(second, project.summary, {
      size: 7.7,
      lineHeight: 10.2,
      after: 7,
    });
  }

  drawSectionTitle(second, "Education");
  drawWrapped(second, portfolio.education.degree, {
    size: 9,
    color: ink,
    font: bold,
    after: 1,
  });
  drawWrapped(
    second,
    `${portfolio.education.college} · ${portfolio.education.university}`,
    { size: 8, after: 1 },
  );
  drawWrapped(second, `Completed: ${portfolio.education.completed}`, {
    size: 8,
    color: accent,
    font: bold,
  });

  if (second.y < BOTTOM + 15) {
    throw new Error(`Page two overflowed the printable area at y=${second.y}`);
  }

  drawFooter(pageOne, regular, 1);
  drawFooter(pageTwo, regular, 2);

  const outputDirectory = path.resolve("public");
  await mkdir(outputDirectory, { recursive: true });
  const outputPath = path.join(outputDirectory, "Shivayogi-Hiremath-Resume.pdf");
  const bytes = await pdf.save({ useObjectStreams: false });
  await writeFile(outputPath, bytes);
  console.log(`Generated ${outputPath} (${bytes.length} bytes, 2 pages)`);
}

await generateResume();
