import { getTranslations, getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { ShieldCheck, MessageSquare, ExternalLink } from "lucide-react";

export default async function ProtectionDuClientPage() {
  const t = await getTranslations("protection_client");
  const locale = await getLocale();

  const legalLinks = [
    { label: t("link_privacy"), href: `/${locale}/politique-de-confidentialite` },
    { label: t("link_cookies"), href: `/${locale}/politique-en-matiere-de-cookies` },
    { label: t("link_terms"), href: `/${locale}/conditions-generales-dutilisation` },
    { label: t("link_sustainability"), href: `/${locale}/politique-en-matiere-de-durabilite` },
  ];

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} bg="navy" breadcrumb="BDTS" image="https://images.pexels.com/photos/5668770/pexels-photo-5668770.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {/* FSMA */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                <ShieldCheck size={20} className="text-gold" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                  {t("fsma_title")}
                </h2>
                <p className="text-dark-gray leading-relaxed">{t("fsma_body")}</p>
                <a
                  href="https://www.fsma.be"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-gold text-sm font-semibold hover:underline"
                >
                  fsma.be <ExternalLink size={13} />
                </a>
              </div>
            </div>

            <hr className="border-border" />

            {/* Complaints */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                <MessageSquare size={20} className="text-gold" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                  {t("complaints_title")}
                </h2>
                <p className="text-dark-gray leading-relaxed">{t("complaints_body")}</p>

                <div className="mt-6 bg-off-white rounded-xl p-6">
                  <h3 className="font-semibold text-navy mb-4">{t("ombudsman_title")}</h3>
                  <ul className="space-y-2 text-dark-gray text-sm">
                    <li>{t("ombudsman_address")}</li>
                    <li>
                      <a href={`tel:${t("ombudsman_phone").replace(/\s/g, "")}`} className="hover:text-gold transition-colors">
                        {t("ombudsman_phone")}
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${t("ombudsman_email")}`} className="hover:text-gold transition-colors">
                        {t("ombudsman_email")}
                      </a>
                    </li>
                  </ul>
                  <a
                    href="https://www.ombudsman.as"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-gold text-sm font-semibold hover:underline"
                  >
                    ombudsman.as <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>

            <hr className="border-border" />

            {/* Legal links */}
            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-4">
                {t("links_title")}
              </h2>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-gold hover:underline font-medium">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
