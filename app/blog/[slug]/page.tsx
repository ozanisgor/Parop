import BlogItem from "@/components/post/BlogItem";
import { BlogHeader } from "@/components/post/BlogHeader";
import { Separator } from "@/components/ui/separator";
import { BlogFooter } from "@/components/post/BlogFooter";
import EditorsPick from "@/components/home/EditorsPick/EditorsPick";
import { Suspense } from "react";
import Loading from "./loading";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

const url = process.env.NEXT_PUBLIC_API_URL;

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postSlug = (await params).slug;

  const post = await getPost({ slug: postSlug });

  const image = `${process.env.NEXT_PUBLIC_API_URL}/images/btc/btc-${post.imageNum}.webp`;
  return {
    title: { absolute: post.titleTR },
    description: post.description,
    keywords: post.tags,
    referrer: "origin-when-cross-origin",
    openGraph: {
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${post.titleTR} blog resmi`,
        },
      ],
      title: post.titleTR,
      description: post.description,
      type: "article",
      publishedTime: post.createdAt,
      url: `${process.env.NEXT_PUBLIC_API_URL}/blog/${postSlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.titleTR,
      description: post.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${post.titleTR} blog resmi`,
        },
      ],
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
  const postSlug = (await params).slug;

  const post = await getPost({ slug: postSlug });
  const image = `${process.env.NEXT_PUBLIC_API_URL}/images/btc/btc-${post.imageNum}.webp`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/blog/${postSlug}`,
    mainEntityOfPage: `${url}/blog/${postSlug}`,
    name: post.titleTR,
    description: post.description,
    datePublished: new Date(post.createdAt).toISOString(),
    headline: post.titleTR,
    author: {
      "@type": "Organization",
      "@id": url,
      name: "iBlogger",
      url: url,
      // "image": {
      //     "@type": "ImageObject",
      //     "@id": "https://secure.gravatar.com/avatar/bbdd78abba6116d6f5bfa2c992de6592?s=96&d=mm&r=g",
      //     "url": "https://secure.gravatar.com/avatar/bbdd78abba6116d6f5bfa2c992de6592?s=96&d=mm&r=g",
      //     "height": "96",
      //     "width": "96"
      // }
    },
    publisher: {
      "@type": "Organization",
      "@id": url,
      name: "iBlogger",
      url: url,
      logo: {
        "@type": "ImageObject",
        "@id": `${url}/public/images/parop-logo-golden.webp`,
        url: `${url}/public/images/parop-logo-golden.webp`,
        width: "600",
        height: "60",
      },
    },
    image: {
      "@type": "ImageObject",
      "@id": image,
      url: [image],
      height: "630",
      width: "1200",
    },
    url: `${url}/blog/${postSlug}`,
    isPartOf: {
      "@type": "Blog",
      "@id": `${url}/blog`,
      name: "iBlogger",
      publisher: {
        "@type": "Organization",
        "@id": url,
        name: "iBlogger",
      },
    },
    keywords: post.tags,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<Loading />}>
        <BlogPost slug={postSlug} />
      </Suspense>
    </>
  );
}
