import { getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

const CONTENT = {
  fr: {
    title: "Trouvons ensemble une solution à vos projets",
    subtitle: "Prêts hypothécaires & prêts à tempérament",
    intro:
      "Depuis plusieurs années, nous nous sommes spécialisés en matière de Prêts Hypothécaires et Prêts à Tempérament. En tant que courtier indépendant, nous avons l'avantage de travailler avec plusieurs organismes de crédits.",
    body1:
      "Cela nous permet de vous proposer plusieurs solutions et ainsi de voir avec vous celle qui correspond le mieux à votre situation. Donnez-vous un maximum de chances en prenant contact avec nous.",
    body2:
      "Afin de pouvoir traiter votre demande, le prêteur doit consulter les fichiers de la Centrale des Crédits aux Particuliers de la Banque nationale de Belgique, ses propres fichiers et éventuellement les fichiers d'Atradius, assureur crédit.",
    features: [
      {
        title: "Prêt hypothécaire",
        desc: "Financement de votre bien immobilier avec les meilleures conditions du marché. Nous comparons les offres de plusieurs organismes pour vous.",
      },
      {
        title: "Prêt à tempérament",
        desc: "Solution de financement flexible pour vos projets personnels (voiture, rénovation, frais imprévus). Remboursement en mensualités fixes.",
      },
      {
        title: "Courtier indépendant",
        desc: "Nous ne sommes liés à aucun organisme de crédit. Nous travaillons pour vous et pour vos intérêts, pas pour les banques.",
      },
      {
        title: "Accompagnement personnalisé",
        desc: "De la demande jusqu'à la signature, nous vous accompagnons à chaque étape de votre dossier de crédit.",
      },
    ],
    cta_label: "Demander un devis",
  },
  en: {
    title: "Let us find a solution for your projects together",
    subtitle: "Mortgage loans & instalment loans",
    intro:
      "For several years, we have specialised in mortgage loans and instalment loans. As an independent broker, we have the advantage of working with several credit organisations.",
    body1:
      "This allows us to offer you several solutions and to find the one that best suits your situation. Give yourself the best chance by contacting us.",
    body2:
      "In order to process your application, the lender must consult the files of the Central Individual Credit Register of the National Bank of Belgium, its own files and possibly those of Atradius, the credit insurer.",
    features: [
      {
        title: "Mortgage loan",
        desc: "Finance your property with the best market conditions. We compare offers from several organisations for you.",
      },
      {
        title: "Instalment loan",
        desc: "Flexible financing solution for your personal projects (car, renovation, unexpected expenses). Fixed monthly repayments.",
      },
      {
        title: "Independent broker",
        desc: "We are not tied to any credit organisation. We work for you and your interests, not for the banks.",
      },
      {
        title: "Personalised support",
        desc: "From application to signature, we accompany you at every stage of your credit application.",
      },
    ],
    cta_label: "Request a quote",
  },
  nl: {
    title: "Laten we samen een oplossing vinden voor uw projecten",
    subtitle: "Hypothecaire leningen & afbetalingskredieten",
    intro:
      "Al jarenlang zijn wij gespecialiseerd in hypothecaire leningen en afbetalingskredieten. Als onafhankelijke makelaar hebben wij het voordeel dat wij met meerdere kredietorganisaties samenwerken.",
    body1:
      "Hierdoor kunnen wij u meerdere oplossingen aanbieden en samen met u de oplossing vinden die het best bij uw situatie past. Geef uzelf maximale kansen door contact met ons op te nemen.",
    body2:
      "Om uw aanvraag te kunnen verwerken moet de kredietgever de bestanden raadplegen van de Centrale voor Kredieten aan Particulieren van de Nationale Bank van België, zijn eigen bestanden en eventueel de bestanden van Atradius, kredietverzekeraar.",
    features: [
      {
        title: "Hypothecaire lening",
        desc: "Financiering van uw onroerend goed met de beste marktvoorwaarden. Wij vergelijken aanbiedingen van meerdere organisaties voor u.",
      },
      {
        title: "Afbetalingskrediet",
        desc: "Flexibele financieringsoplossing voor uw persoonlijke projecten (auto, renovatie, onverwachte kosten). Vaste maandelijkse terugbetalingen.",
      },
      {
        title: "Onafhankelijke makelaar",
        desc: "Wij zijn niet gebonden aan een kredietorganisatie. Wij werken voor u en uw belangen, niet voor de banken.",
      },
      {
        title: "Persoonlijke begeleiding",
        desc: "Van de aanvraag tot de ondertekening begeleiden wij u bij elke stap van uw kredietdossier.",
      },
    ],
    cta_label: "Offerte aanvragen",
  },
};

export default async function CreditSolutionsPage() {
  const locale = (await getLocale()) as "fr" | "en" | "nl";
  const c = CONTENT[locale];

  return (
    <>
      <PageHero
        title={c.title}
        subtitle={c.subtitle}
        bg="navy"
        breadcrumb="BDTS"
        image="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />

      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">{c.intro}</p>
          <p className="text-base text-gray-600 leading-relaxed mb-4">{c.body1}</p>
          <p className="text-sm text-gray-500 leading-relaxed mb-12 italic border-l-4 border-amber-400 pl-4">
            {c.body2}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {c.features.map((feature, i) => (
              <div key={i} className="relative pt-4">
                <div className="bg-white border-2 border-gray-900 rounded-lg p-6 pt-7 flex flex-col">
                  <div className="absolute top-0 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                    § {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-3">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{feature.desc}</p>
                  <div className="border-t border-dashed border-gray-300 mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
