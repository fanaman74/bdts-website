import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function UsefulNumbersPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("useful_numbers.title")}
        subtitle={t("useful_numbers.subtitle")}
        bg="navy"
        breadcrumb="BDTS"
      />
      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-bold text-navy mb-6">Contact</h2>
            <div className="space-y-4">
              <p className="text-mid-gray">
                <strong>Phone:</strong> 02 463 19 25
              </p>
              <p className="text-mid-gray">
                <strong>Email:</strong> info@bdts.be
              </p>
            </div>
          </div>
        </div>
      </section>
      <HomeCTA />
    </>
  );
}
