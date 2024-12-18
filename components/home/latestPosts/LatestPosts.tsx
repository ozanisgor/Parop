"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import { PostsFilter } from "./PostsFilter";
import { PostsGrid } from "./PostsGrid";

const LatestPosts = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const postsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts`
      );
      setArticles(postsResponse.data.slice(0, 8));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <Card className="max-w-screen-2xl w-full xl:px-16 lg:px-12 md:px-8 px-4 xl:my-36 lg:my-24 md:my-16 my-8 bg-primary-foreground shadow-none border-0">
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
};

export default LatestPosts;
