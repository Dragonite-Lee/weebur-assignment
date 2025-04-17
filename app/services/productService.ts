import { ProductsResponse } from "@/types/productType";

const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(params: {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  q?: string;
}) {
  const { limit = 20, skip = 0, sortBy, order, q } = params;

  const url = new URL(q ? `${BASE_URL}/search` : BASE_URL);

  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("skip", skip.toString());
  if (sortBy) url.searchParams.append("sortBy", sortBy);
  if (order) url.searchParams.append("order", order);
  if (q) url.searchParams.append("q", q);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed fetch Products");
  return res.json() as Promise<ProductsResponse>;
}
