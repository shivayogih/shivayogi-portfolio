import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { PDFDocument } from "pdf-lib";

async function verifyPdf(fileName: string, expectedPages: number, minimumBytes: number) {
  const pdfPath = path.resolve("public", fileName);
  const file = await readFile(pdfPath);
  const details = await stat(pdfPath);

  if (!file.subarray(0, 5).equals(Buffer.from("%PDF-"))) {
    throw new Error(`${fileName} does not have a valid PDF header.`);
  }

  if (details.size < minimumBytes) {
    throw new Error(`${fileName} is unexpectedly small: ${details.size} bytes.`);
  }

  const pdf = await PDFDocument.load(file);
  if (pdf.getPageCount() !== expectedPages) {
    throw new Error(`${fileName} must contain ${expectedPages} pages; found ${pdf.getPageCount()}.`);
  }

  return { bytes: details.size, pages: pdf.getPageCount() };
}

const resume = await verifyPdf("Shivayogi-Hiremath-Resume.pdf", 2, 100_000);
const detailedCv = await verifyPdf("Shivayogi-Hiremath-Detailed-CV.pdf", 3, 400_000);

console.log(
  `Verified supplied PDF assets: resume ${resume.bytes} bytes/${resume.pages} pages; detailed CV ${detailedCv.bytes} bytes/${detailedCv.pages} pages.`,
);
