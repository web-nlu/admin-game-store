import React from "react";

type BasicInfoFormProps = {
  title: string;
  server: string;
  handleInputChange: (e: React.ChangeEvent) => void;
}

export default function BasicInfoForm({title, server, handleInputChange}: BasicInfoFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Tiêu đề tài khoản <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          placeholder="VD: Tài khoản Liên Quân VIP"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Server <span className="text-red-500">*</span>
        </label>
        <select
          name="server"
          value={server}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Chọn server</option>
          <option value="Việt Nam">Việt Nam</option>
          <option value="Thái Lan">Thái Lan</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Singapore">Singapore</option>
          <option value="Philippines">Philippines</option>
        </select>
      </div>
    </div>
  )
}