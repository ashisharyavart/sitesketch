import React from "react";

// Minimalist geometric blueprint/pencil brand SVG icon
export function SiteSketchLogo({ className = "w-8 h-8", glow = true }: { className?: string; glow?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center ${glow ? "group" : ""}`}>
      {glow && (
        <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-xl group-hover:bg-cyan-500/35 transition-all duration-300" />
      )}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} relative z-10 transition-transform duration-300 group-hover:scale-105`}
      >
        {/* Isometric blueprint hexagon frame */}
        <polygon
          points="20,2 36,11 36,29 20,38 4,29 4,11"
          stroke="#06B6D4"
          strokeWidth="1.75"
          strokeDasharray="2 1.5"
          fill="#111827"
          fillOpacity="0.85"
        />
        {/* Architectural drafting compass & pencil intersection */}
        <path
          d="M12 28L20 8L28 28"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="15"
          y1="21"
          x2="25"
          y2="21"
          stroke="#F59E0B"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        {/* Drafting needle point */}
        <circle cx="20" cy="8" r="2.2" fill="#06B6D4" />
        {/* Pencil tip at center bottom */}
        <polygon points="20,33 17,27 23,27" fill="#F59E0B" />
        <circle cx="20" cy="21" r="1.5" fill="#38BDF8" />
      </svg>
    </div>
  );
}

// 2D Hand-Drawn Blueprint Sketch SVG
export function BlueprintSketchSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Grid pattern background */}
        <pattern id="sketchGrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="0.75" />
        </pattern>
        <pattern id="denseHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(203, 213, 225, 0.4)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Blueprint base background */}
      <rect width="600" height="420" fill="#0D1524" />
      <rect width="600" height="420" fill="url(#sketchGrid)" />

      {/* Tracing paper subtle vignette overlay */}
      <rect x="20" y="20" width="560" height="380" rx="8" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" strokeDasharray="6 4" fill="none" />

      {/* Exterior Walls (Double-line architectural drafting) */}
      <g stroke="#E2E8F0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
        {/* Outer perimeter */}
        <path d="M 70 80 L 530 80 L 530 350 L 70 350 Z" />
        <path d="M 82 92 L 518 92 L 518 338 L 82 338 Z" strokeDasharray="1 0" />
      </g>

      {/* Load-bearing wall cross hatching */}
      <rect x="70" y="80" width="12" height="270" fill="url(#denseHatch)" opacity="0.6" />
      <rect x="70" y="80" width="460" height="12" fill="url(#denseHatch)" opacity="0.6" />
      <rect x="518" y="80" width="12" height="270" fill="url(#denseHatch)" opacity="0.6" />
      <rect x="70" y="338" width="460" height="12" fill="url(#denseHatch)" opacity="0.6" />

      {/* Interior Partition Walls */}
      <g stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" opacity="0.85">
        {/* Living Room / Kitchen Divider */}
        <path d="M 330 92 L 330 220" />
        <path d="M 342 92 L 342 220" />
        {/* Balcony / Terrace Opening */}
        <path d="M 220 338 L 220 350" />
        <path d="M 380 338 L 380 350" />
      </g>

      {/* Door Swings (Dotted 90° arcs) */}
      <g stroke="#06B6D4" strokeWidth="1.5">
        {/* Main Entry Door Swing */}
        <line x1="120" y1="338" x2="160" y2="338" strokeDasharray="3 3" />
        <line x1="120" y1="338" x2="120" y2="298" stroke="#E2E8F0" strokeWidth="2" />
        <path d="M 120 298 A 40 40 0 0 1 160 338" fill="none" strokeDasharray="3 3" />

        {/* Terrace Sliding Glass Door */}
        <line x1="225" y1="344" x2="375" y2="344" stroke="#38BDF8" strokeWidth="3" />
        <line x1="260" y1="341" x2="340" y2="341" stroke="#F59E0B" strokeWidth="2" />
      </g>

      {/* Furniture Layout (Pencil Hand-drawn schematics) */}
      <g stroke="#94A3B8" strokeWidth="1.5" fill="rgba(15, 23, 42, 0.4)">
        {/* Scandinavian Curved Sectional Sofa */}
        <path d="M 140 130 C 140 120, 270 120, 270 130 L 270 185 C 270 195, 255 195, 255 185 L 255 145 L 155 145 L 155 210 C 155 220, 140 220, 140 210 Z" />
        {/* Coffee Table Plinth */}
        <rect x="180" y="165" width="65" height="38" rx="6" stroke="#06B6D4" strokeDasharray="2 2" />
        {/* TV Console / Media Credenza */}
        <rect x="140" y="260" width="130" height="22" rx="2" />
        {/* Kitchen Island */}
        <rect x="375" y="130" width="115" height="60" rx="3" stroke="#F59E0B" />
        {/* 3 Bar Stools */}
        <circle cx="395" cy="205" r="9" />
        <circle cx="432" cy="205" r="9" />
        <circle cx="470" cy="205" r="9" />
        {/* Dining Table */}
        <rect x="380" y="245" width="105" height="55" rx="4" />
        <rect x="400" y="232" width="28" height="8" rx="2" />
        <rect x="440" y="232" width="28" height="8" rx="2" />
        <rect x="400" y="305" width="28" height="8" rx="2" />
        <rect x="440" y="305" width="28" height="8" rx="2" />
      </g>

      {/* Dimensional Callouts & Annotations (Hand-drawn font look) */}
      <g fill="#38BDF8" fontSize="10" fontFamily="monospace">
        {/* Top Dimension */}
        <line x1="70" y1="58" x2="530" y2="58" stroke="#06B6D4" strokeWidth="1" />
        <line x1="70" y1="52" x2="70" y2="64" stroke="#06B6D4" strokeWidth="1.5" />
        <line x1="530" y1="52" x2="530" y2="64" stroke="#06B6D4" strokeWidth="1.5" />
        <rect x="270" y="50" width="60" height="16" fill="#0D1524" />
        <text x="300" y="62" textAnchor="middle" fill="#06B6D4" fontWeight="bold">28&apos;-6&quot; [8.68m]</text>

        {/* Left Dimension */}
        <line x1="45" y1="80" x2="45" y2="350" stroke="#06B6D4" strokeWidth="1" />
        <line x1="39" y1="80" x2="51" y2="80" stroke="#06B6D4" strokeWidth="1.5" />
        <line x1="39" y1="350" x2="51" y2="350" stroke="#06B6D4" strokeWidth="1.5" />
        <text x="36" y="220" textAnchor="middle" fill="#06B6D4" fontWeight="bold" transform="rotate(-90 36 220)">16&apos;-8&quot; [5.08m]</text>
      </g>

      {/* Room Labels & Stamps */}
      <g fill="#E2E8F0" fontFamily="monospace">
        <text x="205" y="235" fontSize="12" fontWeight="700" fill="#F8FAFC" textAnchor="middle">LIVING AREA</text>
        <text x="205" y="249" fontSize="9" fill="#94A3B8" textAnchor="middle">312 SQ. FT. // HERRINGBONE OAK</text>

        <text x="432" y="120" fontSize="11" fontWeight="700" fill="#F8FAFC" textAnchor="middle">OPEN KITCHEN</text>
        <text x="432" y="170" fontSize="9" fill="#F59E0B" textAnchor="middle">QUARTZ ISLAND</text>

        {/* Hand-drawn pencil note tag */}
        <path d="M 245 180 L 290 195" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="245" cy="180" r="2" fill="#F59E0B" />
        <rect x="285" y="190" width="85" height="18" rx="3" fill="#1E293B" stroke="#F59E0B" strokeWidth="0.8" />
        <text x="327" y="202" fontSize="8" fill="#FCD34D" textAnchor="middle">LOW PLINTH #M-104</text>
      </g>

      {/* Neural Vectorization Detection Markers */}
      <g>
        <circle cx="70" cy="80" r="4" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
        <circle cx="530" cy="80" r="4" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
        <circle cx="530" cy="350" r="4" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
        <circle cx="70" cy="350" r="4" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
        <rect x="490" y="365" width="85" height="20" rx="4" fill="#06B6D4" fillOpacity="0.15" stroke="#06B6D4" strokeWidth="1" />
        <text x="532" y="379" fontSize="9" fill="#06B6D4" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AI DETECTED: 99.4%</text>
      </g>
    </svg>
  );
}

// 4K Photorealistic Scandinavian Living Room SVG (Realistic lighting, materials, furniture)
export function PhotorealLivingRoomSVG({
  className = "w-full h-full",
  lighting = "daylight", // "daylight", "sunset", "overcast"
  flooring = "oak", // "oak", "concrete", "walnut"
  countertop = "marble" // "marble", "quartz"
}: {
  className?: string;
  lighting?: "daylight" | "sunset" | "overcast";
  flooring?: "oak" | "concrete" | "walnut";
  countertop?: "marble" | "quartz";
}) {
  const getLightGradients = () => {
    switch (lighting) {
      case "sunset":
        return {
          sky: ["#F97316", "#EA580C", "#7C2D12"],
          sunlightColor: "rgba(245, 158, 11, 0.45)",
          ambientTint: "rgba(251, 146, 60, 0.15)",
          roomWall: "#2A1E24",
          lightKelvin: "2700K Warm Sunset"
        };
      case "overcast":
        return {
          sky: ["#94A3B8", "#64748B", "#334155"],
          sunlightColor: "rgba(226, 232, 240, 0.2)",
          ambientTint: "rgba(148, 163, 184, 0.08)",
          roomWall: "#1E242B",
          lightKelvin: "6500K Overcast Sky"
        };
      default: // daylight
        return {
          sky: ["#38BDF8", "#0284C7", "#0369A1"],
          sunlightColor: "rgba(254, 243, 199, 0.35)",
          ambientTint: "rgba(56, 189, 248, 0.1)",
          roomWall: "#161E2E",
          lightKelvin: "4000K Natural Daylight"
        };
    }
  };

  const light = getLightGradients();

  return (
    <svg
      viewBox="0 0 600 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Floor Materials */}
        {flooring === "oak" && (
          <pattern id="herringboneOak" width="30" height="15" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
            <rect width="30" height="15" fill="#A87A51" />
            <path d="M 0 0 L 15 15 M 15 0 L 30 15" stroke="#785032" strokeWidth="0.8" opacity="0.6" />
            <line x1="0" y1="7.5" x2="30" y2="7.5" stroke="#8C603C" strokeWidth="0.5" />
          </pattern>
        )}
        {flooring === "walnut" && (
          <pattern id="walnutFloor" width="40" height="10" patternUnits="userSpaceOnUse">
            <rect width="40" height="10" fill="#3D291F" />
            <line x1="0" y1="10" x2="40" y2="10" stroke="#251812" strokeWidth="1" />
            <line x1="20" y1="0" x2="20" y2="10" stroke="#2D1E16" strokeWidth="0.75" />
          </pattern>
        )}
        {flooring === "concrete" && (
          <linearGradient id="concreteGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        )}

        {/* Countertop Marble vs Quartz */}
        {countertop === "marble" ? (
          <linearGradient id="carraraMarble" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="40%" stopColor="#E2E8F0" />
            <stop offset="60%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        ) : (
          <linearGradient id="neroQuartz" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        )}

        {/* Volumetric Sunlight Shaft */}
        <linearGradient id="sunBeam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={light.sunlightColor} />
          <stop offset="70%" stopColor="transparent" />
        </linearGradient>

        {/* Sky gradient outside window */}
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={light.sky[0]} />
          <stop offset="60%" stopColor={light.sky[1]} />
          <stop offset="100%" stopColor={light.sky[2]} />
        </linearGradient>
      </defs>

      {/* Room Back Walls */}
      <rect width="600" height="420" fill={light.roomWall} />

      {/* Architectural Fluted Wood Feature Wall on Right */}
      <g opacity="0.9">
        <rect x="420" y="40" width="180" height="230" fill="#2E1F18" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1={425 + i * 7}
            y1="40"
            x2={425 + i * 7}
            y2="270"
            stroke="#1B120E"
            strokeWidth="3"
            opacity="0.8"
          />
        ))}
      </g>

      {/* Floor to Ceiling Window (Left Wall) showing outdoor skyline/foliage */}
      <g>
        {/* Outdoor Sky View */}
        <polygon points="30,40 180,85 180,310 30,360" fill="url(#skyGrad)" />
        {/* Distant trees/mountains silhouette */}
        <path d="M 40 280 Q 90 240 140 270 L 180 260 L 180 310 L 30 360 Z" fill="#0B1320" opacity="0.75" />
        {/* Window Mullions / Frame (Slim Matt Black Architectural Steel) */}
        <polygon points="28,38 182,83 182,312 28,362" stroke="#0F172A" strokeWidth="5" fill="none" />
        <line x1="105" y1="62" x2="105" y2="335" stroke="#0F172A" strokeWidth="3" />
        <line x1="30" y1="190" x2="180" y2="190" stroke="#0F172A" strokeWidth="2.5" />
      </g>

      {/* Perspective Floor Plane */}
      <polygon
        points="0,270 600,270 600,420 0,420"
        fill={
          flooring === "oak"
            ? "url(#herringboneOak)"
            : flooring === "walnut"
            ? "url(#walnutFloor)"
            : "url(#concreteGrad)"
        }
      />
      {/* Floor sheen & ambient reflection */}
      <polygon points="0,270 600,270 600,420 0,420" fill={light.ambientTint} opacity="0.6" />

      {/* Sunlight Beam casting across the room */}
      <polygon points="105,62 180,85 490,410 190,410" fill="url(#sunBeam)" opacity="0.7" style={{ mixBlendMode: "screen" }} />

      {/* Bouclé Curved Sectional Sofa (Scandinavian Minimalist) */}
      <g>
        {/* Soft Contact Shadow */}
        <ellipse cx="295" cy="345" rx="145" ry="24" fill="#070A10" opacity="0.65" />
        {/* Sofa Base & Cushions */}
        <path
          d="M 170 265 C 170 230, 240 220, 310 220 C 380 220, 420 240, 420 275 L 415 325 C 415 338, 395 342, 380 342 C 340 342, 315 335, 290 335 C 240 335, 195 340, 180 335 C 168 330, 170 295, 170 265 Z"
          fill="#E2E8F0"
        />
        {/* Textured Bouclé Fabric Shading */}
        <path
          d="M 175 265 C 175 238, 240 228, 305 228 C 375 228, 412 245, 412 275 L 410 300 C 370 290, 310 290, 260 298 C 210 305, 182 308, 175 300 Z"
          fill="#CBD5E1"
          opacity="0.8"
        />
        {/* Minimalist Throw Pillows (Architectural Amber Accent) */}
        <rect x="205" y="240" width="38" height="38" rx="8" transform="rotate(-12 205 240)" fill="#D97706" opacity="0.9" />
        <rect x="345" y="248" width="35" height="35" rx="6" transform="rotate(8 345 248)" fill="#475569" />
      </g>

      {/* Marble / Quartz Plinth Coffee Table */}
      <g>
        <ellipse cx="300" cy="370" rx="65" ry="14" fill="#06090E" opacity="0.7" />
        {/* Plinth block */}
        <polygon
          points="245,340 355,340 375,362 265,362"
          fill={countertop === "marble" ? "url(#carraraMarble)" : "url(#neroQuartz)"}
        />
        <polygon points="265,362 375,362 375,372 265,372" fill="#94A3B8" opacity="0.5" />
        {/* Design Monographs & Brass Vessel */}
        <rect x="290" y="344" width="30" height="20" rx="1" transform="rotate(8 290 344)" fill="#0F172A" />
        <rect x="292" y="342" width="28" height="18" rx="1" transform="rotate(5 292 342)" fill="#CBD5E1" />
        <circle cx="340" cy="350" r="6" fill="#F59E0B" />
      </g>

      {/* Open Kitchen Island in Background */}
      <g>
        {/* Shadow */}
        <rect x="420" y="255" width="160" height="20" fill="#0A0E17" opacity="0.5" />
        {/* Island Body (Matte Charcoal) */}
        <polygon points="430,195 570,185 585,250 445,260" fill="#1E293B" />
        {/* Island Countertop Slab (Carrara Marble / Quartz) */}
        <polygon
          points="425,190 565,180 585,192 445,202"
          fill={countertop === "marble" ? "url(#carraraMarble)" : "url(#neroQuartz)"}
          stroke="#06B6D4"
          strokeWidth="0.5"
        />
        {/* 2 Modern Bar Stools */}
        <ellipse cx="465" cy="255" rx="12" ry="5" fill="#0F172A" />
        <line x1="465" y1="225" x2="465" y2="255" stroke="#CBD5E1" strokeWidth="2" />
        <circle cx="465" cy="225" r="10" fill="#2E1F18" />

        <ellipse cx="510" cy="250" rx="12" ry="5" fill="#0F172A" />
        <line x1="510" y1="220" x2="510" y2="250" stroke="#CBD5E1" strokeWidth="2" />
        <circle cx="510" cy="220" r="10" fill="#2E1F18" />
      </g>

      {/* Flos-style Suspended Brass Pendant Light */}
      <g>
        <line x1="300" y1="0" x2="300" y2="135" stroke="#94A3B8" strokeWidth="1" />
        <circle cx="300" cy="142" r="12" fill="#F59E0B" />
        {/* Warm glow aura */}
        <circle cx="300" cy="142" r="28" fill="#F59E0B" opacity="0.25" filter="blur(6px)" />
        <circle cx="300" cy="142" r="6" fill="#FFFBEB" />
      </g>

      {/* Indoor Fiddle-Leaf Fig Tree in Ceramic Planter */}
      <g>
        {/* Ceramic Planter */}
        <polygon points="185,320 215,320 210,350 190,350" fill="#F1F5F9" />
        {/* Lush Green Organic Leaves */}
        <path d="M 200 320 Q 185 270 170 260 Q 185 285 200 300" fill="#15803D" />
        <path d="M 200 305 Q 220 265 235 255 Q 220 285 202 300" fill="#166534" />
        <path d="M 200 280 Q 200 230 190 220 Q 205 245 200 270" fill="#22C55E" />
      </g>

      {/* 4K Spatial Engine Spec Telemetry Badge Overlay */}
      <g>
        <rect x="18" y="16" width="180" height="26" rx="6" fill="#0B0F17" fillOpacity="0.85" stroke="#06B6D4" strokeWidth="1" />
        <circle cx="30" cy="29" r="4" fill="#06B6D4" />
        <text x="42" y="33" fill="#F8FAFC" fontSize="10" fontFamily="monospace" fontWeight="bold">
          4K RAYTRACED // {light.lightKelvin}
        </text>
      </g>
    </svg>
  );
}

// Raw Framing Staging SVG (Stud framework to finished space)
export function FramingStagingSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="360" fill="#0F172A" />
      {/* Unfinished Concrete Slab */}
      <polygon points="0,240 600,240 600,360 0,360" fill="#334155" />
      {/* Stud wall timber framework (Left Half) */}
      <g stroke="#D97706" strokeWidth="5" opacity="0.9">
        <line x1="40" y1="40" x2="300" y2="40" stroke="#B45309" strokeWidth="8" />
        <line x1="40" y1="240" x2="300" y2="240" stroke="#B45309" strokeWidth="8" />
        {/* 2x6 timber studs spaced 16 inches on center */}
        {[60, 100, 140, 180, 220, 260].map((x) => (
          <line key={x} x1={x} y1="40" x2={x} y2="240" />
        ))}
        {/* Header over window rough opening */}
        <rect x="130" y="80" width="100" height="110" fill="#0B0F17" stroke="#F59E0B" strokeWidth="4" />
      </g>
      {/* Laser level alignment beam in Electric Cyan */}
      <line x1="0" y1="140" x2="600" y2="140" stroke="#06B6D4" strokeWidth="2" strokeDasharray="6 3" />
      <circle cx="300" cy="140" r="5" fill="#06B6D4" />

      {/* Finished drywalled & staged right half */}
      <polygon points="300,40 560,40 560,240 300,240" fill="#1E293B" opacity="0.95" />
      {/* Flooring finish being applied */}
      <polygon points="300,240 600,240 600,360 300,360" fill="#A87A51" />
      <text x="450" y="140" fill="#06B6D4" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
        AI SPATIAL ALIGNMENT // 100%
      </text>
    </svg>
  );
}

// Sleek Partner Monochrome Vector Logos
export function StudioPartnerLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-60 hover:opacity-90 transition-opacity">
      {/* Studio Forma */}
      <div className="flex items-center gap-2 text-slate-300 font-mono tracking-widest text-xs uppercase font-semibold">
        <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
        <span>STUDIO FORMA</span>
      </div>

      {/* Apex Living */}
      <div className="flex items-center gap-2 text-slate-300 font-mono tracking-widest text-xs uppercase font-semibold">
        <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 22h20L12 2z" />
          <line x1="12" y1="9" x2="12" y2="17" />
        </svg>
        <span>APEX LIVING</span>
      </div>

      {/* Structura Design */}
      <div className="flex items-center gap-2 text-slate-300 font-mono tracking-widest text-xs uppercase font-semibold">
        <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
        <span>STRUCTURA DESIGN</span>
      </div>

      {/* Vertex Build */}
      <div className="flex items-center gap-2 text-slate-300 font-mono tracking-widest text-xs uppercase font-semibold">
        <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l3 3 5-5" />
        </svg>
        <span>VERTEX BUILD</span>
      </div>

      {/* Archetype Labs */}
      <div className="flex items-center gap-2 text-slate-300 font-mono tracking-widest text-xs uppercase font-semibold">
        <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 21V9l8-6 8 6v12" />
          <rect x="9" y="13" width="6" height="8" />
        </svg>
        <span>ARCHETYPE LABS</span>
      </div>
    </div>
  );
}

// Integration Vector Logos
export function IntegrationLogos() {
  const integrations = [
    {
      name: "AutoCAD (.dwg)",
      ext: ".DWG / .DXF",
      badge: "Bidirectional Vector Sync",
      icon: (
        <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 20h4l2-4h8l2 4h4L12 2zm0 6l2.5 5h-5L12 8z" />
        </svg>
      )
    },
    {
      name: "SketchUp (.skp)",
      ext: ".SKP / .OBJ",
      badge: "Direct Layer Import",
      icon: (
        <svg className="w-8 h-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    },
    {
      name: "Autodesk Revit (.rvt)",
      ext: ".RVT / IFC 4.3",
      badge: "BIM Parameter Sync",
      icon: (
        <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="M4 10h16M10 4v16" />
        </svg>
      )
    },
    {
      name: "Blender (.blend)",
      ext: ".BLEND / glTF 2.0",
      badge: "PBR Material Shader Graph",
      icon: (
        <svg className="w-8 h-8 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      )
    },
    {
      name: "Figma (.fig)",
      ext: "Design Tokens API",
      badge: "Color & Spec Tokens",
      icon: (
        <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 2h4a4 4 0 0 1 0 8H8V2zm0 8h4a4 4 0 0 1 0 8H8v-8zm-4 4a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm0-8a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm0 16a4 4 0 0 1 4-4H8v4a4 4 0 0 1-4 0z" />
        </svg>
      )
    },
    {
      name: "AWS S3 / Cloud Storage",
      ext: "Automated Buckets",
      badge: "AES-256 Vault Export",
      icon: (
        <svg className="w-8 h-8 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {integrations.map((item, idx) => (
        <div
          key={idx}
          className="group p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300 flex flex-col items-center text-center space-y-3"
        >
          <div className="p-3 rounded-lg bg-slate-800/80 group-hover:scale-110 transition-transform">
            {item.icon}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-200">{item.name}</div>
            <div className="text-[10px] font-mono text-cyan-400 mt-1">{item.ext}</div>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 group-hover:text-amber-400 group-hover:bg-amber-400/10 transition-colors">
            {item.badge}
          </span>
        </div>
      ))}
    </div>
  );
}
