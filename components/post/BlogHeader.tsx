import Image from "next/image";
import { Badge } from "../ui/badge";
import { Roboto } from "next/font/google";
import { Separator } from "../ui/separator";
import blurPlaceholders from "@/lib/blurPlaceholders.json";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface BlogHeaderProps {
  _id: string;
  titleTR: string;
  tags: string[];
  slug: string;
  imageNum: string;
  readingTime: string;
  createdAt: string;
}

export const BlogHeader = ({ blogPost }: { blogPost: BlogHeaderProps }) => {
  const { titleTR, tags, imageNum, createdAt } = blogPost;

  return (
    <div className="relative top-0 left-0 w-full 2xl:h-[40rem] xl:h-[36rem] lg:h-[32rem] md:h-[28rem] h-[24rem] z-0 max-w-screen-2xl mx-auto select-none">
      <Image
        src={`/images/btc/btc-${imageNum}.jpeg`}
        alt="blog header image"
        fill
        priority
        placeholder="blur"
        blurDataURL={
          blurPlaceholders[imageNum as keyof typeof blurPlaceholders]
        }
        className="object-cover w-full h-full brightness-75 pointer-events-none"
        draggable="false"
      />
      <div className="flex flex-col lg:bottom-20 bottom-10 items-start absolute w-full z-10 md:left-16 left-4  text-primary-foreground gap-4 md:max-w-lg max-w-72">
        <div className="flex flex-wrap gap-2">
          <Badge
            lang="tr"
            className={`text-primary-foreground bg-transparent/30 rounded-lg md:py-1 md:px-3 py-0 px-2 uppercase hover:bg-transparent/30 md:text-xs text-[9px] leading-4 list-none tracking-wider ${roboto.className}`}
          >
            <span className="">Bitcoin</span>
          </Badge>
          <Badge
            lang="tr"
            className={`text-primary-foreground bg-transparent/30 rounded-lg md:py-1 md:px-3 py-0 px-2 uppercase hover:bg-transparent/30 md:text-xs text-[9px] leading-4 list-none tracking-wider ${roboto.className}`}
          >
            <span className="">
              {tags?.length > 0 &&
                (tags[0] === "bitcoin" ? tags[1] || tags[0] : tags[0])}
            </span>
          </Badge>
        </div>
        <h2 className="xl:text-4xl lg:text-3xl md:text-2xl text-sm font-bold lg:mt-2 xl:mt-3 mt-1 leading-snug drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {titleTR}
        </h2>
        <Separator className="w-8" />
        <span className="md:text-xs font-normal text-[9px] leading-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {createdAt &&
            new Intl.DateTimeFormat("tr-TR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).format(new Date(createdAt))}
        </span>
      </div>
    </div>
  );
};
