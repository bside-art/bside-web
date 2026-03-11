"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

const LOCALES: Locale[] = ["en", "ko"];

const FLAG_BY_LOCALE: Record<Locale, string> = {
  en: "🇺🇸",
  ko: "🇰🇷",
};

function getHref(targetLocale: Locale, pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const firstIsLocale = segments.length > 0 && isValidLocale(segments[0]);
  const pathWithoutLocale = firstIsLocale ? segments.slice(1).join("/") : segments.join("/");
  if (targetLocale === "en") {
    return pathWithoutLocale ? `/en/${pathWithoutLocale}` : "/";
  }
  return pathWithoutLocale ? `/${targetLocale}/${pathWithoutLocale}` : `/${targetLocale}`;
}

export function LocaleSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const segments = pathname.split("/").filter(Boolean);
  const currentLocale: Locale =
    segments.length > 0 && isValidLocale(segments[0]) ? (segments[0] as Locale) : "en";

  const t = translations[currentLocale];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-600"
        aria-label={t.nav.language}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg leading-none" aria-hidden>
          {FLAG_BY_LOCALE[currentLocale]}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 py-1 min-w-[10rem] rounded-lg overflow-hidden bg-zinc-900 border border-zinc-700 shadow-xl z-50"
          role="menu"
        >
          {LOCALES.map((loc) => {
            const href = getHref(loc, pathname);
            const label = loc === "en" ? t.nav.localeEn : t.nav.localeKo;
            const isActive = currentLocale === loc;

            return (
              <Link
                key={loc}
                href={href}
                role="menuitem"
                className={`flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg leading-none" aria-hidden>
                  {FLAG_BY_LOCALE[loc]}
                </span>
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
