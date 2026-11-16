import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
      <div className="text-center space-y-6 max-w-lg">
        <p className="text-accent-cyan font-mono text-sm tracking-widest">404</p>
        <h1 className="text-4xl font-syne font-bold text-content-primary">
          Page not found
        </h1>
        <p className="text-content-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 rounded-xl bg-accent-cyan text-bg-primary font-semibold hover:shadow-glow-cyan transition-all"
        >
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
