import img from "@/public/images/editorsPick.jpg";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type ArticleProps = {
  titleTR: string;
  _id: string;
  createdAt: string;
};

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
              className="rounded-md max-h-96 object-cover w-full "
            />
            <Badge
              variant="secondary"
              className="absolute rounded-lg top-5 right-5 text-primary-foreground md:py-1 md:px-3 py-0 px-2 uppercase hover:bg-secondary md:text-xs text-[9px] leading-4 list-none"
            >
              Ethereum
            </Badge>
            <div className="flex flex-col left-0 bottom-0 items-start absolute w-full max-w-xs z-10 text-primary-foreground lg:gap-4 gap-2 p-4 xl:p-10">
              <span className="md:text-xs font-normal text-[9px] leading-4">
                12.12.2024
              </span>
              <h2 className="text-lg font-bold leading-snug">
                Dev Yatırım Fonu Ethereum ETF&apos;si İçin Önemli Bir Adım Attı
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};
