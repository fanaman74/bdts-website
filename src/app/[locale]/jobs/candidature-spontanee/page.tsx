import { getLocale } from "next-intl/server";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

const ROLES = {
  fr: [
    {
      title: "Représentant service clientèle",
      desc: "En première ligne de notre activité, vous aidez nos clients à gérer leurs polices d'assurance et leur fournissez un service exceptionnel à tout moment.",
    },
    {
      title: "Agent commercial",
      desc: "Vous développez de nouvelles affaires et entretenez les relations avec les clients existants, en stimulant les ventes et la croissance de notre entreprise.",
    },
    {
      title: "Souscripteur",
      desc: "Vous évaluez les risques et prenez des décisions en matière de couverture d'assurance pour les assurés potentiels.",
    },
    {
      title: "Expert en sinistres",
      desc: "Vous enquêtez et traitez les sinistres de manière rapide et efficace, afin que nos assurés obtiennent le soutien dont ils ont besoin.",
    },
  ],
  en: [
    {
      title: "Customer Service Representative",
      desc: "On the front line of our business, you help clients manage their insurance policies and provide exceptional service at all times.",
    },
    {
      title: "Sales Agent",
      desc: "You develop new business and maintain relationships with existing clients, driving sales and company growth.",
    },
    {
      title: "Underwriter",
      desc: "You assess risks and make coverage decisions for prospective policyholders.",
    },
    {
      title: "Claims Expert",
      desc: "You investigate and process claims quickly and efficiently so our policyholders get the support they need.",
    },
  ],
  nl: [
    {
      title: "Klantendienst medewerker",
      desc: "Als eerste aanspreekpunt helpt u klanten bij het beheren van hun verzekeringspolissen en verleent u te allen tijde uitzonderlijke service.",
    },
    {
      title: "Commercieel agent",
      desc: "U ontwikkelt nieuwe zaken en onderhoudt relaties met bestaande klanten, waardoor de verkoop en groei van ons bedrijf worden gestimuleerd.",
    },
    {
      title: "Acceptant",
      desc: "U beoordeelt risico's en neemt beslissingen over verzekeringsdekkingen voor potentiële verzekerden.",
    },
    {
      title: "Schade-expert",
      desc: "U onderzoekt en verwerkt schadegevallen snel en efficiënt, zodat onze verzekerden de steun krijgen die ze nodig hebben.",
    },
  ],
};

const CONTENT = {
  fr: {
    title: "Candidature Spontanée",
    subtitle: "Rejoignez l'équipe BDTS",
    intro:
      "Vous vous enthousiasmez pour les assurances qui protègent les personnes et les bâtiments contre les calamités ? N'hésitez pas à nous envoyer votre CV et votre lettre de motivation. Nous accueillons des candidats de tous horizons et de tous niveaux d'éducation, quelle que soit leur expérience : le plus important pour nous est la passion pour le secteur et la volonté d'évoluer professionnellement.",
    section_title: "Construire une équipe solide",
    section_subtitle: "Opportunités dans notre compagnie d'assurance",
    body: "Dans notre compagnie d'assurance, nous sommes fiers de fournir un service et une assistance exceptionnels à nos clients. Nous savons que notre succès dépend du dévouement et du travail de notre équipe, c'est pourquoi nous sommes toujours à la recherche de personnes talentueuses et motivées pour nous rejoindre.",
    cta_title: "Postulez avec nous maintenant",
    cta_body:
      "Ne manquez pas cette occasion de faire partie d'une compagnie d'assurance en pleine croissance et prospère. Postulez dès maintenant et découvrez les nombreuses possibilités offertes par notre entreprise.",
    cta_label: "Nous contacter",
    back_label: "Retour aux offres",
  },
  en: {
    title: "Spontaneous Application",
    subtitle: "Join the BDTS team",
    intro:
      "Are you passionate about insurance that protects people and buildings against calamities? Feel free to send us your CV and cover letter. We welcome candidates from all backgrounds and all levels of education, regardless of experience — what matters most to us is passion for the sector and the desire to grow professionally.",
    section_title: "Building a strong team",
    section_subtitle: "Opportunities in our insurance company",
    body: "At our insurance company, we are proud to provide exceptional service and support to our clients. We know that our success depends on the dedication and work of our team, which is why we are always looking for talented and motivated people to join us.",
    cta_title: "Apply with us now",
    cta_body:
      "Don't miss this opportunity to be part of a growing and thriving insurance company. Apply now and discover the many possibilities our company has to offer.",
    cta_label: "Contact us",
    back_label: "Back to jobs",
  },
  nl: {
    title: "Spontane Sollicitatie",
    subtitle: "Word lid van het BDTS-team",
    intro:
      "Bent u enthousiast over verzekeringen die mensen en gebouwen beschermen tegen calamiteiten? Stuur ons gerust uw cv en motivatiebrief. Wij verwelkomen kandidaten van alle achtergronden en niveaus, ongeacht ervaring — het belangrijkste voor ons is passie voor de sector en de wil om professioneel te groeien.",
    section_title: "Een sterk team opbouwen",
    section_subtitle: "Kansen in ons verzekeringsbedrijf",
    body: "In ons verzekeringsbedrijf zijn we trots op de uitzonderlijke service en ondersteuning die we onze klanten bieden. We weten dat ons succes afhangt van de inzet en het werk van ons team, daarom zijn we altijd op zoek naar getalenteerde en gemotiveerde mensen.",
    cta_title: "Solliciteer nu bij ons",
    cta_body:
      "Mis deze kans niet om deel uit te maken van een groeiend en bloeiend verzekeringsbedrijf. Solliciteer nu en ontdek de vele mogelijkheden die ons bedrijf te bieden heeft.",
    cta_label: "Contacteer ons",
    back_label: "Terug naar vacatures",
  },
};

export default async function CandidatureSpont() {
  const locale = (await getLocale()) as "fr" | "en" | "nl";
  const c = CONTENT[locale];
  const roles = ROLES[locale];

  return (
    <>
      <PageHero
        title={c.title}
        subtitle={c.subtitle}
        bg="navy"
        breadcrumb="Jobs"
        image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />

      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <p className="text-lg text-gray-700 leading-relaxed mb-12">{c.intro}</p>

          {/* Section: team building */}
          <div className="mb-10">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl sm:text-3xl text-gray-900 mb-1">
              {c.section_title}
            </h2>
            <p className="text-amber-600 font-mono text-sm font-bold tracking-wider mb-4">
              {c.section_subtitle}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">{c.body}</p>
          </div>

          {/* Role cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {roles.map((role, i) => (
              <div key={i} className="relative pt-4">
                <div className="bg-white border-2 border-gray-900 rounded-lg p-6 pt-7 flex flex-col h-full">
                  <div className="absolute top-0 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                    § {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-3">{role.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{role.desc}</p>
                  <div className="border-t border-dashed border-gray-300 mt-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Apply CTA block */}
          <div className="bg-gray-900 rounded-lg p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-white mb-2">
                {c.cta_title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">{c.cta_body}</p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="flex-shrink-0 bg-amber-400 border-2 border-amber-400 text-gray-900 font-bold px-6 py-3 text-sm hover:bg-amber-300 transition-colors"
            >
              {c.cta_label} →
            </Link>
          </div>

          {/* Back link */}
          <div className="mt-10">
            <Link
              href={`/${locale}/jobs`}
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-amber-600 transition-colors font-mono tracking-wider uppercase"
            >
              ← {c.back_label}
            </Link>
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
