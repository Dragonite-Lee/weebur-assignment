import { Product } from "@/types/productType";

export const ViewCard = ({
  title,
  description,
  rating,
  thumbnail,
  reviews,
}: Product) => {
  const viewType = localStorage.getItem("viewType");

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm">Rating: {rating} / 5</p>
      <div className="mt-2">
        <h3 className="text-sm font-medium">Reviews ({reviews.length})</h3>
        <ul className="text-xs text-gray-500">
          {reviews.slice(0, 2).map((review, index) => (
            <li key={index} className="mt-1">
              <p>{review.comment}</p>
              <p>
                By {review.reviewerName} on {review.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
