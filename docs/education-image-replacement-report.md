# Education image replacement — 22 October 2026

Completed `/solutions/education/`: six fresh photographs, no reused images and no visible faces. Only image references and the story alt description changed. Layout, CSS, copy and interactions retained.

Files are under `public/images/industries/education/`:

| Slot | WebP file | Resolution | Generated source |
|---|---|---|---|
| Hero | admissions-entrance.webp | 1200 × 900 | exec-017cd525-c5a5-4754-8f97-142851184abd.png |
| Sales: course guidance | course-guidance.webp | 960 × 720 | exec-fe34ce0a-5bb0-4f2f-8d5e-eead64604fea.png |
| Lead capture | student-enquiry-kiosk.webp | 960 × 720 | exec-4632355a-fe08-440b-9707-c067f01d9ba6.png |
| Booking | counselling-session-booking.webp | 960 × 660 | exec-bec8df95-bff9-485c-893a-910ef74eee49.png |
| Marketing | new-batch-announcement.webp | 960 × 720 | exec-aafeb230-8df2-42f3-a122-13d3409234bf.png |
| Saved enquiry story | admissions-enquiry-followup.webp | 1200 × 900 | exec-d90fb3ed-b9ed-481f-b6aa-ab1c8cc123d5.png |

Six built-in image_gen calls, no retries. Exact prompts are in `education-image-prompts.json`. Original PNGs remain in the task's Codex generated-images directory. All public exports verified as WebP, with no upscaling; total 510,954 bytes. Illustrative screens and printed content contain no student personal data.

Desktop 1280 × 720 and mobile 390 × 844 checks confirmed all six images loaded and no horizontal overflow. Card and story crops reviewed; screenshots and measured sizes are in `qa-education-images/`. TypeScript and whitespace checks passed. No production build or deployment performed.

Existing asset-host helper retained. S3 keys are `website/public/images/industries/education/<filename>`. No S3 upload performed. Other pages' images remain unchanged by this pass.
