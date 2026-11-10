"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { BlueprintSketchSVG, PhotorealLivingRoomSVG } from "./ArchitecturalSVGs";
import { Sparkles, Compass, Eye, Sun, Sunset, Cloud } from "lucide-react";

interface ComparisonSliderProps {
  className?: string;
  showControls?: boolean;
}

export default function ComparisonSlider({
  className = "",
  showControls = true
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeLighting, setActiveLighting] = useState<"daylight" | "sunset" | "overcast">("daylight");
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      {/* Interactive Controls Bar */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[11px]">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              Napkin Schematic ({Math.round(100 - sliderPosition)}%)
            </span>
            <span className="text-slate-600 font-mono">⟷</span>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-400 font-mono text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              4K Photoreal ({Math.round(sliderPosition)}%)
            </span>
          </div>

          {/* Lighting Mode Selector */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-[11px]">
            <button
              onClick={() => setActiveLighting("daylight")}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                activeLighting === "daylight"
                  ? "bg-cyan-500/20 text-cyan-300 font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sun className="w-3 h-3 text-cyan-400" />
              Daylight 4000K
            </button>
            <button
              onClick={() => setActiveLighting("sunset")}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                activeLighting === "sunset"
                  ? "bg-amber-500/20 text-amber-300 font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sunset className="w-3 h-3 text-amber-400" />
              Golden 2700K
            </button>
            <button
              onClick={() => setActiveLighting("overcast")}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                activeLighting === "overcast"
                  ? "bg-slate-700 text-slate-200 font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Cloud className="w-3 h-3 text-slate-300" />
              Overcast 6500K
            </button>
          </div>
        </div>
      )}

      {/* Main Before / After Canvas Box */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-xl overflow-hidden cursor-ew-resize select-none border border-slate-800 shadow-2xl bg-slate-950"
      >
        {/* Right Layer (Background): 4K Photoreal Interior */}
        <div className="absolute inset-0 w-full h-full">
          <PhotorealLivingRoomSVG lighting={activeLighting} />
          {/* Label Badge Right */}
          <div className="absolute top-4 right-4 pointer-events-none z-10">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-400 font-mono text-[10px] tracking-wide font-semibold shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              OUTPUT: 4K PHOTOREAL SCANDINAVIAN
            </span>
          </div>
        </div>

        {/* Left Layer (Foreground with Clip): Napkin Blueprint Sketch */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 w-full h-full min-w-[300px]">
            <div
              className="absolute inset-0"
              style={{
                width: containerWidth > 0 ? `${containerWidth}px` : "100%",
                height: "100%"
              }}
            >
              <BlueprintSketchSVG />
            </div>
          </div>

          {/* Label Badge Left */}
          <div className="absolute top-4 left-4 pointer-events-none z-10">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-400 font-mono text-[10px] tracking-wide font-semibold shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              INPUT: NAPKIN BLUEPRINT SCHEMATIC
            </span>
          </div>
        </div>

        {/* Vertical Divider Line with Cyan Glow */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Glowing laser line */}
          <div className="absolute top-0 bottom-0 w-[2px] -ml-[1px] bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

          {/* Interactive Drag Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)] cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
            <div className="flex items-center space-x-1 text-cyan-300">
              <span className="text-[11px] font-bold">‹</span>
              <span className="text-[11px] font-bold">›</span>
            </div>
          </div>
        </div>

        {/* Hover / Drag Instruction Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-300 text-[10px] font-mono flex items-center gap-1.5 opacity-75">
            <Eye className="w-3 h-3 text-cyan-400" />
            Drag slider left or right to inspect generative transition
          </span>
        </div>
      </div>
    </div>
  );
}
