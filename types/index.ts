export interface EventTheme {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  cardBg: string;
  text: string;
  gradient: string;
  pattern?: string;
}

export interface EventInfo {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  date: string;
  time: string;
  venue: string;
  venueAddress: string;
  googleMapsUrl: string;
  dressCode?: string;
  description: string;
  theme: EventTheme;
  heroImage: string;
  galleryImages: string[];
  decorativeEmoji: string;
  hasRsvpSide?: boolean;
  venueImage?: string;
}

export interface RSVPFormData {
  fullName: string;
  phone: string;
  email: string;
  numberOfGuests: number;
  numberOfKids: number;
  willAttend: "yes" | "no";
  dietaryRestrictions: string;
  message: string;
  rsvpSide?: "pellikuthuru" | "pellikoduku";
  eventSlug: string;
  timestamp: string;
}

export interface RSVPResponse {
  success: boolean;
  message: string;
  error?: string;
}
