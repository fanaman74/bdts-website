"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin, User, Network } from "lucide-react";

export function WhyBDTS() {
  const t = useTranslations("why");

  const pillars = [
    { icon: MapPin, title: t("local_title"), body: t("local_body") },
    { icon: User, title: t("personal_title"), body: t("personal_body") },
    { icon: Network, title: t("market_title"), body: t("market_body") },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">BDTS</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-navy">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <p.icon size={28} className="text-gold" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                {p.title}
              </h3>
              <p className="text-mid-gray leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
