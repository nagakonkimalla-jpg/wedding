"use client";

import Image from "next/image";
import { EventInfo } from "@/types";
import HeroSection from "./HeroSection";
import EventDetails from "./EventDetails";
import CountdownTimer from "./CountdownTimer";
import DressCode from "./DressCode";
import ImageGallery from "./ImageGallery";
import VenueMap from "./VenueMap";
import RSVPForm from "./RSVPForm";
import AnimatedSection from "./AnimatedSection";

import AddToCalendar from "./AddToCalendar";
import FloatingElements from "./FloatingElements";
import EventArt from "./EventArt";
import TraditionalDecor from "./TraditionalDecor";

interface EventPageProps {
  event: EventInfo;
}

function DecorativeDivider({ color }: { color: string }) {
  return (
    <div className="relative z-[4] flex items-center justify-center gap-4 py-6 sm:py-8 px-8">
      <div className="flex-1 max-w-[100px] h-px" style={{ background: `linear-gradient(to right, transparent, ${color}30)` }} />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8L12 2Z"
          fill={color}
          opacity="0.25"
        />
      </svg>
      <div className="flex-1 max-w-[100px] h-px" style={{ background: `linear-gradient(to left, transparent, ${color}30)` }} />
    </div>
  );
}

export default function EventPage({ event }: EventPageProps) {
  const scrollToRSVP = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen texture-${
      event.slug.startsWith("satyanarayana") ? "vratam"
      : event.slug === "karthik-upanayanam" || event.slug === "aditya-upanayanam" ? "upanayanam"
      : event.slug === "mehendi" ? "mehendi"
      : event.slug
    }`} style={{ backgroundColor: event.theme.bg }}>
      {/* Floating background decoration */}
      <FloatingElements emoji={event.decorativeEmoji} theme={event.theme} />
      <EventArt eventSlug={event.slug} theme={event.theme} />
      <TraditionalDecor eventSlug={event.slug} theme={event.theme} />

      {/* Logo top-left — cropped to show monogram in rounded badge */}
      <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-40">
        <div className="relative w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden shadow-lg bg-white border border-gray-200/30">
          <Image
            src="/assets/images/pelli/logo.jpeg"
            alt="N & A"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Floating RSVP button */}
      <button
        onClick={scrollToRSVP}
        className="fixed bottom-6 right-6 z-40 px-8 py-4 rounded-full font-body font-bold text-base text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: event.theme.primary }}
      >
        RSVP
      </button>

      {/* Hero */}
      <HeroSection event={event} />

      {/* Description */}
      <AnimatedSection direction="fade">
        <section className="py-12 sm:py-20 px-5 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p
              className="text-lg sm:text-xl font-body leading-relaxed"
              style={{ color: event.theme.text }}
            >
              {event.description}
            </p>
          </div>
        </section>
      </AnimatedSection>

      <DecorativeDivider color={event.theme.primary} />

      {/* Event Details */}
      <AnimatedSection direction="up">
        <EventDetails event={event} />
        <div className="px-5 sm:px-6">
          <div className="max-w-3xl mx-auto flex justify-center">
            <AddToCalendar event={event} />
          </div>
        </div>
      </AnimatedSection>

      <DecorativeDivider color={event.theme.primary} />

      {/* Countdown */}
      <AnimatedSection direction="up" delay={100}>
        <CountdownTimer targetDate={event.date} theme={event.theme} />
      </AnimatedSection>

      <DecorativeDivider color={event.theme.primary} />

      {/* Dress Code (conditional) */}
      {event.dressCode && (
        <>
          <AnimatedSection direction="up" delay={200}>
            <DressCode dressCode={event.dressCode} theme={event.theme} />
          </AnimatedSection>
          <DecorativeDivider color={event.theme.primary} />
        </>
      )}

      {/* Gallery */}
      {event.galleryImages.length > 0 && (
        <>
          <AnimatedSection direction="up">
            <ImageGallery
              images={event.galleryImages}
              theme={event.theme}
              eventSlug={event.slug}
            />
          </AnimatedSection>
          <DecorativeDivider color={event.theme.primary} />
        </>
      )}

      {/* Venue */}
      <AnimatedSection direction="left">
        <VenueMap
          venue={event.venue}
          address={event.venueAddress}
          googleMapsUrl={event.googleMapsUrl}
          theme={event.theme}
          venueImage={event.venueImage}
        />
      </AnimatedSection>

      <DecorativeDivider color={event.theme.primary} />

      {/* RSVP Form */}
      <AnimatedSection direction="up">
        <RSVPForm event={event} />
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-14 sm:py-20 text-center px-5 relative z-[4]">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px" style={{ background: `linear-gradient(to right, transparent, ${event.theme.primary}30)` }} />
            <span className="text-xl" style={{ color: event.theme.primary }}>✦</span>
            <div className="w-16 h-px" style={{ background: `linear-gradient(to left, transparent, ${event.theme.primary}30)` }} />
          </div>
          <p className="font-script text-3xl sm:text-4xl mb-3" style={{ color: event.theme.primary }}>
            Neelu & Aditya
          </p>
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-2" style={{ color: `${event.theme.text}50` }}>
            With love and gratitude
          </p>
          <p className="font-body text-xs" style={{ color: `${event.theme.text}30` }}>
            Made with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}
