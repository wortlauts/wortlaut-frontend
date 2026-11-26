import Link from "next/link";
import type { SearchHit } from "@/api/types";
import { formatDate } from "@/lib/formatDate";
import { Highlighted } from "./Highlighted";

export function HitCard({ hit }: { hit: SearchHit }) {
  const { speaker } = hit;

  return (
    <article className="rounded-lg border border-border bg-surface p-4">
      <header className="mb-2 flex flex-wrap items-baseline gap-x-3 text-sm text-muted">
        <time dateTime={hit.date}>{formatDate(hit.date)}</time>
        <span>
          Wahlperiode {hit.legislative_period}, Sitzung {hit.session}
        </span>
      </header>
      <h2 className="font-display text-lg font-medium">
        <Link href={`/speeches/${hit.id}`} className="hover:underline">
          {speaker.name}
          {speaker.faction ? ` (${speaker.faction})` : ""}
        </Link>
      </h2>
      {hit.agenda_item && (
        <p className="mt-1 line-clamp-2 text-sm text-muted">{hit.agenda_item}</p>
      )}
      <ul className="mt-3 flex flex-col gap-2">
        {(hit.highlights ?? []).map((highlight, index) => (
          <li key={index} className="whitespace-pre-line border-l-2 border-border pl-3">
            …<Highlighted highlight={highlight} />…
          </li>
        ))}
      </ul>
    </article>
  );
}
