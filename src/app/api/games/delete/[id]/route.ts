import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "@/utils/utils";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const header = req.headers;
  const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
  const { id } = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/game/${id}`, {
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