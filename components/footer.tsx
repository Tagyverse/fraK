import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <span className="text-sm font-bold text-accent-foreground">F</span>
            </div>
            <span className="text-lg font-semibold text-foreground">Frame</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/aregrid/frame"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            MIT License. Built with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
