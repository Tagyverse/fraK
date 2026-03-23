import Image from "next/image";

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
            <div className="relative aspect-video">
              <Image
                src="/frame-video-studio-initial.png"
                alt="Frame Video Studio Interface"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* AI Assistant preview */}
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
              <div className="relative aspect-video">
                <Image
                  src="/frame-ai-assistant.png"
                  alt="Frame AI Assistant"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Video Agent preview */}
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
              <div className="relative aspect-video">
                <Image
                  src="/frame-video-agent-working.png"
                  alt="Frame Video Agent in Action"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
