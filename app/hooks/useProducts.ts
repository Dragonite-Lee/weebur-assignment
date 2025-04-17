import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";

export function useGetProducts(params: {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  q?: string;
}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    enabled: !params.q || !!params.q?.trim(), // q가 없거나 빈 문자열이 아니면 실행
  });
}
