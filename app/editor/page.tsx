"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Plus,
  Scissors,
  Type,
  Image as ImageIcon,
  Music,
  Sparkles,
  Layers,
  Settings,
  Upload,
  FolderOpen,
  Trash2,
  Copy,
  Move,
  ZoomIn,
  ZoomOut,
  Send,
  Bot,
  X,
  Grip,
  ChevronDown,
  Download,
  Save,
  Undo,
  Redo,
} from "lucide-react";

interface MediaFile {
  id: string;
  name: string;
  type: "video" | "audio" | "image";
  url: string;
  duration?: number;
  thumbnail?: string;
  file: File;
}

interface TimelineClip {
  id: string;
  mediaId: string;
  trackId: number;
  start: number;
  end: number;
  offset: number;
  name: string;
  type: "video" | "audio" | "image";
  color: string;
}

interface Track {
  id: number;
  name: string;
  type: "video" | "audio";
  muted: boolean;
  locked: boolean;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function EditorPage() {
  // State
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [tracks, setTracks] = useState<Track[]>([
    { id: 1, name: "Video 1", type: "video", muted: false, locked: false },
    { id: 2, name: "Video 2", type: "video", muted: false, locked: false },
    { id: 3, name: "Audio 1", type: "audio", muted: false, locked: false },
    { id: 4, name: "Audio 2", type: "audio", muted: false, locked: false },
  ]);
  const [clips, setClips] = useState<TimelineClip[]>([]);
  const [selectedClip, setSelectedClip] = useState<TimelineClip | null>(null);
  const [selectedTool, setSelectedTool] = useState("select");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm the Frame AI Assistant. I can help you with video editing tasks like trimming clips, adding transitions, color correction, and more. What would you like to do?",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [projectName, setProjectName] = useState("Untitled Project");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);

  const tools = [
    { id: "select", icon: Layers, label: "Select (V)" },
    { id: "cut", icon: Scissors, label: "Cut (C)" },
    { id: "text", icon: Type, label: "Text (T)" },
    { id: "image", icon: ImageIcon, label: "Image (I)" },
    { id: "audio", icon: Music, label: "Audio (A)" },
    { id: "ai", icon: Sparkles, label: "AI Tools (Space)" },
  ];

  const clipColors = {
    video: "#14b8a6",
    audio: "#8b5cf6",
    image: "#f59e0b",
  };

  // Format time as MM:SS or HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substring(2, 11);

  // Handle file upload
  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const newMediaFiles: MediaFile[] = [];

    for (const file of Array.from(files)) {
      const type = file.type.startsWith("video")
        ? "video"
        : file.type.startsWith("audio")
        ? "audio"
        : file.type.startsWith("image")
        ? "image"
        : null;

      if (!type) continue;

      const url = URL.createObjectURL(file);
      const id = generateId();

      const mediaFile: MediaFile = {
        id,
        name: file.name,
        type,
        url,
        file,
      };

      // Get duration for video/audio
      if (type === "video" || type === "audio") {
        const media = document.createElement(type);
        media.src = url;
        await new Promise<void>((resolve) => {
          media.onloadedmetadata = () => {
            mediaFile.duration = media.duration;
            resolve();
          };
        });
      }

      // Generate thumbnail for video
      if (type === "video") {
        const video = document.createElement("video");
        video.src = url;
        video.currentTime = 1;
        await new Promise<void>((resolve) => {
          video.onseeked = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 160;
            canvas.height = 90;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(video, 0, 0, 160, 90);
            mediaFile.thumbnail = canvas.toDataURL();
            resolve();
          };
        });
      }

      newMediaFiles.push(mediaFile);
    }

    setMediaFiles((prev) => [...prev, ...newMediaFiles]);
  }, []);

  // Add clip to timeline
  const addClipToTimeline = useCallback((media: MediaFile) => {
    const trackId = media.type === "video" || media.type === "image" ? 1 : 3;
    const existingClips = clips.filter((c) => c.trackId === trackId);
    const startTime = existingClips.length > 0 
      ? Math.max(...existingClips.map((c) => c.end))
      : 0;

    const newClip: TimelineClip = {
      id: generateId(),
      mediaId: media.id,
      trackId,
      start: startTime,
      end: startTime + (media.duration || 5),
      offset: 0,
      name: media.name,
      type: media.type,
      color: clipColors[media.type],
    };

    setClips((prev) => [...prev, newClip]);
    setDuration(Math.max(duration, newClip.end + 10));
  }, [clips, duration]);

  // Delete selected clip
  const deleteSelectedClip = useCallback(() => {
    if (selectedClip) {
      setClips((prev) => prev.filter((c) => c.id !== selectedClip.id));
      setSelectedClip(null);
    }
  }, [selectedClip]);

  // Duplicate selected clip
  const duplicateSelectedClip = useCallback(() => {
    if (selectedClip) {
      const newClip: TimelineClip = {
        ...selectedClip,
        id: generateId(),
        start: selectedClip.end,
        end: selectedClip.end + (selectedClip.end - selectedClip.start),
      };
      setClips((prev) => [...prev, newClip]);
    }
  }, [selectedClip]);

  // Play/Pause toggle
  const togglePlayback = useCallback(() => {
    setIsPlaying((prev) => !prev);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isPlaying]);

  // Skip forward/backward
  const skipTime = useCallback((seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + seconds)));
  }, [duration]);

  // Handle timeline click
  const handleTimelineClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const time = percentage * duration * zoom;
    setCurrentTime(Math.max(0, Math.min(duration, time)));
  }, [duration, zoom]);

  // Handle AI chat
  const sendChatMessage = useCallback(() => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you with that! To trim your video clip, select it on the timeline and use the cut tool (C) to split it at the playhead position.",
        "Great choice! For color correction, I recommend adjusting the contrast first, then fine-tuning the saturation. Would you like me to apply an auto-enhance filter?",
        "To add a transition between clips, drag one clip close to another. A crossfade will be automatically suggested. You can also access more transitions from the effects panel.",
        "I've analyzed your video. The best cuts would be at 0:12, 0:34, and 1:02 based on scene changes. Would you like me to split the clip at these points?",
        "For better audio, I suggest normalizing the levels and reducing background noise. Should I apply these enhancements automatically?",
      ];

      const aiMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  }, [chatInput]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          if (e.shiftKey) {
            setShowAIPanel((prev) => !prev);
          } else {
            togglePlayback();
          }
          break;
        case "v":
          setSelectedTool("select");
          break;
        case "c":
          setSelectedTool("cut");
          break;
        case "t":
          setSelectedTool("text");
          break;
        case "i":
          setSelectedTool("image");
          break;
        case "a":
          setSelectedTool("audio");
          break;
        case "delete":
        case "backspace":
          deleteSelectedClip();
          break;
        case "d":
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            duplicateSelectedClip();
          }
          break;
        case "arrowleft":
          skipTime(-5);
          break;
        case "arrowright":
          skipTime(5);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayback, deleteSelectedClip, duplicateSelectedClip, skipTime]);

  // Playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  // Get active video clip for preview
  const activeVideoClip = clips.find(
    (clip) =>
      clip.type === "video" &&
      currentTime >= clip.start &&
      currentTime <= clip.end
  );
  const activeMedia = activeVideoClip
    ? mediaFiles.find((m) => m.id === activeVideoClip.mediaId)
    : null;

  return (
    <div className="flex h-screen flex-col bg-[#0a0a0b] text-white">
      {/* Header */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-[#1f1f23] bg-[#0f0f11] px-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#a1a1aa] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="h-4 w-px bg-[#27272a]" />
          {isEditingName ? (
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
              className="bg-transparent text-sm font-medium outline-none border-b border-[#14b8a6]"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className="text-sm font-medium hover:text-[#14b8a6] transition-colors"
            >
              {projectName}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-md bg-[#1f1f23] px-3 py-1.5 text-sm text-[#a1a1aa] transition-colors hover:bg-[#27272a] hover:text-white">
            <Undo className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-1.5 rounded-md bg-[#1f1f23] px-3 py-1.5 text-sm text-[#a1a1aa] transition-colors hover:bg-[#27272a] hover:text-white">
            <Redo className="h-4 w-4" />
          </button>
          <div className="h-4 w-px bg-[#27272a]" />
          <button className="flex items-center gap-1.5 rounded-md bg-[#1f1f23] px-3 py-1.5 text-sm text-[#a1a1aa] transition-colors hover:bg-[#27272a] hover:text-white">
            <Save className="h-4 w-4" />
            <span>Save</span>
          </button>
          <button className="rounded-md bg-[#14b8a6] px-4 py-1.5 text-sm font-medium text-black transition-colors hover:bg-[#0d9488] flex items-center gap-1.5">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Tools */}
        <aside className="flex w-14 shrink-0 flex-col items-center gap-1 border-r border-[#1f1f23] bg-[#0f0f11] py-3">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                setSelectedTool(tool.id);
                if (tool.id === "ai") setShowAIPanel(true);
              }}
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
          <div className="mt-auto flex flex-col gap-1">
            <button
              onClick={() => setShowAIPanel(!showAIPanel)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                showAIPanel
                  ? "bg-[#8b5cf6] text-white"
                  : "text-[#71717a] hover:bg-[#1f1f23] hover:text-white"
              }`}
              title="AI Assistant (Shift+Space)"
            >
              <Bot className="h-5 w-5" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#71717a] transition-colors hover:bg-[#1f1f23] hover:text-white"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 overflow-hidden">
            {/* Media Panel */}
            <div
              className={`flex w-64 shrink-0 flex-col border-r border-[#1f1f23] bg-[#0f0f11] transition-colors ${
                isDraggingOver ? "bg-[#14b8a6]/10 border-[#14b8a6]" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex items-center justify-between border-b border-[#1f1f23] p-3">
                <h3 className="text-sm font-medium text-[#a1a1aa]">Media</h3>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[#14b8a6] hover:text-[#0d9488] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="video/*,audio/*,image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />

              {mediaFiles.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
                      isDraggingOver ? "border-[#14b8a6] bg-[#14b8a6]/20" : "border-[#27272a]"
                    }`}
                  >
                    <Upload className={`h-8 w-8 ${isDraggingOver ? "text-[#14b8a6]" : "text-[#52525b]"}`} />
                  </div>
                  <p className="text-center text-sm text-[#71717a]">
                    Drop files here or click to upload
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 rounded-md bg-[#14b8a6] px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-[#0d9488]"
                    >
                      <Upload className="h-3 w-3" />
                      Upload
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-2">
                  <div className="grid grid-cols-2 gap-2">
                    {mediaFiles.map((media) => (
                      <div
                        key={media.id}
                        className="group relative cursor-pointer rounded-lg border border-[#27272a] bg-[#18181b] overflow-hidden hover:border-[#14b8a6] transition-colors"
                        onClick={() => addClipToTimeline(media)}
                        title="Click to add to timeline"
                      >
                        {media.thumbnail ? (
                          <img
                            src={media.thumbnail}
                            alt={media.name}
                            className="aspect-video w-full object-cover"
                          />
                        ) : (
                          <div className="aspect-video w-full flex items-center justify-center bg-[#1f1f23]">
                            {media.type === "audio" ? (
                              <Music className="h-6 w-6 text-[#8b5cf6]" />
                            ) : (
                              <ImageIcon className="h-6 w-6 text-[#f59e0b]" />
                            )}
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="h-6 w-6 text-white" />
                        </div>
                        <div className="p-1.5">
                          <p className="truncate text-xs text-[#a1a1aa]">{media.name}</p>
                          {media.duration && (
                            <p className="text-xs text-[#52525b]">{formatTime(media.duration)}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-[#27272a] py-3 text-xs text-[#71717a] hover:border-[#14b8a6] hover:text-[#14b8a6] transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    Add more media
                  </button>
                </div>
              )}
            </div>

            {/* Preview Area */}
            <div className="flex flex-1 flex-col bg-[#0a0a0b]">
              <div className="flex flex-1 items-center justify-center p-6">
                <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg border border-[#1f1f23] bg-black">
                  {activeMedia ? (
                    <video
                      ref={videoRef}
                      src={activeMedia.url}
                      className="h-full w-full object-contain"
                      muted={isMuted}
                    />
                  ) : (
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
                  )}
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button className="rounded-md bg-[#1f1f23]/80 p-1.5 text-[#a1a1aa] transition-colors hover:bg-[#27272a]">
                      <Maximize className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4 border-t border-[#1f1f23] bg-[#0f0f11] px-4 py-3">
                <span className="w-16 text-right text-xs text-[#71717a] font-mono">
                  {formatTime(currentTime)}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => skipTime(-5)}
                    className="text-[#a1a1aa] transition-colors hover:text-white"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button
                    onClick={togglePlayback}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#14b8a6] text-black transition-colors hover:bg-[#0d9488]"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5 ml-0.5" />
                    )}
                  </button>
                  <button
                    onClick={() => skipTime(5)}
                    className="text-[#a1a1aa] transition-colors hover:text-white"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>
                <span className="w-16 text-xs text-[#71717a] font-mono">
                  {formatTime(duration)}
                </span>
                <div className="h-4 w-px bg-[#27272a]" />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-[#71717a] hover:text-white transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-[#27272a] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#14b8a6]"
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Properties or AI */}
            <div className="flex w-72 shrink-0 flex-col border-l border-[#1f1f23] bg-[#0f0f11]">
              {showAIPanel ? (
                <>
                  <div className="flex items-center justify-between border-b border-[#1f1f23] p-3">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-[#8b5cf6]" />
                      <h3 className="text-sm font-medium text-[#a1a1aa]">AI Assistant</h3>
                    </div>
                    <button
                      onClick={() => setShowAIPanel(false)}
                      className="text-[#71717a] hover:text-white transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${
                            msg.role === "user"
                              ? "bg-[#14b8a6] text-black"
                              : "bg-[#1f1f23] text-[#e4e4e7]"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[#1f1f23] p-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                        placeholder="Ask AI for help..."
                        className="flex-1 rounded-lg bg-[#1f1f23] px-3 py-2 text-sm text-white placeholder-[#52525b] outline-none focus:ring-1 focus:ring-[#14b8a6]"
                      />
                      <button
                        onClick={sendChatMessage}
                        className="rounded-lg bg-[#14b8a6] p-2 text-black transition-colors hover:bg-[#0d9488]"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-b border-[#1f1f23] p-3">
                    <h3 className="text-sm font-medium text-[#a1a1aa]">Properties</h3>
                  </div>
                  {selectedClip ? (
                    <div className="flex-1 overflow-y-auto p-3 space-y-4">
                      <div>
                        <label className="text-xs text-[#71717a]">Clip Name</label>
                        <input
                          type="text"
                          value={selectedClip.name}
                          onChange={(e) => {
                            setClips((prev) =>
                              prev.map((c) =>
                                c.id === selectedClip.id ? { ...c, name: e.target.value } : c
                              )
                            );
                            setSelectedClip({ ...selectedClip, name: e.target.value });
                          }}
                          className="mt-1 w-full rounded-md bg-[#1f1f23] px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-[#14b8a6]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-[#71717a]">Start</label>
                          <p className="mt-1 text-sm font-mono">{formatTime(selectedClip.start)}</p>
                        </div>
                        <div>
                          <label className="text-xs text-[#71717a]">End</label>
                          <p className="mt-1 text-sm font-mono">{formatTime(selectedClip.end)}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-[#71717a]">Duration</label>
                        <p className="mt-1 text-sm font-mono">
                          {formatTime(selectedClip.end - selectedClip.start)}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[#1f1f23] space-y-2">
                        <button
                          onClick={duplicateSelectedClip}
                          className="flex w-full items-center gap-2 rounded-md bg-[#1f1f23] px-3 py-2 text-sm text-[#a1a1aa] hover:bg-[#27272a] hover:text-white transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                          Duplicate Clip
                        </button>
                        <button
                          onClick={deleteSelectedClip}
                          className="flex w-full items-center gap-2 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Clip
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
                      <Layers className="mb-3 h-8 w-8 text-[#52525b]" />
                      <p className="text-sm text-[#71717a]">
                        Select a clip to view and edit its properties
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="h-52 shrink-0 border-t border-[#1f1f23] bg-[#0f0f11]">
            {/* Timeline Header */}
            <div className="flex h-8 items-center justify-between border-b border-[#1f1f23] px-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newTrack: Track = {
                      id: tracks.length + 1,
                      name: `Track ${tracks.length + 1}`,
                      type: tracks.length % 2 === 0 ? "video" : "audio",
                      muted: false,
                      locked: false,
                    };
                    setTracks([...tracks, newTrack]);
                  }}
                  className="text-[#a1a1aa] transition-colors hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <span className="text-xs text-[#71717a]">Timeline</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                  className="text-[#71717a] hover:text-white transition-colors"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="text-xs text-[#52525b] w-12 text-center">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                  className="text-[#71717a] hover:text-white transition-colors"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Time Ruler */}
            <div className="flex h-6 border-b border-[#1f1f23]">
              <div className="w-28 shrink-0 border-r border-[#1f1f23]" />
              <div
                ref={timelineRef}
                className="relative flex-1 cursor-pointer"
                onClick={handleTimelineClick}
              >
                {/* Time markers */}
                <div className="flex h-full items-end px-2">
                  {Array.from({ length: Math.ceil(duration / 10) + 1 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-[10px] text-[#52525b]"
                      style={{ left: `${(i * 10 / duration) * 100}%` }}
                    >
                      {formatTime(i * 10)}
                    </div>
                  ))}
                </div>
                {/* Playhead */}
                <div
                  ref={playheadRef}
                  className="absolute top-0 bottom-0 w-0.5 bg-[#14b8a6] z-10"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                >
                  <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-[#14b8a6] rounded-sm rotate-45" />
                </div>
              </div>
            </div>

            {/* Tracks */}
            <div className="flex flex-col overflow-y-auto" style={{ height: "calc(100% - 56px)" }}>
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="flex h-12 shrink-0 items-center border-b border-[#1f1f23]"
                >
                  <div className="flex w-28 shrink-0 items-center justify-between border-r border-[#1f1f23] px-2">
                    <span className="text-xs text-[#71717a] truncate">{track.name}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() =>
                          setTracks((prev) =>
                            prev.map((t) =>
                              t.id === track.id ? { ...t, muted: !t.muted } : t
                            )
                          )
                        }
                        className={`p-1 rounded ${track.muted ? "text-red-400" : "text-[#52525b]"}`}
                      >
                        {track.muted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>
                  <div className="relative flex-1 h-full px-1">
                    {clips
                      .filter((clip) => clip.trackId === track.id)
                      .map((clip) => (
                        <div
                          key={clip.id}
                          onClick={() => setSelectedClip(clip)}
                          className={`absolute top-1 bottom-1 rounded cursor-pointer flex items-center px-2 overflow-hidden transition-all ${
                            selectedClip?.id === clip.id
                              ? "ring-2 ring-white ring-offset-1 ring-offset-[#0f0f11]"
                              : "hover:brightness-110"
                          }`}
                          style={{
                            left: `${(clip.start / duration) * 100}%`,
                            width: `${((clip.end - clip.start) / duration) * 100}%`,
                            backgroundColor: clip.color,
                          }}
                        >
                          <Grip className="h-3 w-3 mr-1 opacity-50" />
                          <span className="text-xs font-medium text-black truncate">
                            {clip.name}
                          </span>
                        </div>
                      ))}
                    {/* Playhead line continues through tracks */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-[#14b8a6] pointer-events-none z-10"
                      style={{ left: `${(currentTime / duration) * 100}%` }}
                    />
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
