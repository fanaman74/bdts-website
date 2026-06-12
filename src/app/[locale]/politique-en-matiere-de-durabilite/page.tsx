import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { Leaf, BarChart2, Handshake, Building } from "lucide-react";

export default async function PolitiqueEnMatiereDeDurabilitePage() {
  const t = await getTranslations("legal");

  return (
    <>
      <PageHero title={t("sustainability_title")} subtitle={t("sustainability_subtitle")} bg="navy" breadcrumb="BDTS" image="https://images.pexels.com/photos/1125776/pexels-photo-1125776.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                <Leaf size={20} className="text-gold" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                  Notre engagement
                </h2>
                <p className="text-dark-gray leading-relaxed">
                  BDTS s&apos;engage à intégrer les considérations de durabilité dans ses activités de courtage d&apos;assurances. Nous croyons que la protection de nos clients va de pair avec la responsabilité envers notre environnement et notre société.
                </p>
              </div>
            </div>

            <hr className="border-border" />

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                <Handshake size={20} className="text-gold" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                  Produits durables AG Insurance
                </h2>
                <p className="text-dark-gray leading-relaxed">
                  En tant que partenaire AG Insurance, nous proposons des produits d&apos;assurance qui intègrent des critères de durabilité. AG Insurance est signataire des Principes pour une Assurance Responsable (PSI) des Nations Unies et publie un rapport de durabilité annuel.
                </p>
                <ul className="mt-4 space-y-2 text-dark-gray text-sm list-disc list-inside">
                  <li>Couvertures véhicules électriques et hybrides</li>
                  <li>Assurance panneaux photovoltaïques intégrée</li>
                  <li>Tarification tenant compte des comportements de conduite responsable</li>
                  <li>Investissements ESG dans les produits d&apos;épargne-pension</li>
                </ul>
              </div>
            </div>

            <hr className="border-border" />

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                <BarChart2 size={20} className="text-gold" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                  Critères ESG
                </h2>
                <p className="text-dark-gray leading-relaxed">
                  Lors de nos recommandations de produits d&apos;investissement et d&apos;épargne, nous tenons compte des critères Environnementaux, Sociaux et de Gouvernance (ESG). Nous informons nos clients des risques et opportunités liés à la durabilité conformément à la réglementation SFDR.
                </p>
              </div>
            </div>

            <hr className="border-border" />

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                <Building size={20} className="text-gold" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                  Notre pratique interne
                </h2>
                <p className="text-dark-gray leading-relaxed">
                  Au niveau opérationnel, BDTS s&apos;efforce de réduire son empreinte environnementale : dématérialisation des documents, réunions à distance lorsque possible, et sensibilisation de l&apos;équipe aux enjeux du développement durable.
                </p>
              </div>
            </div>

            <p className="text-mid-gray text-sm pt-4 border-t border-border">
              Dernière mise à jour : mai 2026
            </p>
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
