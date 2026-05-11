"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const locales = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "nl", label: "NL" },
];

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/") || "/");
  }

  const navLinks = [
    { label: t("individuals"), href: `/${locale}/particuliers` },
    { label: t("businesses"), href: `/${locale}/entreprises` },
    { label: t("growing"), href: `/${locale}/croissance` },
    { label: t("about"), href: `/${locale}/about` },
    { label: t("contact"), href: `/${locale}/appointment` },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled
        ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
        : "bg-white/90 backdrop-blur-sm"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="BDTS Logo"
              width={48}
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <span className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy hidden sm:block">
              BDTS
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-dark-gray hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: lang switcher + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1 border border-border rounded-md overflow-hidden">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLocale(l.code)}
                  className={cn(
                    "px-2.5 py-1 text-xs font-semibold transition-colors",
                    locale === l.code
                      ? "bg-gold text-navy-dark"
                      : "text-mid-gray hover:text-navy hover:bg-off-white"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <a
              href={`/${locale}/appointment`}
              className="px-5 py-2 bg-gold text-navy-dark font-semibold text-sm rounded-md hover:bg-gold-light transition-colors"
            >
              {t("cta")}
            </a>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLocale(l.code)}
                  className={cn(
                    "px-1.5 py-0.5 text-xs font-semibold rounded transition-colors",
                    locale === l.code ? "bg-gold text-navy-dark" : "text-mid-gray"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-navy hover:text-gold transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-16 bg-white transition-all duration-300 overflow-y-auto",
        mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <nav className="flex flex-col px-6 py-8 gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-navy hover:text-gold py-3 border-b border-border transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`/${locale}/appointment`}
            onClick={() => setMobileOpen(false)}
            className="mt-6 py-4 bg-gold text-navy-dark font-bold text-center rounded-md hover:bg-gold-light transition-colors"
          >
            {t("cta")}
          </a>
          <a
            href="tel:024631925"
            className="flex items-center justify-center gap-2 mt-3 py-3 border border-navy text-navy font-semibold rounded-md"
          >
            <Phone size={16} />
            02 463 19 25
          </a>
        </nav>
      </div>
    </header>
  );
}
