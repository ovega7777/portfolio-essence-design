import { useState, type ReactNode } from "react";

import noComplyUsaLogoBlack from "../../assets/no-comply-usa-logo-black-cropped.png.asset.json";
import { NoComplyBackButton } from "@/components/no-comply/back-button";
import { LogoBanner } from "@/components/no-comply/logo-banner";
import { NoComplyUtilityBar } from "@/components/no-comply/page-indicator";
import { StandardNoComplyMenu } from "@/components/no-comply/standard-menu";

interface EditorialPageShellProps {
  children: ReactNode;
  pageName: string;
}

export function EditorialPageShell({ children, pageName }: EditorialPageShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuQuery, setMenuQuery] = useState("");
  const [focusSearch, setFocusSearch] = useState(false);
  const openMenu = (shouldFocusSearch = false) => {
    setFocusSearch(shouldFocusSearch);
    setMenuOpen(true);
  };

  return (
    <div className="no-comply min-h-screen bg-white text-black">
      <NoComplyUtilityBar
        pageName={pageName}
        backControl={
          <NoComplyBackButton className="nc-display block whitespace-nowrap text-base tracking-widest text-white transition-opacity hover:opacity-55 sm:text-lg" />
        }
      />

      <LogoBanner
        src={noComplyUsaLogoBlack.url}
        menuOpen={menuOpen}
        onSearch={() => openMenu(true)}
        onMenu={() => openMenu(false)}
      />

      <StandardNoComplyMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        query={menuQuery}
        onQueryChange={setMenuQuery}
        focusSearch={focusSearch}
      />

      {children}
    </div>
  );
}
