import Link from "next/link";
import Image from "next/image";
import blurPlaceholders from "@/lib/blurPlaceholders.json";

interface Post {
  titleTR: string;
  slug: string;
  createdAt: string;
  imageNum: number;
  tags: string[];
}

export const PostsGrid = ({ articles }: { articles: Post[] }) => {
  return (
    <div className="flex flex-col gap-2">
      <Link
        href={"/blog"}
        className="flex mb-2 text-sm sm:justify-end justify-center h-7 bg-primary-foreground items-center rounded-full text-center font-medium text-muted-foreground transition-colors hover:text-secondary-foreground data-[active=true]:bg-transparent data-[active=true]:text-secondary-foreground w-full px-2"
      >
        Hepsini İncele
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-y-14 gap-y-20">
        {articles &&
          articles.map((article) => {
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
          })}
      </div>
    </div>
  );
};
