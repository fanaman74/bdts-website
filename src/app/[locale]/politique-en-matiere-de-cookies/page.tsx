import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";

export default async function PolitiqueEnMatiereDeCookiesPage() {
  const t = await getTranslations("legal");

  return (
    <>
      <PageHero title={t("cookies_title")} subtitle={t("cookies_subtitle")} bg="navy" breadcrumb="BDTS" image="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-dark-gray leading-relaxed">

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                1. Qu&apos;est-ce qu&apos;un cookie ?
              </h2>
              <p>
                Un cookie est un petit fichier texte placé sur votre appareil lors de la visite d&apos;un site web. Il permet de mémoriser des informations sur votre visite et d&apos;améliorer votre expérience lors de vos prochains passages.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                2. Cookies essentiels
              </h2>
              <p>
                Ces cookies sont indispensables au fonctionnement du site. Ils permettent notamment de maintenir votre session, de mémoriser vos préférences de langue, et de garantir la sécurité de votre navigation. Ils ne peuvent pas être désactivés.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                3. Cookies fonctionnels
              </h2>
              <p>
                Ces cookies améliorent la fonctionnalité du site en mémorisant vos préférences (langue, région, paramètres d&apos;affichage). Ils ne collectent pas d&apos;informations permettant de vous identifier personnellement.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                4. Cookies analytiques
              </h2>
              <p>
                Ces cookies nous permettent de comprendre comment les visiteurs utilisent notre site (pages visitées, durée des sessions, sources de trafic) afin d&apos;améliorer nos contenus et services. Les données recueillies sont anonymisées.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                5. Cookies de personnalisation
              </h2>
              <p>
                Ces cookies permettent d&apos;adapter le contenu du site à vos intérêts et à votre comportement de navigation, afin de vous proposer des informations pertinentes concernant nos produits d&apos;assurance.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                6. Gérer vos cookies
              </h2>
              <p>
                Vous pouvez à tout moment configurer votre navigateur pour refuser ou supprimer les cookies. La plupart des navigateurs proposent cette option dans leurs paramètres (Outils &gt; Options &gt; Confidentialité). Notez que la désactivation de certains cookies peut affecter le bon fonctionnement du site.
              </p>
              <p className="mt-3">
                Pour plus d&apos;informations sur la gestion des cookies, consultez{" "}
                <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">allaboutcookies.org</a>.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-3">
                7. Contact
              </h2>
              <p>
                Pour toute question relative à notre politique cookies, contactez-nous à{" "}
                <a href="mailto:info@bdts.be" className="text-gold hover:underline">info@bdts.be</a>.
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
