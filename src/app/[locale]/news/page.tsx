import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function NewsPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("news.title")}
        subtitle={t("news.subtitle")}
        bg="navy"
        breadcrumb="BDTS"
        image="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-mid-gray">News articles coming soon.</p>
        </div>
      </section>
      <HomeCTA />
    </>
  );
}
