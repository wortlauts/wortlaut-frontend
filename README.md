# wortlaut-frontend

Part of [Wortlaut](https://github.com/wortlauts/wortlaut), a search engine over German Bundestag speeches.

The web frontend: search with highlighted hits, filters, a trend chart and speech pages. It talks only to [wortlaut-api](https://github.com/wortlauts/wortlaut-api) and uses a typed client generated from the `openapi.json` of that repo. The user interface is German, everything else (code, routes, identifiers) is English.

## Pages

| Route | Content |
| --- | --- |
| `/` | start page with the search box |
| `/search` | hits with highlights, filters (faction, reaction, legislative period, dates, speaker), sorting, trend chart, paging. The whole state is in the URL, so every result page can be shared. |
| `/speeches/{id}` | one speech with reactions, source link and attribution |
| `/about` | sources, rights and known limits |

## Requirements

- Node.js 20.9 or newer
- npm
- a running [wortlaut-api](https://github.com/wortlauts/wortlaut-api) (which needs the Elasticsearch stack from [wortlaut-infra](https://github.com/wortlauts/wortlaut-infra) and imported speeches)

## Run locally

Start the API on port 5080, then:

```powershell
npm install
npm run dev
```

The app runs on http://localhost:3000.

## Configuration

| Variable | Default | Meaning |
| --- | --- | --- |
| `API_URL` | `http://localhost:5080` | base URL of the API. The server renders pages with it, and the browser reaches it through the `/api` proxy of the app, so the API needs no CORS settings. |
| `SITE_URL` | `http://localhost:3000` | public URL of the site, used for link previews |

Next.js reads them from the environment or from a `.env.local` file. Copy `.env.example` to `.env.local` to change them; `.env.local` is not committed.

## API client

`openapi/openapi.json` is a pinned copy of the contract in `wortlaut-api`. The types in `src/api/schema.d.ts` are generated from it:

```powershell
npm run generate:api
```

When the API contract changes, copy its `openapi.json` here first and regenerate.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | development server |
| `npm run build` | production build |
| `npm run start` | serve the production build |
| `npm run lint` | ESLint |
| `npm run generate:api` | regenerate the API types |

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, openapi-fetch. Fonts, colours and icons come from the brand kit in the meta repo.
