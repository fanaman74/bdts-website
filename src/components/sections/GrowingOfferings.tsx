"use client";

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
  return (
    <section className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          {offerings.map(({ icon: Icon, title, body }, i) => {
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
                {/* § badge */}
                <div className="absolute -top-3.5 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                  § {num}
                </div>

                {/* Icon + title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{body}</p>

                {/* Dashed divider */}
                <div className="border-t border-dashed border-gray-300 mt-5" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
