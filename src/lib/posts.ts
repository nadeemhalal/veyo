import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

// Blog posts live in content/insights/<slug>.md. The file name is the URL slug.
const POSTS_DIR = path.join(process.cwd(), "content", "insights");

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
  if (!fs.existsSync(POSTS_DIR)) return [];
  const includeDrafts = process.env.NODE_ENV === "development";
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parsePost(f.replace(/\.md$/, ""), fs.readFileSync(path.join(POSTS_DIR, f), "utf8")))
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatPostDate(date: Date): string {
  return date.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
