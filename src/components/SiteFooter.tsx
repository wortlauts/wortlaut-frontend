import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border text-sm text-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-4">
        Quelle: Plenarprotokolle des Deutschen Bundestags (amtliche Werke).{" "}
        <Link href="/about" className="underline">
          Quellen und Hinweise
        </Link>
      </div>
    </footer>
  );
}
