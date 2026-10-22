# Button and tab contrast audit — 22 October 2026

Scope: sitewide CSS hover selectors, including CSS modules and inline React styles; rendered control-colour screening on 74 routes in routes.json. Shared blog, case-study and help article styles were included in the source audit; every dynamic article was not opened individually.

Changes in app/globals.css:
- Earlier industry-tab fix retained: hover cannot replace white selected text with dark text.
- Both channel-selector hover declarations now exclude selected buttons, preserving the selected white surface.
- Product preview hover excludes the pressed state, preserving its green confirmation surface and white text.
- Homepage motion-control label uses the existing #52657e text colour instead of #657788 (previously measured about 4.2:1 on its light surface).
- Selected problem buttons explicitly inherit white text. Their inner labels were already white; this also protects any inherited text and icons.

No layout, dimensions, spacing, content or brand palette changes.

Validation: source audit of all hover colour/background rules; 74 rendered route checks; direct click/hover checks on selected channel and problem buttons; homepage motion control checked after interaction. Pricing CTAs already specify paired foreground/background hover colours and required no change. git diff --check passed.

The automatic colour screen in rendered-checks.json measures solid backgrounds. It is a diagnostic screen, not a complete WCAG certification: it skips gradient-backed controls and does not exhaust every interactive state. Pre-fix problem-button flags describe parent inherited colour, not the already-white child labels. Homepage and ecommerce screens were rerun after fixes with no flags.
