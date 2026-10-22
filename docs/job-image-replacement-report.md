# Job page image replacements — 22 October 2026

Completed in the requested order: Sales, Support, Lead capture, Booking.

| Page | Fresh photos | Slots |
|---|---:|---|
| AI sales agent | 7 | Hero, four industry examples, catalogue, bulk-order handoff |
| AI support agent | 6 | Hero, four industry examples, replacement handoff |
| AI lead capture agent | 7 | Hero, four industry examples, saved enquiry, callback handoff |
| AI booking agent | 6 | Hero, four industry examples, front-desk handoff |

All 26 images were generated individually using the built-in image generator, without alternate generations. Each image was visually inspected. No visible faces, portraits or logos were included; some scenes show cropped hands. Industry scenes are selected per job, replacing the previous shared imagery for these four routes only.

Files are in `public/images/jobs/<page>/`. All are WebP at 1200 × 900. Exact prompts are in `job-image-prompts.json`; dimensions, byte counts, original source paths and S3 keys are in `job-generated-images.json`. The existing catalogue product thumbnails now use the fresh catalogue WebP consistently; repeated references represent the same sample products.

Handoff avatar circles use initials on these four pages. Existing layout classes, sizing, copy, chat demonstrations, tab interactions and animation remain unchanged. Photo selection has a small dedicated map, keeping it separate from the existing scenario content. No CSS was edited.

## Verification

- TypeScript: `npx.cmd tsc --noEmit --incremental false` passed.
- `git diff --check` passed.
- All 26 image files were decoded to verify WebP format and 1200 × 900 resolution, and returned HTTP 200 from the local server. Results: `qa-job-images/asset-checks.json`.
- All four industry tabs on each page were selected and their job-specific image paths verified.
- Desktop 1280 × 720 and mobile 390 × 844 checks found no horizontal overflow. Representative hero, industry and story crops were inspected.
- Handoff face thumbnails are absent on all four pages.
- Screenshots are saved in `docs/qa-job-images/`.

Assets use the existing `asset()` helper and `website/public/images/jobs/...` S3 keys. This is a local repository update; no S3 upload or production deployment was performed.
