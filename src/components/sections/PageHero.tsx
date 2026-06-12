"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  bg?: "navy" | "gold-pale" | "off-white";
  breadcrumb?: string;
  image?: string;
}

export function PageHero({ title, subtitle, bg = "navy", breadcrumb, image }: PageHeroProps) {
  const bgs = {
    navy: "bg-gradient-to-br from-navy-dark to-navy",
    "gold-pale": "bg-gold-pale",
    "off-white": "bg-off-white",
  };
  const textColor = bg === "navy" ? "text-white" : "text-navy";
  const subColor = bg === "navy" ? "text-white/70" : "text-mid-gray";

  return (
    <section className={cn("py-20 relative overflow-hidden", image ? "bg-navy" : bgs[bg])}>
      {image && (
        <>
          <Image src={image} alt={title} fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-navy/65" />
        </>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {breadcrumb && (
          <p className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-3">
            {breadcrumb}
            <span className="block w-6 h-[1.5px] bg-gold" />
          </p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn(
            "font-[family-name:var(--font-heading)] font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight",
            textColor
          )}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn("mt-4 text-lg sm:text-xl max-w-2xl leading-relaxed", subColor)}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
