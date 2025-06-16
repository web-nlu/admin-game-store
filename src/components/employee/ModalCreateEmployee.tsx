'use client'
import React, {useState} from "react";
import {Save, X} from "lucide-react";
import {useEmployeeStore} from "@/services/employee/employeeService";

type Props = {
  afterSubmitAction?: () => void;
  closeAction: () => void;
}

export default function ModalCreateEmployee({afterSubmitAction, closeAction}: Props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const {loading, createEmployee} = useEmployeeStore()
  const handleSubmit = async () => {
    const result = await createEmployee(formData)
    if(result && afterSubmitAction) {
      afterSubmitAction()
    }
  };

  const handleClose = () => {
    closeAction()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Tạo nhân viên mới
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6"/>
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4 text-gray-500">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="text"
                defaultValue={formData.email || ""}
                onChange={(e) =>
                  setFormData((prev) => ({...prev, email: e.target.value}))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
                placeholder="Nhập email..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <input
                type="text"
                defaultValue={formData.password || ""}
                onChange={(e) =>
                  setFormData((prev) => ({...prev, password: e.target.value}))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
                placeholder="Nhập password..."
              />
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-4 text-gray-700 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-700 text-white font-semibold py-4 px-6 rounded-md hover:from-orange-600 hover:to-red-600 focus:ring-4 focus:ring-orange-200 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 h-5 w-5 border-b-2 border-white"></div>
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5"/>
                    <span>Tạo nhân viên mới</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}