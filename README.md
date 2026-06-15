# ESC Young Professionals Bingo & Brews

A Vercel-ready React/Vite bingo caller and event display for ESC Young Professionals Bingo & Brews.

## Pages

- `/` — landing page
- `/audience` — TV/projector display
- `/host` — host controls
- `/admin` — editable settings

## Default Host/Admin Passcode

`bingo2026`

Change this in Vercel using the environment variable:

`VITE_HOST_PASSCODE`

## Local Preview

```bash
npm install
npm run dev
```

## Deploy to Vercel

Upload the contents of this folder to GitHub. In Vercel, import the GitHub repository and deploy.

If your files are inside a nested folder, set Vercel's Root Directory to that folder.

## Firebase Sync

The app works in local preview mode without Firebase. For multi-device sync, create a Firebase project with Firestore and add these Vercel environment variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Firestore document used:

`events/bingo-brews-2026`

## Sponsor Editing

Go to `/admin`, enter the passcode, and edit the JSON for sponsors, table sponsors, and beer break messages.

Logo paths included:

- `/assets/esyp-logo.png`
- `/assets/united-way.png`
- `/assets/crow-shields-bailey.png`
- `/assets/bankplus.jpg`
- `/assets/castle.png`
- `/assets/cockrells.jpg`
- `/assets/riviera.png`
- `/assets/fairhope-brewing.webp`
- `/assets/beer-break.jpg`
redeploy 
