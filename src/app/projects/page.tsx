import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="space-y-10 py-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="text-accent leading-[1.7]">
          Things I&apos;ve built to answer questions I couldn&apos;t stop thinking about.
          Most start as experiments — some become tools other people use.
        </p>
      </div>
      <div className="space-y-6">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group border border-border rounded-lg p-6 hover:border-muted transition-all duration-300"
          >
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-lg font-medium group-hover:text-foreground text-accent transition-colors">
                {project.title}
              </h2>
              <span className="text-xs text-muted" style={{ fontFamily: "var(--font-mono)" }}>
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
                  className="text-[11px] text-muted border border-border rounded-full px-2.5 py-0.5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
