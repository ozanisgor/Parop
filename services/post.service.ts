// services/post.service.ts
import Post from "@/models/Post";
import connect from "@/app/api/mongodb";

export class PostService {
  static async connect() {
    await connect();
  }

  static async getLatestPosts(limit = 8) {
    await this.connect();

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("titleTR slug content createdAt");

    return posts;
  }

  static async checkDuplicate(title: string): Promise<boolean> {
    await this.connect();
    const existingPost = await Post.findOne({ title });
    return !!existingPost;
  }

  static async createPost(data: {
    title: string;
    titleTR: string;
    content: string;
    link: string;
    slug: string;
  }) {
    await this.connect();
    const post = await Post.create(data);
    return post;
  }
}
