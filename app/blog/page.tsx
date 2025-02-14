import { AllPostsFilter } from "@/components/blog/AllPostsFilter";
import AllPostsGrid from "@/components/blog/AllPostsGrid";
import AllPostsGridSkeleton from "@/components/blog/AllPostsGridSkeleton";
import AllPostsPagination from "@/components/blog/AllPostsPagination";
import AllPostsSearch from "@/components/blog/AllPostsSearch";
import AllPostsHeader from "@/components/blog/AllPostsHeader";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import { Metadata } from "next";

const image = `${process.env.NEXT_PUBLIC_API_URL}/images/btc/btc-5.webp`;

export const metadata: Metadata = {
  title: "Yazılar",
  description: "Güncel Bitcoin gelişmeleri hakkında yazıların tümü",
  // referrer: "origin-when-cross-origin",
  // openGraph: {
  //   images: [
  //     {
  //       url: image,
  //       width: 1200,
  //       height: 630,
  //       alt: `Sayfanın bitcoin resmi`,
  //     },
  //   ],
  //   // title: "Yazılar",
  //   // description: "Güncel Bitcoin gelişmeleri hakkında yazıların tümü",
  //   type: "website",
  //   url: `${process.env.NEXT_PUBLIC_API_URL}/blog`,
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Yazılar",
  //   description: "Güncel Bitcoin gelişmeleri hakkında yazıların tümü",
  //   images: [
  //     {
  //       url: image,
  //       width: 1200,
  //       height: 630,
  //       alt: `Sayfanın bitcoin resmi`,
  //     },
  //   ],
  // },
};

export default async function Blogpage(props: {
  searchParams?: Promise<{ q?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";
  const currentPage = Number(searchParams?.page || "1");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${currentPage}&q=${query}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const totalPages = data.pagination.pages;

  return (
    <div className="flex w-full min-h-screen flex-col items-center max-w-screen-2xl mx-auto">
      <AllPostsHeader />
      <Card className="max-w-screen-2xl w-full xl:px-16 lg:px-12 md:px-8 px-4 lg:mt-20 md:mt-16 mt-12 bg-primary-foreground shadow-none border-0">
        <div className="w-full flex flex-col lg:flex-row justify-between px-1 gap-5 items-start lg:items-center mt-1 mb-7">
          <AllPostsFilter />
          <AllPostsSearch placeholder="Arama" />
        </div>
        <Suspense key={query + currentPage} fallback={<AllPostsGridSkeleton />}>
          <AllPostsGrid query={query} currentPage={currentPage} />
        </Suspense>
      </Card>
      <AllPostsPagination totalPages={totalPages} />
    </div>
  );
}
