import BlogItem from "@/components/post/BlogItem";
import { BlogHeader } from "@/components/post/BlogHeader";
import { Separator } from "@/components/ui/separator";
import { BlogFooter } from "@/components/post/BlogFooter";
import EditorsPick from "@/components/home/EditorsPick/EditorsPick";
import { Suspense } from "react";
import Loading from "./loading";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

interface Post {
  _id: string;
  titleTR: string;
  tags: string[];
  slug: string;
  imageNum: string;
  readingTime: string;
  createdAt: string;
  content: string;
  description: string;
}

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPost({ slug }: { slug: string }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`
    );

    if (!res.ok) {
      notFound();
    }

    const post: Post = await res.json();
    return post;
  } catch (error: any) {
    notFound();
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const postSlug = (await params).slug;

  const post = await getPost({ slug: postSlug });
  const previousImages = (await parent).openGraph?.images || [];

  const image = `${process.env.NEXT_PUBLIC_API_URL}/images/btc/btc-${post.imageNum}.jpeg`;
  return {
    title: post.titleTR,
    description: post.description,
    openGraph: {
      // images: [image, ...previousImages],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
      title: post.titleTR,
      description: post.description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_API_URL}/blog/${postSlug}`,
    },
  };
}

async function BlogPost({ slug }: { slug: string }) {
  const blogPost = await getPost({ slug });

  return (
    <main className="max-w-screen-2xl mx-auto">
      <BlogHeader blogPost={blogPost} />
      <div className="xl:hidden flex justify-center items-center gap-3 lg:mt-20 mt-10 lg:-mb-20 -mb-14 md:text-xs font-bold text-[9px] leading-4">
        <span className="">
          {blogPost.createdAt &&
            new Intl.DateTimeFormat("tr-TR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).format(new Date(blogPost.createdAt))}
        </span>
        <Separator className="w-7 bg-secondary" />
        <span className="">{blogPost.readingTime}</span>
      </div>
      <div className="grid xl:grid-cols-5 xl:gap-14 lg:gap-12 xl:px-16 px-4">
        <div className="justify-center h-min items-center gap-3 lg:my-40 my-14 md:text-xs font-bold text-[9px] leading-4 col-span-1 hidden xl:flex">
          <span className="">
            {blogPost.createdAt &&
              new Intl.DateTimeFormat("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(new Date(blogPost.createdAt))}
          </span>
          <Separator className="w-7 bg-secondary" />
          <span className="">{blogPost.readingTime}</span>
        </div>
        <BlogItem blogPost={blogPost} />
      </div>
      <BlogFooter tags={blogPost.tags} />
      <EditorsPick />
    </main>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = await params;
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug.slug}`
  // );

  // if (!response.ok) {
  //   notFound();
  // }
  return (
    <Suspense fallback={<Loading />}>
      <BlogPost slug={slug.slug} />
    </Suspense>
  );
}
