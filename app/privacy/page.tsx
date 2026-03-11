import Image from "next/image";
import Link from "next/link";
import { readFile } from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { translations } from "@/lib/i18n";

const locale = "en";
const basePath = "";

export default async function PrivacyPage() {
  const t = translations[locale];
  const filePath = path.join(process.cwd(), "public", "docs", locale, "privacy.md");
  const content = await readFile(filePath, "utf-8");

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#fcff3b] selection:text-black">
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={basePath || "/"} className="block">
            <Image src="/bside-logo.png" alt="Bside" width={200} height={63} className="h-10 w-auto" unoptimized />
          </Link>
          <div className="flex items-center gap-6">
            <Link href={basePath ? `${basePath}/terms` : "/terms"} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">{t.nav.terms}</Link>
            <Link href={basePath ? `${basePath}/privacy` : "/privacy"} className="text-sm font-medium text-white transition-colors">{t.nav.privacy}</Link>
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
          <Link href={basePath || "/"}>
            <Image src="/bside-logo.png" alt="Bside" width={160} height={50} className="h-8 w-auto" unoptimized />
          </Link>
          <div className="text-sm text-zinc-500">© {new Date().getFullYear()} Bside. {t.footer.rights}</div>
        </div>
      </footer>
    </div>
  );
}
