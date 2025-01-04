import Image from "next/image";
import Link from "next/link";
import blurPlaceholders from "@/lib/blurPlaceholders.json";

interface Post {
  titleTR: string;
  slug: string;
  createdAt: string;
  imageNum: number;
  tags: string[];
}

async function fetchArticles(query: string, currentPage: number) {
  const params = new URLSearchParams();

  if (query) {
    params.append("q", query);
  }
  params.append("page", currentPage.toString());
  params.append("limit", "12");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?${params.toString()}`
  );
  const data = await response.json();
  return data;
}

export default async function AllPostsGrid({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { posts, pagination } = await fetchArticles(query, currentPage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-y-14 gap-y-20">
      {posts?.length > 0 ? (
        posts.map((article: Post) => {
          const { titleTR, createdAt, imageNum = "1", slug } = article;
          return (
            <div key={slug} className="flex flex-col gap-2">
              <Link href={`/blog/${slug}`}>
                {imageNum && (
                  <Image
                    src={`/images/btc/btc-${imageNum}.jpeg`}
                    width={300}
                    height={300}
                    alt="blog image"
                    placeholder="blur"
                    blurDataURL={
                      blurPlaceholders[
                        imageNum as keyof typeof blurPlaceholders
                      ]
                    }
                    className="rounded-md md:h-72 h-64 object-cover w-full max-h-72"
                  />
                )}
              </Link>
              <p className="text-xs font-normal text-secondary mt-3">
                {new Intl.DateTimeFormat("tr-TR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).format(new Date(createdAt))}
              </p>
              <Link
                href={`/blog/${slug}`}
                className="font-bold text-lg text-secondary my-auto"
              >
                <h2>{titleTR}</h2>
              </Link>
            </div>
          );
        })
      ) : (
        <div className="col-span-4 md:my-20 my-10">
          <p className="text-center text-secondary">
            Aradığınız kriterlerde sonuç bulunamadı.
          </p>
        </div>
      )}
    </div>
  );
}
