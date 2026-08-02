export const repositoryName = "shivayogi-portfolio";
export const productionUrl =
  "https://shivayogih.github.io/shivayogi-portfolio/";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
