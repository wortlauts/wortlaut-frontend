import Link from "next/link";

const IMPRINT_URL = "https://pngrtz.com/imprint";
const PRIVACY_URL = "https://pngrtz.com/privacy";

export function SiteFooter() {
  return (
    <footer className="border-t border-border text-sm text-muted">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-4">
        <span>Quelle: Plenarprotokolle des Deutschen Bundestags (amtliche Werke).</span>
        <nav aria-label="Rechtliches und Hinweise" className="flex gap-4">
          <Link href="/about" className="underline">
            Quellen und Hinweise
          </Link>
          <a href={IMPRINT_URL} className="underline">
            Impressum
          </a>
          <a href={PRIVACY_URL} className="underline">
            Datenschutz
          </a>
        </nav>
      </div>
    </footer>
  );
}
