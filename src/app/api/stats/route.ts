import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "@/utils/utils";
import moment from "moment";

export async function GET(req: NextRequest) {
  try {
    const header = req.headers;
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
    const searchParams = req.nextUrl.searchParams

    if(!searchParams.get("startDate")) {
      searchParams.set("startDate", moment().subtract(30, "day").startOf("day").unix().toString());
    }
    if(!searchParams.get("endDate")) {
      searchParams.set("endDate", moment().startOf("day").unix().toString());
    }
    if(!searchParams.get("type")) {
      searchParams.set("type", "day")
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/admin/sale-reports/revenue?${searchParams}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    )
    const {data, message} = await res.json();
    return new NextResponse(JSON.stringify({ stats: data || [], message }), { status: res.status });

  } catch (error) {
    return new NextResponse(JSON.stringify({ stats: [], message: "Lỗi kết nối đến Server"}), { status: 500 });
  }
}