import { Metadata } from "next";
import { events } from "@/config/events";
import EventPage from "@/components/EventPage";

const event = events["satyanarayana-swami-vratam-neelu"];

export const metadata: Metadata = {
  title: `${event.title} (Bride's Side) | Neelu & Aditya's Wedding`,
  description: event.description,
  openGraph: {
    title: `${event.title} — Bride's Side`,
    description: event.tagline,
    images: [event.heroImage],
  },
};

export default function SatyanarayanaNeeluPage() {
  return <EventPage event={event} />;
}
