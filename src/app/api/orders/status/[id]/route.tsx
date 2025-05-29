import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "@/utils/utils";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const header = req.headers;
    const body = await req.json();
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/orders/status/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    const {data, message} = await res.json();

    return new NextResponse(JSON.stringify({ order: data, message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ order: null,  message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}