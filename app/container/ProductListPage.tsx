"use client";

import { useSearchParams } from "next/navigation";

import { useEffect } from "react";

import { Filter, ViewList } from "@/components/product";
import { Error, Loading, NotFound } from "@/components/shared";
import { useInfiniteProducts } from "@/hooks/useProducts";
import { ProductFilters } from "@/types/productType";
import { getViewType, setViewType } from "@/utils";

export default function ProductList() {
  const searchParams = useSearchParams();

  // URL 파라미터에서 필터 읽기
  const filters: ProductFilters = {
    q: searchParams.get("q") || undefined,
    sortBy: searchParams.get("sortBy") || undefined,
    order: searchParams.get("order") as "asc" | "desc" | undefined,
    limit: Number(searchParams.get("limit")) || 20,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteProducts(filters);

  // 무한 스크롤
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

  // 뷰 타입 초기화
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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  if (data?.length === 0 && !isLoading && filters.q) {
    return <NotFound searchTerm={filters.q} />;
  }

  const products = data ?? [];

  return (
    <div className="m-auto w-full min-w-[800px] px-4 lg:max-w-[1200px]">
      <Filter />
      <main className="px-4 pt-4" aria-live="polite">
        <ViewList products={products} />
      </main>
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
}
