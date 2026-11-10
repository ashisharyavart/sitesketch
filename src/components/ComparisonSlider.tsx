"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { BlueprintSketchSVG } from "./ArchitecturalSVGs";
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
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-sans text-xs">
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              <span>Source schematic ({Math.round(100 - sliderPosition)}%)</span>
            </span>
            <span className="text-slate-600 font-sans">→</span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200 font-sans text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Architectural render ({Math.round(sliderPosition)}%)</span>
            </span>
          </div>

          {/* Lighting Mode Selector */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveLighting("daylight")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeLighting === "daylight"
                  ? "bg-slate-800 text-slate-100 font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              <span>Daylight 4000K</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLighting("sunset")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeLighting === "sunset"
                  ? "bg-slate-800 text-slate-100 font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sunset className="w-3.5 h-3.5 text-orange-400" />
              <span>Golden 2700K</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLighting("overcast")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeLighting === "overcast"
                  ? "bg-slate-800 text-slate-100 font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Cloud className="w-3.5 h-3.5 text-slate-400" />
              <span>Overcast 6500K</span>
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
        className="relative w-full aspect-[16/10] rounded-xl overflow-hidden cursor-ew-resize select-none border border-slate-800 shadow-xl bg-slate-950"
      >
        {/* Right Layer (Background): Real Architectural Daylit Interior Render */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src="/images/architectural-daylight.jpg"
            alt="Daylit architectural interior with timber walls and high glazing"
            className="w-full h-full object-cover transition-[filter] duration-300"
            style={{
              filter:
                activeLighting === "sunset"
                  ? "sepia(0.28) saturate(1.25) brightness(0.92)"
                  : activeLighting === "overcast"
                  ? "saturate(0.85) brightness(1.05) hue-rotate(4deg)"
                  : "contrast(1.04) brightness(1.0)"
            }}
          />
          {/* Subtle architectural vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30 pointer-events-none" />

          {/* Label Badge Right */}
          <div className="absolute top-4 right-4 pointer-events-none z-10">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/85 backdrop-blur-sm border border-slate-700/80 text-slate-200 text-xs font-sans shadow-sm">
              <span>Architectural render</span>
            </span>
          </div>
        </div>

        {/* Left Layer (Foreground with Clip): Source Blueprint Schematic */}
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
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/85 backdrop-blur-sm border border-slate-700/80 text-slate-200 text-xs font-sans shadow-sm">
              <span>Source schematic</span>
            </span>
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Hairline precision steel line */}
          <div className="absolute top-0 bottom-0 w-[1.5px] -ml-[0.75px] bg-white shadow-sm" />

          {/* Interactive Drag Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border border-slate-300 flex items-center justify-center shadow-md cursor-ew-resize">
            <div className="flex items-center space-x-1 text-slate-200 text-[10px] font-mono select-none">
              <span>‹</span>
              <span>›</span>
            </div>
          </div>
        </div>

        {/* Drag Instruction Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-md bg-slate-950/85 backdrop-blur-sm border border-slate-800 text-slate-300 text-[11px] font-sans flex items-center gap-1.5 shadow-sm">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>Drag divider to inspect transformation</span>
          </span>
        </div>
      </div>
    </div>
  );
}
