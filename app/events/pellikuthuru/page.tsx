import { Metadata } from "next";
import { events } from "@/config/events";
import EventPage from "@/components/EventPage";
import YouTubeAudio from "@/components/YouTubeAudio";

const event = events.pellikuthuru;

export const metadata: Metadata = {
  title: `${event.title} | Neelu & Aditya's Wedding`,
  description: event.description,
  openGraph: {
    title: event.title,
    description: event.tagline,
    images: [event.heroImage],
  },
};

export default function PellikuthuruPage() {
  return (
    <>
      <YouTubeAudio videoId="bYxeWHCAePU" />
      <EventPage event={event} />
    </>
  );
}
