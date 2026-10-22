# Integration page refresh

Updated 22 October 2026. Shopify's dedicated template is retained; the other 20 integration routes now use IntegrationDetail with the shared Shopify visual styles.

## Pages

Google Calendar, Calendly, Cal.com, Outlook Calendar, Square Appointments, HubSpot, Zendesk, Shiprocket, Delhivery, DTDC, iThink Logistics, WareIQ, WooCommerce, Airtable, Google Sheets, Google Drive, Notion, Slack, Outlook and Klaviyo.

## Changes

- Brand-consistent photo hero, original title and copy, illustrative customer question and reply.
- Distinct existing WebP image per integration; mapping and descriptive alt text in components/templates/integration-images.ts. No new generation credits used. Some scenes show hands; none show faces. Contact sheet reviewed in docs/qa-integrations/image-review.png.
- Actual per-page capability copy, workflows and three setup instructions retained from the content files.
- Numbered vertical How to connect checklist replaces the generic ConnectFlow simulation.
- Deep pages have manually selectable customer journeys with next/restart controls. Standard pages show the original illustrative conversation beside its connected-tool record.
- Existing FAQ, demo action, CTA and asset URL helper retained. No backend connection behavior changed and no new capability claims added.

## Validation

- TypeScript no-emit check passed.
- All 20 routes checked at 1440px and 390px: heading rendered, three setup steps, no page overflow.
- Hero assets loaded; four initial checks were taken before image load and were confirmed loaded on the mobile pass.
- Shared journey next-step control checked on Google Calendar; standard record and setup sections visually reviewed separately.
- Runtime page checks recorded in docs/qa-integrations/routes.json. This is local verification, not a deployment or integration-backend test.
