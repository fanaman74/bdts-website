"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Calendar } from "lucide-react";

export function HomeCTA() {
  const t = useTranslations("cta_section");
  const locale = useLocale();

  return (
    <section className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
        >
          <div>
            <p className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
              {t("eyebrow")}
            </p>
            <h2 className="font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl text-white tracking-tight mb-3">
              {t("title")}
            </h2>
            <p className="text-white/60 text-base max-w-lg">{t("body")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href={`/${locale}/appointment`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gold text-navy-dark font-bold text-sm rounded-full hover:bg-gold-light transition-colors"
            >
              <Calendar size={16} />
              {t("button")}
            </a>
            <a
              href="tel:024631925"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-white/50 text-white font-semibold text-sm rounded-full hover:border-white transition-colors"
            >
              <Phone size={16} />
              02 463 19 25
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
