'use client';

import { useState, useRef, useEffect } from 'react';
import {EllipsisVertical} from "lucide-react";
import _ from "lodash";
import {useModalUpdateCompleteStore} from "@/services/order/modalUpdateCompleteService";
import {useCurrentOrderStore} from "@/services/order/currentOrder";
import {changeStatus} from "@/utils/order";

type Props = {
  order: Order
}

export default function ActionOrderButton({order}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const {openModal} = useModalUpdateCompleteStore()
  const {setCurrentOrder} = useCurrentOrderStore()

  // Đóng tooltip khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const complete = ()=> {
    setCurrentOrder(order);
    openModal();
  }

  const cancel= () => {
    changeStatus(order.id, {status: "CANCELLED"})
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Nút 3 dấu chấm */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
      >
        <EllipsisVertical className="w-5 h-5 text-gray-600" />
      </button>

      {/* Tooltip */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1 flex flex-col">
            <button
              onClick={() => complete()}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Đánh dấu thành công
            </button>
            {(!_.isEmpty(order.status) && (order.status.toLowerCase() === "pending")) && (
              <button
                onClick={cancel}
                className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100">
                Huỷ đơn hàng
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}