import { Metadata } from "next";
import { events } from "@/config/events";
import EventPage from "@/components/EventPage";
import YouTubeAudio from "@/components/YouTubeAudio";

const event = events.pellikoduku;

export const metadata: Metadata = {
  title: `${event.title} | Neelu & Aditya's Wedding`,
  description: event.description,
  openGraph: {
    title: event.title,
    description: event.tagline,
    images: [event.heroImage],
  },
};

export default function PellikodukuPage() {
  return (
    <>
      <YouTubeAudio videoId="EO3JWdSL1mk" />
      <EventPage event={event} />
    </>
  );
}
