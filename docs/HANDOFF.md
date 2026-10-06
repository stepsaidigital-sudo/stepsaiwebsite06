# Steps AI: Conversation Studio

Responsive React homepage built from the supplied 6 October 2026 master brief. All supplied sections and marketing copy are preserved. Illustrative UI text is separate from marketing copy.

## Design

The visual direction uses customer conversations and their resulting actions as its recurring motif. Manrope gives headings a precise geometric character; DM Sans supports longer reading. Both fonts are self-hosted under the SIL Open Font License, included in public/fonts. Typography was compared using the actual hero in browser renders. Primary colour tokens are at the beginning of app/globals.css; all five supplied colours are retained.

This is a custom visual identity, not a copy of a third-party design system. The Steps wordmark and step-shaped mark are provisional typographic/geometry treatments because no approved logo assets were supplied. The illustrative product windows are HTML interface compositions, not screenshots of the shipped Steps AI product. Customer names inside demonstrations are fictional sample data. The seven testimonials are reproduced from the supplied copy, not independently verified endorsements.

## Implementation map

- app/copy.json: canonical marketing content extracted from the supplied brief.
- app/page.tsx: named React components for each section and local interaction state.
- app/product-demos.ts: 16 feature-specific illustrative states.
- app/globals.css: brand, type, responsive layout and motion tokens/rules.
- docs/canonical-copy.md: unchanged source copy for review.
- qa/results.json: viewport and interaction checks.
- public/fonts: font files and licences.

The framework is the Sites React/Vinext starter. Run npm install, npm run dev, and npm run build. No backend, data collection, authentication, or external booking service was invented.

## Motion and interaction

- Hero conversation: one-time 500ms opacity/10px transition with 400ms stagger, manually replayable. No infinite animation.
- Feature changes: 350ms opacity/10px transition; each stage has independent state and starts with feature one open.
- Industry changes: 350ms transition; all seven choices remain visible.
- Buttons: 160ms feedback.
- Native FAQ disclosures and native modal dialog with Escape handling.
- Human takeover and workflow test are local illustrative demonstrations, not live product operations.
- Reduced motion removes animation and smooth scrolling. No scroll trapping, parallax, forced snapping or pinned content.

## Responsive behavior

The four product stages remain in document order. Desktop uses a 45/55 text/visual relationship; below 700px each becomes a readable vertical sequence. Product interfaces reflow instead of being scaled. The inbox drops nonessential list/rail context at narrow widths while retaining the conversation and takeover. Integrations and footer columns wrap. The mobile navigation is an inline disclosure with Escape and focus return, not a modal overlay.

## Destination map and production blockers

All Book a demo controls use the same unresolved-destination handler. Supply one real booking URL before launch. Pricing, Log in, Sign up, all-integration, solutions and customer-story destination pages are also unresolved. Footer Features, Channels, Integrations, Industries, Use cases and Customer stories use real in-page destinations; remaining footer destinations open an explicit unconnected-preview notice. No destination URLs were guessed and no submissions are simulated as successful.

Supply approved brand assets and current product screenshots if exact product-interface fidelity is required. Product owners must confirm staging capabilities, channel support and testimonial approval before production marketing release.

## Validation scope

Browser checks cover 1440×900, 1366×768, 1280×800, 1024×768, 768×1024, 390×844, 360×800 and 320px widths; all feature, industry and FAQ states; takeover; workflow preview; modal Escape; mobile menu; reduced motion; enlarged text. Screenshots are in qa. TypeScript validation also runs. These checks do not establish formal WCAG conformance or real-world Core Web Vitals. No live product integrations are connected.

## Revised visual direction
The revision studied Calendly's live layered gradient stages through the browser. app/showcase.tsx and app/polish.css replace the flat product windows with a short animated brand-mark sequence, blue gradient light movement, channel controls, and separate campaign, calendar, CRM, knowledge and workflow mockups. Scroll entrances use IntersectionObserver; the background sequence stops within 4.5 seconds. Pause and replay controls are available on the hero. Product mockup text remains illustrative. The sixteen revised feature states were checked in the in-app browser. The original qa/results.json covers the first design pass; final browser observations cover the revised layouts. No continuous scroll pinning is enabled.

