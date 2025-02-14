import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/Post";
import connect from "@/app/api/mongodb";

export async function GET(req: NextRequest) {
  await connect();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") ?? "12"))
    );
    const searchQuery = searchParams.get("q") ?? "";

    const skip = (page - 1) * limit;

    let query: any = {};

    if (searchQuery) {
      query.$or = [
        { titleTR: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
        { tags: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const [posts, total] = await Promise.all([
      Post.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("titleTR slug createdAt imageNum tags")
        .lean(),
      Post.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        posts,
        pagination: {
          total,
          page,
          pages: totalPages,
          hasMore: page < totalPages,
          nextPage: page < totalPages ? page + 1 : null,
          prevPage: page > 1 ? page - 1 : null,
        },
      }
      // Cache for 1 minute
      // {
      //   headers: {
      //     'Cache-Control': 'public, max-age=60',
      //   }
      // }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch posts", error: error.message },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  await connect();
  try {
    const body = await req.json();
    const post = await Post.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
