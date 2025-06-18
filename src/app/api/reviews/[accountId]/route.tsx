import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ accountId: string }> }) {
  try {
    const searchParams = req.nextUrl.searchParams
    const { accountId } = await params;
    if(!searchParams.get("page")) {
      searchParams.set("page", "1");
    }
    if(!searchParams.get("size")) {
      searchParams.set("size", "10");
    }
    if(!searchParams.get("isHide")) {
      searchParams.set("isHide", "false");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/reviews/u/get-reviews/${accountId}?${searchParams}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const {data, message} = await res.json();
    return new NextResponse(JSON.stringify({ reviews: data?.data || [], totalElements: data?.totalElements || 0, message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ reviews: [], totalElements: 0, message: (error as Error).message }), { status: 500 });
  }
}