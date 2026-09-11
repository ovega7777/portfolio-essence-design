import { Link } from "@tanstack/react-router";

const destinations = {
  command: { to: "/projects/no-comply/command", title: "No Comply Command" },
  "caught-on-film": { to: "/projects/no-comply/caught-on-film", title: "Caught on Film" },
  media: { to: "/projects/no-comply/media", title: "Media" },
  designs: { to: "/projects/no-comply/designs", title: "All Designs" },
  "lucky-day-co": { to: "/projects/lucky-day-co", title: "Lucky Day Co" },
  projects: { to: "/projects", title: "All Projects" },
} as const;

export type BottomNavigationDestination = keyof typeof destinations;

export function CollectionNavigationFooter({
  nextPage,
}: {
  nextPage: BottomNavigationDestination;
}) {
  const destination = destinations[nextPage];

  return (
    <footer className="nc-bottom-navigation bg-white pt-24 text-black md:pt-32">
      <div className="border-t-2 border-black px-6 py-16">
        <nav
          aria-label="NO COMPLY USA bottom navigation"
          className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6"
        >
          <Link
            to={destination.to}
            aria-label={`Next up: ${destination.title}`}
            className="group block max-w-full rounded-sm py-1 text-black transition-colors hover:text-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            <span className="nc-display block text-sm tracking-[0.3em] text-black">Next Up</span>
            <span className="nc-display block text-4xl leading-10 [overflow-wrap:anywhere]">
              {destination.title}{" "}<span aria-hidden="true" className="inline-block">→</span>
            </span>
          </Link>
          <Link
            to="/projects/no-comply"
            aria-label="Back to NO COMPLY USA"
            className="nc-display shrink-0 rounded-sm border-b-2 border-black px-1 pb-1 pt-2 text-sm tracking-[0.3em] text-black transition-colors hover:border-black/60 hover:text-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            ← NO COMPLY USA
          </Link>
        </nav>
      </div>
    </footer>
  );
}
