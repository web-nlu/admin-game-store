import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    try {
      const searchParams = req.nextUrl.searchParams

      if(!searchParams.get("page")) {
        searchParams.set("page", "1");
      }
      if(!searchParams.get("size")) {
        searchParams.set("size", "20");
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/accounts/u/filter-lazyloading?${searchParams}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if(!res.ok) return new NextResponse(JSON.stringify({ }), { status: res.status });
      const {data} = await res.json();

      return new NextResponse(JSON.stringify({ ...data }), {status: 200});
    } catch (error) {
      console.log(error);
      return new NextResponse(JSON.stringify({ }), { status: 500 });
    }
}