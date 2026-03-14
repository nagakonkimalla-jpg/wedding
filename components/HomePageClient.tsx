"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "./SplashScreen";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

const SESSION_KEY = "wedding-splash-seen";

export default function HomePageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(false);
  const [contentHidden, setContentHidden] = useState(false);
  const [revealContent, setRevealContent] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMutedRef = useRef(false);

  // Initialize audio once — persists across splash and homepage
  useEffect(() => {
    const audio = new Audio("/audio/traditional.mp3");
    audio.volume = 0.25;
    audio.loop = true;
    audioRef.current = audio;

    audio.play().catch(() => {
      const playOnClick = (e: Event) => {
        // Don't auto-play if user has muted
        if (isMutedRef.current) return;
        // Don't interfere with mute button clicks
        const target = e.target as HTMLElement;
        if (target.closest('[data-mute-btn]')) return;
        if (audioRef.current) {
          audioRef.current.play().catch(() => {});
        }
        document.removeEventListener("click", playOnClick);
        document.removeEventListener("touchstart", playOnClick);
      };
      document.addEventListener("click", playOnClick);
      document.addEventListener("touchstart", playOnClick);
    });

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const newMuted = !isMutedRef.current;
    isMutedRef.current = newMuted;
    if (newMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.25;
      audioRef.current.play().catch(() => {});
    }
    setIsMuted(newMuted);
  }, []);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (!seen) {
      setShowSplash(true);
      setContentHidden(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleSplashEnter = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShowSplash(false);
    document.body.style.overflow = "";
    setTimeout(() => {
      setContentHidden(false);
      setRevealContent(true);
    }, 100);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            onEnter={handleSplashEnter}
            isMuted={isMuted}
            onToggleMute={toggleMute}
          />
        )}
      </AnimatePresence>

      {/* Music toggle on homepage (shown after splash) */}
      {!showSplash && (
        <button
          data-mute-btn
          onClick={toggleMute}
          className="fixed bottom-6 left-6 z-50 p-4 bg-white/10 backdrop-blur-md rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/20 transition-all duration-300 hover:scale-110"
          aria-label={isMuted ? "Play music" : "Mute music"}
        >
          {isMuted ? (
            <HiVolumeOff size={24} color="#B8860B" />
          ) : (
            <HiVolumeUp size={24} color="#B8860B" />
          )}
        </button>
      )}

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
