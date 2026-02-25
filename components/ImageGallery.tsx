"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { EventTheme } from "@/types";

interface ImageGalleryProps {
  images: string[];
  theme: EventTheme;
  eventSlug: string;
}

function LightboxModal({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onPrev();
      else onNext();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light z-50 w-12 h-12 flex items-center justify-center"
      >
        &times;
      </button>

      {/* Prev arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white text-4xl transition-colors"
        >
          &#8249;
        </button>
      )}

      {/* Next arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white text-4xl transition-colors"
        >
          &#8250;
        </button>
      )}

      <div
        className="relative max-w-5xl max-h-[85vh] w-full h-full mx-12"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`Gallery photo ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </div>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-body">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

export default function ImageGallery({ images, theme, eventSlug }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const realImages = images.filter((src) => src && !src.includes("placeholder"));

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + realImages.length) % realImages.length));
  }, [realImages.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % realImages.length));
  }, [realImages.length]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px" style={{ backgroundColor: `${theme.primary}40` }} />
              <div className="w-2 h-2 rotate-45" style={{ backgroundColor: theme.primary, opacity: 0.4 }} />
              <div className="w-12 h-px" style={{ backgroundColor: `${theme.primary}40` }} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold" style={{ color: theme.text }}>
              Moments
            </h2>
            <p className="font-body text-sm mt-2 tracking-[0.2em] uppercase opacity-60" style={{ color: theme.text }}>
              A glimpse of our journey
            </p>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {images.map((src, index) => {
              const isPlaceholder = !src || src.includes("placeholder");
              // Make first image span 2 cols on desktop for variety
              const isFeature = index === 0 && images.length > 2;

              if (isPlaceholder) {
                return (
                  <div
                    key={`${eventSlug}-gallery-${index}`}
                    className={`relative rounded-2xl overflow-hidden shadow-md flex items-center justify-center ${
                      isFeature ? "md:col-span-2 aspect-[2/1]" : "aspect-[4/3]"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}30)`,
                    }}
                  >
                    <div className="text-center p-4">
                      <div className="text-4xl mb-3 opacity-60">{"\u{1F4F8}"}</div>
                      <p className="font-body text-sm opacity-50" style={{ color: theme.text }}>
                        Photo coming soon
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={`${eventSlug}-gallery-${index}`}
                  className={`relative rounded-2xl overflow-hidden shadow-md group cursor-pointer ${
                    isFeature ? "md:col-span-2 aspect-[2/1]" : "aspect-[4/3]"
                  }`}
                  onClick={() => setLightboxIndex(realImages.indexOf(src))}
                >
                  <Image
                    src={src}
                    alt={`Gallery photo ${index + 1}`}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes={isFeature ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 640px) 50vw, 33vw"}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-2xl">
                      &#x2922;
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <LightboxModal
          images={realImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}
