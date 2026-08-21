import { Menu, Search } from "lucide-react";

export function NoComplyHeaderLogo({ src }: { src: string }) {
  return (
    <img
      data-no-comply-header-logo
      src={src}
      alt="NO COMPLY USA"
      className="block h-7 w-auto max-w-[42vw] object-contain object-center sm:max-w-none"
    />
  );
}

export function LogoBanner({
  src,
  menuOpen,
  onSearch,
  onMenu,
}: {
  src: string;
  menuOpen: boolean;
  onSearch: () => void;
  onMenu: () => void;
}) {
  return (
    <header className="relative h-12 overflow-hidden border-b-2 border-black bg-black">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <NoComplyHeaderLogo src={src} />
      </div>
      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center sm:right-4">
        <button
          type="button"
          onClick={onSearch}
          aria-label="Search products"
          aria-controls="no-comply-standard-menu"
          className="flex h-11 w-11 items-center justify-center text-white transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Search aria-hidden className="h-6 w-6" strokeWidth={1.8} />
        </button>
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open product menu"
          aria-controls="no-comply-standard-menu"
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center text-white transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Menu aria-hidden className="h-6 w-6" strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
