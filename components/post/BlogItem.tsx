"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import { useParams } from "next/navigation";

function BlogItem() {
  const [postContentHtml, setPostContentHtml] = useState("");
  const [article, setArticle] = useState({});
  const params = useParams();

  const getPost = useCallback(async () => {
    try {
      const postResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.slug}`
      );
      setArticle(postResponse.data);

      const processedContent = await remark()
        .use(html)
        .process(postResponse.data.content);
      const contentHtml = processedContent.toString();
      setPostContentHtml(contentHtml);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [params.slug]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <div className="prose xl:prose-xl lg:prose-lg md:prose-base prose-sm prose-slate dark:prose-invert lg:mt-24 mt-14 w-full xl:col-span-3 xl:col-start-2 col-span-5 col-start-1 mx-auto prose-h2:mb-14">
      <article>
        <section dangerouslySetInnerHTML={{ __html: postContentHtml }} />
      </article>
    </div>
  );
}
export default BlogItem;
