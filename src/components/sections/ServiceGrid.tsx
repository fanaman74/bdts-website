"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Service {
  title: string;
  sub: string;
  href: string;
  image: string;
  imageAlt: string;
}

interface ServiceGridProps {
  services: Service[];
  title?: string;
  eyebrow?: string;
}

export function ServiceGrid({ services, title, eyebrow }: ServiceGridProps) {
  return (
    <section className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || title) && (
          <div className="mb-12">
            {eyebrow && (
              <p className="text-mid-gray text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl text-navy tracking-tight">
                {title}
              </h2>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.a
                key={svc.href}
                href={svc.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative rounded-xl overflow-hidden flex flex-col w-full max-w-[360px] mx-auto aspect-[3/4] cursor-pointer hover:shadow-md transition-shadow duration-300"
              >
                {/* Full-bleed image covering entire card */}
                <Image
                  src={svc.image}
                  alt={svc.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 360px"
                />

                {/* Dark gradient overlay — image fades into darkness toward the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/85 via-40% to-transparent to-70%" />

                {/* § badge — top left */}
                <div className="absolute top-4 left-4 z-10 inline-flex bg-amber-400 border-2 border-gray-900 px-2.5 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider rounded-lg">
                  § {num}
                </div>

                {/* Content pinned to the bottom, sitting on the gradient */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 flex flex-col">
                  {/* Title */}
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-white leading-tight mb-2">
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/75 text-sm leading-relaxed mb-4">
                    {svc.sub}
                  </p>

                  {/* White pill CTA */}
                  <div className="w-full bg-white rounded-full py-3.5 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <span className="font-bold text-gray-900 text-base">En savoir plus</span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
