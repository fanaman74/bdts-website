"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, MapPin, User, Network, Shield } from "lucide-react";
import Image from "next/image";

const VALUES = [
  { icon: User, labelKey: "value1" as const },
  { icon: MapPin, labelKey: "value2" as const },
  { icon: Shield, labelKey: "value3" as const },
  { icon: Network, labelKey: "value4" as const },
];

export function Hero() {
  const t = useTranslations("hero");
  const tAbout = useTranslations("about");
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

        {/* Values cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {VALUES.map(({ icon: Icon, labelKey }, i) => (
            <motion.div
              key={labelKey}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-5 hover:bg-white/15 transition-colors"
            >
              <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center mb-3">
                <Icon size={20} className="text-gold" />
              </div>
              <p className="text-white font-semibold text-sm leading-snug">
                {tAbout(labelKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
