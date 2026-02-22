import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center space-y-4">
      <h1 className="text-4xl font-bold font-mono">404</h1>
      <p className="text-muted">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="inline-block font-mono text-sm text-muted hover:text-foreground transition-colors"
      >
        &larr; go home
      </Link>
    </div>
  );
}
