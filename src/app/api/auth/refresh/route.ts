import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auth/u/refresh-token`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if(!res.ok) return new NextResponse(JSON.stringify({success: false}), { status: res.status });
    const {data} = await res.json();
    return new NextResponse(JSON.stringify({ success: true, ...data }), {status: 200});
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({success: false}), { status: 500 });
  }
}