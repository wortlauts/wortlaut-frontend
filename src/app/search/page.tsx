import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ApiError } from "@/api/apiError";
import { searchSpeeches } from "@/api/speechesApi";
import { FacetGroup } from "@/components/FacetGroup";
import { HitCard } from "@/components/HitCard";
import { Pagination } from "@/components/Pagination";
import { SearchForm } from "@/components/SearchForm";
import { TrendSection } from "@/components/TrendSection";
import { REACTION_LABELS, labelOf } from "@/lib/labels";
import { pageCount } from "@/lib/pagination";
import {
  isCanonical,
  parseSearchQuery,
  searchHref,
  toApiSearchQuery,
  type SearchQuery,
} from "@/search/searchQuery";

export async function generateMetadata({ searchParams }: PageProps<"/search">): Promise<Metadata> {
  const { q } = parseSearchQuery(await searchParams);
  return { title: q ? `${q} – Wortlaut` : "Suche – Wortlaut" };
}

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const rawParams = await searchParams;
  const query = parseSearchQuery(rawParams);
  if (!isCanonical(rawParams, query)) {
    redirect(searchHref(query));
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6">
      <SearchForm query={query} />
      {hasSearchCriteria(query) ? (
        <Results query={query} />
      ) : (
        <p className="text-muted">Gib ein Wort oder einen Satz ein, um die Reden zu durchsuchen.</p>
      )}
    </div>
  );
}

function hasSearchCriteria(query: SearchQuery): boolean {
  return Object.keys(toApiSearchQuery(query)).some((name) => name !== "page");
}

async function Results({ query }: { query: SearchQuery }) {
  let response;
  try {
    response = await searchSpeeches(toApiSearchQuery(query));
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      return (
        <p role="alert" className="rounded-md border border-error p-3 text-error">
          Die Suche konnte so nicht ausgeführt werden: {error.message}
        </p>
      );
    }
    throw error;
  }

  const { total, page, page_size: pageSize, hits, facets } = response;
  const pages = pageCount(total, pageSize);

  return (
    <div className="grid gap-6 md:grid-cols-[16rem_1fr]">
      <aside className="order-last flex flex-col gap-5 md:order-none" aria-label="Filter">
        <FacetGroup title="Fraktion" param="faction" values={facets.faction} query={query} />
        <FacetGroup
          title="Reaktion im Saal"
          param="reaction"
          values={facets.reaction}
          query={query}
          labelOf={(value) => labelOf(REACTION_LABELS, value)}
        />
        <FacetGroup
          title="Wahlperiode"
          param="legislative_period"
          values={facets.legislative_period}
          query={query}
          labelOf={(value) => `Wahlperiode ${value}`}
        />
      </aside>

      <div className="flex min-w-0 flex-col gap-4">
        {query.q && (
          <Suspense fallback={<p className="text-sm text-muted">Verlauf wird geladen …</p>}>
            <TrendSection query={query} />
          </Suspense>
        )}
        <p aria-live="polite" className="text-sm text-muted">
          {total.toLocaleString("de-DE")} {total === 1 ? "Rede" : "Reden"}
          {pages > 1 && ` · Seite ${page} von ${pages}`}
        </p>
        {hits.length === 0 ? (
          <p>
            Keine Reden gefunden.{" "}
            {Object.keys(toApiSearchQuery(query)).length > 1 && (
              <a href={searchHref({ q: query.q })} className="text-accent underline">
                Filter zurücksetzen
              </a>
            )}
          </p>
        ) : (
          <ol className="flex flex-col gap-3">
            {hits.map((hit) => (
              <li key={hit.id}>
                <HitCard hit={hit} />
              </li>
            ))}
          </ol>
        )}
        <Pagination query={query} page={page} pages={pages} />
      </div>
    </div>
  );
}
