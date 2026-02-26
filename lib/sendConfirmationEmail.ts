import nodemailer from "nodemailer";
import { RSVPFormData, EventInfo } from "@/types";

function parseTime(timeStr: string): { start: string; end: string } | null {
  // Match patterns like "10:00 AM - 3:00 PM", "6:00 PM - 11:00 PM", "Sumuhurtham at 9:23 AM"
  const timeRegex = /(\d{1,2}:\d{2}\s*[AP]M)/gi;
  const matches = timeStr.match(timeRegex);
  if (!matches || matches.length === 0) return null;

  const to24h = (t: string): string => {
    const [time, period] = t.trim().split(/\s+/);
    let [h, m] = time.split(":").map(Number);
    if (period.toUpperCase() === "PM" && h !== 12) h += 12;
    if (period.toUpperCase() === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}${String(m).padStart(2, "0")}00`;
  };

  const start = to24h(matches[0]);
  // If only one time found, default end to start + 3 hours
  let end: string;
  if (matches.length >= 2) {
    end = to24h(matches[1]);
  } else {
    const startH = parseInt(start.slice(0, 2));
    end = `${String((startH + 3) % 24).padStart(2, "0")}${start.slice(2)}`;
  }

  return { start, end };
}

function generateCalendarLink(event: EventInfo): string {
  const dateStr = event.date.replace(/-/g, ""); // "20260419"
  const parsed = parseTime(event.time);

  let dates: string;
  if (parsed) {
    dates = `${dateStr}T${parsed.start}/${dateStr}T${parsed.end}`;
  } else {
    // All-day fallback
    const nextDay = new Date(event.date + "T00:00:00");
    nextDay.setDate(nextDay.getDate() + 1);
    const nd = nextDay.toISOString().split("T")[0].replace(/-/g, "");
    dates = `${dateStr}/${nd}`;
  }

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.title} — Neelu & Aditya's Wedding`,
    dates,
    details: event.description,
    location: `${event.venue}, ${event.venueAddress}`,
    ctz: "America/New_York",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function generateEmailHTML(data: RSVPFormData, event: EventInfo): string {
  const calendarLink = generateCalendarLink(event);
  const isAttending = data.willAttend === "yes";
  const primaryColor = event.theme.primary;
  const logoUrl = "https://wedding-five-self-14.vercel.app/assets/images/pelli/logo.jpeg";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f8f5f0;font-family:Georgia,'Times New Roman',serif;">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f8f5f0;">
<tr><td style="padding:24px 16px;">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.06);">

  <!-- Header with gold accent -->
  <tr><td style="height:4px;background:linear-gradient(90deg,${primaryColor},#D4A017,${primaryColor});"></td></tr>

  <!-- Logo -->
  <tr><td style="text-align:center;padding:32px 24px 8px;">
    <img src="${logoUrl}" alt="N & A" width="80" height="80" style="border-radius:50%;border:2px solid #D4A01740;display:inline-block;" />
  </td></tr>

  <!-- Event Title -->
  <tr><td style="text-align:center;padding:16px 24px 4px;">
    <h1 style="margin:0;font-size:26px;color:${primaryColor};font-family:Georgia,serif;font-weight:bold;">${event.title}</h1>
    <p style="margin:4px 0 0;font-size:14px;color:#8B7355;letter-spacing:2px;text-transform:uppercase;">${event.subtitle}</p>
  </td></tr>

  <!-- Divider -->
  <tr><td style="text-align:center;padding:16px 24px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
    <tr>
      <td style="width:60px;height:1px;background:linear-gradient(90deg,transparent,#D4A017);"></td>
      <td style="padding:0 12px;color:#D4A017;font-size:16px;">&#10087;</td>
      <td style="width:60px;height:1px;background:linear-gradient(270deg,transparent,#D4A017);"></td>
    </tr>
    </table>
  </td></tr>

  <!-- RSVP Status -->
  <tr><td style="text-align:center;padding:0 24px 20px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
    <tr><td style="background-color:${isAttending ? "#f0fdf4" : "#fef2f2"};border:1px solid ${isAttending ? "#bbf7d0" : "#fecaca"};border-radius:24px;padding:10px 24px;">
      <span style="font-size:14px;color:${isAttending ? "#166534" : "#991b1b"};font-family:Arial,sans-serif;">
        ${isAttending ? "&#10003; You're attending!" : "We'll miss you!"}
      </span>
    </td></tr>
    </table>
  </td></tr>

  <!-- Guest Details -->
  <tr><td style="padding:0 24px 20px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#faf8f5;border-radius:12px;border:1px solid #e8e0d4;">
    <tr><td style="padding:20px;">
      <p style="margin:0 0 4px;font-size:12px;color:#8B7355;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,sans-serif;">Guest Details</p>
      <p style="margin:0 0 12px;font-size:18px;color:#3D2B1F;font-weight:bold;">${data.fullName}</p>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      ${data.numberOfGuests > 0 ? `<tr><td style="padding:4px 0;font-size:14px;color:#6B5B4E;font-family:Arial,sans-serif;">Adults: <strong>${data.numberOfGuests}</strong></td></tr>` : ""}
      ${data.numberOfKids > 0 ? `<tr><td style="padding:4px 0;font-size:14px;color:#6B5B4E;font-family:Arial,sans-serif;">Kids: <strong>${data.numberOfKids}</strong></td></tr>` : ""}
      ${data.dietaryRestrictions ? `<tr><td style="padding:4px 0;font-size:14px;color:#6B5B4E;font-family:Arial,sans-serif;">Dietary: ${data.dietaryRestrictions}</td></tr>` : ""}
      </table>
    </td></tr>
    </table>
  </td></tr>

  <!-- Event Details -->
  <tr><td style="padding:0 24px 20px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#faf8f5;border-radius:12px;border:1px solid #e8e0d4;">
    <tr><td style="padding:20px;">
      <p style="margin:0 0 12px;font-size:12px;color:#8B7355;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,sans-serif;">Event Details</p>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr><td style="padding:6px 0;font-size:14px;font-family:Arial,sans-serif;">
        <span style="color:#8B7355;">&#128197;</span>
        <span style="color:#3D2B1F;margin-left:8px;">${formatDate(event.date)}</span>
      </td></tr>
      <tr><td style="padding:6px 0;font-size:14px;font-family:Arial,sans-serif;">
        <span style="color:#8B7355;">&#128336;</span>
        <span style="color:#3D2B1F;margin-left:8px;">${event.time}</span>
      </td></tr>
      <tr><td style="padding:6px 0;font-size:14px;font-family:Arial,sans-serif;">
        <span style="color:#8B7355;">&#128205;</span>
        <span style="color:#3D2B1F;margin-left:8px;"><strong>${event.venue}</strong></span>
      </td></tr>
      <tr><td style="padding:2px 0 6px 26px;font-size:13px;color:#6B5B4E;font-family:Arial,sans-serif;">
        ${event.venueAddress}
      </td></tr>
      ${event.dressCode ? `<tr><td style="padding:6px 0;font-size:14px;font-family:Arial,sans-serif;">
        <span style="color:#8B7355;">&#128087;</span>
        <span style="color:#3D2B1F;margin-left:8px;">${event.dressCode}</span>
      </td></tr>` : ""}
      </table>
    </td></tr>
    </table>
  </td></tr>

  <!-- Action Buttons -->
  ${isAttending ? `<tr><td style="padding:0 24px 12px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr>
      <td style="text-align:center;padding:0 4px;">
        <a href="${calendarLink}" target="_blank" style="display:inline-block;background-color:${primaryColor};color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-family:Arial,sans-serif;font-weight:bold;">&#128197; Add to Calendar</a>
      </td>
    </tr>
    </table>
  </td></tr>
  <tr><td style="padding:0 24px 20px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr>
      <td style="text-align:center;padding:0 4px;">
        <a href="${event.googleMapsUrl}" target="_blank" style="display:inline-block;background-color:transparent;color:${primaryColor};text-decoration:none;padding:10px 24px;border-radius:8px;font-size:14px;font-family:Arial,sans-serif;font-weight:bold;border:2px solid ${primaryColor};">&#128205; View on Maps</a>
      </td>
    </tr>
    </table>
  </td></tr>` : ""}

  <!-- Footer -->
  <tr><td style="text-align:center;padding:20px 24px;border-top:1px solid #e8e0d4;">
    <p style="margin:0;font-size:22px;color:#B8860B;font-family:Georgia,serif;font-style:italic;">Neelu & Aditya</p>
    <p style="margin:6px 0 0;font-size:12px;color:#8B7355;font-family:Arial,sans-serif;">April 2026 &middot; Atlanta, Georgia</p>
    <p style="margin:12px 0 0;font-size:11px;color:#a89880;font-family:Arial,sans-serif;">
      Questions? Reply to this email or contact us directly.
    </p>
  </td></tr>

  <!-- Bottom accent -->
  <tr><td style="height:4px;background:linear-gradient(90deg,${primaryColor},#D4A017,${primaryColor});"></td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function sendConfirmationEmail(
  data: RSVPFormData,
  event: EventInfo
): Promise<void> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn("GMAIL_USER or GMAIL_APP_PASSWORD not set, skipping confirmation email");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const subject = data.willAttend === "yes"
    ? `RSVP Confirmed — ${event.title} | Neelu & Aditya's Wedding`
    : `RSVP Received — ${event.title} | Neelu & Aditya's Wedding`;

  await transporter.sendMail({
    from: `"Neelu & Aditya's Wedding" <${user}>`,
    to: data.email,
    subject,
    html: generateEmailHTML(data, event),
  });
}
