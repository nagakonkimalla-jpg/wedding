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

    // Check for duplicates (by email or phone) within this event sheet
    var existingData = sheet.getDataRange().getValues();
    for (var i = 1; i < existingData.length; i++) {
      var rowPhone = String(existingData[i][2]).trim();
      var rowEmail = String(existingData[i][3]).trim().toLowerCase();

      if (data.email && rowEmail === data.email.toLowerCase()) {
        return ContentService.createTextOutput(
          JSON.stringify({ status: "duplicate", message: "Email already registered for this event" })
        ).setMimeType(ContentService.MimeType.JSON);
      }
      if (data.phone && rowPhone === data.phone) {
        return ContentService.createTextOutput(
          JSON.stringify({ status: "duplicate", message: "Phone already registered for this event" })
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }

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

    // Send confirmation email if email was provided
    if (data.email && data.email.trim() !== "") {
      sendConfirmationEmail(data);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "RSVP recorded successfully" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendConfirmationEmail(data) {
  var eventName = EVENT_NAMES[data.event] || data.event;
  var eventDate = EVENT_DATES[data.event] || "";
  var guestName = data.fullName || "Guest";
  var willAttend = data.willAttend === "yes";

  var subject = willAttend
    ? "RSVP Confirmed — " + eventName + " | Neelu & Aditya's Wedding"
    : "RSVP Received — " + eventName + " | Neelu & Aditya's Wedding";

  var htmlBody = '<!DOCTYPE html>'
    + '<html><head><meta charset="utf-8"></head>'
    + '<body style="margin:0;padding:0;background-color:#FFF8F0;font-family:Georgia,serif;">'
    + '<div style="max-width:600px;margin:0 auto;padding:40px 20px;">'

    // Header with logo
    + '<div style="text-align:center;padding-bottom:30px;border-bottom:2px solid #C5A028;">'
    + '<div style="width:80px;height:80px;margin:0 auto 15px auto;border-radius:50%;overflow:hidden;border:2px solid #C5A028;">'
    + '<img src="https://wedding-five-self-14.vercel.app/images/logo.png" alt="N & A" width="80" height="80" style="display:block;width:80px;height:80px;object-fit:cover;object-position:50% 42%;" />'
    + '</div>'
    + '<h1 style="font-size:36px;color:#8B1A1A;margin:0 0 5px 0;font-style:italic;">Neelu & Aditya</h1>'
    + '<p style="font-size:12px;color:#8B6914;letter-spacing:3px;text-transform:uppercase;margin:0;">Wedding Celebrations</p>'
    + '</div>'

    // Body
    + '<div style="padding:30px 0;text-align:center;">'
    + '<p style="font-size:18px;color:#3D1A1A;margin:0 0 5px 0;">Dear ' + guestName + ',</p>'
    + '<p style="font-size:15px;color:#5A3A3A;line-height:1.6;margin:15px 0;">'
    + (willAttend
        ? 'Thank you for confirming your attendance! We are thrilled that you will be joining us for the <strong>' + eventName + '</strong>.'
        : 'We received your RSVP for the <strong>' + eventName + '</strong>. We\'re sorry you won\'t be able to make it — you will be missed!')
    + '</p>'

    // Event details card
    + '<div style="background-color:#FFFFFF;border:2px solid #C5A02840;border-radius:12px;padding:25px;margin:25px 0;text-align:left;">'
    + '<h3 style="color:#8B1A1A;margin:0 0 15px 0;font-size:16px;text-transform:uppercase;letter-spacing:2px;">Your RSVP Details</h3>'
    + '<table style="width:100%;font-size:14px;color:#3D1A1A;border-collapse:collapse;">'
    + '<tr><td style="padding:6px 0;color:#8B6914;width:140px;">Event</td><td style="padding:6px 0;font-weight:bold;">' + eventName + '</td></tr>'
    + (eventDate ? '<tr><td style="padding:6px 0;color:#8B6914;">Date & Time</td><td style="padding:6px 0;">' + eventDate + '</td></tr>' : '')
    + '<tr><td style="padding:6px 0;color:#8B6914;">Attending</td><td style="padding:6px 0;">' + (willAttend ? 'Yes ✓' : 'No') + '</td></tr>'
    + '<tr><td style="padding:6px 0;color:#8B6914;">Guests</td><td style="padding:6px 0;">' + (data.numberOfGuests || 1) + ' adult(s)' + (data.numberOfKids > 0 ? ', ' + data.numberOfKids + ' kid(s)' : '') + '</td></tr>'
    + (data.dietaryRestrictions ? '<tr><td style="padding:6px 0;color:#8B6914;">Dietary</td><td style="padding:6px 0;">' + data.dietaryRestrictions + '</td></tr>' : '')
    + '</table>'
    + '</div>'

    + (willAttend
        ? '<p style="font-size:15px;color:#5A3A3A;line-height:1.6;">We look forward to celebrating with you!</p>'
        : '')

    + '</div>'

    // Decorative divider
    + '<div style="text-align:center;margin:10px 0 0 0;">'
    + '<span style="color:#C5A028;font-size:16px;">&#10022; &#10022; &#10022;</span>'
    + '</div>'

    // Footer
    + '<div style="text-align:center;padding-top:25px;border-top:1px solid #C5A02830;">'
    + '<p style="font-size:20px;color:#8B1A1A;font-style:italic;margin:0 0 5px 0;">With love & gratitude,</p>'
    + '<p style="font-size:14px;color:#8B6914;margin:0;">Neelu & Aditya</p>'
    + '<p style="font-size:12px;color:#8B6914;margin:10px 0 0 0;"><a href="https://wedding-five-self-14.vercel.app" style="color:#8B6914;text-decoration:underline;">View All Events</a></p>'
    + '<p style="font-size:11px;color:#999;margin:15px 0 0 0;">This is an automated confirmation. Please do not reply to this email.</p>'
    + '</div>'

    + '</div></body></html>';

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    htmlBody: htmlBody,
  });
}
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
