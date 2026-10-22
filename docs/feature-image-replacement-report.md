# Feature imagery — 22 October 2026

Completed WhatsApp broadcasting, Unified inbox, CRM, Analytics, Agent skills and Workflow builder.

Preserved dashboard components, sample conversations, charts, section order, CSS, animations and logos. Broadcast retains the ceramic product image using its existing generated WebP equivalent. Replaced seven supporting stock photo slots with fresh 1200 × 900 WebP photos. Subjects: support desk, clothing customer records, retail analysis, appointment calendar, warranty claim, specialist handoff and order packing.

Replaced stock portrait references in the feature dashboards with nine paper-cut animal profile illustrations, exported at 192 × 192 WebP from one generated sprite sheet. Known sample identities map consistently across screens; unknown sample names map deterministically. No blank-avatar substitution. Avatar containers and dimensions remain unchanged. Changes are scoped to the feature components and Skills handoff; previous pages retain their existing avatar behavior.

Generation: built-in image_gen, eight calls total (seven photos and one avatar sheet), no retries. Prompts: feature-image-prompts.json. Photo metadata and future S3 keys: feature-generated-images.json. Assets: public/images/features/. Avatar source: C:/Users/user/.codex/generated_images/01a1627f-5402-7450-9ce3-ddfa266d4395/exec-2fd6031b-e956-4a79-bc08-291640acfb58.png. No upload to S3 was performed; existing asset() base-path handling remains in use.

Validation: TypeScript passed; git diff --check passed apart from an existing line-ending warning. Browser checks at 1280px and 390px found no document overflow and no stock portrait URLs on any of the six pages. All seven supporting photos loaded when scrolled into view (initial offscreen lazy images are recorded as unloaded in the first audit). Inbox profile images loaded, and its animated handoff reached the resolved state. Screenshots and DOM checks are in docs/qa-feature-images/. Existing narrow-screen dashboard clipping is preserved.
