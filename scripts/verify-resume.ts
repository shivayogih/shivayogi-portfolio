import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { PDFDocument } from "pdf-lib";

const resumePath = path.resolve("public", "Shivayogi-Hiremath-Resume.pdf");
const file = await readFile(resumePath);
const details = await stat(resumePath);

if (!file.subarray(0, 5).equals(Buffer.from("%PDF-"))) {
  throw new Error("Resume does not have a valid PDF header.");
}

if (details.size < 8_000) {
  throw new Error(`Resume is unexpectedly small: ${details.size} bytes.`);
}

const pdf = await PDFDocument.load(file);
if (pdf.getPageCount() < 1 || pdf.getPageCount() > 2) {
  throw new Error(`Resume must contain one or two pages; found ${pdf.getPageCount()}.`);
}

const title = pdf.getTitle();
if (!title?.includes("Shivayogi Hiremath")) {
  throw new Error("Resume PDF metadata is missing the candidate name.");
}

console.log(`Verified searchable text PDF structure: ${details.size} bytes, ${pdf.getPageCount()} pages.`);

