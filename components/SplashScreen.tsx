"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

interface SplashScreenProps {
  onEnter: () => void;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

// Three layers: fast inner burst + medium ring + slow outer drift
function generateSparkles(): Sparkle[] {
  const sparkles: Sparkle[] = [];
  // Inner fast burst — 24 sparkles
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * 360 + (Math.random() - 0.5) * 15;
    const dist = 80 + Math.random() * 160;
    const rad = (angle * Math.PI) / 180;
    sparkles.push({
      id: i,
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist,
      size: 16 + Math.random() * 14,
      delay: Math.random() * 0.1,
      duration: 0.6 + Math.random() * 0.3,
      opacity: 0.9 + Math.random() * 0.1,
    });
  }
  // Medium ring — 20 sparkles
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * 360 + (Math.random() - 0.5) * 20;
    const dist = 200 + Math.random() * 250;
    const rad = (angle * Math.PI) / 180;
    sparkles.push({
      id: 24 + i,
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist,
      size: 22 + Math.random() * 18,
      delay: 0.03 + Math.random() * 0.12,
      duration: 0.7 + Math.random() * 0.4,
      opacity: 0.8 + Math.random() * 0.2,
    });
  }
  // Outer slow drift — 16 large sparkles that reach screen edges
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * 360 + (Math.random() - 0.5) * 25;
    const dist = 400 + Math.random() * 350;
    const rad = (angle * Math.PI) / 180;
    sparkles.push({
      id: 44 + i,
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist,
      size: 28 + Math.random() * 24,
      delay: 0.06 + Math.random() * 0.18,
      duration: 0.9 + Math.random() * 0.5,
      opacity: 0.6 + Math.random() * 0.3,
    });
  }
  return sparkles;
}

const sparkles = generateSparkles();

// Four-pointed sparkle/twinkle star
function Twinkle({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M12 0L13.5 9L22 12L13.5 15L12 24L10.5 15L2 12L10.5 9Z"
        fill={color}
      />
    </svg>
  );
}

// Play reveal sound effect from audio file
function playCelebrationSound() {
  try {
    const audio = new Audio("/audio/reveal.mp3");
    audio.volume = 1.0;
    audio.play().catch(() => {});
  } catch {
    // silent fallback
  }
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (exiting) return;

      // Haptic feedback on Android
      if (navigator.vibrate) {
        navigator.vibrate([30, 50, 20]);
      }

      // Celebratory bell chime
      playCelebrationSound();

      const rect = e.currentTarget.getBoundingClientRect();
      setBurstOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setExiting(true);
      setTimeout(() => {
        onEnter();
      }, prefersReducedMotion ? 400 : 1200);
    },
    [exiting, onEnter, prefersReducedMotion]
  );

  const stagger = prefersReducedMotion ? 0 : 0.15;
  const duration = prefersReducedMotion ? 0.2 : 0.6;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={false}
    >
      {/* Left curtain half */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#FFFFF0]"
        animate={exiting ? { x: "-100%" } : { x: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.8,
          ease: [0.4, 0, 0.2, 1],
          delay: prefersReducedMotion ? 0.15 : 0.6,
        }}
      >
        <div className="absolute inset-0 pattern-overlay opacity-50" />
      </motion.div>

      {/* Right curtain half */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#FFFFF0]"
        animate={exiting ? { x: "100%" } : { x: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.8,
          ease: [0.4, 0, 0.2, 1],
          delay: prefersReducedMotion ? 0.15 : 0.6,
        }}
      >
        <div className="absolute inset-0 pattern-overlay opacity-50" />
      </motion.div>

      {/* Full-screen gold flash pulse */}
      {exiting && !prefersReducedMotion && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[15]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0.15, 0] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: `radial-gradient(circle at ${burstOrigin.x}px ${burstOrigin.y}px, rgba(212,175,55,0.6) 0%, rgba(212,160,23,0.25) 30%, rgba(212,160,23,0.08) 55%, transparent 80%)`,
          }}
        />
      )}

      {/* Expanding ring wave */}
      {exiting && !prefersReducedMotion && (
        <motion.div
          className="fixed pointer-events-none z-[16] rounded-full border-2 border-[#D4A017]"
          style={{
            left: burstOrigin.x,
            top: burstOrigin.y,
            marginLeft: -20,
            marginTop: -20,
            width: 40,
            height: 40,
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 30, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}

      {/* Sparkle burst — covers full screen */}
      {exiting && !prefersReducedMotion && (
        <div
          className="fixed pointer-events-none z-30"
          style={{ left: burstOrigin.x, top: burstOrigin.y }}
        >
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              className="absolute"
              style={{
                marginLeft: -s.size / 2,
                marginTop: -s.size / 2,
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: s.x,
                y: s.y,
                opacity: [0, s.opacity, s.opacity * 0.6, 0],
                scale: [0, 1.4, 0.9, 0],
              }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                ease: "easeOut",
              }}
            >
              <Twinkle size={s.size} color="#D4A017" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Mandala backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        <svg className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px] text-[#D4A017]/[0.04]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="0.3" fill="none" />
          {Array.from({ length: 24 }).map((_, i) => (
            <circle key={`s-${i}`} cx={100 + 95 * Math.cos((i * 15 * Math.PI) / 180)} cy={100 + 95 * Math.sin((i * 15 * Math.PI) / 180)} r="5" stroke="currentColor" strokeWidth="0.3" fill="none" />
          ))}
          <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="0.5" fill="none" />
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse key={`po-${i}`} cx="100" cy="18" rx="6" ry="18" fill="none" stroke="currentColor" strokeWidth="0.4" transform={`rotate(${i * 22.5} 100 100)`} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse key={`pm-${i}`} cx="100" cy="38" rx="7" ry="16" fill="none" stroke="currentColor" strokeWidth="0.35" transform={`rotate(${i * 30} 100 100)`} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={`pi-${i}`} cx="100" cy="55" rx="5" ry="12" fill="none" stroke="currentColor" strokeWidth="0.3" transform={`rotate(${i * 45} 100 100)`} />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse key={`cf-${i}`} cx="100" cy="85" rx="5" ry="13" fill="currentColor" opacity="0.25" transform={`rotate(${i * 60} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.15" />
          <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.25" />
        </svg>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-8 left-6 sm:top-12 sm:left-12 opacity-15 select-none pointer-events-none z-[2]">
        <svg width="44" height="44" viewBox="0 0 40 40" className="animate-float">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={i} cx="20" cy="6" rx="4" ry="8" fill="#D4A017" transform={`rotate(${i * 45} 20 20)`} />
          ))}
          <circle cx="20" cy="20" r="5" fill="#B8860B" />
        </svg>
      </div>
      <div className="absolute top-16 right-8 sm:top-20 sm:right-16 opacity-10 select-none pointer-events-none z-[2]">
        <svg width="40" height="40" viewBox="0 0 40 40" className="animate-float" style={{ animationDelay: "1s" }}>
          <path d="M20 5 Q35 10 30 25 Q25 35 15 30 Q5 25 10 15 Q15 5 20 5Z" fill="none" stroke="#D4A017" strokeWidth="1.5" />
          <path d="M20 12 Q28 15 25 23 Q22 28 17 25 Q12 22 15 17 Q18 12 20 12Z" fill="#D4A017" opacity="0.3" />
          <circle cx="20" cy="19" r="2" fill="#D4A017" opacity="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-24 left-10 sm:bottom-28 sm:left-16 opacity-20 select-none pointer-events-none z-[2]">
        <svg width="24" height="24" viewBox="0 0 24 24" className="animate-float" style={{ animationDelay: "2s" }}>
          <path d="M12 0L14 9L24 12L14 14L12 24L10 14L0 12L10 9Z" fill="#D4A017" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-8 sm:bottom-36 sm:right-14 opacity-15 select-none pointer-events-none z-[2]">
        <svg width="36" height="36" viewBox="0 0 40 40" className="animate-float" style={{ animationDelay: "0.5s" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={i} cx="20" cy="6" rx="4" ry="8" fill="#B8860B" transform={`rotate(${i * 45} 20 20)`} />
          ))}
          <circle cx="20" cy="20" r="5" fill="#D4A017" />
        </svg>
      </div>

      {/* Center content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        animate={
          exiting
            ? { opacity: 0, scale: 0.88, y: -20 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{
          duration: prefersReducedMotion ? 0.15 : 0.35,
          ease: "easeOut",
        }}
      >
        {/* Logo */}
        <motion.div
          className="mb-6 relative w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] rounded-full overflow-hidden shadow-lg bg-white border-2 border-[#D4A017]/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration, delay: stagger * 0 }}
        >
          <Image src="/assets/images/pelli/logo.jpeg" alt="N & A" fill className="object-cover" />
        </motion.div>

        {/* Top decorative line */}
        <motion.div
          className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent mb-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration, delay: stagger * 0.5 }}
        />

        {/* Telugu blessing */}
        <motion.p
          className="text-[#B8860B]/50 text-xs sm:text-sm font-body tracking-[0.2em] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration, delay: stagger * 1 }}
        >
          శ్రీ గణేశాయ నమః
        </motion.p>

        {/* Names */}
        <motion.h1
          className="font-script text-5xl sm:text-7xl md:text-8xl text-[#B8860B]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: stagger * 1.5 }}
        >
          Neelu &amp; Aditya
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-heading text-lg sm:text-xl md:text-2xl text-[#3D2B1F] mt-4 tracking-[0.2em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: stagger * 2 }}
        >
          Wedding Celebrations
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration, delay: stagger * 2.5 }}
        >
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[#D4A017]" />
          <span className="text-[#D4A017] text-lg">&#x2767;</span>
          <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[#D4A017]" />
        </motion.div>

        {/* Date & Location */}
        <motion.div
          className="flex items-center gap-3 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: stagger * 3 }}
        >
          <span className="font-body text-sm sm:text-base text-[#D4A017] tracking-[0.3em] uppercase">
            April 2026
          </span>
          <span className="text-[#D4A017]/40">·</span>
          <span className="font-body text-sm sm:text-base text-[#D4A017] tracking-[0.3em] uppercase">
            Atlanta
          </span>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={handleClick}
          className="relative mt-10 px-8 py-3 rounded-full border-2 border-[#D4A017] text-[#B8860B] font-heading text-sm tracking-[0.15em] uppercase cursor-pointer overflow-hidden transition-colors duration-300 hover:bg-[#D4A017] hover:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={
            exiting
              ? { scale: 1.12, opacity: 0 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={
            exiting
              ? { duration: 0.25, ease: "easeOut" }
              : { duration, delay: stagger * 4 }
          }
          whileHover={exiting ? {} : { scale: 1.05 }}
          whileTap={exiting ? {} : { scale: 0.97 }}
        >
          Begin the Celebration
        </motion.button>

        {/* Bottom ornamental line */}
        <motion.div
          className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent mt-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration, delay: stagger * 4.5 }}
        />
      </motion.div>
    </motion.div>
  );
}
