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
    <section className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-white">
            {t("title")}
          </h2>
          <div className="h-1 w-16 bg-gold mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-8"
            >
              <Quote size={24} className="text-gold mb-4 opacity-60" />
              <p className="text-white/80 leading-relaxed mb-6 italic">&ldquo;{item.quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-gold">{item.name}</p>
                <p className="text-white/40 text-sm">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
