import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function PartnersPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("partners.title")}
        subtitle={t("partners.subtitle")}
        bg="navy"
        breadcrumb="BDTS"
      />
      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-mid-gray">Our partners information coming soon.</p>
        </div>
      </section>
      <HomeCTA />
    </>
  );
}
