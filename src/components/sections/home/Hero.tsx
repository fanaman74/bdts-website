"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
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

      {/* Gold left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-gold via-gold-light to-transparent z-10" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <h1 className="font-[family-name:var(--font-heading)] font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
            {t("headline")}
          </h1>

          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10">
            {t("subheading")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {/* Step 01 — primary CTA */}
            <motion.a
              href={`/${locale}/appointment`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex flex-col justify-between gap-2 px-5 py-4 bg-amber-400 border-2 border-dashed border-gray-900 min-w-[180px] group"
            >
              <span className="font-mono text-[10px] font-bold tracking-widest text-gray-900 uppercase flex items-center gap-1">
                ↘ STEP · 01 · QUOTE
              </span>
              <span className="font-[family-name:var(--font-heading)] font-bold text-base text-gray-900 flex items-center gap-2">
                {t("cta_primary")} →
              </span>
            </motion.a>

            {/* Step 02 — secondary CTA */}
            <motion.a
              href={`/${locale}/process`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex flex-col justify-between gap-2 px-5 py-4 bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/60 min-w-[180px] group hover:border-white transition-colors"
            >
              <span className="font-mono text-[10px] font-bold tracking-widest text-white/70 uppercase flex items-center gap-1">
                ↘ STEP · 02 · PROCESS
              </span>
              <span className="font-[family-name:var(--font-heading)] font-bold text-base text-white flex items-center justify-between">
                {t("cta_secondary")}
                <span className="text-sm">↗</span>
              </span>
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
