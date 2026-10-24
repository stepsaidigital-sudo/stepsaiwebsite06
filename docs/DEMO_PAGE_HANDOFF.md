# Demo page developer handoff — 25 October 2026

## Repository boundary

This change belongs to https://github.com/stepsaidigital-sudo/stepsaiwebsite06, branch main. Local checkout: C:\Users\user\OneDrive\Desktop\New folder\steps-AI\stepsaiwebsite06. Base before demo work: 925a0d3.

The owner states that this checkout and the real/live implementation are different repositories and both may be live. The other repository URL and deployment mapping were not supplied or verified. Do not assume this push updates that other site. Port only the scoped demo changes below after comparing the target code. No change to the separate live repository is claimed.

## Approved final UI

Route: /book-a-demo/ (route and metadata already exist).

- Mountain photograph covers the whole hero and continues behind a route-scoped glassy navbar. Navy brand accents and white hero text retained.
- Hero fills at least the viewport and grows with the form; no fixed height that clips content.
- Desktop uses a balanced heading/form split. Mobile uses a centered heading and form, 16px input text and at least 48px input height. Country and phone stack below 350px.
- The conversation mockup was removed by request. Do not restore the old desk photo or mockup from earlier iterations.
- Mobile also shows the small heading “Let’s talk about your business.” and its supporting line above fields.
- Required fields: name, email (not work email), company. Optional phone with country selector (India default, common codes plus a manual Other country code). Phone values beginning with + are preserved; otherwise the selected code is prepended. This is formatting, not country-specific number validation.
- Optional disclosure contains website, channel interests and a message. CTA: “Request my demo”. Scheduling is optional after confirmed submission, never a forced redirect.
- Three sections explain demo value, onboarding preparation, and language/team/time preferences. Demos offered in English, Hindi and Telugu according to the owner. Copy welcomes founders, managers and technical teams; it does not promise guaranteed availability, technical staffing, setup duration or results.

## Files to port

- components/templates/book-demo.tsx — form and page composition.
- components/templates/book-demo.module.css — scoped hero/form/mobile/navbar presentation.
- components/templates/demo-details.tsx — three supporting sections.
- components/templates/demo-details.module.css — section layout and responsive styles.
- public/images/demo-mountains-v1.webp
- public/images/demo-discussion-v1.webp
- public/images/demo-onboarding-v1.webp

These modules reuse existing SiteFrame, ChannelLogo, CALENDLY_URL, Lucide icons, global bd-/wb-/pp- classes and existing fonts. When porting, reconcile those dependencies and global CSS rather than copying this repository wholesale. The navbar overrides are scoped via body:has(.demo). No shared shell source edit is required for the demo design.

## Backend boundary and developer ownership

The existing POST /api/demo-request/ forwards to DEMO_REQUEST_WEBHOOK_URL; it is not direct database persistence. The endpoint was not changed in this UI work. Missing configuration returns 503/not-configured; upstream failure returns an error. The client shows success only when the response is successful and JSON contains ok: true. It then offers the existing Calendly destination with name/email prefilled. The developer must implement/verify persistence, delivery, validation, anti-spam, consent handling and real follow-up ownership in the target system. Never return success before the intended lead capture has succeeded.

Payload retains name, email, company, phone, website, channels, message and the existing company_url honeypot. No new language preference field was added: language preferences are discussed during follow-up or can be mentioned in the optional message. Calendar choice is not required to submit.

## Scope exclusions

Support page and shared Support navigation/footer/sitemap changes are separate local work and excluded from the demo commit. Historical QA images and the unused demo-workspace-v2.webp remain local, not release assets. The full-page QA captures may show the uncommitted Support footer link; that link is not part of the demo patch.

## Verification

Desktop 1440px, mobile 390px and narrow 320px rendered checks: no horizontal overflow, all section images load, form remains scrollable. Required-field validation, optional disclosure, channel selection, country/manual code controls and return-to-form link checked. Test data was not submitted to an external webhook. TypeScript passed during development. Production build status is recorded below after completion. Separate repository integration and live deployment remain unverified.

Final screenshots: qa-demo/final-desktop.png and qa-demo/final-mobile.png. Image prompts: qa-demo/mountain-background.md and qa-demo/details-images.md. Images were generated with the built-in image tool and optimized to WebP; no faces, fake testimonials or fabricated metrics are used.

## Final refinements

The mobile page title is visually hidden (retained for screen readers); the form card heading is the visible introduction. The closing language/time section is a prominent CTA panel reusing the mountain asset, with a light glass detail surface and yellow brand CTA. Hero/form fields and payload remain as described above.

## Final build result

TypeScript (`npx tsc --noEmit`) passed. `git diff --check` passed. The default Turbopack build stalled during compilation and was stopped. Webpack production build (`npm run build -- --webpack`, retried outside the sandbox) failed in the Sanity dependency chain: @mux/playback-core could not resolve hls.js; Sanity modules could not import AnimatePresence from motion/react. These errors are outside the demo source files. No dependency changes were made. Resolve these in the deployment repository before release; a successful production build or live deployment is NOT claimed.

## Remote conflict discovered at push

Remote main advanced to 3ffa6b1 during this work. Its commit 4636995 replaces the demo form with an inline Calendly scheduler, which conflicts with the owner-approved request-first flow in this handoff. To avoid overwriting concurrent/live work, this demo patch is published on codex/demo-request-ui rather than force-pushing or replacing remote main. The developer should compare that branch with current main, explicitly choose the request-first flow if approved for the deployment repo, and preserve the newer unrelated favicon, image optimization and Instagram changes. This branch is a handoff implementation, not a claim that live main has been updated.
