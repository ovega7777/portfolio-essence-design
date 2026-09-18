import { Menu } from "lucide-react";
import { AnimatedWordmark } from "./animated-wordmark";

export function NoComplyHeaderLogo() {
  return <AnimatedWordmark banner />;
}

export function LogoBanner({
  menuOpen,
  onMenu,
}: {
  menuOpen: boolean;
  onMenu: () => void;
}) {
  return (
    <header className="relative h-12 overflow-hidden border-b-2 border-black">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <NoComplyHeaderLogo />
      </div>
      <div className="absolute left-2 top-1/2 flex -translate-y-1/2 items-center sm:left-4">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open product menu"
          aria-controls="no-comply-standard-menu"
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center text-black transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <Menu aria-hidden className="h-6 w-6" strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
