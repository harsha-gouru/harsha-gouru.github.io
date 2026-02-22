import { getAllPosts, getPost } from "@/lib/blog";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = post.content
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("```")) {
        const code = trimmed.replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
        return `<pre class="bg-[#141210] rounded-lg p-5 overflow-x-auto text-sm my-6" style="font-family:var(--font-mono)"><code>${code}</code></pre>`;
      }
      if (trimmed.startsWith("### "))
        return `<h3 class="text-lg font-semibold mt-10 mb-3">${trimmed.slice(4)}</h3>`;
      if (trimmed.startsWith("## "))
        return `<h2 class="text-xl font-semibold mt-12 mb-4">${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith("# "))
        return `<h1 class="text-2xl font-bold mt-12 mb-4">${trimmed.slice(2)}</h1>`;
      if (trimmed.startsWith("- ")) {
        const items = trimmed
          .split("\n")
          .map((l) => `<li class="text-accent">${l.slice(2)}</li>`)
          .join("");
        return `<ul class="list-disc list-outside ml-5 space-y-2 my-6 text-accent">${items}</ul>`;
      }
      let formatted = trimmed
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-medium">$1</strong>')
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(
          /`(.*?)`/g,
          '<code class="bg-[#141210] px-1.5 py-0.5 rounded text-[14px]" style="font-family:var(--font-mono)">$1</code>'
        )
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-foreground underline underline-offset-4 decoration-border hover:decoration-muted transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
        );
      return `<p class="text-accent leading-[1.8] my-5">${formatted}</p>`;
    })
    .join("\n");

  return (
    <div className="py-12">
      <Link
        href="/blog"
        className="text-sm text-muted hover:text-foreground transition-colors"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        &larr; back
      </Link>
      <article className="mt-10">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight leading-[1.15]">
            {post.title}
          </h1>
          <p className="text-sm text-muted mt-3" style={{ fontFamily: "var(--font-mono)" }}>
            {post.date}
          </p>
        </header>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}
