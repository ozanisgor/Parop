"use client";

import { useState, useEffect } from "react";
import { remark } from "remark";
import html from "remark-html";

interface Post {
  _id: string;
  titleTR: string;
  content: string;
  tags: string[];
  slug: string;
  imageNum: string;
  readingTime: string;
}

function BlogItem({ blogPost }: { blogPost: Post }) {
  const [postContentHtml, setPostContentHtml] = useState("");

  useEffect(() => {
    const processContent = async () => {
      const processedContent = await remark()
        .use(html)
        .process(blogPost.content);
      const contentHtml = processedContent.toString();
      setPostContentHtml(contentHtml);
    };

    processContent();
  }, [blogPost.content]);

  return (
    <div className="prose xl:prose-xl lg:prose-lg md:prose-base prose-sm prose-slate dark:prose-invert lg:mt-24 mt-14 w-full xl:col-span-3 xl:col-start-2 col-span-5 col-start-1 mx-auto prose-h2:mb-12">
      <article>
        <section dangerouslySetInnerHTML={{ __html: postContentHtml }} />
      </article>
    </div>
  );
}
export default BlogItem;
