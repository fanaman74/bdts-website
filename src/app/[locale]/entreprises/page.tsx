import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { BusinessServices } from "@/components/sections/BusinessServices";

export default async function EntreprisesPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("paths.businesses_title")}
        subtitle={t("paths.businesses_sub")}
        bg="navy"
        breadcrumb="BDTS"
      />
      <BusinessServices />
      <HomeCTA />
    </>
  );
}
