import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { articles } from "@/components/sections/news/articles";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = (await getLocale()) as "fr" | "en" | "nl";
  const t = await getTranslations("news");

  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(
      locale === "nl" ? "nl-BE" : locale === "en" ? "en-GB" : "fr-BE",
      { year: "numeric", month: "long", day: "numeric" }
    );

  return (
    <>
      <PageHero
        title={article.title[locale]}
        subtitle={article.category}
        bg="navy"
        breadcrumb="Actualités"
        image={article.image}
      />

      <section className="py-20 bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 font-mono tracking-wider uppercase">
              {article.category}
            </span>
            <time className="text-gray-400 text-sm" dateTime={article.date}>
              {formatDate(article.date)}
            </time>
          </div>

          {/* Cover image */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-10 border-2 border-gray-900">
            <Image
              src={article.image}
              alt={article.title[locale]}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>

          {/* Article body */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-xl font-medium text-gray-900 leading-relaxed mb-6">
              {article.excerpt[locale]}
            </p>
            <p>
              {locale === "nl"
                ? "Voor meer informatie over dit onderwerp of om uw situatie te bespreken, aarzel niet om contact met ons op te nemen. Onze adviseurs staan klaar om u persoonlijk te begeleiden en de beste oplossing voor uw behoeften te vinden."
                : locale === "en"
                ? "For more information on this topic or to discuss your situation, do not hesitate to contact us. Our advisors are ready to guide you personally and find the best solution for your needs."
                : "Pour plus d'informations sur ce sujet ou pour discuter de votre situation, n'hésitez pas à nous contacter. Nos conseillers sont prêts à vous accompagner personnellement et à trouver la meilleure solution pour vos besoins."}
            </p>
            <p>
              {locale === "nl"
                ? "Als onafhankelijke makelaar werken wij met de beste verzekeringsmaatschappijen op de Belgische markt om u oplossingen op maat te bieden. Onze expertise en ons netwerk van partners stellen ons in staat u te adviseren over de beste opties, rekening houdend met uw profiel en budget."
                : locale === "en"
                ? "As an independent broker, we work with the best insurance companies on the Belgian market to offer you tailor-made solutions. Our expertise and network of partners enable us to advise you on the best options, taking into account your profile and budget."
                : "En tant que courtier indépendant, nous travaillons avec les meilleures compagnies d'assurance du marché belge pour vous proposer des solutions sur mesure. Notre expertise et notre réseau de partenaires nous permettent de vous conseiller sur les meilleures options, en tenant compte de votre profil et de votre budget."}
            </p>
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-300">
            <Link
              href={`/${locale}/news`}
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-amber-600 transition-colors font-mono tracking-wider uppercase"
            >
              ← {t("back_to_news") ?? "Retour aux actualités"}
            </Link>
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
