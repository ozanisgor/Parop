import { Card, CardHeader, CardTitle } from "../../ui/card";
import { PicksGrid } from "./PicksGrid";

export const revalidate = 3600;

export default async function EditorsPick() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/editors-picks`
  );
  const articles = await data.json();

  return (
    <Card className="max-w-screen-2xl w-full xl:px-16 lg:px-12 md:px-8 px-4 my-20 bg-primary-foreground shadow-none border-0">
      <CardHeader className="pl-0 md:mb-8 mb-4 max-md:pr-0 max-md:text-center">
        <CardTitle className="md:text-4xl text-3xl font-bold text-primary">
          Editörün Seçtikleri
        </CardTitle>
      </CardHeader>
      <PicksGrid articles={articles} />
    </Card>
  );
}
