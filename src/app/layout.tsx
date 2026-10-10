import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import { site } from "@/lib/site";
import { ogImage } from "@/lib/seo";
import { Analytics } from "@/components/site/analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Logo wordmark only.
const logoFont = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: "600",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Meta ads for Australian ecommerce brands`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: site.url },
  // Optional HTML-tag verification for Search Console. DNS verification (recommended) needs no code.
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "en_AU",
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    images: [ogImage.url],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${geistSans.variable} ${geistMono.variable} ${logoFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
