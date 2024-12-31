import { Card, CardHeader, CardTitle } from "../../ui/card";
import { PostsFilter } from "./PostsFilter";
import { PostsGrid } from "./PostsGrid";

export const dynamic = "force-dynamic";

export default async function LatestPosts() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/latest`,
    {
      // next: { revalidate: 0 },
      cache: "no-store",
    }
  );
  const articles = await data.json();

  return (
    <Card className="max-w-screen-2xl w-full xl:px-16 lg:px-12 md:px-8 px-4 lg:mt-20 md:mt-16 mt-12 bg-primary-foreground shadow-none border-0">
      <CardHeader className="pl-0 max-md:pr-0 max-md:text-center pb-2">
        <CardTitle className="md:text-4xl text-3xl font-bold text-primary">
          En Son Yazılar
        </CardTitle>
      </CardHeader>
      <PostsFilter />
      <PostsGrid articles={articles} />
    </Card>
  );
}
