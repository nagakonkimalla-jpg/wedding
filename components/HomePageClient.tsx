"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "./SplashScreen";

const SESSION_KEY = "wedding-splash-seen";

export default function HomePageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(false);
  const [contentHidden, setContentHidden] = useState(false);
  const [revealContent, setRevealContent] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (!seen) {
      setShowSplash(true);
      setContentHidden(true);
      document.body.style.overflow = "hidden";
    }
    // If already seen, content stays visible (default state)
  }, []);

  const handleSplashEnter = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShowSplash(false);
    document.body.style.overflow = "";
    // Slight delay so curtain clears before content reveals
    setTimeout(() => {
      setContentHidden(false);
      setRevealContent(true);
    }, 100);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onEnter={handleSplashEnter} />}
      </AnimatePresence>

      {contentHidden ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={
            revealContent
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.97 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
