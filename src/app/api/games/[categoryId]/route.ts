import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "@/utils/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const {categoryId} = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/game/u/category/${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const {data, message} = await res.json();
    return new NextResponse(JSON.stringify({ games: data ?? [], message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ games: [], message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }) {
  try {
    const { categoryId } = await params;
    const header = req.headers;
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/game/update/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      } ,
      body: JSON.stringify(body),
    })
    const {data, message} = await res.json();
    return new NextResponse(JSON.stringify({ games: data ?? [], message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ games: [], message: "Lỗi hệ thống" }), { status: 500 });
  }
}