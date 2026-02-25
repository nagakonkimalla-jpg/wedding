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
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-12 h-[1px] bg-[#D4A017]" />
        <span className="text-[#D4A017] text-xl">&#x2665;</span>
        <div className="w-12 h-[1px] bg-[#D4A017]" />
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
