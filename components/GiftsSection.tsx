import { giftsConfig } from "@/config/gifts";
import { EventTheme } from "@/types";

interface GiftsSectionProps {
  theme: EventTheme;
}

export default function GiftsSection({ theme }: GiftsSectionProps) {
  if (!giftsConfig.enabled) return null;

  const hasRegistry = !!giftsConfig.registryUrl;
  const hasHoneymoon = !!giftsConfig.honeymoonFundUrl;

  if (!hasRegistry && !hasHoneymoon) return null;

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <div
          className="relative rounded-2xl p-6 sm:p-8 text-center transition-all duration-300"
          style={{
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.primary}20`,
            boxShadow: `0 2px 12px ${theme.primary}08`,
          }}
        >
          {/* Decorative top accent */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full"
            style={{ backgroundColor: `${theme.primary}40` }}
          />

          {/* Icon */}
          <div className="flex justify-center mb-3">
            <svg
              className="w-6 h-6"
              style={{ color: `${theme.primary}80` }}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3
            className="font-heading text-lg sm:text-xl mb-2"
            style={{ color: theme.text }}
          >
            {giftsConfig.variant === "teluguMix"
              ? "Ashirvadalu (Optional)"
              : "Blessings (Optional)"}
          </h3>

          {/* Body */}
          <p
            className="font-body text-sm leading-relaxed mb-5"
            style={{ color: `${theme.text}90` }}
          >
            Your presence is our present. If you wish to bless us with a gift,
            we&apos;ve created a small registry for your convenience.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {hasRegistry && (
              <a
                href={giftsConfig.registryUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View wedding registry on MyRegistry (opens in new tab)"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: `${theme.primary}12`,
                  color: theme.primary,
                  border: `1px solid ${theme.primary}30`,
                }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${theme.primary}40`)}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
                View Registry
                <svg
                  className="w-3 h-3 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            )}

            {hasHoneymoon && (
              <a
                href={giftsConfig.honeymoonFundUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contribute to honeymoon fund (opens in new tab)"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  color: `${theme.text}80`,
                  border: `1px solid ${theme.text}20`,
                }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${theme.primary}40`)}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
                Honeymoon Fund
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
