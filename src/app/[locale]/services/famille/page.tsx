import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

const PANELS = [
  { bg: "bg-amber-400", text: "text-gray-900", desc: "text-gray-900/70" },
  { bg: "bg-blue-900", text: "text-white", desc: "text-white/70" },
  { bg: "bg-stone-100", text: "text-gray-900", desc: "text-gray-900/60" },
  { bg: "bg-red-500", text: "text-white", desc: "text-white/70" },
];

export default async function FamillePage() {
  const t = await getTranslations("services");
  const items = [
    { title: "Legal protection", desc: "Defense in disputes with third parties" },
    { title: "Life insurance", desc: "Financial protection for your family" },
    { title: "Accident coverage", desc: "Injury and disability protection" },
    { title: "Family liability", desc: "Accidents caused by family members" },
  ];
  return (
    <>
      <PageHero title={t("family_title")} subtitle={t("family_sub")} bg="navy" breadcrumb="Services" image="https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1400" />
      <section className="bg-gray-950">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
          {items.map(({ title, desc }, i) => {
            const num = String(i + 1).padStart(2, "0");
            const { bg, text, desc: descColor } = PANELS[i % PANELS.length];
            return (
              <div key={title} className={`relative overflow-hidden ${bg} px-8 sm:px-12 pt-10 pb-12 flex flex-col min-h-56`}>
                <span className={`absolute top-3 right-6 font-black text-9xl leading-none select-none pointer-events-none ${text} opacity-10`} aria-hidden="true">{num}</span>
                <span className={`font-mono text-xs font-bold tracking-widest ${text} opacity-60 mb-6`}>§{num}</span>
                <h3 className={`font-[family-name:var(--font-heading)] font-black text-2xl sm:text-3xl ${text} mb-3 leading-tight`}>{title}</h3>
                <p className={`${descColor} text-base leading-relaxed`}>{desc}</p>
              </div>
            );
          })}
        </div>
      </section>
      <HomeCTA />
    </>
  );
}
