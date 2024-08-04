import mongoose, { Document, Schema } from "mongoose";

interface IPost extends Document {
  title: string;
  titleTR: string;
  content: string;
  link: string;
  slug: string;
}

const postSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    titleTR: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: [true, "Please provide a link"],
    },
    slug: {
      type: String,
      required: true,
    },
    // TODO: image upload
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);

export default Post;
