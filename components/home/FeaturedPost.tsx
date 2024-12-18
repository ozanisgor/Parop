import Image from "next/image";
import img1 from "@/public/images/mainSlider1.jpg";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const FeaturedPost = () => {
  return (
    <div className="relative max-w-screen-2xl mx-auto w-full max-lg:my-8 max-md:my-16">
      <div className="flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center absolute w-full text-primary-foreground md:gap-2 gap-1 max-w-xl px-4 z-10">
        <Badge
          className={`text-primary-foreground bg-transparent/30 rounded-lg md:py-1 md:px-3 py-0 px-2 uppercase hover:bg-transparent/30 md:text-xs text-[9px] leading-4 list-none tracking-wider ${roboto.className}`}
        >
          <span className="">Ethereum</span>
        </Badge>
        <div className="md:text-4xl text-sm font-bold text-center md:mt-3 mt-1 leading-snug drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Dev Yatırım Fonu Ethereum ETF&apos;si İçin Önemli Bir Adım Attı
        </div>
        <Separator className="md:my-2 my-1 w-8" />
        <span className="md:text-xs font-normal text-[9px] leading-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          12.12.2024
        </span>
      </div>
      <Image
        src={img1}
        alt="Featured Post"
        width={1440}
        height={600}
        className="object-cover w-full h-full brightness-75"
      />
    </div>
  );
};
