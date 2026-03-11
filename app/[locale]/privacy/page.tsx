import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { getAbsoluteUrl, getBaseUrl, seoByLocale } from "@/lib/seo";

const DOCS_BY_LOCALE = {
  ko: "privacy.md",
  en: "privacy.md",
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const loc = locale as Locale;
  const seo = seoByLocale[loc].privacy;
  const url = getAbsoluteUrl(loc, "privacy");
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        en: getAbsoluteUrl("en", "privacy"),
        ko: getAbsoluteUrl("ko", "privacy"),
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: "Bside",
      locale: loc === "ko" ? "ko_KR" : "en_US",
      type: "website",
      images: [{ url: `${getBaseUrl()}/bside-logo.png`, width: 200, height: 63, alt: "Bside" }],
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = translations[locale as Locale];
  const basePath = `/${locale}`;

  const fileName = DOCS_BY_LOCALE[locale as Locale];
  const filePath = path.join(process.cwd(), "public", "docs", locale, fileName);
  const content = await readFile(filePath, "utf-8");

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#fcff3b] selection:text-black">
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={basePath} className="block">
            <Image src="/bside-logo.png" alt="Bside" width={200} height={63} className="h-10 w-auto" unoptimized />
          </Link>
          <div className="flex items-center gap-6">
            <Link href={`${basePath}/terms`} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">{t.nav.terms}</Link>
            <Link href={`${basePath}/privacy`} className="text-sm font-medium text-white transition-colors">{t.nav.privacy}</Link>
            <LocaleSwitcher />
          </div>
        </div>
      </nav>
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert prose-zinc max-w-none text-zinc-300 [&_a]:text-zinc-400 [&_a]:hover:text-zinc-300 [&_a]:hover:underline">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </div>
      </main>
      <footer className="bg-black border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href={basePath}>
            <Image src="/bside-logo.png" alt="Bside" width={160} height={50} className="h-8 w-auto" unoptimized />
          </Link>
          <div className="text-sm text-zinc-500">© {new Date().getFullYear()} Bside. {t.footer.rights}</div>
        </div>
      </footer>
    </div>
  );
}
