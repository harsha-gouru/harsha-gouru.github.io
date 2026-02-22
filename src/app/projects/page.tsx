import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="space-y-8 py-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted">Things I&apos;ve built or am tinkering with.</p>
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
              <span className="font-mono text-xs text-muted">{project.tag}</span>
            </div>
            <p className="text-sm text-muted">{project.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
