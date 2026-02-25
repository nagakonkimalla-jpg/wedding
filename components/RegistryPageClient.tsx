"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { giftsConfig } from "@/config/gifts";

// Tiny QR code generator — no dependencies
// Encodes URL into a simple QR matrix using a minimal encoder
function QRCode({ url, size = 160 }: { url: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use the browser's built-in QR rendering via a Google Charts API image
    // This is a static image fetch — no JS library needed
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&margin=1&format=svg`;
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);
    };
  }, [url, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="rounded-lg"
      aria-label={`QR code linking to ${url}`}
      role="img"
    />
  );
}

export default function RegistryPageClient() {
  const hasRegistry = !!giftsConfig.registryUrl;

  return (
    <main className="min-h-screen bg-[#FFFFF0]">
      {/* Pattern overlay */}
      <div className="fixed inset-0 pattern-overlay pointer-events-none opacity-50" />

      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16">
        {/* Back link */}
        <Link
          href="/"
          className="absolute top-6 left-6 font-body text-sm text-[#B8860B] hover:underline"
        >
          &larr; Back to Home
        </Link>

        <div className="max-w-md w-full text-center">
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#D4A017]" />
            <span className="text-[#D4A017] text-lg">&#x2767;</span>
            <div className="w-12 h-[1px] bg-[#D4A017]" />
          </div>

          {/* Heart icon */}
          <div className="flex justify-center mb-4">
            <svg
              className="w-8 h-8 text-[#D4A017]/60"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl text-[#3D2B1F] mb-3">
            Gift Registry
          </h1>

          <p className="font-body text-base text-[#3D2B1F]/70 leading-relaxed mb-8">
            Your presence is our present and the greatest blessing we could ask
            for. If you wish to honor us with a gift, we&apos;ve put together a
            small registry for your convenience.
          </p>

          {/* QR Code */}
          {hasRegistry && (
            <div className="flex justify-center mb-6">
              <div
                className="p-4 rounded-xl bg-white shadow-sm"
                style={{ border: "1px solid #D4A01720" }}
              >
                <QRCode url={giftsConfig.registryUrl} size={180} />
              </div>
            </div>
          )}

          <p className="font-body text-xs text-[#3D2B1F]/40 mb-6">
            Scan the QR code or tap the button below
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col items-center gap-3">
            {hasRegistry && (
              <a
                href={giftsConfig.registryUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View wedding registry on MyRegistry (opens in new tab)"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-medium transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4A017]/40 focus:ring-offset-2 bg-[#D4A017]/10 text-[#B8860B] border border-[#D4A017]/30"
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

            {!!giftsConfig.honeymoonFundUrl && (
              <a
                href={giftsConfig.honeymoonFundUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contribute to honeymoon fund (opens in new tab)"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-medium transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4A017]/40 focus:ring-offset-2 text-[#3D2B1F]/60 border border-[#3D2B1F]/15"
              >
                Honeymoon Fund
              </a>
            )}
          </div>

          {/* Footer note */}
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-[#D4A017]/30" />
            <p className="font-script text-xl text-[#B8860B]">
              Neelu &amp; Aditya
            </p>
            <div className="w-8 h-[1px] bg-[#D4A017]/30" />
          </div>
        </div>
      </div>
    </main>
  );
}
