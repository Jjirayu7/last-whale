/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "last-whale"; 

const nextConfig = {
  output: "export",

  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",

  trailingSlash: true, // ✅ สำคัญมาก! ป้องกัน 404 ของ _next/static

  images: {
    unoptimized: true, // GitHub Pages ไม่รองรับ Image Optimization
  },

  reactStrictMode: true,

  env: {
    NEXT_PUBLIC_ACCESS_PASSWORD: process.env.NEXT_PUBLIC_ACCESS_PASSWORD,
  },
};

module.exports = nextConfig;
