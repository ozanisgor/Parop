"use client";

import { Card, CardHeader, CardTitle } from "../../ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { PicksGrid } from "./PicksGrid";

export const EditorsPick = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const postsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts`
      );
      setArticles(postsResponse.data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <Card className="max-w-screen-2xl w-full xl:px-16 lg:px-12 md:px-8 px-4 lg:mb-36 mb-20 bg-primary-foreground shadow-none border-0">
      <CardHeader className="pl-0 md:mb-8 mb-4 max-md:pr-0 max-md:text-center">
        <CardTitle className="md:text-4xl text-3xl font-bold text-primary">
          Editörün Seçtikleri
        </CardTitle>
      </CardHeader>
      <PicksGrid articles={articles} />
    </Card>
  );
};
