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
    <section className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-mid-gray text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl text-navy tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-border rounded-2xl p-6 flex flex-col hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-11 h-11 bg-navy rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
                <Icon size={22} className="text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-navy text-base leading-snug mb-2">{title}</h3>
              <p className="text-mid-gray text-sm leading-relaxed flex-1">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
