import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/api/mongodb";
import Post from "@/models/Post";

export const revalidate = 3600;

export async function GET(req: NextRequest) {
  await connect();

  try {
    const post = await Post.findOne({ isFeatured: true })
      .select("titleTR slug createdAt isFeatured tags imageNum")
      .lean();

    return NextResponse.json(post, {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch featured post", error: error.message },
      { status: 500 }
    );
  }
}
