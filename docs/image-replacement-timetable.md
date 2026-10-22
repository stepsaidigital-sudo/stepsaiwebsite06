# Image replacement timetable

Prepared 22 October 2026. Planning only: no image generations, uploads, or application edits in this pass.

## Scope and evidence

The schedule lists all 103 concrete URLs found in the local sitemap and active route registries, plus the 404 page and a separate CMS blog inventory task. Blog article URLs are dynamic and must be enumerated from Sanity before this can be called a complete live-site audit. Hidden chat-page help content and unpublished marketing/receptionist agent pages are excluded from generation; check for lingering assets in shared components.

The asset inventory contains 193 local raster files, their measured source dimensions, and literal source references. This is not a purchase or generation count. Logos, reused images, avatars, unused files and existing generated assets must be classified first. Source dimensions are not rendered crop dimensions. No page has yet passed visual inspection.

Companion files:
- `image-page-schedule.csv`: each route in execution order, with its image direction.
- `image-asset-inventory.csv`: every local raster file with dimensions and source references. Computed references require additional checks.
- `image-page-audit.md`: source dependency inspection for each scheduled route; candidate assets are not confirmed rendered slots.

## Timetable and order

These are working-session estimates, not calendar commitments or background automation. Complete one page's slots before starting the next page. Shared assets get one owner and one generation, then are verified wherever reused. Do not generate all pages in a phase as a batch.

| Order | Pages | Count | Inspection allowance per page | Generation allowance |
|---|---|---:|---|---|
| 0 | Shared asset classification, aliases, demo portraits, existing photo credits | Site-wide | 60–90 minutes total | Zero |
| 1 | Homepage, section by section | 1 | 45–75 minutes | Only verified unique photo slots |
| 2 | E-commerce, education, financial services, healthcare, real estate, SaaS, travel/hospitality | 7 | 20–35 minutes | One image at a time, tied to the industry and section |
| 3 | Booking, lead capture, sales, support agent pages | 4 | 20–30 minutes | Industry cards get their own industry scenes |
| 4 | Instagram, Messenger, website, WhatsApp channel pages | 4 | 15–25 minutes | Match the existing conversation/product example |
| 5 | Analytics, CRM, skills, inbox, broadcasting, workflows | 6 | 15–25 minutes | Existing photographs only; retain product UI |
| 6 | All 22 remaining static hub, company, commercial, legal, help/blog index pages | 22 | 10–20 minutes | Zero if no photo replacement is needed |
| 7 | Seven comparison pages | 7 | 10–15 minutes | Reuse contextually valid shared replacements |
| 8 | Twenty-one integration pages | 21 | 10–15 minutes | Preserve integration logos; generate only actual photo slots |
| 9 | Thirty-one published help lessons | 31 | 5–10 minutes | Preserve instructional screenshots; audit incidental photos |
| 10 | Each published Sanity blog article | Pending CMS inventory | 10–20 minutes | Cover/inline images follow each article's actual subject |
| 11 | 404, shared-layout sweep, broken-path and face-free regression | 1 + site-wide | 45–90 minutes total | Fix only identified omissions |

Allow approximately 10–20 minutes per unique image for the brief, generation, output inspection, export and installation. Generation latency and targeted corrections can extend this. Add 10–15 minutes for final desktop/mobile QA per changed page. Do not set a total credit or completion estimate until the unique replacement count and CMS list are known. Unchanged text-only pages still receive an inspection entry and need no generation.

## Required sequence within every page

1. Inspect the rendered desktop and mobile page, all tabs/carousels/expanded states, hero, body sections, cards, shared avatars and closing CTA. Record each actual image slot in reading order.
2. Associate the slot with its exact heading, copy, industry, source file, shared consumers and current image. Check existing origin records rather than assuming every file is stock.
3. Record rendered width/height, object-fit, object-position, overlays and mobile crop. Preserve layout and CSS. Keep the subject centered within the safe area that survives all existing crops.
4. Decide: retain official asset, replace photo, reuse approved generated asset, use existing initials for an avatar, or skip an unused asset. Never synthesize a real employee or customer identity.
5. Write one specific brief: industry, activity/story, environment, subject, composition, lighting, palette, source ratio, crop constraints, descriptive filename and exclusions. Only then generate.
6. Generate one image. Inspect relevance, realism, faces/reflections, anatomy if hands appear, recognizable branding, accidental text and crop viability. Do not generate speculative variants. Retry only for an identified defect.
7. Save the approved master, export to the required format/dimensions, record provenance and update the narrow asset reference. Preserve existing code structure, copy, interactions, image container and animation.
8. Validate on the actual page at desktop/mobile sizes, including all shared consumers. Mark the slot complete before the next slot and the page complete before the next page.

## Industry relevance is mandatory

| Industry | Appropriate scene vocabulary | Avoid |
|---|---|---|
| E-commerce | Exact catalogue product, shopper's hands selecting an item, packing a real order, shelf stock, parcel dispatch, return inspection | Generic offices, unrelated medical/education imagery, a storefront when the slot is a specific product thumbnail |
| Healthcare | Appointment preparation, consultation environment, appropriate instruments, reception or care activity cropped without faces | Retail packing scenes, visible patient records, fabricated doctor identities |
| Education | Study desk, books, learning materials, classroom equipment, admissions counselling activity | Shopping stockrooms, generic business meetings, visible student faces |
| Real estate | Relevant building, lived-in interior, property viewing, floor plan, keys handed over | Unrelated shops or staged corporate boardrooms |
| Travel and hospitality | Hotel room, reception activity, luggage, booking preparation, destination context suited to the section | Generic customer-service office unrelated to travel |
| Financial services | Neutral financial consultation materials, hands reviewing unbranded documents | Account numbers, readable personal information, money guarantees, unrelated fulfilment scenes |
| SaaS | Software onboarding, support or collaborative work context where photography already exists | Invented giant dashboards; replacing functional UI with a photograph |

For mixed-industry agent pages, label each card separately. The owning page alone is not enough: an education card on a sales-agent page must show an education sales/admissions context. Reuse only when both industry and story match.

## Homepage section order

| Order | Section | Image brief / action |
|---|---|---|
| H01 | Hero: website shopping tab | Sol ceramic vase; Dune vase and bowl set. Centered realistic product photography matching the existing product descriptions, readable at 84×84 and compact 64×64 CSS sizes. Inspect all other tab states. |
| H02 | Product journey | Match every pictured catalogue product; clinic appointment imagery must show clinic context with no faces; cart recovery must use the same product as its message. Reuse H01 only where correct. |
| H03 | Industry cards | E-commerce ceramics, healthcare appointment context, education learning activity, real-estate property. Inspect expanded and collapsed states and mobile crops. |
| H04 | Team/agent story demos | Inspect each demo and avatar; preserve product/story continuity. Use existing initials for fictional profile circles rather than generating faces. |
| H05 | Setup and integrations | Reuse the correct homeware image for its store example. Preserve official integration logos and interface content. |
| H06 | Broadcast | Product image must match the actual offer. Inspect shared store imagery and avatars. |
| H07 | Customer experiences | Existing stock avatar references require face-free treatment. Do not generate fictional people to represent named customers or evidence. Preserve the existing container size. |
| H08 | FAQ | Inspect; generate nothing unless an existing image actually requires replacement. |
| H09 | Closing CTA mosaic | Inspect all 14 tile slots, including desktop-only and tall side tiles. Give each a relevant activity; reuse approved industry scenes when crop-safe. Preserve the entire mosaic and its motion. |
| H10 | Header/footer/shared overlays | Retain brand assets; verify any photo-bearing menu or overlay states. |

## Asset naming and S3 delivery

Retain the existing `asset()` helper. Configure `NEXT_PUBLIC_ASSET_URL` to the actual public HTTP base, for example `https://<bucket-host>/website/public`, only when the real deployment path is confirmed. The current helper appends root-relative paths.

Example new descriptive key: `/images/industries/ecommerce/order-packing.webp` → `https://<bucket-host>/website/public/images/industries/ecommerce/order-packing.webp`.

Do not insert an example hostname into production configuration. Keep a mapping from each old path to its replacement, all consuming pages, master file, exported dimensions, prompt, generation date/tool, review status and S3 key. Update duplicated CTA crops from the approved master instead of paying for a second image. Preserve existing photography credits as a historical record and mark replaced entries when replacements are actually made.

## Completion record for every slot

Required fields: page URL; section/title; industry; current path; shared consumers; old image provenance; rendered desktop/mobile dimensions; crop and overlay constraints; planned scene; final prompt; output filename; generation status; source/export dimensions; visual review; face-free review; S3 key; installation status; rendered QA status.

Allowed statuses: source inventoried → render inspected → brief ready → generated → image reviewed → installed → page verified. No stage may be silently skipped. Generated imagery is not automatically legal clearance; keep provenance and route any actual policy decision through the site's established review process.

Current status: source inventory and schedule prepared. Render inspection, CMS article enumeration, image briefs for individual slots, generation, replacements and S3 uploads remain pending.
