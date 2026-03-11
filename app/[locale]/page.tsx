"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Camera, Search, BookOpen, User, ArrowRight, X } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { translations, isValidLocale, type Locale } from "@/lib/i18n";
import { AppHeader } from "@/components/AppHeader";

export default function HomePage() {
  const params = useParams();
  const pathname = usePathname();
  const localeParam = params?.locale;
  const localeStr = localeParam === undefined ? "" : Array.isArray(localeParam) ? localeParam[0] : localeParam;
  const locale = isValidLocale(localeStr) ? (localeStr as Locale) : "en";
  const t = translations[locale];
  const [showComingSoon, setShowComingSoon] = useState(false);

  // 루트(/)일 때는 locale prefix 없이 링크 (기본 en)
  const basePath = pathname === "/" ? "" : `/${locale}`;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#fcff3b] selection:text-black">
      {showComingSoon && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowComingSoon(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="coming-soon-title"
        >
          <div
            className="relative bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-sm w-full shadow-xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p id="coming-soon-title" className="text-xl font-bold text-white mb-6">
              {t.comingSoon.title}
            </p>
            <button
              type="button"
              onClick={() => setShowComingSoon(false)}
              className="bg-[#fcff3b] text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#e5e822] transition-colors"
            >
              {t.comingSoon.confirm}
            </button>
            <button
              type="button"
              onClick={() => setShowComingSoon(false)}
              className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-white transition-colors rounded-full"
              aria-label={t.comingSoon.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <AppHeader />

      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            {t.hero.title} <br />
            <span className="text-zinc-500">{t.hero.titleSub}</span>
          </h1>
          <p className="text-lg text-zinc-400 mb-8 max-w-lg leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => setShowComingSoon(true)}
              className="bg-[#fcff3b] text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-[#e5e822] transition-colors flex items-center justify-center gap-2"
            >
              {t.hero.iosDownload} <ArrowRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowComingSoon(true)}
              className="bg-[#fcff3b] text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-[#e5e822] transition-colors flex items-center justify-center gap-2"
            >
              {t.hero.androidDownload} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800">
          <Image
            src="https://picsum.photos/seed/gallery/800/1000"
            alt="Gallery exhibition"
            fill
            className="object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 bg-zinc-900/90 backdrop-blur p-6 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-white">{t.card.analyzing}</div>
                <div className="text-sm text-zinc-400">{t.card.analyzingDesc}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-black px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.features.title}</h2>
            <p className="text-zinc-400 text-lg">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.features.recognition.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{t.features.recognition.description}</p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.features.collection.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{t.features.collection.description}</p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <User className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.features.profile.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{t.features.profile.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-zinc-950 text-center border-t border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">{t.cta.title}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => setShowComingSoon(true)}
              className="bg-[#fcff3b] text-black px-10 py-5 rounded-full text-xl font-bold hover:bg-[#e5e822] transition-colors inline-flex items-center justify-center gap-2"
            >
              {t.cta.iosDownload} <ArrowRight className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => setShowComingSoon(true)}
              className="bg-[#fcff3b] text-black px-10 py-5 rounded-full text-xl font-bold hover:bg-[#e5e822] transition-colors inline-flex items-center justify-center gap-2"
            >
              {t.cta.androidDownload} <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href={basePath} className="block">
            <Image
              src="/bside-logo.png"
              alt="Bside"
              width={160}
              height={50}
              className="h-8 w-auto"
              unoptimized
            />
          </Link>
          <div className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Bside. {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
