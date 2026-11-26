import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-4 px-4 py-16">
      <h1 className="font-display text-2xl font-bold">Seite nicht gefunden</h1>
      <p className="text-muted">Diese Seite oder Rede gibt es nicht.</p>
      <Link href="/search" className="text-accent underline">
        Zur Suche
      </Link>
    </div>
  );
}
