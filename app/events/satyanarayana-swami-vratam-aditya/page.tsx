import { Metadata } from "next";
import { events } from "@/config/events";
import EventPage from "@/components/EventPage";

const event = events["satyanarayana-swami-vratam-aditya"];

export const metadata: Metadata = {
  title: `${event.title} (Groom's Side) | Neelu & Aditya's Wedding`,
  description: event.description,
  openGraph: {
    title: `${event.title} — Groom's Side`,
    description: event.tagline,
    images: [event.heroImage],
  },
};

export default function SatyanarayanaAdityaPage() {
  return <EventPage event={event} />;
}
