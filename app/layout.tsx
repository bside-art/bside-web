import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Bside – Record the artwork your gaze lingered on",
    template: "%s | Bside",
  },
  description:
    "Bside is a mobile app that identifies artworks via AI when you photograph them at exhibitions, provides detailed information, and lets you keep your own visit records.",
  openGraph: {
    type: "website",
    siteName: "Bside",
    locale: "en",
    alternateLocale: "ko",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
