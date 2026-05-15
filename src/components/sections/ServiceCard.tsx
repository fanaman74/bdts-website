"use client";

import { LucideIcon, Shield } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href?: string;
  colorIndex?: number;
  flatIcon?: LucideIcon;
  detail?: string;
  // Legacy
  icon?: LucideIcon | string;
}

export function ServiceCard({ title, description, href, colorIndex, flatIcon, detail, icon }: ServiceCardProps) {
  // New § numbered card design
  if (colorIndex !== undefined) {
    const num = String(colorIndex + 1).padStart(2, "0");
    const Icon = flatIcon || Shield;
    const inner = (
      <div className="relative bg-white border-2 border-gray-900 rounded-lg p-6 pt-8 hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
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
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{description}</p>

        {/* Dashed divider */}
        <div className="border-t border-dashed border-gray-300 mt-5 mb-3" />

        {/* Footer detail */}
        <p className="text-orange-500 text-xs font-mono font-semibold">
          {detail ? `↘ ${detail}` : <span className="opacity-0">—</span>}
        </p>
      </div>
    );
    if (href) return <a href={href} className="block cursor-pointer h-full">{inner}</a>;
    return inner;
  }

  // Legacy icon-based card
  const IconComp = (icon && typeof icon !== "string") ? icon as LucideIcon : undefined;
  const inner = (
    <div className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-all duration-300">
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
