"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { PencilFloorplanSketchSVG, CadFloorplanVectorSVG } from "./ArchitecturalSVGs";
import { Sparkles, Compass, Eye } from "lucide-react";

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
              <span>Pencil field sketch ({Math.round(sliderPosition)}%)</span>
            </span>
            <span className="text-slate-600 font-sans">→</span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200 font-sans text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Detected vector CAD ({Math.round(100 - sliderPosition)}%)</span>
            </span>
          </div>

          {/* Quick preset positions */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setSliderPosition(85)}
              className="px-2.5 py-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Sketch only
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(50)}
              className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 font-medium transition-colors cursor-pointer"
            >
              Split 50/50
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(15)}
              className="px-2.5 py-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              CAD only
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
        className="relative w-full aspect-[600/420] rounded-xl overflow-hidden cursor-ew-resize select-none border border-slate-800 shadow-xl bg-slate-950"
      >
        {/* Right Layer (Background): Resolved Vector CAD Layout */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950">
          <div
            className="absolute inset-0"
            style={{
              width: containerWidth > 0 ? `${containerWidth}px` : "100%",
              height: "100%"
            }}
          >
            <CadFloorplanVectorSVG className="w-full h-full" />
          </div>

          {/* Label Badge Right */}
          <div className="absolute top-3 right-3 pointer-events-none z-10">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-sm border border-slate-700/80 text-slate-200 text-xs font-sans shadow-sm">
              <span>Detected vector CAD</span>
            </span>
          </div>
        </div>

        {/* Left Layer (Foreground with Clip): Hand-Drawn Pencil Floorplan Sketch */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden border-r border-slate-300 shadow-lg"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="absolute inset-0"
            style={{
              width: containerWidth > 0 ? `${containerWidth}px` : "100%",
              height: "100%"
            }}
          >
            <PencilFloorplanSketchSVG className="w-full h-full" />
          </div>

          {/* Label Badge Left */}
          <div className="absolute top-3 left-3 pointer-events-none z-10">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-sm border border-slate-700/80 text-slate-200 text-xs font-sans shadow-sm">
              <span>Pencil field sketch</span>
            </span>
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Hairline precision steel line */}
          <div className="absolute top-0 bottom-0 w-[2px] -ml-[1px] bg-white shadow-sm" />

          {/* Interactive Drag Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center shadow-lg cursor-ew-resize">
            <div className="flex items-center space-x-0.5 text-slate-200 text-xs font-mono select-none">
              <span>‹</span>
              <span>›</span>
            </div>
          </div>
        </div>

        {/* Drag Instruction Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-md bg-slate-950/85 backdrop-blur-sm border border-slate-800 text-slate-300 text-[11px] font-sans flex items-center gap-1.5 shadow-sm">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>Drag to compare pencil sketch and detected CAD lines</span>
          </span>
        </div>
      </div>
    </div>
  );
}
