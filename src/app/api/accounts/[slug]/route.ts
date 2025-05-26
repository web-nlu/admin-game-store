import {NextRequest, NextResponse} from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/accounts/u/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(!res.ok) return new NextResponse(JSON.stringify({ account: null }), { status: res.status });
    const {data} = await res.json();

    return new NextResponse(JSON.stringify({ account: data }), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({ account: null }), { status: 500 });
  }
}