"use client";

import { useState, FormEvent } from "react";
import { EventInfo, RSVPFormData, RSVPResponse } from "@/types";
import ThankYouModal from "./ThankYouModal";

interface RSVPFormProps {
  event: EventInfo;
}

export default function RSVPForm({ event }: RSVPFormProps) {
  const [formData, setFormData] = useState<RSVPFormData>(() => {
    const defaults: RSVPFormData = {
      fullName: "",
      phone: "",
      email: "",
      numberOfGuests: 1,
      numberOfKids: 0,
      willAttend: "yes",
      dietaryRestrictions: "",
      message: "",
      rsvpSide: undefined,
      eventSlug: event.slug,
      timestamp: "",
    };
    if (typeof window === "undefined") return defaults;
    try {
      const cached = localStorage.getItem("wedding-rsvp-details");
      if (cached) {
        const parsed = JSON.parse(cached);
        return { ...defaults, ...parsed, eventSlug: event.slug, message: "", rsvpSide: undefined, timestamp: "" };
      }
    } catch {}
    return defaults;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [alreadyRsvpd, setAlreadyRsvpd] = useState<{ email: string; willAttend: string } | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const rsvpEvents = JSON.parse(localStorage.getItem("wedding-rsvp-events") || "{}");
      return rsvpEvents[event.slug] || null;
    } catch { return null; }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numberOfGuests" || name === "numberOfKids" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          numberOfGuests: formData.numberOfGuests || 1,
          numberOfKids: formData.numberOfKids || 0,
          timestamp: new Date().toISOString(),
        }),
      });

      const data: RSVPResponse = await res.json();

      if (data.success) {
        setResponseMessage(data.message);
        setShowModal(true);
        // Cache personal details so other event RSVPs auto-populate
        try {
          localStorage.setItem("wedding-rsvp-details", JSON.stringify({
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            numberOfGuests: formData.numberOfGuests,
            numberOfKids: formData.numberOfKids,
            willAttend: formData.willAttend,
            dietaryRestrictions: formData.dietaryRestrictions,
          }));
          // Track which events have been RSVP'd (keyed by email)
          const rsvpEntry = { email: formData.email, willAttend: formData.willAttend };
          const rsvpEvents = JSON.parse(localStorage.getItem("wedding-rsvp-events") || "{}");
          rsvpEvents[event.slug] = rsvpEntry;
          localStorage.setItem("wedding-rsvp-events", JSON.stringify(rsvpEvents));
          setAlreadyRsvpd(rsvpEntry);
        } catch {}
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          numberOfGuests: 1,
          numberOfKids: 0,
          willAttend: "yes",
          dietaryRestrictions: "",
          message: "",
          rsvpSide: undefined,
          eventSlug: event.slug,
          timestamp: "",
        });
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
    "w-full px-4 py-3 rounded-xl border font-body text-gray-800 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 transition-all duration-200";

  return (
    <>
      <section id="rsvp" className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px" style={{ backgroundColor: `${event.theme.primary}40` }} />
              <div className="w-2 h-2 rotate-45" style={{ backgroundColor: event.theme.primary, opacity: 0.4 }} />
              <div className="w-12 h-px" style={{ backgroundColor: `${event.theme.primary}40` }} />
            </div>
            <h2
              className="text-3xl sm:text-4xl font-heading font-bold"
              style={{ color: event.theme.text }}
            >
              RSVP
            </h2>
            <p className="font-body text-sm mt-2 opacity-60" style={{ color: event.theme.text }}>
              We would love to have you celebrate with us
            </p>
            {alreadyRsvpd && (
              <div
                className="inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full text-xs font-body tracking-wide"
                style={{
                  backgroundColor: `${event.theme.primary}15`,
                  color: event.theme.primary,
                  border: `1px solid ${event.theme.primary}30`,
                }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {alreadyRsvpd.willAttend === "yes" ? "You've RSVP'd — Attending" : "You've RSVP'd — Not Attending"}
              </div>
            )}
          </div>

          <div
            className="rounded-3xl p-6 sm:p-10"
            style={{
              backgroundColor: event.theme.cardBg,
              border: `2px solid ${event.theme.primary}30`,
              boxShadow: `0 2px 16px ${event.theme.primary}12`,
            }}
          >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block font-body text-sm font-semibold mb-1" style={{ color: event.theme.text }}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className={inputClasses}
                style={{ borderColor: `${event.theme.primary}40`, focusRingColor: event.theme.primary } as React.CSSProperties}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-body text-sm font-semibold mb-1" style={{ color: event.theme.text }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className={inputClasses}
                style={{ borderColor: `${event.theme.primary}40` }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-body text-sm font-semibold mb-1" style={{ color: event.theme.text }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                className={inputClasses}
                style={{ borderColor: `${event.theme.primary}40` }}
              />
            </div>

            {/* Number of Guests + Kids side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-semibold mb-1" style={{ color: event.theme.text }}>
                  Number of Adults
                </label>
                <input
                  type="number"
                  name="numberOfGuests"
                  value={isNaN(formData.numberOfGuests) ? "" : formData.numberOfGuests}
                  onChange={handleChange}
                  min={1}
                  max={10}
                  className={inputClasses}
                  style={{ borderColor: `${event.theme.primary}40` }}
                />
              </div>
              <div>
                <label className="block font-body text-sm font-semibold mb-1" style={{ color: event.theme.text }}>
                  Number of Kids
                </label>
                <input
                  type="number"
                  name="numberOfKids"
                  value={isNaN(formData.numberOfKids) ? "" : formData.numberOfKids}
                  onChange={handleChange}
                  min={0}
                  max={10}
                  className={inputClasses}
                  style={{ borderColor: `${event.theme.primary}40` }}
                />
              </div>
            </div>

            {/* Will Attend */}
            <div>
              <label className="block font-body text-sm font-semibold mb-2" style={{ color: event.theme.text }}>
                Will you attend? <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {(["yes", "no"] as const).map((option) => (
                  <div
                    key={option}
                    className="flex-1 border rounded-xl p-3 sm:p-2 cursor-pointer transition-colors"
                    style={{
                      borderColor: formData.willAttend === option ? event.theme.primary : `${event.theme.primary}30`,
                      backgroundColor: formData.willAttend === option ? `${event.theme.primary}10` : "transparent",
                    }}
                  >
                    <label
                      className="flex items-center gap-2 cursor-pointer font-body w-full"
                    >
                      <input
                        type="radio"
                        name="willAttend"
                        value={option}
                        checked={formData.willAttend === option}
                        onChange={handleChange}
                        className="w-4 h-4"
                        style={{ accentColor: event.theme.primary }}
                      />
                      <span style={{ color: event.theme.text }}>
                        {option === "yes" ? "Accept" : "Decline"}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* RSVP Side (conditional) */}
            {event.hasRsvpSide && (
              <div>
                <label className="block font-body text-sm font-semibold mb-2" style={{ color: event.theme.text }}>
                  Which side are you from?
                </label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {([
                    { value: "pellikuthuru", label: "Pellikuthuru (Bride's) Side" },
                    { value: "pellikoduku", label: "Pellikoduku (Groom's) Side" },
                  ] as const).map((option) => (
                    <div
                      key={option.value}
                      className="flex-1 border rounded-xl p-3 sm:p-2 cursor-pointer transition-colors"
                      style={{
                        borderColor: formData.rsvpSide === option.value ? event.theme.primary : `${event.theme.primary}30`,
                        backgroundColor: formData.rsvpSide === option.value ? `${event.theme.primary}10` : "transparent",
                      }}
                    >
                      <label
                        className="flex items-center gap-2 cursor-pointer font-body w-full"
                      >
                        <input
                          type="radio"
                          name="rsvpSide"
                          value={option.value}
                          checked={formData.rsvpSide === option.value}
                          onChange={handleChange}
                          className="w-4 h-4"
                          style={{ accentColor: event.theme.primary }}
                        />
                        <span style={{ color: event.theme.text }}>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dietary Restrictions */}
            <div>
              <label className="block font-body text-sm font-semibold mb-1" style={{ color: event.theme.text }}>
                Dietary Restrictions
              </label>
              <textarea
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                rows={2}
                placeholder="Any dietary restrictions or allergies?"
                className={inputClasses}
                style={{ borderColor: `${event.theme.primary}40` }}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block font-body text-sm font-semibold mb-1" style={{ color: event.theme.text }}>
                Message for the Couple
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Share your wishes or a message..."
                className={inputClasses}
                style={{ borderColor: `${event.theme.primary}40` }}
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 font-body text-sm">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 min-h-[52px] rounded-full font-body font-bold text-white text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: event.theme.primary, boxShadow: `0 4px 15px ${event.theme.primary}30` }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
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
        willAttend={formData.willAttend === "yes"}
        theme={event.theme}
      />
    </>
  );
}
