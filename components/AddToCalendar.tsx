"use client";

import { EventInfo, EventTheme } from "@/types";

interface AddToCalendarProps {
  event: EventInfo;
  theme?: EventTheme;
}

function parseTimeTo24(segment: string): { hour: number; min: number } | null {
  const match = segment.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  let hour = parseInt(match[1], 10);
  const min = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return { hour, min };
}

// Manual calendar time overrides for events with non-standard time formats
const calendarTimeOverrides: Record<string, { start: string; end: string }> = {
  pelli: { start: "080000", end: "123000" },
};

function buildGoogleCalendarUrl(event: EventInfo): string {
  const dateStr = event.date.replace(/-/g, ""); // "20260423"

  const override = calendarTimeOverrides[event.slug];
  let dates: string;

  if (override) {
    dates = `${dateStr}T${override.start}/${dateStr}T${override.end}`;
  } else {
    // Parse time string for start/end
    const timeRegex = /(\d{1,2}:\d{2}\s*[AP]M)/gi;
    const matches = event.time.match(timeRegex);

    if (matches && matches.length >= 1) {
      const start = parseTimeTo24(matches[0]);
      const end = matches.length >= 2 ? parseTimeTo24(matches[1]) : null;

      const fmt = (t: { hour: number; min: number }) =>
        `${String(t.hour).padStart(2, "0")}${String(t.min).padStart(2, "0")}00`;

      const startStr = start ? fmt(start) : "090000";
      const endStr = end
        ? fmt(end)
        : start
          ? fmt({ hour: (start.hour + 3) % 24, min: start.min })
          : "120000";

      dates = `${dateStr}T${startStr}/${dateStr}T${endStr}`;
    } else {
      // All-day fallback
      const nextDay = new Date(event.date + "T00:00:00");
      nextDay.setDate(nextDay.getDate() + 1);
      const nd = nextDay.toISOString().split("T")[0].replace(/-/g, "");
      dates = `${dateStr}/${nd}`;
    }
  }

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.title} — Neelu & Aditya's Wedding`,
    dates,
    details: event.description,
    location: `${event.venue}, ${event.venueAddress}`,
    ctz: "America/New_York",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function AddToCalendar({ event, theme }: AddToCalendarProps) {
  const activeTheme = theme || event.theme;
  const calendarUrl = buildGoogleCalendarUrl(event);

  return (
    <a
      href={calendarUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-body font-semibold text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
      style={{
        backgroundColor: activeTheme.primary,
        color: "#fff",
      }}
      aria-label={`Add ${event.title} to calendar`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      Add to Calendar
    </a>
  );
}
