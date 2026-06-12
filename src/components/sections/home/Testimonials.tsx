"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Claude nous a trouvé une couverture que nous ne savions même pas qu'il nous fallait. Quand nous avons eu un sinistre, il était au téléphone en quelques heures.",
    name: "Marie L.",
    role: "Bruxelles",
  },
  {
    quote: "As a freelance consultant, I needed professional liability fast. BDTS understood my business immediately and had me covered within a week.",
    name: "James T.",
    role: "IT Consultant, Brussels",
  },
  {
    quote: "Onze kmo heeft 5 naar 18 mensen gegroeid. BDTS heeft onze verzekeringen op elk moment mee laten groeien. Altijd bereikbaar, altijd helder.",
    name: "Stefan V.",
    role: "KMO Eigenaar, Laken",
  },
];

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-20 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-gold/80 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
              {t("eyebrow")}
            </p>
            <h2 className="font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl text-white tracking-tight">
              {t("title")}
            </h2>
          </div>
          <a href="#" className="text-gold text-sm font-bold hidden sm:block hover:underline">
            {t("see_all")}
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-off-white rounded-xl p-7"
            >
              <Quote size={22} className="text-gold mb-4 opacity-70" />
              <p className="text-navy-dark leading-relaxed mb-6 italic text-sm">&ldquo;{item.quote}&rdquo;</p>
              <div>
                <p className="font-bold text-navy text-sm">{item.name}</p>
                <p className="text-mid-gray text-xs mt-0.5">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
