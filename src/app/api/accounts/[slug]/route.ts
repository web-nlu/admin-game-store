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


export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const token = req.cookies.get("token")?.value;
    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/accounts/update-account/${slug}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      } ,
      body: JSON.stringify(body),
    })
    const {data, message} = await res.json();
    return new NextResponse(JSON.stringify({ account: data, message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ account: null, message: "Lỗi hệ thống" }), { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const token = req.cookies.get("token")?.value;
  const { slug } = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/accounts/delete-account/${slug}`, {
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