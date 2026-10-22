# Company detail template — 22 October 2026

Expanded the shared template for all 24 company routes. Sixteen verified brands have dedicated context, enquiry fields, handoff copy and a specific FAQ in `content/company-case-details.ts`. Eight unverified profiles retain neutral examples and now use noindex, follow metadata.

Public source links were removed from the article. Research references remain in `content/company-use-cases.json` and `docs/company-use-case-research.md` for editorial review. No new company facts or customer results were inferred from this layout update.

Desktop uses a sticky company summary and five section links. Mobile uses a static summary, followed by the article. Existing site header, hero treatment, logos, colours and CTA remain. Native details/summary elements provide keyboard-accessible FAQs. Titles, descriptions, canonical paths and Open Graph metadata are specific to each company.

Validation: TypeScript passed; git diff --check passed. Pardewale desktop at 1280×900 and mobile at 390×844 showed no horizontal overflow. Section navigation, desktop sticky positioning, mobile static positioning and FAQ expansion were checked in the browser. Desktop proof: `qa-case-studies/pardewale-expanded-desktop.png`.

Examples remain explicitly illustrative, with no invented performance metrics, endorsements or confirmed implementation claims. No deployment or S3 upload performed.
