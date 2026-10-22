# Channel image replacement — 22 October 2026

Completed Website, WhatsApp, Instagram and Messenger channel pages in that order. Each template has one photographic hero slot; industry examples and handoff sections retain their existing photo-free layout.

| Page | New scene | WebP resolution | Bytes |
| --- | --- | --- | --- |
| Website | Evening furniture shopping with website chat | 1200 × 900 | 96406 |
| WhatsApp | Messaging about a ceramic gift delivery | 1200 × 900 | 154630 |
| Instagram | Styling linen for a product Reel | 1200 × 900 | 171668 |
| Messenger | Local shop page and customer message | 1200 × 900 | 162254 |

Four built-in image_gen calls, one per slot, no variants or retries. Fresh scenes have no visible faces. Existing handoff portrait avatars become initials in the same containers. The existing ceramic product thumbnail now references its previously generated WebP equivalent. Brand logos remain unchanged.

No CSS, page copy, section order, dimensions or animation changes. Image paths still use the existing asset() helper. Asset metadata and future S3 keys are recorded in channel-generated-images.json; no S3 upload was performed. Exact prompts are saved in channel-image-prompts.json.

## Verification

- All four hero files decoded as WebP at 1200 × 900.
- All four pages inspected at 1280px desktop and 390px mobile width: hero images loaded, no horizontal overflow, zero .face-img portrait elements.
- Existing mobile phone overlay remains in front of the photographs, as designed.
- Desktop/mobile screenshots saved under docs/qa-channel-images/.
- TypeScript: npx.cmd tsc --noEmit --incremental false passed.
- git diff --check passed (existing line-ending warning only).

Assets: public/images/channels/{website,whatsapp,instagram,messenger}/.
