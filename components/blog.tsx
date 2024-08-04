"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    <main>
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
    </main>
  );
};

export default Blog;
