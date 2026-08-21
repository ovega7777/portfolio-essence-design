export const DESIGN_CATEGORIES = ["all", "outerwear", "tops", "bottoms", "accessories"] as const;

export type DesignCategory = (typeof DESIGN_CATEGORIES)[number];

export const DESIGN_CATEGORY_LABELS: Record<DesignCategory, string> = {
  all: "All",
  outerwear: "Outerwear",
  tops: "Tops",
  bottoms: "Bottoms",
  accessories: "Accessories",
};

export const matchesDesignCategory = (productCategory: string, selectedCategory: DesignCategory) =>
  selectedCategory === "all" || productCategory.toLowerCase() === selectedCategory;
