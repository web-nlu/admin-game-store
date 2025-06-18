import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "@/utils/utils";

export async function GET(req: NextRequest) {
  try {
    const header = req.headers;
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
    const searchParams = req.nextUrl.searchParams

    if(!searchParams.get("page")) {
      searchParams.set("page", "1");
    }
    if(!searchParams.get("size")) {
      searchParams.set("size", "20");
    }
    searchParams.set("role", "STAFF")
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/user?${new URLSearchParams(searchParams)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    if(!res.ok) return new NextResponse(JSON.stringify({ employees: [], totalElements: 0 }), { status: res.status });
    const {data} = await res.json();
    return new NextResponse(JSON.stringify({ employees: data.data, totalElements: data.totalElements }), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({ employees: [], totalElements: 0 }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const header = req.headers;
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/user`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      } ,
      body: JSON.stringify(body),
    })
    const {data, message} = await res.json();
    return new NextResponse(JSON.stringify({ employee: data, message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ employee: null, message: "Lỗi hệ thống" }), { status: 500 });
  }
}