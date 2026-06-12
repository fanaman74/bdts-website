"use client";

import { LucideIcon, Shield } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href?: string;
  colorIndex?: number;
  flatIcon?: LucideIcon;
  detail?: string;
  eyebrowLabel?: string;
  image?: string;
  imageAlt?: string;
  icon?: LucideIcon | string;
}

export function ServiceCard({
  title,
  description,
  href,
  colorIndex,
  flatIcon,
  detail,
  eyebrowLabel,
  image,
  imageAlt,
  icon,
}: ServiceCardProps) {
  // Numbered card design (for service categories)
  if (colorIndex !== undefined) {
    const Icon = flatIcon || Shield;
    const inner = (
      <div className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
        <div className="w-11 h-11 bg-navy rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
          <Icon size={20} className="text-gold" strokeWidth={1.5} />
        </div>
        {eyebrowLabel && (
          <p className="text-gold text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
            {eyebrowLabel}
          </p>
        )}
        <h3 className="font-black text-navy-dark text-base leading-tight mb-2">{title}</h3>
        <p className="text-mid-gray text-sm leading-relaxed flex-1">{description}</p>
        {detail && (
          <p className="text-gold text-xs font-semibold mt-4">{detail}</p>
        )}
      </div>
    );
    if (href) return <a href={href} className="block cursor-pointer h-full">{inner}</a>;
    return inner;
  }

  // Image-based card with gradient overlay
  if (image) {
    const inner = (
      <div className="relative rounded-xl overflow-hidden flex flex-col w-full aspect-[4/3] shadow-lg group">
        <img
          src={image}
          alt={imageAlt || title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 via-40% to-transparent to-70%" />
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 flex flex-col">
          {eyebrowLabel && (
            <span className="text-gold text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
              {eyebrowLabel}
            </span>
          )}
          <h3 className="font-[family-name:var(--font-heading)] font-black text-xl text-white leading-tight mb-2">
            {title}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed mb-4">{description}</p>
          <div className="bg-white rounded-full py-2.5 px-5 flex items-center gap-2 w-fit group-hover:bg-gray-100 transition-colors">
            <span className="font-bold text-gray-900 text-sm">En savoir plus →</span>
          </div>
        </div>
      </div>
    );
    if (href) return <a href={href} className="group block w-full cursor-pointer">{inner}</a>;
    return <div className="group w-full">{inner}</div>;
  }

  // Legacy icon-based card
  const IconComp = (icon && typeof icon !== "string") ? icon as LucideIcon : undefined;
  const inner = (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow duration-300">
      {typeof icon === "string" ? (
        <div className="w-11 h-11 bg-navy rounded-xl flex items-center justify-center mb-4">
          <span className="text-gold text-lg">{icon}</span>
        </div>
      ) : IconComp ? (
        <div className="w-11 h-11 bg-navy rounded-xl flex items-center justify-center mb-4">
          <IconComp size={22} className="text-gold" strokeWidth={1.5} />
        </div>
      ) : null}
      {eyebrowLabel && (
        <p className="text-gold text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
          {eyebrowLabel}
        </p>
      )}
      <h3 className="font-black text-navy-dark text-base mb-2">{title}</h3>
      <p className="text-mid-gray text-sm leading-relaxed">{description}</p>
    </div>
  );
  if (href) return <a href={href} className="block cursor-pointer">{inner}</a>;
  return inner;
}
