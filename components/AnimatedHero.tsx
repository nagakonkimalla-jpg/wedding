"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function AnimatedHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const noParallax = prefersReducedMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax for floating stars — disabled on mobile for smooth scroll
  const starY1 = useTransform(scrollYProgress, [0, 1], [0, noParallax ? 0 : -60]);
  const starY2 = useTransform(scrollYProgress, [0, 1], [0, noParallax ? 0 : -90]);
  const starY3 = useTransform(scrollYProgress, [0, 1], [0, noParallax ? 0 : -40]);
  const starY4 = useTransform(scrollYProgress, [0, 1], [0, noParallax ? 0 : -70]);

  // Title drifts up and fades slightly — disabled on mobile
  const titleY = useTransform(scrollYProgress, [0, 1], [0, noParallax ? 0 : -30]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, noParallax ? 1 : 0.6]);

  // Scroll indicator fades out
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Only apply entry animations after client mount (keeps SSR visible)
  const initial = mounted ? { opacity: 0, y: 20 } : false;
  const initialScale = mounted ? { opacity: 0, scaleX: 0 } : false;
  const initialFade = mounted ? { opacity: 0 } : false;

  return (
    <section ref={sectionRef} className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 py-20 overflow-hidden">
      {/* Mandala backdrop — subtle rangoli behind hero text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px] text-[#D4A017]/[0.04]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="0.3" fill="none" />
          {Array.from({ length: 24 }).map((_, i) => (
            <circle key={`s-${i}`} cx={100 + 95 * Math.cos((i * 15 * Math.PI) / 180)} cy={100 + 95 * Math.sin((i * 15 * Math.PI) / 180)} r="5" stroke="currentColor" strokeWidth="0.3" fill="none" />
          ))}
          <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="0.5" fill="none" />
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse key={`po-${i}`} cx="100" cy="18" rx="6" ry="18" fill="none" stroke="currentColor" strokeWidth="0.4" transform={`rotate(${i * 22.5} 100 100)`} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse key={`pm-${i}`} cx="100" cy="38" rx="7" ry="16" fill="none" stroke="currentColor" strokeWidth="0.35" transform={`rotate(${i * 30} 100 100)`} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={`pi-${i}`} cx="100" cy="55" rx="5" ry="12" fill="none" stroke="currentColor" strokeWidth="0.3" transform={`rotate(${i * 45} 100 100)`} />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse key={`cf-${i}`} cx="100" cy="85" rx="5" ry="13" fill="currentColor" opacity="0.25" transform={`rotate(${i * 60} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.15" />
          <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.25" />
        </svg>
      </div>

      {/* Floating decorative elements with parallax */}
      {/* Marigold top-left */}
      <motion.div className="absolute top-8 left-6 sm:top-10 sm:left-10 opacity-20 select-none" style={{ y: starY1 }}>
        <svg width="48" height="48" viewBox="0 0 40 40" className="animate-float">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={i} cx="20" cy="6" rx="4" ry="8" fill="#D4A017" transform={`rotate(${i * 45} 20 20)`} />
          ))}
          <circle cx="20" cy="20" r="5" fill="#B8860B" />
        </svg>
      </motion.div>
      {/* Paisley top-right */}
      <motion.div className="absolute top-16 right-8 sm:top-20 sm:right-16 opacity-15 select-none" style={{ y: starY2 }}>
        <svg width="44" height="44" viewBox="0 0 40 40" className="animate-float" style={{ animationDelay: "1s" }}>
          <path d="M20 5 Q35 10 30 25 Q25 35 15 30 Q5 25 10 15 Q15 5 20 5Z" fill="none" stroke="#D4A017" strokeWidth="1.5" />
          <path d="M20 12 Q28 15 25 23 Q22 28 17 25 Q12 22 15 17 Q18 12 20 12Z" fill="#D4A017" opacity="0.3" />
          <circle cx="20" cy="19" r="2" fill="#D4A017" opacity="0.5" />
        </svg>
      </motion.div>
      {/* Gold star bottom-left */}
      <motion.div className="absolute bottom-20 left-12 sm:bottom-20 sm:left-20 opacity-25 select-none" style={{ y: starY3 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" className="animate-float" style={{ animationDelay: "2s" }}>
          <path d="M12 0L14 9L24 12L14 14L12 24L10 14L0 12L10 9Z" fill="#D4A017" />
        </svg>
      </motion.div>
      {/* Marigold bottom-right */}
      <motion.div className="absolute bottom-28 right-6 sm:bottom-32 sm:right-10 opacity-20 select-none" style={{ y: starY4 }}>
        <svg width="40" height="40" viewBox="0 0 40 40" className="animate-float" style={{ animationDelay: "0.5s" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={i} cx="20" cy="6" rx="4" ry="8" fill="#B8860B" transform={`rotate(${i * 45} 20 20)`} />
          ))}
          <circle cx="20" cy="20" r="5" fill="#D4A017" />
        </svg>
      </motion.div>
      {/* Small sparkle stars */}
      <motion.div className="absolute top-1/4 left-[5%] text-[#D4A017] opacity-20 select-none hidden sm:block" style={{ y: starY1 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" className="animate-pulse"><path d="M12 0L14 9L24 12L14 14L12 24L10 14L0 12L10 9Z" fill="currentColor" /></svg>
      </motion.div>
      <motion.div className="absolute top-[35%] right-[6%] text-[#D4A017] opacity-15 select-none hidden sm:block" style={{ y: starY2 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" className="animate-pulse" style={{ animationDelay: "1.5s" }}><path d="M12 0L14 9L24 12L14 14L12 24L10 14L0 12L10 9Z" fill="currentColor" /></svg>
      </motion.div>
      <motion.div className="absolute bottom-[40%] left-[8%] text-[#D4A017] opacity-15 select-none hidden sm:block" style={{ y: starY3 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" className="animate-pulse" style={{ animationDelay: "0.8s" }}><path d="M12 0L14 9L24 12L14 14L12 24L10 14L0 12L10 9Z" fill="currentColor" /></svg>
      </motion.div>

      <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative z-10">
        {/* Logo */}
        <motion.div
          className="mx-auto mb-6 relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full overflow-hidden shadow-lg bg-white border-2 border-[#D4A017]/30"
          initial={mounted ? { opacity: 0, scale: 0.8 } : false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image src="/assets/images/pelli/logo.jpeg" alt="N & A" fill className="object-cover" />
        </motion.div>

        {/* Ornamental top line */}
        <motion.div
          className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent mb-4 mx-auto"
          initial={initialScale}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Telugu blessing */}
        <motion.p
          className="text-center text-[#B8860B]/60 text-sm sm:text-base font-body tracking-[0.2em] mb-4"
          initial={initialFade}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          శ్రీ గణేశాయ నమః
        </motion.p>

        {/* Names */}
        <motion.h1
          className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#B8860B] text-center"
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Neelu &amp; Aditya
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="font-heading text-xl sm:text-2xl md:text-3xl text-[#3D2B1F] mt-4 tracking-[0.2em] uppercase text-center"
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Wedding Celebrations
        </motion.h2>

        {/* Decorative divider with ornament */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-6"
          initial={initialFade}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[#D4A017]"
            initial={mounted ? { scaleX: 0 } : false}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ originX: 1 }}
          />
          <span className="text-[#D4A017] text-lg">&#x2767;</span>
          <motion.div
            className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[#D4A017]"
            initial={mounted ? { scaleX: 0 } : false}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Date & Location pill */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-5"
          initial={initialFade}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <span className="text-sm sm:text-base text-[#D4A017] tracking-[0.3em] uppercase font-body">
            April 2026
          </span>
          <span className="text-[#D4A017]/40">·</span>
          <span className="text-sm sm:text-base text-[#D4A017] tracking-[0.3em] uppercase font-body">
            Atlanta
          </span>
        </motion.div>

        {/* Welcome message */}
        <motion.p
          className="max-w-xl text-center text-[#3D2B1F]/70 mt-8 text-base sm:text-lg leading-relaxed font-body mx-auto"
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          With joyful hearts, we invite you to celebrate the union of our
          families. Join us for a week of love, laughter, and cherished
          traditions as we begin this beautiful journey together.
        </motion.p>

        {/* Ornamental bottom line */}
        <motion.div
          className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent mt-8 mx-auto"
          initial={initialScale}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        />
      </motion.div>

      {/* Scroll indicator - fades out on scroll */}
      <motion.div className="mt-12" style={{ opacity: scrollIndicatorOpacity }}>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg
            className="w-6 h-6 text-[#D4A017]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
