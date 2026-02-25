# Content Editing Guide: Pelli Page

This guide explains where to update the content, texts, images, and links for the Pelli (Wedding) page, ensuring you don't break the new cinematic layout.

## 1. Core Event Data (Names, Dates, Times, Venues)
All the core content for the event is stored centrally in the configuration file.

**File to edit:** `config/events.ts`
Locate the `pelli:` object within this file. You can change:
- `title` (e.g. "The Wedding")
- `subtitle` (e.g. "Hyderabad to Atlanta")
- `date` and `time`
- `venue` and `venueAddress`
- `description`
- `googleMapsUrl`

## 2. Pelli Hero Scene
The Pelli Hero scene is constructed via `components/PelliHeroSection.tsx`.

- **To change the layer assets** (skyline, frame, ganesha): These SVGs are loaded directly from `/public/assets/svg/pelli/`. You can replace the SVG files in that folder with identical file names, but ensure they retain their transparency for the parallax to work.
- **Background Gradient:** Located in `PelliHeroSection.tsx` Layer 1 `div`.
- **Text Layers:** The text pulls directly from `config/events.ts`, but the Framer Motion animation timings (e.g., when the text fades or scales down upon scrolling) are defined via `useTransform` in `components/PelliHeroSection.tsx`.

## 3. RSVP and Map Links
- The exact Google Maps URL is pulled from the `googleMapsUrl` property in `config/events.ts`.
- The RSVP form is rendered dynamically by the `RSVPForm.tsx` component, inheriting the theme of the page. You do not need to modify the Pelli component directly for RSVP changes unless you are changing global form fields.

## 4. Theme Colors and Variables
The rich traditional color palette for the Pelli page is defined using CSS variables that activate when `data-theme="pelli"` is applied.

**File to edit:** `app/globals.css`
Locate the `[data-theme="pelli"]` block:
- `--bg-primary`: The warm ivory background.
- `--text-primary`: The deep maroon text color.
- `--accent-primary`: The gold accent color.
- `--theme-gradient`: The atmospheric fade at the top of the hero.

Modify these hex codes to adjust the overall tone without breaking the layout.

## 5. Ambient Audio
The ambient track is loaded by the `AmbientAudio` component wrapping the page.

**File to replace audio:** `public/audio/ambient_bells.ogg`
Simply drop your preferred mp3 or ogg file here and update the `audioPath` prop in `app/events/pelli/page.tsx` if you change the format from `.ogg` to `.mp3`.
