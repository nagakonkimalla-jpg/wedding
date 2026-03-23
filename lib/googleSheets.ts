import { RSVPFormData } from "@/types";

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || "";

export interface RSVPRow {
  fullName: string;
  email: string;
  numberOfGuests: number;
  numberOfKids: number;
  willAttend: string;
  event: string;
}

// Maps the Google Sheets column headers to our internal field names
// Sheet headers: "Timestamp", "Full Name", "Phone", "Email", "Number of Guests",
// "Number of Kids", "Will Attend", "Dietary Restrictions", "Message", "RSVP Side", "Event"
// The "_sheet" field is the tab name (also the event slug)
function mapSheetRow(raw: Record<string, unknown>): RSVPRow {
  return {
    fullName: String(raw["Full Name"] || ""),
    email: String(raw["Email"] || ""),
    numberOfGuests: Number(raw["Number of Guests"]) || 1,
    numberOfKids: Number(raw["Number of Kids"]) || 0,
    willAttend: String(raw["Will Attend"] || "yes"),
    // Use "Event" column if present, otherwise fall back to the sheet tab name
    event: String(raw["Event"] || raw["_sheet"] || ""),
  };
}

export async function fetchAllRSVPs(): Promise<RSVPRow[]> {
  if (!APPS_SCRIPT_URL) {
    throw new Error("Google Apps Script URL not configured");
  }

  const url = `${APPS_SCRIPT_URL}?action=getAllRSVPs`;
  const response = await fetch(url, { method: "GET", redirect: "follow" });
  const text = await response.text();

  if (text.includes("<!DOCTYPE html>") || text.includes("Access Denied")) {
    throw new Error("Apps Script access denied — redeploy with 'Who has access: Anyone'");
  }

  let result;
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(`Apps Script returned unexpected response: ${text.substring(0, 200)}`);
  }

  if (result.status === "error") {
    throw new Error(`Apps Script error: ${result.message}`);
  }

  const rawRows: Record<string, unknown>[] = result.data || [];
  return rawRows.map(mapSheetRow);
}

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

  if (result.status === "error") {
    throw new Error(`Apps Script error: ${result.message}`);
  }

}
