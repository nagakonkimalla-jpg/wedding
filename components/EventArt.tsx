"use client";

import { useEffect, useState } from "react";
import { EventTheme } from "@/types";

interface EventArtProps {
  eventSlug: string;
  theme: EventTheme;
}

interface SVGProps {
  size: number;
  color: string;
  style?: React.CSSProperties;
  className?: string;
  opacity?: number;
}

/* =============================================================================
   REUSABLE SVG MOTIF COMPONENTS
   Each renders a culturally appropriate decorative element as inline SVG.
   ============================================================================= */

function Marigold({ size, color, style, className, opacity = 1 }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Outer 8-petal ring */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="22"
          rx="11"
          ry="20"
          fill={color}
          opacity={opacity * 0.85}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {/* Inner petal ring, offset 22.5deg */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
        <ellipse
          key={`inner-${angle}`}
          cx="50"
          cy="28"
          rx="8"
          ry="15"
          fill={color}
          opacity={opacity * 0.6}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="10" fill={color} opacity={opacity * 0.9} />
      <circle cx="50" cy="50" r="5" fill={color} opacity={opacity * 0.4} />
    </svg>
  );
}

function MarigoldGarland({
  width,
  color,
  style,
  className,
}: {
  width: number;
  color: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={width * 0.25}
      viewBox="0 0 400 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Draped garland string */}
      <path
        d="M0 10 Q100 80 200 10 Q300 80 400 10"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
      {/* Flowers along the curve */}
      {[40, 100, 160, 200, 240, 300, 360].map((x, i) => {
        const y = Math.sin(((x - 0) / 200) * Math.PI) * 50 + 15;
        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-8"
                rx="4"
                ry="8"
                fill={color}
                opacity="0.7"
                transform={`rotate(${angle} 0 0)`}
              />
            ))}
            <circle cx="0" cy="0" r="4" fill={color} opacity="0.8" />
          </g>
        );
      })}
    </svg>
  );
}

function TurmericBowl({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <ellipse cx="50" cy="70" rx="35" ry="12" fill={color} opacity="0.6" />
      <path
        d="M15 60 Q15 85 50 90 Q85 85 85 60 L85 55 Q85 45 50 42 Q15 45 15 55 Z"
        fill={color}
        opacity="0.5"
      />
      <ellipse cx="50" cy="55" rx="35" ry="12" fill={color} opacity="0.7" />
      {/* Turmeric mound */}
      <ellipse cx="50" cy="50" rx="22" ry="8" fill={color} opacity="0.9" />
      {/* Rim dots */}
      {[20, 35, 50, 65, 80].map((x, i) => (
        <circle key={i} cx={x} cy="55" r="2" fill={color} opacity="0.4" />
      ))}
    </svg>
  );
}

function MusicalNote({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <ellipse
        cx="35"
        cy="75"
        rx="14"
        ry="10"
        fill={color}
        opacity="0.8"
        transform="rotate(-20 35 75)"
      />
      <rect x="47" y="18" width="4" height="58" fill={color} opacity="0.7" rx="2" />
      <path d="M51 18 Q70 10 75 30 Q70 22 51 28 Z" fill={color} opacity="0.7" />
    </svg>
  );
}

function DoubleNote({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <ellipse
        cx="25"
        cy="78"
        rx="12"
        ry="9"
        fill={color}
        opacity="0.8"
        transform="rotate(-15 25 78)"
      />
      <ellipse
        cx="70"
        cy="68"
        rx="12"
        ry="9"
        fill={color}
        opacity="0.8"
        transform="rotate(-15 70 68)"
      />
      <rect x="35" y="18" width="3.5" height="60" fill={color} opacity="0.7" rx="1.5" />
      <rect x="80" y="12" width="3.5" height="56" fill={color} opacity="0.7" rx="1.5" />
      <rect x="35" y="18" width="48" height="4" fill={color} opacity="0.6" rx="2" />
      <rect x="35" y="28" width="48" height="4" fill={color} opacity="0.5" rx="2" />
    </svg>
  );
}

function Sparkle({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M50 5 L55 40 L90 50 L55 60 L50 95 L45 60 L10 50 L45 40 Z"
        fill={color}
        opacity="0.7"
      />
      <circle cx="50" cy="50" r="6" fill={color} opacity="0.9" />
    </svg>
  );
}

function Star6({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <polygon
        points="50,5 61,38 95,38 67,58 78,92 50,72 22,92 33,58 5,38 39,38"
        fill={color}
        opacity="0.6"
      />
      <circle cx="50" cy="50" r="12" fill={color} opacity="0.4" />
    </svg>
  );
}

function Microphone({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect x="40" y="10" width="20" height="40" rx="10" fill={color} opacity="0.6" />
      <path
        d="M30 40 Q30 65 50 65 Q70 65 70 40"
        stroke={color}
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
      <rect x="48" y="65" width="4" height="15" fill={color} opacity="0.5" />
      <rect x="35" y="80" width="30" height="4" rx="2" fill={color} opacity="0.4" />
      {[18, 25, 32, 39].map((y) => (
        <line
          key={y}
          x1="43"
          y1={y}
          x2="57"
          y2={y}
          stroke={color}
          strokeWidth="1"
          opacity="0.3"
        />
      ))}
    </svg>
  );
}

function Paisley({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Outer paisley shell */}
      <path
        d="M50 10 Q80 10 85 45 Q90 80 50 90 Q30 85 25 65 Q20 40 35 25 Q42 15 50 10 Z"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        opacity="0.7"
      />
      {/* Inner curve */}
      <path
        d="M50 22 Q70 22 73 45 Q76 68 50 78 Q38 74 34 58 Q30 42 42 30 Q46 24 50 22 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.5"
      />
      {/* Tip curl */}
      <path d="M50 10 Q55 5 60 10 Q58 18 50 15" fill={color} opacity="0.6" />
      {/* Central flower */}
      <circle cx="50" cy="50" r="6" fill={color} opacity="0.5" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="42"
          rx="3"
          ry="6"
          fill={color}
          opacity="0.4"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {/* Dots along inner curve */}
      {(
        [
          [40, 35],
          [36, 48],
          [38, 62],
          [45, 72],
          [55, 70],
          [62, 58],
          [64, 42],
          [58, 30],
        ] as [number, number][]
      ).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.5" fill={color} opacity="0.35" />
      ))}
    </svg>
  );
}

function Bangle({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="5" opacity="0.6" />
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <circle
            key={angle}
            cx={50 + 38 * Math.cos(rad)}
            cy={50 + 38 * Math.sin(rad)}
            r="2.5"
            fill={color}
            opacity="0.5"
          />
        );
      })}
    </svg>
  );
}

function Lotus({ size, color, style, className, opacity = 1 }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Back petals */}
      {[-40, -20, 0, 20, 40].map((angle) => (
        <path
          key={`back-${angle}`}
          d="M50 55 Q45 30 50 10 Q55 30 50 55"
          fill={color}
          opacity={opacity * 0.4}
          transform={`rotate(${angle} 50 55)`}
        />
      ))}
      {/* Front petals */}
      {[-30, -10, 10, 30].map((angle) => (
        <path
          key={`front-${angle}`}
          d="M50 55 Q44 35 50 18 Q56 35 50 55"
          fill={color}
          opacity={opacity * 0.65}
          transform={`rotate(${angle} 50 55)`}
        />
      ))}
      {/* Side drooping petals */}
      <path d="M50 55 Q30 50 15 60 Q30 48 50 55" fill={color} opacity={opacity * 0.35} />
      <path d="M50 55 Q70 50 85 60 Q70 48 50 55" fill={color} opacity={opacity * 0.35} />
      {/* Center */}
      <ellipse cx="50" cy="55" rx="8" ry="5" fill={color} opacity={opacity * 0.8} />
      {/* Water line */}
      <path
        d="M20 70 Q50 60 80 70"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity={opacity * 0.2}
      />
    </svg>
  );
}

function Crown({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M15 70 L20 30 L35 50 L50 15 L65 50 L80 30 L85 70 Z" fill={color} opacity="0.5" />
      <rect x="15" y="70" width="70" height="8" rx="3" fill={color} opacity="0.6" />
      {/* Crown jewels */}
      <circle cx="50" cy="25" r="4" fill={color} opacity="0.8" />
      <circle cx="35" cy="45" r="3" fill={color} opacity="0.6" />
      <circle cx="65" cy="45" r="3" fill={color} opacity="0.6" />
      <circle cx="22" cy="40" r="2.5" fill={color} opacity="0.5" />
      <circle cx="78" cy="40" r="2.5" fill={color} opacity="0.5" />
      {/* Base band dots */}
      {[25, 37, 50, 63, 75].map((x, i) => (
        <circle key={i} cx={x} cy="74" r="2" fill={color} opacity="0.4" />
      ))}
    </svg>
  );
}

function Shield({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M50 8 L85 20 L85 55 Q85 80 50 95 Q15 80 15 55 L15 20 Z"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        opacity="0.6"
      />
      <path
        d="M50 16 L78 26 L78 53 Q78 74 50 87 Q22 74 22 53 L22 26 Z"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.3"
      />
      {/* Inner cross */}
      <line x1="50" y1="28" x2="50" y2="78" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <line x1="28" y1="48" x2="72" y2="48" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {/* Center diamond */}
      <path d="M50 38 L60 48 L50 58 L40 48 Z" fill={color} opacity="0.4" />
      <circle cx="50" cy="48" r="4" fill={color} opacity="0.6" />
    </svg>
  );
}

function Sword({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Blade */}
      <path d="M48 8 L52 8 L53 62 L47 62 Z" fill={color} opacity="0.6" />
      <path d="M48 8 L50 2 L52 8" fill={color} opacity="0.7" />
      {/* Fuller line */}
      <line x1="50" y1="12" x2="50" y2="58" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Cross-guard */}
      <rect x="35" y="62" width="30" height="5" rx="2" fill={color} opacity="0.7" />
      <circle cx="35" cy="64.5" r="3" fill={color} opacity="0.5" />
      <circle cx="65" cy="64.5" r="3" fill={color} opacity="0.5" />
      {/* Handle */}
      <rect x="46" y="67" width="8" height="18" rx="2" fill={color} opacity="0.5" />
      {[71, 75, 79].map((y) => (
        <line
          key={y}
          x1="46"
          y1={y}
          x2="54"
          y2={y}
          stroke={color}
          strokeWidth="0.8"
          opacity="0.3"
        />
      ))}
      {/* Pommel */}
      <circle cx="50" cy="88" r="5" fill={color} opacity="0.6" />
    </svg>
  );
}

function OmSymbol({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Om body */}
      <path
        d="M30 65 Q20 65 18 55 Q16 42 28 38 Q35 35 40 40 Q45 45 42 52 Q40 58 35 58 Q30 58 30 52 Q30 48 35 48"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Upper curve */}
      <path
        d="M42 40 Q50 30 60 32 Q72 35 72 48 Q72 58 62 62 Q55 65 48 62"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Top tail */}
      <path
        d="M72 48 Q78 38 75 28 Q72 20 65 22"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Chandrabindu crescent + dot */}
      <path
        d="M58 15 Q65 8 72 15"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="65" cy="8" r="2.5" fill={color} opacity="0.7" />
      {/* Bottom hook */}
      <path
        d="M30 65 Q35 75 45 75 Q55 75 55 68"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function SacredFire({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Fire kund base */}
      <path d="M25 85 L75 85 L70 75 L30 75 Z" fill={color} opacity="0.4" />
      <rect x="20" y="85" width="60" height="5" rx="2" fill={color} opacity="0.5" />
      {/* Main flame */}
      <path
        d="M50 15 Q60 35 55 50 Q65 40 60 25 Q70 45 58 65 Q55 70 50 72 Q45 70 42 65 Q30 45 40 25 Q35 40 45 50 Q40 35 50 15 Z"
        fill={color}
        opacity="0.6"
      />
      {/* Inner flame */}
      <path
        d="M50 30 Q55 45 52 55 Q50 60 48 55 Q45 45 50 30 Z"
        fill={color}
        opacity="0.4"
      />
      {/* Sparks */}
      <circle cx="38" cy="28" r="1.5" fill={color} opacity="0.4" />
      <circle cx="62" cy="22" r="1.5" fill={color} opacity="0.4" />
      <circle cx="35" cy="40" r="1" fill={color} opacity="0.3" />
      <circle cx="65" cy="35" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

function Mangalsutra({
  width,
  color,
  style,
  className,
}: {
  width: number;
  color: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={width * 0.15}
      viewBox="0 0 400 60"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Chain links */}
      {Array.from({ length: 20 }, (_, i) => {
        const x = i * 20 + 10;
        return (
          <g key={i}>
            <circle
              cx={x}
              cy="30"
              r="4"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              opacity="0.5"
            />
            {i < 19 && (
              <line
                x1={x + 4}
                y1="30"
                x2={x + 16}
                y2="30"
                stroke={color}
                strokeWidth="1"
                opacity="0.3"
              />
            )}
          </g>
        );
      })}
      {/* Center pendant */}
      <path d="M195 34 L200 48 L205 34" fill={color} opacity="0.6" />
      <circle cx="200" cy="50" r="5" fill={color} opacity="0.5" />
      {/* Black bead accents */}
      {[60, 120, 280, 340].map((x, i) => (
        <circle key={i} cx={x} cy="30" r="3" fill={color} opacity="0.7" />
      ))}
    </svg>
  );
}

function Mandap({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Four pillars */}
      <rect x="15" y="35" width="5" height="55" fill={color} opacity="0.5" />
      <rect x="80" y="35" width="5" height="55" fill={color} opacity="0.5" />
      <rect x="35" y="35" width="4" height="55" fill={color} opacity="0.35" />
      <rect x="61" y="35" width="4" height="55" fill={color} opacity="0.35" />
      {/* Dome canopy */}
      <path d="M10 38 Q50 5 90 38" fill="none" stroke={color} strokeWidth="2.5" opacity="0.6" />
      <path d="M10 38 L90 38" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Scalloped fringe */}
      <path
        d="M15 38 Q22 45 30 38 Q38 45 46 38 Q54 45 62 38 Q70 45 78 38 Q86 45 85 38"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.35"
      />
      {/* Top kalash ornament */}
      <circle cx="50" cy="12" r="4" fill={color} opacity="0.5" />
      <path d="M46 16 L50 12 L54 16" fill={color} opacity="0.4" />
      {/* Base */}
      <rect x="10" y="88" width="80" height="4" rx="2" fill={color} opacity="0.4" />
    </svg>
  );
}

function PairedPaisley({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Two paisleys facing each other -- symbol of union */}
      <path
        d="M40 15 Q15 15 12 45 Q10 75 40 85 Q55 80 58 62 Q60 42 48 30 Q44 22 40 15 Z"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.6"
      />
      <path d="M40 15 Q36 10 32 15 Q35 22 40 18" fill={color} opacity="0.5" />
      <circle cx="38" cy="50" r="4" fill={color} opacity="0.4" />
      <path
        d="M80 15 Q105 15 108 45 Q110 75 80 85 Q65 80 62 62 Q60 42 72 30 Q76 22 80 15 Z"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.6"
      />
      <path d="M80 15 Q84 10 88 15 Q85 22 80 18" fill={color} opacity="0.5" />
      <circle cx="82" cy="50" r="4" fill={color} opacity="0.4" />
      {/* Union dots */}
      <circle cx="60" cy="48" r="2" fill={color} opacity="0.5" />
      <circle cx="60" cy="56" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function TempleGopuram({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Tiered gopuram */}
      <rect x="15" y="95" width="70" height="12" rx="2" fill={color} opacity="0.5" />
      <rect x="20" y="78" width="60" height="17" rx="2" fill={color} opacity="0.45" />
      <rect x="25" y="62" width="50" height="16" rx="2" fill={color} opacity="0.4" />
      <rect x="30" y="48" width="40" height="14" rx="2" fill={color} opacity="0.35" />
      <rect x="35" y="35" width="30" height="13" rx="2" fill={color} opacity="0.3" />
      {/* Kalasam on top */}
      <path d="M45 35 L50 15 L55 35" fill={color} opacity="0.5" />
      <circle cx="50" cy="12" r="4" fill={color} opacity="0.6" />
      {/* Arched windows on tiers */}
      {(
        [
          { y: 100, xs: [28, 42, 56, 70], w: 6 },
          { y: 83, xs: [32, 46, 60], w: 6 },
          { y: 67, xs: [36, 50, 64], w: 5 },
          { y: 52, xs: [40, 55], w: 5 },
        ] as { y: number; xs: number[]; w: number }[]
      ).map((tier, ti) =>
        tier.xs.map((x, xi) => (
          <path
            key={`${ti}-${xi}`}
            d={`M${x - tier.w / 2} ${tier.y + 8} Q${x} ${tier.y} ${x + tier.w / 2} ${tier.y + 8}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity="0.25"
          />
        ))
      )}
    </svg>
  );
}

function Kalash({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Pot body */}
      <path
        d="M30 55 Q28 80 35 85 Q45 92 55 92 Q65 92 70 85 Q75 78 72 55"
        fill={color}
        opacity="0.5"
      />
      {/* Neck */}
      <rect x="38" y="45" width="24" height="12" rx="3" fill={color} opacity="0.55" />
      {/* Rim */}
      <ellipse cx="50" cy="45" rx="15" ry="4" fill={color} opacity="0.6" />
      {/* Coconut */}
      <circle cx="50" cy="38" r="8" fill={color} opacity="0.5" />
      {/* Mango leaves */}
      <path d="M42 45 Q30 30 35 20" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M58 45 Q70 30 65 20" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M50 38 Q50 22 50 15" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M45 42 Q35 25 40 15" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M55 42 Q65 25 60 15" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
      {/* Band decoration */}
      <ellipse
        cx="50"
        cy="70"
        rx="18"
        ry="2"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
}

function Diya({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Lamp bowl */}
      <path
        d="M25 65 Q25 80 50 82 Q75 80 75 65 Q70 58 50 56 Q30 58 25 65 Z"
        fill={color}
        opacity="0.5"
      />
      <ellipse cx="50" cy="62" rx="25" ry="6" fill={color} opacity="0.6" />
      {/* Wick */}
      <rect x="48" y="52" width="4" height="10" fill={color} opacity="0.4" />
      {/* Flame */}
      <path d="M50 25 Q55 38 53 48 Q50 52 47 48 Q45 38 50 25 Z" fill={color} opacity="0.7" />
      {/* Inner flame */}
      <path d="M50 35 Q52 42 51 48 Q50 50 49 48 Q48 42 50 35 Z" fill={color} opacity="0.4" />
      {/* Glow */}
      <circle cx="50" cy="40" r="12" fill={color} opacity="0.08" />
      {/* Base */}
      <ellipse cx="50" cy="82" rx="12" ry="3" fill={color} opacity="0.3" />
    </svg>
  );
}

function MehendiCorner({ size, color, style, className }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Quarter-circle arc layers */}
      <path d="M5 5 Q5 115 115 115" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <path d="M5 5 Q5 95 95 100" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M5 5 Q5 75 75 80" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Scalloped dots along outer curve */}
      {Array.from({ length: 8 }, (_, i) => {
        const t = (i + 0.5) / 8;
        const x = 5 + (115 - 5) * t * t;
        const y = 115 - (115 - 5) * (1 - t) * (1 - t) + 5;
        return <circle key={i} cx={x} cy={y} r="3" fill={color} opacity="0.35" />;
      })}
      {/* Small paisley near corner */}
      <path
        d="M20 20 Q10 20 10 35 Q10 50 25 50 Q30 48 30 40 Q30 25 20 20 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.45"
      />
      <circle cx="18" cy="35" r="2.5" fill={color} opacity="0.35" />
      {/* Leaf sprigs */}
      <path d="M30 15 Q40 12 45 18 Q40 16 30 20" fill={color} opacity="0.3" />
      <path d="M15 30 Q12 40 18 45 Q16 40 20 30" fill={color} opacity="0.3" />
    </svg>
  );
}

function OrnamentalBorder({
  width,
  color,
  style,
  className,
}: {
  width: number;
  color: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height="40"
      viewBox="0 0 400 40"
      className={className}
      style={style}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {Array.from({ length: 10 }, (_, i) => {
        const x = i * 40 + 20;
        return (
          <g key={i}>
            <path
              d={`M${x} 10 L${x + 8} 20 L${x} 30 L${x - 8} 20 Z`}
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity="0.4"
            />
            {i < 9 && (
              <line
                x1={x + 8}
                y1="20"
                x2={x + 32}
                y2="20"
                stroke={color}
                strokeWidth="0.8"
                opacity="0.25"
              />
            )}
            <circle cx={x} cy="20" r="2" fill={color} opacity="0.5" />
          </g>
        );
      })}
    </svg>
  );
}

/* =============================================================================
   CSS KEYFRAME ANIMATIONS
   ============================================================================= */

const animationStyles = `
  @keyframes eventart-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes eventart-float-reverse {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(12px); }
  }
  @keyframes eventart-drift {
    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
    25% { transform: translateY(-8px) translateX(4px) rotate(3deg); }
    50% { transform: translateY(4px) translateX(-3px) rotate(-2deg); }
    75% { transform: translateY(-5px) translateX(6px) rotate(4deg); }
  }
  @keyframes eventart-spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes eventart-pulse-opacity {
    0%, 100% { opacity: var(--ea-base-opacity, 0.12); }
    50% { opacity: var(--ea-peak-opacity, 0.2); }
  }
  @keyframes eventart-twinkle {
    0%, 100% { opacity: var(--ea-base-opacity, 0.08); transform: scale(1); }
    50% { opacity: var(--ea-peak-opacity, 0.22); transform: scale(1.15); }
  }
  @keyframes eventart-sway {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }
  @keyframes eventart-flame-flicker {
    0%, 100% { transform: scaleY(1) scaleX(1); }
    25% { transform: scaleY(1.05) scaleX(0.97); }
    50% { transform: scaleY(0.95) scaleX(1.03); }
    75% { transform: scaleY(1.08) scaleX(0.95); }
  }
  @keyframes eventart-gentle-bob {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-6px) rotate(2deg); }
    66% { transform: translateY(3px) rotate(-1deg); }
  }
`;

/* =============================================================================
   EVENT-SPECIFIC ART COMPOSITIONS
   Each function renders a full-viewport overlay of themed decorative elements
   scattered at corners, sides, and edges with CSS animations.
   ============================================================================= */

function HaldiArt({ theme }: { theme: EventTheme }) {
  const gold = theme.primary;
  const lightGold = theme.secondary;
  const deepGold = theme.accent;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Top-left marigold cluster */}
      <Marigold
        size={90}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "5%",
          left: "2%",
          opacity: 0.14,
          animation: "eventart-float 6s ease-in-out infinite",
        }}
      />
      <Marigold
        size={55}
        color={lightGold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "12%",
          left: "6%",
          opacity: 0.1,
          animation: "eventart-drift 8s ease-in-out 1s infinite",
        }}
      />

      {/* Top-right marigold */}
      <Marigold
        size={75}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "8%",
          right: "3%",
          opacity: 0.12,
          animation: "eventart-float 7s ease-in-out 0.5s infinite",
        }}
      />

      {/* Turmeric bowl at bottom-left corner */}
      <TurmericBowl
        size={80}
        color={deepGold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "3%",
          opacity: 0.12,
          animation: "eventart-gentle-bob 9s ease-in-out infinite",
        }}
      />

      {/* Turmeric bowl at top-right */}
      <TurmericBowl
        size={60}
        color={gold}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "25%",
          right: "5%",
          opacity: 0.09,
          animation: "eventart-gentle-bob 10s ease-in-out 2s infinite",
        }}
      />

      {/* Garland across top */}
      <MarigoldGarland
        width={350}
        color={gold}
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: "2%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.1,
        }}
      />

      {/* Floating marigolds on right side */}
      <Marigold
        size={45}
        color={lightGold}
        style={{
          position: "absolute",
          top: "40%",
          right: "2%",
          opacity: 0.1,
          animation: "eventart-drift 7s ease-in-out 2s infinite",
        }}
      />
      <Marigold
        size={50}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "60%",
          right: "5%",
          opacity: 0.08,
          animation: "eventart-float-reverse 8s ease-in-out 1s infinite",
        }}
      />

      {/* Left side floating marigold */}
      <Marigold
        size={40}
        color={gold}
        style={{
          position: "absolute",
          top: "50%",
          left: "1%",
          opacity: 0.09,
          animation: "eventart-float 9s ease-in-out 3s infinite",
        }}
      />

      {/* Bottom-right marigold */}
      <Marigold
        size={65}
        color={lightGold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          bottom: "15%",
          right: "4%",
          opacity: 0.11,
          animation: "eventart-drift 6.5s ease-in-out 0.8s infinite",
        }}
      />

      {/* Smaller accent marigold */}
      <Marigold
        size={35}
        color={deepGold}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "75%",
          left: "8%",
          opacity: 0.08,
          animation: "eventart-float 8s ease-in-out 4s infinite",
        }}
      />

      {/* Bottom garland edge */}
      <MarigoldGarland
        width={280}
        color={lightGold}
        className="hidden lg:block"
        style={{
          position: "absolute",
          bottom: "3%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.08,
        }}
      />
    </div>
  );
}

function SangeethArt({ theme }: { theme: EventTheme }) {
  const purple = theme.primary;
  const lilac = theme.secondary;
  const pink = theme.accent;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Musical note top-left */}
      <MusicalNote
        size={70}
        color={lilac}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "8%",
          left: "4%",
          opacity: 0.15,
          animation: "eventart-drift 7s ease-in-out infinite",
        }}
      />

      {/* Double note top-right */}
      <DoubleNote
        size={80}
        color={purple}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "6%",
          right: "5%",
          opacity: 0.13,
          animation: "eventart-float 6s ease-in-out 1s infinite",
        }}
      />

      {/* Sparkle stage lights */}
      <Sparkle
        size={50}
        color={pink}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "4%",
          left: "30%",
          opacity: 0.12,
          animation: "eventart-twinkle 3s ease-in-out infinite",
          ["--ea-base-opacity" as string]: "0.08",
          ["--ea-peak-opacity" as string]: "0.18",
        }}
      />
      <Sparkle
        size={35}
        color={lilac}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "7%",
          right: "25%",
          opacity: 0.1,
          animation: "eventart-twinkle 4s ease-in-out 1.5s infinite",
          ["--ea-base-opacity" as string]: "0.06",
          ["--ea-peak-opacity" as string]: "0.16",
        }}
      />

      {/* Star bursts */}
      <Star6
        size={60}
        color={pink}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "20%",
          right: "3%",
          opacity: 0.1,
          animation: "eventart-spin-slow 30s linear infinite",
        }}
      />
      <Star6
        size={40}
        color={lilac}
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: "35%",
          left: "2%",
          opacity: 0.08,
          animation: "eventart-spin-slow 25s linear 2s infinite",
        }}
      />

      {/* Microphone silhouette */}
      <Microphone
        size={90}
        color={purple}
        className="hidden sm:block"
        style={{
          position: "absolute",
          bottom: "12%",
          left: "3%",
          opacity: 0.1,
          animation: "eventart-gentle-bob 8s ease-in-out infinite",
        }}
      />

      {/* Scattered notes mid and bottom */}
      <MusicalNote
        size={50}
        color={pink}
        style={{
          position: "absolute",
          top: "45%",
          right: "2%",
          opacity: 0.1,
          animation: "eventart-drift 9s ease-in-out 2s infinite",
        }}
      />
      <DoubleNote
        size={55}
        color={lilac}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "65%",
          left: "5%",
          opacity: 0.09,
          animation: "eventart-float-reverse 7s ease-in-out 1s infinite",
        }}
      />
      <MusicalNote
        size={40}
        color={purple}
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: "20%",
          right: "6%",
          opacity: 0.08,
          animation: "eventart-float 8s ease-in-out 3s infinite",
        }}
      />

      {/* Tiny sparkles */}
      <Sparkle
        size={30}
        color={pink}
        style={{
          position: "absolute",
          top: "55%",
          left: "1%",
          opacity: 0.09,
          animation: "eventart-twinkle 3.5s ease-in-out 0.5s infinite",
          ["--ea-base-opacity" as string]: "0.05",
          ["--ea-peak-opacity" as string]: "0.14",
        }}
      />
      <Sparkle
        size={25}
        color={lilac}
        className="hidden sm:block"
        style={{
          position: "absolute",
          bottom: "30%",
          right: "8%",
          opacity: 0.08,
          animation: "eventart-twinkle 4.5s ease-in-out 2s infinite",
          ["--ea-base-opacity" as string]: "0.04",
          ["--ea-peak-opacity" as string]: "0.12",
        }}
      />
    </div>
  );
}

function PellikuthuruArt({ theme }: { theme: EventTheme }) {
  const red = theme.primary;
  const rose = theme.secondary;
  const gold = theme.accent;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Mehendi pattern corners */}
      <MehendiCorner
        size={120}
        color={red}
        className="hidden sm:block"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.12 }}
      />
      <MehendiCorner
        size={120}
        color={red}
        className="hidden sm:block"
        style={{ position: "absolute", top: 0, right: 0, opacity: 0.12, transform: "scaleX(-1)" }}
      />
      <MehendiCorner
        size={100}
        color={gold}
        className="hidden lg:block"
        style={{ position: "absolute", bottom: 0, left: 0, opacity: 0.09, transform: "scaleY(-1)" }}
      />
      <MehendiCorner
        size={100}
        color={gold}
        className="hidden lg:block"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          opacity: 0.09,
          transform: "scale(-1, -1)",
        }}
      />

      {/* Bangles along left edge */}
      <Bangle
        size={65}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "20%",
          left: "2%",
          opacity: 0.1,
          animation: "eventart-sway 6s ease-in-out infinite",
        }}
      />
      <Bangle
        size={50}
        color={red}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "45%",
          left: "1%",
          opacity: 0.08,
          animation: "eventart-sway 7s ease-in-out 1s infinite",
        }}
      />
      <Bangle
        size={55}
        color={rose}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "70%",
          left: "3%",
          opacity: 0.09,
          animation: "eventart-sway 8s ease-in-out 2s infinite",
        }}
      />

      {/* Bangles along right edge */}
      <Bangle
        size={60}
        color={red}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "30%",
          right: "2%",
          opacity: 0.09,
          animation: "eventart-sway 7s ease-in-out 0.5s infinite",
        }}
      />
      <Bangle
        size={45}
        color={gold}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "60%",
          right: "4%",
          opacity: 0.08,
          animation: "eventart-sway 6.5s ease-in-out 1.5s infinite",
        }}
      />

      {/* Lotus motifs */}
      <Lotus
        size={80}
        color={red}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "10%",
          right: "8%",
          opacity: 0.11,
          animation: "eventart-float 8s ease-in-out infinite",
        }}
      />
      <Lotus
        size={60}
        color={gold}
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: "15%",
          left: "6%",
          opacity: 0.09,
          animation: "eventart-float-reverse 9s ease-in-out 1s infinite",
        }}
      />

      {/* Paisley accents */}
      <Paisley
        size={70}
        color={red}
        style={{
          position: "absolute",
          top: "50%",
          right: "1%",
          opacity: 0.09,
          animation: "eventart-gentle-bob 10s ease-in-out 2s infinite",
        }}
      />
      <Paisley
        size={55}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          bottom: "25%",
          right: "6%",
          opacity: 0.08,
          animation: "eventart-drift 8s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function PellikodukuArt({ theme }: { theme: EventTheme }) {
  const gold = theme.primary;
  const cream = theme.secondary;
  const deepGold = theme.accent;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Crown / turban ornament top-center */}
      <Crown
        size={100}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "3%",
          left: "50%",
          marginLeft: "-50px",
          opacity: 0.13,
          animation: "eventart-gentle-bob 8s ease-in-out infinite",
        }}
      />

      {/* Shield crests at sides */}
      <Shield
        size={90}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "15%",
          left: "2%",
          opacity: 0.11,
          animation: "eventart-float 9s ease-in-out infinite",
        }}
      />
      <Shield
        size={75}
        color={deepGold}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "18%",
          right: "3%",
          opacity: 0.09,
          animation: "eventart-float 8s ease-in-out 1.5s infinite",
        }}
      />

      {/* Swords at angles */}
      <Sword
        size={85}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "40%",
          left: "3%",
          opacity: 0.1,
          animation: "eventart-sway 10s ease-in-out infinite",
          transform: "rotate(15deg)",
        }}
      />
      <Sword
        size={70}
        color={deepGold}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "35%",
          right: "4%",
          opacity: 0.08,
          animation: "eventart-sway 9s ease-in-out 2s infinite",
          transform: "rotate(-15deg)",
        }}
      />

      {/* Ornamental borders at top and bottom */}
      <OrnamentalBorder
        width={300}
        color={gold}
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: "1%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.09,
        }}
      />
      <OrnamentalBorder
        width={250}
        color={deepGold}
        className="hidden lg:block"
        style={{
          position: "absolute",
          bottom: "2%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.07,
        }}
      />

      {/* Crown at bottom-right */}
      <Crown
        size={65}
        color={deepGold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "4%",
          opacity: 0.09,
          animation: "eventart-gentle-bob 10s ease-in-out 3s infinite",
        }}
      />

      {/* Smaller shield */}
      <Shield
        size={55}
        color={gold}
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          opacity: 0.07,
          animation: "eventart-float-reverse 8s ease-in-out 1s infinite",
        }}
      />

      {/* Paisley accent (royal motif) */}
      <Paisley
        size={60}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "65%",
          right: "2%",
          opacity: 0.08,
          animation: "eventart-drift 9s ease-in-out infinite",
        }}
      />

      {/* Small sword accent */}
      <Sword
        size={50}
        color={gold}
        style={{
          position: "absolute",
          bottom: "35%",
          right: "8%",
          opacity: 0.07,
          animation: "eventart-sway 8s ease-in-out 4s infinite",
        }}
      />
    </div>
  );
}

function UpanayanamArt({ theme }: { theme: EventTheme }) {
  const saffron = theme.primary;
  const lightAmber = theme.secondary;
  const deepAmber = theme.accent;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Om symbol center-top */}
      <OmSymbol
        size={110}
        color={saffron}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "3%",
          left: "50%",
          marginLeft: "-55px",
          opacity: 0.14,
          animation: "eventart-pulse-opacity 6s ease-in-out infinite",
          ["--ea-base-opacity" as string]: "0.10",
          ["--ea-peak-opacity" as string]: "0.18",
        }}
      />

      {/* Sacred fire at sides */}
      <SacredFire
        size={85}
        color={saffron}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "20%",
          left: "3%",
          opacity: 0.12,
          animation: "eventart-flame-flicker 2.5s ease-in-out infinite",
        }}
      />
      <SacredFire
        size={75}
        color={deepAmber}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "22%",
          right: "4%",
          opacity: 0.1,
          animation: "eventart-flame-flicker 3s ease-in-out 0.5s infinite",
        }}
      />

      {/* Lotus petals floating */}
      <Lotus
        size={70}
        color={saffron}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "45%",
          right: "2%",
          opacity: 0.1,
          animation: "eventart-float 7s ease-in-out infinite",
        }}
      />
      <Lotus
        size={55}
        color={deepAmber}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "55%",
          left: "3%",
          opacity: 0.09,
          animation: "eventart-float-reverse 8s ease-in-out 1s infinite",
        }}
      />
      <Lotus
        size={45}
        color={saffron}
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: "20%",
          right: "6%",
          opacity: 0.08,
          animation: "eventart-drift 9s ease-in-out 2s infinite",
        }}
      />

      {/* Diya lamps */}
      <Diya
        size={65}
        color={saffron}
        className="hidden sm:block"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "4%",
          opacity: 0.11,
          animation: "eventart-flame-flicker 3s ease-in-out 1s infinite",
        }}
      />
      <Diya
        size={55}
        color={deepAmber}
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: "12%",
          right: "5%",
          opacity: 0.09,
          animation: "eventart-flame-flicker 2.8s ease-in-out 0.3s infinite",
        }}
      />

      {/* Small Om accent */}
      <OmSymbol
        size={50}
        color={deepAmber}
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: "70%",
          left: "6%",
          opacity: 0.07,
          animation: "eventart-gentle-bob 10s ease-in-out 3s infinite",
        }}
      />

      {/* Sacred fire bottom */}
      <SacredFire
        size={55}
        color={saffron}
        className="hidden lg:block"
        style={{
          position: "absolute",
          bottom: "30%",
          left: "8%",
          opacity: 0.07,
          animation: "eventart-flame-flicker 3.2s ease-in-out 2s infinite",
        }}
      />
    </div>
  );
}

function PelliArt({ theme }: { theme: EventTheme }) {
  const gold = theme.primary;
  const ivory = theme.secondary;
  const richGold = theme.accent;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Mangalsutra chain border at top */}
      <Mangalsutra
        width={380}
        color={gold}
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: "2%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.11,
        }}
      />

      {/* Wedding mandap center-top */}
      <Mandap
        size={100}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          marginLeft: "-50px",
          opacity: 0.1,
          animation: "eventart-pulse-opacity 8s ease-in-out infinite",
          ["--ea-base-opacity" as string]: "0.08",
          ["--ea-peak-opacity" as string]: "0.14",
        }}
      />

      {/* Paired paisley designs */}
      <PairedPaisley
        size={90}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "20%",
          left: "2%",
          opacity: 0.11,
          animation: "eventart-float 8s ease-in-out infinite",
        }}
      />
      <PairedPaisley
        size={80}
        color={richGold}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "25%",
          right: "3%",
          opacity: 0.09,
          animation: "eventart-float 9s ease-in-out 1.5s infinite",
        }}
      />

      {/* Lotus for auspiciousness */}
      <Lotus
        size={70}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "45%",
          right: "2%",
          opacity: 0.09,
          animation: "eventart-drift 7s ease-in-out infinite",
        }}
      />
      <Lotus
        size={60}
        color={richGold}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "55%",
          left: "4%",
          opacity: 0.08,
          animation: "eventart-float-reverse 8s ease-in-out 2s infinite",
        }}
      />

      {/* Ornamental border at bottom */}
      <OrnamentalBorder
        width={320}
        color={gold}
        className="hidden lg:block"
        style={{
          position: "absolute",
          bottom: "3%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.08,
        }}
      />

      {/* Mangalsutra chain at bottom */}
      <Mangalsutra
        width={300}
        color={richGold}
        className="hidden lg:block"
        style={{
          position: "absolute",
          bottom: "6%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.08,
        }}
      />

      {/* Additional paired paisleys */}
      <PairedPaisley
        size={65}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          bottom: "15%",
          left: "3%",
          opacity: 0.08,
          animation: "eventart-gentle-bob 10s ease-in-out 3s infinite",
        }}
      />

      {/* Small mandap accent */}
      <Mandap
        size={60}
        color={richGold}
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: "20%",
          right: "5%",
          opacity: 0.07,
          animation: "eventart-gentle-bob 9s ease-in-out 2s infinite",
        }}
      />

      {/* Diya for wedding light */}
      <Diya
        size={55}
        color={gold}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "70%",
          left: "2%",
          opacity: 0.08,
          animation: "eventart-flame-flicker 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function SatyanarayanaArt({ theme }: { theme: EventTheme }) {
  const orange = theme.primary;
  const peach = theme.secondary;
  const deepOrange = theme.accent;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Temple gopuram silhouette at top-center */}
      <TempleGopuram
        size={110}
        color={orange}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "2%",
          left: "50%",
          marginLeft: "-55px",
          opacity: 0.13,
          animation: "eventart-pulse-opacity 8s ease-in-out infinite",
          ["--ea-base-opacity" as string]: "0.09",
          ["--ea-peak-opacity" as string]: "0.16",
        }}
      />

      {/* Kalash at top-left */}
      <Kalash
        size={80}
        color={orange}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "8%",
          left: "3%",
          opacity: 0.12,
          animation: "eventart-gentle-bob 8s ease-in-out infinite",
        }}
      />

      {/* Kalash at top-right */}
      <Kalash
        size={70}
        color={deepOrange}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "10%",
          right: "4%",
          opacity: 0.1,
          animation: "eventart-gentle-bob 9s ease-in-out 1.5s infinite",
        }}
      />

      {/* Lotus flowers */}
      <Lotus
        size={75}
        color={orange}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "35%",
          right: "2%",
          opacity: 0.1,
          animation: "eventart-float 7s ease-in-out infinite",
        }}
      />
      <Lotus
        size={60}
        color={deepOrange}
        className="hidden sm:block"
        style={{
          position: "absolute",
          top: "50%",
          left: "3%",
          opacity: 0.09,
          animation: "eventart-float-reverse 8s ease-in-out 1s infinite",
        }}
      />
      <Lotus
        size={45}
        color={orange}
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: "25%",
          right: "6%",
          opacity: 0.08,
          animation: "eventart-drift 9s ease-in-out 2s infinite",
        }}
      />

      {/* Diya lamps */}
      <Diya
        size={70}
        color={orange}
        className="hidden sm:block"
        style={{
          position: "absolute",
          bottom: "8%",
          left: "4%",
          opacity: 0.12,
          animation: "eventart-flame-flicker 2.8s ease-in-out infinite",
        }}
      />
      <Diya
        size={60}
        color={deepOrange}
        className="hidden sm:block"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          opacity: 0.1,
          animation: "eventart-flame-flicker 3s ease-in-out 0.5s infinite",
        }}
      />
      <Diya
        size={45}
        color={orange}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "60%",
          right: "3%",
          opacity: 0.08,
          animation: "eventart-flame-flicker 3.2s ease-in-out 1s infinite",
        }}
      />

      {/* Temple accents at bottom corners */}
      <TempleGopuram
        size={70}
        color={deepOrange}
        className="hidden lg:block"
        style={{
          position: "absolute",
          bottom: "5%",
          left: "2%",
          opacity: 0.07,
          animation: "eventart-gentle-bob 10s ease-in-out 3s infinite",
        }}
      />
      <TempleGopuram
        size={60}
        color={orange}
        className="hidden lg:block"
        style={{
          position: "absolute",
          bottom: "5%",
          right: "2%",
          opacity: 0.06,
          animation: "eventart-gentle-bob 11s ease-in-out 4s infinite",
        }}
      />

      {/* Kalash at mid-left */}
      <Kalash
        size={55}
        color={orange}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "65%",
          left: "5%",
          opacity: 0.07,
          animation: "eventart-float 8s ease-in-out 2.5s infinite",
        }}
      />
    </div>
  );
}

/* =============================================================================
   MAIN EXPORTED COMPONENT
   ============================================================================= */

export default function EventArt({ eventSlug, theme }: EventArtProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderArt = () => {
    switch (eventSlug) {
      case "haldi":
        return <HaldiArt theme={theme} />;
      case "sangeeth":
        return <SangeethArt theme={theme} />;
      case "pellikuthuru":
        return <PellikuthuruArt theme={theme} />;
      case "pellikoduku":
        return <PellikodukuArt theme={theme} />;
      case "karthik-upanayanam":
      case "aditya-upanayanam":
        return <UpanayanamArt theme={theme} />;
      case "pelli":
        return <PelliArt theme={theme} />;
      case "mehendi":
        return <PellikuthuruArt theme={theme} />;
      case "satyanarayana-swami-vratam-aditya":
      case "satyanarayana-swami-vratam-neelu":
        return <SatyanarayanaArt theme={theme} />;
      default:
        return null;
    }
  };

  return (
    <>
      <style>{animationStyles}</style>
      {renderArt()}
    </>
  );
}
