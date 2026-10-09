# Subpage templates and draft copy: design

Date: 8 October 2026
Branch: `subpages-draft`
Status: awaiting review

## Goal

Get the site ready for the SEO specialist's final subpage copy before it arrives. Build reusable page templates in the homepage's visual language, plus one example page per page type with draft copy written in her homepage style. When her final copy document arrives, only the content files change. The layouts stay.

## Fixed inputs

- **Homepage copy is final.** `docs/seo-homepage-source.md` was written by the SEO specialist. Do not edit it. `npm run check:copy` must keep passing.
- **Provisional sitemap.** Use the "Navigation and homepage link destinations" and "Homepage capability links" tables in `docs/seo-homepage-source.md`. Her final document may change it.
- **Content source.** `Downloads/COURSE FILE/StepsAI Website Copy Deck — LIVE.docx` (5 Oct 2026, 56 pages) supplies the facts for each page. Its wording is not reused.
- **Do not repeat these known errors from the old deck:**
  - Salesforce is not a real integration.
  - The Analytics quote and the old homepage testimonials are placeholders, not real customers.
  - The legal pages are unfinished drafts.
  - The old pricing page's credit maths is wrong.

## Out of scope for this stage

- The other ~42 subpages. They come later, from her final document, using these templates.
- Blog articles, Compare and Help centre content.
- A real booking destination, sign-up and log-in. These keep the existing "Design preview" notice.
- Reworking the existing homepage sections or cleaning up their CSS layers.

## Copy style rules (taken from the specialist's homepage copy)

| Element | Rule | Homepage example |
|---|---|---|
| Kicker | Category label, no full stop | "AI customer engagement platform" |
| H1 | One plain sentence, ends with a full stop, names the job | "Your AI agent for marketing, sales and support." |
| Hero paragraph | Two sentences: a list of jobs, then what Steps AI brings together | "Send campaigns, answer customer questions…" |
| Reassurance line | Three short statements, each ending in a full stop | "No-code setup. Answers based on your business information. Human help when needed." |
| Section H2 | Instruction or plain statement, ends with a full stop | "Help interested customers buy or book." |
| Feature title | Starts with a verb, 4 to 6 words, no full stop | "Turn Instagram comments into DMs" |
| Feature body | 1 or 2 sentences. Says how it works, gives a concrete example, includes an honest scope limit | "a word like PRICE or LINK", "supported delivery tools" |

**General rules:**
- British spelling.
- "Steps AI" as two words. Customer quotes keep "StepsAI" exactly as supplied.
- Contractions rarely, following her usage.
- No em dashes, exclamation marks or hype words (seamless, powerful, unlock, AI-powered and similar).
- No invented numbers, results, prices or integrations.
- Use a testimonial only where it proves the capability next to it. Quote it word for word, with exact attribution, taken from `app/testimonials.json` or the testimonial collection in `seo-homepage-source.md`.
- Every page includes one honest limit or prerequisite, in a "Good to know" block or in the FAQ.

## Pages to build

| Template | Example route | Sections, in order |
|---|---|---|
| Feature | `/features/whatsapp-broadcast/` | Hero with gradient product mockup → how it works (3 or 4 steps alternating with mockups) → expandable feature list → Good to know → FAQ → related features → final CTA band |
| Channel | `/channels/whatsapp-chatbot/` | Hero with WhatsApp-style chat mockup → what the agent does on this channel → channel-specific triggers → setup steps → FAQ → other channels → final CTA |
| Use case | `/use-cases/ai-sales-agent/` | Hero → one customer conversation, step by step → capabilities → connected tool logos → Mysa Living quote → FAQ → final CTA |
| Industry | `/industries/ecommerce/` | Hero styled like the homepage industry card → customer question chips → what the agent handles → channels and integrations → North & Pine and Nivara quotes → FAQ → final CTA |
| Overview | `/industries/` | Hero → grid of cards linking to each page in the section. The same template serves `/features/`, `/channels/` and `/use-cases/`, but only `/industries/` is built now. |
| Pricing | `/pricing/` | Hero → plan cards with every price shown as "To be confirmed" → what uses credits → FAQ → final CTA |
| Simple content | `/about/` | Hero → short text sections → final CTA. Later reused for Company, Legal and Resources pages. |

## Architecture

### Content

- Each page's copy lives in `content/<type>/<slug>.json`.
- Every file carries `"status": "draft"` and `"source": "draft, pending specialist copy"`.
- TypeScript types for each template live in `content/types.ts`, so a missing or misnamed field fails the type check.
- `docs/subpage-copy-draft.md` holds a readable copy of all the draft copy for her review. A small script generates it from the JSON files, so the two cannot drift apart.

### Routes

- Dynamic routes: `app/features/[slug]/page.tsx`, `app/channels/[slug]/page.tsx`, `app/use-cases/[slug]/page.tsx` and `app/industries/[slug]/page.tsx`. Each one reads its section's content files and exports `generateStaticParams`.
- Static routes: `app/industries/page.tsx` (overview), `app/pricing/page.tsx` and `app/about/page.tsx`.
- Each route sets its own `metadata` (title and description) from the content file.

### Shared shell

- Move `Header`, `Footer`, `Brand`, `Action` and `UnresolvedDialog` out of `app/page.tsx` into `components/site/`.
- The homepage imports them from there, so it renders the same as before.
- Navigation and footer links get one route map, `components/site/routes.ts`:
  - built routes are real links;
  - unbuilt routes open the existing "Design preview" notice.
- The current homepage behaviour of in-page anchors and preview notices stays as it is.

### Sections

`components/sections/` holds the building blocks:
- `PageHero`
- `StepRows`
- `FeatureList` (an expandable list using native `<details>`)
- `GoodToKnow`
- `QuoteCard`, which wraps the existing `app/quote.tsx` where possible
- `FAQ` (native `<details>`, the same pattern as the homepage)
- `RelatedCards`
- `LogoStrip`, which reuses the existing integration logos
- `CtaBand`, matching the homepage's final invitation section with its yellow button

### Mockups

- Reuse the existing components: `ChannelLogo` and the channel chat styles, the inbox, and the workflow.
- New mockups are illustrative HTML with fictional sample data, labelled "Illustration", as on the homepage.

### Styles

- One new file, `app/subpages.css`. It uses only the colour, font, spacing and radius tokens already defined in `app/globals.css` and `app/typography.css`.
- No changes to the existing homepage CSS files.

### Motion

- Matches the homepage: IntersectionObserver entrance fades, no scroll pinning, no infinite loops apart from the existing logo marquee pattern.
- Everything respects `prefers-reduced-motion`.

### Responsive behaviour

- Works at 1440, 1024, 768, 390 and 320px widths.
- No horizontal scrolling.
- Two-column layouts collapse to one column below 700px, matching the homepage breakpoint.

### Accessibility

- One H1 per page and a correct heading order.
- Native `<details>` for anything that expands.
- Visible focus states.
- Decorative mockups are hidden from screen readers or given an "Illustration" label.

## Error handling

- An unknown slug on a dynamic route returns `notFound()`.
- A content file that doesn't match its type fails the TypeScript check.
- Unbuilt links never lead to a 404. They open the preview notice.

## Verification

1. `npx tsc --noEmit` passes.
2. `npm run build` passes.
3. `npm run check:copy` passes, which means the homepage copy is unchanged.
4. Before and after screenshots of the homepage at 1440px show no visual change.
5. A script checks that the draft copy has no em dashes, no exclamation marks, no words from the banned list, and no "Salesforce".
6. One spot-check of each new page at 1440px and 390px, including a check that the page doesn't scroll sideways. The user does detailed visual QA.

## What happens when the specialist's document arrives

1. Replace the JSON content files and update `routes.ts` with her final sitemap.
2. Add pages for the remaining routes using the existing templates.
3. Only build a new template if her document introduces a page type that doesn't fit the existing ones.
