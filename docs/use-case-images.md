# Use case image handoff

14 generated editorial images were added on 21 October 2026. These illustrate fictional scenarios; they are not customer portraits, endorsements, or product screenshots.

The existing layout, rounded masks, image container sizes, and marketing copy are preserved. The only demo text corrections align consultation duration and lead identity with the source conversations.

## Assets

All files are in `public/photos/use-cases/`. Pages serve the optimized WebP files; matching PNG files preserve the generated originals.

| WebP file | Placement |
| --- | --- |
| sales.webp | AI sales agent hero |
| support.webp | AI support agent hero |
| lead-capture.webp | AI lead capture agent hero |
| booking.webp | AI booking agent hero |
| receptionist.webp | AI receptionist hero |
| marketing.webp | AI marketing agent hero |
| industry-ecommerce.webp | Ecommerce messaging examples |
| industry-healthcare.webp | Healthcare messaging examples |
| industry-education.webp | Education messaging examples |
| industry-realestate.webp | Real estate messaging examples |
| call-ecommerce.webp | Ecommerce receptionist example |
| call-healthcare.webp | Healthcare receptionist example |
| call-education.webp | Education receptionist example |
| call-realestate.webp | Real estate receptionist example |

The eight industry images populate all 24 industry examples: four industries on each of the six use case pages. Messaging pages share the four industry enquiry scenes. The receptionist uses four distinct scenes showing actual phone calls.

## Implementation

- `components/templates/agent-page.tsx`: six hero references and image descriptions.
- `components/templates/usecase-images.ts`: industry photo selections and descriptive alternative text.
- `components/templates/agent-industries.tsx`: applies the selections to existing scenarios, without changing their conversations.
- `components/premium/kit.tsx`: renders each industry's alternative text.

WebP assets total 1,646,360 bytes. Thirteen portraits are 1122 by 1402 pixels; the sales photograph is 1200 by 800 pixels. Existing CSS controls responsive cropping.

## Validation

- Scoped TypeScript validation for the use case routes and their imported components passed.
- All six hero paths and eight industry selections resolve to saved image files.
- Generated PNGs and WebPs decode successfully.
- Browser rendering was not verified: the local preview connection timed out.
- Whole-project TypeScript validation is blocked by a pre-existing missing `content/site/clients.json` import in `components/site/client-wall.tsx`.
