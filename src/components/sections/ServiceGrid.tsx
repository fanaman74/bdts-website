"use client";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  sub: string;
  href: string;
}

interface ServiceGridProps {
  services: Service[];
  title?: string;
}

export function ServiceGrid({ services, title }: ServiceGridProps) {
  return (
    <section className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-navy text-center mb-12">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.a
              key={svc.href}
              href={svc.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-xl border border-border p-7 hover:shadow-md hover:border-gold/40 transition-all duration-300"
            >
              <div className="w-11 h-11 bg-gold/10 rounded-lg flex items-center justify-center mb-5">
                <svc.icon size={22} className="text-gold" />
              </div>
              <h3 className="font-semibold text-navy mb-2">{svc.title}</h3>
              <p className="text-mid-gray text-sm leading-relaxed mb-4">{svc.sub}</p>
              <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold group-hover:gap-3 transition-all">
                En savoir plus / Learn more / Meer info <ArrowRight size={14} />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
