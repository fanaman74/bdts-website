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
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-navy">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          {pillars.map(({ icon: Icon, title, body }, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative bg-white border-2 border-gray-900 rounded-lg p-6 pt-8 flex flex-col"
              >
                <div className="absolute -top-3.5 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                  § {num}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{body}</p>
                <div className="border-t border-dashed border-gray-300 mt-5" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
