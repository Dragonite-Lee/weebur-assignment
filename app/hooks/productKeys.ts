import { ProductFilters } from "@/types/productType";

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
