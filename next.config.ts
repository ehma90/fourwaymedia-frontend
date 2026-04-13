import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard/settings",
        destination: "/dashboard/account",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
