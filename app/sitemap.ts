import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";
import { locales } from "@/lib/i18n";

const BASE = getBaseUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];

  for (const locale of locales) {
    const pathPrefix = `/${locale}`;
    entries.push({
      url: `${BASE}${pathPrefix}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: locale === "en" ? 1 : 0.9,
    });
    entries.push({
      url: `${BASE}${pathPrefix}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
    entries.push({
      url: `${BASE}${pathPrefix}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
