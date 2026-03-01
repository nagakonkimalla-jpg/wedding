import { EventTheme } from "@/types";
import Image from "next/image";

interface DressCodeProps {
  dressCode: string;
  theme: EventTheme;
}

function getAttireEmoji(dressCode: string) {
  const lower = dressCode.toLowerCase();

  if (lower.includes("yellow") && lower.includes("kurta") && lower.includes("saree")) {
    return (
      <div className="flex items-center justify-center gap-6 mb-6 mt-2">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md">
          <Image
            src="/images/shared/kurta_icon.png"
            alt="Kurta"
            fill
            className="object-contain"
          />
        </div>
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md">
          <Image
            src="/images/shared/saree_icon.png"
            alt="Saree"
            fill
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  if (lower.includes("saree") && lower.includes("lehenga") && (lower.includes("kurta") || lower.includes("sherwani") || lower.includes("suit"))) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 mb-6 mt-2">
        {/* Women's Options */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md">
            <Image
              src="/images/shared/wedding_lehenga_icon.png"
              alt="Lehenga"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm font-medium text-[#8B1A1A]/60 italic">OR</span>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md">
            <Image
              src="/images/shared/wedding_saree_icon.png"
              alt="Wedding Saree"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="text-xs uppercase tracking-widest text-[#8B1A1A]/70 font-semibold my-2">
          &mdash; AND &mdash;
        </div>

        {/* Men's Options */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md">
            <Image
              src="/images/shared/kurta_icon.png"
              alt="Kurta"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm font-medium text-[#8B1A1A]/60 italic">OR</span>
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md">
            <Image
              src="/images/shared/wedding_suit_icon.png"
              alt="Suit"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    );
  }

  let emoji = "🥻";
  if (lower.includes("glamorous") || lower.includes("indo-western")) emoji = "✨";
  if (lower.includes("formal") || lower.includes("western")) emoji = "👔";

  return <div className="text-5xl mb-4">{emoji}</div>;
}

export default function DressCode({ dressCode, theme }: DressCodeProps) {
  return (
    <section className="py-12 sm:py-16 px-5 sm:px-6">
      <div className="max-w-lg mx-auto text-center">
        <div
          className="relative rounded-3xl p-10 transition-shadow duration-300 hover:shadow-lg"
          style={{
            backgroundColor: theme.cardBg,
            border: `2px solid ${theme.primary}30`,
            boxShadow: `0 2px 16px ${theme.primary}12`,
          }}
        >
          {/* Decorative corner ornaments */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t border-l rounded-tl-lg" style={{ borderColor: `${theme.primary}25` }} />
          <div className="absolute top-3 right-3 w-6 h-6 border-t border-r rounded-tr-lg" style={{ borderColor: `${theme.primary}25` }} />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l rounded-bl-lg" style={{ borderColor: `${theme.primary}25` }} />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r rounded-br-lg" style={{ borderColor: `${theme.primary}25` }} />

          {getAttireEmoji(dressCode)}
          <p
            className="text-xs uppercase tracking-[0.25em] font-body mb-3"
            style={{ color: theme.primary }}
          >
            Suggested Attire
          </p>
          <p className="text-xl sm:text-2xl font-heading font-bold leading-relaxed" style={{ color: theme.text }}>
            {dressCode}
          </p>
        </div>
      </div>
    </section>
  );
}
