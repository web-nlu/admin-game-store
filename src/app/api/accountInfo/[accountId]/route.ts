import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "@/utils/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ accountId: string }> }) {
  try {
    const { accountId } = await params;
    const header = req.headers;
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/accounts/info/${accountId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if(!res.ok) return new NextResponse(JSON.stringify({ info: {} }), { status: res.status });
    const {data} = await res.json();
    return new NextResponse(JSON.stringify({ info: data }), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({ info: {} }), { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ accountId: string }> }) {
  try {
    const { accountId } = await params;
    const header = req.headers;
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/accounts/info/${accountId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      } ,
      body: JSON.stringify(body),
    })
    const {data, message} = await res.json();
    return new NextResponse(JSON.stringify({ info: data || {}, message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ info: {}, message: "Lỗi hệ thống" }), { status: 500 });
  }
}
