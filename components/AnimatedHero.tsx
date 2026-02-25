"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

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
    <section ref={sectionRef} className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 py-20">
      {/* Floating decorative elements with parallax */}
      <motion.div className="absolute top-10 left-10 text-4xl animate-float opacity-30 select-none" style={{ y: starY1 }}>
        &#x2726;
      </motion.div>
      <motion.div className="absolute top-20 right-16 text-3xl animate-float opacity-20 select-none" style={{ y: starY2 }}>
        &#x2726;
      </motion.div>
      <motion.div className="absolute bottom-20 left-20 text-2xl animate-float opacity-25 select-none" style={{ y: starY3 }}>
        &#x2726;
      </motion.div>
      <motion.div className="absolute bottom-32 right-10 text-4xl animate-float opacity-20 select-none" style={{ y: starY4 }}>
        &#x2726;
      </motion.div>

      <motion.div style={{ y: titleY, opacity: titleOpacity }}>
        {/* Gold decorative line */}
        <motion.div
          className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent mb-8 mx-auto"
          initial={initialScale}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

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

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-6"
          initial={initialFade}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className="w-16 h-[1px] bg-[#D4A017]"
            initial={mounted ? { scaleX: 0 } : false}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ originX: 1 }}
          />
          <span className="text-[#D4A017] text-lg">&#x2767;</span>
          <motion.div
            className="w-16 h-[1px] bg-[#D4A017]"
            initial={mounted ? { scaleX: 0 } : false}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Welcome message */}
        <motion.p
          className="max-w-2xl text-center text-[#3D2B1F]/80 mt-8 text-lg sm:text-xl leading-relaxed font-body mx-auto"
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          With joyful hearts, we invite you to celebrate the union of our
          families. Join us for a week of love, laughter, and cherished
          traditions as we begin this beautiful journey together.
        </motion.p>
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
