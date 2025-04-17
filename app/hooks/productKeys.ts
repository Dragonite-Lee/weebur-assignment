export type ProductFilters = {
  q?: string;
  sortBy?: string;
  order?: "asc" | "desc";
};

export const productQueryKeys = {
  all: ["products"] as const,
  search: ["products", "search"] as const,

  products: {
    list: (filters: ProductFilters) =>
      [...productQueryKeys.all, filters] as const,
    searchList: (filters: ProductFilters) =>
      [...productQueryKeys.search, filters] as const,
  },
};
