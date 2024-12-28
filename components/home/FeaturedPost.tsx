import Image from "next/image";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Roboto } from "next/font/google";
import Link from "next/link";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const FeaturedPost = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/featured`
  );
  const post = await data.json();
  const { titleTR, slug, createdAt, tags, imageNum } = post;
  return (
    <div className="w-full">
      <h3 className="tracking-tight md:text-4xl text-3xl font-bold text-primary p-6 pl-0 md:mb-8 mb-4 max-md:pr-0 text-center mt-20">
        Öne Çıkan Yazı
      </h3>
      <Link
        href={`/${slug}`}
        className="relative max-w-screen-2xl mx-auto w-full mt-20"
      >
        <div className="flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center absolute w-full text-primary-foreground md:gap-2 gap-1 max-w-xl px-4 z-10 backdrop-brightness-100 backdrop-blur-sm py-4">
          <Badge
            className={`text-primary-foreground bg-transparent/25 rounded-lg md:py-1 md:px-3 py-0 px-2 uppercase hover:bg-transparent/25 md:text-xs text-[9px] leading-4 list-none tracking-wider ${roboto.className}`}
          >
            <span className="">{tags[0]}</span>
          </Badge>
          <div className="md:text-4xl text-sm font-bold text-center md:mt-3 mt-1 leading-snug drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {titleTR}
          </div>
          <Separator className="md:my-2 my-1 w-8" />
          <span className="md:text-xs font-normal text-[9px] leading-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
            {new Intl.DateTimeFormat("tr-TR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).format(new Date(createdAt))}
          </span>
        </div>
        <div className="w-full 2xl:h-[40rem] xl:h-[36rem] lg:h-[32rem] md:h-[28rem] h-[24rem] max-w-screen-2xl mx-auto select-none">
          <Image
            src={`/images/btc/btc-${imageNum}.jpeg`}
            alt="blog header image"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            quality={85}
            placeholder="blur"
            blurDataURL={`/images/btc/btc-${imageNum}.jpeg`}
            className="object-cover w-full h-full brightness-75 pointer-events-none"
            draggable="false"
          />
        </div>
      </Link>
    </div>
  );
};
