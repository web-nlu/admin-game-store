import React from "react";

type Props = {
  price: string;
  salePrice: string;
  level: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PriceForm ({price = "", salePrice = "", level = "", handleInputChange}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Giá gốc (VNĐ) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          placeholder="0"
          min="0"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Giá khuyến mãi (VNĐ)
        </label>
        <input
          type="number"
          name="salePrice"
          value={salePrice}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          placeholder="0"
          min="0"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Level <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="level"
          value={level}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          placeholder="1"
          min="1"
          required
        />
      </div>
    </div>
  )
}