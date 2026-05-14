import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";

export default async function ConditionsGeneralesDutilisationPage() {
  const t = await getTranslations("legal");

  return (
    <>
      <PageHero title={t("terms_title")} subtitle={t("terms_subtitle")} bg="navy" breadcrumb="BDTS" />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-dark-gray leading-relaxed">

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                1. Objet
              </h2>
              <p>
                Les présentes conditions générales d&apos;utilisation régissent l&apos;accès et l&apos;utilisation du site web de BDTS (BDT Sironval sprl), accessible à l&apos;adresse www.bdts.be. En accédant à ce site, vous acceptez sans réserve les présentes conditions.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                2. Éditeur du site
              </h2>
              <p>
                Le site est édité par BDTS — BDT Sironval sprl, courtier d&apos;assurances agréé FSMA, dont le siège social est situé à Laeken, Bruxelles, Belgique. Numéro d&apos;entreprise : 0436.148.994.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                3. Utilisation du site
              </h2>
              <p>
                Le site est mis à disposition à titre informatif. Vous vous engagez à utiliser le site conformément aux lois applicables et à ne pas porter atteinte aux droits de tiers. Il est interdit d&apos;utiliser le site à des fins illicites, frauduleuses ou contraires à l&apos;ordre public.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                4. Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, logos, graphiques) est la propriété exclusive de BDTS ou de ses partenaires et est protégé par le droit belge de la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                5. Limitation de responsabilité
              </h2>
              <p>
                BDTS s&apos;efforce de maintenir les informations du site à jour et exactes. Cependant, BDTS ne peut garantir l&apos;exactitude, l&apos;exhaustivité ou l&apos;actualité des informations publiées. BDTS décline toute responsabilité pour les dommages directs ou indirects résultant de l&apos;utilisation du site.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                6. Liens externes
              </h2>
              <p>
                Le site peut contenir des liens vers des sites tiers. BDTS n&apos;est pas responsable du contenu de ces sites et n&apos;en garantit pas la conformité avec les lois applicables.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                7. Droit applicable
              </h2>
              <p>
                Les présentes conditions sont régies par le droit belge. Tout litige relatif à l&apos;utilisation du site relève de la compétence exclusive des tribunaux de Bruxelles.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                8. Contact
              </h2>
              <p>
                Pour toute question relative aux présentes conditions, contactez-nous à{" "}
                <a href="mailto:info@bdts.be" className="text-gold hover:underline">info@bdts.be</a>{" "}
                ou au 02 463 19 25.
              </p>
            </div>

            <p className="text-mid-gray text-sm pt-4 border-t border-border">
              Dernière mise à jour : mai 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
