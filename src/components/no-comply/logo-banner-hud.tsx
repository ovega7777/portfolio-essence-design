import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";

export type BannerSettings = {
  height: number;
  scale: number;
  offsetX: number;
  offsetY: number;
};

const DEFAULT_BANNER: BannerSettings = {
  height: 112,
  scale: 100,
  offsetX: 0,
  offsetY: 0,
};
const BANNER_STORAGE_KEY = "no-comply-banner-settings-v1";
const BANNER_CONFIRMED_KEY = "no-comply-banner-confirmed-v1";

export function LogoBannerHUD({
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
  const [settings, setSettings] = useState<BannerSettings>(DEFAULT_BANNER);
  const [hudVisible, setHudVisible] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(BANNER_STORAGE_KEY);
      if (saved) setSettings({ ...DEFAULT_BANNER, ...JSON.parse(saved) });
      if (localStorage.getItem(BANNER_CONFIRMED_KEY) === "1") setHudVisible(false);
    } catch {
      // Keep the banner usable when storage is unavailable.
    }
  }, []);

  const update = (patch: Partial<BannerSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Keep the controls responsive when storage is unavailable.
      }
      return next;
    });
  };

  const confirm = () => {
    try {
      localStorage.setItem(BANNER_CONFIRMED_KEY, "1");
    } catch {
      // The in-memory visibility state is still updated below.
    }
    setHudVisible(false);
  };

  const reopen = () => {
    try {
      localStorage.removeItem(BANNER_CONFIRMED_KEY);
    } catch {
      // The in-memory visibility state is still updated below.
    }
    setHudVisible(true);
  };

  const reset = () => {
    setSettings(DEFAULT_BANNER);
    try {
      localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(DEFAULT_BANNER));
    } catch {
      // The default settings still apply for the current session.
    }
  };

  return (
    <>
      <header
        className={`relative overflow-hidden border-b-2 border-black ${light ? "bg-white" : "bg-black"}`}
        style={{ height: `${settings.height}px` }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={src}
            alt="NO COMPLY USA"
            className="h-full w-full object-contain object-center"
            style={{
              filter: light ? "invert(1)" : undefined,
              transform: `translate(${settings.offsetX}px, ${settings.offsetY}px) scale(${settings.scale / 100})`,
              transformOrigin: "center center",
            }}
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

      {hudVisible ? (
        <div className="fixed bottom-4 right-4 z-[100] w-72 rounded-lg border border-white/20 bg-black/90 p-4 text-white shadow-2xl backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest">Logo HUD</span>
            <button
              type="button"
              onClick={reset}
              className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white"
            >
              Reset
            </button>
          </div>
          <HudSlider
            label="Height"
            value={settings.height}
            min={40}
            max={400}
            unit="px"
            onChange={(v) => update({ height: v })}
          />
          <HudSlider
            label="Scale"
            value={settings.scale}
            min={20}
            max={300}
            unit="%"
            onChange={(v) => update({ scale: v })}
          />
          <HudSlider
            label="Offset X"
            value={settings.offsetX}
            min={-400}
            max={400}
            unit="px"
            onChange={(v) => update({ offsetX: v })}
          />
          <HudSlider
            label="Offset Y"
            value={settings.offsetY}
            min={-200}
            max={200}
            unit="px"
            onChange={(v) => update({ offsetY: v })}
          />
          <button
            type="button"
            onClick={confirm}
            className="mt-3 w-full rounded bg-white py-2 text-xs font-bold uppercase tracking-widest text-black hover:bg-white/90"
          >
            Confirm &amp; Hide HUD
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={reopen}
          className="fixed bottom-4 right-4 z-[100] rounded-full border border-white/20 bg-black/80 px-3 py-1 text-[10px] uppercase tracking-widest text-white/70 hover:text-white"
        >
          Edit Logo
        </button>
      )}
    </>
  );
}

function HudSlider({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-2">
      <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/70">
        <span>{label}</span>
        <span className="font-mono text-white">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-white"
      />
    </div>
  );
}
