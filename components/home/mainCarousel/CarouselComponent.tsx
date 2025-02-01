"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Separator } from "../../ui/separator";
import { Roboto } from "next/font/google";
import blurPlaceholders from "@/lib/blurPlaceholders.json";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

type ArticleProps = {
  titleTR: string;
  _id: string;
  createdAt: string;
  content: string;
  imageNum: string;
};

export default function CarouselComponent({
  articles,
}: {
  articles: ArticleProps[];
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleSliderChange = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
  };

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
      setApi={setApi}
      className=""
    >
      <CarouselContent>
        {articles.map((article, index) => {
          const { titleTR, _id, createdAt, imageNum } = article;

          return (
            <CarouselItem key={_id}>
              <div className="relative top-0 left-0 w-full 2xl:h-[40rem] xl:h-[36rem] lg:h-[32rem] md:h-[28rem] h-[24rem] z-0 cursor-pointer select-none">
                <Image
                  src={`/images/btc/btc-${imageNum}.webp`}
                  alt={`${article.titleTR} blog resmi`}
                  fill
                  priority={index === 0}
                  placeholder="blur"
                  blurDataURL={
                    blurPlaceholders[imageNum as keyof typeof blurPlaceholders]
                  }
                  className="object-cover w-full h-full brightness-75"
                />
                <div className="flex flex-col lg:bottom-20 bottom-10 items-start absolute w-full z-10 md:left-16 left-4  text-primary-foreground gap-4 md:max-w-lg max-w-72">
                  <Badge
                    lang="tr"
                    className={`text-primary-foreground bg-transparent/30 rounded-lg md:py-1 md:px-3 py-0 px-2 uppercase hover:bg-transparent/30 md:text-xs text-[9px] leading-4 list-none tracking-wider ${roboto.className}`}
                  >
                    <span className="">Bitcoin</span>
                  </Badge>
                  <h2 className="xl:text-4xl lg:text-3xl md:text-2xl text-sm font-bold lg:mt-2 xl:mt-3 mt-1 leading-snug drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {titleTR}
                  </h2>
                  <Separator className="w-8" />
                  <span className="md:text-xs font-normal text-[9px] leading-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {new Intl.DateTimeFormat("tr-TR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(createdAt))}
                  </span>

                  <div className="flex items-center w-full gap-2 lg:mt-16 mt-4">
                    {Array.from({ length: articles.length }).map((_, index) => (
                      <span
                        key={index}
                        className={`cursor-pointer ${
                          current === index
                            ? "w-3 h-3 rounded-full bg-primary-foreground"
                            : "w-3 h-3 rounded-full bg-secondary-foreground"
                        }`}
                        onClick={() => handleSliderChange(index)}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      {/* <CarouselPrevious className="left-3 2xl:left-5 w-8 h-8" />
      <CarouselNext className="right-3 2xl:right-5 w-8 h-8" /> */}
    </Carousel>
  );
}
