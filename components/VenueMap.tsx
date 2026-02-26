import Image from "next/image";
import { EventTheme } from "@/types";

interface VenueMapProps {
  venue: string;
  address: string;
  googleMapsUrl: string;
  theme: EventTheme;
  venueImage?: string;
}

export default function VenueMap({ venue, address, googleMapsUrl, theme, venueImage }: VenueMapProps) {
  return (
    <section className="px-5 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Ornamental heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold" style={{ color: theme.text }}>
            Venue
          </h2>
        </div>

        {/* Venue card with decorative border */}
        <div
          className="relative rounded-3xl overflow-hidden transition-shadow duration-300 hover:shadow-xl"
          style={{
            backgroundColor: theme.cardBg,
            border: `2px solid ${theme.primary}30`,
            boxShadow: `0 2px 16px ${theme.primary}12`,
          }}
        >
          {/* Venue image */}
          {venueImage && (
            <div className="relative w-full h-[200px] sm:h-[260px]">
              <Image
                src={venueImage}
                alt={venue}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 672px"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 50%, ${theme.cardBg} 100%)`,
                }}
              />
            </div>
          )}

          <div className="relative p-10 sm:p-12 text-center">
            {/* Decorative corner ornaments */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t border-l rounded-tl-lg" style={{ borderColor: `${theme.primary}25` }} />
            <div className="absolute top-3 right-3 w-8 h-8 border-t border-r rounded-tr-lg" style={{ borderColor: `${theme.primary}25` }} />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l rounded-bl-lg" style={{ borderColor: `${theme.primary}25` }} />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r rounded-br-lg" style={{ borderColor: `${theme.primary}25` }} />

            {!venueImage && <div className="text-5xl mb-5">📍</div>}

            <h3
              className="text-2xl sm:text-3xl font-heading font-bold mb-2"
              style={{ color: theme.text }}
            >
              {venue}
            </h3>

            <p className="font-body text-base opacity-60 mb-8 leading-relaxed" style={{ color: theme.text }}>
              {address}
            </p>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-body font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 4px 15px ${theme.primary}30`,
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
