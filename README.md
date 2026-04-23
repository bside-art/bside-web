# bside Web

bside 모바일 앱의 랜딩/웹사이트입니다. 전시에서 촬영한 작품을 AI로 식별하고, 상세 정보를 제공하며 나만의 관람 기록을 남길 수 있는 앱을 소개합니다.

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

| 명령어          | 설명               |
| --------------- | ------------------ |
| `npm run dev`   | 개발 서버 실행     |
| `npm run build` | 프로덕션 빌드      |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint`  | ESLint 실행        |
| `npm run clean` | Next.js 캐시 정리  |

## .env 파일 설정

프로젝트 루트에 `.env` 또는 `.env.local` 파일을 만들고 아래 변수를 필요에 따라 설정합니다. `.env.local`은 Git에 커밋하지 않으며 로컬에서만 사용됩니다.

**예시 (`.env` 또는 `.env.local`):**

```env
# 사이트 절대 URL. sitemap, canonical, Open Graph 등 SEO에 사용됩니다.
# 로컬: http://localhost:3000
# 프로덕션: https://bside.art (또는 배포 도메인)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

| 변수                   | 필수 | 설명                                                                                    |
| ---------------------- | ---- | --------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | 선택 | 사이트 URL. 미설정 시 기본값 `https://bside.art`, Vercel 배포 시 `VERCEL_URL` 자동 사용 |
| `DISABLE_HMR`          | 선택 | 개발 시 `true`면 HMR 비활성화 (Next.js watch 비활성화 시 사용)                          |

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
