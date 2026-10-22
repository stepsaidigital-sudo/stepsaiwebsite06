# Healthcare image replacement — 22 October 2026

Completed `/solutions/healthcare/` with five fresh, distinct photographs. No reused images. Existing layout, CSS, copy, card structure and interactions retained; only image paths and the calendar story's alt description changed.

| Slot | File under `public/images/industries/healthcare/` | Resolution |
|---|---|---|
| Hero: clinic arrival | `clinic-arrival.webp` | 1200 × 900 |
| Booking agent: patient choosing a time | `appointment-booking.webp` | 960 × 720 |
| Receptionist: clinic telephone and headset | `clinic-phone-reception.webp` | 960 × 720 |
| Support: clinic information and directions | `clinic-visit-guidance.webp` | 960 × 661 |
| In practice: available calendar times | `clinic-calendar-availability.webp` | 1200 × 900 |

All exports verified as WebP, no upscaling. Total approximately 393 KiB. Visual review found no visible faces; people appear only as cropped hands in the booking and guidance scenes. Screen and printed details are illustrative, with no patient data. Five built-in image_gen calls, no retries. Exact prompts are saved in `healthcare-image-prompts.json`.

Original generation files, retained in the task's Codex generated-images directory:

- Arrival: `exec-c84a0495-721c-4203-bbff-637baff71365.png`
- Booking: `exec-6808b03d-ead0-416b-ae9f-2a055afcfaef.png`
- Reception: `exec-5032e902-75cc-4237-935d-ad897a5d080f.png`
- Guidance: `exec-61a65236-5991-4745-96a3-3082db011dca.png`
- Calendar: `exec-6d58db36-a0f9-44f2-8806-585014530870.png`

## Verification

- All five images loaded at desktop 1280 × 720 and mobile 390 × 844, with no horizontal overflow in the checked views.
- Existing image dimensions and centered object-cover behavior retained. Agent cards and calendar story visually checked; desktop/mobile evidence is in `qa-healthcare-images/`.
- TypeScript (`npx tsc --noEmit --incremental false`) and `git diff --check` passed.
- No production build or S3 upload performed. Existing asset hosting helper remains in use. Upload keys are `website/public/images/industries/healthcare/<filename>`.

Other industry pages retain their own references. Earlier E-commerce and homepage edits remain intact.
