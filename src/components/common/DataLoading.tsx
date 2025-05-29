'use client'

export default function DataLoading() {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-10 pt-5 flex justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">Đang tải dữ liệu...</p>
          <p className="text-sm text-gray-500 mt-1">Vui lòng đợi trong giây lát</p>
        </div>
      </div>
    </div>
  )
}