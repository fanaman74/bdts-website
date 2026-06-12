"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-dark">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.pexels.com/videos/18937211/atomium-belgium-drone-drone-flying-18937211.jpeg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/18937211/18937211-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy-dark/70 to-navy-dark/90" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase">
              {t("eyebrow")}
            </span>
            <span className="block w-8 h-[1.5px] bg-gold" />
          </div>

          <h1 className="font-[family-name:var(--font-heading)] font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6">
            {t("headline")}
          </h1>

          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10">
            {t("subheading")}
          </p>

          {/* Pill CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <motion.a
              href={`/${locale}/appointment`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gold text-navy-dark font-bold text-sm rounded-full hover:bg-gold-light transition-colors"
            >
              {t("cta_primary")} →
            </motion.a>
            <motion.a
              href={`/${locale}/je-me-protege`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-white/50 text-white font-semibold text-sm rounded-full hover:border-white transition-colors"
            >
              {t("cta_secondary")}
            </motion.a>
          </div>

          {/* Partner logos */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Image
                src="/images/ag-insurance-logo.svg"
                alt="AG Insurance"
                width={80}
                height={36}
                className="h-7 w-auto brightness-0 invert opacity-80"
              />
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Image
                src="/images/fsma-logo.svg"
                alt="FSMA"
                width={64}
                height={36}
                className="h-7 w-auto opacity-80"
              />
              <span className="text-white/70 text-xs font-medium">Regulated</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
