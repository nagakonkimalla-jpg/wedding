import { EventTheme } from "@/types";

interface DressCodeProps {
  dressCode: string;
  theme: EventTheme;
}

function getAttireEmoji(dressCode: string): string {
  const lower = dressCode.toLowerCase();
  if (lower.includes("glamorous") || lower.includes("indo-western")) return "✨";
  if (lower.includes("formal") || lower.includes("western")) return "👔";
  return "🥻";
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

          <div className="text-4xl mb-4">{getAttireEmoji(dressCode)}</div>
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
