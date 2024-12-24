import Link from "next/link";
import Image from "next/image";

type ArticleProps = {
  titleTR: string;
  _id: string;
  createdAt: string;
  content: string;
  imageNum: number;
};

export const PostsGrid = ({ articles }: { articles: ArticleProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-y-14 gap-y-20">
      {articles.map((article) => {
        const { titleTR, _id, createdAt, imageNum = 1 } = article;
        return (
          <div key={_id} className="flex flex-col gap-2">
            <Link href={`/${_id}`}>
              {imageNum && (
                <Image
                  src={`/images/btc/btc-${imageNum}.jpeg`}
                  width={300}
                  height={300}
                  alt="blog image"
                  placeholder="blur"
                  blurDataURL={`/images/btc/btc-${imageNum}.jpeg`}
                  className="rounded-md md:h-72 h-64 object-cover w-full max-h-72"
                />
              )}
            </Link>
            <p className="text-xs font-normal text-secondary mt-3">
              {new Intl.DateTimeFormat("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(new Date(createdAt))}
            </p>
            <Link href={`/${_id}`} className="font-bold text-lg text-secondary">
              <h2>{titleTR}</h2>
            </Link>
            {/* <p className="text-xs font-normal mt-auto text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tristique, purus nec ultricies efficitur
            </p> */}
          </div>
        );
      })}
    </div>
  );
};
