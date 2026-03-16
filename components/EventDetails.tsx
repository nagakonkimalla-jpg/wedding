import { EventInfo } from "@/types";
import Image from "next/image";

interface EventDetailsProps {
  event: EventInfo;
}

function OrnamentalCorner({ color, position }: { color: string; position: string }) {
  const rotations: Record<string, string> = {
    "top-left": "rotate(0)",
    "top-right": "rotate(90deg)",
    "bottom-right": "rotate(180deg)",
    "bottom-left": "rotate(270deg)",
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`absolute ${position === "top-left" ? "top-2 left-2" : position === "top-right" ? "top-2 right-2" : position === "bottom-right" ? "bottom-2 right-2" : "bottom-2 left-2"}`}
      style={{ transform: rotations[position] }}
    >
      <path d="M0 0 L12 0 L12 3 L3 3 L3 12 L0 12 Z" fill={color} opacity="0.3" />
    </svg>
  );
}

export default function EventDetails({ event }: EventDetailsProps) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const details = [
    { icon: "calendar", label: "Date", value: formatDate(event.date) },
    { icon: "\u{1F550}", label: "Time", value: event.time },
    { icon: "\u{1F4CD}", label: "Venue", value: event.venue },
    ...(event.dressCode
      ? [{ icon: (() => {
          const dc = event.dressCode.toLowerCase();
          if (dc.includes("saree") && dc.includes("lehenga")) return "wedding-attire";
          if (dc.includes("kurta") && dc.includes("saree")) return "kurta-saree";
          if (dc.includes("glamorous") || dc.includes("indo-western")) return "✨";
          if (dc.includes("formal") || dc.includes("western attire")) return "👔";
          return "🥻";
        })(), label: "Suggested Attire", value: event.dressCode }]
      : []),
  ];

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Ornamental heading */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <svg width="40" height="2" className="opacity-40">
              <line x1="0" y1="1" x2="40" y2="1" stroke={event.theme.primary} strokeWidth="1" />
            </svg>
            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: event.theme.primary, opacity: 0.5 }} />
            <svg width="40" height="2" className="opacity-40">
              <line x1="0" y1="1" x2="40" y2="1" stroke={event.theme.primary} strokeWidth="1" />
            </svg>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-heading font-bold tracking-wide"
            style={{ color: event.theme.text }}
          >
            Event Details
          </h2>
          <p className="font-body text-sm mt-2 tracking-[0.2em] uppercase opacity-60" style={{ color: event.theme.text }}>
            Everything you need to know
          </p>
        </div>

        {/* Details grid with ornamental cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="relative rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
              style={{
                backgroundColor: event.theme.cardBg,
                border: `2px solid ${event.theme.primary}30`,
                boxShadow: `0 2px 16px ${event.theme.primary}12`,
              }}
            >
              {/* Decorative corners */}
              <OrnamentalCorner color={event.theme.primary} position="top-left" />
              <OrnamentalCorner color={event.theme.primary} position="top-right" />
              <OrnamentalCorner color={event.theme.primary} position="bottom-left" />
              <OrnamentalCorner color={event.theme.primary} position="bottom-right" />

              <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {detail.icon === "calendar" ? (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="mx-auto">
                    <rect x="4" y="8" width="36" height="32" rx="4" stroke={event.theme.primary} strokeWidth="1.5" fill={event.theme.primary} fillOpacity="0.08" />
                    <rect x="4" y="8" width="36" height="13" rx="4" fill={event.theme.primary} fillOpacity="0.18" />
                    <text x="22" y="18" textAnchor="middle" fontSize="8" fontWeight="700" fill={event.theme.primary} fontFamily="system-ui">{new Date(event.date + "T00:00:00").toLocaleDateString("en-US", { month: "short" }).toUpperCase()}</text>
                    <text x="22" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill={event.theme.text} fontFamily="system-ui">{new Date(event.date + "T00:00:00").getDate()}</text>
                    <line x1="14" y1="4" x2="14" y2="12" stroke={event.theme.primary} strokeWidth="2" strokeLinecap="round" />
                    <line x1="30" y1="4" x2="30" y2="12" stroke={event.theme.primary} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : detail.icon === "wedding-attire" ? (
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md">
                        <Image src="/images/shared/wedding_lehenga_icon.png" alt="Lehenga" fill className="object-contain" />
                      </div>
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md">
                        <Image src="/images/shared/wedding_saree_icon.png" alt="Saree" fill className="object-contain" />
                      </div>
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md">
                        <Image src="/images/shared/kurta_icon.png" alt="Kurta" fill className="object-contain" />
                      </div>
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md">
                        <Image src="/images/shared/wedding_suit_icon.png" alt="Suit" fill className="object-contain" />
                      </div>
                    </div>
                  </div>
                ) : detail.icon === "kurta-saree" ? (
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
                      <Image src="/images/shared/kurta_icon.png" alt="Kurta" fill className="object-contain" />
                    </div>
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
                      <Image src="/images/shared/saree_icon.png" alt="Saree" fill className="object-contain" />
                    </div>
                  </div>
                ) : detail.icon}
              </div>
              <div
                className="text-xs uppercase tracking-[0.2em] font-body mb-2"
                style={{ color: event.theme.primary }}
              >
                {detail.label}
              </div>
              <div
                className="text-lg font-heading font-semibold leading-relaxed"
                style={{ color: event.theme.text }}
              >
                {detail.value}
              </div>
              {detail.label === "Time" && event.slug === "pelli" && (
                <div
                  className="text-sm font-body mt-1.5 opacity-70"
                  style={{ color: event.theme.text }}
                >
                  Sumuhurtham: 9:23 AM
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
