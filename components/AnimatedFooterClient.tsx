"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedFooterClient() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.footer
      className="relative py-16 text-center bg-gradient-to-t from-[#F5E6CC]/30 to-transparent"
      initial={mounted ? { opacity: 0, y: prefersReducedMotion ? 0 : 30 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
    >
      {/* Decorative diya */}
      <div className="flex justify-center mb-6">
        <svg width="48" height="48" viewBox="0 0 40 40" className="opacity-30">
          <ellipse cx="20" cy="32" rx="10" ry="4" fill="#D4A017" opacity="0.4" />
          <path d="M12 30 Q10 32 12 34 L28 34 Q30 32 28 30Z" fill="#D4A017" opacity="0.3" />
          <path d="M20 10 Q24 18 22 24 Q20 28 18 24 Q16 18 20 10Z" fill="#D4A017" opacity="0.5" />
          <path d="M20 14 Q22 19 21 23 Q20 25 19 23 Q18 19 20 14Z" fill="#B8860B" opacity="0.6" />
        </svg>
      </div>
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4A017]" />
        <span className="text-[#D4A017] text-xl">&#x2665;</span>
        <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4A017]" />
      </div>
      <p className="font-script text-3xl text-[#B8860B]">
        Neelu &amp; Aditya
      </p>
      <p className="font-body text-sm text-[#3D2B1F]/50 mt-2">
        April 2026 &middot; Atlanta, Georgia
      </p>
      <p className="font-body text-xs text-[#3D2B1F]/30 mt-6 flex items-center justify-center gap-1">
        Made with{" "}
        <motion.span
          className="inline-block text-red-400"
          animate={
            prefersReducedMotion
              ? {}
              : { scale: [1, 1.2, 1] }
          }
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg
            className="w-3.5 h-3.5 inline"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.span>
      </p>
    </motion.footer>
  );
}
