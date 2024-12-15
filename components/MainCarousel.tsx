"use client";
import * as React from "react";
import img1 from "@/public/images/mainSlider1.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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
      <div className="flex flex-col bottom-20 items-start absolute w-full z-10 left-16 max-md:hidden text-primary-foreground gap-2 max-w-lg">
        <Badge
          variant="secondary"
          className="text-primary-foreground  py-1 px-3 uppercase hover:bg-secondary"
        >
          Ethereum
        </Badge>
        <h2 className="text-2xl font-semibold">
          Dev Yatırım Fonu Ethereum ETF&apos;si İçin Önemli Bir Adım Attı
        </h2>

        <span>12.12.2024</span>

        <div className="flex items-center w-full gap-2 mt-4">
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
              <div className="relative top-0 left-0 w-full 2xl:h-[40rem] xl:h-[36rem] lg:h-[32rem] h-[26rem] z-0 cursor-pointer">
                <Image
                  src={img1}
                  alt={`Slide ${index + 1}`}
                  width={1920}
                  height={700}
                  className="object-cover w-full h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
