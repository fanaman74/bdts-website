import { CoverageDetail } from "@/components/sections/CoverageDetail";

export default async function CoveragePage({ params }: { params: Promise<{ coverage: string }> }) {
  const { coverage } = await params;
  return <CoverageDetail serviceKey="bailleur_locataire" categoryKey="particulier" coverageKey={coverage} />;
}
