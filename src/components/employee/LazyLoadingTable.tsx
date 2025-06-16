'use client'
import React, {useEffect} from "react";
import {useInView} from "react-intersection-observer";
import RowData from "@/components/employee/RowData";
import {useEmployeeStore} from "@/services/employee/employeeService";

export default function LazyLoadingTable() {
  const { ref, inView } = useInView();
  const {employees, hasMore, filterEmployees, params, page, setPage} = useEmployeeStore();

  useEffect(() => {
    if (inView && hasMore) {
      filterEmployees({...params, page: page.toString()}).then(() => setPage());
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
                  ID Nhân viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ảnh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email/Số điện thoại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee: Employee) => <RowData key={employee.id} employee={employee}/>)}
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