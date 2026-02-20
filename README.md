# 🏠 Flat Handover Checklist

A mobile-friendly web app for conducting flat/apartment handover inspections. Built with React + Vite.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **9 Room Sections** — Drawing Room, Kitchen, Master Bedroom, Master Bathroom, Guest Bedroom, Guest Bathroom, Kids Room, Common Bathroom, General
- **135 Inspection Items** — Doors, tiles, paint, plumbing, electrical, fixtures, and more
- **Pass / Fail / N/A Toggle** — Quick status marking for each item
- **Remarks Field** — Add notes or observations per item
- **Live Progress Dashboard** — Real-time pass/fail/pending counts
- **Room Navigation** — Sticky pill navigation for quick room jumping
- **Smart Filters** — View all items, pending only, or failed only
- **Report Generation** — Download a full HTML inspection report with:
  - Project & flat details
  - Inspector information
  - Summary statistics
  - Failed items highlight section
  - Room-wise detailed breakdown
  - Signature blocks

## Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/flat-handover-checklist.git
cd flat-handover-checklist

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder. You can deploy it to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push this repo to GitHub
2. Import it in [Vercel](https://vercel.com)
3. Deploy — done!

## Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

npm run build
npm run deploy
```

## Project Structure

```
flat-handover-checklist/
├── index.html          # Entry HTML
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuration
├── .gitignore
├── README.md
└── src/
    ├── main.jsx        # React entry point
    └── App.jsx         # Main application component
```

## Tech Stack

- **React 18** — UI framework
- **Vite 6** — Build tool & dev server
- **Vanilla CSS** — No external CSS framework (zero bloat)
- **Mobile-first design** — Optimized for on-site inspections on phones

## Customization

To modify the checklist items, edit the `CHECKLIST_DATA` array in `src/App.jsx`. Each item has:

```js
{
  sl: 1,                              // Serial number
  room: "Drawing Room",               // Room name
  desc: "Main Door - Polish & Finish", // Description
  expected: "Smooth finish, no scratches" // Expected observation
}
```

## License

MIT
