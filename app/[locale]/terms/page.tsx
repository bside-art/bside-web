import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AppHeader } from "@/components/AppHeader";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { getAbsoluteUrl, getBaseUrl, seoByLocale } from "@/lib/seo";

const DOCS_BY_LOCALE = {
  ko: "terms.md",
  en: "terms.md",
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const loc = locale as Locale;
  const seo = seoByLocale[loc].terms;
  const url = getAbsoluteUrl(loc, "terms");
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        en: getAbsoluteUrl("en", "terms"),
        ko: getAbsoluteUrl("ko", "terms"),
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: "bside",
      locale: loc === "ko" ? "ko_KR" : "en_US",
      type: "website",
      images: [
        {
          url: `${getBaseUrl()}/bside-logo.png`,
          width: 200,
          height: 63,
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

export default async function TermsPage({
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
      <AppHeader />
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
            <Image
              src="/bside-logo.png"
              alt="bside"
              width={160}
              height={50}
              className="h-8 w-auto"
              unoptimized
            />
          </Link>
          <div className="text-sm text-zinc-500">
            © {new Date().getFullYear()} bside. {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
