"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function NewsletterStrip() {
  const t = useTranslations("news");
  const tEyebrows = useTranslations("eyebrows");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <section className="bg-navy py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-mid-gray text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
          {tEyebrows("news")}
        </p>
        <h2 className="font-[family-name:var(--font-heading)] font-black tracking-tight text-2xl sm:text-3xl text-white mb-2">
          {t("newsletter_title")}
        </h2>
        <p className="text-white/70 mb-8 text-sm sm:text-base">
          {t("newsletter_subtitle")}
        </p>
        {submitted ? (
          <p className="text-gold font-semibold">{t("newsletter_thanks")}</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter_placeholder")}
              className="flex-1 max-w-sm px-4 py-3 rounded-full text-dark-gray placeholder:text-mid-gray focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gold text-navy font-bold rounded-full hover:bg-gold/90 transition-colors"
            >
              {t("newsletter_cta")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
