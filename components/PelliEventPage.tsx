"use client";

import Image from "next/image";
import { EventInfo } from "@/types";
import PelliHeroSection from "./PelliHeroSection";
import EventDetails from "./EventDetails";
import CountdownTimer from "./CountdownTimer";
import DressCode from "./DressCode";
import ImageGallery from "./ImageGallery";
import VenueMap from "./VenueMap";
import RSVPForm from "./RSVPForm";
import AnimatedSection from "./AnimatedSection";

import AddToCalendar from "./AddToCalendar";

interface EventPageProps {
    event: EventInfo;
}

function DecorativeDivider() {
    return (
        <div className="relative z-[4] flex items-center justify-center gap-4 py-6 sm:py-8 px-8">
            <div className="flex-1 max-w-[100px] h-px" style={{ background: `linear-gradient(to right, transparent, #D4A01740)` }} />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8L12 2Z"
                    fill="#D4A017"
                    opacity="0.4"
                />
            </svg>
            <div className="flex-1 max-w-[100px] h-px" style={{ background: `linear-gradient(to left, transparent, #D4A01740)` }} />
        </div>
    );
}

export default function PelliEventPage({ event }: EventPageProps) {
    const scrollToRSVP = () => {
        document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] pelli-paper-texture">

            {/* Logo top-left — cropped to show monogram in rounded badge */}
            <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-40">
                <div className="relative w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden shadow-lg border border-[#D4A017]/30">
                    <Image
                        src="/images/logo.png"
                        alt="N & A"
                        fill
                        className="object-cover bg-white"
                        style={{ objectPosition: "50% 42%" }}
                    />
                </div>
            </div>

            {/* Floating RSVP button */}
            <button
                onClick={scrollToRSVP}
                className="fixed bottom-6 right-6 z-40 px-8 py-4 rounded-full font-body font-bold text-base text-white shadow-lg transition-transform hover:scale-105 active:scale-95 bg-[#8B1A1A]"
            >
                RSVP
            </button>

            {/* Hero */}
            <PelliHeroSection event={event} />

            {/* Background elegant watercolor frame */}
            <div className="fixed inset-0 pointer-events-none pelli-border-frame z-[1]" />

            {/* Corner floral watermarks */}
            <div className="fixed -top-10 -right-10 w-48 h-48 pelli-watermark-floral pointer-events-none z-[0] opacity-30" />
            <div className="fixed -bottom-10 -left-10 w-48 h-48 pelli-watermark-floral pointer-events-none z-[0] opacity-30" style={{ transform: "rotate(180deg)" }} />

            <div className="relative z-[2]">
                {/* Description */}
                <AnimatedSection direction="fade">
                    <section className="py-12 sm:py-20 px-5 sm:px-6">
                        <div className="max-w-2xl mx-auto text-center">
                            <p
                                className="text-lg sm:text-xl font-body leading-relaxed text-[#3D2B1F]"
                            >
                                {event.description}
                            </p>
                        </div>
                    </section>
                </AnimatedSection>

                <DecorativeDivider />

                {/* Event Details */}
                <AnimatedSection direction="up">
                    <EventDetails event={event} />
                    <div className="px-5 sm:px-6">
                        <div className="max-w-3xl mx-auto flex justify-center">
                            <AddToCalendar event={event} />
                        </div>
                    </div>
                </AnimatedSection>

                <DecorativeDivider />

                {/* Countdown */}
                <AnimatedSection direction="up" delay={100}>
                    <div className="bg-[#FDFBF7] p-8 rounded-xl shadow-sm border border-[#D4A017]/20 max-w-4xl mx-auto">
                        <CountdownTimer targetDate={event.date} theme={{ ...event.theme, bg: "#FDFBF7", text: "#8B1A1A" }} />
                    </div>
                </AnimatedSection>

                <DecorativeDivider />

                {/* Dress Code (conditional) */}
                {event.dressCode && (
                    <>
                        <AnimatedSection direction="up" delay={200}>
                            <div className="bg-[#FDFBF7] py-6 px-10 rounded-xl shadow-sm border border-[#D4A017]/20 max-w-2xl mx-auto text-center">
                                <DressCode dressCode={event.dressCode} theme={{ ...event.theme, primary: "#8B1A1A", text: "#3D2B1F" }} />
                            </div>
                        </AnimatedSection>
                        <DecorativeDivider />
                    </>
                )}

                {/* Gallery */}
                {event.galleryImages.length > 0 && (
                    <>
                        <AnimatedSection direction="up">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-[#D4A017]/20 max-w-6xl mx-auto">
                                <ImageGallery
                                    images={event.galleryImages}
                                    theme={{ ...event.theme, primary: "#D4A017", bg: "#FFFFFF" }}
                                    eventSlug={event.slug}
                                />
                            </div>
                        </AnimatedSection>
                        <DecorativeDivider />
                    </>
                )}

                {/* Venue */}
                <AnimatedSection direction="left">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-[#D4A017]/20 max-w-5xl mx-auto">
                        <VenueMap
                            venue={event.venue}
                            address={event.venueAddress}
                            googleMapsUrl={event.googleMapsUrl}
                            theme={{ ...event.theme, bg: "#FFFFFF", primary: "#8B1A1A", text: "#3D2B1F" }}
                            venueImage={event.venueImage}
                        />
                    </div>
                </AnimatedSection>

                <DecorativeDivider />

                {/* RSVP Form */}
                <AnimatedSection direction="up">
                    <div className="bg-[#FDFBF7] p-8 rounded-xl shadow-sm border border-[#D4A017]/30 max-w-3xl mx-auto mb-10">
                        <RSVPForm event={{ ...event, theme: { ...event.theme, primary: "#8B1A1A", cardBg: "#FFFFFF", text: "#3D2B1F", bg: "#FDFBF7" } }} />
                    </div>
                </AnimatedSection>

                {/* Footer */}
                <footer className="py-14 sm:py-20 text-center px-5 relative z-[4]">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-16 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(212, 160, 23, 0.4))` }} />
                            <span className="text-xl text-[#D4A017]">✦</span>
                            <div className="w-16 h-px" style={{ background: `linear-gradient(to left, transparent, rgba(212, 160, 23, 0.4))` }} />
                        </div>
                        <p className="font-script text-3xl sm:text-4xl mb-3 text-[#B8860B]">
                            Neelu & Aditya
                        </p>
                        <p className="font-body text-xs tracking-[0.3em] uppercase mb-2 text-[#8B1A1A]">
                            With love and gratitude
                        </p>
                        <p className="font-body text-xs text-[#3D2B1F]/40">
                            Made with ❤️
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
