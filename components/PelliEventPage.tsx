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
import TiltCard from "./TiltCard";
import GarlandBorder from "./GarlandBorder";
import { FaMapMarkerAlt } from "react-icons/fa";
import CeremonyStages from "./CeremonyStages";

import AddToCalendar from "./AddToCalendar";
import GiftsSection from "./GiftsSection";

interface EventPageProps {
    event: EventInfo;
}

function DecorativeDivider() {
    return (
        <div className="relative z-[4] flex items-center justify-center gap-4 py-4 sm:py-6 px-8">
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

            {/* Thoranam + Garland border — interactive scroll-driven wind */}
            <GarlandBorder />

            {/* Logo top-left — cropped to show monogram in rounded badge */}
            <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-40">
                <div className="relative w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden shadow-lg bg-white border border-[#D4A017]/30">
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
                className="fixed bottom-6 right-6 z-40 px-8 py-4 rounded-full font-body font-bold text-base text-white shadow-lg transition-transform hover:scale-105 active:scale-95 bg-[#8B1A1A]"
            >
                RSVP
            </button>

            {/* Hero */}
            <PelliHeroSection event={event} />

            {/* Corner floral watermarks */}
            <div className="fixed -top-10 -right-10 w-48 h-48 pelli-watermark-floral pointer-events-none z-[0] opacity-30" />
            <div className="fixed -bottom-10 -left-10 w-48 h-48 pelli-watermark-floral pointer-events-none z-[0] opacity-30" style={{ transform: "rotate(180deg)" }} />

            <div className="relative z-[2] pl-[30px] pr-[30px] sm:pl-[55px] sm:pr-[55px] md:pl-[65px] md:pr-[65px]">
                {/* Description */}
                <AnimatedSection direction="fade">
                    <section className="py-8 sm:py-12 px-4 sm:px-6">
                        <div className="max-w-2xl mx-auto text-center">
                            <p
                                className="text-base sm:text-xl font-body leading-relaxed text-[#3D2B1F]"
                            >
                                {event.description}
                            </p>
                        </div>
                    </section>
                </AnimatedSection>

                <DecorativeDivider />

                {/* Ceremony Stages */}
                <CeremonyStages />

                <DecorativeDivider />

                {/* Event Details */}
                <AnimatedSection direction="up">
                    <EventDetails event={event} />
                    <div className="px-4 sm:px-6">
                        <div className="max-w-3xl mx-auto flex justify-center">
                            <AddToCalendar event={event} />
                        </div>
                    </div>
                </AnimatedSection>

                <DecorativeDivider />

                {/* Countdown */}
                <AnimatedSection direction="up" delay={100}>
                    <TiltCard className="max-w-4xl mx-auto touch-manipulation">
                        <div className="bg-[var(--bg-primary)] p-6 sm:p-10 md:p-14 rounded-2xl relative shadow-lg overflow-hidden" style={{ border: '1px solid rgba(212, 160, 23, 0.2)' }}>
                            {/* Traditional Corners on the card */}
                            <img src="/assets/images/pelli/corner_borders.png" alt="" className="absolute top-0 left-0 w-12 h-12 sm:w-24 sm:h-24 opacity-60 mix-blend-multiply" style={{ transform: 'rotate(180deg)' }} />
                            <img src="/assets/images/pelli/corner_borders.png" alt="" className="absolute top-0 right-0 w-12 h-12 sm:w-24 sm:h-24 opacity-60 mix-blend-multiply" style={{ transform: 'scaleY(-1)' }} />
                            <img src="/assets/images/pelli/corner_borders.png" alt="" className="absolute bottom-0 left-0 w-12 h-12 sm:w-24 sm:h-24 opacity-60 mix-blend-multiply" style={{ transform: 'scaleX(-1)' }} />
                            <img src="/assets/images/pelli/corner_borders.png" alt="" className="absolute bottom-0 right-0 w-12 h-12 sm:w-24 sm:h-24 opacity-60 mix-blend-multiply" />

                            <div className="text-center relative z-10">
                                <h2 className="text-sm font-body tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(74, 28, 28, 0.7)' }}>The Big Day Is</h2>
                                <div className="text-2xl sm:text-4xl md:text-5xl font-heading text-[var(--accent-primary)] mb-8 sm:mb-10">Counting Down</div>
                                <CountdownTimer targetDate="2026-04-23T08:00:00" theme={{ ...event.theme, bg: "var(--bg-primary)", text: "var(--text-primary)", primary: "var(--accent-primary)" }} />
                            </div>
                        </div>
                    </TiltCard>
                </AnimatedSection>

                <DecorativeDivider />

                {/* Gallery */}
                {event.galleryImages.length > 0 && (
                    <>
                        <AnimatedSection direction="up">
                            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-[#D4A017]/20 max-w-6xl mx-auto">
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

                {/* Venue Details & Map Section */}
                <AnimatedSection delay={0.4}>
                    <div className="max-w-3xl mx-auto">
                        <TiltCard className="h-full touch-manipulation">
                            <div className="h-full bg-[var(--bg-primary)] p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] shadow-md" style={{ border: '1px solid rgba(212, 160, 23, 0.2)' }}>
                                <h3 className="text-xl sm:text-2xl font-heading mb-6 text-[var(--text-primary)] flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-[var(--accent-primary)]" />
                                    Venue Details
                                </h3>
                                <VenueMap
                                    venue={event.venue}
                                    address={event.venueAddress}
                                    googleMapsUrl={event.googleMapsUrl}
                                    theme={{ ...event.theme, bg: "var(--bg-primary)", primary: "var(--accent-primary)", text: "var(--text-primary)" }}
                                    venueImage={event.venueImage}
                                />
                            </div>
                        </TiltCard>
                    </div>
                </AnimatedSection>

                <DecorativeDivider />

                {/* RSVP Form */}
                <AnimatedSection direction="up">
                    <TiltCard className="max-w-2xl mx-auto touch-manipulation">
                        <div className="bg-[var(--bg-primary)] p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] shadow-lg border-t-4 border-[var(--accent-primary)] relative overflow-hidden">
                            {/* Traditional Corners on the card */}
                            <img src="/assets/images/pelli/corner_borders.png" alt="" className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 opacity-40 mix-blend-multiply" style={{ transform: 'rotate(180deg)' }} />
                            <img src="/assets/images/pelli/corner_borders.png" alt="" className="absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 opacity-40 mix-blend-multiply" style={{ transform: 'scaleY(-1)' }} />
                            <div className="relative z-10 text-center mb-6 sm:mb-8">
                                <h2 className="text-2xl sm:text-4xl font-heading text-[var(--accent-primary)] mb-3">You're Invited</h2>
                                <p className="font-body text-sm sm:text-base" style={{ color: 'rgba(74, 28, 28, 0.7)' }}>Kindly let us know if you can join us.</p>
                            </div>
                            <div className="relative z-10">
                                <RSVPForm event={{ ...event, theme: { ...event.theme, primary: "var(--accent-primary)", cardBg: "var(--bg-primary)", text: "var(--text-primary)", bg: "var(--bg-primary)" } }} />
                            </div>
                        </div>
                    </TiltCard>
                </AnimatedSection>

                <DecorativeDivider />

                {/* Gifts / Blessings */}
                <AnimatedSection direction="up">
                    <GiftsSection theme={{ ...event.theme, primary: "var(--accent-primary)", cardBg: "var(--bg-primary)", text: "var(--text-primary)" }} />
                </AnimatedSection>

                {/* Footer */}
                <footer className="py-10 sm:py-16 text-center px-4 relative z-[4]">
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
