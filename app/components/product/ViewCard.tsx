import { Product } from "@/types/productType";
import { formatDate } from "@/utils";

export const ViewCard = ({
  title,
  description,
  rating,
  thumbnail,
  reviews,
}: Product) => {
  return (
    <div className="rounded-lg border p-6 shadow-md transition hover:shadow-lg">
      <img
        src={thumbnail}
        alt={title}
        className="mb-6 h-48 w-auto rounded-md object-cover"
      />
      <h2 className="mb-3 text-xl font-semibold">{title}</h2>
      <p className="mb-3 truncate text-gray-600">{description}</p>
      <p className="mb-4 text-sm">별점: {rating} / 5</p>
      <div className="mt-4">
        <h3 className="mb-2 text-sm font-medium">리뷰 수 ({reviews.length})</h3>
        <ul className="space-y-3 text-xs text-gray-500">
          {reviews.slice(0, 2).map((review, index) => (
            <li key={index} className="flex flex-col gap-1">
              <p className="truncate">{review.comment}</p>
              <p>
                By {review.reviewerName} on {formatDate(review.date)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
