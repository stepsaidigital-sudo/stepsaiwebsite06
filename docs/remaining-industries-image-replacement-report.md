# Remaining industry image replacements — 22 October 2026

Completed sequentially in the requested order:

| Page | Fresh images | Slots |
|---|---:|---|
| Real estate | 5 | Hero, three agent cards, story |
| Travel and hospitality | 5 | Hero, three agent cards, story |
| SaaS | 5 | Hero, three agent cards, story |
| Financial services | 5 | Hero, three agent cards, story |
| All industries | 1 | Hero; existing industry cards remain text-only |

21 fresh images were generated once each using the built-in image generator, with no reused photos or alternate generations. Every generated image was visually inspected for task relevance and visible faces. Scenes use empty environments or cropped hands; no visible faces. Different activities, settings and compositions distinguish the slots.

All outputs are WebP: agent cards are 960 × 720; hero and story images are 1200 × 900. Resolution, format and byte counts are recorded in `remaining-industries-generated-images.json`. Exact prompts are preserved in `remaining-industries-image-prompts.json`.

Changes are limited to image references, corresponding descriptive alt text, new assets and these records. Existing layout, CSS, copy, component structure, overlays and interactions are preserved. Source originals remain in the image-generator output folder.

## Verification

- All five routes were inspected at desktop 1280 × 720 and mobile 390 × 844.
- Images loaded successfully; no horizontal document overflow at either viewport.
- Agent-card and story crops were inspected in their existing containers. All-industries hero remains 440 × 330 on desktop and approximately 335 × 251 on mobile.
- All seven industry links remain on the hub.
- Desktop/mobile screenshots are saved in `docs/qa-remaining-industries/`.
- `npx.cmd tsc --noEmit --incremental false` passed.
- `git diff --check` passed.

Assets remain under `public/images/industries/` and use the existing asset-base mechanism. The manifest records corresponding `website/public/...` S3 keys. No production deployment or S3 upload was performed. Generated scenes are illustrative; this work does not represent legal clearance.
