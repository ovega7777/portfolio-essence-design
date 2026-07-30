import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import noComplyUsaLogoBlack from "../../assets/no-comply-usa-logo-black-cropped.png.asset.json";

interface EditorialPageShellProps {
  children: ReactNode;
}

export function EditorialPageShell({ children }: EditorialPageShellProps) {
  return (
    <div className="no-comply min-h-screen bg-white text-black">
      <nav className="border-b-2 border-black bg-black text-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            to="/projects/no-comply"
            search={{ cat: "all", sort: "order", q: "" }}
            className="nc-display text-base tracking-widest text-white transition-opacity hover:opacity-55 sm:text-lg"
          >
            ← No Comply Command
          </Link>
          <Link
            to="/"
            className="nc-display hidden text-base tracking-[0.22em] text-white transition-opacity hover:opacity-55 sm:block"
          >
            Nicholas Curzon
          </Link>
        </div>
      </nav>

      <div className="flex h-12 items-center justify-center bg-black px-4">
        <img
          src={noComplyUsaLogoBlack.url}
          alt="No Comply USA"
          className="h-7 w-auto object-contain"
        />
      </div>

      {children}
    </div>
  );
}
