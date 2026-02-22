# Deployment Guide

Complete guide for deploying the Neelu & Aditya Wedding Events website.

---

## 1. Prerequisites

- **Node.js** 18+ (check with `node -v`)
- **npm** package manager
- **Vercel** account (for hosting) — [vercel.com](https://vercel.com)
- **Git** (optional, for version control)

---

## 2. Local Development Setup

```bash
# Navigate to project
cd wedding

# Install dependencies
npm install

# Create local environment file
cp .env.template .env.local

# Fill in the Google Apps Script URL (see Google Sheets Setup below)
# Then start the dev server
npm run dev
```

The site will be available at `http://localhost:3000`.

---

## 3. Google Sheets Setup

See the dedicated [Google Sheets Setup Guide](./GOOGLE_SHEETS_SETUP.md) for detailed step-by-step instructions.

**Quick summary:**

1. Create a new Google Sheet named "Wedding RSVPs"
2. Add the header row:

   | Timestamp | Full Name | Phone | Email | Number of Guests | Number of Kids | Will Attend | Dietary Restrictions | Message | RSVP Side | Event |
   |-----------|-----------|-------|-------|------------------|----------------|-------------|----------------------|---------|-----------|-------|

3. Go to Extensions > Apps Script, paste the provided script
4. Deploy as a Web App (Execute as: Me, Access: Anyone)
5. Copy the Web App URL

---

## 4. Environment Variables

Create a `.env.local` file in the project root:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

| Variable | Description |
|----------|-------------|
| `GOOGLE_APPS_SCRIPT_URL` | The Web App URL from your Google Apps Script deployment |

---

## 5. Deploying to Vercel

### Current Deployment

The site is deployed at: **https://wedding-five-self-14.vercel.app**

Event pages:
- `/events/upanayanam` — Upanayanam (April 18)
- `/events/haldi` — Haldi Ceremony (April 19)
- `/events/sangeeth` — Sangeeth Night (April 21)
- `/events/pellikuthuru` — Pellikuthuru (April 22)
- `/events/pellikoduku` — Pellikoduku (April 22)
- `/events/pelli` — Pelli / The Wedding (April 23)
- `/events/satyanarayana-swami-vratam` — Satyanarayana Swami Vratam (April 24)

### Redeploying After Changes

```bash
# Deploy to production
vercel --prod

# Or just preview first
vercel
```

### Setting Environment Variables on Vercel

1. Go to https://vercel.com/nagakonkimalla-9804s-projects/wedding/settings
2. Navigate to **Settings > Environment Variables**
3. Add:
   - **Name:** `GOOGLE_APPS_SCRIPT_URL`
   - **Value:** Your Web App URL
4. Save and redeploy

### Custom Domain (Optional)

1. In the Vercel dashboard, go to your project **Settings > Domains**
2. Add your custom domain (e.g., `neeluandaditya.com`)
3. Update your domain's DNS records as instructed by Vercel
4. Vercel will automatically provision an SSL certificate

---

## 6. Customizing Events

### Editing Event Details

All event configuration lives in `config/events.ts`. Each event includes:

- `title`, `subtitle`, `tagline` — display text
- `date`, `time` — when the event takes place
- `venue`, `venueAddress`, `googleMapsUrl` — location details
- `venueImage` — optional image of the venue (shown on venue card)
- `dressCode` — optional dress code
- `description` — longer description shown on the event page
- `theme` — color scheme (`primary`, `secondary`, `accent`, `bg`, `cardBg`, `text`, `gradient`)
- `heroImage` — main banner image path
- `galleryImages` — array of image paths for the gallery section
- `decorativeEmoji` — emoji shown as floating decoration
- `hasRsvpSide` — if `true`, the RSVP form shows a bride/groom side selector

### Changing Event Order

Edit the `eventOrder` array in `config/events.ts` to control the order events appear on the homepage.

---

## 7. Adding Personal Photos

### Directory Structure

Place photos in `public/images/`:

```
public/images/
  shared/           # Photos used across multiple events
    DSC05984.jpg
    DSC05872.jpg
    ...
  pelli/            # Wedding-specific photos
    DSC05926-2.jpg
    ...
  decor/            # Decorative overlays (gold mandala, etc.)
    gold-mandala.png
    gold-flower-corner.png
    ...
  logo.png          # N&A monogram logo
  ganesha.png       # Lord Vinayaka hero image
  temple.jpg        # Hindu Temple of Atlanta venue image
```

### Updating Config

After adding photos, update the image paths in `config/events.ts`:

```ts
heroImage: "/images/pelli/your-hero-photo.jpg",
galleryImages: [
  "/images/pelli/photo-1.jpg",
  "/images/pelli/photo-2.jpg",
  "/images/pelli/photo-3.jpg",
],
venueImage: "/images/temple.jpg",  // optional
```

### Recommended Image Sizes

| Image Type | Recommended Size | Notes |
|------------|------------------|-------|
| Hero Image | 1920 x 1080 px | Landscape, used as banner |
| Gallery Image | 800 x 600 px | Can be landscape or portrait |
| Venue Image | 800 x 500 px | Landscape, shown in venue card |

### Image Tips

- Use `.jpg` or `.webp` for best performance
- Compress images before adding (use tools like [Squoosh](https://squoosh.app/))
- Keep file names lowercase with hyphens (e.g., `bride-portrait.jpg`)
- Next.js will serve images from `public/` at the root path (`/images/...`)
