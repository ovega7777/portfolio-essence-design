import { useEffect, useState, useCallback } from "react";

export type LightboxTextOverrides = {
  name?: string;
  price?: string;
  nameSize?: number;
  priceSize?: number;
};

const storageKey = (slug: string) => `nc-lightbox-text:${slug}`;
const hudVisibleKey = (slug: string) => `nc-lightbox-text-hud:${slug}`;

function readOverrides(slug: string | undefined): LightboxTextOverrides {
  if (!slug || typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    if (!raw) return {};
    return JSON.parse(raw) as LightboxTextOverrides;
  } catch {
    return {};
  }
}

export function useLightboxTextOverrides(slug: string | undefined) {
  const [overrides, setOverrides] = useState<LightboxTextOverrides>(() =>
    readOverrides(slug)
  );

  useEffect(() => {
    setOverrides(readOverrides(slug));
    if (!slug || typeof window === "undefined") return;
    const key = storageKey(slug);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setOverrides(readOverrides(slug));
    };
    const onLocal = () => setOverrides(readOverrides(slug));
    window.addEventListener("storage", onStorage);
    window.addEventListener("nc-lightbox-text-changed", onLocal);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("nc-lightbox-text-changed", onLocal);
    };
  }, [slug]);

  return { overrides };
}

type HUDProps = {
  productSlug: string;
  defaultName: string;
  defaultPrice: string;
};

export function LightboxTextHUD({
  productSlug,
  defaultName,
  defaultPrice,
}: HUDProps) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(hudVisibleKey(productSlug)) !== "0";
  });
  const initial = readOverrides(productSlug);
  const [name, setName] = useState(initial.name ?? defaultName);
  const [price, setPrice] = useState(initial.price ?? defaultPrice);
  const [nameSize, setNameSize] = useState<number>(initial.nameSize ?? 20);
  const [priceSize, setPriceSize] = useState<number>(initial.priceSize ?? 20);

  const persist = useCallback(
    (next: LightboxTextOverrides) => {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(storageKey(productSlug), JSON.stringify(next));
      window.dispatchEvent(new Event("nc-lightbox-text-changed"));
    },
    [productSlug]
  );

  useEffect(() => {
    persist({ name, price, nameSize, priceSize });
  }, [name, price, nameSize, priceSize, persist]);

  const reset = () => {
    setName(defaultName);
    setPrice(defaultPrice);
    setNameSize(20);
    setPriceSize(20);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey(productSlug));
      window.dispatchEvent(new Event("nc-lightbox-text-changed"));
    }
  };

  const confirm = () => {
    setVisible(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(hudVisibleKey(productSlug), "0");
    }
  };

  const reopen = () => {
    setVisible(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(hudVisibleKey(productSlug), "1");
    }
  };

  if (!visible) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          reopen();
        }}
        aria-label="Open text editor"
        title="Edit lightbox text"
        className="nc-display fixed bottom-4 right-4 z-[110] border-2 border-black bg-white px-3 py-2 text-xs tracking-[0.3em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
      >
        T
      </button>
    );
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-4 right-4 z-[110] w-[280px] border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000]"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="nc-display text-[10px] tracking-[0.3em] text-black">
          Lightbox Text
        </p>
        <button
          type="button"
          onClick={confirm}
          className="nc-display border border-black px-2 py-1 text-[9px] tracking-[0.2em] text-black hover:bg-black hover:text-white"
        >
          ✕ Hide
        </button>
      </div>

      <label className="nc-display block text-[9px] tracking-[0.3em] text-black">
        Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-1 w-full border-2 border-black bg-white px-2 py-1 text-xs text-black focus:outline-none"
      />
      <div className="mt-1 flex items-center gap-2">
        <input
          type="range"
          min={10}
          max={72}
          value={nameSize}
          onChange={(e) => setNameSize(Number(e.target.value))}
          className="flex-1"
        />
        <span className="nc-display w-10 text-right text-[10px] text-black">
          {nameSize}px
        </span>
      </div>

      <label className="nc-display mt-3 block text-[9px] tracking-[0.3em] text-black">
        Price
      </label>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="mt-1 w-full border-2 border-black bg-white px-2 py-1 text-xs text-black focus:outline-none"
      />
      <div className="mt-1 flex items-center gap-2">
        <input
          type="range"
          min={10}
          max={72}
          value={priceSize}
          onChange={(e) => setPriceSize(Number(e.target.value))}
          className="flex-1"
        />
        <span className="nc-display w-10 text-right text-[10px] text-black">
          {priceSize}px
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={reset}
          className="nc-display border-2 border-black bg-white px-3 py-1 text-[10px] tracking-[0.3em] text-black hover:bg-black hover:text-white"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={confirm}
          className="nc-display border-2 border-black bg-black px-3 py-1 text-[10px] tracking-[0.3em] text-white hover:bg-white hover:text-black"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
