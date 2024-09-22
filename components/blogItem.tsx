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
    <div className="prose prose-xl prose-slate dark:prose-invert">
      <article>
        <section dangerouslySetInnerHTML={{ __html: postContentHtml }} />
      </article>
    </div>
  );
}
export default BlogItem;
