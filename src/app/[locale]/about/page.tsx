import { getTranslations } from "next-intl/server";
import Image from "next/image";
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

const BASE = "https://www.bdts.be/sites/default/files/styles/cl_partner_mobile/public/media/images/library/partners/";
const PARTNERS = [
  { name: "AFI ESCA",              logo: `${BASE}afi_esca.png.webp?itok=Qsaxw6ZG` },
  { name: "AG Insurance",          logo: `${BASE}ag.png.webp?itok=uKBmCH56` },
  { name: "Allianz",               logo: `${BASE}allianz.png.webp?itok=xq-fj6qB` },
  { name: "AlphaCredit",           logo: `${BASE}alpha_credit.png.webp?itok=uQsRRofJ` },
  { name: "AMMA",                  logo: `${BASE}amma_verzekeringen.png.webp?itok=edoWN7IW` },
  { name: "ARAG",                  logo: `${BASE}arag.png.webp?itok=6lRUKLYs` },
  { name: "Atradius",              logo: `${BASE}atradius.png.webp?itok=gwIB5zVY` },
  { name: "AXA",                   logo: `${BASE}axa.png.webp?itok=4j0CrKWr` },
  { name: "Baloise",               logo: `${BASE}baloise.png.webp?itok=DO40qcXZ` },
  { name: "Cardif",                logo: `${BASE}bnp_paribas_cardif.png.webp?itok=Y0mMmsal` },
  { name: "Creafin",               logo: `${BASE}creafin.png.webp?itok=ZKJfSCgm` },
  { name: "DAS",                   logo: `${BASE}das.png.webp?itok=HDiGX8wc` },
  { name: "Dela",                  logo: `${BASE}dela.png.webp?itok=l8lF_7p9` },
  { name: "Demetris",              logo: `${BASE}demetris.png.webp?itok=k7EGADcw` },
  { name: "DKV",                   logo: `${BASE}dkv.png.webp?itok=sTn23Odv` },
  { name: "Eb Lease",              logo: `${BASE}eb_lease.png.webp?itok=b-u_aH5K` },
  { name: "Elantis",               logo: `${BASE}elantis.png.webp?itok=OI7QEsqb` },
  { name: "Europ Assistance",      logo: `${BASE}europ_assistance.png.webp?itok=X1x0vRw_` },
  { name: "Foyer",                 logo: `${BASE}foyer.png.webp?itok=X4TrR3pJ` },
  { name: "Go4Lease",              logo: `${BASE}go4lease.png.webp?itok=2QoizFPj` },
  { name: "Inter Partner",        logo: `${BASE}inter_partner_assistance.png.webp?itok=v2BYMdy9` },
  { name: "Krefima",               logo: `${BASE}krefima.png.webp?itok=S47dwfZm` },
  { name: "Lloyd's",               logo: `${BASE}lloyds.png.webp?itok=HxQ_IkgD` },
  { name: "Monument",              logo: `${BASE}monument_assurance_belgium.png.webp?itok=On-Nad-i` },
  { name: "MS Amlin",              logo: `${BASE}ms_amlin_insurance.png.webp?itok=df8hmnCn` },
  { name: "NN Insurance",          logo: `${BASE}nn_insurance_belgium.png.webp?itok=NQTbnzta` },
  { name: "P&V",                   logo: `${BASE}pv_assurances.png.webp?itok=bUarCN8J` },
  { name: "Protect",               logo: `${BASE}protect.png.webp?itok=m-B64bPP` },
  { name: "Record Credits",        logo: `${BASE}record_credits.png.webp?itok=Xtu8EoE3` },
  { name: "Securex",               logo: `${BASE}securex.png.webp?itok=KaL3Ld5t` },
  { name: "VDH",                   logo: `${BASE}vdh.png.webp?itok=IVL2ZTG2` },
  { name: "Jean Verheyen",         logo: `${BASE}jean_verheyen.png.webp?itok=HilqLN8b` },
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
            {PARTNERS.map(({ name, logo }) => (
              <div
                key={name}
                className="border-2 border-gray-200 flex items-center justify-center px-4 py-6 min-h-24 hover:border-gray-900 transition-colors duration-200 bg-white"
              >
                <Image
                  src={logo}
                  alt={name}
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
