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
};

export default nextConfig;
