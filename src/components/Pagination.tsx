import Link from "next/link";
import { visiblePages } from "@/lib/pagination";
import { searchHref, type SearchQuery } from "@/search/searchQuery";

interface PaginationProps {
  query: SearchQuery;
  page: number;
  pages: number;
}

const linkClass = "rounded-sm px-3 py-1 hover:bg-surface-sunken";

export function Pagination({ query, page, pages }: PaginationProps) {
  if (pages <= 1) {
    return null;
  }
  const hrefOf = (target: number) => searchHref(query, { page: String(target) });

  return (
    <nav aria-label="Seiten" className="flex flex-wrap items-center gap-1">
      {page > 1 && (
        <Link href={hrefOf(page - 1)} className={linkClass}>
          Zurück
        </Link>
      )}
      {visiblePages(page, pages).map((target) => (
        <Link
          key={target}
          href={hrefOf(target)}
          aria-current={target === page ? "page" : undefined}
          className={`${linkClass} ${target === page ? "bg-primary text-on-primary" : ""}`}
        >
          {target}
        </Link>
      ))}
      {page < pages && (
        <Link href={hrefOf(page + 1)} className={linkClass}>
          Weiter
        </Link>
      )}
    </nav>
  );
}
