"use client";

import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward } from "lucide-react";

export function Preview() {
  return (
    <section id="preview" className="border-t border-border py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            See Frame in Action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A powerful, intuitive interface designed for seamless video editing.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {/* Main editor preview */}
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex h-10 items-center gap-2 border-b border-border bg-secondary px-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-muted-foreground/40" />
                <div className="h-3 w-3 rounded-full bg-accent/60" />
              </div>
              <span className="ml-4 text-xs text-muted-foreground">
                Frame Video Studio
              </span>
            </div>
            <div className="relative aspect-video bg-background p-4">
              <div className="flex h-full flex-col gap-4">
                <div className="flex flex-1 gap-4">
                  <div className="flex-1 rounded-lg bg-secondary flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                        <Play className="h-8 w-8 text-accent" />
                      </div>
                      <p className="text-sm text-muted-foreground">Video Preview</p>
                    </div>
                  </div>
                  <div className="w-64 rounded-lg bg-secondary p-3 hidden lg:block">
                    <p className="text-xs font-medium text-foreground mb-2">AI Assistant</p>
                    <div className="space-y-2">
                      <div className="rounded bg-card p-2">
                        <p className="text-xs text-muted-foreground">How can I help you edit your video today?</p>
                      </div>
                      <div className="rounded bg-accent/20 p-2">
                        <p className="text-xs text-accent">Add smooth transitions between scenes</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-3 mb-3">
                    <SkipBack className="h-4 w-4 text-muted-foreground" />
                    <Pause className="h-5 w-5 text-foreground" />
                    <SkipForward className="h-4 w-4 text-muted-foreground" />
                    <div className="h-1 flex-1 rounded-full bg-card">
                      <div className="h-1 w-1/3 rounded-full bg-accent" />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">01:23 / 04:56</span>
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Maximize className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex gap-1 h-12">
                    {[30, 50, 70, 40, 60, 80, 45, 55, 75, 35, 65, 85, 40, 60, 50, 70, 45, 55, 65, 75].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded bg-accent/30"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex h-10 items-center gap-2 border-b border-border bg-secondary px-4">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/60" />
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/40" />
                  <div className="h-3 w-3 rounded-full bg-accent/60" />
                </div>
                <span className="ml-4 text-xs text-muted-foreground">
                  AI Assistant
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="rounded-lg bg-secondary p-3">
                  <p className="text-sm text-muted-foreground">Analyzing video content...</p>
                  <div className="mt-2 h-2 rounded-full bg-card">
                    <div className="h-2 w-2/3 rounded-full bg-accent" />
                  </div>
                </div>
                <div className="rounded-lg bg-accent/10 border border-accent/20 p-3">
                  <p className="text-sm text-foreground font-medium">Detected 5 scenes</p>
                  <p className="text-xs text-muted-foreground mt-1">Ready to apply auto-transitions</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex h-10 items-center gap-2 border-b border-border bg-secondary px-4">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/60" />
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/40" />
                  <div className="h-3 w-3 rounded-full bg-accent/60" />
                </div>
                <span className="ml-4 text-xs text-muted-foreground">
                  Video Agent
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-accent-foreground">AI</span>
                  </div>
                  <div className="rounded-lg bg-secondary p-3 flex-1">
                    <p className="text-sm text-foreground">I can help you with:</p>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <li>- Auto-generate captions</li>
                      <li>- Color correction</li>
                      <li>- Smart scene detection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
