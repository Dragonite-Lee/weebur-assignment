import { Product } from "@/types/productType";
import { ViewCard } from "./ViewCard";
import { getViewType } from "@/utils/handleViewType";

interface ViewListProps {
  products: Product[];
}

export const ViewList = ({ products }: ViewListProps) => {
  const viewType = getViewType({ key: "viewType" });

  return (
    <div
      className={
        viewType === 'grid'
          ? 'grid grid-cols-4 gap-4'
          : 'flex flex-col gap-4'
      }
    >
      {products.map((product) => (
        <ViewCard key={product.id} {...product} />
      ))}
    </div>
  );
};