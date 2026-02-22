import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-10 py-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
        <p className="text-accent leading-[1.7]">
          Notes on things I&apos;m figuring out. Mostly for future me, but maybe useful to you.
        </p>
      </div>
      {posts.length === 0 ? (
        <p className="text-muted italic">Nothing yet. Check back soon.</p>
      ) : (
        <div className="space-y-1">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <div className="flex items-baseline justify-between py-4 border-b border-border">
                <div>
                  <span className="group-hover:text-foreground text-accent transition-colors">
                    {post.title}
                  </span>
                  {post.description && (
                    <p className="text-[13px] text-muted mt-1">{post.description}</p>
                  )}
                </div>
                <span className="text-xs text-muted shrink-0 ml-4" style={{ fontFamily: "var(--font-mono)" }}>
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
