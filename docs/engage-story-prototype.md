# Engage storytelling prototype

This iteration implements chapter 01 only, as requested in the 7 October 2026 brief. The top-level chapters and existing Convert, Support, and Bring customers back demos remain available. Completing Engage opens the existing Convert view; the other twelve new motion stories have not been implemented.

## Interaction
- Four Engage stories, six seconds each on desktop and eight on mobile.
- Native page scrolling through a sticky region advances features. No wheel interception or forced document scrolling.
- Scroll changes advance relative to the current story, including after autoplay, so autoplay does not force the next scroll back to the first physical segment.
- Manual scroll or feature selection suspends automatic advancement for four seconds. Hovering the product pauses advancement while the current demonstration finishes, so visitors can inspect the result. Pause/play, replay, previous/next, and a skip link remain available.
- Animation and timing pause when the product stage is mostly outside the viewport or the document is hidden.
- Small screens stack content, use a horizontal chapter bar, and support feature buttons, previous/next and horizontal touch swipes. Pinning is enabled only when the entire section fits below the header.
- Reduced motion disables autoplay/pinning and shows the completed product state with an accessible narrative for each feature.

## Visual stories
1. WhatsApp campaign: audience selection, personalised message, send status, recipients, individual reply.
2. Instagram comment to DM: post, PRICE comment, trigger detection, private Instagram conversation.
3. Ad to WhatsApp: sponsored post, CTA press, WhatsApp enquiry and agent response.
4. Instagram comments: incoming comments, public AI reply, comment management and team control.

All data and product screens are illustrative. No real messages are sent. Existing local channel assets and homeware imagery are reused. SEO source JSON and the other page sections are unchanged; the shortened Engage supporting sentence is explicitly provided in the new brief.

## Verification
Production build and TypeScript checks passed. Browser confirmed autoplay through all four Engage stories and transition into Convert. Manual-selection idle time was about four seconds, followed by six-second feature dwell. Native PageDown advanced the selected feature while the frame remained pinned at 96px. Desktop and 390px mobile render checks found no horizontal page overflow. Hover showed the explicit paused state. Reduced motion is implemented in both controller and stylesheet; OS preference emulation was not available for a live check.

