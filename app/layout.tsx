import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layouts/navbar/Navbar";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Footer } from "@/components/layouts/footer/Footer";
import { MobileNav } from "@/components/layouts/navbar/MobileNavbar";
config.autoAddCss = false;

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | iBlogger",
    default: "Bitcoin Gündemi",
  },

  description: "Güncel Bitcoin gelişmeleri hakkında yazılar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <Navbar />
        <MobileNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
