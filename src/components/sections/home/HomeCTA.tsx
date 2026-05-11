"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Calendar } from "lucide-react";

export function HomeCTA() {
  const t = useTranslations("cta_section");
  const locale = useLocale();

  return (
    <section className="py-20 bg-gold-pale">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-navy mb-4">
            {t("title")}
          </h2>
          <p className="text-mid-gray text-lg mb-10">{t("body")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}/appointment`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white font-bold rounded-md hover:bg-navy-light transition-colors"
            >
              <Calendar size={18} />
              {t("button")}
            </a>
            <a
              href="tel:024631925"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-navy text-navy font-semibold rounded-md hover:bg-navy hover:text-white transition-colors"
            >
              <Phone size={18} />
              02 463 19 25
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
