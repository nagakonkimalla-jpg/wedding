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

export default function PelliPage() {
  return <PelliEventPage event={event} />;
}
