import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function ClientPortalPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("client_portal.title")}
        subtitle={t("client_portal.subtitle")}
        bg="navy"
        breadcrumb="BDTS"
        image="https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-mid-gray">Client portal login integration coming soon.</p>
        </div>
      </section>
      <HomeCTA />
    </>
  );
}
