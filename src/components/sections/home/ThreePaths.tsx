"use client";
import { useTranslations, useLocale } from "next-intl";
import { ImageCard } from "../ImageCard";

export function ThreePaths() {
  const t = useTranslations("paths");
  const locale = useLocale();

  const paths = [
    {
      eyebrowLabel: t("individuals_eyebrow"),
      title: t("individuals_title"),
      sub: t("individuals_sub"),
      cta: t("individuals_cta"),
      href: `/${locale}/particuliers`,
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      imageAlt: "Family home",
    },
    {
      eyebrowLabel: t("businesses_eyebrow"),
      title: t("businesses_title"),
      sub: t("businesses_sub"),
      cta: t("businesses_cta"),
      href: `/${locale}/entreprises`,
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
      imageAlt: "Business professionals",
    },
    {
      eyebrowLabel: t("growing_eyebrow"),
      title: t("growing_title"),
      sub: t("growing_sub"),
      cta: t("growing_cta"),
      href: `/${locale}/croissance`,
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
      imageAlt: "Growing company team",
    },
  ];

  return (
    <section className="py-16 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-gold/80 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl text-white tracking-tight">
            {t("heading")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paths.map((path) => (
            <ImageCard
              key={path.href}
              eyebrowLabel={path.eyebrowLabel}
              title={path.title}
              description={path.sub}
              ctaLabel={path.cta}
              href={path.href}
              image={path.image}
              imageAlt={path.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
