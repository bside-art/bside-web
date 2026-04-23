import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { getAbsoluteUrl, getBaseUrl, seoByLocale } from "@/lib/seo";
import { notFound } from "next/navigation";
import { LocaleProvider } from "./locale-provider";
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ko" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    return { title: "bside" };
  }
  const loc = locale as Locale;
  const seo = seoByLocale[loc];
  const baseUrl = getBaseUrl();
  const canonicalUrl = getAbsoluteUrl(loc);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: getAbsoluteUrl("en"),
        ko: getAbsoluteUrl("ko"),
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: "bside",
      locale: loc === "ko" ? "ko_KR" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/bside-img.png`,
          width: 1200,
          height: 630,
          alt: "bside",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  return <LocaleProvider locale={locale as Locale}>{children}</LocaleProvider>;
}
