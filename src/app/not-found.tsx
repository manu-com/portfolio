import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="text-[0.75rem] uppercase tracking-[0.3em] text-accent">Error 404</p>
      <h1 className="mt-6 text-[clamp(2.5rem,8vw,6rem)] leading-[1.02] font-bold tracking-tight text-primary">
        Page not found
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-12 inline-flex items-center justify-center border border-border px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-primary transition-colors duration-300 hover:border-accent hover:text-accent"
      >
        Back home
      </Link>
    </div>
  );
}