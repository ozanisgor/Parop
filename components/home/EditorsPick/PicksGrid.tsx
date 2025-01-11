import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Roboto } from "next/font/google";
import Link from "next/link";

type ArticleProps = {
  titleTR: string;
  _id: string;
  createdAt: string;
  imageNum: number;
  slug: string;
};

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const PicksGrid = ({ articles }: { articles: ArticleProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
      {articles.map((article) => {
        const { titleTR, _id, createdAt, imageNum, slug } = article;
        return (
          <div key={_id} className="flex flex-col gap-4 relative">
            <Link href={`/blog/${slug}`}>
              <Image
                src={`/images/btc/btc-${imageNum}.webp`}
                width={384}
                height={384}
                alt="blog"
                className="rounded-md max-h-96 min-h-64 object-cover w-full brightness-75"
              />
              <Badge
                lang="tr"
                className={`absolute bg-transparent/30 rounded-lg top-5 right-5 text-primary-foreground md:py-1 md:px-3 py-0 px-2 uppercase hover:bg-transparent/30 md:text-xs text-[9px] leading-4 list-none tracking-wider ${roboto.className}`}
              >
                <span className="">Bitcoin</span>
              </Badge>
              <div className="flex flex-col absolute left-0 bottom-0 items-start w-full md:max-w-sm max-w-xs z-10 text-primary-foreground gap-2 px-4 xl:px-10 pb-4">
                <span className="md:text-xs font-normal text-[9px] leading-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  {new Intl.DateTimeFormat("tr-TR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(new Date(createdAt))}
                </span>
                <h2 className="xl:text-lg lg:text-base text-sm font-bold leading-snug drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  {titleTR}
                </h2>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
