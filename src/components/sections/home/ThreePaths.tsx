"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Home, Briefcase, TrendingUp, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function ThreePaths() {
  const t = useTranslations("paths");
  const locale = useLocale();

  const paths = [
    {
      icon: Home,
      label: "FOR YOU",
      num: "01",
      title: t("individuals_title"),
      sub: t("individuals_sub"),
      cta: t("individuals_cta"),
      href: `/${locale}/particuliers`,
      bg: "bg-amber-400",
      footer: "bg-amber-400",
      textColor: "text-gray-900",
      subColor: "text-gray-900/70",
      iconBg: "bg-gray-900/10",
      iconColor: "text-gray-900",
      image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800",
      imageAlt: "Family at home",
    },
    {
      icon: Briefcase,
      label: "FOR BIZ",
      num: "02",
      title: t("businesses_title"),
      sub: t("businesses_sub"),
      cta: t("businesses_cta"),
      href: `/${locale}/entreprises`,
      bg: "bg-blue-600",
      footer: "bg-blue-600",
      textColor: "text-white",
      subColor: "text-white/70",
      iconBg: "bg-white/15",
      iconColor: "text-white",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      imageAlt: "Business team meeting",
    },
    {
      icon: TrendingUp,
      label: "FOR SCALE",
      num: "03",
      title: t("growing_title"),
      sub: t("growing_sub"),
      cta: t("growing_cta"),
      href: `/${locale}/croissance`,
      bg: "bg-stone-100",
      footer: "bg-stone-100",
      textColor: "text-gray-900",
      subColor: "text-gray-900/60",
      iconBg: "bg-gray-900/8",
      iconColor: "text-gray-700",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      imageAlt: "Growing company team",
    },
  ];

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paths.map((path, i) => (
            <motion.a
              key={path.href}
              href={path.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group block overflow-hidden flex flex-col"
            >
              {/* Colored top section */}
              <div className={`${path.bg} px-6 pt-6 pb-0 flex flex-col`}>
                {/* Top row: label + number */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`border-2 ${path.textColor === "text-white" ? "border-white/60 text-white" : "border-gray-900 text-gray-900"} font-mono text-xs font-bold px-2 py-1 tracking-widest`}>
                    {path.label}
                  </span>
                  <span className={`font-mono text-sm ${path.textColor === "text-white" ? "text-white/50" : "text-gray-900/40"} font-bold tracking-wider`}>
                    /§ {path.num}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 ${path.iconBg} rounded-full flex items-center justify-center mb-5`}>
                  <path.icon size={20} className={path.iconColor} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className={`font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl leading-tight ${path.textColor} mb-4`}>
                  {path.title}.
                </h3>

                {/* Description */}
                <p className={`${path.subColor} text-sm leading-relaxed mb-6`}>
                  {path.sub}
                </p>
              </div>

              {/* Photo — fixed height, aligns across all cards */}
              <div className="relative w-full h-52 overflow-hidden flex-shrink-0">
                <Image
                  src={path.image}
                  alt={path.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Footer CTA */}
              <div className={`${path.footer} px-6 py-4 flex items-center justify-between border-t-2 ${path.textColor === "text-white" ? "border-white/20" : "border-gray-900/15"}`}>
                <span className={`font-bold text-sm ${path.textColor}`}>{path.cta}</span>
                <ArrowUpRight
                  size={20}
                  className={`${path.textColor} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`}
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
