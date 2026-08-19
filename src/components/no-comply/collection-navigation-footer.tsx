import { Link } from "@tanstack/react-router";

interface CollectionNavigationFooterProps {
  nextCollection: "command" | "caught-on-film";
}

const nextLinkClassName =
  "block rounded-sm py-1 text-black transition-colors hover:text-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";

export function CollectionNavigationFooter({
  nextCollection,
}: CollectionNavigationFooterProps) {
  const nextContent = (
    <>
      <span className="nc-display block text-sm tracking-[0.3em] text-black">Next Up</span>
      <span className="nc-display block text-4xl text-black transition-colors group-hover:text-black/60">
        {nextCollection === "command" ? "No Comply Command" : "Caught on Film"} →
      </span>
    </>
  );

  return (
    <footer className="px-6 py-16">
      <nav
        aria-label="Collection navigation"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6"
      >
        {nextCollection === "command" ? (
          <Link
            to="/projects/no-comply/command"
            aria-label="Next up: No Comply Command"
            className={`group ${nextLinkClassName}`}
          >
            {nextContent}
          </Link>
        ) : (
          <Link
            to="/projects/no-comply/caught-on-film"
            aria-label="Next up: Caught on Film"
            className={`group ${nextLinkClassName}`}
          >
            {nextContent}
          </Link>
        )}

        <Link
          to="/projects/no-comply"
          aria-label="Back to NO COMPLY USA"
          className="rounded-sm border-b-2 border-black px-1 pb-1 pt-2 nc-display text-sm tracking-[0.3em] text-black transition-colors hover:border-black/60 hover:text-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          ← No Comply USA
        </Link>
      </nav>
    </footer>
  );
}
