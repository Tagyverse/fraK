import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* Background grid pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground">
              Open Source Video Editor
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            AI-Powered Video Editing with a{" "}
            <span className="text-accent">Code-Like</span> Creative Flow
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Smoothly integrate open-source models and agents to optimize the
            next frame effortlessly. Create stunning videos with ease, or extend
            Frame with your own features.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/aregrid/frame"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-base font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <code className="rounded bg-secondary px-3 py-1.5 font-mono text-xs">
              npx create-frame-app@latest
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
