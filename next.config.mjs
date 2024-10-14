/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  crossOrigin: "anonymous",
  experimental: {
    serverComponentsExternalPackages: [
      "puppeteer",
      "puppeteer-core",
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth",
      "@sparticuz/chromium-min",
    ],
    serverMinification: false,
  },
};

export default nextConfig;
