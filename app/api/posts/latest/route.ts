import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/Post";
import connect from "@/app/api/mongodb";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await connect();

  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .limit(8)
      .select("titleTR slug content createdAt editorsPick")
      .lean();

    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });

    // return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch latest posts", error: error.message },
      { status: 500 }
    );
  }
}
