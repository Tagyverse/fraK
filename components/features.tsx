import {
  Bot,
  Wand2,
  Palette,
  FolderKanban,
  Puzzle,
  Monitor,
} from "lucide-react";

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
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
