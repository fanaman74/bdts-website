"use client";

import { useLocale, useTranslations } from "next-intl";
import { ImageCard } from "../ImageCard";
import { articles } from "./articles";

interface Props {
  readMoreLabel: string;
}

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(
    locale === "nl" ? "nl-BE" : locale === "en" ? "en-GB" : "fr-BE",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

export function NewsGrid({ readMoreLabel }: Props) {
  const locale = useLocale() as "fr" | "en" | "nl";
  const tEyebrows = useTranslations("eyebrows");

  return (
    <div>
      <p className="text-mid-gray text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
        {tEyebrows("news")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ImageCard
            key={article.slug}
            title={article.title[locale]}
            description={`${article.excerpt[locale]} — ${formatDate(article.date, locale)}`}
            ctaLabel={readMoreLabel}
            href={`/${locale}/news/${article.slug}`}
            image={article.image}
            imageAlt={article.title[locale]}
            eyebrowLabel={article.category}
            className="h-[380px]"
          />
        ))}
      </div>
    </div>
  );
}
