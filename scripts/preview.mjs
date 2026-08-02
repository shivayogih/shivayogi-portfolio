import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { createGzip } from "node:zlib";

const port = Number(process.env.PORT || 4173);
const root = path.resolve("out");
const basePath = "/shivayogi-portfolio";
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml; charset=utf-8",
};

const server = createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  if (url.pathname === "/") {
    response.writeHead(302, { Location: `${basePath}/` });
    response.end();
    return;
  }

  if (!url.pathname.startsWith(basePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const requestPath = decodeURIComponent(url.pathname.slice(basePath.length)) || "/";
  let filePath = path.resolve(root, `.${requestPath}`);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end();
    return;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!existsSync(filePath)) {
    filePath = path.join(root, "404.html");
    response.statusCode = 404;
  }

  response.setHeader(
    "Content-Type",
    mimeTypes[path.extname(filePath)] || "application/octet-stream",
  );
  response.setHeader("Cache-Control", "no-store");
  const compressible = new Set([
    ".css",
    ".html",
    ".js",
    ".json",
    ".svg",
    ".txt",
    ".webmanifest",
    ".xml",
  ]);
  const acceptsGzip = request.headers["accept-encoding"]?.includes("gzip");
  if (acceptsGzip && compressible.has(path.extname(filePath))) {
    response.setHeader("Content-Encoding", "gzip");
    response.setHeader("Vary", "Accept-Encoding");
    createReadStream(filePath).pipe(createGzip()).pipe(response);
  } else {
    createReadStream(filePath).pipe(response);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Static preview: http://127.0.0.1:${port}${basePath}/`);
});
