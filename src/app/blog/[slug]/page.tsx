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

  // Simple markdown-to-html: paragraphs, headers, code blocks, bold, italic, links, lists
  const html = post.content
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("```")) {
        const code = trimmed.replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
        return `<pre class="bg-[#161616] rounded-lg p-4 overflow-x-auto text-sm font-mono text-accent my-4"><code>${code}</code></pre>`;
      }
      if (trimmed.startsWith("### "))
        return `<h3 class="text-lg font-semibold mt-8 mb-3">${trimmed.slice(4)}</h3>`;
      if (trimmed.startsWith("## "))
        return `<h2 class="text-xl font-semibold mt-10 mb-3">${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith("# "))
        return `<h1 class="text-2xl font-bold mt-10 mb-4">${trimmed.slice(2)}</h1>`;
      if (trimmed.startsWith("- ")) {
        const items = trimmed.split("\n").map((l) => `<li class="text-accent">${l.slice(2)}</li>`).join("");
        return `<ul class="list-disc list-inside space-y-1 my-4 text-accent">${items}</ul>`;
      }
      // Inline formatting
      let formatted = trimmed
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/`(.*?)`/g, '<code class="bg-[#161616] px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">$1</a>');
      return `<p class="text-accent leading-relaxed my-4">${formatted}</p>`;
    })
    .join("\n");

  return (
    <div className="py-8">
      <Link
        href="/blog"
        className="font-mono text-sm text-muted hover:text-foreground transition-colors"
      >
        &larr; back
      </Link>
      <article className="mt-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">{post.title}</h1>
          <p className="font-mono text-sm text-muted mt-2">{post.date}</p>
        </header>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}
