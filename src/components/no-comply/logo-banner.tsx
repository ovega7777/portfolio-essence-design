import { Menu, Search } from "lucide-react";

export function LogoBanner({
  src,
  menuOpen,
  onSearch,
  onMenu,
  theme = "dark",
}: {
  src: string;
  menuOpen: boolean;
  onSearch: () => void;
  onMenu: () => void;
  theme?: "dark" | "light";
}) {
  const light = theme === "light";

  return (
    <header
      className={`relative h-28 overflow-hidden border-b-2 border-black ${light ? "bg-white" : "bg-black"}`}
    >
      <div className="flex h-full w-full items-center justify-center">
        <img
          src={src}
          alt="NO COMPLY USA"
          className={`h-full w-full object-contain object-center ${light ? "invert" : ""}`}
        />
      </div>
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1 sm:right-6 sm:gap-2">
        <button
          type="button"
          onClick={onSearch}
          aria-label="Search products"
          className={`flex h-11 w-11 items-center justify-center transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${light ? "text-black focus-visible:outline-black" : "text-white focus-visible:outline-white"}`}
        >
          <Search aria-hidden className="h-6 w-6" strokeWidth={1.8} />
        </button>
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open product menu"
          aria-expanded={menuOpen}
          className={`flex h-11 w-11 items-center justify-center transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${light ? "text-black focus-visible:outline-black" : "text-white focus-visible:outline-white"}`}
        >
          <Menu aria-hidden className="h-6 w-6" strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
