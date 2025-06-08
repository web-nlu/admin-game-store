'use client'

import { useEffect, useRef } from "react";
import {useModalUpdateCompleteStore} from "@/services/order/modalUpdateCompleteService";
import {useCurrentOrderStore} from "@/services/order/currentOrder";
import {changeStatus} from "@/utils/order";
import AppButton from "@/components/common/Button";


export default function ModalUpdateComplete() {
  const data: {[key: string]: string} = {
    status: "COMPLETED",
    paymentMethod: "BANK"
  };
  const modalRef = useRef(null);
  const {closeModal} = useModalUpdateCompleteStore()
  const {clear, order} = useCurrentOrderStore();

  // Đóng modal khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
        clear();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUpdate = async () => {
    await changeStatus(order!.id, data).then((res) => {
      if (res) closeModal()
    });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/*{loading && <DataLoading />}*/}
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Cập nhật thông tin đơn #{order?.id}</h2>

        {/* Trường input 1 */}
        <div className="mb-4">
          <label htmlFor="input1" className="block text-sm font-medium text-gray-700">
            Id thanh toán ( Payment Link Id )
          </label>
          <input
            id="paymentLinkId"
            type="text"
            onChange={(e) => data["paymentLinkId"] = e.target.value}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập dữ liệu..."
          />
        </div>

        {/* Trường input 2 */}
        <div className="mb-4">
          <label htmlFor="input2" className="block text-sm font-medium text-gray-700">
            Phương thức thanh toán
          </label>
          <input
            id="paynmentMethod"
            type="text"
            defaultValue="BANK"
            onChange={(e) => data["paymentMethod"] = e.target.value}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập dữ liệu..."
          />
        </div>

        {/* Nút Cập nhật */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              closeModal();
              clear();
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Hủy
          </button>
          <AppButton label="Cập nhật" onClick={handleUpdate} />
        </div>
      </div>
    </div>
  )
}