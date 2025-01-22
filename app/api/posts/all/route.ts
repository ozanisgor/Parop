import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/api/mongodb";
import Post from "@/models/Post";

export async function GET(req: NextRequest) {
  await connect();

  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .select("updatedAt slug")
      .lean();

    if (!posts) {
      return NextResponse.json({ message: "Posts not found" }, { status: 404 });
    }

    return NextResponse.json(posts, {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch posts", error: error.message },
      { status: 500 }
    );
  }
}
