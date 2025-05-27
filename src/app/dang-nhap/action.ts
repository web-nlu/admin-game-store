'use server'

import {redirect} from 'next/navigation'
import {cookies} from "next/headers";

export async function loginAction(formData: FormData) {
  try {
    const cookieStore = await cookies()
    const email = formData.get('email')
    const password = formData.get('password')

    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    });


    if(!res.ok) {
      return { success: false, message: "Sai email hặc mật khẩu!" }
    }
    const { accessToken, refreshToken } = await res.json();
    cookieStore.set("token", accessToken, {
      httpOnly: true,
      path: "/"
    })
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/"
    })

  } catch (err) {
    return { success: false, message: 'Lỗi kết nối đến server.' }
  }
  redirect('/')
}
