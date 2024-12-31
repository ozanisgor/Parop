import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/Post";
import connect from "@/app/api/mongodb";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connect();

  const blogSlug = (await params).slug;

  // await delay(1000);
  try {
    const post = await Post.findOne({ slug: blogSlug })
      .select(
        "titleTR slug content createdAt editorsPick imageNum tags readingTime"
      )
      .lean();
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch post", error: error.message },
      { status: 500 }
    );
  }
}
