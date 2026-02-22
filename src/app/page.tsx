import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/projects";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="space-y-16 py-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Sri Harsha Gouru
        </h1>
        <p className="text-lg text-muted">Tinkerer. Builder. Learner.</p>
        <p className="text-accent leading-relaxed max-w-lg">
          I like exploring things at the intersection of AI, web3, and developer tools.
          Currently tinkering with x402, RSS agents, and training small models.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-sm text-muted uppercase tracking-wider">Projects</h2>
          <Link href="/projects" className="font-mono text-sm text-muted hover:text-foreground transition-colors">
            view all &rarr;
          </Link>
        </div>
        <div className="space-y-1">
          {featuredProjects.map((project) => (
            <a key={project.title} href={project.url} target="_blank" rel="noopener noreferrer" className="block group">
              <div className="flex items-baseline justify-between py-2.5 border-b border-border">
                <span className="group-hover:text-foreground text-accent transition-colors">{project.title}</span>
                <span className="font-mono text-xs text-muted">{project.tag}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-sm text-muted uppercase tracking-wider">Writing</h2>
          <Link href="/blog" className="font-mono text-sm text-muted hover:text-foreground transition-colors">
            view all &rarr;
          </Link>
        </div>
        <div className="space-y-1">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <div className="flex items-baseline justify-between py-2.5 border-b border-border">
                <span className="group-hover:text-foreground text-accent transition-colors">{post.title}</span>
                <span className="font-mono text-xs text-muted">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
