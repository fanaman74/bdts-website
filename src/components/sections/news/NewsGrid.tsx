"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, i) => (
        <motion.article
          key={article.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
          className="group bg-white rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
          {/* Cover image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
            <Image
              src={article.image}
              alt={article.title[locale]}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Card body */}
          <div className="p-5 flex flex-col flex-1 gap-2">
            {/* Category badge + date */}
            <div className="flex items-center justify-between gap-2">
              <span className="bg-gold text-navy text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {article.category}
              </span>
              <time className="text-mid-gray text-xs" dateTime={article.date}>
                {formatDate(article.date, locale)}
              </time>
            </div>

            {/* Title */}
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-navy text-base leading-snug mt-1">
              {article.title[locale]}
            </h3>

            {/* Excerpt */}
            <p className="text-mid-gray text-sm leading-relaxed line-clamp-2 flex-1">
              {article.excerpt[locale]}
            </p>

            {/* Read more */}
            <Link
              href={`/${locale}/news/${article.slug}`}
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-gold transition-colors"
            >
              {readMoreLabel} →
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
