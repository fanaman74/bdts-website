"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function ProcessSteps() {
  const t = useTranslations("process");

  const steps = [
    { num: "01", title: t("step1_title"), body: t("step1_body") },
    { num: "02", title: t("step2_title"), body: t("step2_body") },
    { num: "03", title: t("step3_title"), body: t("step3_body") },
    { num: "04", title: t("step4_title"), body: t("step4_body") },
    { num: "05", title: t("step5_title"), body: t("step5_body") },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-navy">
            {t("title")}
          </h2>
          <p className="text-mid-gray mt-3">{t("subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gold text-navy-dark font-[family-name:var(--font-heading)] font-bold text-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
                {step.num}
              </div>
              <h3 className="font-semibold text-navy mb-2">{step.title}</h3>
              <p className="text-mid-gray text-sm leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
