import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Verification builds set NEXT_DIST_DIR so they never overwrite a running `next dev` (.next).
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
