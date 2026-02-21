import type { NextConfig } from "next";

const commit =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ||
  process.env.NEXT_PUBLIC_APP_VERSION ||
  process.env.npm_package_version ||
  "dev";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: commit,
  },
};

export default nextConfig;