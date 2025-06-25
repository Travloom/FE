import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ["img1.kakaocdn.net", "t1.kakaocdn.net", "k.kakaocdn.net"],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  experimental: {
    proxyTimeout: 1000000,
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  async rewrites() {
    return [
      {
        source: "/proxy/:path*",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN}/:path*`,  // 실제 api url 경로 (최종적으로 요청 보낼 url)
      },
    ];
  },
  trailingSlash: false,
};

export default nextConfig;
