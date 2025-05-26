import {NextRequest, NextResponse} from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/category/u/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(!res.ok) return new NextResponse(JSON.stringify({ categories: [] }), { status: res.status });
    const {data} = await res.json();
    return new NextResponse(JSON.stringify({ categories: data }), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({ categories: [] }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/category/add`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxdWFuZ3RobzIzMDZAZ21haWwuY29tIiwiaWF0IjoxNzQ4MjQ4NjM4LCJleHAiOjE3NTA2Njc4Mzh9.180PiJUI-K7q57GwtiixXnTImBUIJdQl4JSnWvj8N6A',
        'Content-Type': 'application/json'
      } ,
      body: JSON.stringify(body),
    })
    const {data, message} = await res.json();
    return new NextResponse(JSON.stringify({ category: data, message }), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({ category: null, message: "Lỗi hệ thống" }), { status: 500 });
  }
}