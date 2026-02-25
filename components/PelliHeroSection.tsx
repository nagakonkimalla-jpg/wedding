"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { EventInfo } from "@/types";

interface HeroSectionProps {
    event: EventInfo;
}

export default function PelliHeroSection({ event }: HeroSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const [leftBellRinging, setLeftBellRinging] = useState(false);
    const [rightBellRinging, setRightBellRinging] = useState(false);

    const playBellSound = () => {
        const audio = new Audio('/audio/ambient_bells.ogg');
        audio.volume = 0.5;
        audio.play().catch(() => {});
    };

    const handleLeftBellClick = () => {
        if (leftBellRinging) return;
        setLeftBellRinging(true);
        playBellSound();
        setTimeout(() => setLeftBellRinging(false), 1500);
    };

    const handleRightBellClick = () => {
        if (rightBellRinging) return;
        setRightBellRinging(true);
        playBellSound();
        setTimeout(() => setRightBellRinging(false), 1500);
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // --- 3D Parallax Transforms ---
    // Deep Background (moves slowly)
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    // Midground (bells)
    const bellsY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    // (thoranam is now a fixed border via GarlandBorder)

    // Center Ganesha Motif & Text (Fades and drifts up significantly)
    const centerGroupY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-60%"]);
    const centerGroupOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    // Apply reduced motion fallback
    const motionBgY = prefersReducedMotion ? "0%" : bgY;
    const motionBellsY = prefersReducedMotion ? "0%" : bellsY;
    // motionThoranamY removed — thoranam handled by GarlandBorder
    const motionCenterGroupY = prefersReducedMotion ? "0%" : centerGroupY;
    const motionCenterGroupOpacity = prefersReducedMotion ? 1 : centerGroupOpacity;

    return (
        <section ref={containerRef} className="relative z-[4] h-[180vh] w-full bg-[var(--bg-primary)]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Background Layer: Ivory / Warm Tone */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] to-[#FDF5E6] pointer-events-none"
                    style={{ y: motionBgY }}
                />

                {/* Corner borders removed — thoranam + garland border now frames the page */}

                {/* Brass Bells — positioned to emerge below fixed thoranam border */}
                <motion.div
                    className="absolute top-[50px] sm:top-[70px] md:top-[90px] left-[15%] sm:left-[20%] w-16 sm:w-24 md:w-32 opacity-90 cursor-pointer origin-top"
                    style={{ y: motionBellsY }}
                    onClick={handleLeftBellClick}
                >
                    <img
                        src="/assets/images/pelli/brass_bell.png"
                        alt=""
                        className={`w-full h-auto object-contain drop-shadow-xl ${leftBellRinging ? 'animate-bell-ring' : 'animate-swing'}`}
                    />
                </motion.div>
                <motion.div
                    className="absolute top-[50px] sm:top-[70px] md:top-[90px] right-[15%] sm:right-[20%] w-20 sm:w-28 md:w-36 opacity-90 cursor-pointer origin-top"
                    style={{ y: motionBellsY }}
                    onClick={handleRightBellClick}
                >
                    <img
                        src="/assets/images/pelli/brass_bell.png"
                        alt=""
                        className={`w-full h-auto object-contain drop-shadow-xl ${rightBellRinging ? 'animate-bell-ring' : 'animate-swing-delayed'}`}
                    />
                </motion.div>

                {/* Thoranam + side garlands now handled by fixed GarlandBorder component */}

                {/* Layer 3: Main Traditional Content (Center Motif + Typography) */}
                <motion.div
                    className="relative z-10 flex flex-col items-center justify-start h-full text-center px-6 w-full max-w-4xl mx-auto pt-[110px] sm:pt-[140px] md:pt-[170px]"
                    style={{ y: motionCenterGroupY, opacity: motionCenterGroupOpacity }}
                >
                    {/* Ganesha Motif */}
                    <div className="mb-6 sm:mb-10 w-48 h-48 sm:w-64 sm:h-64 relative z-10">
                        <img
                            src="/images/ganesha.png"
                            alt="Lord Ganesha"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Auspicious / Sacred Invocation */}
                    <p className="text-sm sm:text-lg md:text-xl font-body tracking-[0.2em] uppercase text-[var(--text-primary)] mb-6 font-medium">
                        ॥ శ్రీ విఘ్నేశ్వరాయ నమః ॥ <br />
                        <span className="block mt-2 tracking-[0.4em] text-[var(--accent-primary)] text-xs sm:text-sm">With the blessings of elders</span>
                    </p>

                    {/* Main Title */}
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading font-normal mb-6 leading-tight text-[var(--accent-primary)] drop-shadow-sm">
                        {event.title}
                    </h1>

                    {/* Tagline / Subtitle */}
                    <p className="text-2xl sm:text-4xl md:text-5xl font-script drop-shadow-sm italic" style={{ color: 'rgba(74, 28, 28, 0.9)' }}>
                        {event.tagline}
                    </p>

                    {/* Date and Time Details */}
                    <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 opacity-90">
                        <div className="font-body text-sm sm:text-base tracking-[0.1em] uppercase text-[var(--text-primary)]">
                            {new Date(event.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                        </div>
                        <div className="hidden sm:block w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                        <div className="font-body text-sm sm:text-base tracking-[0.1em] uppercase text-[var(--text-primary)]">
                            {event.time}
                        </div>
                    </div>
                    <div className="mt-4 font-body text-xs sm:text-sm tracking-widest uppercase" style={{ color: 'rgba(74, 28, 28, 0.8)' }}>
                        {event.venue}
                    </div>
                </motion.div>

                {/* Secondary Layer: The "Couple" illustration fading in as scroll reveals */}
                <motion.div
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
                    style={{
                        opacity: useTransform(scrollYProgress, [0.3, 0.6, 0.9], [0, 1, 0]),
                        y: useTransform(scrollYProgress, [0.4, 0.8], ["10%", "-20%"])
                    }}
                >
                    <div className="flex flex-col items-center p-8 sm:p-12 rounded-3xl backdrop-blur-sm shadow-xl max-w-2xl px-6" style={{ backgroundColor: 'rgba(250, 245, 233, 0.9)', border: '1px solid rgba(212, 160, 23, 0.2)' }}>
                        <img
                            src="/assets/images/pelli/couple.png"
                            alt="Telugu Bride and Groom"
                            className="w-64 h-64 sm:w-80 sm:h-80 object-contain mb-8"
                        />
                        <h2 className="text-3xl sm:text-4xl font-heading text-[var(--accent-primary)] text-center w-full leading-relaxed mb-4">
                            We cordially invite you <br />to grace the auspicious occasion
                        </h2>
                        <div className="w-12 h-px my-4" style={{ backgroundColor: 'rgba(212, 160, 23, 0.4)' }} />
                        <p className="text-sm sm:text-base font-body tracking-wider uppercase text-center max-w-md" style={{ color: 'rgba(74, 28, 28, 0.8)' }}>
                            Your presence is our highest honor.
                        </p>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
                    <span className="text-[var(--accent-primary)] text-[10px] font-body tracking-[0.3em] uppercase opacity-70">Scroll Down</span>
                    <div className="w-[1px] h-10 bg-[var(--accent-primary)] opacity-50 animate-pulse" />
                </div>

                {/* Gentle Frame Overlay for that classic printed card look */}
                <div className="absolute inset-4 sm:inset-6 md:inset-8 pointer-events-none z-50 rounded-sm" style={{ border: '1px solid rgba(212, 160, 23, 0.2)' }} />
                <div className="absolute inset-[18px] sm:inset-[26px] md:inset-[34px] pointer-events-none z-50 rounded-sm" style={{ border: '0.5px solid rgba(212, 160, 23, 0.1)' }} />

            </div>
        </section>
    );
}
