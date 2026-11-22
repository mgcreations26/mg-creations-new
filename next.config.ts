import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d123s6f1z9g2wk.cloudfront.net",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
    {
      protocol: "https",
      hostname: "images-api.printify.com",
      pathname: "/**",
    },
    ],
  },
};

export default nextConfig;
