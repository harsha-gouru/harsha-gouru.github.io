import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/projects";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="space-y-20 py-8">
      {/* Intro */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Sri Harsha Gouru
        </h1>
        <div className="space-y-4 text-accent leading-relaxed max-w-xl">
          <p>
            I build at the intersection of{" "}
            <span className="text-foreground">AI systems</span>,{" "}
            <span className="text-foreground">onchain infrastructure</span>, and{" "}
            <span className="text-foreground">developer tools</span>.
          </p>
          <p>
            Right now I&apos;m deep into LLM internals — building tools to visualize
            what happens inside these models at inference time. I&apos;m also exploring
            x402 and autonomous agent payments on Base, and training small language
            models from scratch.
          </p>
          <p>
            Previously worked across the stack — from fine-tuning models and building
            ML pipelines to shipping full-stack apps. I like understanding systems
            end to end, not just the interface.
          </p>
        </div>
      </section>

      {/* Now */}
      <section className="space-y-4">
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider">
          Currently
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "LLM interpretability", detail: "attention visualization, token tracing" },
            { label: "x402 + agent payments", detail: "micropayments on Base, autonomous commerce" },
            { label: "Small model training", detail: "tinker ecosystem, experiment tracking" },
            { label: "Indic language AI", detail: "heritage document digitization, 22+ languages" },
          ].map((item) => (
            <div key={item.label} className="border border-border rounded-lg p-4">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted mt-1">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-sm text-muted uppercase tracking-wider">
            Featured
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
              className="block group border border-border rounded-lg p-5 hover:border-accent transition-colors"
            >
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-medium group-hover:text-foreground text-accent transition-colors">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-muted">{project.year}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] text-muted border border-border rounded px-2 py-0.5"
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
            <p className="text-muted text-sm">Coming soon.</p>
          ) : (
            recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="flex items-baseline justify-between py-2.5 border-b border-border">
                  <div>
                    <span className="group-hover:text-foreground text-accent transition-colors">
                      {post.title}
                    </span>
                    {post.description && (
                      <p className="text-xs text-muted mt-0.5">{post.description}</p>
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
