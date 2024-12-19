import img from "@/public/images/editorsPick.jpg";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Roboto } from "next/font/google";

type ArticleProps = {
  titleTR: string;
  _id: string;
  createdAt: string;
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
        const { titleTR, _id, createdAt } = article;
        return (
          <div key={_id} className="flex flex-col gap-4 relative">
            <Image
              src={img}
              alt="blog"
              className="rounded-md max-h-96 object-cover w-full brightness-75"
            />
            <Badge
              className={`absolute bg-transparent/30 rounded-lg top-5 right-5 text-primary-foreground md:py-1 md:px-3 py-0 px-2 uppercase hover:bg-transparent/30 md:text-xs text-[9px] leading-4 list-none tracking-wider ${roboto.className}`}
            >
              <span className="">Ethereum</span>
            </Badge>
            <div className="flex flex-col left-0 top-1/2 transform -translate-y-1/4 items-start absolute w-full max-w-xs z-10 text-primary-foreground lg:gap-4 gap-2 p-4 xl:p-10">
              <span className="md:text-xs font-normal text-[9px] leading-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {new Intl.DateTimeFormat("tr-TR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).format(new Date(createdAt))}
              </span>
              <h2 className="text-lg font-bold leading-snug drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {titleTR}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};
