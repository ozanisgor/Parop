"use client";
import * as React from "react";
import img1 from "@/public/images/mainSlider1.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export function MainCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleSliderChange = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className="mx-auto relative">
      <div className="flex flex-col lg:bottom-20 bottom-10 items-start absolute w-full z-10 md:left-16 left-4  text-primary-foreground gap-4 md:max-w-lg max-w-72">
        <Badge
          className={`tracking-wider text-primary-foreground bg-transparent/30 rounded-lg lg:py-1 lg:px-3 py-0 px-2 uppercase hover:bg-transparent/30 ${roboto.className}`}
        >
          <span className="">Ethereum</span>
        </Badge>
        <h2 className="xl:text-4xl lg:text-3xl md:text-2xl text-sm font-bold lg:mt-2 xl:mt-3 mt-1 leading-snug drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Dev Yatırım Fonu Ethereum ETF&apos;si İçin Önemli Bir Adım Attı
        </h2>
        <Separator className="w-8" />
        <span className="md:text-xs font-normal text-[9px] leading-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          12.12.2024
        </span>

        <div className="flex items-center w-full gap-2 lg:mt-16 mt-4">
          {Array.from({ length: 5 }).map((_, index) => (
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
      <Carousel setApi={setApi} className="">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="relative top-0 left-0 w-full 2xl:h-[40rem] xl:h-[36rem] lg:h-[32rem] md:h-[28rem] h-[24rem] z-0 cursor-pointer">
                <Image
                  src={img1}
                  alt={`Slide ${index + 1}`}
                  width={1440}
                  height={600}
                  className="object-cover w-full h-full brightness-75"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="left-3 2xl:left-5 w-8 h-8" />
        <CarouselNext className="right-3 2xl:right-5 w-8 h-8" /> */}
      </Carousel>
    </div>
  );
}
