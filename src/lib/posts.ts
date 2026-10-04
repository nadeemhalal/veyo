import matter from "gray-matter";
import { z } from "zod";
import { insightFiles } from "@/generated/content";

// Blog posts live in content/insights/<slug>.md (the file name is the URL slug). They are bundled into
// src/generated/content.ts by scripts/build-content.mjs, so no files are read at runtime (Cloudflare Workers can't).

export const postTags = ["Teardown", "How-to", "Compliance", "Account lessons"] as const;

const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.coerce.date(),
  tag: z.enum(postTags),
  excerpt: z.string().min(1),
  author: z.string().default("Veyo Media"),
  draft: z.boolean().default(false),
});

export type Post = z.infer<typeof frontmatterSchema> & {
  slug: string;
  content: string;
  readingMinutes: number;
};

/** Parses one post file's raw text. Throws with the file name if the frontmatter is invalid. */
export function parsePost(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    throw new Error(`Invalid frontmatter in content/insights/${slug}.md: ${issues}`);
  }
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return { ...result.data, slug, content, readingMinutes: Math.max(1, Math.round(words / 220)) };
}

/** All posts, newest first. Drafts are only included in development. */
export function getAllPosts(): Post[] {
  const includeDrafts = process.env.NODE_ENV === "development";
  return Object.entries(insightFiles)
    .map(([slug, raw]) => parsePost(slug, raw))
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatPostDate(date: Date): string {
  return date.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
