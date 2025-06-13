'use client'

import {useReviewStore} from "@/services/review/reviewService";
import React, {useEffect} from "react";
import {ReviewItem} from "@/components/reviews/reviewItem";
import {X} from "lucide-react";

type Props = {
  accountId: string;
  closeAction: () => void;
}


export default function ReviewsModal({ accountId, closeAction }: Props) {
  const {reviews, filter} = useReviewStore()

  useEffect(() => {
    filter(accountId, {})
  }, [accountId])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between p-6 py-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Đánh giá sản phẩm
          </h3>
          <button
            onClick={closeAction}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6"/>
          </button>
        </div>
        <div className="space-y-4 w-200">
          {reviews.map((review) => (
            <ReviewItem {...review} key={review.id}/>
          ))}
        </div>
      </div>
    </div>
  )
}