"use client";

import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-6 hover:shadow-md hover:border-gold/40 transition-all duration-300">
      <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center mb-4">
        <Icon size={24} className="text-gold" />
      </div>
      <h3 className="font-semibold text-navy mb-2">{title}</h3>
      <p className="text-mid-gray text-sm leading-relaxed">{description}</p>
    </div>
  );
}
