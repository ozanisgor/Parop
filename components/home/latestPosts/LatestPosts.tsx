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
      setArticles(postsResponse.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <Card className="max-w-screen-2xl w-full xl:px-16 lg:px-12 md:px-8 px-4 my-36 bg-primary-foreground">
      <CardHeader className="pl-0">
        <CardTitle className="text-4xl font-bold text-primary">
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
