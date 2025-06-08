import {NextRequest, NextResponse} from "next/server";

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