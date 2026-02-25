import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Neelu & Aditya's Wedding Celebrations",
  description: "Join us as we celebrate our wedding festivities — from Haldi to the Wedding ceremony. RSVP to each event and be part of our special moments.",
  keywords: ["wedding", "Indian wedding", "Telugu wedding", "RSVP", "Neelu", "Aditya"],
  openGraph: {
    title: "Neelu & Aditya's Wedding Celebrations",
    description: "Join us for our wedding festivities! RSVP to each ceremony.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
