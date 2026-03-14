import nodemailer from "nodemailer";
import { EventInfo } from "@/types";

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface BatchGuestData {
  fullName: string;
  email: string;
  numberOfGuests: number;
  numberOfKids: number;
  dietaryRestrictions: string;
}

function generateBatchEmailHTML(data: BatchGuestData, events: EventInfo[]): string {
  const logoUrl = "https://wedding-five-self-14.vercel.app/assets/images/pelli/logo.jpeg";
  const primaryColor = "#B8860B";

  const eventRows = events.map((event) => `
    <tr><td style="padding:12px 0;border-bottom:1px solid #f0ebe3;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td style="vertical-align:top;width:40px;padding-right:12px;">
          <div style="width:36px;height:36px;border-radius:8px;background-color:${event.theme.primary}15;text-align:center;line-height:36px;font-size:18px;">${event.decorativeEmoji}</div>
        </td>
        <td style="vertical-align:top;">
          <p style="margin:0;font-size:16px;font-weight:bold;color:#3D2B1F;font-family:Georgia,serif;">${event.title}</p>
          <p style="margin:3px 0 0;font-size:13px;color:#6B5B4E;font-family:Arial,sans-serif;">
            &#128197; ${formatDate(event.date)} &nbsp;&middot;&nbsp; &#128336; ${event.time}
          </p>
          <p style="margin:3px 0 0;font-size:13px;color:#6B5B4E;font-family:Arial,sans-serif;">
            &#128205; ${event.venue}, ${event.venueAddress}
          </p>
          ${event.dressCode ? `<p style="margin:3px 0 0;font-size:12px;color:#8B7355;font-family:Arial,sans-serif;">&#128087; ${event.dressCode}</p>` : ""}
          <p style="margin:6px 0 0;">
            <a href="${event.googleMapsUrl}" target="_blank" style="font-size:12px;color:${event.theme.primary};text-decoration:none;font-family:Arial,sans-serif;">View on Maps &rarr;</a>
          </p>
        </td>
      </tr>
      </table>
    </td></tr>
  `).join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f8f5f0;font-family:Georgia,'Times New Roman',serif;">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f8f5f0;">
<tr><td style="padding:24px 16px;">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.06);">

  <!-- Header -->
  <tr><td style="height:4px;background:linear-gradient(90deg,${primaryColor},#D4A017,${primaryColor});"></td></tr>

  <!-- Logo -->
  <tr><td style="text-align:center;padding:32px 24px 8px;">
    <img src="${logoUrl}" alt="N & A" width="80" height="80" style="border-radius:50%;border:2px solid #D4A01740;display:inline-block;" />
  </td></tr>

  <!-- Title -->
  <tr><td style="text-align:center;padding:16px 24px 4px;">
    <h1 style="margin:0;font-size:24px;color:${primaryColor};font-family:Georgia,serif;">RSVP Confirmed!</h1>
    <p style="margin:8px 0 0;font-size:14px;color:#8B7355;font-family:Arial,sans-serif;">Neelu & Aditya's Wedding Celebrations</p>
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

  <!-- Status -->
  <tr><td style="text-align:center;padding:0 24px 20px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
    <tr><td style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:24px;padding:10px 24px;">
      <span style="font-size:14px;color:#166534;font-family:Arial,sans-serif;">
        &#10003; You're attending ${events.length} event${events.length > 1 ? "s" : ""}!
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

  <!-- Events List -->
  <tr><td style="padding:0 24px 20px;">
    <p style="margin:0 0 12px;font-size:12px;color:#8B7355;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,sans-serif;">Your Events</p>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    ${eventRows}
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="text-align:center;padding:20px 24px;border-top:1px solid #e8e0d4;">
    <p style="margin:0;font-size:22px;color:#B8860B;font-family:Georgia,serif;font-style:italic;">Neelu & Aditya</p>
    <p style="margin:6px 0 0;font-size:12px;color:#8B7355;font-family:Arial,sans-serif;">April 2026 &middot; Atlanta, Georgia</p>
    <p style="margin:12px 0 0;font-size:11px;color:#a89880;font-family:Arial,sans-serif;">
      Questions? Reply to this email or contact us directly.
    </p>
  </td></tr>

  <tr><td style="height:4px;background:linear-gradient(90deg,${primaryColor},#D4A017,${primaryColor});"></td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function sendBatchConfirmationEmail(
  data: BatchGuestData,
  events: EventInfo[]
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

  const eventNames = events.map((e) => e.title).join(", ");
  const subject = `RSVP Confirmed — ${eventNames} | Neelu & Aditya's Wedding`;

  await transporter.sendMail({
    from: `"Neelu & Aditya's Wedding" <${user}>`,
    to: data.email,
    subject,
    html: generateBatchEmailHTML(data, events),
  });
}
