export type Locale = "en" | "ko";

export const locales: Locale[] = ["en", "ko"];

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const translations = {
  en: {
    nav: {
      terms: "Terms of Service",
      privacy: "Privacy Policy",
    },
    comingSoon: {
      title: "Coming soon.",
      confirm: "OK",
      close: "Close",
    },
    hero: {
      title: "Record the artwork",
      titleSub: "your gaze lingered on",
      description:
        "Bside is a mobile application that identifies artworks via AI when you photograph them at exhibitions, provides detailed information, and lets you keep your own visit records.",
      iosDownload: "Download for iOS",
      androidDownload: "Download for Android",
    },
    card: {
      analyzing: "Analyzing artwork...",
      analyzingDesc: "Extracting image features",
    },
    features: {
      title: "Features",
      subtitle:
        "Beyond viewing art, we provide tools to record and manage your exhibition experience.",
      recognition: {
        title: "Artwork Recognition",
        description:
          "When you photograph an artwork with the camera, our AI extracts image features and matches them with our database. Instantly view metadata such as artist name, artwork title, and exhibition information.",
      },
      collection: {
        title: "Capture Collection",
        description:
          "Save artwork images, recognized information, capture date, and your notes to build your own catalog. Each record can be set to public or private.",
      },
      profile: {
        title: "User Profile",
        description:
          "View all your visit records in one place on your profile. Share your taste with others through your public capture records.",
      },
    },
    cta: {
      title: "Start your exhibition record today",
      iosDownload: "Download for iOS",
      androidDownload: "Download for Android",
    },
    footer: {
      rights: "All rights reserved.",
    },
    termsTitle: "Terms of Service",
  },
  ko: {
    nav: {
      terms: "이용약관",
      privacy: "개인정보처리방침",
    },
    comingSoon: {
      title: "출시 준비중입니다.",
      confirm: "확인",
      close: "닫기",
    },
    hero: {
      title: "당신의 시선이 머문",
      titleSub: "작품을 기록하다",
      description:
        "Bside는 전시 공간에서 마주친 작품을 촬영하면, AI가 작품을 식별하여 상세 정보를 제공하고 나만의 관람 기록으로 남길 수 있는 모바일 애플리케이션입니다.",
      iosDownload: "iOS 다운로드",
      androidDownload: "Android 다운로드",
    },
    card: {
      analyzing: "AI 작품 인식 중...",
      analyzingDesc: "이미지 특징을 분석하고 있습니다",
    },
    features: {
      title: "주요 기능",
      subtitle:
        "작품 감상을 넘어, 전시 관람 경험을 온전히 기록하고 관리할 수 있는 도구를 제공합니다.",
      recognition: {
        title: "작품 인식 (Artwork Recognition)",
        description:
          "카메라로 작품을 촬영하면 AI 모델이 이미지 특징을 추출하여 내부 데이터베이스와 비교합니다. 일치하는 작품의 작가명, 작품명, 전시 정보 등 메타데이터를 즉시 확인하세요.",
      },
      collection: {
        title: "관람 기록 저장 (Capture Collection)",
        description:
          "촬영한 작품 이미지, 인식된 정보, 촬영 날짜, 사용자 메모를 함께 저장하여 나만의 도록을 만듭니다. 각 기록은 공개 또는 비공개로 자유롭게 설정할 수 있습니다.",
      },
      profile: {
        title: "사용자 프로필",
        description:
          "나만의 프로필 페이지에서 관람 기록 목록을 한눈에 모아보세요. 공개된 캡처 기록을 통해 다른 사용자들과 예술적 취향을 공유할 수 있습니다.",
      },
    },
    cta: {
      title: "지금 바로 나만의 전시 기록을 시작하세요",
      iosDownload: "iOS 다운로드",
      androidDownload: "Android 다운로드",
    },
    footer: {
      rights: "All rights reserved.",
    },
    termsTitle: "이용약관",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];
