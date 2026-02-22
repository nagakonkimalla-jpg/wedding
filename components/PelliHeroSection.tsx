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
                <path d="M0 40 Q0 0 40 0 L50 0 Q20 5 10 20 Q5 30 0 50 Z" fill="#D4A017" opacity="0.4" />
                <path d="M0 55 Q0 0 55 0" stroke="#D4A017" strokeWidth="0.8" fill="none" opacity="0.4" />
                <path d="M0 35 Q5 10 35 0" stroke="#D4A017" strokeWidth="1" fill="none" opacity="0.5" />
                <circle cx="18" cy="18" r="2" fill="#D4A017" opacity="0.4" />
                <path d="M5 28 Q10 15 28 5" stroke="#D4A017" strokeWidth="0.5" fill="none" opacity="0.3" />
                {/* Ornate curl flourish */}
                <path d="M42 0 Q35 8 38 16 Q40 22 34 24" stroke="#D4A017" strokeWidth="0.6" fill="none" opacity="0.4" />
                <path d="M0 42 Q8 35 16 38 Q22 40 24 34" stroke="#D4A017" strokeWidth="0.6" fill="none" opacity="0.4" />
            </svg>
            {/* Top-right (mirrored) */}
            <svg className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24" viewBox="0 0 100 100" style={{ transform: "scaleX(-1)" }}>
                <path d="M0 40 Q0 0 40 0 L50 0 Q20 5 10 20 Q5 30 0 50 Z" fill="#D4A017" opacity="0.4" />
                <path d="M0 55 Q0 0 55 0" stroke="#D4A017" strokeWidth="0.8" fill="none" opacity="0.4" />
                <path d="M0 35 Q5 10 35 0" stroke="#D4A017" strokeWidth="1" fill="none" opacity="0.5" />
                <circle cx="18" cy="18" r="2" fill="#D4A017" opacity="0.4" />
                <path d="M5 28 Q10 15 28 5" stroke="#D4A017" strokeWidth="0.5" fill="none" opacity="0.3" />
                <path d="M42 0 Q35 8 38 16 Q40 22 34 24" stroke="#D4A017" strokeWidth="0.6" fill="none" opacity="0.4" />
                <path d="M0 42 Q8 35 16 38 Q22 40 24 34" stroke="#D4A017" strokeWidth="0.6" fill="none" opacity="0.4" />
            </svg>
            {/* Bottom-left */}
            <svg className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24" viewBox="0 0 100 100" style={{ transform: "scaleY(-1)" }}>
                <path d="M0 40 Q0 0 40 0 L50 0 Q20 5 10 20 Q5 30 0 50 Z" fill="#D4A017" opacity="0.4" />
                <path d="M0 55 Q0 0 55 0" stroke="#D4A017" strokeWidth="0.8" fill="none" opacity="0.4" />
                <path d="M0 35 Q5 10 35 0" stroke="#D4A017" strokeWidth="1" fill="none" opacity="0.5" />
                <circle cx="18" cy="18" r="2" fill="#D4A017" opacity="0.4" />
                <path d="M5 28 Q10 15 28 5" stroke="#D4A017" strokeWidth="0.5" fill="none" opacity="0.3" />
                <path d="M42 0 Q35 8 38 16 Q40 22 34 24" stroke="#D4A017" strokeWidth="0.6" fill="none" opacity="0.4" />
                <path d="M0 42 Q8 35 16 38 Q22 40 24 34" stroke="#D4A017" strokeWidth="0.6" fill="none" opacity="0.4" />
            </svg>
            {/* Bottom-right */}
            <svg className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24" viewBox="0 0 100 100" style={{ transform: "scale(-1)" }}>
                <path d="M0 40 Q0 0 40 0 L50 0 Q20 5 10 20 Q5 30 0 50 Z" fill="#D4A017" opacity="0.4" />
                <path d="M0 55 Q0 0 55 0" stroke="#D4A017" strokeWidth="0.8" fill="none" opacity="0.4" />
                <path d="M0 35 Q5 10 35 0" stroke="#D4A017" strokeWidth="1" fill="none" opacity="0.5" />
                <circle cx="18" cy="18" r="2" fill="#D4A017" opacity="0.4" />
                <path d="M5 28 Q10 15 28 5" stroke="#D4A017" strokeWidth="0.5" fill="none" opacity="0.3" />
                <path d="M42 0 Q35 8 38 16 Q40 22 34 24" stroke="#D4A017" strokeWidth="0.6" fill="none" opacity="0.4" />
                <path d="M0 42 Q8 35 16 38 Q22 40 24 34" stroke="#D4A017" strokeWidth="0.6" fill="none" opacity="0.4" />
            </svg>
            {/* Connecting border lines with subtle dotted feel */}
            <div className="absolute top-0 left-16 right-16 sm:left-24 sm:right-24 h-px bg-[#D4A017]/20" />
            <div className="absolute bottom-0 left-16 right-16 sm:left-24 sm:right-24 h-px bg-[#D4A017]/20" />
            <div className="absolute left-0 top-16 bottom-16 sm:top-24 sm:bottom-24 w-px bg-[#D4A017]/20" />
            <div className="absolute right-0 top-16 bottom-16 sm:top-24 sm:bottom-24 w-px bg-[#D4A017]/20" />
        </div>
    );
}

// Floating hero decorations — event-specific animated SVG elements
function HeroDecorations() {
    return (
        <>
            {/* Traditional kalash — auspicious pot */}
            <svg className="absolute top-[12%] left-[8%] w-10 h-10 sm:w-14 sm:h-14 opacity-30" viewBox="0 0 40 40" style={{ animation: "hero-float-1 6s ease-in-out infinite" }}>
                <path d="M14 24 Q13 32 16 34 Q19 36 21 36 Q23 36 26 34 Q29 32 28 24" fill="#C5A028" opacity="0.6" />
                <ellipse cx="20" cy="24" rx="8" ry="2.5" fill="#C5A028" opacity="0.7" />
                <circle cx="20" cy="20" r="4" fill="#C5A028" opacity="0.55" />
                <path d="M17 24 Q14 16 16 12" stroke="#C5A028" strokeWidth="0.8" fill="none" opacity="0.5" />
                <path d="M23 24 Q26 16 24 12" stroke="#C5A028" strokeWidth="0.8" fill="none" opacity="0.5" />
            </svg>
            {/* Paired paisley — traditional union symbol */}
            <svg className="absolute top-[22%] right-[10%] w-10 h-10 sm:w-14 sm:h-14 opacity-25" viewBox="0 0 50 40" style={{ animation: "hero-float-2 8s ease-in-out infinite" }}>
                <path d="M15 5 Q28 8 25 20 Q22 30 12 28 Q4 26 6 16 Q8 5 15 5Z" fill="none" stroke="#C5A028" strokeWidth="1" opacity="0.7" />
                <path d="M35 5 Q22 8 25 20 Q28 30 38 28 Q46 26 44 16 Q42 5 35 5Z" fill="none" stroke="#C5A028" strokeWidth="1" opacity="0.7" />
                <circle cx="14" cy="18" r="2" fill="#C5A028" opacity="0.5" />
                <circle cx="36" cy="18" r="2" fill="#C5A028" opacity="0.5" />
            </svg>
            {/* Mangalsutra pendant */}
            <svg className="absolute bottom-[30%] left-[20%] w-7 h-7 sm:w-9 sm:h-9 opacity-40" viewBox="0 0 40 40" style={{ animation: "hero-sparkle 2s ease-in-out infinite 0.5s" }}>
                <path d="M10 18 Q10 14 14 14 L26 14 Q30 14 30 18" stroke="#C5A028" strokeWidth="1" fill="none" opacity="0.6" />
                <path d="M18 18 L20 26 L22 18" fill="#C5A028" opacity="0.7" />
                <circle cx="20" cy="28" r="3" fill="#8B1A1A" opacity="0.6" />
                <circle cx="14" cy="16" r="1.5" fill="#8B1A1A" opacity="0.7" />
                <circle cx="26" cy="16" r="1.5" fill="#8B1A1A" opacity="0.7" />
            </svg>
            {/* Traditional lotus */}
            <svg className="absolute bottom-[36%] right-[16%] w-9 h-9 sm:w-12 sm:h-12 opacity-25" viewBox="0 0 40 40" style={{ animation: "hero-float-3 5s ease-in-out infinite" }}>
                {[-30, -10, 10, 30].map((angle) => (
                    <path key={angle} d="M20 22 Q18 14 20 7 Q22 14 20 22" fill="#8B1A1A" opacity="0.5" transform={`rotate(${angle} 20 22)`} />
                ))}
                <path d="M20 22 Q12 20 6 24 Q12 19 20 22" fill="#8B1A1A" opacity="0.4" />
                <path d="M20 22 Q28 20 34 24 Q28 19 20 22" fill="#8B1A1A" opacity="0.4" />
                <ellipse cx="20" cy="22" rx="4" ry="2.5" fill="#C5A028" opacity="0.6" />
            </svg>
        </>
    );
}

export default function PelliHeroSection({ event }: HeroSectionProps) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const parallaxOffset = scrollY * 0.3;
    const opacity = Math.max(0, 1 - scrollY / 600);

    return (
        <section className="relative z-[4] h-screen w-full overflow-hidden bg-[#FDFBF7]">
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
        @keyframes hero-sparkle {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.15); }
        }
      `}</style>

            {/* Decorative elegant background overlay */}
            <div className="absolute inset-0 pelli-paper-texture pointer-events-none opacity-60" />
            <div className="absolute inset-0 pelli-watercolor-wash pointer-events-none opacity-70" />

            {/* Beautiful Ivory gradient fallback */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at center, transparent 30%, #FDFBF7 100%)`,
                }}
            />

            {/* Cinematic light overlay overlay instead of dark */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/60 via-[#FDFBF7]/40 to-[#FDFBF7]/90 pointer-events-none z-[1]" />

            {/* Blurred background image behind everything */}
            <div
                className="absolute inset-0 scale-110 blur-xl opacity-20 pointer-events-none"
                style={{ transform: `scale(1.1) translateY(${parallaxOffset}px)` }}
            >
                <Image
                    src={event.heroImage}
                    alt="Atmosphere"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
            </div>

            {/* Ornamental frame overlay */}
            <OrnamentalFrame />

            <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden z-[2]">
                <HeroDecorations />
            </div>

            {/* Content with fade on scroll */}
            <div
                className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
                style={{ opacity }}
            >
                {/* Watercolor Illustration Hero */}
                <div
                    className="relative w-[180px] h-[240px] sm:w-[220px] sm:h-[300px] md:w-[280px] md:h-[360px] mb-6 rounded-md overflow-hidden p-2 bg-white border border-[#D4A017]/30"
                    style={{ boxShadow: "0 10px 40px rgba(212, 175, 55, 0.2), 0 0 10px rgba(0,0,0,0.05)" }}
                >
                    <div className="relative w-full h-full rounded-sm overflow-hidden">
                        <Image
                            src="/images/hero-illustration.png"
                            alt="Traditional Telugu Wedding Watercolor Illustration"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Ornamental line above subtitle */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 sm:w-20 h-px bg-[#D4A017]/40" />
                    <div className="w-2 h-2 rotate-45 border border-[#D4A017]/40" />
                    <div className="w-12 sm:w-20 h-px bg-[#D4A017]/40" />
                </div>

                {/* Subtitle in Telugu/native script */}
                <p
                    className="text-lg sm:text-2xl font-body tracking-[0.3em] uppercase mb-4 text-[#B8860B]"
                    style={{ textShadow: "0 1px 2px rgba(255,255,255,1)" }}
                >
                    {event.subtitle}
                </p>

                {/* Title */}
                <h1
                    className="text-4xl sm:text-6xl md:text-8xl font-heading font-bold mb-2 leading-tight text-[#8B1A1A]"
                    style={{ textShadow: "0 2px 4px rgba(255,255,255,1)" }}
                >
                    {event.title}
                </h1>

                {/* Tagline in script font */}
                <p
                    className="text-xl sm:text-3xl md:text-4xl font-script mb-10 text-[#3D2B1F]/90"
                    style={{ textShadow: "0 1px 2px rgba(255,255,255,1)" }}
                >
                    {event.tagline}
                </p>

                {/* Date & venue in elegant pill */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0">
                    <div
                        className="px-6 py-2 border rounded-full backdrop-blur-md font-body text-sm sm:text-base tracking-wide"
                        style={{ borderColor: `#D4A01740`, backgroundColor: `rgba(253, 251, 247, 0.9)`, color: "#8B1A1A" }}
                    >
                        {new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </div>
                    <div className="hidden sm:block w-8 h-px" style={{ backgroundColor: `#D4A01740` }} />
                    <div
                        className="px-6 py-2 border rounded-full backdrop-blur-md font-body text-sm sm:text-base tracking-wide"
                        style={{ borderColor: `#D4A01740`, backgroundColor: `rgba(253, 251, 247, 0.9)`, color: "#8B1A1A" }}
                    >
                        {event.time}
                    </div>
                </div>

                <div className="mt-4 font-body text-sm tracking-widest uppercase text-[#3D2B1F]/80">
                    {event.venue} &middot; {event.venueAddress}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2" style={{ opacity }}>
                <span className="text-[#B8860B]/70 text-xs font-body tracking-[0.2em] uppercase">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-[#B8860B]/70 to-transparent animate-pulse" />
            </div>

            {/* Bottom gradient transition */}
            <div
                className="absolute bottom-0 left-0 right-0 h-40 z-10"
                style={{
                    background: `linear-gradient(to top, #FDFBF7, transparent)`,
                }}
            />
        </section>
    );
}
