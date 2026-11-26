import Link from "next/link";
import { getTrend } from "@/api/speechesApi";
import { BUCKET_LABELS } from "@/lib/labels";
import { searchHref, toApiTrendQuery, type SearchQuery } from "@/search/searchQuery";
import { TrendChart } from "./TrendChart";

const toggleClass = "rounded-sm px-3 py-1 hover:bg-surface-sunken";
const activeToggleClass = "bg-primary text-on-primary hover:bg-primary";

function Toggle({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`${toggleClass} ${active ? activeToggleClass : ""}`}
    >
      {children}
    </Link>
  );
}

export async function TrendSection({ query }: { query: SearchQuery }) {
  const trend = await getTrend(toApiTrendQuery(query)).catch(() => null);
  if (trend === null) {
    return <p className="text-sm text-muted">Der Verlauf ist gerade nicht verfügbar.</p>;
  }

  const bucket = trend.bucket;
  const label = `Reden mit „${query.q}“ ${BUCKET_LABELS[bucket] ?? bucket}`;

  return (
    <section aria-labelledby="trend-heading" className="rounded-lg border border-border bg-surface p-4">
      <h2 id="trend-heading" className="font-display text-lg font-medium">
        Verlauf
      </h2>
      <p className="mb-3 text-sm text-muted">
        {trend.normalized
          ? "Anteil der Reden mit dem Begriff an allen Reden im Zeitraum."
          : "Anzahl der Reden, in denen der Begriff vorkommt."}
        {query.faction ? ` Nur Reden der Fraktion ${query.faction}.` : ""}
      </p>
      <div className="mb-3 flex flex-wrap gap-4 text-sm">
        <div className="flex gap-1" role="group" aria-label="Zeitraster">
          {Object.entries(BUCKET_LABELS).map(([value, text]) => (
            <Toggle key={value} href={searchHref(query, { bucket: value })} active={bucket === value}>
              {text}
            </Toggle>
          ))}
        </div>
        <div className="flex gap-1" role="group" aria-label="Darstellung">
          <Toggle href={searchHref(query, { normalize: undefined })} active={!trend.normalized}>
            Anzahl
          </Toggle>
          <Toggle href={searchHref(query, { normalize: "true" })} active={trend.normalized}>
            Anteil
          </Toggle>
        </div>
      </div>
      <TrendChart points={trend.points} normalized={trend.normalized} label={label} />
    </section>
  );
}
