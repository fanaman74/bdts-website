import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function DocumentsPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("documents.title")}
        subtitle={t("documents.subtitle")}
        bg="navy"
        breadcrumb="BDTS"
        image="https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-6">{t("documents.forms")}</h2>
            <p className="text-mid-gray">Document section coming soon.</p>
          </div>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-6">{t("documents.guides")}</h2>
            <p className="text-mid-gray">Guides section coming soon.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy mb-6">{t("documents.legal")}</h2>
            <p className="text-mid-gray">Legal documents section coming soon.</p>
          </div>
        </div>
      </section>
      <HomeCTA />
    </>
  );
}
