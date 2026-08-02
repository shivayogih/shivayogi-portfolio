import type { NextConfig } from "next";

const repositoryName = "shivayogi-portfolio";
const isPagesBuild =
  process.env.GITHUB_ACTIONS === "true" ||
  process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";
const basePath = isPagesBuild ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;

