import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/projects";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="space-y-16 py-8">
      {/* Intro */}
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight leading-[1.1]">
          Sri Harsha Gouru
        </h1>
        <div className="space-y-4 text-accent leading-relaxed">
          <p>
            Most of what I do starts with a question I can&apos;t let go of.
            Lately it&apos;s been{" "}
            <em className="text-foreground not-italic">what&apos;s actually happening inside a language model at inference time</em>
            {" "}— so I built tools to watch it happen. Before that it was{" "}
            <em className="text-foreground not-italic">can machines pay each other</em>
            {" "}— so I wired up micropayments on Base with x402.
          </p>
          <p>
            I tend to work across the full surface — training small models,
            building the infra to serve them, writing the interfaces people
            interact with. The interesting problems usually live at the seams
            between these layers.
          </p>
          <p className="text-muted text-[15px]">
            AI systems, onchain protocols, developer tools — whatever the
            medium, the through-line is understanding how things work well
            enough to make new things from them.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-sm text-muted uppercase tracking-wider">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="font-mono text-sm text-muted hover:text-foreground transition-colors"
          >
            all projects &rarr;
          </Link>
        </div>
        <div className="space-y-4">
          {featured.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group border border-border rounded-lg p-6 hover:border-muted transition-all duration-300"
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-lg font-medium group-hover:text-foreground text-accent transition-colors">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-muted">
                  {project.year}
                </span>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] text-muted border border-border rounded-full px-2.5 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Writing */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-sm text-muted uppercase tracking-wider">
            Writing
          </h2>
          <Link
            href="/blog"
            className="font-mono text-sm text-muted hover:text-foreground transition-colors"
          >
            all posts &rarr;
          </Link>
        </div>
        <div className="space-y-1">
          {recentPosts.length === 0 ? (
            <p className="text-muted text-sm italic">Coming soon.</p>
          ) : (
            recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="flex items-baseline justify-between py-3 border-b border-border">
                  <div>
                    <span className="group-hover:text-foreground text-accent transition-colors">
                      {post.title}
                    </span>
                    {post.description && (
                      <p className="text-[13px] text-muted mt-1">{post.description}</p>
                    )}
                  </div>
                  <span className="font-mono text-xs text-muted shrink-0 ml-4">
                    {post.date}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
