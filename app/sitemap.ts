import type { MetadataRoute } from "next";

type Post = {
  updatedAt: string;
  slug: string;
};

const url = process.env.NEXT_PUBLIC_API_URL;

export const dynamic = "force-dynamic";

const escapeXml = (unsafe: any) => {
  return unsafe.replace(/[&<>"']/g, (match: any) => {
    switch (match) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&apos;";
      default:
        return match;
    }
  });
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(`${url}/api/posts/all`, {
    // next: { revalidate: 0 },
    cache: "no-store",
  });
  const posts: Post[] = await response.json();

  const postEntries: MetadataRoute.Sitemap = posts.map(
    ({ slug, updatedAt }) => ({
      url: `${url}/blog/${escapeXml(slug)}`,
      lastModified: updatedAt,
    })
  );

  console.log(postEntries, "post entries");

  return [
    {
      url: `${url}`,
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: `${url}/blog`,
      changeFrequency: "always",
      priority: 0.5,
    },
    ...postEntries,
  ];
}
