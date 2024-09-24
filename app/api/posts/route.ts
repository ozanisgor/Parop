import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Post from "@/models/Post";
import "dotenv/config";
import connect from "@/lib/mongodb";
export async function GET() {
  await connect();
  try {
    const posts = await Post.find({});
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
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
