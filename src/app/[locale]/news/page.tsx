import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { NewsGrid } from "@/components/sections/news/NewsGrid";
import { NewsletterStrip } from "@/components/sections/news/NewsletterStrip";

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsGrid readMoreLabel={t("news.read_more")} />
        </div>
      </section>
      <NewsletterStrip />
      <HomeCTA />
    </>
  );
}
