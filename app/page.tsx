import Link from "next/link";
import { events, eventOrder } from "@/config/events";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const gradientMap: Record<string, string> = {
  haldi: "from-yellow-300 via-amber-400 to-yellow-500",
  "karthik-upanayanam": "from-amber-200 via-orange-300 to-amber-400",
  mehendi: "from-emerald-300 via-green-400 to-emerald-500",
  sangeeth: "from-purple-600 via-violet-700 to-indigo-800",
  pellikuthuru: "from-red-500 via-rose-600 to-red-700",
  pellikoduku: "from-amber-300 via-yellow-200 to-amber-400",
  "aditya-upanayanam": "from-orange-200 via-amber-300 to-orange-400",
  pelli: "from-yellow-100 via-amber-200 to-yellow-300",
  "satyanarayana-swami-vratam-aditya": "from-orange-300 via-amber-400 to-orange-500",
  "satyanarayana-swami-vratam-neelu": "from-orange-200 via-amber-300 to-orange-400",
};

const textColorMap: Record<string, string> = {
  sangeeth: "text-white",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFFFF0]">
      {/* Decorative pattern overlay */}
      <div className="fixed inset-0 pattern-overlay pointer-events-none opacity-50" />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 py-20">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 text-4xl animate-float opacity-30 select-none">
          &#x2726;
        </div>
        <div
          className="absolute top-20 right-16 text-3xl animate-float opacity-20 select-none"
          style={{ animationDelay: "1s" }}
        >
          &#x2726;
        </div>
        <div
          className="absolute bottom-20 left-20 text-2xl animate-float opacity-25 select-none"
          style={{ animationDelay: "2s" }}
        >
          &#x2726;
        </div>
        <div
          className="absolute bottom-32 right-10 text-4xl animate-float opacity-20 select-none"
          style={{ animationDelay: "0.5s" }}
        >
          &#x2726;
        </div>

        {/* Gold decorative line */}
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent mb-8 animate-fade-in" />

        {/* Names in script font */}
        <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#B8860B] animate-fade-in">
          Neelu &amp; Aditya
        </h1>

        {/* Subtitle */}
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-[#3D2B1F] mt-4 tracking-[0.2em] uppercase animate-slide-up">
          Wedding Celebrations
        </h2>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 mt-6 animate-slide-up">
          <div className="w-16 h-[1px] bg-[#D4A017]" />
          <span className="text-[#D4A017] text-lg">&#x2767;</span>
          <div className="w-16 h-[1px] bg-[#D4A017]" />
        </div>

        {/* Welcome message */}
        <p className="max-w-2xl text-center text-[#3D2B1F]/80 mt-8 text-lg sm:text-xl leading-relaxed font-body animate-slide-up">
          With joyful hearts, we invite you to celebrate the union of our
          families. Join us for a week of love, laughter, and cherished
          traditions as we begin this beautiful journey together.
        </p>

        {/* Scroll indicator */}
        <div className="mt-12 animate-bounce">
          <svg
            className="w-6 h-6 text-[#D4A017]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Events Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-16">
            <h3 className="font-heading text-3xl sm:text-4xl text-[#3D2B1F] mb-2">
              Our Celebrations
            </h3>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="w-12 h-[1px] bg-[#D4A017]" />
              <span className="text-sm text-[#D4A017] tracking-[0.3em] uppercase font-body">
                April 2026
              </span>
              <div className="w-12 h-[1px] bg-[#D4A017]" />
            </div>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventOrder.map((slug, index) => {
              const event = events[slug];
              if (!event) return null;

              const gradient = gradientMap[slug] || event.theme.gradient;
              const isLight = slug !== "sangeeth";
              const textClass = textColorMap[slug] || "text-[#3D2B1F]";

              return (
                <Link
                  key={slug}
                  href={`/events/${slug}`}
                  className="group block"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`
                      relative overflow-hidden rounded-2xl shadow-lg
                      transition-all duration-500 ease-out
                      group-hover:shadow-2xl group-hover:-translate-y-2
                      bg-gradient-to-br ${gradient}
                      min-h-[280px] flex flex-col justify-between p-8
                    `}
                  >
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 rangoli-pattern opacity-30" />

                    {/* Gold shimmer on hover */}
                    <div className="absolute inset-0 gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Emoji */}
                      <span className="text-4xl mb-4 block">
                        {event.decorativeEmoji}
                      </span>

                      {/* Title */}
                      <h4
                        className={`font-heading text-2xl font-bold mb-1 ${textClass}`}
                      >
                        {event.title}
                      </h4>

                      {/* Subtitle in native script */}
                      <p
                        className={`text-lg mb-3 ${isLight ? "text-[#3D2B1F]/60" : "text-white/70"}`}
                      >
                        {event.subtitle}
                      </p>

                      {/* Tagline */}
                      <p
                        className={`text-sm italic ${isLight ? "text-[#3D2B1F]/70" : "text-white/80"}`}
                      >
                        {event.tagline}
                      </p>
                    </div>

                    {/* Date and Time */}
                    <div className="relative z-10 mt-6">
                      <div
                        className={`flex items-center gap-2 text-sm ${isLight ? "text-[#3D2B1F]/80" : "text-white/90"}`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="font-body">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-2 text-sm mt-1 ${isLight ? "text-[#3D2B1F]/80" : "text-white/90"}`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-body">{event.time}</span>
                      </div>

                      {/* View details arrow */}
                      <div
                        className={`flex items-center gap-1 mt-4 text-sm font-semibold transition-all duration-300 group-hover:gap-3 ${isLight ? "text-[#B8860B]" : "text-[#FCD34D]"}`}
                      >
                        <span>View Details &amp; RSVP</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 text-center bg-gradient-to-t from-[#F5E6CC]/30 to-transparent">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-[1px] bg-[#D4A017]" />
          <span className="text-[#D4A017] text-xl">&#x2665;</span>
          <div className="w-12 h-[1px] bg-[#D4A017]" />
        </div>
        <p className="font-script text-3xl text-[#B8860B]">
          Neelu &amp; Aditya
        </p>
        <p className="font-body text-sm text-[#3D2B1F]/50 mt-2">
          April 2026 &middot; Atlanta, Georgia
        </p>
        <p className="font-body text-xs text-[#3D2B1F]/30 mt-6">
          Made with love
        </p>
      </footer>
    </main>
  );
}
