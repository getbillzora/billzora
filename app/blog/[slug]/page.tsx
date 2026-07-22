import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ArticleLayout from "@/components/ArticleLayout";
import { POSTS, getPost } from "@/lib/blog";

interface Params {
  params: { slug: string };
}

// Statically generate every post at build time.
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: `${post.title} | Billzora`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "Billzora",
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated,
    },
  };
}

export default function BlogPostPage({ params }: Params) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const { Body } = post;

  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <ArticleLayout meta={post}>
        <Body />
      </ArticleLayout>
      <Footer />
    </main>
  );
}
