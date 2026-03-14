"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import TiltCard from "./TiltCard";
import { EventInfo } from "@/types";
import { buildGoogleCalendarUrl } from "./AddToCalendar";

interface AnimatedEventCardProps {
  slug: string;
  index: number;
  gradient: string;
  isLight: boolean;
  textClass: string;
  event: EventInfo;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function AnimatedEventCard({
  slug,
  index,
  gradient,
  isLight,
  textClass,
  event,
}: AnimatedEventCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [rsvpd, setRsvpd] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    try {
      const rsvpEvents = JSON.parse(localStorage.getItem("wedding-rsvp-events") || "{}");
      if (rsvpEvents[slug]) setRsvpd(true);
    } catch {}
  }, [slug]);

  const calendarUrl = buildGoogleCalendarUrl(event);
  const subtextClass = isLight ? "text-[#3D2B1F]/70" : "text-white/80";

  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: prefersReducedMotion ? 0 : isMobile ? 30 : 60 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.5,
        delay: prefersReducedMotion ? 0 : isMobile ? 0 : index * 0.15,
        ease: "easeOut",
      }}
    >
      <TiltCard>
        <motion.div
          whileHover={prefersReducedMotion ? {} : { y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Link href={`/events/${slug}`} className="group block">
            <div
              className={`
                relative overflow-hidden rounded-2xl shadow-lg
                transition-shadow duration-500 ease-out
                group-hover:shadow-2xl
                bg-gradient-to-br ${gradient}
                min-h-[220px] sm:min-h-[280px] flex flex-col justify-between p-5 sm:p-8
              `}
            >
              {/* Decorative pattern */}
              <div className="absolute inset-0 rangoli-pattern opacity-30" />

              {/* Gold shimmer on hover */}
              <div className="absolute inset-0 gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* RSVP'd indicator */}
              {rsvpd && (
                <div className={`absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold tracking-wider uppercase ${isLight ? "bg-white/80 text-[#B8860B]" : "bg-white/20 text-white"} backdrop-blur-sm`}>
                  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  RSVP'd
                </div>
              )}

              {/* Content */}
              <div className="relative z-10">
                <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">
                  {event.decorativeEmoji}
                </span>

                <h4
                  className={`font-heading text-xl sm:text-2xl font-bold mb-0.5 sm:mb-1 ${textClass}`}
                >
                  {event.title}
                </h4>

                <p
                  className={`text-base sm:text-lg mb-1.5 sm:mb-3 ${isLight ? "text-[#3D2B1F]/60" : "text-white/90"}`}
                >
                  {event.subtitle}
                </p>

                <p
                  className={`text-xs sm:text-sm italic hidden sm:block ${isLight ? "text-[#3D2B1F]/70" : "text-white"}`}
                >
                  {event.tagline}
                </p>
              </div>

              {/* Date, Time, Venue */}
              <div className="relative z-10 mt-3 sm:mt-6">
                <div className={`flex items-center gap-2 text-sm ${subtextClass}`}>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-body">{formatDate(event.date)}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm mt-1 ${subtextClass}`}>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-body">{event.time}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm mt-1 ${subtextClass}`}>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-body">{event.venue}</span>
                </div>

                {/* Add to Calendar — small link above View Details */}
                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`inline-flex items-center gap-1.5 mt-2.5 text-xs font-body font-medium transition-opacity hover:opacity-100 ${isLight ? "text-[#B8860B]/70 hover:text-[#B8860B]" : "text-[#FCD34D]/70 hover:text-[#FCD34D]"}`}
                  aria-label={`Add ${event.title} to calendar`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Add to Calendar
                </a>

                {/* View details arrow */}
                <div
                  className={`flex items-center gap-1 mt-3 text-sm font-semibold transition-all duration-300 group-hover:gap-3 ${isLight ? "text-[#B8860B]" : "text-[#FCD34D]"}`}
                >
                  <span>View Details</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}
