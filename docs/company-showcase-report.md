# Company showcase — 22 October 2026

The user confirmed that no real case studies were supplied and requested company names only, restricted to active accounts. The /case-studies/ route now renders 24 company names from content/active-companies.json. Cyphon uses the active entry rather than its older on-hold duplicate. Blank, ended and on-hold statuses are excluded. The long Ilu Art Therapy listing is shortened to the company name.

The route no longer renders the sample companies, invented quotes, personal attributions, review counts, performance figures or case-study links. Internal contacts, account notes, dates and plans were not copied into public content. Company search, empty results, clear search and demo/pricing links remain. The existing hero, toolbar, card grid and CTA CSS are reused; unsupported industry and agent filters were removed because the supplied table provides no mapping.

Verified locally on port 3010: 24 names, Cyphon search result, empty search state, restoration of all names, desktop/mobile no document overflow, and TypeScript. Screenshot: docs/qa-case-studies/company-showcase.png.

A furniture image generation was already in progress before the user changed the brief to company names only. It was not installed or associated with any company; no further images were generated.
