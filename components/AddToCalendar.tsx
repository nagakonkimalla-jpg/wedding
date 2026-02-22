"use client";

import { EventInfo, EventTheme } from "@/types";

interface AddToCalendarProps {
  event: EventInfo;
  theme?: EventTheme;
}

function parseTime(timeStr: string): { startHour: number; startMin: number; endHour: number; endMin: number } {
  // Expected format: "10:00 AM - 1:00 PM"
  const parts = timeStr.split("-").map((s) => s.trim());

  function to24(segment: string): { hour: number; min: number } {
    const match = segment.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) {
      return { hour: 0, min: 0 };
    }
    let hour = parseInt(match[1], 10);
    const min = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return { hour, min };
  }

  const start = to24(parts[0] || "");
  const end = parts[1] ? to24(parts[1]) : { hour: start.hour + 3, min: start.min };

  return {
    startHour: start.hour,
    startMin: start.min,
    endHour: end.hour,
    endMin: end.min,
  };
}

function formatDateForICS(dateStr: string, hour: number, min: number): string {
  // dateStr expected: "June 15, 2025" or similar parseable format
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    // Fallback: try to return a reasonable default
    return "20250615T100000";
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const h = String(hour).padStart(2, "0");
  const m = String(min).padStart(2, "0");

  return `${year}${month}${day}T${h}${m}00`;
}

function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export default function AddToCalendar({ event, theme }: AddToCalendarProps) {
  const activeTheme = theme || event.theme;

  const handleAddToCalendar = () => {
    const { startHour, startMin, endHour, endMin } = parseTime(event.time);
    const dtStart = formatDateForICS(event.date, startHour, startMin);
    const dtEnd = formatDateForICS(event.date, endHour, endMin);

    const summary = escapeICSText(`${event.title} - Neelu & Aditya's Wedding`);
    const description = escapeICSText(event.description);
    const location = escapeICSText(`${event.venue}, ${event.venueAddress}`);

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Neelu & Aditya Wedding//EN",
      "BEGIN:VEVENT",
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.slug}-neelu-aditya-wedding.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleAddToCalendar}
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
    </button>
  );
}
