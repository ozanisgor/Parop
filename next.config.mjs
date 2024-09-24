/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "puppeteer",
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth",
    ],
    serverMinification: false,
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
  },
};

export default nextConfig;
