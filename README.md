# wortlaut-frontend

Part of [Wortlaut](https://github.com/wortlauts/wortlaut), a search engine over German Bundestag speeches.

The web frontend: search, trend chart and speech detail pages. It talks only to [wortlaut-api](https://github.com/wortlauts/wortlaut-api) and generates its typed API client from the `openapi.json` of that repo. The user interface is German, everything else (code, routes, identifiers) is English.

> **Status:** project skeleton. The pages are still the generated starter page.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```powershell
npm install
npm run dev
```

The app runs on http://localhost:3000.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | development server |
| `npm run build` | production build |
| `npm run start` | serve the production build |
| `npm run lint` | ESLint |

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS.
