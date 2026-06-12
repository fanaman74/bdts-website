import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { DeclarationForm } from "@/components/sections/DeclarationForm";
import { Phone, Mail } from "lucide-react";

export default async function DeclarationPage() {
  const t = await getTranslations("declaration");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} bg="navy" breadcrumb="BDTS" image="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-dark-gray leading-relaxed mb-8">{t("intro")}</p>
              <DeclarationForm />
            </div>

            <div className="space-y-6">
              <div className="bg-off-white rounded-xl p-8">
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-4">
                  {t("contact_title")}
                </h3>
                <p className="text-mid-gray mb-6">{t("contact_body")}</p>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="tel:024631925"
                      className="flex items-center gap-3 text-navy font-semibold hover:text-gold transition-colors"
                    >
                      <Phone size={18} className="text-gold flex-shrink-0" />
                      02 463 19 25
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:info@bdts.be"
                      className="flex items-center gap-3 text-dark-gray hover:text-gold transition-colors"
                    >
                      <Mail size={18} className="text-gold flex-shrink-0" />
                      info@bdts.be
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-gold-pale rounded-xl p-6 border border-gold/20">
                <p className="text-navy font-semibold mb-1">AG Insurance Partner</p>
                <p className="text-mid-gray text-sm">FSMA regulated broker</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
