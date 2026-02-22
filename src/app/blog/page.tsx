import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8 py-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted">Notes and thoughts on things I&apos;m exploring.</p>
      </div>
      {posts.length === 0 ? (
        <p className="text-muted font-mono text-sm">No posts yet. Stay tuned.</p>
      ) : (
        <div className="space-y-1">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <div className="flex items-baseline justify-between py-3 border-b border-border">
                <div>
                  <span className="group-hover:text-foreground text-accent transition-colors">
                    {post.title}
                  </span>
                  {post.description && (
                    <p className="text-sm text-muted mt-0.5">{post.description}</p>
                  )}
                </div>
                <span className="font-mono text-xs text-muted shrink-0 ml-4">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
