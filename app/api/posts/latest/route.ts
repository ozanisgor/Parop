import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/Post";
import connect from "@/app/api/mongodb";

export async function GET(req: NextRequest) {
  await connect();

  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .limit(8)
      .select("titleTR slug content createdAt editorsPick")
      .lean();

    // Cache for 1 minute
    // return NextResponse.json(posts, {
    //   headers: {
    //     "Cache-Control": "public, max-age=60",
    //   },
    // });

    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch latest posts", error: error.message },
      { status: 500 }
    );
  }
}
