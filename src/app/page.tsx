import { SearchForm } from "@/components/SearchForm";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-4 py-16">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Wer hat wann was im Bundestag gesagt?
        </h1>
        <p className="text-lg text-muted">
          Wortlaut durchsucht die Reden des Deutschen Bundestags. Gib ein Wort oder einen Satz ein
          und sieh, wo, wann und von wem er gesagt wurde.
        </p>
      </div>
      <SearchForm query={{}} />
    </div>
  );
}
