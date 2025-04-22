"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { FormEvent, useState, useEffect } from "react";

import { ProductFilters } from "@/types/productType";

export function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tempFilters, setTempFilters] = useState<ProductFilters>(() => {
    const initialFilters: ProductFilters = {
      q: searchParams.get("q") || undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      order: searchParams.get("order") as "asc" | "desc" | undefined,
      limit: Number(searchParams.get("limit")) || 20,
    };
    return initialFilters;
  });

  useEffect(() => {
    const newFilters: ProductFilters = {
      q: searchParams.get("q") || undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      order: searchParams.get("order") as "asc" | "desc" | undefined,
      limit: Number(searchParams.get("limit")) || 20,
    };
    setTempFilters(newFilters);
  }, [searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (tempFilters.q) params.set("q", tempFilters.q);
    if (tempFilters.sortBy) params.set("sortBy", tempFilters.sortBy);
    if (tempFilters.order) params.set("order", tempFilters.order);
    if (tempFilters.limit && tempFilters.limit !== 20)
      params.set("limit", tempFilters.limit.toString());

    router.push(`?${params.toString()}`, { scroll: true });
    document.querySelector("main")?.focus();
  };

  const handleReset = () => {
    setTempFilters({ limit: 20 });
    router.push("?", { scroll: false });
    document.querySelector("main")?.focus();
  };

  return (
    <section aria-labelledby="filter-heading">
      <h2 id="filter-heading" className="sr-only">
        Product Filters
      </h2>
      <form
        className="flex flex-col gap-4 bg-gray-100 p-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="search-input" className="sr-only">
            Search products
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="검색어를 입력하세요."
            value={tempFilters.q || ""}
            onChange={(e) =>
              setTempFilters({ ...tempFilters, q: e.target.value || undefined })
            }
            className="w-full rounded border p-2"
            aria-describedby="search-description"
          />
          <p id="search-description" className="sr-only">
            Enter a keyword to search for products
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="sort-select" className="sr-only">
            Sort products
          </label>
          <select
            id="sort-select"
            value={`${tempFilters.sortBy || ""}:${tempFilters.order || ""}`}
            onChange={(e) => {
              const [newSortBy, newOrder] = e.target.value.split(":");
              setTempFilters({
                ...tempFilters,
                sortBy: newSortBy || undefined,
                order: (newOrder as "asc" | "desc") || undefined,
              });
            }}
            className="w-full rounded border p-2"
            aria-describedby="sort-description"
          >
            <option value="">별점 기준 정렬</option>
            <option value="rating:asc">오름차순</option>
            <option value="rating:desc">내림차순</option>
          </select>
          <p id="sort-description" className="sr-only">
            Select how to sort products by title, price, or rating
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="limit-select" className="sr-only">
            Items per page
          </label>
          <select
            id="limit-select"
            value={tempFilters.limit || 20}
            onChange={(e) =>
              setTempFilters({
                ...tempFilters,
                limit: Number(e.target.value),
              })
            }
            className="w-full rounded border p-2"
            aria-describedby="limit-description"
          >
            <option value={10}>10개</option>
            <option value={20}>20개</option>
            <option value={50}>50개</option>
            <option value={100}>100개</option>
          </select>
          <p id="limit-description" className="sr-only">
            Select the number to display per page
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="rounded border bg-blue-500 p-2 text-white hover:bg-blue-600"
            aria-label="Apply filters and search products"
          >
            검색
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded border bg-gray-500 p-2 text-white hover:bg-gray-600"
            aria-label="Reset all filters"
          >
            초기화
          </button>
        </div>
      </form>
    </section>
  );
}
