import { NextRequest, NextResponse } from "next/server";
import { appendRSVP, DuplicateError } from "@/lib/googleSheets";
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

    return NextResponse.json({
      success: true,
      message:
        body.willAttend === "yes"
          ? "Thank you! We can't wait to celebrate with you!"
          : "Thank you for letting us know. We'll miss you!",
    });
  } catch (error) {
    if (error instanceof DuplicateError) {
      return NextResponse.json(
        {
          success: false,
          message:
            "It looks like you've already RSVP'd for this event. If you need to update your response, please contact us directly.",
        },
        { status: 409 }
      );
    }

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
