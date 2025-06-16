'use client'
import { RefreshCw } from 'lucide-react';
import LazyLoadingTable from "@/components/order/LazyLoadingTable";
import FilterOrder from "@/components/order/filterOrder";
import ModalUpdateComplete from "@/components/order/ModalUpdateComplete";
import {useModalUpdateCompleteStore} from "@/services/order/modalUpdateCompleteService";

export default function OrdersPage () {
  const {isOpen} = useModalUpdateCompleteStore()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
              <p className="mt-1 text-gray-500">Danh sách tất cả đơn hàng trong hệ thống</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                <RefreshCw className="w-4 h-4 mr-2"/>
                Làm mới
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FilterOrder />
        <div className="bg-white min-h-[350px] rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
          <LazyLoadingTable />
        </div>
      </div>
      { isOpen && <ModalUpdateComplete /> }
    </div>
  )
}