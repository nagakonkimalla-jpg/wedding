"use client";

import { useState, FormEvent, useEffect } from "react";
import { events, eventOrder } from "@/config/events";
import { RSVPResponse } from "@/types";
import ThankYouModal from "./ThankYouModal";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function HomepageRSVP() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [numberOfKids, setNumberOfKids] = useState(0);
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  // Load cached details from localStorage
  useEffect(() => {
    try {
      const cached = localStorage.getItem("wedding-rsvp-details");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.fullName) setFullName(parsed.fullName);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.numberOfGuests) setNumberOfGuests(parsed.numberOfGuests);
        if (parsed.numberOfKids != null) setNumberOfKids(parsed.numberOfKids);
        if (parsed.dietaryRestrictions) setDietaryRestrictions(parsed.dietaryRestrictions);
      }
      const rsvpEvents = JSON.parse(localStorage.getItem("wedding-rsvp-events") || "{}");
      if (Object.keys(rsvpEvents).length > 0) {
        setAlreadySubmitted(true);
      }
    } catch {}
  }, []);

  const toggleEvent = (slug: string) => {
    setSelectedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (selectedEvents.size === 0) {
      setError("Please select at least one event you'd like to attend.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone,
          email,
          numberOfGuests: numberOfGuests || 1,
          numberOfKids: numberOfKids || 0,
          dietaryRestrictions,
          message,
          eventSlugs: Array.from(selectedEvents),
        }),
      });

      const data: RSVPResponse = await res.json();

      if (data.success) {
        setResponseMessage(data.message);
        setShowModal(true);

        // Cache details
        try {
          localStorage.setItem(
            "wedding-rsvp-details",
            JSON.stringify({ fullName, phone, email, numberOfGuests, numberOfKids, dietaryRestrictions })
          );
          const rsvpEvents = JSON.parse(localStorage.getItem("wedding-rsvp-events") || "{}");
          selectedEvents.forEach((slug) => {
            rsvpEvents[slug] = { email, willAttend: "yes" };
          });
          localStorage.setItem("wedding-rsvp-events", JSON.stringify(rsvpEvents));
          setAlreadySubmitted(true);
        } catch {}

        setSelectedEvents(new Set());
        setMessage("");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-[#B8860B]/30 font-body text-gray-800 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 transition-all duration-200";

  return (
    <>
      <section id="rsvp" className="relative px-4 sm:px-6 lg:px-8 pb-20 pt-8">
        <div className="max-w-3xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#B8860B]/40" />
              <div className="w-2 h-2 rotate-45 bg-[#B8860B]/40" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#B8860B]/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#3D2B1F]">
              RSVP
            </h2>
            <p className="font-body text-sm mt-2 text-[#3D2B1F]/60">
              We would love to have you celebrate with us
            </p>
            {alreadySubmitted && (
              <div className="inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full text-xs font-body tracking-wide bg-[#B8860B]/10 text-[#B8860B] border border-[#B8860B]/30">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                You've already RSVP'd — you can update or add more events below
              </div>
            )}
          </div>

          <div className="rounded-3xl p-6 sm:p-10 bg-white border-2 border-[#B8860B]/20 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div>
                <label className="block font-body text-sm font-semibold mb-1 text-[#3D2B1F]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className={inputClasses}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-sm font-semibold mb-1 text-[#3D2B1F]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold mb-1 text-[#3D2B1F]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-sm font-semibold mb-1 text-[#3D2B1F]">
                    Number of Adults
                  </label>
                  <input
                    type="number"
                    value={isNaN(numberOfGuests) ? "" : numberOfGuests}
                    onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
                    min={1}
                    max={10}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold mb-1 text-[#3D2B1F]">
                    Number of Kids
                  </label>
                  <input
                    type="number"
                    value={isNaN(numberOfKids) ? "" : numberOfKids}
                    onChange={(e) => setNumberOfKids(parseInt(e.target.value))}
                    min={0}
                    max={10}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-sm font-semibold mb-1 text-[#3D2B1F]">
                  Dietary Restrictions
                </label>
                <textarea
                  value={dietaryRestrictions}
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                  rows={2}
                  placeholder="Any dietary restrictions or allergies?"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold mb-1 text-[#3D2B1F]">
                  Message for the Couple
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Share your wishes or a message..."
                  className={inputClasses}
                />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-[#B8860B]/20" />
                <span className="font-body text-sm font-semibold text-[#3D2B1F]/70">
                  Which events will you attend?
                </span>
                <div className="flex-1 h-px bg-[#B8860B]/20" />
              </div>

              {/* Event Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {eventOrder.map((slug) => {
                  const event = events[slug];
                  if (!event) return null;
                  const isChecked = selectedEvents.has(slug);

                  return (
                    <label
                      key={slug}
                      className={`flex items-center gap-2.5 cursor-pointer rounded-lg border px-3 py-2.5 transition-all duration-200 ${
                        isChecked
                          ? "border-[#B8860B] bg-[#B8860B]/5"
                          : "border-gray-200 bg-white hover:border-[#B8860B]/40"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                          isChecked
                            ? "bg-[#B8860B] border-[#B8860B]"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleEvent(slug)}
                        className="sr-only"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{event.decorativeEmoji}</span>
                          <span className="font-heading font-bold text-[#3D2B1F] text-sm truncate">
                            {event.title}
                          </span>
                        </div>
                        <p className="text-[10px] font-body text-[#3D2B1F]/50 mt-0.5 truncate">
                          {formatDate(event.date)} &middot; {event.venue}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 font-body text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 min-h-[52px] rounded-full font-body font-bold text-white text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed bg-[#B8860B] shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send RSVP"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <ThankYouModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={responseMessage}
        willAttend={true}
        theme={{
          primary: "#B8860B",
          secondary: "#F5E6CC",
          accent: "#8B6914",
          bg: "#FFFFF0",
          cardBg: "#FFFFFF",
          text: "#3D2B1F",
          gradient: "from-amber-300 via-yellow-200 to-amber-400",
        }}
      />
    </>
  );
}
