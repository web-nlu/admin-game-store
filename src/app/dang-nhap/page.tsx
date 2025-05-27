'use client'
import Link from "next/link";
import React, {useState} from "react";
import {loginAction} from "@/app/dang-nhap/action";

export default function LoginPage() {
  const [error, setError] = useState('')

  const handleSubmit = async (
    formData: FormData
  ) => {
    const result = await loginAction(formData)
    if (!result?.success) {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
        <form action={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mật khẩu</label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >Đăng nhập
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Chưa có tài khoản? <Link href="/register" className="text-blue-600 hover:underline">Đăng ký</Link>
        </p>
      </div>
    </div>
  )
}