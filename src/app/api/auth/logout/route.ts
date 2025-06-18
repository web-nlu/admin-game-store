import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "@/utils/utils";

export async function POST(req: NextRequest) {
  try {
    const header = req.headers;
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "")
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auth/u/logout`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    const {message} = await res.json();
    const response = NextResponse.json({message}, {status: res.status});
    response.cookies.delete("token")
    response.cookies.delete("refreshToken")

    return response;

  } catch (error) {
    return new NextResponse(JSON.stringify({message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}