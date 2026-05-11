import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Button({ variant = "primary", size = "md", href, className, children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gold";
  const variants = {
    primary: "bg-gold text-navy-dark hover:bg-gold-light shadow-sm",
    secondary: "bg-navy text-white hover:bg-navy-light shadow-sm",
    outline: "border-2 border-gold text-gold hover:bg-gold hover:text-navy-dark",
    ghost: "text-navy hover:text-gold hover:bg-gold-pale",
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }
  return <button className={classes} {...props}>{children}</button>;
}
