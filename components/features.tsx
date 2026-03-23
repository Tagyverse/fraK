"use client";

import {
  Bot,
  Wand2,
  Palette,
  FolderKanban,
  Puzzle,
  Monitor,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Bot,
    title: "Frame Video Agent",
    description:
      "Leverage AI with our built-in chat agent. Plan, organize, and streamline your video creation process effortlessly.",
  },
  {
    icon: Wand2,
    title: "AI-Powered Automation",
    description:
      "Auto-clip videos based on scene changes, audio peaks, or motion detection for intelligent editing.",
  },
  {
    icon: Palette,
    title: "Video Enhancement",
    description:
      "AI-driven color correction, brightness adjustments, and style filters for professional-grade results.",
  },
  {
    icon: FolderKanban,
    title: "Smart Organization",
    description:
      "Automatically tag and organize clips using AI with face detection and action recognition.",
  },
  {
    icon: Puzzle,
    title: "Extensible for Developers",
    description:
      "Add custom AI models, effects, or plugins to tailor Frame to your unique workflow needs.",
  },
  {
    icon: Monitor,
    title: "Cross-Platform",
    description:
      "Available on web, desktop, and mobile. Edit your videos anywhere, anytime.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to create
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Professional video editing powered by AI, designed for creators and
            developers alike.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href="/editor"
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-accent/50 hover:bg-card/80 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 active:scale-[0.98]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-accent/20">
                  <Icon className="h-6 w-6 text-accent transition-transform group-hover:scale-110" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Try it now
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
