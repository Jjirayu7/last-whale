/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "last-whale"; 

const nextConfig = {
  output: "export",

  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",

  // 👇 ปิด image optimization (GitHub Pages ไม่รองรับ image loader)
  images: {
    unoptimized: true,
  },

  // 👇 เปิด strict mode (แนะนำสำหรับ dev)
  reactStrictMode: true,

  // 👇 optional: ใส่ env จาก .env ให้เข้าถึงใน client ได้
  env: {
    NEXT_PUBLIC_ACCESS_PASSWORD: process.env.NEXT_PUBLIC_ACCESS_PASSWORD,
  },
};

module.exports = nextConfig;
