import BlogItem from "@/components/post/BlogItem";
import { BlogHeader } from "@/components/post/BlogHeader";
import { Separator } from "@/components/ui/separator";
import { BlogFooter } from "@/components/post/BlogFooter";
import EditorsPick from "@/components/home/EditorsPick/EditorsPick";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`
  );
  const blogPost = await data.json();

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
        <BlogItem />
      </div>
      <BlogFooter />
      <EditorsPick />
    </main>
  );
}
