import type { Locale } from "./i18n";

/** 프로덕션 도메인. 배포 시 NEXT_PUBLIC_SITE_URL 또는 VERCEL_URL로 덮어쓰기. */
export function getBaseUrl(): string {
  if (
    typeof process.env.NEXT_PUBLIC_SITE_URL === "string" &&
    process.env.NEXT_PUBLIC_SITE_URL
  ) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (typeof process.env.VERCEL_URL === "string" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://bside.art";
}

export const seoByLocale: Record<
  Locale,
  {
    title: string;
    description: string;
    privacy: { title: string; description: string };
    terms: { title: string; description: string };
  }
> = {
  en: {
    title: "bside – Record the artwork your gaze lingered on",
    description:
      "bside is a mobile app that identifies artworks via AI when you photograph them at exhibitions, provides detailed information, and lets you keep your own visit records.",
    privacy: {
      title: "Privacy Policy – bside",
      description:
        "bside privacy policy. How we collect, use, and protect your information.",
    },
    terms: {
      title: "Terms of Service – bside",
      description:
        "bside terms of service. Please read these terms before using our app and services.",
    },
  },
  ko: {
    title: "bside – 당신의 시선이 머문 작품을 기록하다",
    description:
      "bside는 전시 공간에서 마주친 작품을 촬영하면 AI가 작품을 식별해 상세 정보를 제공하고, 나만의 관람 기록으로 남길 수 있는 모바일 앱입니다.",
    privacy: {
      title: "개인정보처리방침 – bside",
      description: "bside 개인정보처리방침. 수집·이용·보호에 관한 안내입니다.",
    },
    terms: {
      title: "이용약관 – bside",
      description: "bside 이용약관. 앱 및 서비스 이용 전 약관을 확인해 주세요.",
    },
  },
};

export function getCanonicalPath(locale: Locale, path: string = ""): string {
  const base = locale === "en" ? "" : `/${locale}`;
  const segment = path.replace(/^\//, "");
  if (!segment) {
    return base || "/";
  }
  const fullPath = `${base}/${segment}`.replace(/\/$/, "");
  return fullPath || base || "/";
}

export function getAbsoluteUrl(locale: Locale, path: string = ""): string {
  const base = getBaseUrl();
  const canonical = getCanonicalPath(locale, path);
  return canonical === "/" ? `${base}` : `${base}${canonical}`;
}
