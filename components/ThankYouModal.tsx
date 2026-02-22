"use client";

import { useEffect, useCallback } from "react";
import { EventTheme } from "@/types";
import Confetti from "./Confetti";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  willAttend: boolean;
  theme: EventTheme;
}

export default function ThankYouModal({
  isOpen,
  onClose,
  message,
  willAttend,
  theme,
}: ThankYouModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <>
      <Confetti isActive={isOpen && willAttend} />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal card */}
      <div
        className="relative bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl animate-fade-in text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl"
          style={{
            background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary}, ${theme.accent})`,
          }}
        />

        {/* Icon */}
        <div className="text-5xl mb-4">
          {willAttend ? "💕" : "🙏"}
        </div>

        {/* Heading */}
        <h3
          className="text-3xl font-heading font-bold mb-3"
          style={{ color: theme.primary }}
        >
          Thank You!
        </h3>

        {/* Message */}
        <p className="text-gray-600 font-body leading-relaxed mb-6">
          {message}
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-12" style={{ backgroundColor: theme.primary }} />
          <span style={{ color: theme.primary }}>✦</span>
          <div className="h-px w-12" style={{ backgroundColor: theme.primary }} />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="px-8 py-3 rounded-full font-body font-semibold text-white transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: theme.primary }}
        >
          Close
        </button>
      </div>
    </div>
    </>
  );
}
