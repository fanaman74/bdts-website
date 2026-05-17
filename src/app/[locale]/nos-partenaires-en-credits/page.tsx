import { getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

const CREDIT_PARTNERS = [
  {
    name: "BNP Credit Brokers",
    desc: {
      fr: "Filiale du groupe BNP Paribas, spécialisée dans les solutions de crédit aux particuliers et aux professionnels.",
      en: "Subsidiary of the BNP Paribas group, specialising in credit solutions for individuals and professionals.",
      nl: "Dochteronderneming van de BNP Paribas-groep, gespecialiseerd in kredietoplossingen voor particulieren en bedrijven.",
    },
  },
  {
    name: "Record Crédits",
    desc: {
      fr: "Expert belge en prêts à tempérament et crédits hypothécaires avec plus de 30 ans d'expérience.",
      en: "Belgian expert in instalment loans and mortgage credits with more than 30 years of experience.",
      nl: "Belgische expert in afbetalingskredieten en hypothecaire kredieten met meer dan 30 jaar ervaring.",
    },
  },
  {
    name: "Elantis",
    desc: {
      fr: "Société spécialisée dans le financement immobilier et les crédits hypothécaires en Belgique.",
      en: "Company specialising in property financing and mortgage credits in Belgium.",
      nl: "Gespecialiseerde onderneming in vastgoedfinanciering en hypothecaire kredieten in België.",
    },
  },
  {
    name: "Allianz",
    desc: {
      fr: "Leader mondial de l'assurance proposant également des solutions de financement et de crédits adaptées.",
      en: "Global insurance leader also offering tailored financing and credit solutions.",
      nl: "Wereldleider in verzekeringen die ook op maat gemaakte financierings- en kredietoplossingen aanbiedt.",
    },
  },
  {
    name: "NN",
    desc: {
      fr: "Groupe financier international offrant des produits d'épargne, d'investissement et de financement.",
      en: "International financial group offering savings, investment and financing products.",
      nl: "Internationale financiële groep die spaar-, beleggings- en financieringsproducten aanbiedt.",
    },
  },
];

const CONTENT = {
  fr: {
    title: "Nos Partenaires en Crédits",
    subtitle: "Organismes de crédit avec lesquels nous collaborons",
    intro:
      "Voici quelques-uns des organismes de crédits avec lesquels nous travaillons. Contactez-nous sans engagement si vous avez des questions !",
    cta: "Contactez-nous",
  },
  en: {
    title: "Our Credit Partners",
    subtitle: "Credit organisations we work with",
    intro:
      "Here are some of the credit organisations we work with. Contact us without obligation if you have any questions!",
    cta: "Contact us",
  },
  nl: {
    title: "Onze Kredietpartners",
    subtitle: "Kredietorganisaties waarmee wij samenwerken",
    intro:
      "Hier zijn enkele kredietorganisaties waarmee wij samenwerken. Neem vrijblijvend contact op als u vragen heeft!",
    cta: "Contacteer ons",
  },
};

export default async function CreditPartnersPage() {
  const locale = (await getLocale()) as "fr" | "en" | "nl";
  const c = CONTENT[locale];

  return (
    <>
      <PageHero
        title={c.title}
        subtitle={c.subtitle}
        bg="navy"
        breadcrumb="BDTS"
        image="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />

      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">{c.intro}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CREDIT_PARTNERS.map((partner, i) => (
              <div key={partner.name} className="relative pt-4">
                <div className="bg-white border-2 border-gray-900 rounded-lg p-6 pt-7 flex flex-col">
                  <div className="absolute top-0 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                    § {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">{partner.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {partner.desc[locale]}
                  </p>
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
