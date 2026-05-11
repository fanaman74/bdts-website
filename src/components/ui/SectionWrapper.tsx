import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  className?: string;
  children: ReactNode;
  id?: string;
  bg?: "white" | "off-white" | "navy" | "gold-pale";
}

export function SectionWrapper({ className, children, id, bg = "white" }: SectionWrapperProps) {
  const bgs = {
    white: "bg-white",
    "off-white": "bg-off-white",
    navy: "bg-navy text-white",
    "gold-pale": "bg-gold-pale",
  };
  return (
    <section id={id} className={cn("py-16 sm:py-24", bgs[bg], className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
