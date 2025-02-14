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
    template: "%s | Parop",
    default: "Bitcoin Gündemini takip etmek için doğru yer",
  },
  description: "Güncel Bitcoin gelişmeleri hakkında yazılar ve daha fazlası",
  referrer: "origin-when-cross-origin",
  twitter: {
    card: "summary_large_image",
  },
  // openGraph: {
  //   images: [
  //     {
  //       url: image,
  //       width: 1200,
  //       height: 630,
  //       alt: `Parop logosu`,
  //     },
  //   ],
  //   title: "Bitcoin Gündemini takip etmek için doğru yer",
  //   description: "Güncel Bitcoin gelişmeleri hakkında yazılar ve daha fazlası",
  //   type: "website",
  //   url: `${process.env.NEXT_PUBLIC_API_URL}`,
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Bitcoin Gündemini takip etmek için doğru yer",
  //   description: "Güncel Bitcoin gelişmeleri hakkında yazılar ve daha fazlası",
  //   images: [
  //     {
  //       url: image,
  //       width: 1200,
  //       height: 630,
  //       alt: `Parop logosu`,
  //     },
  //   ],
  // },
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
