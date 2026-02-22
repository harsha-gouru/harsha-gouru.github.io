import fs from "fs";
import path from "path";

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

const contentDir = path.join(process.cwd(), "content");

function parsePost(filename: string): Post {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");

  // Simple frontmatter parser (no external deps)
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { slug, title: slug, date: "", description: "", content: raw };
  }

  const frontmatter: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...rest] = line.split(": ");
    if (key && rest.length) frontmatter[key.trim()] = rest.join(": ").trim();
  });

  return {
    slug,
    title: frontmatter.title || slug,
    date: frontmatter.date || "",
    description: frontmatter.description || "",
    content: match[2],
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));
  return files
    .map(parsePost)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPost(slug: string): Post | undefined {
  const filename = `${slug}.md`;
  const filepath = path.join(contentDir, filename);
  if (!fs.existsSync(filepath)) return undefined;
  return parsePost(filename);
}
