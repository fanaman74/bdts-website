import { getTranslations, getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { Phone, Calendar } from "lucide-react";

export default async function DemanderUnDevisPage() {
  const t = await getTranslations("quote");
  const locale = await getLocale();

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} bg="navy" breadcrumb="BDTS" />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <QuoteForm />
            </div>

            <div className="space-y-6">
              <div className="bg-off-white rounded-xl p-8">
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-4">
                  {t("or_title")}
                </h3>
                <div className="flex flex-col gap-4 mt-6">
                  <a
                    href={`/${locale}/appointment`}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-navy text-white font-semibold rounded-md hover:bg-navy-light transition-colors"
                  >
                    <Calendar size={18} />
                    {t("or_appointment")}
                  </a>
                  <a
                    href="tel:024631925"
                    className="inline-flex items-center gap-3 px-6 py-3 border-2 border-navy text-navy font-semibold rounded-md hover:bg-navy hover:text-white transition-colors"
                  >
                    <Phone size={18} />
                    02 463 19 25
                  </a>
                </div>
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
