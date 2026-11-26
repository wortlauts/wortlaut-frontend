"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-4 px-4 py-16">
      <h1 className="font-display text-2xl font-bold">Das hat gerade nicht geklappt</h1>
      <p className="text-muted">
        Die Daten sind im Moment nicht erreichbar. Bitte versuche es gleich noch einmal.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-primary px-5 py-2 font-medium text-on-primary"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
