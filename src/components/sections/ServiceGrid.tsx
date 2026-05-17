"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, LucideIcon } from "lucide-react";

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
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-navy mb-12">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          {services.map((svc, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.a
                key={svc.href}
                href={svc.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative group bg-white border-2 border-gray-900 rounded-lg p-6 pt-8 flex flex-col hover:shadow-xl transition-shadow duration-300 h-full"
              >
                {/* § badge */}
                <div className="absolute -top-3.5 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                  § {num}
                </div>

                {/* Icon + title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svc.icon size={20} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{svc.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{svc.sub}</p>

                {/* Dashed divider */}
                <div className="border-t border-dashed border-gray-300 mt-5 mb-3" />

                {/* CTA */}
                <span className="inline-flex items-center gap-1.5 text-orange-500 font-mono text-xs font-bold group-hover:gap-2.5 transition-all">
                  <ArrowUpRight size={14} />
                  En savoir plus
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
