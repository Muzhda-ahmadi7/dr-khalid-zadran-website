# Dr. Khalid Khan Zadran — Neurosurgeon Website

A trilingual (English / دری / پښتو) marketing and appointment site for a consultant neurosurgeon, built with React + Vite and styled with Tailwind CSS v4.

## Stack

- React 19 + React Router DOM
- Tailwind CSS v4 (Vite plugin)
- Motion (animations, reveal/scroll transitions)
- Lucide React (icons)
- Vite 6

## Features

- **Home** — hero with cut-out portrait, services overview, clinical gallery, professional profile
- **About / Services / Contact / Appointment** pages with animated route transitions
- **3 languages** with RTL support for دری and پښتو (language switcher in the navbar)
- **Strict i18n check** — every translated key must exist in all three dictionaries
- Accessible focus states, scroll progress bar, `prefers-reduced-motion` support

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build
```

## Checks

```bash
npm run check:i18n # verifies en/fa/ps dictionaries stay in sync
```

## Images

All photography lives in `public/images/` (doctor portraits, cut-out hero PNG, gallery photos). Confirm permission with the photo owner before publishing.

## Important content note

Only verified information may be used — do not invent qualifications, testimonials, or medical success claims. Review all professional content with the doctor before publishing.

The appointment form is a frontend demonstration only and does not store real patient data.
