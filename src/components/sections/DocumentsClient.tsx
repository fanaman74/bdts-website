"use client";

import { useMemo, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Document {
  id: string;
  title: string;
  company: string;
  domain: string;
  category: string;
  product: string;
  target: string;
  url: string;
  lang: string;
  date: string;
}

// ─── Mapping tables ───────────────────────────────────────────────────────────

const DOMAIN_LABEL: Record<string, string> = {
  "Auto": "Auto",
  "Incendie risques simples": "Habitation",
  "Incendie risques spéciaux": "Habitation",
  "RC du particulier": "Famille",
  "Protection juridique": "Protection juridique",
  "Hospitalisation et soins de santé": "Hospitalisation",
  "Vie et placements": "Épargne & Pension",
  "Accidents du travail et assurances collectives": "Personnel",
  "RC autre que particuliers": "Entreprise",
  "Responsabilité Objective et immeuble": "Entreprise",
  "Voyage": "Voyage",
  "Assistance": "Assistance",
  "Individuelle": "Individuelle",
  "Divers": "Divers",
  "Multi-domaine (packages)": "Multi-domaine",
  "Transport & marine": "Transport",
  "Prêt": "Prêt",
  "Pas de domaine": "Autres",
};

const CATEGORY_LABEL: Record<string, string> = {
  "Information contractuelle produit (cond. gén.)": "Cond. générales",
  "IPID - Insurance Product Information Document": "IPID",
  "KID - Key Information Document": "KID",
  "Information commerciale produit": "Commercial",
  "Information légale / fiscale": "Légal/Fiscal",
  "Autre": "Autre",
};

function domainLabel(raw: string): string {
  return DOMAIN_LABEL[raw] ?? raw;
}

function categoryLabel(raw: string): string {
  return CATEGORY_LABEL[raw] ?? raw;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20;

// ─── Sub-components ───────────────────────────────────────────────────────────

function PdfIcon() {
  return (
    <svg
      className="w-8 h-8 text-gold flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
      <line x1="9" y1="9" x2="11" y2="9" />
    </svg>
  );
}

function DocumentRow({ doc }: { doc: Document }) {
  const catLabel = categoryLabel(doc.category);

  return (
    <div className="group flex items-start gap-4 px-4 py-4 rounded-lg bg-white border border-border hover:border-gold/40 hover:shadow-sm hover:shadow-gold/10 transition-all duration-150 hover:translate-x-0.5">
      {/* Left gold accent on hover */}
      <div className="flex-shrink-0 mt-0.5">
        <PdfIcon />
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-navy line-clamp-2 leading-snug">
          {doc.title}
        </p>
        <p className="text-xs text-mid-gray mt-1 truncate">{doc.product}</p>
      </div>

      {/* Company badge */}
      <span className="hidden sm:inline-flex flex-shrink-0 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy text-white whitespace-nowrap">
        {doc.company}
      </span>

      {/* Category tag */}
      <span className="hidden md:inline-flex flex-shrink-0 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-light-gray text-dark-gray whitespace-nowrap">
        {catLabel}
      </span>

      {/* Open button */}
      <a
        href={doc.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-dark transition-colors whitespace-nowrap"
        aria-label={`Ouvrir ${doc.title}`}
      >
        Ouvrir
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface DocumentsClientProps {
  documents: Document[];
}

export function DocumentsClient({ documents }: DocumentsClientProps) {
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("Tous");
  const [selectedCompany, setSelectedCompany] = useState("Tous");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [page, setPage] = useState(1);

  // ── Derive unique filter options ──────────────────────────────────────────

  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const doc of documents) {
      const label = domainLabel(doc.domain);
      counts[label] = (counts[label] ?? 0) + 1;
    }
    return counts;
  }, [documents]);

  const domainTabs = useMemo(() => {
    const labels = Object.keys(domainCounts).sort((a, b) => domainCounts[b] - domainCounts[a]);
    return ["Tous", ...labels];
  }, [domainCounts]);

  const companies = useMemo(() => {
    const set = new Set<string>();
    for (const doc of documents) set.add(doc.company);
    return ["Tous", ...Array.from(set).sort()];
  }, [documents]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const doc of documents) set.add(categoryLabel(doc.category));
    return ["Tous", ...Array.from(set).sort()];
  }, [documents]);

  // ── Filter + search ───────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return documents.filter((doc) => {
      if (selectedDomain !== "Tous" && domainLabel(doc.domain) !== selectedDomain) return false;
      if (selectedCompany !== "Tous" && doc.company !== selectedCompany) return false;
      if (selectedCategory !== "Tous" && categoryLabel(doc.category) !== selectedCategory) return false;
      if (q && !doc.title.toLowerCase().includes(q) && !doc.company.toLowerCase().includes(q) && !doc.product.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [documents, search, selectedDomain, selectedCompany, selectedCategory]);

  // ── Pagination ────────────────────────────────────────────────────────────

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, filtered.length);
  const pageDocs = filtered.slice(pageStart, pageEnd);

  function handleFilterChange(setter: (v: string) => void, value: string) {
    setter(value);
    setPage(1);
  }

  // ── Page numbers to show ──────────────────────────────────────────────────
  function pageNumbers(): (number | "…")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const nums: (number | "…")[] = [1];
    if (safePage > 3) nums.push("…");
    for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) {
      nums.push(i);
    }
    if (safePage < totalPages - 2) nums.push("…");
    nums.push(totalPages);
    return nums;
  }

  return (
    <section className="py-16 bg-off-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search bar */}
        <div className="mb-6">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mid-gray pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => handleFilterChange(setSearch, e.target.value)}
              placeholder="Rechercher un document, un produit, une compagnie…"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white text-navy placeholder:text-mid-gray focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm"
            />
          </div>
        </div>

        {/* Domain tabs */}
        <div className="mb-6 -mx-1">
          <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
            {domainTabs.map((label) => {
              const count = label === "Tous" ? documents.length : (domainCounts[label] ?? 0);
              const active = selectedDomain === label;
              return (
                <button
                  key={label}
                  onClick={() => handleFilterChange(setSelectedDomain, label)}
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 whitespace-nowrap border ${
                    active
                      ? "bg-gold text-navy-dark border-gold shadow-sm"
                      : "bg-white text-mid-gray border-border hover:border-gold/50 hover:text-navy"
                  }`}
                >
                  {label}
                  <span className={`text-[10px] font-normal ${active ? "text-navy-dark/70" : "text-mid-gray"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary filters row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Company dropdown */}
          <select
            value={selectedCompany}
            onChange={(e) => handleFilterChange(setSelectedCompany, e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
          >
            {companies.map((c) => (
              <option key={c} value={c}>
                {c === "Tous" ? "Toutes les compagnies" : c}
              </option>
            ))}
          </select>

          {/* Category dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => handleFilterChange(setSelectedCategory, e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "Tous" ? "Toutes les catégories" : c}
              </option>
            ))}
          </select>

          {/* Result count */}
          <p className="ml-auto text-sm text-mid-gray">
            {filtered.length === 0 ? (
              "Aucun résultat"
            ) : (
              <>
                Affichage{" "}
                <span className="font-medium text-navy">{pageStart + 1}–{pageEnd}</span>
                {" "}de{" "}
                <span className="font-medium text-navy">{filtered.length.toLocaleString("fr-BE")}</span>
                {" "}résultats
              </>
            )}
          </p>
        </div>

        {/* Document list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-mid-gray text-lg">Aucun document ne correspond à votre recherche.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedDomain("Tous");
                setSelectedCompany("Tous");
                setSelectedCategory("Tous");
                setPage(1);
              }}
              className="mt-4 text-sm text-gold hover:text-gold-dark font-medium underline underline-offset-2"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {pageDocs.map((doc) => (
              <DocumentRow key={doc.id} doc={doc} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-3 py-2 rounded-lg text-sm font-medium border border-border bg-white text-navy disabled:opacity-40 disabled:cursor-not-allowed hover:border-gold/50 hover:text-gold transition-colors"
              aria-label="Page précédente"
            >
              ←
            </button>

            {pageNumbers().map((n, idx) =>
              n === "…" ? (
                <span key={`ellipsis-${idx}`} className="px-2 py-2 text-sm text-mid-gray select-none">
                  …
                </span>
              ) : (
                <button
                  key={n}
                  onClick={() => setPage(n as number)}
                  className={`min-w-[2.25rem] px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    n === safePage
                      ? "bg-gold border-gold text-navy-dark"
                      : "border-border bg-white text-navy hover:border-gold/50 hover:text-gold"
                  }`}
                >
                  {n}
                </button>
              )
            )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="px-3 py-2 rounded-lg text-sm font-medium border border-border bg-white text-navy disabled:opacity-40 disabled:cursor-not-allowed hover:border-gold/50 hover:text-gold transition-colors"
              aria-label="Page suivante"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
