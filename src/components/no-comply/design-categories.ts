export const DESIGN_CATEGORIES = ["all", "outerwear", "tops", "bottoms", "accessories"] as const;

export type DesignCategory = (typeof DESIGN_CATEGORIES)[number];

export const matchesDesignCategory = (productCategory: string, selectedCategory: DesignCategory) =>
  selectedCategory === "all" || productCategory.toLowerCase() === selectedCategory;
