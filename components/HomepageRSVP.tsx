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
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [message, setMessage] = useState("");
  const [eventAttendance, setEventAttendance] = useState<Record<string, "yes" | "no" | "maybe">>(
    eventOrder.length === 1 ? { [eventOrder[0]]: "yes" } : {}
  );
  const [eventGuests, setEventGuests] = useState<Record<string, { adults: number; kids: number }>>(
    eventOrder.length === 1 ? { [eventOrder[0]]: { adults: 1, kids: 0 } } : {}
  );
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
        if (parsed.dietaryRestrictions) setDietaryRestrictions(parsed.dietaryRestrictions);
      }
      const rsvpEvents = JSON.parse(localStorage.getItem("wedding-rsvp-events") || "{}");
      if (Object.keys(rsvpEvents).length > 0) {
        setAlreadySubmitted(true);
      }
    } catch {}
  }, []);

  const setAttendance = (slug: string, status: "yes" | "no" | "maybe") => {
    setEventAttendance((prev) => ({ ...prev, [slug]: status }));
    if (status === "yes" || status === "maybe") {
      if (!eventGuests[slug]) {
        setEventGuests((g) => ({ ...g, [slug]: { adults: 1, kids: 0 } }));
      }
    } else {
      setEventGuests((g) => {
        const copy = { ...g };
        delete copy[slug];
        return copy;
      });
    }
  };

  const updateEventGuests = (slug: string, field: "adults" | "kids", value: number) => {
    setEventGuests((g) => ({
      ...g,
      [slug]: { ...g[slug], [field]: value },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const respondedSlugs = Object.keys(eventAttendance);
    if (respondedSlugs.length === 0) {
      setError("Please respond to at least one event.");
      return;
    }

    setIsSubmitting(true);

    try {
      const eventDetails = respondedSlugs.map((slug) => ({
        slug,
        willAttend: eventAttendance[slug],
        adults: eventGuests[slug]?.adults || 1,
        kids: eventGuests[slug]?.kids || 0,
      }));

      const res = await fetch("/api/rsvp-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone,
          email,
          dietaryRestrictions,
          message,
          eventDetails,
          // backwards compat
          eventSlugs: respondedSlugs,
          numberOfGuests: eventDetails[0]?.adults || 1,
          numberOfKids: eventDetails[0]?.kids || 0,
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
            JSON.stringify({ fullName, phone, email, dietaryRestrictions })
          );
          const rsvpEvents = JSON.parse(localStorage.getItem("wedding-rsvp-events") || "{}");
          respondedSlugs.forEach((slug) => {
            rsvpEvents[slug] = { email, willAttend: eventAttendance[slug] };
          });
          localStorage.setItem("wedding-rsvp-events", JSON.stringify(rsvpEvents));
          setAlreadySubmitted(true);
        } catch {}

        setEventAttendance({});
        setEventGuests({});
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

              {/* Event selection */}
              {eventOrder.length > 1 ? (
                <>
                  {/* Divider */}
                  <div className="flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-[#B8860B]/20" />
                    <span className="font-body text-sm font-semibold text-[#3D2B1F]/70">
                      Will you attend?
                    </span>
                    <div className="flex-1 h-px bg-[#B8860B]/20" />
                  </div>

                  {/* Event Cards with Yes/No/Maybe + guest counts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {eventOrder.map((slug) => {
                      const event = events[slug];
                      if (!event) return null;
                      const status = eventAttendance[slug];
                      const guests = eventGuests[slug] || { adults: 1, kids: 0 };
                      const showGuests = status === "yes" || status === "maybe";

                      return (
                        <div
                          key={slug}
                          className={`rounded-lg border transition-all duration-200 ${
                            status === "yes"
                              ? "border-green-500 bg-green-50"
                              : status === "maybe"
                              ? "border-amber-400 bg-amber-50"
                              : status === "no"
                              ? "border-red-300 bg-red-50/50"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <div className="px-3 py-2.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm">{event.decorativeEmoji}</span>
                              <span className="font-heading font-bold text-[#3D2B1F] text-sm truncate">
                                {event.title}
                              </span>
                            </div>
                            <p className="text-[10px] font-body text-[#3D2B1F]/50 mt-0.5 truncate">
                              {formatDate(event.date)} &middot; {event.venue}
                            </p>
                            <div className="flex gap-1.5 mt-2">
                              {(["yes", "no", "maybe"] as const).map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setAttendance(slug, opt)}
                                  className={`flex-1 py-1 text-[11px] font-body font-semibold rounded-md border transition-all ${
                                    status === opt
                                      ? opt === "yes"
                                        ? "bg-green-600 text-white border-green-600"
                                        : opt === "maybe"
                                        ? "bg-amber-500 text-white border-amber-500"
                                        : "bg-red-500 text-white border-red-500"
                                      : "bg-white text-[#3D2B1F]/60 border-gray-200 hover:border-[#B8860B]/40"
                                  }`}
                                >
                                  {opt === "yes" ? "Yes" : opt === "no" ? "No" : "Maybe"}
                                </button>
                              ))}
                            </div>
                          </div>
                          {showGuests && (
                            <div className="flex items-center gap-3 px-3 pb-2.5 pt-0.5">
                              <div className="flex items-center gap-1.5">
                                <label className="font-body text-[10px] text-[#3D2B1F]/60">Adults</label>
                                <input
                                  type="number"
                                  value={isNaN(guests.adults) ? "" : guests.adults}
                                  onChange={(e) => updateEventGuests(slug, "adults", parseInt(e.target.value))}
                                  min={1}
                                  max={20}
                                  className="w-14 px-2 py-1 text-xs rounded border border-[#B8860B]/30 font-body text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#B8860B]/40"
                                />
                              </div>
                              <div className="flex items-center gap-1.5">
                                <label className="font-body text-[10px] text-[#3D2B1F]/60">Kids</label>
                                <input
                                  type="number"
                                  value={isNaN(guests.kids) ? "" : guests.kids}
                                  onChange={(e) => updateEventGuests(slug, "kids", parseInt(e.target.value))}
                                  min={0}
                                  max={20}
                                  className="w-14 px-2 py-1 text-xs rounded border border-[#B8860B]/30 font-body text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#B8860B]/40"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                /* Single event - show will attend + guest count fields */
                <>
                  <div className="flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-[#B8860B]/20" />
                    <span className="font-body text-sm font-semibold text-[#3D2B1F]/70">
                      Will you attend?
                    </span>
                    <div className="flex-1 h-px bg-[#B8860B]/20" />
                  </div>
                  <div className="flex gap-3">
                    {(["yes", "no", "maybe"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAttendance(eventOrder[0], opt)}
                        className={`flex-1 py-2.5 font-body font-semibold rounded-xl border transition-all text-sm ${
                          eventAttendance[eventOrder[0]] === opt
                            ? opt === "yes"
                              ? "bg-green-600 text-white border-green-600"
                              : opt === "maybe"
                              ? "bg-amber-500 text-white border-amber-500"
                              : "bg-red-500 text-white border-red-500"
                            : "bg-white text-[#3D2B1F]/60 border-gray-200 hover:border-[#B8860B]/40"
                        }`}
                      >
                        {opt === "yes" ? "Yes" : opt === "no" ? "No" : "Maybe"}
                      </button>
                    ))}
                  </div>
                  {(eventAttendance[eventOrder[0]] === "yes" || eventAttendance[eventOrder[0]] === "maybe") && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-body text-sm font-semibold mb-1 text-[#3D2B1F]">
                          Number of Adults
                        </label>
                        <input
                          type="number"
                          value={isNaN(eventGuests[eventOrder[0]]?.adults) ? "" : eventGuests[eventOrder[0]]?.adults}
                          onChange={(e) => updateEventGuests(eventOrder[0], "adults", parseInt(e.target.value))}
                          min={1}
                          max={20}
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className="block font-body text-sm font-semibold mb-1 text-[#3D2B1F]">
                          Number of Kids
                        </label>
                        <input
                          type="number"
                          value={isNaN(eventGuests[eventOrder[0]]?.kids) ? "" : eventGuests[eventOrder[0]]?.kids}
                          onChange={(e) => updateEventGuests(eventOrder[0], "kids", parseInt(e.target.value))}
                          min={0}
                          max={20}
                          className={inputClasses}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

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
