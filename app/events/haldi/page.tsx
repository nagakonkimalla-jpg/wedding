import { Metadata } from "next";
import { events } from "@/config/events";
import EventPage from "@/components/EventPage";

const event = events.haldi;

export const metadata: Metadata = {
  title: `${event.title} | Neelu & Aditya's Wedding`,
  description: event.description,
  openGraph: {
    title: event.title,
    description: event.tagline,
    images: [event.heroImage],
  },
};

export default function HaldiPage() {
  return <EventPage event={event} />;
}
