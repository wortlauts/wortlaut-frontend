import { MODE_LABELS, SORT_LABELS } from "@/lib/labels";
import type { SearchQuery } from "@/search/searchQuery";
import { SpeakerInput } from "./SpeakerInput";

const KEPT_FILTERS = ["faction", "reaction", "legislative_period", "bucket", "normalize"] as const;
const ADVANCED_FIELDS = ["mode", "from", "to", "speaker", "sort"] as const;

const fieldClass = "w-full rounded-md border border-border bg-surface px-3 py-2";

function Options({ labels }: { labels: Record<string, string> }) {
  return Object.entries(labels).map(([value, label]) => (
    <option key={value} value={value}>
      {label}
    </option>
  ));
}

export function SearchForm({ query }: { query: SearchQuery }) {
  const advancedInUse = ADVANCED_FIELDS.some((name) => query[name]);

  return (
    <form action="/search" method="get" className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={query.q}
          aria-label="Suchbegriff"
          placeholder="Wort oder Satz, zum Beispiel „soziale Marktwirtschaft“"
          className={`${fieldClass} text-lg`}
        />
        <button
          type="submit"
          className="rounded-md bg-primary px-5 py-2 font-medium text-on-primary"
        >
          Suchen
        </button>
      </div>

      <details open={advancedInUse} className="text-sm">
        <summary className="cursor-pointer text-muted">Erweiterte Suche</summary>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            Suchart
            <select name="mode" defaultValue={query.mode ?? "stem"} className={fieldClass}>
              <Options labels={MODE_LABELS} />
            </select>
          </label>
          <label className="flex flex-col gap-1">
            Sortierung
            <select name="sort" defaultValue={query.sort ?? "relevance"} className={fieldClass}>
              <Options labels={SORT_LABELS} />
            </select>
          </label>
          <label className="flex flex-col gap-1">
            Von
            <input type="date" name="from" defaultValue={query.from} className={fieldClass} />
          </label>
          <label className="flex flex-col gap-1">
            Bis
            <input type="date" name="to" defaultValue={query.to} className={fieldClass} />
          </label>
          <label className="flex flex-col gap-1 sm:col-span-2">
            Rednerin oder Redner
            <SpeakerInput defaultValue={query.speaker} />
          </label>
        </div>
      </details>

      {KEPT_FILTERS.map((name) =>
        query[name] ? <input key={name} type="hidden" name={name} value={query[name]} /> : null,
      )}
    </form>
  );
}
