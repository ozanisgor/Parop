import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/Post";
import connect from "@/app/api/mongodb";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await connect();

  const searchParams = req.nextUrl.searchParams;
  const limit = parseInt(searchParams.get("limit") || "12");

  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("titleTR slug createdAt imageNum")
      .lean();

    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch latest posts", error: error.message },
      { status: 500 }
    );
  }
}
