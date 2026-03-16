import { NextRequest, NextResponse } from "next/server";
import { appendRSVP } from "@/lib/googleSheets";
import { getEvent } from "@/config/events";
import { sendBatchConfirmationEmail } from "@/lib/sendBatchConfirmationEmail";
import { RSVPFormData } from "@/types";

interface EventDetail {
  slug: string;
  adults: number;
  kids: number;
  willAttend?: "yes" | "no" | "maybe";
}

interface BatchRSVPBody {
  fullName: string;
  phone: string;
  email: string;
  numberOfGuests?: number;
  numberOfKids?: number;
  dietaryRestrictions: string;
  message: string;
  eventSlugs?: string[];
  eventDetails?: EventDetail[];
}

export async function POST(request: NextRequest) {
  try {
    const body: BatchRSVPBody = await request.json();

    if (!body.fullName?.trim()) {
      return NextResponse.json(
        { success: false, message: "Please enter your full name." },
        { status: 400 }
      );
    }

    // Build event list from eventDetails (new) or eventSlugs (legacy)
    const eventList: EventDetail[] = body.eventDetails && body.eventDetails.length > 0
      ? body.eventDetails
      : (body.eventSlugs || []).map((slug) => ({
          slug,
          adults: body.numberOfGuests || 1,
          kids: body.numberOfKids || 0,
        }));

    if (eventList.length === 0) {
      return NextResponse.json(
        { success: false, message: "Please select at least one event." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const results: { slug: string; success: boolean; error?: string }[] = [];

    // Submit RSVP for each selected event to Google Sheets
    for (const detail of eventList) {
      const rsvpData: RSVPFormData = {
        fullName: body.fullName.trim(),
        phone: body.phone || "",
        email: body.email || "",
        numberOfGuests: Math.max(1, Math.round(detail.adults || 1)),
        numberOfKids: Math.max(0, Math.round(detail.kids || 0)),
        willAttend: detail.willAttend || "yes",
        dietaryRestrictions: body.dietaryRestrictions || "",
        message: body.message || "",
        eventSlug: detail.slug,
        timestamp,
      };

      try {
        await appendRSVP(rsvpData);
        results.push({ slug: detail.slug, success: true });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`RSVP failed for ${detail.slug}:`, msg);
        results.push({ slug: detail.slug, success: false, error: msg });
      }
    }

    const allSucceeded = results.every((r) => r.success);
    const succeededSlugs = results.filter((r) => r.success).map((r) => r.slug);

    // Send ONE consolidated confirmation email with all responded events
    if (body.email && succeededSlugs.length > 0) {
      const succeededDetails = eventList.filter((d) => succeededSlugs.includes(d.slug));
      const succeededEvents = succeededDetails
        .map((d) => getEvent(d.slug))
        .filter(Boolean) as import("@/types").EventInfo[];

      const guestCountMap: Record<string, { adults: number; kids: number }> = {};
      const attendanceMap: Record<string, string> = {};
      for (const detail of succeededDetails) {
        guestCountMap[detail.slug] = { adults: detail.adults || 1, kids: detail.kids || 0 };
        attendanceMap[detail.slug] = detail.willAttend || "yes";
      }

      if (succeededEvents.length > 0) {
        try {
          await sendBatchConfirmationEmail(
            {
              fullName: body.fullName.trim(),
              email: body.email,
              dietaryRestrictions: body.dietaryRestrictions || "",
            },
            succeededEvents,
            guestCountMap,
            attendanceMap
          );
        } catch (err) {
          console.error("Failed to send batch confirmation email:", err);
        }
      }
    }

    if (allSucceeded) {
      return NextResponse.json({
        success: true,
        message: `Thank you! We've received your RSVP for ${succeededSlugs.length} event${succeededSlugs.length > 1 ? "s" : ""}. We can't wait to celebrate with you!`,
      });
    } else if (succeededSlugs.length > 0) {
      return NextResponse.json({
        success: true,
        message: `RSVP submitted for ${succeededSlugs.length} event${succeededSlugs.length > 1 ? "s" : ""}, but some failed. Please try again for the remaining events.`,
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to submit RSVP. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Batch RSVP error:", errMsg);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
