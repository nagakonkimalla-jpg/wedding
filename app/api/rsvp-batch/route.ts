import { NextRequest, NextResponse } from "next/server";
import { appendRSVP } from "@/lib/googleSheets";
import { getEvent } from "@/config/events";
import { sendBatchConfirmationEmail } from "@/lib/sendBatchConfirmationEmail";
import { RSVPFormData } from "@/types";

interface BatchRSVPBody {
  fullName: string;
  phone: string;
  email: string;
  numberOfGuests: number;
  numberOfKids: number;
  dietaryRestrictions: string;
  message: string;
  eventSlugs: string[];
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

    if (!body.eventSlugs || body.eventSlugs.length === 0) {
      return NextResponse.json(
        { success: false, message: "Please select at least one event." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const results: { slug: string; success: boolean; error?: string }[] = [];

    // Submit RSVP for each selected event to Google Sheets
    for (const slug of body.eventSlugs) {
      const rsvpData: RSVPFormData = {
        fullName: body.fullName.trim(),
        phone: body.phone || "",
        email: body.email || "",
        numberOfGuests: Math.max(0, Math.round(body.numberOfGuests || 1)),
        numberOfKids: Math.max(0, Math.round(body.numberOfKids || 0)),
        willAttend: "yes",
        dietaryRestrictions: body.dietaryRestrictions || "",
        message: body.message || "",
        eventSlug: slug,
        timestamp,
      };

      try {
        await appendRSVP(rsvpData);
        results.push({ slug, success: true });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`RSVP failed for ${slug}:`, msg);
        results.push({ slug, success: false, error: msg });
      }
    }

    const allSucceeded = results.every((r) => r.success);
    const succeededSlugs = results.filter((r) => r.success).map((r) => r.slug);

    // Send ONE consolidated confirmation email
    if (body.email && succeededSlugs.length > 0) {
      const events = succeededSlugs
        .map((slug) => getEvent(slug))
        .filter(Boolean);

      if (events.length > 0) {
        sendBatchConfirmationEmail(
          {
            fullName: body.fullName.trim(),
            email: body.email,
            numberOfGuests: body.numberOfGuests || 1,
            numberOfKids: body.numberOfKids || 0,
            dietaryRestrictions: body.dietaryRestrictions || "",
          },
          events as import("@/types").EventInfo[]
        ).catch((err) => {
          console.error("Failed to send batch confirmation email:", err);
        });
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
