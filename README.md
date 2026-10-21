# Steps AI website

Marketing site for Steps AI, built with Next.js (App Router).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Layout

- `app/` — routes (App Router) and page-level styles
- `components/` — site shell, templates, sections, and UI pieces
- `content/` — page copy and data
- `public/` — images, logos, photos
- `docs/` — photo credits

## Environment

- `DEMO_REQUEST_WEBHOOK_URL` — where `/api/demo-request` forwards Book-a-Demo submissions (HubSpot, Slack, Zapier, etc.). Without it the form reports that it is not configured.
