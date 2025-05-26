import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
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