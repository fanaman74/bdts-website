import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}

export function Card({ className, children, hover = false }: CardProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg border border-border p-6",
      hover && "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
      className
    )}>
      {children}
    </div>
  );
}
