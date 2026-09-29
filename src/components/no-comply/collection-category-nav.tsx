const CATEGORIES = ["all", "Accessories", "Bottoms", "Outerwear", "Tops"] as const;

export function CollectionCategoryNav({
  activeCategory,
  onCategoryChange,
  className = "",
}: {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}) {
  return (
    <nav
      aria-label="Filter products by category"
      className={`nc-collection-category-nav ${className}`}
    >
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          aria-pressed={activeCategory === category}
          className={`font-punk-body uppercase text-black transition-opacity hover:opacity-45 ${
            activeCategory === category
              ? "font-bold underline decoration-1 underline-offset-4"
              : "font-normal"
          }`}
        >
          {category === "all" ? "All" : category}
        </button>
      ))}
    </nav>
  );
}
