import axios from "axios";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import { PostsFilter } from "./PostsFilter";
import { PostsGrid } from "./PostsGrid";

export default async function LatestPosts() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/latest`,
    {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    }
  );
  const articles = await data.json();

  return (
    <Card className="max-w-screen-2xl w-full xl:px-16 lg:px-12 md:px-8 px-4 mt-20 bg-primary-foreground shadow-none border-0">
      <CardHeader className="pl-0 max-md:pr-0 max-md:text-center pb-2">
        <CardTitle className="md:text-4xl text-3xl font-bold text-primary">
          En Son Yazılar
        </CardTitle>
      </CardHeader>
      <PostsFilter />
      {articles && articles.length > 0 ? (
        <PostsGrid articles={articles} />
      ) : (
        <div>Yükleniyor</div>
      )}
    </Card>
  );
}
