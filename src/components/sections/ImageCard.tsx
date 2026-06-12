"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface Badge {
  label: string;
  icon?: ReactNode;
}

interface ImageCardProps {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  image: string;
  imageAlt: string;
  eyebrowLabel?: string;
  badges?: Badge[];
  className?: string;
}

export function ImageCard({
  title,
  description,
  ctaLabel,
  href,
  image,
  imageAlt,
  eyebrowLabel,
  className = "",
}: ImageCardProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative rounded-xl overflow-hidden flex flex-col w-full cursor-pointer shadow-lg aspect-[4/3] ${className}`}
    >
      {/* Full-bleed image */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, 500px"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 via-40% to-transparent to-70%" />

      {/* Content pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 flex flex-col">
        {eyebrowLabel && (
          <span className="text-gold text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
            {eyebrowLabel}
          </span>
        )}
        <h3 className="font-[family-name:var(--font-heading)] font-black text-xl text-white leading-tight mb-2">
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div className="bg-white rounded-full py-2.5 px-5 flex items-center gap-2 w-fit group-hover:bg-gray-100 transition-colors">
          <span className="font-bold text-gray-900 text-sm">{ctaLabel}</span>
          <ArrowRight
            size={15}
            className="text-gray-900 transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </motion.a>
  );
}
