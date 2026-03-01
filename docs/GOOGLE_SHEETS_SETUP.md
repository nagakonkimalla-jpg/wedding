# Google Sheets Setup Guide (Free, No Google Cloud Needed)

This guide uses **Google Apps Script** — a free, zero-setup approach that writes RSVPs directly to your personal Google Sheet. No Google Cloud account, no API keys, no service accounts.

---

## Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/) (sign in with your Gmail)
2. Click **"+ Blank spreadsheet"**
3. Name it **"Wedding RSVPs"**

---

## Step 2: Leave the Sheet Empty

You do **not** need to add headers manually. The script automatically creates a **separate tab for each event** (Haldi Ceremony, Sangeeth Night, Pelli, etc.) the first time someone RSVPs. Each tab gets its own header row:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Full Name | Phone | Email | Number of Guests | Number of Kids | Will Attend | Dietary Restrictions | Message | RSVP Side |

You can delete the default "Sheet1" tab after RSVPs start coming in.

---

## Step 3: Open Apps Script

1. In your Google Sheet, click **Extensions > Apps Script**
2. This opens the script editor in a new tab
3. Delete any existing code in the editor

---

## Step 4: Paste the Script

Copy and paste this entire script into the editor:

```javascript
// Event display names for the confirmation email
var EVENT_NAMES = {
  "haldi": "Haldi Ceremony",
  "karthik-upanayanam": "Karthik's Upanayanam",
  "mehendi": "Mehendi",
  "sangeeth": "Sangeeth Night",
  "pellikuthuru": "Pellikuthuru",
  "pellikoduku": "Pellikoduku",
  "aditya-upanayanam": "Aditya's Upanayanam",
  "pelli": "Pelli — The Wedding",
  "satyanarayana-swami-vratam-aditya": "Satyanarayana Swami Vratam (Groom's Side)",
  "satyanarayana-swami-vratam-neelu": "Satyanarayana Swami Vratam (Bride's Side)"
};

// Event dates for the confirmation email
var EVENT_DATES = {
  "haldi": "Sunday, April 19, 2026 · 10:00 AM - 1:00 PM",
  "karthik-upanayanam": "Monday, April 20, 2026 · 8:00 AM - 12:00 PM",
  "mehendi": "Monday, April 20, 2026 · 5:00 PM - 10:00 PM",
  "sangeeth": "Tuesday, April 21, 2026 · 6:00 PM - 11:00 PM",
  "pellikuthuru": "Wednesday, April 22, 2026 · 9:00 AM - 12:00 PM",
  "pellikoduku": "Wednesday, April 22, 2026 · 9:00 AM - 12:00 PM",
  "aditya-upanayanam": "Wednesday, April 22, 2026 · 7:00 AM - 12:00 PM",
  "pelli": "Thursday, April 23, 2026 · 8:00 AM - 2:00 PM",
  "satyanarayana-swami-vratam-aditya": "Saturday, April 25, 2026 · 9:00 AM - 1:00 PM",
  "satyanarayana-swami-vratam-neelu": "Sunday, April 26, 2026 · 9:00 AM - 1:00 PM"
};

// Header row for every event sheet
var HEADERS = ["Timestamp", "Full Name", "Phone", "Email", "Number of Guests", "Number of Kids", "Will Attend", "Dietary Restrictions", "Message", "RSVP Side"];

// Get or create a sheet tab for the given event slug
function getEventSheet(eventSlug) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tabName = EVENT_NAMES[eventSlug] || eventSlug;
  var sheet = ss.getSheetByName(tabName);

  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getEventSheet(data.event);

    // Duplicate check removed — allow multiple RSVPs per person
    // (useful for updating attendance, guest count, etc.)

    // Append the new RSVP row to the event-specific sheet
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.fullName || "",
      data.phone || "",
      data.email || "",
      data.numberOfGuests || 1,
      data.numberOfKids || 0,
      data.willAttend || "",
      data.dietaryRestrictions || "",
      data.message || "",
      data.rsvpSide || "N/A",
    ]);

    // Email confirmation is handled by the web app (nodemailer), not Apps Script.
    // If you want Apps Script to also send emails via MailApp, uncomment below:
    // if (data.email && data.email.trim() !== "") {
    //   sendConfirmationEmail(data);
    // }

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "RSVP recorded successfully" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// NOTE: The sendConfirmationEmail function below is commented out because
// the web app handles confirmation emails via nodemailer (lib/sendConfirmationEmail.ts).
// Uncomment only if you want Apps Script to send emails instead of (or in addition to) the web app.

// function sendConfirmationEmail(data) {
//   var eventName = EVENT_NAMES[data.event] || data.event;
//   var eventDate = EVENT_DATES[data.event] || "";
//   var guestName = data.fullName || "Guest";
//   var willAttend = data.willAttend === "yes";
//
//   var subject = willAttend
//     ? "RSVP Confirmed — " + eventName + " | Neelu & Aditya's Wedding"
//     : "RSVP Received — " + eventName + " | Neelu & Aditya's Wedding";
//
//   var htmlBody = '<!DOCTYPE html>'
//     + '<html><head><meta charset="utf-8"></head>'
//     + '<body style="margin:0;padding:0;background-color:#FFF8F0;font-family:Georgia,serif;">'
//     + '<div style="max-width:600px;margin:0 auto;padding:40px 20px;">'
//     + '<div style="text-align:center;padding-bottom:30px;border-bottom:2px solid #C5A028;">'
//     + '<h1 style="font-size:36px;color:#8B1A1A;margin:0 0 5px 0;font-style:italic;">Neelu & Aditya</h1>'
//     + '<p style="font-size:12px;color:#8B6914;letter-spacing:3px;text-transform:uppercase;margin:0;">Wedding Celebrations</p>'
//     + '</div>'
//     + '<div style="padding:30px 0;text-align:center;">'
//     + '<p style="font-size:18px;color:#3D1A1A;margin:0 0 5px 0;">Dear ' + guestName + ',</p>'
//     + '<p style="font-size:15px;color:#5A3A3A;line-height:1.6;margin:15px 0;">'
//     + (willAttend
//         ? 'Thank you for confirming! We are thrilled you will be joining us for <strong>' + eventName + '</strong>.'
//         : 'We received your RSVP for <strong>' + eventName + '</strong>. You will be missed!')
//     + '</p>'
//     + '</div>'
//     + '</div></body></html>';
//
//   MailApp.sendEmail({
//     to: data.email,
//     subject: subject,
//     htmlBody: htmlBody,
//   });
// }
```

---

## Step 5: Deploy as Web App

1. Click **Deploy > New deployment** (top right)
2. Click the gear icon next to "Select type" and choose **"Web app"**
3. Fill in:
   - **Description:** `Wedding RSVP Handler`
   - **Execute as:** `Me` (your Gmail account)
   - **Who has access:** `Anyone`
4. Click **Deploy**
5. Click **Authorize access** and follow the prompts:
   - Choose your Google account
   - If you see "Google hasn't verified this app", click **Advanced > Go to Wedding RSVP Handler (unsafe)** — this is safe because YOU wrote the script
   - Click **Allow**
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

---

## Step 6: Configure Your Website

### For Local Development

Create a `.env.local` file in your project root:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### For Vercel Deployment

1. Go to your Vercel project dashboard: https://vercel.com/nagakonkimalla-9804s-projects/wedding/settings
2. Navigate to **Settings > Environment Variables**
3. Add:
   - **Name:** `GOOGLE_APPS_SCRIPT_URL`
   - **Value:** Your Web App URL from Step 5
4. Save and **redeploy** (Deployments tab > click "..." on latest > Redeploy)

---

## Step 7: Test It

1. Go to any live event page, e.g.:
   - https://wedding-five-self-14.vercel.app/events/haldi
   - https://wedding-five-self-14.vercel.app/events/pelli
2. Submit a test RSVP
3. Check your Google Sheet — the RSVP should appear as a new row!

---

## RSVP Data Columns

Each event tab has these columns:

| Column | Field | Description |
|--------|-------|-------------|
| A | Timestamp | ISO date/time of submission |
| B | Full Name | Guest's full name (required) |
| C | Phone | Phone number |
| D | Email | Email address |
| E | Number of Guests | How many adults attending (default 1) |
| F | Number of Kids | How many children attending (default 0) |
| G | Will Attend | "yes" or "no" |
| H | Dietary Restrictions | Allergies or dietary needs |
| I | Message | Personal message for the couple |
| J | RSVP Side | "pellikuthuru" (bride) or "pellikoduku" (groom) or "N/A" |

---

## Managing Your RSVPs

- Each event gets its **own tab** (Haldi Ceremony, Karthik's Upanayanam, Mehendi, Sangeeth Night, Pellikuthuru, Pellikoduku, Aditya's Upanayanam, Pelli, Satyanarayana Swami Vratam Groom's Side, Satyanarayana Swami Vratam Bride's Side)
- Tabs are auto-created on first RSVP — no manual setup needed
- Click a tab at the bottom of the sheet to see RSVPs for that event
- Export individual tabs or the whole sheet from File > Download
- To get total headcount per event: sum "Number of Guests" + "Number of Kids" columns in that tab

---

## Updating the Script

If you need to update the Apps Script:

1. Go to your Google Sheet > Extensions > Apps Script
2. Edit the code
3. Click **Deploy > Manage deployments**
4. Click the pencil icon on your deployment
5. Under "Version", select **"New version"**
6. Click **Deploy**

**Important:** The URL stays the same after updates — no need to change your env variable.

---

## Troubleshooting

### "TypeError: Cannot read properties of null"
- Make sure the Google Sheet has at least the header row (Row 1)

### RSVP form shows error but no data in sheet
- Check that the Web App URL is correct in your `.env.local` or Vercel env vars
- Make sure you deployed with "Who has access: Anyone"

### "Authorization required"
- Re-authorize: Go to Apps Script > Deploy > Manage deployments > re-deploy

### Want separate tabs per event?
- You can modify the Apps Script to write to different tabs based on the `data.event` field
- Change `getActiveSheet()` to `getSheetByName(data.event)` and create matching tabs
