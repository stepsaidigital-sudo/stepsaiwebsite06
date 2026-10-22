# Exact legal page import

Source pages: https://stepsai.co/privacy-policy/ and https://stepsai.co/terms-of-service/.
Captured 22 October 2026. Original HTML snapshots are retained beside this file.

`scripts/import-legal-pages.mjs` imports the hero, complete policy body (including Contact Us), section navigation and closing CTA into `content/legal/`. It removes original styling, SVG decoration and executable content. It asserts exact textContent equality for the hero, article and closing CTA. The old security CTA destination is mapped to the current `/security/` route without changing its label.

The policy wording is not edited or supplemented. Duplicate names and the original `Effective Date: [Date to be set on publish]` placeholders are deliberately retained. This work changes presentation, not legal substance.

Verification:
- Original and rendered Privacy Policy body: 14,944 characters, exact match.
- Original and rendered Terms body: 19,647 characters, exact match.
- All 12 section anchors on each page resolve.
- Desktop 1280×900 and mobile 390×844 checked for both pages; no horizontal overflow.
- Section navigation and active highlighting checked in the browser.
- TypeScript and git diff whitespace checks passed.
- Screenshots and rendered text captured in `docs/qa-legal/`.

Presentation uses the current site shell and blue palette, a sticky desktop contents list, a static mobile contents list, readable section cards, and a 300ms hero entrance. Reduced-motion CSS removes the entrance and navigation transitions. Policy text is not hidden behind scroll reveals or accordions.
