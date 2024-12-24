import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/Post";
import connect from "@/app/api/mongodb";
import { log } from "console";

export const dynamic = "force-dynamic";
// export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connect();

  const searchParams = req.nextUrl.searchParams;
  const limit = parseInt(searchParams.get("limit") || "8");

  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("titleTR slug content createdAt editorsPick imageNum")
      .lean();

    // return NextResponse.json(posts, {
    //   headers: {
    //     "Cache-Control": "no-store, max-age=0",
    //   },
    // });

    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch latest posts", error: error.message },
      { status: 500 }
    );
  }
}
