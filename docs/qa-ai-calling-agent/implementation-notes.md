# AI calling agent — 23 October 2026

## Content and scope

Primary supplementary evidence: user-supplied **Product Update — 2026-10-07 (Non-Technical Summary)**, Voice Agents section. Existing product documentation remains valid; this update is additive.

Implemented `/use-cases/ai-calling-agent/` using the existing use-case routing/content registry and shared site shell, FAQ, CTA and brand tokens. The page covers web voice, inbound/outbound calls, English/Hindi/Telugu, qualification flows, campaign pacing, retries, do-not-call handling, human transfers, voicemail callback tickets, Voice settings, Inbox/CRM and credit billing. No conversion statistics, plan prices or unverified voice order-lookup capability were added.

Medical, IT enquiries, book orders, appointment preferences and education leads are explicitly example configured conversations. They do not represent real customers or completed bookings. The appointment example links to the existing booking agent for calendar booking.

The existing receptionist design and JSON were present but excluded from the content registry and published-use-case list. Registered the route, exposed it in Solutions → By job and the shared footer, and added reciprocal links. Narrowed its positioning to inbound front-desk handling; preserved existing booking copy and linked broad outbound functionality to the calling-agent page. AI marketing remains unpublished.

## Image

Built-in image generation, one image; no faces or people. Final asset: `public/images/jobs/ai-calling-agent/voice-consultation-desk.webp`, 1200 × 800, 43,534 bytes. Referenced through the existing S3-compatible `asset()` helper. The phone demonstrations are accessible HTML/CSS with illustrative transcripts, not actual calling controls or product screenshots.

Prompt: Create a photorealistic editorial photograph for a professional AI voice calling product website. Wide landscape 3:2 composition. An inviting small business consultation desk in daylight, a modern dark smartphone standing upright in a minimal cradle with its display dark and blank, a slim over-ear headset resting beside a closed navy notebook, a short stack of unbranded course books and a small plant. Pale blue and soft off-white setting with a tiny muted warm yellow accent, natural materials, refined real-world photographic light and subtle shadows. Smartphone and headset clearly the focal subject, generous calm negative space in the upper third. No people, no human faces, no portraits, no logos, no readable text, no invented UI, no robots, no holograms, no illustration. Premium realistic product photography, not glossy CGI. Intended as a contextual image beside a separate accessible HTML phone-call mockup.

## Verification

- TypeScript: `npx.cmd tsc --noEmit --incremental false` passed.
- `git diff --check` passed.
- Calling-agent route compiled and rendered in Next.js webpack development mode.
- Three call-mode selectors and five industry-example selectors verified; keyboard Enter activates a selector.
- Calling-agent page checked at desktop, 390px and 320px with no horizontal overflow; loaded images have no errors.
- Mobile Solutions navigation exposes both pages; receptionist link opens the registered page and has no overflow at 320px.
- Local Turbopack preview crashed processing the existing global stylesheet; local preview uses `npm.cmd run dev -- --port 3010 --webpack`. No production configuration changed.
- No commit, push, production deployment or real call was performed.
