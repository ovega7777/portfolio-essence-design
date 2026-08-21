import { useState } from "react";

import noComplyUsaLogoBlack from "@/assets/no-comply-usa-logo-black-cropped.png.asset.json";
import { NoComplyBackButton } from "@/components/no-comply/back-button";
import { LogoBanner } from "@/components/no-comply/logo-banner";
import { NoComplyUtilityBar } from "@/components/no-comply/page-indicator";
import { StandardNoComplyMenu } from "@/components/no-comply/standard-menu";

interface NoComplySiteHeaderProps {
  pageName: string;
  query?: string;
  onQueryChange?: (query: string) => void;
  activeCollection?: "command" | "caught-on-film";
}

export function NoComplySiteHeader({
  pageName,
  query,
  onQueryChange,
  activeCollection,
}: NoComplySiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusSearch, setFocusSearch] = useState(false);
  const [internalQuery, setInternalQuery] = useState("");
  const menuQuery = query ?? internalQuery;
  const setMenuQuery = onQueryChange ?? setInternalQuery;

  const openMenu = (shouldFocusSearch: boolean) => {
    setFocusSearch(shouldFocusSearch);
    setMenuOpen(true);
  };

  return (
    <>
      <NoComplyUtilityBar
        pageName={pageName}
        backControl={
          <NoComplyBackButton className="nc-display block whitespace-nowrap text-base tracking-widest text-white transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-lg" />
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
        activeCollection={activeCollection}
      />
    </>
  );
}
