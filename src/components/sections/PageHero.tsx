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
      {bg === "navy" && !image && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold to-transparent" />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {breadcrumb && (
          <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
            {breadcrumb}
          </p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn("font-[family-name:var(--font-heading)] font-bold text-4xl sm:text-5xl lg:text-6xl", textColor)}
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
