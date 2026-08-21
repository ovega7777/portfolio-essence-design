import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import noComplyUsaLogoBlack from "../../assets/no-comply-usa-logo-black-cropped.png.asset.json";
import { LogoBanner } from "@/components/no-comply/logo-banner";
import { NoComplyUtilityBar } from "@/components/no-comply/page-indicator";

interface EditorialPageShellProps {
  children: ReactNode;
  backLabel?: string;
  pageName: string;
}

export function EditorialPageShell({
  children,
  backLabel = "No Comply Command",
  pageName,
}: EditorialPageShellProps) {
  return (
    <div className="no-comply min-h-screen bg-white text-black">
      <NoComplyUtilityBar
        pageName={pageName}
        backControl={
          <Link
            to="/projects/no-comply"
            search={{ cat: "all", sort: "order", q: "" }}
            className="nc-display block whitespace-nowrap text-base tracking-widest text-white transition-opacity hover:opacity-55 sm:text-lg"
            aria-label={`Back to ${backLabel}`}
          >
            <span className="sm:hidden">← NC</span>
            <span className="hidden sm:inline">← {backLabel}</span>
          </Link>
        }
      />

      <LogoBanner src={noComplyUsaLogoBlack.url} />

      {children}
    </div>
  );
}
