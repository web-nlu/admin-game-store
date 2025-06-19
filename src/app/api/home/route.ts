import {NextRequest, NextResponse} from "next/server";

export async function GET(
  req: NextRequest,
) {
  try {
    const header = req.headers;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/home`, {
      method: 'GET',
      headers: {
        'Authorization': header.get('Authorization') ?? '',
        'Content-Type': 'application/json',
      }
    })
    const {data, message} = await res.json();
    console.log(data);
    return new NextResponse(JSON.stringify({ data: data, message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ data: null, message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}