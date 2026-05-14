import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function EpargnePage() {
  const t = await getTranslations("services");
  const products = [
    { name: "Épargne-pension / Pensioensparen", desc: "Tax-advantaged pension savings — deductible up to Belgian legal limits annually" },
    { name: "AG Invest+", desc: "Branch 21 life insurance — guaranteed rate with potential profit share" },
    { name: "Long-term savings / Langetermijnsparen", desc: "Structured savings with life insurance wrapper and tax benefits" },
  ];
  return (
    <>
      <PageHero title={t("savings_title")} subtitle={t("savings_sub")} bg="navy" breadcrumb="Services" image="https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1400" />
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {products.map(({ name, desc }) => (
              <div key={name} className="p-6 bg-gold-pale rounded-xl border border-gold/20">
                <h3 className="font-semibold text-navy text-lg mb-2">{name}</h3>
                <p className="text-dark-gray">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HomeCTA />
    </>
  );
}
