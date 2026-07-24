import { useEffect, useState, useCallback } from "react";
import type { Product } from "@/data/products";

const ORDER_KEY = "nc:product-order:v1";
const HUD_HIDDEN_KEY = "nc:product-order-hud:hidden";

function readOrder(): string[] | null {
  try {
    const raw = localStorage.getItem(ORDER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : null;
  } catch {
    return null;
  }
}

export function applyOrder<T extends { id: string }>(items: T[], order: string[] | null): T[] {
  if (!order || order.length === 0) return items;
  const index = new Map(order.map((id, i) => [id, i]));
  return [...items].sort((a, b) => {
    const ai = index.has(a.id) ? (index.get(a.id) as number) : Number.POSITIVE_INFINITY;
    const bi = index.has(b.id) ? (index.get(b.id) as number) : Number.POSITIVE_INFINITY;
    return ai - bi;
  });
}

export function useProductOrder() {
  const [order, setOrderState] = useState<string[] | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [hudHidden, setHudHiddenState] = useState(false);

  useEffect(() => {
    setOrderState(readOrder());
    try {
      setHudHiddenState(localStorage.getItem(HUD_HIDDEN_KEY) === "1");
    } catch {}
    setHydrated(true);
  }, []);

  const setOrder = useCallback((ids: string[]) => {
    setOrderState(ids);
    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(ids));
    } catch {}
  }, []);

  const resetOrder = useCallback(() => {
    setOrderState(null);
    try {
      localStorage.removeItem(ORDER_KEY);
    } catch {}
  }, []);

  const hideHud = useCallback(() => {
    setHudHiddenState(true);
    try {
      localStorage.setItem(HUD_HIDDEN_KEY, "1");
    } catch {}
  }, []);

  const showHud = useCallback(() => {
    setHudHiddenState(false);
    try {
      localStorage.removeItem(HUD_HIDDEN_KEY);
    } catch {}
  }, []);

  const orderedProducts = useCallback(
    (products: Product[]) => applyOrder(products, order),
    [order]
  );

  return { order, hydrated, hudHidden, setOrder, resetOrder, hideHud, showHud, orderedProducts };
}
