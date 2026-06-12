export interface Article {
  slug: string;
  category: string;
  date: string;
  title: { fr: string; en: string; nl: string };
  excerpt: { fr: string; en: string; nl: string };
  image: string;
}

export const articles: Article[] = [
  {
    slug: "fsma-reglement-courtiers-2024",
    category: "Réglementation",
    date: "2024-11-15",
    title: {
      fr: "Nouveau règlement FSMA : ce que cela change pour les courtiers",
      en: "New FSMA Regulation: What Changes for Brokers",
      nl: "Nieuwe FSMA-regelgeving: wat verandert er voor makelaars",
    },
    excerpt: {
      fr: "La FSMA a publié de nouvelles directives encadrant l'activité des courtiers en assurance en Belgique. Voici les points clés à retenir pour votre couverture.",
      en: "The FSMA has issued new guidelines governing insurance broker activity in Belgium. Here are the key points to keep in mind for your coverage.",
      nl: "De FSMA heeft nieuwe richtlijnen gepubliceerd voor de activiteit van verzekeringsmakelaars in België. Dit zijn de belangrijkste punten voor uw dekking.",
    },
    image:
      "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "assurance-inondations-belgique",
    category: "Sinistres",
    date: "2024-10-22",
    title: {
      fr: "Assurance inondations : les leçons des crues de 2021 et 2024",
      en: "Flood Insurance: Lessons from the 2021 and 2024 Floods",
      nl: "Overstromingsverzekering: lessen uit de overstromingen van 2021 en 2024",
    },
    excerpt: {
      fr: "Après les inondations dévastatrices en Wallonie, les assureurs belges ont revu leurs offres de couverture catastrophe naturelle. Que prévoit votre contrat ?",
      en: "Following the devastating floods in Wallonia, Belgian insurers have revised their natural disaster coverage offerings. What does your policy cover?",
      nl: "Na de verwoestende overstromingen in Wallonië hebben Belgische verzekeraars hun aanbod voor natuurrampendekking herzien. Wat dekt uw contract?",
    },
    image:
      "https://images.pexels.com/photos/1756086/pexels-photo-1756086.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "ag-insurance-partenariat-2024",
    category: "Partenariat",
    date: "2024-09-30",
    title: {
      fr: "AG Insurance renforce son offre PME en Belgique",
      en: "AG Insurance Strengthens Its SME Offer in Belgium",
      nl: "AG Insurance versterkt haar KMO-aanbod in België",
    },
    excerpt: {
      fr: "Notre partenaire AG Insurance lance de nouveaux produits dédiés aux PME belges, incluant une protection juridique élargie et une couverture cyber renforcée.",
      en: "Our partner AG Insurance launches new products dedicated to Belgian SMEs, including expanded legal protection and enhanced cyber coverage.",
      nl: "Onze partner AG Insurance lanceert nieuwe producten voor Belgische KMO's, waaronder uitgebreide rechtsbijstand en verbeterde cyberdekking.",
    },
    image:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "risque-cyber-entreprises-belges",
    category: "Cyber",
    date: "2024-09-05",
    title: {
      fr: "Risque cyber : pourquoi les PME belges sont de plus en plus exposées",
      en: "Cyber Risk: Why Belgian SMEs Are Increasingly Exposed",
      nl: "Cyberrisico: waarom Belgische KMO's steeds kwetsbaarder worden",
    },
    excerpt: {
      fr: "Les cyberattaques contre les PME ont augmenté de 45 % en Belgique cette année. Découvrez comment une assurance cyber adaptée peut protéger votre activité.",
      en: "Cyberattacks against SMEs have increased by 45% in Belgium this year. Find out how tailored cyber insurance can protect your business.",
      nl: "Cyberaanvallen op KMO's zijn dit jaar met 45% gestegen in België. Ontdek hoe een aangepaste cyberverzekering uw bedrijf kan beschermen.",
    },
    image:
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "reforme-pension-libre-complementaire",
    category: "Pension",
    date: "2024-08-18",
    title: {
      fr: "Réforme des pensions : impact sur la pension libre complémentaire",
      en: "Pension Reform: Impact on the Individual Complementary Pension",
      nl: "Pensioenhervorming: impact op het vrij aanvullend pensioen",
    },
    excerpt: {
      fr: "La réforme des pensions adoptée en juin modifie les plafonds de la PLCI et du CPTI. Voici ce que cela signifie concrètement pour votre épargne-retraite.",
      en: "The pension reform adopted in June modifies the PLCI and CPTI ceilings. Here is what this means in practice for your retirement savings.",
      nl: "De in juni aangenomen pensioenhervorming wijzigt de plafonds van de VAPZ en CPTI. Dit is wat het concreet betekent voor uw pensioensparen.",
    },
    image:
      "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "mobilite-verte-assurance-electrique",
    category: "Mobilité",
    date: "2024-07-10",
    title: {
      fr: "Mobilité verte : comment assurer votre véhicule électrique en Belgique",
      en: "Green Mobility: How to Insure Your Electric Vehicle in Belgium",
      nl: "Groene mobiliteit: hoe verzekert u uw elektrisch voertuig in België",
    },
    excerpt: {
      fr: "Avec l'essor des voitures électriques en Belgique, les offres d'assurance se multiplient. Recharge à domicile, batterie, assistance : on fait le point.",
      en: "With the rise of electric cars in Belgium, insurance offers are multiplying. Home charging, battery, assistance: we take stock.",
      nl: "Met de opmars van elektrische wagens in België nemen de verzekeringsaanbiedingen toe. Thuisladen, batterij, bijstand: we maken de balans op.",
    },
    image:
      "https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "indice-abex-2024-valeur-reconstruction",
    category: "Immobilier",
    date: "2024-06-01",
    title: {
      fr: "Indice ABEX 2024 : revoyez la valeur de reconstruction de votre bien",
      en: "ABEX Index 2024: Review Your Property's Reconstruction Value",
      nl: "ABEX-index 2024: herzien de herbouwwaarde van uw woning",
    },
    excerpt: {
      fr: "L'indice ABEX a été revu à la hausse pour 2024. Si votre assurance habitation n'est pas mise à jour, vous risquez d'être sous-assuré en cas de sinistre.",
      en: "The ABEX index has been revised upward for 2024. If your home insurance is not updated, you risk being underinsured in the event of a claim.",
      nl: "De ABEX-index is voor 2024 opwaarts herzien. Als uw woningverzekering niet wordt bijgewerkt, loopt u het risico onvoldoende verzekerd te zijn bij schade.",
    },
    image:
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "assurance-revenu-garanti-independants",
    category: "Indépendants",
    date: "2024-05-14",
    title: {
      fr: "Revenu garanti : une protection indispensable pour les indépendants",
      en: "Guaranteed Income: Essential Protection for the Self-Employed",
      nl: "Gewaarborgd inkomen: onmisbare bescherming voor zelfstandigen",
    },
    excerpt: {
      fr: "En cas d'incapacité de travail, les indépendants belges ne bénéficient que d'une protection limitée. L'assurance revenu garanti comble cet écart crucial.",
      en: "In the event of incapacity for work, Belgian self-employed workers only benefit from limited protection. Guaranteed income insurance fills this crucial gap.",
      nl: "Bij arbeidsongeschiktheid genieten Belgische zelfstandigen slechts beperkte bescherming. De verzekering gewaarborgd inkomen vult dit cruciale hiaat op.",
    },
    image:
      "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "protection-juridique-locataires-proprietaires",
    category: "Juridique",
    date: "2024-04-03",
    title: {
      fr: "Protection juridique : locataires et propriétaires, êtes-vous couverts ?",
      en: "Legal Protection: Tenants and Owners, Are You Covered?",
      nl: "Rechtsbijstand: huurders en eigenaars, bent u gedekt?",
    },
    excerpt: {
      fr: "Les litiges liés au logement sont en hausse en Belgique. La protection juridique vous permet d'accéder à la justice sans craindre les frais d'avocat.",
      en: "Housing disputes are on the rise in Belgium. Legal protection allows you to access justice without worrying about lawyers' fees.",
      nl: "Woonconflicten nemen toe in België. Rechtsbijstand stelt u in staat de rechter te raadplegen zonder angst voor advocaatkosten.",
    },
    image:
      "https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];
