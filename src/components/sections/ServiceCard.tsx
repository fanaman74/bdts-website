"use client";

import { LucideIcon, Shield } from "lucide-react";

// Flat color palette — unique per page
export const CARD_PALETTE = [
  { bg: "bg-blue-500",    title: "text-blue-600" },
  { bg: "bg-orange-500",  title: "text-orange-500" },
  { bg: "bg-lime-500",    title: "text-lime-600" },
  { bg: "bg-amber-400",   title: "text-amber-500" },
  { bg: "bg-violet-500",  title: "text-violet-600" },
  { bg: "bg-teal-500",    title: "text-teal-600" },
  { bg: "bg-rose-500",    title: "text-rose-500" },
  { bg: "bg-sky-500",     title: "text-sky-500" },
  { bg: "bg-emerald-500", title: "text-emerald-600" },
  { bg: "bg-fuchsia-500", title: "text-fuchsia-600" },
];

interface ServiceCardProps {
  title: string;
  description: string;
  href?: string;
  // Flat color style (preferred)
  colorIndex?: number;
  flatIcon?: LucideIcon;
  // Legacy / fallback
  icon?: LucideIcon | string;
}

export function ServiceCard({ title, description, href, colorIndex, flatIcon, icon }: ServiceCardProps) {
  // Flat color + outline icon style
  if (colorIndex !== undefined) {
    const { bg, title: titleColor } = CARD_PALETTE[colorIndex % CARD_PALETTE.length];
    const Icon = flatIcon || Shield;
    const inner = (
      <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-md transition-all duration-300 group">
        <div className={`w-full h-40 ${bg} flex items-center justify-center`}>
          <Icon size={52} className="text-white" strokeWidth={1.5} />
        </div>
        <div className="p-6">
          <h3 className={`font-semibold mb-2 ${titleColor}`}>{title}</h3>
          <p className="text-mid-gray text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    );
    if (href) return <a href={href} className="block cursor-pointer">{inner}</a>;
    return inner;
  }

  // Legacy icon-based card
  const IconComp = (icon && typeof icon !== "string") ? icon as LucideIcon : undefined;
  const inner = (
    <div className="bg-white rounded-lg border border-border p-6 hover:shadow-md hover:border-gold/40 transition-all duration-300">
      {typeof icon === "string" ? (
        <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center mb-4">
          <span className="text-gold text-xl">{icon}</span>
        </div>
      ) : IconComp ? (
        <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center mb-4">
          <IconComp size={24} className="text-gold" />
        </div>
      ) : null}
      <h3 className="font-semibold text-navy mb-2">{title}</h3>
      <p className="text-mid-gray text-sm leading-relaxed">{description}</p>
    </div>
  );
  if (href) return <a href={href} className="block cursor-pointer">{inner}</a>;
  return inner;
}
