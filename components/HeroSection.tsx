"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { EventInfo } from "@/types";

interface HeroSectionProps {
  event: EventInfo;
}

// Ornamental corner piece SVG — traditional Indian L-shaped flourishes
function OrnamentalFrame() {
  return (
    <div className="absolute inset-6 sm:inset-10 md:inset-16 z-20 pointer-events-none">
      {/* Top-left corner */}
      <svg className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24" viewBox="0 0 100 100">
        <path d="M0 40 Q0 0 40 0 L50 0 Q20 5 10 20 Q5 30 0 50 Z" fill="white" opacity="0.15" />
        <path d="M0 55 Q0 0 55 0" stroke="white" strokeWidth="0.8" fill="none" opacity="0.12" />
        <path d="M0 35 Q5 10 35 0" stroke="white" strokeWidth="1" fill="none" opacity="0.18" />
        <circle cx="18" cy="18" r="2" fill="white" opacity="0.15" />
        <path d="M5 28 Q10 15 28 5" stroke="white" strokeWidth="0.5" fill="none" opacity="0.1" />
        {/* Ornate curl flourish */}
        <path d="M42 0 Q35 8 38 16 Q40 22 34 24" stroke="white" strokeWidth="0.6" fill="none" opacity="0.12" />
        <path d="M0 42 Q8 35 16 38 Q22 40 24 34" stroke="white" strokeWidth="0.6" fill="none" opacity="0.12" />
      </svg>
      {/* Top-right (mirrored) */}
      <svg className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24" viewBox="0 0 100 100" style={{ transform: "scaleX(-1)" }}>
        <path d="M0 40 Q0 0 40 0 L50 0 Q20 5 10 20 Q5 30 0 50 Z" fill="white" opacity="0.15" />
        <path d="M0 55 Q0 0 55 0" stroke="white" strokeWidth="0.8" fill="none" opacity="0.12" />
        <path d="M0 35 Q5 10 35 0" stroke="white" strokeWidth="1" fill="none" opacity="0.18" />
        <circle cx="18" cy="18" r="2" fill="white" opacity="0.15" />
        <path d="M5 28 Q10 15 28 5" stroke="white" strokeWidth="0.5" fill="none" opacity="0.1" />
        <path d="M42 0 Q35 8 38 16 Q40 22 34 24" stroke="white" strokeWidth="0.6" fill="none" opacity="0.12" />
        <path d="M0 42 Q8 35 16 38 Q22 40 24 34" stroke="white" strokeWidth="0.6" fill="none" opacity="0.12" />
      </svg>
      {/* Bottom-left */}
      <svg className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24" viewBox="0 0 100 100" style={{ transform: "scaleY(-1)" }}>
        <path d="M0 40 Q0 0 40 0 L50 0 Q20 5 10 20 Q5 30 0 50 Z" fill="white" opacity="0.15" />
        <path d="M0 55 Q0 0 55 0" stroke="white" strokeWidth="0.8" fill="none" opacity="0.12" />
        <path d="M0 35 Q5 10 35 0" stroke="white" strokeWidth="1" fill="none" opacity="0.18" />
        <circle cx="18" cy="18" r="2" fill="white" opacity="0.15" />
        <path d="M5 28 Q10 15 28 5" stroke="white" strokeWidth="0.5" fill="none" opacity="0.1" />
        <path d="M42 0 Q35 8 38 16 Q40 22 34 24" stroke="white" strokeWidth="0.6" fill="none" opacity="0.12" />
        <path d="M0 42 Q8 35 16 38 Q22 40 24 34" stroke="white" strokeWidth="0.6" fill="none" opacity="0.12" />
      </svg>
      {/* Bottom-right */}
      <svg className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24" viewBox="0 0 100 100" style={{ transform: "scale(-1)" }}>
        <path d="M0 40 Q0 0 40 0 L50 0 Q20 5 10 20 Q5 30 0 50 Z" fill="white" opacity="0.15" />
        <path d="M0 55 Q0 0 55 0" stroke="white" strokeWidth="0.8" fill="none" opacity="0.12" />
        <path d="M0 35 Q5 10 35 0" stroke="white" strokeWidth="1" fill="none" opacity="0.18" />
        <circle cx="18" cy="18" r="2" fill="white" opacity="0.15" />
        <path d="M5 28 Q10 15 28 5" stroke="white" strokeWidth="0.5" fill="none" opacity="0.1" />
        <path d="M42 0 Q35 8 38 16 Q40 22 34 24" stroke="white" strokeWidth="0.6" fill="none" opacity="0.12" />
        <path d="M0 42 Q8 35 16 38 Q22 40 24 34" stroke="white" strokeWidth="0.6" fill="none" opacity="0.12" />
      </svg>
      {/* Connecting border lines with subtle dotted feel */}
      <div className="absolute top-0 left-16 right-16 sm:left-24 sm:right-24 h-px bg-white/10" />
      <div className="absolute bottom-0 left-16 right-16 sm:left-24 sm:right-24 h-px bg-white/10" />
      <div className="absolute left-0 top-16 bottom-16 sm:top-24 sm:bottom-24 w-px bg-white/10" />
      <div className="absolute right-0 top-16 bottom-16 sm:top-24 sm:bottom-24 w-px bg-white/10" />
    </div>
  );
}

// Mandala backdrop — a large rangoli-inspired circle behind the main text
function MandalaBackdrop() {
  return (
    <svg className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] text-white/[0.04]" viewBox="0 0 200 200">
      {/* Outermost ring */}
      <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="0.3" fill="none" />
      {/* Scalloped outer edge */}
      {Array.from({ length: 24 }).map((_, i) => (
        <circle key={`scallop-${i}`} cx={100 + 95 * Math.cos((i * 15 * Math.PI) / 180)} cy={100 + 95 * Math.sin((i * 15 * Math.PI) / 180)} r="5" stroke="currentColor" strokeWidth="0.3" fill="none" />
      ))}
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.3" fill="none" />
      <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.3" fill="none" />
      {/* Outer petal ring — 16 elongated petals */}
      {Array.from({ length: 16 }).map((_, i) => (
        <ellipse key={`petal-outer-${i}`} cx="100" cy="18" rx="6" ry="18" fill="none" stroke="currentColor" strokeWidth="0.4"
          transform={`rotate(${i * 22.5} 100 100)`} />
      ))}
      {/* Mid petal ring — 12 petals */}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse key={`petal-mid-${i}`} cx="100" cy="38" rx="7" ry="16" fill="none" stroke="currentColor" strokeWidth="0.35"
          transform={`rotate(${i * 30} 100 100)`} />
      ))}
      {/* Inner petal ring — 8 petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={`petal-inner-${i}`} cx="100" cy="55" rx="5" ry="12" fill="none" stroke="currentColor" strokeWidth="0.3"
          transform={`rotate(${i * 45} 100 100)`} />
      ))}
      {/* Center flower — 6 filled petals */}
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse key={`center-petal-${i}`} cx="100" cy="85" rx="5" ry="13" fill="currentColor" opacity="0.25"
          transform={`rotate(${i * 60} 100 100)`} />
      ))}
      {/* Center dot */}
      <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.15" />
      <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.25" />
      {/* Decorative diamonds between mid petals */}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={`diamond-${i}`} x="97" y="28" width="6" height="6" fill="currentColor" opacity="0.15"
          transform={`rotate(${i * 30 + 15} 100 100) rotate(45 100 31)`} />
      ))}
    </svg>
  );
}

// Floating hero decorations — event-specific animated SVG elements
function HeroDecorations({ eventSlug }: { eventSlug: string }) {
  const getDecorations = () => {
    switch (eventSlug) {
      case "haldi":
        return (
          <>
            {/* Marigold flowers */}
            <svg className="absolute top-[12%] left-[8%] w-10 h-10 sm:w-14 sm:h-14 opacity-20" viewBox="0 0 40 40" style={{ animation: "hero-float-1 6s ease-in-out infinite" }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <ellipse key={i} cx="20" cy="6" rx="4" ry="8" fill="#FCD34D" transform={`rotate(${i * 45} 20 20)`} />
              ))}
              <circle cx="20" cy="20" r="5" fill="#F59E0B" />
            </svg>
            <svg className="absolute top-[25%] right-[10%] w-8 h-8 sm:w-12 sm:h-12 opacity-15" viewBox="0 0 40 40" style={{ animation: "hero-float-2 8s ease-in-out infinite" }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <ellipse key={i} cx="20" cy="6" rx="4" ry="8" fill="#FCD34D" transform={`rotate(${i * 45} 20 20)`} />
              ))}
              <circle cx="20" cy="20" r="5" fill="#F59E0B" />
            </svg>
            <svg className="absolute bottom-[28%] left-[15%] w-7 h-7 sm:w-10 sm:h-10 opacity-20" viewBox="0 0 40 40" style={{ animation: "hero-float-3 5s ease-in-out infinite" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <ellipse key={i} cx="20" cy="8" rx="3" ry="7" fill="#FBBF24" transform={`rotate(${i * 60} 20 20)`} />
              ))}
              <circle cx="20" cy="20" r="4" fill="#F59E0B" />
            </svg>
            <svg className="absolute bottom-[35%] right-[18%] w-9 h-9 sm:w-11 sm:h-11 opacity-15" viewBox="0 0 40 40" style={{ animation: "hero-float-1 7s ease-in-out infinite 1s" }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <ellipse key={i} cx="20" cy="6" rx="4" ry="8" fill="#FDE68A" transform={`rotate(${i * 45} 20 20)`} />
              ))}
              <circle cx="20" cy="20" r="5" fill="#FBBF24" />
            </svg>
          </>
        );

      case "sangeeth":
        return (
          <>
            {/* Musical notes — silver + gold accent */}
            <svg className="absolute top-[15%] left-[10%] w-8 h-8 sm:w-12 sm:h-12 opacity-25" viewBox="0 0 40 40" style={{ animation: "hero-float-1 6s ease-in-out infinite" }}>
              <circle cx="12" cy="30" r="5" fill="#CBD5E1" />
              <rect x="16" y="8" width="2" height="22" fill="#CBD5E1" />
              <path d="M18 8 Q28 6 24 16" stroke="#CBD5E1" strokeWidth="2" fill="none" />
            </svg>
            <svg className="absolute top-[20%] right-[12%] w-6 h-6 sm:w-10 sm:h-10 opacity-20" viewBox="0 0 40 40" style={{ animation: "hero-float-2 8s ease-in-out infinite" }}>
              <circle cx="10" cy="30" r="4" fill="#94A3B8" />
              <rect x="13" y="10" width="2" height="20" fill="#94A3B8" />
              <circle cx="28" cy="26" r="4" fill="#94A3B8" />
              <rect x="31" y="6" width="2" height="20" fill="#94A3B8" />
              <rect x="13" y="6" width="22" height="2" fill="#94A3B8" />
            </svg>
            {/* Gold foil sparkle stars */}
            <svg className="absolute bottom-[30%] left-[18%] w-6 h-6 sm:w-8 sm:h-8 opacity-30" viewBox="0 0 24 24" style={{ animation: "hero-sparkle 2s ease-in-out infinite" }}>
              <path d="M12 0L14 9L24 12L14 14L12 24L10 14L0 12L10 9Z" fill="#D4AF37" />
            </svg>
            <svg className="absolute top-[40%] right-[8%] w-5 h-5 sm:w-7 sm:h-7 opacity-25" viewBox="0 0 24 24" style={{ animation: "hero-sparkle 2s ease-in-out infinite 0.7s" }}>
              <path d="M12 0L14 9L24 12L14 14L12 24L10 14L0 12L10 9Z" fill="#D4AF37" />
            </svg>
            <svg className="absolute bottom-[38%] right-[22%] w-7 h-7 sm:w-9 sm:h-9 opacity-20" viewBox="0 0 40 40" style={{ animation: "hero-float-3 5s ease-in-out infinite" }}>
              <circle cx="14" cy="28" r="5" fill="#CBD5E1" />
              <rect x="18" y="6" width="2" height="22" fill="#CBD5E1" />
              <path d="M20 6 Q30 4 26 14" stroke="#CBD5E1" strokeWidth="2" fill="none" />
            </svg>
            {/* Additional gold foil speckles */}
            <svg className="absolute top-[30%] left-[5%] w-4 h-4 opacity-20" viewBox="0 0 24 24" style={{ animation: "hero-sparkle 3s ease-in-out infinite 1.2s" }}>
              <path d="M12 0L14 9L24 12L14 14L12 24L10 14L0 12L10 9Z" fill="#D4AF37" />
            </svg>
            <svg className="absolute bottom-[42%] left-[25%] w-3 h-3 opacity-15" viewBox="0 0 24 24" style={{ animation: "hero-sparkle 2.5s ease-in-out infinite 0.3s" }}>
              <path d="M12 0L14 9L24 12L14 14L12 24L10 14L0 12L10 9Z" fill="#D4AF37" />
            </svg>
          </>
        );

      case "pellikuthuru":
        return (
          <>
            {/* Mehendi paisley shapes */}
            <svg className="absolute top-[14%] left-[7%] w-10 h-10 sm:w-14 sm:h-14 opacity-20" viewBox="0 0 40 40" style={{ animation: "hero-float-1 6s ease-in-out infinite" }}>
              <path d="M20 5 Q35 10 30 25 Q25 35 15 30 Q5 25 10 15 Q15 5 20 5Z" fill="none" stroke="#DC2626" strokeWidth="1.5" opacity="0.8" />
              <path d="M20 12 Q28 15 25 23 Q22 28 17 25 Q12 22 15 17 Q18 12 20 12Z" fill="#DC2626" opacity="0.3" />
              <circle cx="20" cy="19" r="2" fill="#DC2626" opacity="0.5" />
            </svg>
            <svg className="absolute top-[22%] right-[9%] w-8 h-8 sm:w-12 sm:h-12 opacity-15" viewBox="0 0 40 40" style={{ animation: "hero-float-2 8s ease-in-out infinite" }}>
              <path d="M20 5 Q35 10 30 25 Q25 35 15 30 Q5 25 10 15 Q15 5 20 5Z" fill="none" stroke="#B91C1C" strokeWidth="1.2" opacity="0.7" />
              <path d="M20 12 Q28 15 25 23 Q22 28 17 25 Q12 22 15 17 Q18 12 20 12Z" fill="none" stroke="#B91C1C" strokeWidth="0.8" />
            </svg>
            <svg className="absolute bottom-[32%] left-[20%] w-7 h-7 sm:w-10 sm:h-10 opacity-20" viewBox="0 0 40 40" style={{ animation: "hero-float-3 5s ease-in-out infinite" }}>
              <path d="M20 8 Q32 12 28 24 Q24 32 16 28 Q8 24 12 16 Q16 8 20 8Z" fill="#EF4444" opacity="0.2" />
              <circle cx="20" cy="20" r="3" fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.4" />
            </svg>
            <svg className="absolute bottom-[25%] right-[15%] w-9 h-9 sm:w-12 sm:h-12 opacity-15" viewBox="0 0 40 40" style={{ animation: "hero-drift 12s ease-in-out infinite" }}>
              <path d="M15 5 Q30 8 28 22 Q26 34 14 30 Q4 26 8 14 Q12 5 15 5Z" fill="none" stroke="#DC2626" strokeWidth="1" opacity="0.6" />
              <path d="M18 14 Q24 16 22 22 Q20 26 16 24 Q12 22 14 18 Q16 14 18 14Z" fill="#DC2626" opacity="0.25" />
            </svg>
          </>
        );

      case "pellikoduku":
        return (
          <>
            {/* Crown / shield shapes */}
            <svg className="absolute top-[12%] left-[10%] w-10 h-10 sm:w-14 sm:h-14 opacity-20" viewBox="0 0 40 40" style={{ animation: "hero-float-1 6s ease-in-out infinite" }}>
              <path d="M8 28L4 12L12 18L20 8L28 18L36 12L32 28Z" fill="none" stroke="#D4A017" strokeWidth="1.5" />
              <path d="M10 28L30 28" stroke="#D4A017" strokeWidth="1" />
              <circle cx="20" cy="14" r="2" fill="#D4A017" opacity="0.5" />
            </svg>
            <svg className="absolute top-[28%] right-[8%] w-8 h-8 sm:w-11 sm:h-11 opacity-15" viewBox="0 0 40 40" style={{ animation: "hero-float-2 8s ease-in-out infinite" }}>
              {/* Shield shape */}
              <path d="M20 4L34 12L34 24Q34 36 20 38Q6 36 6 24L6 12Z" fill="none" stroke="#B8860B" strokeWidth="1.2" />
              <path d="M20 10L28 15L28 23Q28 31 20 33Q12 31 12 23L12 15Z" fill="#D4A017" opacity="0.15" />
            </svg>
            <svg className="absolute bottom-[30%] left-[15%] w-7 h-7 sm:w-10 sm:h-10 opacity-20" viewBox="0 0 40 40" style={{ animation: "hero-float-3 5s ease-in-out infinite" }}>
              <path d="M10 30L6 16L14 20L20 10L26 20L34 16L30 30Z" fill="#DAA520" opacity="0.25" />
              <circle cx="20" cy="18" r="2" fill="#DAA520" opacity="0.4" />
            </svg>
            <svg className="absolute bottom-[38%] right-[20%] w-8 h-8 sm:w-10 sm:h-10 opacity-15" viewBox="0 0 40 40" style={{ animation: "hero-drift 12s ease-in-out infinite" }}>
              <path d="M20 4L34 12L34 24Q34 36 20 38Q6 36 6 24L6 12Z" fill="none" stroke="#D4A017" strokeWidth="1" />
              <circle cx="20" cy="20" r="4" fill="none" stroke="#D4A017" strokeWidth="0.8" opacity="0.4" />
            </svg>
          </>
        );

      case "upanayanam":
        return (
          <>
            {/* Lotus petals falling */}
            <svg className="absolute top-[10%] left-[12%] w-10 h-10 sm:w-14 sm:h-14 opacity-20" viewBox="0 0 40 40" style={{ animation: "hero-float-1 6s ease-in-out infinite" }}>
              <path d="M20 8 Q28 14 24 24 Q20 30 16 24 Q12 14 20 8Z" fill="#F97316" opacity="0.4" />
              <path d="M20 8 Q28 14 24 24 Q20 30 16 24 Q12 14 20 8Z" fill="none" stroke="#EA580C" strokeWidth="0.8" />
            </svg>
            <svg className="absolute top-[25%] right-[10%] w-8 h-8 sm:w-12 sm:h-12 opacity-15" viewBox="0 0 40 40" style={{ animation: "hero-float-2 8s ease-in-out infinite" }}>
              {/* Full lotus */}
              {Array.from({ length: 6 }).map((_, i) => (
                <path key={i} d={`M20 8 Q26 14 23 22 Q20 28 17 22 Q14 14 20 8Z`} fill="#FB923C" opacity="0.25"
                  transform={`rotate(${i * 60} 20 20)`} />
              ))}
              <circle cx="20" cy="20" r="3" fill="#F97316" opacity="0.35" />
            </svg>
            <svg className="absolute bottom-[28%] left-[18%] w-7 h-7 sm:w-10 sm:h-10 opacity-20" viewBox="0 0 40 40" style={{ animation: "hero-float-3 5s ease-in-out infinite" }}>
              <path d="M20 10 Q26 16 23 24 Q20 28 17 24 Q14 16 20 10Z" fill="#FDBA74" opacity="0.35" />
              <path d="M12 18 Q18 14 22 20 Q26 26 20 28" fill="none" stroke="#F97316" strokeWidth="0.8" opacity="0.3" />
            </svg>
            <svg className="absolute bottom-[35%] right-[14%] w-9 h-9 sm:w-11 sm:h-11 opacity-15" viewBox="0 0 40 40" style={{ animation: "hero-drift 12s ease-in-out infinite" }}>
              <path d="M20 6 Q30 14 25 26 Q20 34 15 26 Q10 14 20 6Z" fill="none" stroke="#EA580C" strokeWidth="1" opacity="0.3" />
              <path d="M20 12 Q26 17 23 24 Q20 28 17 24 Q14 17 20 12Z" fill="#FB923C" opacity="0.2" />
            </svg>
          </>
        );

      case "pelli":
        return (
          <>
            {/* Traditional kalash — auspicious pot */}
            <svg className="absolute top-[12%] left-[8%] w-10 h-10 sm:w-14 sm:h-14 opacity-20" viewBox="0 0 40 40" style={{ animation: "hero-float-1 6s ease-in-out infinite" }}>
              <path d="M14 24 Q13 32 16 34 Q19 36 21 36 Q23 36 26 34 Q29 32 28 24" fill="#C5A028" opacity="0.4" />
              <ellipse cx="20" cy="24" rx="8" ry="2.5" fill="#C5A028" opacity="0.5" />
              <circle cx="20" cy="20" r="4" fill="#C5A028" opacity="0.35" />
              <path d="M17 24 Q14 16 16 12" stroke="#C5A028" strokeWidth="0.8" fill="none" opacity="0.3" />
              <path d="M23 24 Q26 16 24 12" stroke="#C5A028" strokeWidth="0.8" fill="none" opacity="0.3" />
            </svg>
            {/* Paired paisley — traditional union symbol */}
            <svg className="absolute top-[22%] right-[10%] w-10 h-10 sm:w-14 sm:h-14 opacity-15" viewBox="0 0 50 40" style={{ animation: "hero-float-2 8s ease-in-out infinite" }}>
              <path d="M15 5 Q28 8 25 20 Q22 30 12 28 Q4 26 6 16 Q8 5 15 5Z" fill="none" stroke="#C5A028" strokeWidth="1" opacity="0.5" />
              <path d="M35 5 Q22 8 25 20 Q28 30 38 28 Q46 26 44 16 Q42 5 35 5Z" fill="none" stroke="#C5A028" strokeWidth="1" opacity="0.5" />
              <circle cx="14" cy="18" r="2" fill="#C5A028" opacity="0.3" />
              <circle cx="36" cy="18" r="2" fill="#C5A028" opacity="0.3" />
            </svg>
            {/* Mangalsutra pendant */}
            <svg className="absolute bottom-[30%] left-[20%] w-7 h-7 sm:w-9 sm:h-9 opacity-25" viewBox="0 0 40 40" style={{ animation: "hero-sparkle 2s ease-in-out infinite 0.5s" }}>
              <path d="M10 18 Q10 14 14 14 L26 14 Q30 14 30 18" stroke="#C5A028" strokeWidth="1" fill="none" opacity="0.4" />
              <path d="M18 18 L20 26 L22 18" fill="#C5A028" opacity="0.5" />
              <circle cx="20" cy="28" r="3" fill="#8B1A1A" opacity="0.4" />
              <circle cx="14" cy="16" r="1.5" fill="#8B1A1A" opacity="0.5" />
              <circle cx="26" cy="16" r="1.5" fill="#8B1A1A" opacity="0.5" />
            </svg>
            {/* Traditional lotus */}
            <svg className="absolute bottom-[36%] right-[16%] w-9 h-9 sm:w-12 sm:h-12 opacity-15" viewBox="0 0 40 40" style={{ animation: "hero-float-3 5s ease-in-out infinite" }}>
              {[-30, -10, 10, 30].map((angle) => (
                <path key={angle} d="M20 22 Q18 14 20 7 Q22 14 20 22" fill="#8B1A1A" opacity="0.3" transform={`rotate(${angle} 20 22)`} />
              ))}
              <path d="M20 22 Q12 20 6 24 Q12 19 20 22" fill="#8B1A1A" opacity="0.2" />
              <path d="M20 22 Q28 20 34 24 Q28 19 20 22" fill="#8B1A1A" opacity="0.2" />
              <ellipse cx="20" cy="22" rx="4" ry="2.5" fill="#C5A028" opacity="0.4" />
            </svg>
          </>
        );

      case "satyanarayana-swami-vratam":
        return (
          <>
            {/* Diya flames flickering */}
            <svg className="absolute top-[14%] left-[10%] w-9 h-9 sm:w-12 sm:h-12 opacity-25" viewBox="0 0 40 40" style={{ animation: "hero-float-1 6s ease-in-out infinite" }}>
              {/* Diya base */}
              <ellipse cx="20" cy="32" rx="10" ry="4" fill="#C2410C" opacity="0.4" />
              <path d="M12 30 Q10 32 12 34 L28 34 Q30 32 28 30Z" fill="#EA580C" opacity="0.3" />
              {/* Flame */}
              <path d="M20 10 Q24 18 22 24 Q20 28 18 24 Q16 18 20 10Z" fill="#FCD34D" opacity="0.5" />
              <path d="M20 14 Q22 19 21 23 Q20 25 19 23 Q18 19 20 14Z" fill="#FBBF24" opacity="0.6" />
            </svg>
            <svg className="absolute top-[26%] right-[12%] w-8 h-8 sm:w-11 sm:h-11 opacity-20" viewBox="0 0 40 40" style={{ animation: "hero-sparkle 2s ease-in-out infinite 0.3s" }}>
              <ellipse cx="20" cy="32" rx="8" ry="3" fill="#C2410C" opacity="0.35" />
              <path d="M14 30 Q12 32 14 34 L26 34 Q28 32 26 30Z" fill="#EA580C" opacity="0.25" />
              <path d="M20 12 Q23 18 22 24 Q20 27 18 24 Q17 18 20 12Z" fill="#FCD34D" opacity="0.45" />
              <path d="M20 15 Q22 19 21 23 Q20 25 19 23 Q18 19 20 15Z" fill="#FDE68A" opacity="0.5" />
            </svg>
            <svg className="absolute bottom-[28%] left-[16%] w-7 h-7 sm:w-10 sm:h-10 opacity-20" viewBox="0 0 40 40" style={{ animation: "hero-sparkle 2s ease-in-out infinite 0.8s" }}>
              <ellipse cx="20" cy="32" rx="8" ry="3" fill="#9A3412" opacity="0.3" />
              <path d="M14 30 Q12 32 14 34 L26 34 Q28 32 26 30Z" fill="#C2410C" opacity="0.2" />
              <path d="M20 10 Q24 17 22 23 Q20 27 18 23 Q16 17 20 10Z" fill="#FBBF24" opacity="0.4" />
            </svg>
            <svg className="absolute bottom-[35%] right-[18%] w-8 h-8 sm:w-10 sm:h-10 opacity-15" viewBox="0 0 40 40" style={{ animation: "hero-float-3 5s ease-in-out infinite" }}>
              <ellipse cx="20" cy="32" rx="9" ry="3.5" fill="#C2410C" opacity="0.3" />
              <path d="M13 30 Q11 32 13 34 L27 34 Q29 32 27 30Z" fill="#EA580C" opacity="0.2" />
              <path d="M20 8 Q25 16 23 24 Q20 28 17 24 Q15 16 20 8Z" fill="#FCD34D" opacity="0.35" />
              <path d="M20 13 Q23 18 22 23 Q20 26 18 23 Q17 18 20 13Z" fill="#FDE68A" opacity="0.45" />
            </svg>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
      {getDecorations()}
    </div>
  );
}

export default function HeroSection({ event }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const opacity = Math.max(0, 1 - scrollY / 600);

  return (
    <section className="relative z-[4] h-screen w-full overflow-hidden">
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes hero-float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-12px) translateX(4px); }
          50% { transform: translateY(-6px) translateX(-3px); }
          75% { transform: translateY(-14px) translateX(2px); }
        }
        @keyframes hero-float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          30% { transform: translateY(-8px) translateX(-5px); }
          60% { transform: translateY(-16px) translateX(3px); }
          80% { transform: translateY(-4px) translateX(-2px); }
        }
        @keyframes hero-float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          20% { transform: translateY(-10px) translateX(6px); }
          50% { transform: translateY(-4px) translateX(-4px); }
          70% { transform: translateY(-15px) translateX(2px); }
        }
        @keyframes hero-drift {
          0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          25% { transform: translateX(10px) translateY(-5px) rotate(3deg); }
          50% { transform: translateX(-5px) translateY(-10px) rotate(-2deg); }
          75% { transform: translateX(8px) translateY(-3px) rotate(1deg); }
        }
        @keyframes hero-sparkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.15); }
        }
      `}</style>

      {/* Background Image with parallax */}
      <div
        className="absolute inset-0 scale-110"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <Image
          src={event.heroImage}
          alt={event.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient fallback - Subtler for watercolor */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${event.theme.bg}C0, ${event.theme.bg}A0, transparent)`,
        }}
      />

      {/* Cinematic light overlay overlay instead of dark */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/40 via-[#FDFBF7]/30 to-[#FDFBF7]/80" />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 30%, ${event.theme.bg} 100%)`,
        }}
      />

      {/* Decorative elegant background overlay */}
      <div className="absolute inset-0 paper-texture pointer-events-none opacity-40" />

      {/* Floating themed decorations */}
      <HeroDecorations eventSlug={event.slug} />

      {/* Ornamental top border accent */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pt-8" style={{ opacity }}>
        <svg width="200" height="40" viewBox="0 0 200 40" fill="none" className="text-white/40">
          <path d="M0 20 Q50 0 100 20 Q150 40 200 20" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="100" cy="20" r="4" fill="currentColor" />
          <circle cx="60" cy="12" r="2" fill="currentColor" />
          <circle cx="140" cy="12" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* Content with fade on scroll */}
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        style={{ opacity }}
      >
        {/* Lord Vinayaka — main hero image */}
        <div
          className="relative w-[110px] h-[120px] sm:w-[140px] sm:h-[155px] md:w-[170px] md:h-[188px] mb-4 rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 0 50px rgba(212, 175, 55, 0.35), 0 8px 30px rgba(0,0,0,0.3)" }}
        >
          <Image
            src="/images/ganesha.png"
            alt="Lord Vinayaka"
            fill
            className="object-cover"
          />
        </div>

        {/* Ornamental line above subtitle */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 sm:w-20 h-px bg-[#D4A017]/40" />
          <div className="w-2 h-2 rotate-45 border border-[#D4A017]/40" />
          <div className="w-12 sm:w-20 h-px bg-[#D4A017]/40" />
        </div>

        {/* Subtitle in Telugu/native script */}
        <p
          className="text-lg sm:text-2xl font-body tracking-[0.3em] uppercase mb-4"
          style={{ color: event.theme.text, textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
        >
          {event.subtitle}
        </p>

        {/* Title */}
        <h1
          className="text-4xl sm:text-6xl md:text-8xl font-heading font-bold mb-2 leading-tight"
          style={{ color: event.theme.primary, textShadow: "0 2px 4px rgba(255,255,255,0.9)" }}
        >
          {event.title}
        </h1>

        {/* Tagline in script font */}
        <p
          className="text-xl sm:text-3xl md:text-4xl font-script mb-10"
          style={{ color: event.theme.text, opacity: 0.9, textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
        >
          {event.tagline}
        </p>

        {/* Date & venue in elegant pill */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0">
          <div
            className="px-6 py-2 border rounded-full backdrop-blur-md font-body text-sm sm:text-base tracking-wide"
            style={{ borderColor: `${event.theme.primary}40`, backgroundColor: `${event.theme.bg}E0`, color: event.theme.text }}
          >
            {new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="hidden sm:block w-8 h-px" style={{ backgroundColor: `${event.theme.primary}40` }} />
          <div
            className="px-6 py-2 border rounded-full backdrop-blur-md font-body text-sm sm:text-base tracking-wide"
            style={{ borderColor: `${event.theme.primary}40`, backgroundColor: `${event.theme.bg}E0`, color: event.theme.text }}
          >
            {event.time}
          </div>
        </div>

        <div className="mt-4 font-body text-sm tracking-widest uppercase" style={{ color: event.theme.text, opacity: 0.8 }}>
          {event.venue} &middot; {event.venueAddress}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2" style={{ opacity }}>
        <span className="text-white/50 text-xs font-body tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>

      {/* Bottom gradient transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10"
        style={{
          background: `linear-gradient(to top, ${event.theme.bg}, transparent)`,
        }}
      />
    </section>
  );
}
