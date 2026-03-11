"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { translations, isValidLocale, type Locale } from "@/lib/i18n";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export function AppHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const locale: Locale =
    segments.length > 0 && isValidLocale(segments[0]) ? (segments[0] as Locale) : "en";
  const basePath = pathname === "/" ? "" : `/${locale}`;
  const t = translations[locale];

  const isTerms = pathname.includes("/terms");
  const isPrivacy = pathname.includes("/privacy");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = "text-sm font-medium transition-colors";
  const termsClass = isTerms ? "text-white" : "text-zinc-300 hover:text-white";
  const privacyClass = isPrivacy ? "text-white" : "text-zinc-300 hover:text-white";

  const termsHref = basePath ? `${basePath}/terms` : "/terms";
  const privacyHref = basePath ? `${basePath}/privacy` : "/privacy";
  const homeHref = basePath || "/";

  const navLinks = (
    <>
      <Link href={termsHref} className={`${linkClass} ${termsClass}`} onClick={() => setMenuOpen(false)}>
        {t.nav.terms}
      </Link>
      <Link href={privacyHref} className={`${linkClass} ${privacyClass}`} onClick={() => setMenuOpen(false)}>
        {t.nav.privacy}
      </Link>
      <LocaleSwitcher />
    </>
  );

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={homeHref} className="block" onClick={() => setMenuOpen(false)}>
          <Image
            src="/bside-logo.png"
            alt="Bside"
            width={200}
            height={63}
            className="h-10 w-auto"
            unoptimized
          />
        </Link>

        {/* Desktop: 가로 메뉴 */}
        <div className="hidden md:flex items-center gap-6">{navLinks}</div>

        {/* Mobile: 햄버거 버튼 */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile: 열린 메뉴 — 우측 패널 + 배경 딤 */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-40 transition-opacity duration-200 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* 딤 레이어: 클릭 시 메뉴 닫힘 */}
        <div
          className="absolute inset-0 z-0 bg-black/60"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
        {/* 우측 메뉴 패널: 콘텐츠(이용약관·개인정보·언어) 높이만큼만 배경 */}
        <div
          className={`absolute right-0 top-0 z-10 w-[min(12rem,100vw)] flex flex-col gap-6 p-6 pt-8 pb-6 border-l border-b border-zinc-800 shadow-xl transition-transform duration-200 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "#18181b" }}
        >
          <Link href={termsHref} className={`${linkClass} ${termsClass} py-2 text-base block rounded-none`} style={{ backgroundColor: "#18181b" }} onClick={() => setMenuOpen(false)}>
            {t.nav.terms}
          </Link>
          <Link href={privacyHref} className={`${linkClass} ${privacyClass} py-2 text-base block rounded-none`} style={{ backgroundColor: "#18181b" }} onClick={() => setMenuOpen(false)}>
            {t.nav.privacy}
          </Link>
          <div className="pt-2 rounded-none flex items-center gap-2 flex-wrap" style={{ backgroundColor: "#18181b" }}>
            <span className="text-sm text-zinc-500 shrink-0">{t.nav.language}</span>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
