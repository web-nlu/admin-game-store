'use client'

import {useReviewStore} from "@/services/review/reviewService";
import React, {useEffect} from "react";
import {ReviewItem} from "@/components/reviews/reviewItem";
import {X} from "lucide-react";
import {ElementFormChangeEvent} from "@/types/common";

type Props = {
  accountId: string;
  closeAction: () => void;
}


export default function ReviewsModal({ accountId, closeAction }: Props) {
  const {reviews, filter, loading} = useReviewStore()

  useEffect(() => {
    filter(accountId, {})
  }, [accountId])

  const getHideReview = (e: ElementFormChangeEvent) => {
    filter(accountId, {isHide: `${(e.target as HTMLInputElement).checked}` })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between pr-6 py-6 border-b">
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
        <div className="flex gap-2 items-center mt-2">
          <label className="block font-medium text-gray-700">Nhận xét bị ẩn</label>
          <input type="checkbox" onChange={getHideReview} />
        </div>
        {loading ? (
          <div className="space-y-4 w-200 flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
            <span>Đang xử lý...</span>
          </div>
        ) : (
          <div className="space-y-4 w-200">
            {reviews.map((review) => (
              <ReviewItem {...review} key={review.id}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}