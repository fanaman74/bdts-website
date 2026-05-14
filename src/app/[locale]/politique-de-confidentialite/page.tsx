import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";

export default async function PolitiqueDeConfidentialitePage() {
  const t = await getTranslations("legal");

  return (
    <>
      <PageHero title={t("privacy_title")} subtitle={t("privacy_subtitle")} bg="navy" breadcrumb="BDTS" />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-dark-gray leading-relaxed">

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                1. Responsable du traitement
              </h2>
              <p>
                BDTS — BDT Sironval sprl, dont le siège social est à Laeken, Bruxelles, Belgique (numéro d&apos;entreprise 0436.148.994), est responsable du traitement de vos données personnelles collectées via ce site. Contact : <a href="mailto:info@bdts.be" className="text-gold hover:underline">info@bdts.be</a>.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                2. Données collectées
              </h2>
              <p>
                Nous collectons les données que vous nous fournissez via nos formulaires de contact, de déclaration de sinistre ou de demande de devis : nom, prénom, adresse e-mail, numéro de téléphone, et toute information que vous communiquez volontairement dans vos messages.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                3. Finalités du traitement
              </h2>
              <p>
                Vos données sont traitées exclusivement pour : répondre à vos demandes de contact ou de devis, traiter vos déclarations de sinistre, gérer la relation contractuelle avec vous en tant que client BDTS, et respecter nos obligations légales et réglementaires.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                4. Base légale
              </h2>
              <p>
                Le traitement est fondé sur votre consentement (formulaires de contact), l&apos;exécution d&apos;un contrat (gestion des polices), une obligation légale (obligations FSMA et réglementaires) ou l&apos;intérêt légitime de BDTS (amélioration de nos services).
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                5. Conservation des données
              </h2>
              <p>
                Vos données sont conservées le temps nécessaire aux finalités pour lesquelles elles ont été collectées, et au minimum conformément aux délais légaux applicables au secteur de l&apos;assurance (en règle générale 10 ans après la fin de la relation contractuelle).
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                6. Vos droits (RGPD)
              </h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation du traitement, de portabilité et d&apos;opposition. Pour exercer ces droits, contactez-nous à <a href="mailto:info@bdts.be" className="text-gold hover:underline">info@bdts.be</a>.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                7. Autorité de contrôle
              </h2>
              <p>
                Vous avez le droit d&apos;introduire une réclamation auprès de l&apos;Autorité de protection des données belge :{" "}
                <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  autoriteprotectiondonnees.be
                </a>
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
