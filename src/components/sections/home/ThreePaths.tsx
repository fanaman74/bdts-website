"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Home, Briefcase, TrendingUp, ArrowRight } from "lucide-react";

export function ThreePaths() {
  const t = useTranslations("paths");
  const locale = useLocale();

  const paths = [
    {
      icon: Home,
      title: t("individuals_title"),
      sub: t("individuals_sub"),
      cta: t("individuals_cta"),
      href: `/${locale}/particuliers`,
      featured: false,
    },
    {
      icon: Briefcase,
      title: t("businesses_title"),
      sub: t("businesses_sub"),
      cta: t("businesses_cta"),
      href: `/${locale}/entreprises`,
      featured: true,
    },
    {
      icon: TrendingUp,
      title: t("growing_title"),
      sub: t("growing_sub"),
      cta: t("growing_cta"),
      href: `/${locale}/croissance`,
      featured: false,
    },
  ];

  return (
    <section className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-navy">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paths.map((path, i) => (
            <motion.a
              key={path.href}
              href={path.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`group block rounded-xl bg-white border p-8 hover:shadow-lg transition-all duration-300 ${path.featured ? "ring-2 ring-gold border-gold/30" : "border-border"}`}
            >
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
                <path.icon size={24} className="text-navy" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                {path.title}
              </h3>
              <p className="text-mid-gray text-sm leading-relaxed mb-6">
                {path.sub}
              </p>
              <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all">
                {path.cta}
                <ArrowRight size={16} />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
