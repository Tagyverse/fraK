"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  Plus,
  Scissors,
  Type,
  Image,
  Music,
  Sparkles,
  Layers,
  Settings,
  Upload,
  FolderOpen,
} from "lucide-react";

export default function EditorPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedTool, setSelectedTool] = useState("select");

  const tools = [
    { id: "select", icon: Layers, label: "Select" },
    { id: "cut", icon: Scissors, label: "Cut" },
    { id: "text", icon: Type, label: "Text" },
    { id: "image", icon: Image, label: "Image" },
    { id: "audio", icon: Music, label: "Audio" },
    { id: "ai", icon: Sparkles, label: "AI Tools" },
  ];

  const timelineTracks = [
    { id: 1, name: "Video 1", type: "video", clips: [{ start: 0, end: 60, color: "#14b8a6" }] },
    { id: 2, name: "Video 2", type: "video", clips: [{ start: 30, end: 90, color: "#0ea5e9" }] },
    { id: 3, name: "Audio", type: "audio", clips: [{ start: 0, end: 120, color: "#8b5cf6" }] },
    { id: 4, name: "Music", type: "music", clips: [{ start: 10, end: 100, color: "#f59e0b" }] },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex h-screen flex-col bg-[#0a0a0b] text-white">
      {/* Header */}
      <header className="flex h-12 items-center justify-between border-b border-[#1f1f23] bg-[#0f0f11] px-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#a1a1aa] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="h-4 w-px bg-[#27272a]" />
          <span className="text-sm font-medium">Untitled Project</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-md bg-[#1f1f23] px-3 py-1.5 text-sm text-[#a1a1aa] transition-colors hover:bg-[#27272a] hover:text-white">
            <Settings className="h-4 w-4" />
          </button>
          <button className="rounded-md bg-[#14b8a6] px-4 py-1.5 text-sm font-medium text-black transition-colors hover:bg-[#0d9488]">
            Export
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Tools */}
        <aside className="flex w-14 flex-col items-center gap-1 border-r border-[#1f1f23] bg-[#0f0f11] py-3">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                selectedTool === tool.id
                  ? "bg-[#14b8a6] text-black"
                  : "text-[#71717a] hover:bg-[#1f1f23] hover:text-white"
              }`}
              title={tool.label}
            >
              <tool.icon className="h-5 w-5" />
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 overflow-hidden">
            {/* Media Panel */}
            <div className="flex w-64 flex-col border-r border-[#1f1f23] bg-[#0f0f11]">
              <div className="border-b border-[#1f1f23] p-3">
                <h3 className="text-sm font-medium text-[#a1a1aa]">Media</h3>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-[#27272a]">
                  <Upload className="h-8 w-8 text-[#52525b]" />
                </div>
                <p className="text-center text-sm text-[#71717a]">
                  Drop files here or click to upload
                </p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 rounded-md bg-[#1f1f23] px-3 py-1.5 text-xs text-[#a1a1aa] transition-colors hover:bg-[#27272a]">
                    <Upload className="h-3 w-3" />
                    Upload
                  </button>
                  <button className="flex items-center gap-1.5 rounded-md bg-[#1f1f23] px-3 py-1.5 text-xs text-[#a1a1aa] transition-colors hover:bg-[#27272a]">
                    <FolderOpen className="h-3 w-3" />
                    Browse
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex flex-1 flex-col bg-[#0a0a0b]">
              <div className="flex flex-1 items-center justify-center p-6">
                <div className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-lg border border-[#1f1f23] bg-[#18181b]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1f1f23]">
                        <Play className="h-6 w-6 text-[#14b8a6]" />
                      </div>
                      <p className="text-sm text-[#71717a]">
                        Add media to start editing
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <button className="rounded-md bg-[#1f1f23]/80 p-1.5 text-[#a1a1aa] transition-colors hover:bg-[#27272a]">
                      <Maximize className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4 border-t border-[#1f1f23] bg-[#0f0f11] px-4 py-3">
                <span className="w-14 text-right text-xs text-[#71717a]">
                  {formatTime(currentTime)}
                </span>
                <div className="flex items-center gap-2">
                  <button className="text-[#a1a1aa] transition-colors hover:text-white">
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#14b8a6] text-black transition-colors hover:bg-[#0d9488]"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4 ml-0.5" />
                    )}
                  </button>
                  <button className="text-[#a1a1aa] transition-colors hover:text-white">
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>
                <span className="w-14 text-xs text-[#71717a]">02:00</span>
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-[#71717a]" />
                  <div className="h-1 w-16 rounded-full bg-[#27272a]">
                    <div className="h-full w-3/4 rounded-full bg-[#14b8a6]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Properties */}
            <div className="flex w-64 flex-col border-l border-[#1f1f23] bg-[#0f0f11]">
              <div className="border-b border-[#1f1f23] p-3">
                <h3 className="text-sm font-medium text-[#a1a1aa]">Properties</h3>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
                <Sparkles className="mb-3 h-8 w-8 text-[#14b8a6]" />
                <p className="text-sm text-[#71717a]">
                  Select a clip to view and edit its properties
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="h-48 border-t border-[#1f1f23] bg-[#0f0f11]">
            <div className="flex h-8 items-center justify-between border-b border-[#1f1f23] px-3">
              <div className="flex items-center gap-2">
                <button className="text-[#a1a1aa] transition-colors hover:text-white">
                  <Plus className="h-4 w-4" />
                </button>
                <span className="text-xs text-[#71717a]">Timeline</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#52525b]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{formatTime(i * 30)}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              {timelineTracks.map((track) => (
                <div
                  key={track.id}
                  className="flex h-10 items-center border-b border-[#1f1f23]"
                >
                  <div className="flex w-24 items-center gap-2 border-r border-[#1f1f23] px-3">
                    <span className="text-xs text-[#71717a]">{track.name}</span>
                  </div>
                  <div className="relative flex-1 px-2">
                    {track.clips.map((clip, i) => (
                      <div
                        key={i}
                        className="absolute top-1 h-8 rounded"
                        style={{
                          left: `${(clip.start / 120) * 100}%`,
                          width: `${((clip.end - clip.start) / 120) * 100}%`,
                          backgroundColor: clip.color,
                          opacity: 0.7,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
