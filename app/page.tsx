import { events, eventOrder } from "@/config/events";
import HomePageClient from "@/components/HomePageClient";
import AnimatedHero from "@/components/AnimatedHero";
import AnimatedEventCard from "@/components/AnimatedEventCard";
import AnimatedSections from "@/components/AnimatedSections";
import AnimatedFooterClient from "@/components/AnimatedFooterClient";

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
    <HomePageClient>
      <main className="min-h-screen bg-[#FFFFF0]">
        {/* Decorative pattern overlay */}
        <div className="fixed inset-0 pattern-overlay pointer-events-none opacity-50" />

        {/* Hero Section */}
        <AnimatedHero />

        {/* Events Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Section heading */}
            <AnimatedSections />

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventOrder.map((slug, index) => {
                const event = events[slug];
                if (!event) return null;

                const gradient = gradientMap[slug] || event.theme.gradient;
                const isLight = slug !== "sangeeth";
                const textClass = textColorMap[slug] || "text-[#3D2B1F]";

                return (
                  <AnimatedEventCard
                    key={slug}
                    slug={slug}
                    index={index}
                    gradient={gradient}
                    isLight={isLight}
                    textClass={textClass}
                    event={event}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <AnimatedFooterClient />
      </main>
    </HomePageClient>
  );
}
