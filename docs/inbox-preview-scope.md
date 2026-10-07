# Inbox showcase scope

User-approved refinement, 7 October 2026: remove the introductory and per-feature explanation paragraphs from the team showcase. Keep the section title, four original feature titles, and page order. The canonical SEO source stays unchanged as a reference.

Mockups are illustrative, with three channel conversations, visible tags, a compact CRM record, human handoff, and three illustrative insight metrics. Replies are local demo state only.

## Autoplay storytelling revision — 7 October 2026
The user-supplied animation brief supersedes the scroll-driven team showcase with four 2.5-second scenes: conversations, performance, customer questions, and human handoff. The existing section headline, page order and stationary two-column frame remain. The short feature labels map to the new scenes; explanation paragraphs remain omitted per the preceding request.

Implementation uses a controlled React scene timer with CSS internal animations. Analytics and questions share a persistent dashboard with an internal vertical translation. Autoplay pauses offscreen, in a hidden tab, on request, and for reduced motion. Selecting a feature shows its completed scene and pauses. Figures and conversations are illustrative, not live product data.

Validation: production build and TypeScript passed. Browser observed 0 → 1 → 2 → 3 → 0 over approximately 10.1 seconds. Pause held state, manual scene selection displayed final content, desktop 1500×740 and mobile 390×844 checked, no horizontal overflow or browser console errors observed.
