"use client";

import { useState, useEffect } from "react";
import { EventTheme } from "@/types";

interface CountdownTimerProps {
  targetDate: string;
  theme: EventTheme;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft | null {
  const difference = new Date(targetDate).getTime() - new Date().getTime();
  if (difference <= 0) return null;
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function CountdownTimer({ targetDate, theme }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(targetDate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const placeholder = (
    <div className="w-full">
      <div className="max-w-3xl mx-auto text-center">
        <div className="grid grid-cols-4 gap-3 sm:gap-8 mt-2">
          {["Days", "Hours", "Min", "Sec"].map((label) => (
            <div key={label} className="flex flex-col items-center">
              <div
                className="w-full aspect-square rounded-2xl sm:rounded-3xl flex items-center justify-center mb-3 bg-white/80 shadow-sm"
                style={{ border: '1.5px solid rgba(212, 160, 23, 0.25)' }}
              >
                <span className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold" style={{ color: 'rgba(212, 160, 23, 0.4)' }}>
                  --
                </span>
              </div>
              <span className="text-xs tracking-[0.15em] uppercase font-body text-[var(--text-primary)]/80">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!mounted) return placeholder;

  if (!timeLeft) {
    return (
      <section className="py-12 sm:py-20 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-3xl p-10 sm:p-14"
            style={{
              backgroundColor: theme.cardBg,
              border: `2px solid ${theme.primary}30`,
              boxShadow: `0 2px 16px ${theme.primary}12`,
            }}
          >
            <div className="text-5xl mb-4">{"\u{1F389}"}</div>
            <p className="text-3xl sm:text-4xl font-script" style={{ color: theme.primary }}>
              The celebration has begun!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const units: { label: string; value: number }[] = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto text-center">
        {/* Timer grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-8 mt-2">
          {units.map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center">
              <div
                className="w-full aspect-square rounded-2xl sm:rounded-3xl flex items-center justify-center mb-3 transition-transform hover:scale-105 bg-white/80 shadow-sm"
                style={{ border: '1.5px solid rgba(212, 160, 23, 0.25)' }}
              >
                <span
                  className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold tabular-nums"
                  style={{ color: '#D4A017' }}
                >
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <span
                className="text-xs tracking-[0.15em] uppercase font-body text-[var(--text-primary)]/80"
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
