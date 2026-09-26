import { describe, expect, it } from "vitest";
import { parsePost } from "./posts";

const post = (frontmatter: string, body = "Hello world") => `---\n${frontmatter}\n---\n${body}`;

describe("parsePost", () => {
  it("parses valid frontmatter and applies defaults", () => {
    const p = parsePost("my-post", post('title: "A post"\ndate: "2026-10-01"\ntag: "Teardown"\nexcerpt: "Short"'));
    expect(p.slug).toBe("my-post");
    expect(p.title).toBe("A post");
    expect(p.date.toISOString().slice(0, 10)).toBe("2026-10-01");
    expect(p.author).toBe("Veyo Media");
    expect(p.draft).toBe(false);
    expect(p.content.trim()).toBe("Hello world");
  });

  it("estimates reading time at ~220 words a minute, minimum 1", () => {
    const fm = 'title: "T"\ndate: "2026-10-01"\ntag: "How-to"\nexcerpt: "E"';
    expect(parsePost("a", post(fm, "word")).readingMinutes).toBe(1);
    expect(parsePost("b", post(fm, Array(660).fill("word").join(" "))).readingMinutes).toBe(3);
  });

  it("rejects an unknown tag with the file name in the error", () => {
    expect(() =>
      parsePost("bad-tag", post('title: "T"\ndate: "2026-10-01"\ntag: "Random"\nexcerpt: "E"')),
    ).toThrow(/bad-tag\.md.*tag/);
  });

  it("rejects missing required fields", () => {
    expect(() => parsePost("empty", post('title: "Only a title"'))).toThrow(/date|tag|excerpt/);
  });
});
