import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function JobsPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("jobs.title")}
        subtitle={t("jobs.subtitle")}
        bg="navy"
        breadcrumb="BDTS"
        image="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-mid-gray">Current job openings coming soon.</p>
        </div>
      </section>
      <HomeCTA />
    </>
  );
}
