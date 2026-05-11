import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { IndividualsServices } from "@/components/sections/IndividualsServices";

export default async function ParticuliersPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("paths.individuals_title")}
        subtitle={t("paths.individuals_sub")}
        bg="navy"
        breadcrumb="BDTS"
      />
      <IndividualsServices />
      <ProcessSteps />
      <HomeCTA />
    </>
  );
}
