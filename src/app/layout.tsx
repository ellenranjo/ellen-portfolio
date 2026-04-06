import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { LosAngelesTimePill } from "@/components/LosAngelesTimePill";
import { siteIcons } from "@/lib/site-icons";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function siteOrigin(): URL {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      return new URL(process.env.NEXT_PUBLIC_SITE_URL);
    } catch {
      /* fall through */
    }
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: siteOrigin(),
  title: "Ellen Huynh | Designer",
  description: "Industrial design portfolio of Ellen Huynh.",
  icons: siteIcons,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="custom-cursor-site min-h-full flex flex-col">
        <CustomCursor />
        <div className="relative min-h-full w-full flex-1">
          <div
            className="pointer-events-none absolute z-[500] top-[max(0.75rem,env(safe-area-inset-top,0px))] right-[max(0.75rem,env(safe-area-inset-right,0px))] md:top-[max(1.25rem,env(safe-area-inset-top,0px))] md:right-[max(1.25rem,env(safe-area-inset-right,0px))]"
          >
            <LosAngelesTimePill />
          </div>
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}

