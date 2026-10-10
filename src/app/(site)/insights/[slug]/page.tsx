import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";
import { formatPostDate, getAllPosts, getPost } from "@/lib/posts";
import { FinalCta } from "@/components/site/blocks";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbJsonLd, ogImage, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  const meta = pageMetadata({ title: post.title, description: post.excerpt, path: `/insights/${post.slug}`, type: "article" });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date.toISOString(), tags: [post.tag] },
  };
}

export default async function PostPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date.toISOString(),
    author: { "@type": "Organization", name: post.author },
    dateModified: post.date.toISOString(),
    image: `${site.url}${ogImage.url}`,
    mainEntityOfPage: `${site.url}/insights/${post.slug}`,
    inLanguage: "en-AU",
    publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbJsonLd([
            { name: "Insights", path: "/insights" },
            { name: post.title, path: `/insights/${post.slug}` },
          ]),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <Link href="/insights" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden="true" /> All insights
        </Link>

        <header className="mt-8 border-b pb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">{post.tag}</p>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            {post.author} · <time dateTime={post.date.toISOString()}>{formatPostDate(post.date)}</time> · {post.readingMinutes} min read
          </p>
        </header>

        <div className="prose prose-lg mt-10 max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-l-brand prose-img:rounded-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </article>
      <FinalCta />
    </>
  );
}
