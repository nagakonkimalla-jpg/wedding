import { RSVPFormData } from "@/types";

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || "";

export async function appendRSVP(data: RSVPFormData): Promise<void> {
  if (!APPS_SCRIPT_URL) {
    throw new Error("Google Apps Script URL not configured");
  }

  const payload = JSON.stringify({
    timestamp: data.timestamp,
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    numberOfGuests: data.numberOfGuests,
    numberOfKids: data.numberOfKids,
    willAttend: data.willAttend,
    dietaryRestrictions: data.dietaryRestrictions,
    message: data.message,
    rsvpSide: data.rsvpSide || "N/A",
    event: data.eventSlug,
  });

  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: payload,
    redirect: "follow",
  });

  const text = await response.text();

  // Google Apps Script returns HTML when access is denied or there's a deployment issue
  if (text.includes("<!DOCTYPE html>") || text.includes("Access Denied") || text.includes("You need access")) {
    throw new Error("Apps Script access denied — redeploy with 'Who has access: Anyone'");
  }

  let result;
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(`Apps Script returned unexpected response: ${text.substring(0, 200)}`);
  }

  if (result.status === "duplicate") {
    throw new DuplicateError("Already RSVP'd");
  }

  if (result.status === "error") {
    throw new Error(`Apps Script error: ${result.message}`);
  }
}

export class DuplicateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateError";
  }
}
