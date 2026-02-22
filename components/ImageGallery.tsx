"use client";

import { useState } from "react";
import Image from "next/image";
import { EventTheme } from "@/types";

interface ImageGalleryProps {
  images: string[];
  theme: EventTheme;
  eventSlug: string;
}

function LightboxModal({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light z-50 w-12 h-12 flex items-center justify-center"
      >
        &times;
      </button>
      <div className="relative max-w-5xl max-h-[85vh] w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </div>
    </div>
  );
}

export default function ImageGallery({ images, theme, eventSlug }: ImageGalleryProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <section className="py-12 sm:py-20 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-12">
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
                  onClick={() => setLightboxImage(src)}
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
      {lightboxImage && (
        <LightboxModal
          src={lightboxImage}
          alt="Gallery photo"
          onClose={() => setLightboxImage(null)}
        />
      )}
    </>
  );
}
