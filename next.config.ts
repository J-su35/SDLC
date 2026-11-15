import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.PLAYWRIGHT_TEST === "1" ? ".next-e2e" : ".next",
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
