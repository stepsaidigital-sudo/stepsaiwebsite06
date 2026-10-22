# Homepage image replacement — 22 October 2026

Homepage implementation complete. Other pages have an inventory and replacement schedule, but their image replacements are not complete.

## Delivered

21 AI-generated WebP assets: seven product/industry images and fourteen distinct closing-mosaic scenes. Generation briefs, source dimensions, output dimensions, byte sizes and planned S3 keys are in `homepage-generated-images.json`.

| Asset group | Count | Export resolution |
|---|---:|---|
| Homeware vase | 1 | 1536 × 1024 |
| Industry cards | 4 | 1254 × 1254 |
| Jewellery products | 2 | 640 × 640 |
| Landscape mosaic scenes | 12 | 960 × 720 |
| Portrait mosaic scenes | 2 | 640 × 1440 |

All website exports are WebP, with no upscaling. Sources were visually reviewed for visible faces. Composition varies between product photography, activity details, interiors, architecture and operational scenes. Reuse of the same product within shopping demonstrations preserves story continuity. Portrait avatars were replaced by initials in the existing avatar containers.

Existing layout, global CSS, animation logic and component structure are preserved. Three existing WebP files were replaced in place; other pages referencing those shared files also receive the new imagery. Existing industry PNGs remain available for pages outside this scope.

## Verification

- Homepage served successfully at `http://127.0.0.1:3010/`.
- Desktop review at 1280 × 720; mobile layout reviewed in a 390px-wide frame, with screenshots and measurements in `qa-homepage-images/`.
- Reviewed hero products, all four industry tabs, jewellery journey, website setup, campaign tabs, team tabs, testimonials and closing mosaic.
- All fourteen desktop mosaic assets loaded; mobile visible tiles loaded and existing hidden-tile behavior remained intact.
- No horizontal overflow in the checked settled desktop view; no captured browser console errors.
- TypeScript check passed: `npx tsc --noEmit --incremental false`.
- `git diff --check` passed.
- Targeted ESLint remains blocked by an existing `react-hooks/set-state-in-effect` error in `app/team-story.tsx` (the auto-advance effect). Confirmed the same statement exists in HEAD. Unrelated animation logic was left intact.
- Production build and deployment were not verified in this pass.

## Asset hosting

The existing `asset()` helper and `NEXT_PUBLIC_ASSET_URL` convention are retained. Configure the base as `<bucket URL>/website/public` and upload assets at the relative paths recorded in the manifest. No S3 upload or production publication was performed.

## Remaining work and efficient execution

Use `image-page-schedule.csv` and `image-page-audit.md` for remaining routes. Before each batch, resolve shared assets and existing suitable generated images, then generate only the missing unique scenes. Preserve industry relevance and variation; do not generate a new asset for every reference to the same image. Check each changed image's format, resolution, loading and actual crop. Reserve broad application checks for code or layout changes.

The manifest records generation brief summaries and provenance, not legal clearance or verbatim prompt transcripts.
