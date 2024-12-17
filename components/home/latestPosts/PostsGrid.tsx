import Link from "next/link";
import img from "@/public/images/blogImg.jpg";
import Image from "next/image";

type ArticleProps = {
  titleTR: string;
  _id: string;
  createdAt: string;
};

export const PostsGrid = ({ articles }: { articles: ArticleProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-12">
      {articles.map((article) => {
        const { titleTR, _id, createdAt } = article;
        return (
          <div key={_id} className="flex flex-col gap-4">
            <Image
              src={img}
              alt="blog"
              className="rounded-md max-h-72 object-cover w-full"
            />
            <p className="text-xs font-normal text-secondary">{createdAt}</p>
            <Link href={`/${_id}`} className="font-bold text-lg text-secondary">
              <h2>{titleTR}</h2>
            </Link>
            <p className="text-xs font-normal mt-auto text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tristique, purus nec ultricies efficitur
            </p>
          </div>
        );
      })}
    </div>
  );
};
