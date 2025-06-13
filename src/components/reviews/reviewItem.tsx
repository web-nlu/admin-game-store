import {StarIcon} from "lucide-react";

export function ReviewItem(review: Review) {
  return (
    <div className="border-b py-4 last:border-b-0 last:pb-0">
      <div className="flex my-1 gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
          <span className="text-xs">{review.email.charAt(0).toUpperCase()}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">{review.email}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                fill={i < review.rating ? "#FBBF24" : "none"}
                stroke={i < review.rating ? "#FBBF24" : "#9CA3AF"}
                size={14}
              />
            ))}
          </div>
          <p className="text-gray-700 text-sm mb-1">{review.comment}</p>
          <p className="text-gray-500 text-xs">
            {new Date(review.createdAt * 1000).toLocaleDateString('vi-VN')}
          </p>
        </div>
      </div>
    </div>
  )
}