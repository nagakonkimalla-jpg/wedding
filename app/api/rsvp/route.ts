import { NextRequest, NextResponse } from "next/server";
import { appendRSVP, DuplicateError } from "@/lib/googleSheets";
import { getEvent } from "@/config/events";
import { sendConfirmationEmail } from "@/lib/sendConfirmationEmail";
import { RSVPFormData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: RSVPFormData = await request.json();

    // Validate required fields
    if (!body.fullName || !body.eventSlug) {
      return NextResponse.json(
        { success: false, message: "Full name and event are required." },
        { status: 400 }
      );
    }

    if (!body.willAttend) {
      return NextResponse.json(
        { success: false, message: "Please select whether you will attend." },
        { status: 400 }
      );
    }

    // Add timestamp
    const rsvpData: RSVPFormData = {
      ...body,
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
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
