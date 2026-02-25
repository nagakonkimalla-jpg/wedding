"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

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

// Two layers: fast inner burst + slow outer drift
function generateSparkles(): Sparkle[] {
  const sparkles: Sparkle[] = [];
  // Inner fast burst — 16 sparkles
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * 360 + (Math.random() - 0.5) * 15;
    const dist = 60 + Math.random() * 100;
    const rad = (angle * Math.PI) / 180;
    sparkles.push({
      id: i,
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist,
      size: 14 + Math.random() * 10,
      delay: Math.random() * 0.08,
      duration: 0.5 + Math.random() * 0.3,
      opacity: 0.9 + Math.random() * 0.1,
    });
  }
  // Outer slow drift — 12 larger sparkles
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * 360 + (Math.random() - 0.5) * 30;
    const dist = 140 + Math.random() * 180;
    const rad = (angle * Math.PI) / 180;
    sparkles.push({
      id: 16 + i,
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist,
      size: 20 + Math.random() * 16,
      delay: 0.05 + Math.random() * 0.15,
      duration: 0.8 + Math.random() * 0.4,
      opacity: 0.7 + Math.random() * 0.3,
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

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (exiting) return;

      // Haptic feedback on mobile
      if (navigator.vibrate) {
        navigator.vibrate([30, 50, 20]);
      }

      const rect = e.currentTarget.getBoundingClientRect();
      setBurstOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setExiting(true);
      setTimeout(() => {
        onEnter();
      }, prefersReducedMotion ? 400 : 1100);
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
          delay: prefersReducedMotion ? 0.15 : 0.55,
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
          delay: prefersReducedMotion ? 0.15 : 0.55,
        }}
      >
        <div className="absolute inset-0 pattern-overlay opacity-50" />
      </motion.div>

      {/* Warm gold flash pulse */}
      {exiting && !prefersReducedMotion && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[15]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.25, 0.1, 0] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background: `radial-gradient(circle at ${burstOrigin.x}px ${burstOrigin.y}px, rgba(212,160,23,0.5) 0%, rgba(212,160,23,0.15) 35%, transparent 65%)`,
          }}
        />
      )}

      {/* Sparkle burst */}
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
                scale: [0, 1.3, 0.8, 0],
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
        {/* Top decorative line */}
        <motion.div
          className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration, delay: stagger * 0 }}
        />

        {/* Names */}
        <motion.h1
          className="font-script text-5xl sm:text-7xl md:text-8xl text-[#B8860B]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: stagger * 1 }}
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
          transition={{ duration, delay: stagger * 3 }}
        >
          <div className="w-16 h-[1px] bg-[#D4A017]" />
          <span className="text-[#D4A017] text-lg">&#x2767;</span>
          <div className="w-16 h-[1px] bg-[#D4A017]" />
        </motion.div>

        {/* Date */}
        <motion.p
          className="font-body text-sm sm:text-base text-[#3D2B1F]/60 mt-4 tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: stagger * 4 }}
        >
          April 2026
        </motion.p>

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
              : { duration, delay: stagger * 5 }
          }
          whileHover={exiting ? {} : { scale: 1.05 }}
          whileTap={exiting ? {} : { scale: 0.97 }}
        >
          Begin the Celebration
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
