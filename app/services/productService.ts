import { ProductFilters, ProductsResponse } from "@/types/productType";

export async function getProducts({
  q,
  sortBy,
  order,
  skip = 0,
  limit = 20,
}: ProductFilters & { skip?: number }): Promise<ProductsResponse> {
  let base_url = "https://dummyjson.com/products";
  const params = new URLSearchParams();

  if (sortBy) params.append("sortBy", sortBy);
  if (order) params.append("order", order);
  params.append("skip", skip.toString());
  params.append("limit", limit.toString());

  if (q && q.trim()) {
    base_url += `/search?q=${encodeURIComponent(q)}`;
    if (params.toString()) {
      base_url += `&${params.toString()}`;
    }
  } else {
    if (params.toString()) {
      base_url += `?${params.toString()}`;
    }
  }

  const response = await fetch(base_url);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
