"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Home, Briefcase, TrendingUp, ArrowRight } from "lucide-react";
import Image from "next/image";

export function ThreePaths() {
  const t = useTranslations("paths");
  const locale = useLocale();

  const paths = [
    {
      icon: Home,
      title: t("individuals_title"),
      sub: t("individuals_sub"),
      cta: t("individuals_cta"),
      href: `/${locale}/particuliers`,
      featured: false,
      image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600",
      imageAlt: "Family at home",
    },
    {
      icon: Briefcase,
      title: t("businesses_title"),
      sub: t("businesses_sub"),
      cta: t("businesses_cta"),
      href: `/${locale}/entreprises`,
      featured: false,
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
      imageAlt: "Business team meeting",
    },
    {
      icon: TrendingUp,
      title: t("growing_title"),
      sub: t("growing_sub"),
      cta: t("growing_cta"),
      href: `/${locale}/croissance`,
      featured: false,
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
      imageAlt: "Growing company team",
    },
  ];

  return (
    <section className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-navy">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paths.map((path, i) => (
            <motion.a
              key={path.href}
              href={path.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`group block rounded-xl bg-white border overflow-hidden hover:shadow-lg transition-all duration-300 ${path.featured ? "ring-2 ring-gold border-gold/30" : "border-border"}`}
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={path.image}
                  alt={path.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-navy/30" />
                <div className="absolute bottom-3 left-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <path.icon size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                  {path.title}
                </h3>
                <p className="text-mid-gray text-sm leading-relaxed mb-6">
                  {path.sub}
                </p>
                <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all">
                  {path.cta}
                  <ArrowRight size={16} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
