"use client";

import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon?: LucideIcon | string;
  title: string;
  description: string;
  image?: string;
  href?: string;
}

export function ServiceCard({ icon, title, description, image, href }: ServiceCardProps) {
  // Image-based card (new style)
  if (image) {
    const inner = (
      <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-md hover:border-gold/40 transition-all duration-300">
        <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority={false}
          />
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-navy mb-2">{title}</h3>
          <p className="text-mid-gray text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    );
    if (href) {
      return <a href={href} className="block cursor-pointer">{inner}</a>;
    }
    return inner;
  }

  // Icon-based card (legacy style)
  if (typeof icon === "string") {
    const inner = (
      <div className="bg-white rounded-lg border border-border p-6 hover:shadow-md hover:border-gold/40 transition-all duration-300">
        <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center mb-4">
          <span className="text-gold text-xl">{icon}</span>
        </div>
        <h3 className="font-semibold text-navy mb-2">{title}</h3>
        <p className="text-mid-gray text-sm leading-relaxed">{description}</p>
      </div>
    );
    if (href) {
      return <a href={href} className="block cursor-pointer">{inner}</a>;
    }
    return inner;
  }

  // Lucide icon
  if (icon && typeof icon !== "string") {
    const Icon = icon as LucideIcon;
    const inner = (
      <div className="bg-white rounded-lg border border-border p-6 hover:shadow-md hover:border-gold/40 transition-all duration-300">
        <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center mb-4">
          <Icon size={24} className="text-gold" />
        </div>
        <h3 className="font-semibold text-navy mb-2">{title}</h3>
        <p className="text-mid-gray text-sm leading-relaxed">{description}</p>
      </div>
    );
    if (href) {
      return <a href={href} className="block cursor-pointer">{inner}</a>;
    }
    return inner;
  }

  return null;
}
