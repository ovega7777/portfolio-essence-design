import type { ReactNode } from "react";

import noComplyUsaLogoBlack from "../../assets/no-comply-usa-logo-black-cropped.png.asset.json";
import { NoComplyBackButton } from "@/components/no-comply/back-button";
import { LogoBanner } from "@/components/no-comply/logo-banner";
import { NoComplyUtilityBar } from "@/components/no-comply/page-indicator";

interface EditorialPageShellProps {
  children: ReactNode;
  pageName: string;
}

export function EditorialPageShell({ children, pageName }: EditorialPageShellProps) {
  return (
    <div className="no-comply min-h-screen bg-white text-black">
      <NoComplyUtilityBar
        pageName={pageName}
        backControl={
          <NoComplyBackButton className="nc-display block whitespace-nowrap text-base tracking-widest text-white transition-opacity hover:opacity-55 sm:text-lg" />
        }
      />

      <LogoBanner src={noComplyUsaLogoBlack.url} />

      {children}
    </div>
  );
}
