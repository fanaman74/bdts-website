import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

const PHASES = [
  { num: "01", bg: "bg-amber-400", text: "text-gray-900", desc: "text-gray-900/70", key: "phase1" },
  { num: "02", bg: "bg-blue-600",  text: "text-white",    desc: "text-white/70",    key: "phase2" },
  { num: "03", bg: "bg-stone-100", text: "text-gray-900", desc: "text-gray-900/60", key: "phase3" },
  { num: "04", bg: "bg-red-500",   text: "text-white",    desc: "text-white/70",    key: "phase4" },
  { num: "05", bg: "bg-teal-600",  text: "text-white",    desc: "text-white/70",    key: "phase5" },
  { num: "06", bg: "bg-gray-900",  text: "text-white",    desc: "text-white/60",    key: "phase6" },
] as const;

const PARTNERS = [
  "AG Insurance", "Allianz", "AlphaCredit", "amma",
  "ARAG", "AXA", "Baloise", "BNP Paribas Fortis",
  "Creafin", "Demetris", "DKV", "db lease",
  "elantis", "Ethias", "Foyer", "Go Lease",
  "krefima", "Lloyd's", "Monument", "MS Amlin",
  "NN", "P&V", "Protect", "Record Credit",
  "Securex", "VDH", "Jean Strottes",
];

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        bg="navy"
        breadcrumb="BDTS"
        image="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />

      {/* Top editorial panels — Notre histoire / Ce que nous faisons / À propos */}
      <section className="bg-gray-950">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* §01 Notre histoire — amber */}
          <div className="relative overflow-hidden bg-amber-400 px-8 sm:px-12 pt-10 pb-12 flex flex-col min-h-72">
            <span className="absolute top-3 right-6 font-black text-9xl leading-none select-none pointer-events-none text-gray-900 opacity-10" aria-hidden="true">01</span>
            <span className="font-mono text-xs font-bold tracking-widest text-gray-900 opacity-60 mb-6">§01</span>
            <h2 className="font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl text-gray-900 mb-4 leading-tight">
              {t("story_title")}
            </h2>
            <p className="text-gray-900/70 text-base leading-relaxed">{t("story_body")}</p>
          </div>

          {/* §02 Ce que nous faisons — navy */}
          <div className="relative overflow-hidden bg-blue-900 px-8 sm:px-12 pt-10 pb-12 flex flex-col min-h-72">
            <span className="absolute top-3 right-6 font-black text-9xl leading-none select-none pointer-events-none text-white opacity-10" aria-hidden="true">02</span>
            <span className="font-mono text-xs font-bold tracking-widest text-white opacity-60 mb-6">§02</span>
            <h2 className="font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl text-white mb-4 leading-tight">
              {t("what_title")}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">{t("what_body")}</p>
          </div>

          {/* §03 À propos — full width stone */}
          <div className="relative overflow-hidden bg-stone-100 px-8 sm:px-12 pt-10 pb-12 flex flex-col md:col-span-2">
            <span className="absolute top-3 right-6 font-black text-9xl leading-none select-none pointer-events-none text-gray-900 opacity-10" aria-hidden="true">03</span>
            <span className="font-mono text-xs font-bold tracking-widest text-gray-900 opacity-60 mb-6">§03</span>
            <h2 className="font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl text-gray-900 mb-4 leading-tight max-w-md">
              {t("apropos_title")}
            </h2>
            <p className="text-gray-900/70 text-base leading-relaxed max-w-3xl">{t("apropos_body")}</p>
          </div>

        </div>
      </section>

      {/* Les phases de la vie */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-white mb-12">
            {t("phases_title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
            {PHASES.map(({ num, bg, text, desc, key }) => (
              <div key={num} className={`${bg} relative overflow-hidden px-8 pt-8 pb-10 flex flex-col min-h-52`}>
                <span className={`absolute top-2 right-4 font-black text-8xl leading-none select-none pointer-events-none ${text} opacity-10`} aria-hidden="true">
                  {num}
                </span>
                <span className={`font-mono text-xs font-bold tracking-widest ${text} opacity-60 mb-6`}>
                  §{num}
                </span>
                <h3 className={`font-[family-name:var(--font-heading)] font-black text-2xl sm:text-3xl leading-tight ${text} mb-3`}>
                  {t(`${key}_title` as Parameters<typeof t>[0])}
                </h3>
                <p className={`${desc} text-sm leading-relaxed`}>
                  {t(`${key}_desc` as Parameters<typeof t>[0])}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos partenaires */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end gap-4 mb-12">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-navy">
              {t("partners_title")}
            </h2>
            <span className="font-mono text-sm text-gray-400 mb-1">{PARTNERS.length} {t("partners_count")}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5">
            {PARTNERS.map((name) => (
              <div
                key={name}
                className="border-2 border-gray-200 flex items-center justify-center px-4 py-6 min-h-20 hover:border-gray-900 transition-colors duration-200"
              >
                <span className="font-bold text-sm text-gray-600 text-center leading-tight">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
