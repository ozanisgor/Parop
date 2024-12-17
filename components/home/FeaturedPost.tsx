import Image from "next/image";
import img1 from "@/public/images/mainSlider1.jpg";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export const FeaturedPost = () => {
  return (
    <div className="relative max-w-screen-2xl mx-auto w-full mb-36">
      <div className="flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center absolute w-full text-primary-foreground md:gap-2 gap-1 max-w-xl px-4">
        <Badge
          variant="secondary"
          className="text-primary-foreground md:py-1 md:px-3 py-0 px-2 uppercase hover:bg-secondary md:text-xs text-[9px] leading-4 list-none"
        >
          Ethereum
        </Badge>
        <h2 className="md:text-4xl text-sm font-bold text-center md:mt-3 mt-1 leading-snug">
          Dev Yatırım Fonu Ethereum ETF&apos;si İçin Önemli Bir Adım Attı
        </h2>
        <Separator className="md:my-2 my-1 w-8" />
        <span className="md:text-xs font-normal text-[9px] leading-4">
          12.12.2024
        </span>
      </div>
      <Image
        src={img1}
        alt="Featured Post"
        width={1440}
        height={600}
        className="object-cover w-full h-full"
      />
    </div>
  );
};
