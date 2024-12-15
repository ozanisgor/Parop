"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MainCarousel } from "./MainCarousel";

const Blog = () => {
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
    <div className="w-full mx-auto">
      <div className="max-w-screen-2xl mx-auto">
        <MainCarousel />
      </div>
      <ul className="flex flex-col">
        {articles.map((article) => {
          const { titleTR, _id, createdAt } = article;
          return (
            <li key={_id}>
              <Link href={`/${_id}`}>
                <h2>{titleTR}</h2>
                <p className="text-sm">{createdAt}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Blog;
