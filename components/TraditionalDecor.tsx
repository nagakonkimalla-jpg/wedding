"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { EventTheme } from "@/types";

interface TraditionalDecorProps {
  eventSlug: string;
  theme: EventTheme;
}

/* =============================================================================
   SVG COMPONENTS — Marigold Toran, Banana Trees, Corner Ornaments
   ============================================================================= */

function MarigoldToranSVG({
  width,
  className,
  style,
}: {
  width: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  // A full-width marigold garland (toran) with draped flowers and leaves
  const h = width * 0.18;
  return (
    <svg
      width={width}
      height={h}
      viewBox="0 0 800 140"
      className={className}
      style={style}
      aria-hidden="true"
      preserveAspectRatio="xMidYMin meet"
    >
      {/* Hanging string */}
      <path
        d="M0 8 Q100 5 200 40 Q300 75 400 80 Q500 75 600 40 Q700 5 800 8"
        stroke="#8B6914"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      {/* Second string parallel */}
      <path
        d="M0 12 Q100 10 200 44 Q300 78 400 84 Q500 78 600 44 Q700 10 800 12"
        stroke="#8B6914"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />

      {/* Mango leaves at attachment points */}
      {[0, 800].map((x) => (
        <g key={`leaf-${x}`}>
          <ellipse cx={x} cy={12} rx="18" ry="6" fill="#4A7C30" opacity="0.7" transform={`rotate(${x === 0 ? 30 : -30} ${x} 12)`} />
          <ellipse cx={x} cy={12} rx="18" ry="6" fill="#5A8C3A" opacity="0.5" transform={`rotate(${x === 0 ? -15 : 15} ${x} 12)`} />
        </g>
      ))}

      {/* Marigold flowers along the garland curve */}
      {[
        { x: 80, y: 22 }, { x: 140, y: 32 }, { x: 200, y: 42 },
        { x: 260, y: 55 }, { x: 320, y: 66 }, { x: 370, y: 74 },
        { x: 400, y: 78 }, { x: 430, y: 74 }, { x: 480, y: 66 },
        { x: 540, y: 55 }, { x: 600, y: 42 }, { x: 660, y: 32 },
        { x: 720, y: 22 },
      ].map((pos, i) => {
        const isLarge = i % 3 === 0;
        const r = isLarge ? 14 : 10;
        const color = i % 2 === 0 ? "#F59E0B" : "#EA580C";
        const color2 = i % 2 === 0 ? "#FCD34D" : "#F97316";
        return (
          <g key={i}>
            {/* Outer petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <ellipse
                key={angle}
                cx={pos.x}
                cy={pos.y - r * 0.4}
                rx={r * 0.35}
                ry={r * 0.7}
                fill={color}
                opacity="0.85"
                transform={`rotate(${angle} ${pos.x} ${pos.y})`}
              />
            ))}
            {/* Inner petals */}
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
              <ellipse
                key={`in-${angle}`}
                cx={pos.x}
                cy={pos.y - r * 0.25}
                rx={r * 0.25}
                ry={r * 0.5}
                fill={color2}
                opacity="0.7"
                transform={`rotate(${angle} ${pos.x} ${pos.y})`}
              />
            ))}
            {/* Center */}
            <circle cx={pos.x} cy={pos.y} r={r * 0.3} fill={color} opacity="0.9" />
          </g>
        );
      })}

      {/* Small green leaves between flowers */}
      {[
        { x: 110, y: 26 }, { x: 170, y: 38 }, { x: 230, y: 50 },
        { x: 290, y: 62 }, { x: 350, y: 71 }, { x: 450, y: 71 },
        { x: 510, y: 62 }, { x: 570, y: 50 }, { x: 630, y: 38 },
        { x: 690, y: 26 },
      ].map((pos, i) => (
        <g key={`lf-${i}`}>
          <ellipse cx={pos.x} cy={pos.y} rx="5" ry="10" fill="#4A7C30" opacity="0.6" transform={`rotate(${20 + i * 5} ${pos.x} ${pos.y})`} />
          <ellipse cx={pos.x + 6} cy={pos.y + 2} rx="4" ry="8" fill="#5A8C3A" opacity="0.5" transform={`rotate(${-15 + i * 3} ${pos.x + 6} ${pos.y + 2})`} />
        </g>
      ))}

      {/* Hanging tassels/flowers at the bottom of the drape */}
      {[200, 280, 340, 400, 460, 520, 600].map((x, i) => {
        const curveY = 80 - Math.abs(x - 400) * 0.08;
        return (
          <g key={`tassel-${i}`}>
            <line x1={x} y1={curveY} x2={x} y2={curveY + 22} stroke="#8B6914" strokeWidth="1" opacity="0.5" />
            {/* Small hanging flower */}
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx={x}
                cy={curveY + 22 - 4}
                rx="3"
                ry="6"
                fill={i % 2 === 0 ? "#F59E0B" : "#EA580C"}
                opacity="0.75"
                transform={`rotate(${angle} ${x} ${curveY + 22})`}
              />
            ))}
            <circle cx={x} cy={curveY + 22} r="3" fill="#FCD34D" opacity="0.8" />
          </g>
        );
      })}
    </svg>
  );
}

function BananaPlantSVG({
  size,
  flip,
  className,
  style,
}: {
  size: number;
  flip?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const h = size * 2.5;
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 100 250"
      className={className}
      style={{
        ...style,
        ...(flip ? { transform: `${style?.transform || ""} scaleX(-1)`.trim() } : {}),
      }}
      aria-hidden="true"
    >
      {/* Trunk */}
      <path
        d="M48 250 L48 80 Q48 60 50 50 L52 50 Q52 60 52 80 L52 250"
        fill="#6B8E3A"
        opacity="0.6"
      />
      {/* Trunk texture lines */}
      {[90, 110, 130, 150, 170, 190, 210, 230].map((y) => (
        <line key={y} x1="48" y1={y} x2="52" y2={y} stroke="#5A7C30" strokeWidth="0.5" opacity="0.4" />
      ))}

      {/* Large banana leaves - fanning out */}
      {/* Leaf 1 - top right */}
      <path
        d="M50 55 Q70 30 95 15 Q75 35 60 55"
        fill="#4A8C30"
        opacity="0.7"
      />
      <path d="M50 55 Q72 32 95 15" stroke="#3A7020" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Leaf 2 - top left */}
      <path
        d="M50 55 Q30 25 5 10 Q25 30 40 55"
        fill="#5A9C3A"
        opacity="0.65"
      />
      <path d="M50 55 Q28 28 5 10" stroke="#3A7020" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Leaf 3 - mid right */}
      <path
        d="M50 75 Q75 55 98 45 Q78 60 58 78"
        fill="#4A8C30"
        opacity="0.6"
      />
      <path d="M50 75 Q76 56 98 45" stroke="#3A7020" strokeWidth="0.7" fill="none" opacity="0.4" />

      {/* Leaf 4 - mid left */}
      <path
        d="M50 75 Q25 50 2 40 Q22 55 42 78"
        fill="#5A9C3A"
        opacity="0.55"
      />
      <path d="M50 75 Q24 52 2 40" stroke="#3A7020" strokeWidth="0.7" fill="none" opacity="0.4" />

      {/* Leaf 5 - lower right, drooping */}
      <path
        d="M50 100 Q72 85 92 80 Q75 90 55 105"
        fill="#4A8C30"
        opacity="0.5"
      />

      {/* Leaf 6 - lower left, drooping */}
      <path
        d="M50 100 Q28 85 8 80 Q25 90 45 105"
        fill="#5A9C3A"
        opacity="0.45"
      />

      {/* Small decorative leaves near top */}
      <path
        d="M50 48 Q55 35 65 28 Q58 38 52 48"
        fill="#6AAC4A"
        opacity="0.5"
      />
      <path
        d="M50 48 Q45 35 35 28 Q42 38 48 48"
        fill="#6AAC4A"
        opacity="0.5"
      />

      {/* Banana bunch (optional decorative) */}
      <ellipse cx="58" cy="68" rx="4" ry="7" fill="#E5C040" opacity="0.4" transform="rotate(-20 58 68)" />
      <ellipse cx="55" cy="70" rx="3.5" ry="6" fill="#D4A030" opacity="0.35" transform="rotate(-15 55 70)" />

      {/* Base/pot decorative */}
      <ellipse cx="50" cy="248" rx="16" ry="4" fill="#8B6914" opacity="0.4" />
      <path d="M34 248 Q34 240 38 235 L62 235 Q66 240 66 248" fill="#C5A028" opacity="0.3" />
    </svg>
  );
}

function OrnateCornerSVG({
  size,
  color,
  className,
  style,
}: {
  size: number;
  color: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 150 150"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Outer corner arcs */}
      <path d="M5 5 Q5 145 145 145" fill="none" stroke={color} strokeWidth="2.5" opacity="0.5" />
      <path d="M15 5 Q15 135 135 135" fill="none" stroke={color} strokeWidth="1.5" opacity="0.35" />
      <path d="M25 5 Q25 125 125 125" fill="none" stroke={color} strokeWidth="1" opacity="0.25" />

      {/* Corner paisley motif */}
      <path
        d="M25 25 Q12 25 10 40 Q8 60 25 65 Q35 62 38 50 Q40 35 30 28 Q28 26 25 25 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.5"
      />
      <path d="M25 25 Q22 18 18 25 Q22 30 25 27" fill={color} opacity="0.4" />
      <circle cx="23" cy="42" r="3" fill={color} opacity="0.35" />

      {/* Floral dots along curves */}
      {[
        [45, 8], [70, 12], [95, 22], [115, 40], [128, 62],
        [135, 88], [138, 115], [142, 140],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill={color} opacity={0.3 + (i * 0.02)} />
      ))}

      {/* Decorative flower at corner */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="30"
          cy="24"
          rx="4"
          ry="8"
          fill={color}
          opacity="0.25"
          transform={`rotate(${angle} 30 30)`}
        />
      ))}
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.3" />

      {/* Small leaf sprigs */}
      <path d="M45 15 Q55 10 60 18 Q55 14 45 20" fill={color} opacity="0.25" />
      <path d="M15 45 Q10 55 18 60 Q14 55 20 45" fill={color} opacity="0.25" />
    </svg>
  );
}

/* =============================================================================
   TRADITIONAL EVENTS COMPOSITION
   ============================================================================= */

const TRADITIONAL_EVENTS = [
  "haldi",
  "karthik-upanayanam",
  "mehendi",
  "pellikuthuru",
  "pellikoduku",
  "aditya-upanayanam",
  "pelli",
  "satyanarayana-swami-vratam-aditya",
  "satyanarayana-swami-vratam-neelu",
];

function TraditionalComposition({ theme }: { theme: EventTheme }) {
  const cornerColor = theme.accent || "#C5A028";

  return (
    <>
      {/* ===== MARIGOLD TORAN at top ===== */}
      <div className="fixed top-0 left-0 right-0 pointer-events-none z-0 flex justify-center">
        <MarigoldToranSVG
          width={900}
          className="w-full max-w-[900px]"
          style={{ opacity: 0.35 }}
        />
      </div>

      {/* ===== BANANA TREES on sides ===== */}
      {/* Left banana tree */}
      <div className="hidden sm:block fixed bottom-0 left-0 pointer-events-none z-0">
        <BananaPlantSVG
          size={70}
          className="sm:w-[60px] md:w-[80px] lg:w-[100px] h-auto"
          style={{ opacity: 0.3 }}
        />
      </div>
      {/* Right banana tree */}
      <div className="hidden sm:block fixed bottom-0 right-0 pointer-events-none z-0">
        <BananaPlantSVG
          size={70}
          flip
          className="sm:w-[60px] md:w-[80px] lg:w-[100px] h-auto"
          style={{ opacity: 0.3 }}
        />
      </div>

      {/* ===== ORNATE CORNERS ===== */}
      {/* Top-left */}
      <div className="hidden sm:block fixed top-0 left-0 pointer-events-none z-0">
        <OrnateCornerSVG
          size={120}
          color={cornerColor}
          className="sm:w-[90px] md:w-[120px] lg:w-[150px] h-auto"
          style={{ opacity: 0.4 }}
        />
      </div>
      {/* Top-right */}
      <div className="hidden sm:block fixed top-0 right-0 pointer-events-none z-0">
        <OrnateCornerSVG
          size={120}
          color={cornerColor}
          className="sm:w-[90px] md:w-[120px] lg:w-[150px] h-auto"
          style={{ opacity: 0.4, transform: "scaleX(-1)" }}
        />
      </div>
      {/* Bottom-left */}
      <div className="hidden md:block fixed bottom-0 left-0 pointer-events-none z-0">
        <OrnateCornerSVG
          size={100}
          color={cornerColor}
          className="md:w-[100px] lg:w-[130px] h-auto"
          style={{ opacity: 0.3, transform: "scaleY(-1)" }}
        />
      </div>
      {/* Bottom-right */}
      <div className="hidden md:block fixed bottom-0 right-0 pointer-events-none z-0">
        <OrnateCornerSVG
          size={100}
          color={cornerColor}
          className="md:w-[100px] lg:w-[130px] h-auto"
          style={{ opacity: 0.3, transform: "scale(-1, -1)" }}
        />
      </div>

      {/* ===== GOLD FLOWER CORNER overlays (valid PNG) ===== */}
      <div className="hidden sm:block fixed top-0 left-0 pointer-events-none z-0">
        <Image
          src="/images/decor/gold-flower-corner.png"
          alt=""
          width={600}
          height={524}
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto"
          style={{ opacity: 0.25 }}
          aria-hidden="true"
        />
      </div>
      <div className="hidden sm:block fixed top-0 right-0 pointer-events-none z-0">
        <Image
          src="/images/decor/gold-flower-corner.png"
          alt=""
          width={600}
          height={524}
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto"
          style={{ opacity: 0.25, transform: "scaleX(-1)" }}
          aria-hidden="true"
        />
      </div>

      {/* ===== BACKGROUND GOLD MANDALA (valid PNG, subtle) ===== */}
      <div className="hidden sm:block fixed top-1/2 left-1/2 pointer-events-none z-0" style={{ transform: "translate(-50%, -50%)" }}>
        <Image
          src="/images/decor/gold-mandala.png"
          alt=""
          width={900}
          height={900}
          className="w-[500px] md:w-[700px] lg:w-[900px] h-auto"
          style={{ opacity: 0.08 }}
          aria-hidden="true"
        />
      </div>

      {/* ===== WEDDING BORDER as decorative separator (valid PNG) ===== */}
      <div className="hidden md:block fixed top-[50%] left-0 right-0 pointer-events-none z-0 flex justify-center">
        <Image
          src="/images/decor/wedding-border.png"
          alt=""
          width={900}
          height={331}
          className="w-full max-w-[800px] mx-auto h-auto"
          style={{ opacity: 0.12 }}
          aria-hidden="true"
        />
      </div>
    </>
  );
}

/* =============================================================================
   PELLI EXTRA — additional elements for wedding page
   ============================================================================= */

function PelliExtra({ theme }: { theme: EventTheme }) {
  return (
    <>
      {/* Gold frame accents on sides */}
      <div className="hidden md:block fixed top-[35%] left-[2%] pointer-events-none z-0">
        <Image
          src="/images/decor/gold-frame.png"
          alt=""
          width={601}
          height={588}
          className="w-[80px] md:w-[100px] h-auto"
          style={{ opacity: 0.15 }}
          aria-hidden="true"
        />
      </div>
      <div className="hidden md:block fixed top-[35%] right-[2%] pointer-events-none z-0">
        <Image
          src="/images/decor/gold-frame.png"
          alt=""
          width={601}
          height={588}
          className="w-[80px] md:w-[100px] h-auto"
          style={{ opacity: 0.15, transform: "scaleX(-1)" }}
          aria-hidden="true"
        />
      </div>
      <div className="hidden lg:block fixed top-[60%] left-[2%] pointer-events-none z-0">
        <Image
          src="/images/decor/gold-frame.png"
          alt=""
          width={601}
          height={588}
          className="w-[70px] lg:w-[85px] h-auto"
          style={{ opacity: 0.12 }}
          aria-hidden="true"
        />
      </div>
      <div className="hidden lg:block fixed top-[60%] right-[2%] pointer-events-none z-0">
        <Image
          src="/images/decor/gold-frame.png"
          alt=""
          width={601}
          height={588}
          className="w-[70px] lg:w-[85px] h-auto"
          style={{ opacity: 0.12, transform: "scaleX(-1)" }}
          aria-hidden="true"
        />
      </div>

      {/* Second toran lower down for extra richness */}
      <div className="hidden lg:block fixed top-[85vh] left-0 right-0 pointer-events-none z-0 flex justify-center">
        <MarigoldToranSVG
          width={600}
          className="w-full max-w-[600px] mx-auto"
          style={{ opacity: 0.35 }}
        />
      </div>
    </>
  );
}

/* =============================================================================
   SANGEETH — modern silver/watercolor theme (no traditional elements)
   ============================================================================= */

function SangeethComposition() {
  return (
    <>
      {/* Gray ink splash: top-right */}
      <div className="hidden sm:block fixed top-0 right-0 pointer-events-none z-0">
        <Image
          src="/images/decor/gray-ink-splash.png"
          alt=""
          width={900}
          height={752}
          className="w-[250px] md:w-[400px] lg:w-[500px] h-auto"
          style={{ opacity: 0.18 }}
          aria-hidden="true"
        />
      </div>

      {/* Gray ink splash: bottom-left (rotated) */}
      <div className="hidden sm:block fixed bottom-0 left-0 pointer-events-none z-0">
        <Image
          src="/images/decor/gray-ink-splash.png"
          alt=""
          width={900}
          height={752}
          className="w-[250px] md:w-[400px] lg:w-[500px] h-auto"
          style={{ opacity: 0.18, transform: "rotate(180deg)" }}
          aria-hidden="true"
        />
      </div>

      {/* Grey watercolor: top-left */}
      <div className="hidden md:block fixed top-0 left-0 pointer-events-none z-0">
        <Image
          src="/images/decor/grey-watercolor.png"
          alt=""
          width={900}
          height={900}
          className="w-[300px] md:w-[450px] lg:w-[600px] h-auto"
          style={{ opacity: 0.12, transform: "rotate(180deg)" }}
          aria-hidden="true"
        />
      </div>

      {/* Grey watercolor: bottom-right */}
      <div className="hidden md:block fixed bottom-0 right-0 pointer-events-none z-0">
        <Image
          src="/images/decor/grey-watercolor.png"
          alt=""
          width={900}
          height={900}
          className="w-[300px] md:w-[450px] lg:w-[600px] h-auto"
          style={{ opacity: 0.12 }}
          aria-hidden="true"
        />
      </div>

      {/* Gold mandala desaturated to silver */}
      <div className="hidden sm:block fixed top-1/2 left-1/2 pointer-events-none z-0" style={{ transform: "translate(-50%, -50%)" }}>
        <Image
          src="/images/decor/gold-mandala.png"
          alt=""
          width={900}
          height={900}
          className="w-[450px] md:w-[650px] lg:w-[850px] h-auto"
          style={{ opacity: 0.05, filter: "saturate(0) brightness(1.3)" }}
          aria-hidden="true"
        />
      </div>
    </>
  );
}

/* =============================================================================
   MAIN EXPORTED COMPONENT
   ============================================================================= */

export default function TraditionalDecor({ eventSlug, theme }: TraditionalDecorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isTraditional = TRADITIONAL_EVENTS.includes(eventSlug);

  if (eventSlug === "sangeeth") {
    return (
      <div aria-hidden="true">
        <SangeethComposition />
      </div>
    );
  }

  if (isTraditional) {
    return (
      <div aria-hidden="true">
        <TraditionalComposition theme={theme} />
        {eventSlug === "pelli" && <PelliExtra theme={theme} />}
      </div>
    );
  }

  return null;
}
