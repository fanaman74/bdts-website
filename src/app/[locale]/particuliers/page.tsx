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
        image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <IndividualsServices />
      <ProcessSteps />
      <HomeCTA />
    </>
  );
}
