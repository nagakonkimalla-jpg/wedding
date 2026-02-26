import { NextRequest, NextResponse } from "next/server";
import { appendRSVP, DuplicateError } from "@/lib/googleSheets";
import { getEvent } from "@/config/events";
import { sendConfirmationEmail } from "@/lib/sendConfirmationEmail";
import { RSVPFormData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: RSVPFormData = await request.json();

    // Validate required fields
    if (!body.fullName?.trim()) {
      return NextResponse.json(
        { success: false, message: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!body.eventSlug) {
      return NextResponse.json(
        { success: false, message: "Event information is missing. Please refresh and try again." },
        { status: 400 }
      );
    }

    if (!body.willAttend) {
      return NextResponse.json(
        { success: false, message: "Please select whether you will attend." },
        { status: 400 }
      );
    }

    // Validate number fields
    if (body.numberOfGuests != null && (isNaN(body.numberOfGuests) || body.numberOfGuests < 0 || body.numberOfGuests > 50)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid number of adults (0–50)." },
        { status: 400 }
      );
    }

    if (body.numberOfKids != null && (isNaN(body.numberOfKids) || body.numberOfKids < 0 || body.numberOfKids > 50)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid number of kids (0–50)." },
        { status: 400 }
      );
    }

    // Sanitize number fields
    const rsvpData: RSVPFormData = {
      ...body,
      fullName: body.fullName.trim(),
      numberOfGuests: Math.max(0, Math.round(body.numberOfGuests || 1)),
      numberOfKids: Math.max(0, Math.round(body.numberOfKids || 0)),
      timestamp: new Date().toISOString(),
    };

    await appendRSVP(rsvpData);

    // Send confirmation email (fire-and-forget — don't block RSVP response)
    if (rsvpData.email) {
      const event = getEvent(rsvpData.eventSlug);
      if (event) {
        sendConfirmationEmail(rsvpData, event).catch((err) => {
          console.error("Failed to send confirmation email:", err);
        });
      }
    }

    return NextResponse.json({
      success: true,
      message:
        body.willAttend === "yes"
          ? "Thank you! We can't wait to celebrate with you!"
          : "Thank you for letting us know. We'll miss you!",
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("RSVP submission error:", errMsg);

    // Provide a user-friendly message based on the error
    let userMessage = "Something went wrong. Please try again or contact us directly.";
    if (errMsg.includes("access denied") || errMsg.includes("Access Denied")) {
      userMessage = "Our RSVP system is temporarily unavailable. Please try again in a few minutes or contact us directly.";
    } else if (errMsg.includes("not configured")) {
      userMessage = "RSVP is not available right now. Please contact us directly to RSVP.";
    } else if (errMsg.includes("Apps Script error")) {
      userMessage = "There was an issue saving your RSVP. Please try again or contact us directly.";
    }

    return NextResponse.json(
      { success: false, message: userMessage },
      { status: 500 }
    );
  }
}
