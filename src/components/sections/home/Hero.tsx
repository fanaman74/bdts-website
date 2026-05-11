"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-navy-dark via-navy to-navy-light overflow-hidden">
      {/* Geometric accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 border-2 border-gold rounded-full" />
        <div className="absolute top-40 right-40 w-64 h-64 border border-gold rounded-full" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gold/20 rounded-full blur-3xl" />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-gold via-gold-light to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              BDTS — Laeken, Brussels
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
            {t("headline")}
          </h1>

          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10">
            {t("subheading")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href={`/${locale}/contact`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy-dark font-bold rounded-md hover:bg-gold-light transition-colors text-base"
            >
              {t("cta_primary")}
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href={`/${locale}/process`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-md hover:border-gold hover:text-gold transition-colors text-base"
            >
              {t("cta_secondary")}
            </motion.a>
          </div>

          <div className="mt-12 flex flex-wrap gap-6">
            {["AG Insurance Partner", "FSMA Regulated", "Laeken, Brussels"].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-white/50 text-sm">{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
