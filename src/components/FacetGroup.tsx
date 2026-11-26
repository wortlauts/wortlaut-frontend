import Link from "next/link";
import type { FacetValue } from "@/api/types";
import { searchHref, type PageParam, type SearchQuery } from "@/search/searchQuery";

interface FacetGroupProps {
  title: string;
  param: PageParam;
  values: FacetValue[];
  query: SearchQuery;
  labelOf?: (value: string) => string;
}

export function FacetGroup({
  title,
  param,
  values,
  query,
  labelOf = (value) => value,
}: FacetGroupProps) {
  if (values.length === 0) {
    return null;
  }
  const selected = query[param];

  return (
    <section aria-labelledby={`facet-${param}`}>
      <h3 id={`facet-${param}`} className="mb-2 font-display font-medium">
        {title}
      </h3>
      <ul className="flex flex-col gap-1 text-sm">
        {values.map(({ value, count }) => {
          const isSelected = value === selected;
          return (
            <li key={value}>
              <Link
                href={searchHref(query, { [param]: isSelected ? undefined : value })}
                aria-current={isSelected ? "true" : undefined}
                className={`flex justify-between gap-2 rounded-sm px-2 py-1 hover:bg-surface-sunken ${
                  isSelected ? "bg-hit font-medium" : ""
                }`}
              >
                <span>{labelOf(value)}</span>
                <span className="text-muted">{count.toLocaleString("de-DE")}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
