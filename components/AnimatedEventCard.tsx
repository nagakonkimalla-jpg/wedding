"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import TiltCard from "./TiltCard";

interface AnimatedEventCardProps {
  slug: string;
  index: number;
  gradient: string;
  isLight: boolean;
  textClass: string;
  event: {
    decorativeEmoji: string;
    title: string;
    subtitle: string;
    tagline: string;
    date: string;
    time: string;
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
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

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

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
                min-h-[280px] flex flex-col justify-between p-8
              `}
            >
              {/* Decorative pattern */}
              <div className="absolute inset-0 rangoli-pattern opacity-30" />

              {/* Gold shimmer on hover */}
              <div className="absolute inset-0 gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10">
                <span className="text-4xl mb-4 block">
                  {event.decorativeEmoji}
                </span>

                <h4
                  className={`font-heading text-2xl font-bold mb-1 ${textClass}`}
                >
                  {event.title}
                </h4>

                <p
                  className={`text-lg mb-3 ${isLight ? "text-[#3D2B1F]/60" : "text-white/90"}`}
                >
                  {event.subtitle}
                </p>

                <p
                  className={`text-sm italic ${isLight ? "text-[#3D2B1F]/70" : "text-white"}`}
                >
                  {event.tagline}
                </p>
              </div>

              {/* Date and Time */}
              <div className="relative z-10 mt-6">
                <div
                  className={`flex items-center gap-2 text-sm ${isLight ? "text-[#3D2B1F]/80" : "text-white/90"}`}
                >
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-body">
                    {formatDate(event.date)}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-2 text-sm mt-1 ${isLight ? "text-[#3D2B1F]/80" : "text-white/90"}`}
                >
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-body">{event.time}</span>
                </div>

                {/* View details arrow */}
                <div
                  className={`flex items-center gap-1 mt-4 text-sm font-semibold transition-all duration-300 group-hover:gap-3 ${isLight ? "text-[#B8860B]" : "text-[#FCD34D]"}`}
                >
                  <span>View Details &amp; RSVP</span>
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
