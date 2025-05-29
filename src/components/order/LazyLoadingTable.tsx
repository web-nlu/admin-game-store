'use client'
import React, {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import RowData from "@/components/order/rowData";
import {filterOrderStore} from "@/services/order/filterOrderService";

export default function LazyLoadingTable() {
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  const [orders, setOrders] = useState([] as Order[]);
  const [page, setPage] = useState(1);
  const [first, setFirst] = useState(true);
  const {params} = filterOrderStore()

  useEffect(() => {
    console.log(1)
    if (hasMore) {
      fetchData().then((res) => {
        setOrders((prev) => [...prev, ...res])
        setHasMore(res.length > 0)
        if(first) setFirst(false)
      });
    }
  }, [page])

  useEffect(() => {
    console.log(2)
    if(!first) {
      fetchData(1).then((res) => {
        setOrders(res)
        setHasMore(res.length > 0)
      });
    }
  }, [JSON.stringify(params)]);

  const fetchData = async (initPage?: number) => {
    setHasMore(false);
    const searchParams = new URLSearchParams({"page":(initPage || page).toString(), ...params});
    const res = await fetch(`/api/orders?${searchParams}`);
    const { orders } = await res.json();

    if (!orders?.length || !res.ok) {
      return [];
    }

    return orders;
  }

  useEffect(() => {
    console.log(3)
    if (inView && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="bg-white min-h-[350px] rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="bg-white min-h-[350px] rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  // onClick={() => handleSort('id')}
                >
                  ID Đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  // onClick={() => handleSort('totalPrice')}
                >
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thanh toán
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  // onClick={() => handleSort('createdAt')}
                >
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order: Order) => <RowData key={order.id} order={order}/>)}
              </tbody>
            </table>
            {hasMore && (
              <div ref={ref} className="text-center py-8">
                <span>Đang tải thêm...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}