'use client'
import {useAccountInfoStore} from "@/services/accounts/acountInfoService";
import React, {useEffect} from "react";
import {Save, X} from "lucide-react";

type Props = {
  accountId: string | null;
  afterSubmitAction?: () => void;
  closeAction: () => void;
}

export default function ModalAccountInfo({accountId, afterSubmitAction, closeAction}: Props) {
  const {getAccountInfo, loading, currentAccountInfo, updateAccountInfo, clearCurrent} = useAccountInfoStore()

  useEffect(() => {
    if(accountId) {
      getAccountInfo(accountId?.toString())
    } else {
      closeAction()
    }
  }, [accountId]);

  const handleSubmit = async () => {

    await updateAccountInfo(accountId!, currentAccountInfo)
    clearCurrent()
    if(afterSubmitAction) {
      afterSubmitAction();
    }
  };

  const handleClose = () => {
    clearCurrent()
    closeAction()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Chỉnh sửa thông tin tài khoản
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
                Username
              </label>
              <input
                type="text"
                defaultValue={currentAccountInfo.username || ""}
                onChange={(e) => currentAccountInfo.username = e.target.value}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent -gray-300"
                placeholder="Nhập username..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="text"
                defaultValue={currentAccountInfo.email || ""}
                onChange={(e) => currentAccountInfo.email = e.target.value}
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
                defaultValue={currentAccountInfo.password || ""}
                onChange={(e) => currentAccountInfo.password = e.target.value}
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
                    <span>Cập nhật Tài Khoản Game</span>
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