import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="space-y-8 py-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted">
          A mix of shipped work and active experiments. I tend to go deep on
          things — most of these started as &quot;let me understand how this actually works.&quot;
        </p>
      </div>
      <div className="space-y-6">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group border border-border rounded-lg p-5 hover:border-accent transition-colors"
          >
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="font-medium group-hover:text-foreground text-accent transition-colors">
                {project.title}
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-muted uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-xs text-muted">{project.year}</span>
              </div>
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
    </div>
  );
}
