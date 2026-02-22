"use client";

import { useEffect, useState } from "react";
import { EventTheme } from "@/types";

interface FloatingElementsProps {
  emoji: string;
  theme: EventTheme;
}

interface FloatingItem {
  id: number;
  symbol: string;
  left: number;
  top: number;
  size: string;
  opacity: number;
  animationDuration: number;
  animationDelay: number;
  swayRange: number;
}

const SIZES = ["text-lg", "text-xl", "text-2xl", "text-3xl"];

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export default function FloatingElements({ emoji, theme }: FloatingElementsProps) {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const count = Math.floor(randomBetween(5, 7));
    const generated: FloatingItem[] = Array.from({ length: count }, (_, i) => {
      const symbol = emoji;

      return {
        id: i,
        symbol,
        left: randomBetween(3, 95),
        top: randomBetween(5, 90),
        size: SIZES[Math.floor(Math.random() * SIZES.length)],
        opacity: randomBetween(0.08, 0.15),
        animationDuration: randomBetween(4, 8),
        animationDelay: randomBetween(0, 5),
        swayRange: randomBetween(8, 20),
      };
    });

    setItems(generated);
  }, [emoji]);

  if (!mounted || items.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes floating-drift {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(calc(var(--sway) * -1)) rotate(5deg);
          }
          50% {
            transform: translateY(var(--sway)) rotate(-3deg);
          }
          75% {
            transform: translateY(calc(var(--sway) * -0.5)) rotate(4deg);
          }
        }
      `}</style>
      {items.map((item) => (
        <div
          key={item.id}
          className={`fixed pointer-events-none select-none ${item.size}`}
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            opacity: item.opacity,
            color: theme.primary,
            ["--sway" as string]: `${item.swayRange}px`,
            animation: `floating-drift ${item.animationDuration}s ease-in-out ${item.animationDelay}s infinite`,
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          {item.symbol}
        </div>
      ))}
    </>
  );
}
