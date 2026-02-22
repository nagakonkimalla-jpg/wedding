"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
}

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  shape: "circle" | "square";
  rotation: number;
  swayAmount: number;
  animationDuration: number;
  delay: number;
}

const COLORS = ["#FFD700", "#DC2626", "#EC4899", "#7C3AED", "#F97316"];

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export default function Confetti({ isActive, duration = 3000 }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    const count = Math.floor(randomBetween(50, 80));
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: randomBetween(0, 100),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: randomBetween(6, 12),
      shape: Math.random() > 0.5 ? "circle" : "square",
      rotation: randomBetween(0, 360),
      swayAmount: randomBetween(-30, 30),
      animationDuration: randomBetween(1.5, 3),
      delay: randomBetween(0, 0.8),
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [isActive, duration]);

  if (!mounted || particles.length === 0) return null;

  const content = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-20px) translateX(0px) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: translateY(25vh) translateX(var(--sway)) rotate(180deg);
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(calc(var(--sway) * -0.5)) rotate(360deg);
            opacity: 0.9;
          }
          75% {
            transform: translateY(75vh) translateX(var(--sway)) rotate(540deg);
            opacity: 0.6;
          }
          100% {
            transform: translateY(105vh) translateX(calc(var(--sway) * -1)) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-20px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            ["--sway" as string]: `${p.swayAmount}px`,
            animation: `confetti-fall ${p.animationDuration}s ease-out ${p.delay}s forwards`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );

  return createPortal(content, document.body);
}
