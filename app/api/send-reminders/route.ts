import { NextRequest, NextResponse } from "next/server";
import { fetchAllRSVPs } from "@/lib/googleSheets";
import { events } from "@/config/events";
import { sendReminderEmail } from "@/lib/sendReminderEmail";
import { EventInfo } from "@/types";

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find the earliest event date
    const allEventDates = Object.values(events)
      .map((e) => e.date)
      .sort();
    const firstEventDate = allEventDates[0]; // "2026-04-19" (Haldi)

    // Check if today is exactly 7 days before the first event
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const firstDate = new Date(firstEventDate + "T00:00:00");
    const diffDays = Math.round(
      (firstDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays !== 7) {
      return NextResponse.json({
        message: `Not sending reminders — ${diffDays} days until first event (sends at 7 days)`,
        firstEvent: firstEventDate,
      });
    }

    // Fetch all RSVPs from Google Sheets
    const allRSVPs = await fetchAllRSVPs();

    // Group by email, taking the latest RSVP per email+event
    const guestMap = new Map<
      string,
      {
        fullName: string;
        email: string;
        events: Map<string, { adults: number; kids: number }>;
      }
    >();

    for (const rsvp of allRSVPs) {
      if (!rsvp.email || rsvp.willAttend === "no") continue;

      const email = rsvp.email.toLowerCase().trim();
      if (!guestMap.has(email)) {
        guestMap.set(email, {
          fullName: rsvp.fullName,
          email: rsvp.email,
          events: new Map(),
        });
      }

      const guest = guestMap.get(email)!;
      // Latest RSVP wins (data comes sorted by timestamp from Apps Script)
      guest.events.set(rsvp.event, {
        adults: rsvp.numberOfGuests || 1,
        kids: rsvp.numberOfKids || 0,
      });
      // Update name to latest
      guest.fullName = rsvp.fullName;
    }

    let sent = 0;
    let failed = 0;

    const guests = Array.from(guestMap.values());

    for (const guest of guests) {
      const eventData: { event: EventInfo; adults: number; kids: number }[] =
        [];
      const eventEntries = Array.from(guest.events.entries());
      for (const [slug, counts] of eventEntries) {
        const eventInfo = events[slug];
        if (eventInfo) {
          eventData.push({ event: eventInfo, adults: counts.adults, kids: counts.kids });
        }
      }

      if (eventData.length === 0) continue;

      // Sort events by date
      eventData.sort((a, b) => a.event.date.localeCompare(b.event.date));

      try {
        await sendReminderEmail(
          { fullName: guest.fullName, email: guest.email },
          eventData
        );
        sent++;
      } catch (err) {
        console.error(`Failed to send reminder to ${guest.email}:`, err);
        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Reminders sent: ${sent}, failed: ${failed}`,
      totalGuests: guestMap.size,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Send reminders error:", errMsg);
    return NextResponse.json(
      { success: false, message: errMsg },
      { status: 500 }
    );
  }
}
