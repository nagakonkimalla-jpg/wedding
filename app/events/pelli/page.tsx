import { Metadata } from "next";
import { events } from "@/config/events";
import PelliEventPage from "@/components/PelliEventPage";

const event = events.pelli;

export const metadata: Metadata = {
  title: `${event.title} | Neelu & Aditya's Wedding`,
  description: event.description,
  openGraph: {
    title: event.title,
    description: event.tagline,
    images: [event.heroImage],
  },
};

import AmbientAudio from "@/components/AmbientAudio";

export default function PelliPage() {
  return (
    <main data-theme="pelli" className="min-h-screen bg-(--bg-primary) text-(--text-primary)">
      <AmbientAudio audioPath="/audio/seetha_kalyanam.mp3" startTime={40} />
      <PelliEventPage event={event} />
    </main>
  );
}
