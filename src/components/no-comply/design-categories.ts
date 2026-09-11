export const DESIGN_CATEGORIES = ["all", "outerwear", "tops", "bottoms", "accessories"] as const;

export type DesignCategory = (typeof DESIGN_CATEGORIES)[number];

export const DESIGN_CATEGORY_LABELS: Record<DesignCategory, string> = {
  all: "All",
  outerwear: "Outerwear",
  tops: "Tops",
  bottoms: "Bottoms",
  accessories: "Accessories",
};

const categoryAliases: Record<string, DesignCategory> = {
  all: "all", alldesigns: "all", outerwear: "outerwear", outerwears: "outerwear",
  top: "tops", tops: "tops", bottom: "bottoms", bottoms: "bottoms",
  accessory: "accessories", accessories: "accessories",
};

export const normalizeDesignCategory = (value: unknown): DesignCategory => {
  if (typeof value !== "string") return "all";
  const key = value.trim().toLowerCase().replace(/[\s_-]+/g, "");
  return Object.prototype.hasOwnProperty.call(categoryAliases, key) ? categoryAliases[key] : "all";
};

export const matchesDesignCategory = (productCategory: string, selectedCategory: DesignCategory) =>
  selectedCategory === "all" || normalizeDesignCategory(productCategory) === selectedCategory;
