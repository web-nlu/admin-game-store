import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "@/utils/utils";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const header = req.headers;
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/accounts/images/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      } ,
      body: JSON.stringify(body),
    })
    const {data, message} = await res.json();
    return new NextResponse(JSON.stringify({ images: data, message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ images: null, message: "Lỗi hệ thống" }), { status: 500 });
  }
}