"use client";

import { useMemo, useState } from "react";
import { DocumentChat } from "./DocumentChat";

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
  "Auto": "Mobility",
  "Incendie risques simples": "Home",
  "Incendie risques spéciaux": "Home",
  "RC du particulier": "Family",
  "Protection juridique": "Legal Protection",
  "Hospitalisation et soins de santé": "Health",
  "Vie et placements": "Savings",
  "Accidents du travail et assurances collectives": "Personnel",
  "RC autre que particuliers": "Business",
  "Responsabilité Objective et immeuble": "Business",
  "Voyage": "Travel",
  "Assistance": "Assistance",
  "Individuelle": "Individual",
  "Divers": "Various",
  "Multi-domaine (packages)": "Multi-domain",
  "Transport & marine": "Transport",
  "Prêt": "Loan",
  "Pas de domaine": "Other",
};

const CATEGORY_LABEL: Record<string, string> = {
  "Information contractuelle produit (cond. gén.)": "Cond. générales",
  "IPID - Insurance Product Information Document": "IPID",
  "KID - Key Information Document": "KID",
  "Information commerciale produit": "Commercial",
  "Information commerciale produit et campagne marketing": "Marketing",
  "Information légale / fiscale": "Légal/Fiscal",
  "Autre": "Autre",
};

// Dot colour per domain label (tailwind bg class for the dot)
const DOMAIN_DOT: Record<string, string> = {
  "Home":             "bg-orange-400",
  "Mobility":         "bg-blue-500",
  "Family":           "bg-yellow-400",
  "Health":           "bg-emerald-500",
  "Savings":          "bg-amber-500",
  "Business":         "bg-slate-700",
  "Personnel":        "bg-violet-400",
  "Legal Protection": "bg-purple-400",
  "Travel":           "bg-sky-400",
  "Assistance":       "bg-rose-400",
  "Various":          "bg-teal-400",
  "Multi-domain":     "bg-fuchsia-400",
  "Individual":       "bg-lime-500",
  "Transport":        "bg-cyan-500",
  "Loan":             "bg-pink-400",
  "Other":               "bg-gray-400",
};

function domainDot(label: string): string {
  return DOMAIN_DOT[label] ?? "bg-gray-400";
}

// Unique pastel colour per category (bg + text Tailwind classes)
const CATEGORY_COLOR: Record<string, string> = {
  "Information contractuelle produit (cond. gén.)": "bg-indigo-100 text-indigo-700",
  "IPID - Insurance Product Information Document":  "bg-emerald-100 text-emerald-700",
  "KID - Key Information Document":                  "bg-violet-100 text-violet-700",
  "Information commerciale produit":                 "bg-amber-100 text-amber-700",
  "Information commerciale produit et campagne marketing": "bg-pink-100 text-pink-700",
  "Information légale / fiscale":                    "bg-cyan-100 text-cyan-700",
  "Autre":                                           "bg-stone-100 text-stone-600",
};

function categoryColor(raw: string): string {
  return CATEGORY_COLOR[raw] ?? "bg-gray-100 text-gray-600";
}

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

function DocumentRow({ doc, onChat }: { doc: Document; onChat: () => void }) {
  const catLabel = categoryLabel(doc.category);
  const catColor = categoryColor(doc.category);

  return (
    <div className="group flex items-center gap-4 px-4 py-4 rounded-lg bg-white border border-border hover:border-gold/40 hover:shadow-sm hover:shadow-gold/10 transition-all duration-150 hover:translate-x-0.5">
      {/* PDF icon */}
      <div className="flex-shrink-0">
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
      <span className={`hidden md:inline-flex flex-shrink-0 items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${catColor}`}>
        {catLabel}
      </span>

      {/* Chat button — light blue */}
      <button
        onClick={onChat}
        title="Poser une question sur ce document"
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-sky-500 hover:bg-sky-100 hover:text-sky-600 hover:border-sky-300 transition-all"
        aria-label="Poser une question"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Open button — orange */}
      <a
        href={doc.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-orange-200 bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-600 hover:border-orange-300 transition-all"
        aria-label={`Ouvrir ${doc.title}`}
      >
        <svg
          className="w-4 h-4"
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
  syncedAt?: string;
  count?: number;
}

export function DocumentsClient({ documents, syncedAt, count }: DocumentsClientProps) {
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [activeChat, setActiveChat] = useState<Document | null>(null);
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
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
    return ["All", ...labels];
  }, [domainCounts]);

  const companies = useMemo(() => {
    const set = new Set<string>();
    for (const doc of documents) set.add(doc.company);
    return ["All", ...Array.from(set).sort()];
  }, [documents]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const doc of documents) set.add(categoryLabel(doc.category));
    return ["All", ...Array.from(set).sort()];
  }, [documents]);

  // ── Filter + search ───────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return documents.filter((doc) => {
      if (selectedDomain !== "All" && domainLabel(doc.domain) !== selectedDomain) return false;
      if (selectedCompany !== "All" && doc.company !== selectedCompany) return false;
      if (selectedCategory !== "All" && categoryLabel(doc.category) !== selectedCategory) return false;
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
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {domainTabs.map((label) => {
              const count = label === "All" ? documents.length : (domainCounts[label] ?? 0);
              const active = selectedDomain === label;
              const dot = domainDot(label);
              return (
                <button
                  key={label}
                  onClick={() => handleFilterChange(setSelectedDomain, label)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 whitespace-nowrap border ${
                    active
                      ? "bg-navy text-white border-navy shadow-sm"
                      : "bg-white text-dark-gray border-border hover:border-navy/30 hover:text-navy"
                  }`}
                >
                  {label === "All" ? (
                    <span className="inline-flex gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </span>
                  ) : (
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                  )}
                  {label}
                  <span className={`text-[10px] font-normal ${active ? "text-white/70" : "text-mid-gray"}`}>
                    {count}
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
                {c === "All" ? "All companies" : c}
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
                {c === "All" ? "All categories" : c}
              </option>
            ))}
          </select>

          {/* Sync timestamp */}
          {syncedAt && (
            <p className="text-xs text-mid-gray/70 ml-auto mr-4">
              Dernière sync :{" "}
              <span className="font-medium">
                {new Date(syncedAt).toLocaleDateString("fr-BE", {
                  day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                })}
              </span>
              {count && <> — {count.toLocaleString("fr-BE")} documents</>}
            </p>
          )}

          {/* Result count */}
          <p className="text-sm text-mid-gray">
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
                setSelectedDomain("All");
                setSelectedCompany("All");
                setSelectedCategory("All");
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
              <DocumentRow key={doc.id} doc={doc} onChat={() => setActiveChat(doc)} />
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

      {activeChat && (
        <DocumentChat
          docTitle={activeChat.title}
          docUrl={activeChat.url}
          company={activeChat.company}
          onClose={() => setActiveChat(null)}
        />
      )}
    </section>
  );
}
