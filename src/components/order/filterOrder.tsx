'use client'
import {ChevronDown, Search} from "lucide-react";
import _ from "lodash";
import {filterOrderStore} from "@/services/order/filterOrderService";
import {useOrderStore} from "@/services/order/orderService";

export default function FilterOrder() {
  const {params, setParams} = filterOrderStore()
  const {clearOrders} = useOrderStore();
  const onFilter = (key: string, value: string) => {
    if(_.isEmpty(value)) {
      delete params[key]
    }else {
      params[key] = value;
    }
    setParams(_.cloneDeep(params));
    clearOrders();
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
          <input
            type="text"
            placeholder="Tìm kiếm ID, email, SĐT..."
            // value={searchTerm}
            onChange={(e) => onFilter("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            // value={statusFilter}
            onChange={(e) => onFilter("status", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="completed">Hoàn thành</option>
            <option value="pending">Đang xử lý</option>
            <option value="cancelled">Đã hủy</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"/>
        </div>
      </div>
    </div>
  )
}