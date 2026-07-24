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
  savedOrder: string[] | null;
  onPreview: (ids: string[]) => void;
  onConfirm: (ids: string[]) => void;
  onReset: () => void;
  onCloseHud: () => void;
};

function thumbFor(p: Product): { url: string; alt: string } | undefined {
  return p.variants[0]?.images.frontProduct;
}

function Row({
  index,
  product,
  total,
  onMove,
}: {
  index: number;
  product: Product;
  total: number;
  onMove: (from: number, to: number) => void;
}) {
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
      className="flex items-center gap-2 border border-white/15 bg-white/5 px-2 py-1.5"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label={`Drag ${product.name}`}
        className="cursor-grab text-white/60 hover:text-white active:cursor-grabbing"
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <circle cx="7" cy="5" r="1.5" />
          <circle cx="13" cy="5" r="1.5" />
          <circle cx="7" cy="10" r="1.5" />
          <circle cx="13" cy="10" r="1.5" />
          <circle cx="7" cy="15" r="1.5" />
          <circle cx="13" cy="15" r="1.5" />
        </svg>
      </button>
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
      <div className="flex flex-col gap-0.5">
        <button
          type="button"
          onClick={() => index > 0 && onMove(index, index - 1)}
          disabled={index === 0}
          aria-label="Move up"
          className="border border-white/20 px-1 text-[9px] leading-none text-white/70 hover:text-white disabled:opacity-30"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={() => index < total - 1 && onMove(index, index + 1)}
          disabled={index === total - 1}
          aria-label="Move down"
          className="border border-white/20 px-1 text-[9px] leading-none text-white/70 hover:text-white disabled:opacity-30"
        >
          ▼
        </button>
      </div>
    </li>
  );
}

export function ProductOrderHUD({
  products,
  savedOrder,
  onPreview,
  onConfirm,
  onReset,
  onCloseHud,
}: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>(() => products.map((p) => p.id));

  // Sync draft when saved order or product list changes (e.g. after Confirm/Reset)
  useEffect(() => {
    setDraft(products.map((p) => p.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedOrder, products.length]);

  const productMap = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const draftProducts = useMemo(
    () => draft.map((id) => productMap.get(id)).filter(Boolean) as Product[],
    [draft, productMap]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const applyDraft = (next: string[]) => {
    setDraft(next);
    onPreview(next);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const from = draft.indexOf(String(active.id));
    const to = draft.indexOf(String(over.id));
    if (from < 0 || to < 0) return;
    applyDraft(arrayMove(draft, from, to));
  };

  const move = (from: number, to: number) => applyDraft(arrayMove(draft, from, to));

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
            <button
              type="button"
              onClick={onReset}
              className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white"
            >
              Reset
            </button>
          </div>

          <div className="mb-2 flex-1 overflow-y-auto pr-1">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={draft} strategy={verticalListSortingStrategy}>
                <ul className="flex flex-col gap-1">
                  {draftProducts.map((p, i) => (
                    <Row key={p.id} index={i} product={p} total={draftProducts.length} onMove={move} />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/15 pt-2">
            <button
              type="button"
              onClick={() => {
                onConfirm(draft);
                setOpen(false);
              }}
              className="w-full border border-white bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-black hover:bg-white/80"
            >
              Confirm
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 border border-white/30 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white hover:bg-white/10"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onCloseHud();
                  setOpen(false);
                }}
                className="flex-1 border border-white/30 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white/70 hover:bg-white/10"
              >
                Close HUD
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
