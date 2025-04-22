import { useInfiniteQuery } from "@tanstack/react-query";

import { getProducts } from "@/services/productService";
import { ProductFilters } from "@/types/productType";

import { productQueryKeys } from "./productKeys";

export function useInfiniteProducts(filters: ProductFilters) {
  return useInfiniteQuery({
    queryKey: filters.q
      ? productQueryKeys.products.searchList(filters)
      : productQueryKeys.products.list(filters),
    queryFn: ({ pageParam = 0 }) =>
      getProducts({
        ...filters,
        skip: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (sum, page) => sum + page.products.length,
        0,
      );
      if (totalFetched >= lastPage.total) return undefined;
      return totalFetched;
    },
    initialPageParam: 0,
    enabled: !filters.q || !!filters.q?.trim(),
    select: (data) => {
      return data.pages.flatMap((page) => page.products);
    },
  });
}
