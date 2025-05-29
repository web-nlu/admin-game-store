import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "@/utils/utils";

export async function GET(req: NextRequest) {
  try {
    const header = req.headers;
    const searchParams = req.nextUrl.searchParams

    if(!searchParams.get("page")) {
      searchParams.set("page", "1");
    }
    if(!searchParams.get("size")) {
      searchParams.set("size", "20");
    }
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/orders/filter?${new URLSearchParams(searchParams)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })

    const {data, message} = await res.json();

    return new NextResponse(JSON.stringify({ orders: data || [], message }), {status: res.status});
  } catch (e) {
    console.error(e);
    return new NextResponse(JSON.stringify({ orders: [], message: "Lỗi kết nối đến server." }), {status: 500})
  }
}
