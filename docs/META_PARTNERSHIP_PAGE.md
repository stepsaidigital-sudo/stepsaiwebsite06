# Meta partnership page — developer handoff

## Current version — 25 October 2026
This section supersedes the historical iteration notes below.

- Route: `/partners/meta/`; footer label: Meta partnership. Included in the sitemap. All demo CTAs use `/book-a-demo/`.
- Main files: `app/partners/meta/page.tsx`, `components/templates/meta-partner-page.tsx`, its CSS module, and `components/templates/meta/` (channel data, native conversation preview, image stories and trust section).
- Hero: CSS blue/cyan background, existing Meta logo, simple partnership copy, one demo CTA and three native chat previews. The Meta logo appears only here. Eight-second channel rotation pauses on hover, offscreen and hidden tabs; touch/keyboard interaction stops rotation. Reduced motion disables rotation.
- Below the hero: three distinct face-free business images, concise support/trust section, native FAQs and a softly framed final demo CTA. Only the three `public/images/meta-*-story-v12.webp` assets are required. Earlier generated background drafts are unused and excluded from this commit.
- Mobile text and primary CTAs are centred; chat messages and support details retain readable alignment. Desktop hero fits ordinary short laptop screens; mobile content grows naturally without clipping.
- Motion uses CSS transforms/opacity and one-shot IntersectionObservers. Content is visible by default. No new library, artificial loading screen, scroll interception or animated chat messages. Reduced-motion CSS is included.
- Scope: presentation and navigation only. No database or API changes. Keep the qualified Meta-support wording; do not promise issue resolution, certifications, a particular partner tier, or OpenAI endorsement.
- For another repository: port the route, component folder, page CSS and three images; reuse that repository's SiteFrame, asset helper, DEMO_URL and existing brand assets. Apply only the Meta footer/route/sitemap additions; Support-page edits are separate work.
- Historical screenshots and iteration notes below describe earlier local versions, not the current dependency list or final behavior.

## Historical iteration notes

Route: `/partners/meta/`. Linked from the shared Partners footer group.

## Content evidence
- Partnership statement mirrors `content/pages/team.json`: Steps AI is a Meta Business Partner. No external directory verification, badge, tier, certification or endorsement is asserted.
- WhatsApp official API, approved outbound templates and shared connection: `content/channels/whatsapp-chatbot.json`.
- Instagram professional account, keyword comment-to-DM, story replies and mentions: `content/channels/instagram-chatbot.json`.
- Facebook page messaging and team handoff: `content/channels/messenger-chatbot.json`.
- Business knowledge and shared inbox use the existing channel descriptions and onboarding content.

The hero workspace and three chats are explicitly illustrative, not customer evidence or a live product connection. Logos reuse existing brand assets; no logos or partnership certificates were generated. This is separate from the agency/affiliate partner program.

## Implementation
Server route metadata plus `components/templates/meta-partner-page.tsx` and its scoped CSS module. Existing SiteFrame navigation/footer, brand colours, demo request route and channel routes are reused. Native FAQ disclosures provide keyboard support. Single-column layouts below 760px; no autoplay animation or new dependencies.

Local only. No database changes and no deployment.

## Local validation
- TypeScript and diff checks pass.
- Rendered at 1440px, 390px and 320px; no horizontal overflow or missing images.
- Native FAQ expansion works; no browser console errors captured on the page.
- Screenshots are in docs/qa-meta/. Production build was not rerun; existing unrelated Sanity/Mux dependency failures are documented in the demo handoff.


## Visual revision — technology direction
- Uses generated optical-glass connection background (meta-connections-v3.webp), with original brand logos and readable code-native channel previews. Earlier mountain and blank-phone draft images are not referenced by the page.
- Click-to-WhatsApp ad section follows the explicit supported capability in content/channels/whatsapp-chatbot.json; does not claim ad creation, campaign management or attribution.
- Hero channel buttons switch illustrative conversations. Entrance and switching motion respects reduced motion; no looping or automatic chat scrolling.
- Hero grows with its content on mobile; desktop uses viewport-aware minimum height, capped at 900px. Background extends behind the glass navbar.


Revision validation: 1440x900, 390x844 and 320x740 rendered; no horizontal overflow or failed images. Instagram and Messenger preview buttons switch the conversation correctly. At 320px controls are 48px tall. No browser errors captured. TypeScript and diff checks pass. Final screenshots use v3- filenames in docs/qa-meta/. All changes remain local.


## Partnership-led hero refinement
Headline explicitly states the existing Meta Business Partner status. Removed the Steps AI x Meta lockup and generic hero chat. The new illustrative connection overview shows the Steps AI agent, connection through Meta, supported channel capabilities and shared inbox. Channel buttons remain interactive. Other page sections are unchanged.


Latest review: restored the earlier three-channel conversation mockup instead of the connection diagram. Kept the explicit Meta Business Partner heading. Outer glass shell and co-brand logo row remain removed. Local only.


## Channel contrast and quieter background
- New meta-quiet-v5.webp replaces the bright connection artwork in hero and CTA. No outer glass shell restored.
- Hero preview uses WhatsApp broadcast/reply, Instagram keyword-comment/DM, and Messenger enquiry examples, each with distinct channel colours. Broadcast support comes from content/features/whatsapp-broadcast.json and the user's explicit confirmation.
- Larger channel icons and dark selected controls. Short hero copy names the three supported services. Desktop hero minimum is capped at 820px; closing CTA minimum is capped at 560px. Mobile sections grow naturally with readable content, without clipping or forced full-screen heights.


Validation for this revision: TypeScript and diff checks pass. Tested 1440x900, 390x844 and 320x740; no horizontal overflow, missing images or browser errors. Instagram and Messenger switches update both content and channel styling. Channel controls are at least 48px high. Mobile repeated chrome is hidden to prioritise readable conversations; content is never clipped to force a screen fit. Screenshots: docs/qa-meta/v5-*.png. Not pushed.


## Plain-language channel stories (local revision 6)
- Consolidated the repeated ad section and channel card grid into three equally weighted stories: WhatsApp broadcasts and replies, Instagram keyword comments and private messages, and Messenger Facebook-page enquiries.
- Meta Business Partner status appears in the hero and story introduction. Copy uses short sentences and explains private messages instead of relying on DM jargon.
- Each illustrative story uses an existing face-free image, a static example conversation and a vertical three-step flow. Warm neutral canvas and restrained platform colours distinguish the examples.
- Hero channels rotate every 8 seconds while visible. Mouse hover selects a channel and pauses rotation; touch or keyboard interaction stops rotation. Reduced motion disables automatic rotation. Removed the duplicated channel header; individual messages remain static.
- WhatsApp preview uses a neutral background with subtle code-native doodles, not official WhatsApp artwork.
- Validation: TypeScript passed; diff whitespace checks passed. Rendered desktop 1440px and mobile 390px/320px with no horizontal overflow. Narrow-screen channel buttons measured 59px high. Browser error log was empty. Automatic advance and keyboard selection were verified; mouse selection remained paused during review. Touch and reduced-motion behavior were source-reviewed, not tested on a physical device. Lazy CTA background is deferred until it enters view.
- Screenshots: docs/qa-meta/v6-desktop.png, v6-stories.png, v6-mobile.png, v6-mobile-story.png and v6-small-mobile.png. Screenshot service may scale captures below the emulated viewport width.
- Production build was not repeated because of the previously documented unrelated Sanity/Mux dependency failures. No deployment, commit or push.

## Current revision: light, compact Meta page (25 October 2026)
This revision supersedes earlier visual directions above. Implemented design-plans/meta-page-compact-redesign.md locally.
- Bright generated backdrop, navy typography and actual brand logos. Removed dark overlays and the repeated partnership footer below the hero.
- One combined conversation visual per channel. Removed the large story introduction, numbered flows, separate image cards, extra outcomes and standalone setup section. Simplified the closing CTA.
- Instagram now shows a public COURSE comment followed by the agent's first private message, in both hero and story. No preceding customer DM; chosen-keyword copy retained.
- Replaced the accumulated page CSS with one base/breakpoint set. Shared demo/support/home components were not changed. Existing eight-second rotation, hover pause and keyboard/touch stop logic retained; static messages and reduced-motion guard retained.
- Generated with the built-in image tool. Original: C:/Users/user/.codex/generated_images/01a1627f-5402-7450-9ce3-ddfa266d4395/exec-9c06394e-0b8c-415f-a9d0-6d59670c6345.png. Website assets: public/images/meta-light-v7.webp (23,768 bytes), public/images/meta-light-v7-mobile.webp (7,624 bytes). Mobile uses a calmer centre crop.
- Generation prompt: wide premium website background only; bright editorial technology studio, pale ice-blue translucent architectural planes at right/lower edges, soft daylight and cyan reflections, calm near-white left negative space, pearl-white centre, subtle believable material depth. No dark walls, neon, circular frame, spheres, robots, people, faces, text, logos, phones or screens.
- Browser checks: 1440x900, 1280x720, 768x1024, 390x844 and 320x740. No horizontal overflow or unloaded images in tested states. At 390px, story heights are approximately 561px WhatsApp, 645px Instagram and 572px Messenger (previously about 1073/1117/1171px). Hero is about 847px; content grows naturally rather than clipping to a viewport. At 320px channel buttons remain 44px high.
- Verified automatic channel advance, keyboard selection, agent-first Instagram message order, FAQ expansion and correct demo/agent hrefs. Browser error log empty. Touch and reduced-motion conditions reviewed in source; no physical phone testing.
- TypeScript passed and git diff --check passed. Full production build not repeated due to previously recorded unrelated Sanity/Mux dependency issues. Screenshots: docs/qa-meta/v7-*.png.
- No commit, push or deployment.

## Current revision: native-style text conversations and direct hero (revision 8)
Supersedes revision 7 image/card presentation following user corrections and the supplied blue Meta reference.
- Hero headline now names the actual offering: AI agents for WhatsApp, Instagram and Messenger. Existing Meta mark and Business Partner label are prominent. CSS blue/cyan treatment replaces the architectural backdrop; old generated images remain preserved but are not loaded by this page.
- No product, post or course cards in previews. WhatsApp has a text broadcast and normal replies. Instagram shows a customer asking for help and Friday delivery; the business asks for the PIN code without promising availability. Messenger uses a normal bulk-enquiry conversation.
- Recognisable customer-side app chrome, message alignment, WhatsApp timestamps, chat backgrounds and message bars. These are illustrative recreations, not exact captures of a specified app version. Decorative controls are not focusable or interactive.
- Content moved to components/templates/meta/channel-content.ts. Shared preview component and isolated CSS live in channel-preview.tsx and channel-preview.module.css. Parent page owns layout and channel rotation. Uniform right-side placement and common preview dimensions balance the three sections.
- WhatsApp background/design reference: https://www.meta.com/design-at-meta/blog/whatsapp-user-interface-update/ (2024 official design article, not a guarantee of current pixel-exact tokens).
- TypeScript passes. Desktop 1440px and mobile 390px/320px plus tablet 768px checked for overflow and missing images. At 320px the preview heights are approximately 448-452px. No clipping to force viewport fit. Native-app control actions are decorative; desktop/mobile browser tests do not replace physical-phone testing.
- Next CSS hot-reload emitted a removeChild error during stylesheet replacement; final interaction verification uses a fresh navigation. Existing unrelated Sanity/Mux production build limitation remains.
- Local only, no commit or push. Screenshots under docs/qa-meta/v8-*.

## Revision 9: partnership programme and cleaner previews
- Removed the entire visible channel/Illustrative conversation footer from ChannelPreview. The figure retains an accessible example-conversation label.
- Added a separate PartnerBenefits component and CSS below channel stories. Desktop split: Meta partnership statement left, compact four-benefit grid right. Mobile stacks these surfaces.
- Evidence is the user-supplied Meta Business Partners programme screenshots. They explicitly state benefits depend on tier. User confirmed the badge but expressed uncertainty about exact support/tools access; copy therefore describes programme benefits without asserting Steps AI has every tier-specific benefit, guaranteed direct support or certifications.
- Describes Steps AI agents and Meta partnership, not official Meta/ChatGPT agents or OpenAI endorsement. Link goes to Meta Business Partners programme information.
- TypeScript passed; desktop 1440px and mobile 390px/320px checked without horizontal overflow. Local only; no push.

## Revision 11: full-page spacing and consistency polish
- Reviewed the hero, all channel stories, trust section, FAQs and closing CTA at desktop and mobile widths.
- Trust section now uses single-column icon-and-copy rows on mobile, with 13px body copy instead of dense 12px two-column text. Shortened customer-facing descriptions without adding new benefits or guarantees.
- Matched Meta mark sizing to the hero. Aligned FAQ columns with the hero, channel and trust columns. Unified desktop section spacing and reduced excess reserved chat height; mockup content stays intact.
- TypeScript and diff checks pass. Rendered at 1440px, 768px, 390px and 320px; no horizontal overflow. Mobile channel controls remain 44px high. No physical-device verification. Existing unrelated production-build limitation remains unchanged.
- Local screenshots: docs/qa-meta/v11-*.png. No commit, push or deployment.

## Revision 12: image-led channel stories
- Removed the secondary Meet your agents hero link and centred Request a demo on mobile. The interactive hero preview remains.
- Replaced the three repeated lower chat mockups with a separate ChannelStories component, a shared heading, a slim channel strip and distinct face-free business photographs. Existing channel links and simple product copy remain.
- Generated assets: public/images/meta-whatsapp-story-v12.webp, meta-instagram-story-v12.webp and meta-messenger-story-v12.webp. Optimized to 1200px WebP. Real logos and captions are rendered in code.
- Image-generation brief: one photorealistic premium editorial landscape photograph per channel, natural soft light, authentic textures and crop-safe composition. WhatsApp: hands folding blue and cream linen for a new collection on an oak table with sage accents. Instagram: hands wrapping a cobalt-blue garment in cream tissue on an ivory desk with lilac accents. Messenger: hands arranging matching white gift boxes with muted blue ribbons. No faces, heads, screens, UI, phones, logos or lettering; the business activity is the focal point.
- Images reveal once on entering view with opacity and 12px translation; a small hover zoom is limited to fine pointers. Reduced-motion preference disables both. Text is always visible and remains stationary.
- TypeScript and diff checks passed. Desktop 1440px and mobile 390px/320px checked: no horizontal overflow, all three photos loaded with cover crops, no Meet your agents link, mobile CTA centred. Confirmed the first image reveal triggers in the browser. Reduced-motion behavior reviewed in CSS, not device-emulated.
- Screenshots: docs/qa-meta/v12-*.png. Existing unrelated production-build dependency limitation remains. Local only; no commit or push.

## Revision 13: centred mobile layout and concise trust section
- Centred mobile hero copy, channel story copy and trust introduction. Conversation bubbles and detailed support rows remain aligned for reading.
- Kept the Meta Business Partner mark in the hero only. Removed the lower duplicate mark, repeated partner claim, programme link and redundant benefit introduction; retained setup guidance, team guidance and qualified Meta support wording.
- Shortened mobile image crops to a 1.5 aspect ratio and tightened story spacing. Preserved all three generated images and channel links.
- Closing demo CTA now sits in a rounded soft-blue frame with one primary action, brief invitation and language/time reassurance.
- Desktop hero uses viewport-aware sizing with compact spacing on shorter screens. Verified at 1440x800 and 1280x650; the full preview fits, with its bottom at 611px on the 650px screen. Content can grow on smaller devices rather than being clipped.
- Mobile checked at 390px and 320px without horizontal overflow. All three lower photographs loaded when their section came into view; only one Meta brand mark remains. TypeScript and diff checks passed. Existing unrelated production build limitation remains.
- Screenshots: docs/qa-meta/v13-*.png. No commit, push or deployment.

## Revision 14: restrained entrance and scroll motion
- Hero copy and preview settle into place with 10px translation and partial-opacity fade, 500ms on desktop and 400ms on mobile; the preview follows by 80ms.
- Added one-time viewport reveals to the channel introduction, trust introduction and closing CTA. Content is visible by default, including without JavaScript. Intersection observers disconnect on cleanup and unobserve revealed elements.
- Retained image reveals and static conversation messages. Added 160ms button press feedback and fine-pointer-only button/link arrow motion. No background animation, scroll hijacking or new animation library.
- All new motion is gated by prefers-reduced-motion:no-preference. Reduced-motion handling reviewed in code; not OS-emulated.
- Verified desktop 1440px and mobile 390px: no horizontal overflow, section reveal attributes trigger, completed content is fully opaque, mobile entrance duration is 400ms. TypeScript and diff checks pass. Screenshots docs/qa-meta/v14-*.png. Nothing committed or pushed.

## Final commit validation — 25 October 2026
- Desktop 1440x800: hero ends at 760px, channel button selection changes the preview, both Request a demo links point to /book-a-demo/.
- Mobile 390x844 and 320x740: centred heading, no horizontal overflow. All three lower generated images loaded when in view. Prior revision screenshots document the final visual treatment.
- npx tsc --noEmit passed. Staged git diff --check passed after whitespace cleanup.
- npm run build was attempted again. It stayed at Creating an optimized production build for several minutes without further output and was interrupted; this run did not complete and is not a build pass. Earlier dependency errors in historical notes were not reproduced as diagnostics in this run. Deployment build remains to be verified.
- Commit scope includes Meta page components, three generated assets, this handoff, and Meta-only footer/routes/sitemap additions. Support work and unused generated drafts remain uncommitted.

## Push destination and integration caution
Remote main is at 3ffa6b1 and contains a concurrent Calendly-first demo implementation plus newer favicon, image and Instagram changes. The local base contains the approved request-first demo handoff from codex/demo-request-ui. A main push was rejected as non-fast-forward. To preserve live work, this page is published on codex/meta-partnership-ui, not by overwriting main. The Meta-only implementation commit can be cherry-picked onto a chosen base. Its demo CTA uses the shared /book-a-demo/ route; the destination UI depends on which demo implementation the developer selects. No production deployment is claimed.
