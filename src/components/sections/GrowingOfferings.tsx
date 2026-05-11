"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Shield, Search, Headphones, Network } from "lucide-react";

interface Offering {
  icon: React.ComponentType<{ size: number; className: string }>;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl border border-border p-7 hover:shadow-md hover:border-gold/40 transition-all duration-300"
            >
              <div className="w-11 h-11 bg-navy rounded-lg flex items-center justify-center mb-5">
                <Icon size={20} className="text-gold" />
              </div>
              <h3 className="font-semibold text-navy mb-2">{title}</h3>
              <p className="text-mid-gray text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
