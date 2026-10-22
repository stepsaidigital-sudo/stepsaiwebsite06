# Hire an agency and affiliate pages

22 October 2026. Both pages use `PartnerDetailPage` and the existing Partners CSS. Original JSON copy and brand colours are unchanged. Hire an agency links to the demo booking page; affiliate Apply links to Contact. No form was submitted.

Two new images were generated with the built-in image tool, one per page, with no faces or people. Both are WebP, 1440 × 1080:
- `public/images/partners/agency-agent-setup.webp` — 116,002 bytes.
- `public/images/partners/affiliate-content-studio.webp` — 130,594 bytes.

Hire prompt:
Photorealistic editorial photograph for a Hire an agency page for Steps AI. Landscape 4:3. A specialist's AI assistant implementation workspace, absolutely no people, hands, faces, portraits or avatars. Side-on close composition of an elegant desktop monitor displaying an abstract unbranded configuration workspace with small blue conversation blocks and connected workflow boxes (no readable text), beside a tablet displaying a blank blue chat interface, a neat printed setup checklist and one cable. Bright calm studio with pale blue and white surfaces, navy accents, natural daylight, realistic screen reflections and material textures. Focus on practical setup work and connecting tools, not generic office decor. Centered crop-safe subjects. No logos, no legible typography, no fabricated metrics, no watermark, no webpage screenshot, no 3D illustration. Visually distinct from a top-down folders and paper planning desk.

Affiliate prompt:
Photorealistic editorial photograph for an affiliate referral program page on Steps AI. Landscape 4:3. A compact creator audio recording corner prepared to share useful software recommendations: high quality navy microphone on a short desk stand prominently in foreground, over-ear headphones beside it, an open laptop further behind showing an abstract newsletter draft of blank blue text blocks without readable text, and a small pale blue notebook. View at desk level from a diagonal angle, microphone and headphones are hero objects, laptop secondary. Soft natural window light, quiet warm off-white and pastel blue setting, dark navy equipment. Real photography, subtle tactile detail, professional understated composition with crop-safe margins. Absolutely no people, hands, human faces, profile photos, silhouettes or reflections of people. No brand logos, no readable words, no earnings charts, no money, no metrics, no watermarks. Distinct from a desktop monitor setup or overhead project folders. Not a website screenshot or illustration.

Blog: restored local public Sanity project and dataset settings from the live site's image URLs. The read-only dataset check returned 95 posts. Local Blog now renders those posts, and `/blog/whatsapp-template-message-categories/` loads its full article. Settings are in `.env.local`; configure the corresponding public variables separately in deployment environments.

Validation: TypeScript passed; both pages visually reviewed at desktop and mobile sizes. Mobile width 390px has no horizontal overflow; both images load at the intended dimensions. Screenshots are in `docs/qa-partners/`.
