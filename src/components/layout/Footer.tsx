"use client";

import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const serviceLinks = [
    { label: "Habitation / Home / Woning", href: `/${locale}/services/habitation` },
    { label: "Auto", href: `/${locale}/services/auto` },
    { label: "Famille / Family / Gezin", href: `/${locale}/services/famille` },
    { label: "Épargne / Savings / Sparen", href: `/${locale}/services/epargne` },
    { label: "Employés / Employees / Werknemers", href: `/${locale}/services/employes` },
    { label: "Responsabilité / Liability", href: `/${locale}/services/responsabilite` },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/images/logo.png" alt="BDTS" width={44} height={44} className="w-11 h-11 object-contain" />
              <span className="font-[family-name:var(--font-heading)] font-bold text-2xl text-gold">BDTS</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{t("tagline")}</p>
            <p className="text-white/50 text-xs mt-4">AG Insurance Partner</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gold mb-4 text-sm uppercase tracking-wide">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/70 hover:text-gold text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gold mb-4 text-sm uppercase tracking-wide">BDTS</h3>
            <ul className="space-y-2">
              {[
                { label: "About / À propos / Over ons", href: `/${locale}/about` },
                { label: "Process / Processus / Werkwijze", href: `/${locale}/process` },
                { label: "Contact", href: `/${locale}/contact` },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/70 hover:text-gold text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-gold mb-4 text-sm uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <MapPin size={15} className="mt-0.5 text-gold flex-shrink-0" />
                {t("address")}
              </li>
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <Clock size={15} className="mt-0.5 text-gold flex-shrink-0" />
                {t("hours")}
              </li>
              <li>
                <a href="tel:024631925" className="flex items-center gap-2 text-white/70 hover:text-gold text-sm transition-colors">
                  <Phone size={15} className="text-gold" />
                  02 463 19 25
                </a>
              </li>
              <li>
                <a href="mailto:info@bdts.be" className="flex items-center gap-2 text-white/70 hover:text-gold text-sm transition-colors">
                  <Mail size={15} className="text-gold" />
                  info@bdts.be
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} BDTS — BDT Sironval. {t("rights")}.</p>
          <p className="text-white/30 text-xs">Laeken, Brussels | FSMA regulated</p>
        </div>
      </div>
    </footer>
  );
}
