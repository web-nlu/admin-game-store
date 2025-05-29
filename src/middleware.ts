import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const tokenValid = await checkToken(accessToken);
  if (!tokenValid && !!refreshToken) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (res.ok) {
      const {accessToken} = await res.json();
      const response = NextResponse.next();

      response.cookies.set('token', accessToken, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
      return response;
    } else {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!dang-nhap|about|_next/static|_next/image|favicon.ico|$).*)',
  ],
};

async function checkToken(accessToken?: string) {
  if (!accessToken) return false;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auth/u/check-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
    return res.ok;
  } catch (error) {
    return false; // Xử lý lỗi network
  }
}