import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSpeech } from "@/api/speechesApi";
import { formatDate } from "@/lib/formatDate";
import { DELIVERY_LABELS, REACTION_LABELS, labelOf } from "@/lib/labels";

export async function generateMetadata({ params }: PageProps<"/speeches/[id]">): Promise<Metadata> {
  const speech = await getSpeech((await params).id);
  return speech
    ? { title: `${speech.speaker.name}, ${formatDate(speech.date)} – Wortlaut` }
    : { title: "Rede nicht gefunden – Wortlaut" };
}

export default async function SpeechPage({ params }: PageProps<"/speeches/[id]">) {
  const speech = await getSpeech((await params).id);
  if (speech === null) {
    notFound();
  }

  const { speaker, rights } = speech;
  const paragraphs = speech.text.split("\n").filter((paragraph) => paragraph.trim());

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm text-muted">
          <time dateTime={speech.date}>{formatDate(speech.date)}</time> · Wahlperiode{" "}
          {speech.legislative_period}, Sitzung {speech.session} ·{" "}
          {labelOf(DELIVERY_LABELS, speech.delivery)}
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight">{speaker.name}</h1>
        <p className="text-muted">
          {[speaker.faction, speaker.role].filter(Boolean).join(" · ")}
        </p>
        {speech.agenda_item && <p className="text-sm">{speech.agenda_item}</p>}
      </header>

      <div className="flex flex-col gap-4 text-lg leading-relaxed">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {speech.reactions.length > 0 && (
        <section aria-labelledby="reactions-heading">
          <h2 id="reactions-heading" className="mb-2 font-display text-lg font-medium">
            Reaktionen im Saal
          </h2>
          <ul className="flex flex-col gap-1 text-sm">
            {speech.reactions.map((reaction, index) => (
              <li key={index}>
                <span className="font-medium">{labelOf(REACTION_LABELS, reaction.type)}</span>
                {[reaction.source, reaction.text].filter(Boolean).join(": ") &&
                  ` – ${[reaction.source, reaction.text].filter(Boolean).join(": ")}`}
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="border-t border-border pt-4 text-sm text-muted">
        <p>
          Quelle:{" "}
          <a href={speech.source_url} className="text-accent underline">
            Plenarprotokoll des Deutschen Bundestags (PDF)
          </a>
          . {rights.attribution}
        </p>
      </footer>
    </article>
  );
}
