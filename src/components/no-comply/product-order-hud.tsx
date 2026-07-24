import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Product } from "@/data/products";

type Props = {
  products: Product[]; // in current saved/default order
  onReorder: (ids: string[]) => void;
  onCloseHud: () => void;
};

function thumbFor(p: Product): { url: string; alt: string } | undefined {
  return p.variants[0]?.images.frontProduct;
}

function Row({ product }: { product: Product }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: product.id });
  const thumb = thumbFor(product);
  const colorway = product.variants[0]?.color;

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
      }}
      {...attributes}
      {...listeners}
      className="flex cursor-grab items-center gap-2 border border-white/15 bg-white/5 px-2 py-1.5 active:cursor-grabbing"
    >
      <span aria-hidden className="text-white/60">
        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="7" cy="5" r="1.5" />
          <circle cx="13" cy="5" r="1.5" />
          <circle cx="7" cy="10" r="1.5" />
          <circle cx="13" cy="10" r="1.5" />
          <circle cx="7" cy="15" r="1.5" />
          <circle cx="13" cy="15" r="1.5" />
        </svg>
      </span>
      {thumb ? (
        <img
          src={thumb.url}
          alt=""
          className="h-9 w-9 shrink-0 border border-white/20 bg-white object-cover"
        />
      ) : (
        <div className="h-9 w-9 shrink-0 border border-white/20 bg-white/10" />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-bold uppercase tracking-widest text-white">
          {product.name}
        </p>
        {colorway ? (
          <p className="truncate text-[9px] uppercase tracking-widest text-white/50">
            {colorway}
          </p>
        ) : null}
      </div>
    </li>
  );
}

export function ProductOrderHUD({ products, onReorder, onCloseHud }: Props) {
  const [open, setOpen] = useState(false);
  const [ids, setIds] = useState<string[]>(() => products.map((p) => p.id));

  useEffect(() => {
    setIds(products.map((p) => p.id));
  }, [products]);

  const productMap = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const orderedProducts = useMemo(
    () => ids.map((id) => productMap.get(id)).filter(Boolean) as Product[],
    [ids, productMap]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const from = ids.indexOf(String(active.id));
    const to = ids.indexOf(String(over.id));
    if (from < 0 || to < 0) return;
    const next = arrayMove(ids, from, to);
    setIds(next);
    onReorder(next);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-4 left-4 z-[100] rounded-lg border border-white/20 bg-black/90 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-2xl backdrop-blur hover:bg-black"
        >
          Order HUD
        </button>
      )}

      {open && (
        <div className="fixed bottom-4 left-4 z-[100] flex max-h-[75vh] w-80 flex-col rounded-lg border border-white/20 bg-black/90 p-3 text-white shadow-2xl backdrop-blur">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest">Product Order</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Collapse"
                className="border border-white/20 px-2 py-1 text-[10px] uppercase tracking-widest text-white/70 hover:bg-white/10 hover:text-white"
              >
                –
              </button>
              <button
                type="button"
                onClick={() => {
                  onCloseHud();
                  setOpen(false);
                }}
                aria-label="Close HUD"
                className="border border-white/20 px-2 py-1 text-[10px] uppercase tracking-widest text-white/70 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>

          <p className="mb-2 text-[9px] uppercase tracking-widest text-white/50">
            Drag to swap positions
          </p>

          <div className="flex-1 overflow-y-auto pr-1">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                <ul className="flex flex-col gap-1">
                  {orderedProducts.map((p) => (
                    <Row key={p.id} product={p} />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      )}
    </>
  );
}
