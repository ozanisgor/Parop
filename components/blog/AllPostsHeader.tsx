import img from "@/public/images/btc-5.webp";
import Image from "next/image";

function BlogListHeader() {
  return (
    <div className="relative top-0 left-0 w-full 2xl:h-[40rem] xl:h-[36rem] lg:h-[32rem] md:h-[28rem] h-[24rem] z-0 max-w-screen-2xl mx-auto select-none">
      <Image
        src={img}
        alt="blog header image"
        fill
        priority
        placeholder="blur"
        className="object-cover w-full h-full brightness-75 pointer-events-none"
        draggable="false"
      />
    </div>
  );
}
export default BlogListHeader;
