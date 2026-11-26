import type { Metadata } from "next";

export const metadata: Metadata = { title: "Über Wortlaut" };

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 leading-relaxed">
      <h1 className="font-display text-3xl font-bold tracking-tight">Über Wortlaut</h1>

      <section className="flex flex-col gap-2">
        <h2 className="font-display text-xl font-medium">Was Wortlaut ist</h2>
        <p>
          Wortlaut ist eine Suchmaschine für die Reden des Deutschen Bundestags. Du gibst ein Wort
          oder einen Satz ein und siehst, wo, wann und von wem er gesagt wurde.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-display text-xl font-medium">Quellen und Rechte</h2>
        <p>
          Grundlage sind die offiziellen Plenarprotokolle des Deutschen Bundestags, die als
          offene Daten bereitgestellt werden. Plenarprotokolle sind amtliche Werke und nach § 5
          UrhG nicht urheberrechtlich geschützt. Jede Rede verweist auf das Originalprotokoll.
        </p>
        <p>
          Ton und Video der Bundestagssitzungen werden nicht gespeichert oder geschnitten, sondern
          höchstens verlinkt.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-display text-xl font-medium">Was du wissen solltest</h2>
        <ul className="list-disc pl-5">
          <li>Derzeit sind die Reden der 21. Wahlperiode enthalten.</li>
          <li>
            Mitglieder der Bundesregierung haben im Protokoll keine Fraktionsangabe. Beim Filtern
            nach Fraktion fehlen ihre Reden deshalb.
          </li>
          <li>
            Durchsucht werden die Reden der jeweiligen Rednerin oder des Redners. Worte der
            Sitzungsleitung und Zwischenfragen anderer Abgeordneter sind nicht enthalten.
          </li>
          <li>
            Beifall, Heiterkeit, Zwischenrufe und Widerspruch stammen aus den Protokollen und
            sind nur so genau zugeordnet, wie das Protokoll es ist.
          </li>
        </ul>
      </section>
    </div>
  );
}
