import { Product } from "@/types/productType";
import { getViewType } from "@/utils";

import { ViewCard } from "./ViewCard";

interface ViewListProps {
  products: Product[];
}

export const ViewList = ({ products }: ViewListProps) => {
  const viewType = getViewType({ key: "viewType" });

  return (
    <div
      className={
        viewType === "grid" ? "grid grid-cols-4 gap-4" : "flex flex-col gap-4"
      }
    >
      {products.map((product) => (
        <ViewCard key={product.id} {...product} />
      ))}
    </div>
  );
};
