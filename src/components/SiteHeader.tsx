import Image from "next/image";
import Link from "next/link";

const LOGO_WIDTH = 150;
const LOGO_HEIGHT = 24;

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Wortlaut, zur Startseite">
          <Image
            className="block dark:hidden"
            src="/brand/lockup-horizontal-color.svg"
            alt=""
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
          />
          <Image
            className="hidden dark:block"
            src="/brand/lockup-horizontal-reversed.svg"
            alt=""
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
          />
        </Link>
        <nav aria-label="Hauptnavigation" className="flex gap-4 text-sm">
          <Link href="/search" className="hover:underline">
            Suche
          </Link>
          <Link href="/about" className="hover:underline">
            Über Wortlaut
          </Link>
        </nav>
      </div>
    </header>
  );
}
