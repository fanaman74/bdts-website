"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TrendingUp, Users, Shield, Search, Headphones, Network } from "lucide-react";

interface Offering {
  icon: React.ComponentType<{ size: number; className: string; strokeWidth: number }>;
  title: string;
  body: string;
}

const offerings: Offering[] = [
  { icon: Users, title: "Employee & Executive Coverage", body: "Talent protection that scales with headcount" },
  { icon: Shield, title: "Expanded Liability Solutions", body: "New market and multi-jurisdiction risk management" },
  { icon: Search, title: "Risk Assessment & Strategy", body: "Proactive approach to emerging risks" },
  { icon: Headphones, title: "Claims Support & Advocacy", body: "Protected when it matters most" },
  { icon: Network, title: "Multi-Insurer Strategy", body: "Best solutions, not locked into one carrier" },
  { icon: TrendingUp, title: "Growth-Aware Coverage", body: "Insurance that evolves as your business does" },
];

export function GrowingOfferings() {
  const tEyebrows = useTranslations("eyebrows");

  return (
    <section className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-mid-gray text-[10px] font-bold tracking-[0.2em] uppercase mb-3">{tEyebrows("growing")}</p>
          <h2 className="font-[family-name:var(--font-heading)] font-black tracking-tight text-3xl text-navy">What We Offer Growing Companies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map(({ icon: Icon, title, body }, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative group bg-white border border-gray-200 rounded-2xl p-6 flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {/* § badge */}
                <div className="absolute -top-3 left-5 bg-amber-400 border-2 border-gray-900 px-2.5 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                  § {num}
                </div>

                {/* Icon + title */}
                <div className="flex items-start gap-3 mb-4 pt-2">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-navy text-base leading-snug pt-0.5">{title}</h3>
                </div>

                {/* Description */}
                <p className="text-mid-gray text-sm leading-relaxed flex-1">{body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
