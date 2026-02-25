"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedSections() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const duration = prefersReducedMotion ? 0.2 : 0.6;

  useEffect(() => {
    setMounted(true);
  }, []);

  const initial = mounted ? { opacity: 0, y: prefersReducedMotion ? 0 : 30 } : false;

  return (
    <div className="text-center mb-16">
      <motion.h3
        className="font-heading text-3xl sm:text-4xl text-[#3D2B1F] mb-2"
        initial={initial}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration, delay: 0 }}
      >
        Our Celebrations
      </motion.h3>
      <motion.div
        className="flex items-center justify-center gap-3 mt-3"
        initial={mounted ? { opacity: 0 } : false}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration, delay: 0.15 }}
      >
        <motion.div
          className="w-12 h-[1px] bg-[#D4A017]"
          initial={mounted ? { scaleX: 0 } : false}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{ originX: 1 }}
        />
        <span className="text-sm text-[#D4A017] tracking-[0.3em] uppercase font-body">
          April 2026
        </span>
        <motion.div
          className="w-12 h-[1px] bg-[#D4A017]"
          initial={mounted ? { scaleX: 0 } : false}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </div>
  );
}
