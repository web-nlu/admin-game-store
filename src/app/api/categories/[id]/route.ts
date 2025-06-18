import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "@/utils/utils";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const header = req.headers;
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/category/update/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      } ,
      body: JSON.stringify(body),
    })
    const {data, message} = await res.json();

    if(!res.ok) return new NextResponse(JSON.stringify({ category: null, message }), { status: res.status });
    return new NextResponse(JSON.stringify({ category: data, message }), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({ category: null, message: "Lỗi hệ thống" }), { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const header = req.headers;
  const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
  const { id } = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/category/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    const { message } = await res.json();
    return new NextResponse(JSON.stringify({ message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Lỗi hệ thống" }), { status: 500 });
  }
}