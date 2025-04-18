"use client";

import { useState, useEffect } from "react";

import { useInfiniteProducts } from "@/hooks/useProducts";
import { ProductFilters } from "@/types/productType";
import { ViewList } from "@/components/product";
import { getViewType, setViewType } from "@/utils/handleViewType";

export default function ProductList() {
  const [filters, setFilters] = useState<ProductFilters>({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteProducts(filters);

  // 무한스크롤: 스크롤 하단 감지
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    const isSavedViewType = getViewType({ key: "viewType" });

    if (!isSavedViewType) {
      const randomViewType = Math.random() < 0.5 ? "grid" : "list";

      setViewType({
        key: "viewType",
        value: randomViewType,
        expiryHour: 24,
      });
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const products = data ?? [];

  return (
    <div className="w-full lg:max-w-[1200px] min-w-[800px] m-auto px-4">
      <div className="h-96 bg-red-400">필터</div>
      
      <main className="px-4">
        <ViewList products={products} />
      </main>
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
}
