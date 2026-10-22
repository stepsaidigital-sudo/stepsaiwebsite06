# Company use cases — 22 October 2026

24 active companies have clickable cards and individual /case-studies/{slug}/ pages. Each card and detail page labels the proposed flow as illustrative. No invented quotations, personal attributions, deployment claims, conversion figures or results were added. The user supplied the active-company list and confirmed that no real case studies exist.

## Research and assets

16 companies have first-party business context. Each record in content/company-use-cases.json carries its source URL, short factual description and a separate proposed question/flow. Asiatique, Boot & Boost and The Shrooms Collective URLs were confirmed by the user. Brooklane, Cyphon and Imports from China URLs were supplied in the original table. Other matches were researched from public first-party websites and can be reviewed through the linked sources.

14 official logos were downloaded, visually inspected and converted to lossless WebP without changing their artwork. Light logos retain their colours on a dark backing. Source URLs are in company-logo-sources.json; local assets are in public/brands/companies/. Existing asset() handling supports the configured S3 base; no S3 upload occurred. No AI image generation was used for this update.

Logo still unavailable: Mantara (site fetch denied) and Dr Praharsha (logo URL returned 404). Ilu's logo came from the organisation-logo metadata on its official site.

Company identity/source still unresolved: Bombay Opticals, Sillvezo, Fatafat, Schon, Ignition India, Indiabazar, SSV Fashion Collective and Yogufinch. They use text names and explicitly general enquiry examples. No lookalike logo or guessed industry was substituted. Their pages explain that company details await confirmation.

## Implementation and checks

- Shared data file and one detail template keep future updates simple.
- Existing hero, card grid, colours, navigation and CTAs are reused; scoped styles handle logo sizing and detail content.
- 24/24 detail routes checked in the browser: matching title, three steps, visible illustrative disclaimer and no desktop document overflow.
- Asiatique detail and hub checked at 390px; no document overflow.
- Keyboard typing in search finds Pardewale by curtain industry; clear restores 24 cards.
- TypeScript passed; diff whitespace check passed (existing unrelated line-ending warning only).
- Route-check JSON and desktop/mobile previews are in docs/qa-case-studies/.

This report supersedes the previous company-showcase-report.md description of names-only cards.
