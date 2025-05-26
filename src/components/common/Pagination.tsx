'use client'
import React, {useState} from "react";

type Props = {
  currentLength: number
  total: number,
  onChangePageAction: (page: number) => void
}

export default function Pagination({ currentLength, total, onChangePageAction }: Props) {
  const [page, setPage] = useState(1)

  const onChangePage = (newPage: number) => {
    if(newPage <= 0) {
      return
    }
    onChangePageAction(newPage)
    setPage(newPage)
  }

  return (
    <div className="bg-white px-6 py-4 flex items-center justify-between border rounded-lg shadow-sm">
      <div className="text-sm text-gray-700">
        Hiển thị {currentLength} trên {total}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onChangePage(page - 1)}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">Trước
        </button>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">{page}</button>
        <button
          onClick={() => onChangePage(page + 1)}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">Sau
        </button>
      </div>
    </div>
  )
}