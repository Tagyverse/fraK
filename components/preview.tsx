"use client";

import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";

export function Preview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(33);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setProgress(Math.max(0, Math.min(100, percentage)));
  };

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
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 transition-all hover:bg-accent/40 hover:scale-105 active:scale-95"
                      >
                        {isPlaying ? (
                          <Pause className="h-8 w-8 text-accent" />
                        ) : (
                          <Play className="h-8 w-8 text-accent ml-1" />
                        )}
                      </button>
                      <p className="text-sm text-muted-foreground">
                        {isPlaying ? "Playing..." : "Click to Play"}
                      </p>
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
                    <button 
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                      className="text-muted-foreground transition-colors hover:text-foreground active:scale-90"
                    >
                      <SkipBack className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-foreground transition-colors hover:text-accent active:scale-90"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                    <button 
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                      className="text-muted-foreground transition-colors hover:text-foreground active:scale-90"
                    >
                      <SkipForward className="h-4 w-4" />
                    </button>
                    <div 
                      className="h-1 flex-1 rounded-full bg-card cursor-pointer"
                      onClick={handleProgressClick}
                    >
                      <div 
                        className="h-1 rounded-full bg-accent transition-all duration-150" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      {String(Math.floor((progress / 100) * 296 / 60)).padStart(2, '0')}:
                      {String(Math.floor((progress / 100) * 296 % 60)).padStart(2, '0')} / 04:56
                    </span>
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-muted-foreground transition-colors hover:text-foreground active:scale-90"
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>
                    <button className="text-muted-foreground transition-colors hover:text-foreground active:scale-90">
                      <Maximize className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex gap-1 h-12">
                    {[30, 50, 70, 40, 60, 80, 45, 55, 75, 35, 65, 85, 40, 60, 50, 70, 45, 55, 65, 75].map((height, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded transition-colors ${
                          i < Math.floor((progress / 100) * 20) ? 'bg-accent/60' : 'bg-accent/30'
                        }`}
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
