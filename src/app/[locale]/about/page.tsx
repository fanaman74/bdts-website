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

      {/* Story + What We Do */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-4">{t("story_title")}</h2>
            <p className="text-dark-gray leading-relaxed text-lg">{t("story_body")}</p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-4">{t("what_title")}</h2>
            <p className="text-dark-gray leading-relaxed text-lg">{t("what_body")}</p>
          </div>
        </div>
      </section>

      {/* À propos de nous */}
      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-6">{t("apropos_title")}</h2>
          <p className="text-dark-gray leading-relaxed text-lg">{t("apropos_body")}</p>
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
                {/* Faded background number */}
                <span
                  className={`absolute top-2 right-4 font-black text-8xl leading-none select-none pointer-events-none ${text} opacity-10`}
                  aria-hidden="true"
                >
                  {num}
                </span>

                {/* § badge */}
                <span className={`font-mono text-xs font-bold tracking-widest ${text} opacity-60 mb-6`}>
                  §{num}
                </span>

                {/* Title */}
                <h3 className={`font-[family-name:var(--font-heading)] font-black text-2xl sm:text-3xl leading-tight ${text} mb-3`}>
                  {t(`${key}_title` as Parameters<typeof t>[0])}
                </h3>

                {/* Description */}
                <p className={`${desc} text-sm leading-relaxed`}>
                  {t(`${key}_desc` as Parameters<typeof t>[0])}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
