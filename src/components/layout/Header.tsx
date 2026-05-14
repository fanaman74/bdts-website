"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

  const particulierItems = [
    { label: t("particulier_sub.mobilite"), href: `/${locale}/particuliers/mobilite` },
    { label: t("particulier_sub.habitation"), href: `/${locale}/particuliers/habitation` },
    { label: t("particulier_sub.famille"), href: `/${locale}/particuliers/famille` },
    { label: t("particulier_sub.hospitalisation"), href: `/${locale}/particuliers/hospitalisation` },
    { label: t("particulier_sub.epargner"), href: `/${locale}/particuliers/epargner` },
    { label: t("particulier_sub.pension"), href: `/${locale}/particuliers/pension` },
  ];

  const professionnelItems = [
    { label: t("professionnel_sub.entreprise"), href: `/${locale}/professionnels/entreprise` },
    { label: t("professionnel_sub.personnel"), href: `/${locale}/professionnels/personnel` },
    { label: t("professionnel_sub.revenu"), href: `/${locale}/professionnels/revenu` },
  ];

  const navLinks = [
    { label: t("documents"), href: `/${locale}/documents` },
    { label: t("news"), href: `/${locale}/news` },
    { label: t("jobs"), href: `/${locale}/jobs` },
    { label: t("about"), href: `/${locale}/about` },
  ];

  return (
    <>
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
            {/* Particulier Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenDropdown("particulier")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="text-sm font-medium text-dark-gray hover:text-orange-500 transition-colors flex items-center gap-1.5">
                {t("particulier")}
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border border-border rounded-lg shadow-lg py-2 min-w-48">
                  {particulierItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-4 py-2 text-sm transition-colors hover:bg-off-white hover:text-orange-500",
                        pathname.includes(item.href.split("/").slice(2).join("/"))
                          ? "text-orange-500 font-semibold bg-off-white"
                          : "text-dark-gray"
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Professionnel Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenDropdown("professionnel")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="text-sm font-medium text-dark-gray hover:text-orange-500 transition-colors flex items-center gap-1.5">
                {t("professionnel")}
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border border-border rounded-lg shadow-lg py-2 min-w-48">
                  {professionnelItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-4 py-2 text-sm transition-colors hover:bg-off-white hover:text-orange-500",
                        pathname.includes(item.href.split("/").slice(2).join("/"))
                          ? "text-orange-500 font-semibold bg-off-white"
                          : "text-dark-gray"
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Other links */}
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-dark-gray hover:text-orange-500 transition-colors"
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
                      ? "bg-orange-500 text-white font-bold"
                      : "text-mid-gray hover:text-navy hover:bg-off-white"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <a
              href={`/${locale}/appointment`}
              className="px-5 py-2 bg-orange-500 text-white font-bold text-sm rounded-md hover:bg-orange-600 transition-colors"
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
                    locale === l.code ? "bg-orange-500 text-white font-bold" : "text-mid-gray"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-navy hover:text-orange-500 transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

    </header>

      {/* Mobile menu — outside <header> to avoid backdrop-filter containing-block bug */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-16 sm:top-20 bg-white z-40 transition-all duration-300 overflow-y-auto",
        mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <nav className="flex flex-col px-6 py-8 gap-2">
          {/* Mobile Particulier Dropdown */}
          <div>
            <button
              onClick={() => setOpenDropdown(openDropdown === "mobile-particulier" ? null : "mobile-particulier")}
              className="w-full text-left text-lg font-medium text-navy hover:text-orange-500 py-3 border-b border-border transition-colors flex items-center justify-between"
            >
              {t("particulier")}
              <ChevronDown size={20} className={cn("transition-transform", openDropdown === "mobile-particulier" && "rotate-180")} />
            </button>
            <div className={cn("overflow-hidden transition-all", openDropdown === "mobile-particulier" ? "max-h-96" : "max-h-0")}>
              {particulierItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setMobileOpen(false);
                    setOpenDropdown(null);
                  }}
                  className="block pl-8 pr-6 py-2 text-base text-dark-gray hover:text-orange-500 hover:bg-off-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Professionnel Dropdown */}
          <div>
            <button
              onClick={() => setOpenDropdown(openDropdown === "mobile-professionnel" ? null : "mobile-professionnel")}
              className="w-full text-left text-lg font-medium text-navy hover:text-orange-500 py-3 border-b border-border transition-colors flex items-center justify-between"
            >
              {t("professionnel")}
              <ChevronDown size={20} className={cn("transition-transform", openDropdown === "mobile-professionnel" && "rotate-180")} />
            </button>
            <div className={cn("overflow-hidden transition-all", openDropdown === "mobile-professionnel" ? "max-h-96" : "max-h-0")}>
              {professionnelItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setMobileOpen(false);
                    setOpenDropdown(null);
                  }}
                  className="block pl-8 pr-6 py-2 text-base text-dark-gray hover:text-orange-500 hover:bg-off-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Other mobile links */}
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-navy hover:text-orange-500 py-3 border-b border-border transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`/${locale}/appointment`}
            onClick={() => setMobileOpen(false)}
            className="mt-6 py-4 bg-orange-500 text-white font-bold text-center rounded-md hover:bg-orange-600 transition-colors"
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
    </>
  );
}
