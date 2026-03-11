# Bside Web

Bside 모바일 앱의 랜딩/웹사이트입니다. 전시에서 촬영한 작품을 AI로 식별하고, 상세 정보를 제공하며 나만의 관람 기록을 남길 수 있는 앱을 소개합니다.

## 기술 스택

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **다국어**: 영어(en), 한국어(ko) — `[locale]` 라우팅

## 주요 기능

- **홈**: 히어로, 주요 기능 소개(작품 인식, 관람 기록 저장, 사용자 프로필), 앱 다운로드 CTA, Coming Soon 모달
- **이용약관 / 개인정보처리방침**: 로케일별 마크다운 문서 렌더링 (`public/docs/{en,ko}/`)
- **SEO**: 메타데이터, `sitemap.xml`, `robots.txt`, canonical URL, hreflang
- **정적 생성**: `output: 'standalone'` 지원

## 로컬 실행

**필수:** Node.js

1. 의존성 설치:
   ```bash
   npm install
   ```
2. 개발 서버 실행:
   ```bash
   npm run dev
   ```
3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

- 루트 `/` → 영어 기본
- `/en`, `/ko` → 로케일별 페이지
- `/en/terms`, `/ko/privacy` 등 하위 경로 지원

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 실행 |
| `npm run clean` | Next.js 캐시 정리 |

## 환경 변수 (선택)

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | 프로덕션 사이트 URL (SEO canonical 등). 미설정 시 `https://bside.app` 또는 Vercel 배포 시 `VERCEL_URL` 사용 |

## 프로젝트 구조 요약

```
app/
  [locale]/          # en, ko 로케일 라우트
    layout.tsx       # 로케일 레이아웃, 메타데이터
    page.tsx         # 홈 페이지
    terms/           # 이용약관
    privacy/         # 개인정보처리방침
  layout.tsx         # 루트 레이아웃
  page.tsx           # 루트(/) → en 기본
  sitemap.ts
  robots.ts
lib/
  i18n.ts            # 로케일, 번역
  seo.ts             # base URL, SEO 메타
  utils.ts
public/
  docs/{en,ko}/      # terms.md, privacy.md
```

## 라이선스

Private.
