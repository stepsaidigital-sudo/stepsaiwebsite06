# Subpage Templates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build reusable subpage templates in the homepage's visual language, plus 7 draft example pages whose copy follows the SEO specialist's homepage style.

**Architecture:**
- Copy lives in typed JSON files under `content/`.
- Each page section has an App Router route (vinext) that renders a template built from shared section components.
- The header and footer move into `components/site/` so the homepage and all subpages share them. A route map decides which links are real and which open the preview notice.

**Tech Stack:** vinext (Next 16 App Router on Vite), React 19, TypeScript, lucide-react, plain CSS with the tokens already in `app/globals.css`.

**Spec:** `docs/superpowers/specs/2026-10-08-subpage-templates-design.md`

## Global Constraints

- **Homepage copy:** `docs/seo-homepage-source.md` and `app/copy.json` are not edited. `npm run check:copy` must pass.
- **Writing rules:**
  - British spelling.
  - "Steps AI" in site copy. Quotes keep "StepsAI" exactly as supplied.
  - No em dashes and no exclamation marks.
  - None of these words: seamless, powerful, unlock, AI-powered, cutting-edge, supercharge, transform, frictionless, robust, leverage, omnichannel, next-generation, game-changing.
- **No Salesforce or Stripe** anywhere. Integrations named in copy must come from the 20 verified apps:
  - Store: Shopify, WooCommerce
  - Shipping: Shiprocket, Delhivery, DTDC, iThink Logistics, WareIQ
  - Calendars: Google Calendar, Outlook Calendar, Calendly, Cal.com, Square Appointments
  - Knowledge and files: Google Drive, Notion, Airtable
  - Messaging and email: Slack, Outlook
  - Other: HubSpot, Zendesk, Klaviyo
- **Unconfirmed figures:**
  - No invented stats. Do not reuse the old deck's 900K chats, 80%, 0.5s or 95 languages.
  - Prices are written as "To be confirmed".
  - Never say "1 credit = 1 reply".
- **Quotes:** only from `app/testimonials.json`, word for word, with exact attribution.
- **Primary CTA:** "Book a demo", as on the homepage. Unbuilt destinations open the existing preview dialog.
- **CSS:** new styles go only in `app/subpages.css`, with classes prefixed `sp-`, so they cannot collide with the homepage CSS that `app/layout.tsx` loads globally.
- **Responsive:** no horizontal scroll at 320px or wider. Two-column layouts collapse to one column below 700px.

## Review Focus

1. **Homepage regression from the header/footer move:** the header, footer and dialog must render and behave exactly as before. Verify with before and after screenshots at 1440px and 390px.
2. **Unknown slug** (for example `/features/nope/`): must render a 404 page, not crash.
3. **Unbuilt links in the shared nav and footer on subpages:** must open the preview dialog. In-page anchors such as `#product` must point to `/#product` on subpages.
4. **Mobile menu on subpages:** opens and closes, Escape returns focus, and links close the menu.
5. **Copy-rule violations creeping into drafts:** `scripts/lint-draft-copy.mjs` fails on em dashes, exclamation marks, banned words, Salesforce or Stripe.

---

### Task 1: Extract the shared site shell

**Files:**
- Create:
  - `components/site/routes.ts`
  - `components/site/shell.tsx`
- Modify:
  - `app/page.tsx`: remove the inline `Brand`, `Action`, `UnresolvedDialog`, `Header` and `Footer`, and import them from the shell.

**Interfaces:**
- Produces:
  - `routes.ts`: `export const builtRoutes: Record<string,string>`, a map from label to path for pages that exist; `export function resolveLabel(label:string, onHome:boolean): {href?:string}`.
  - `shell.tsx` (`'use client'`):
    - `Brand`
    - `Action({children?,onOpen,className?})`
    - `UnresolvedDialog({label,close})`
    - `Header({onOpen,onHome?})`
    - `Footer({onOpen,onHome?})`
    - `SiteFrame({children})`, a client wrapper that owns the `route` state and renders Header, `<main id="main">`, Footer and the dialog. It's for subpages.
- On the homepage, behaviour is unchanged. On subpages:
  - In-page anchors become `/#…`.
  - Labels found in `builtRoutes` become links.
  - Everything else calls `onOpen`.

- [ ] Take homepage screenshots at 1440×900 and 390×844 (scrolled to the top and to the footer) into `qa/before-shell-*.png`.
- [ ] Write `routes.ts` and `shell.tsx`, moving the JSX over unchanged.
- [ ] Update `app/page.tsx` to import from the shell.
- [ ] Run `npx tsc --noEmit` and `npm run check:copy`. Both must pass.
- [ ] Take the same screenshots as `qa/after-shell-*.png` and compare them visually. They must match.
- [ ] Commit: `refactor: move header and footer into shared site shell`

### Task 2: Content types and the draft copy linter

**Files:**
- Create:
  - `content/types.ts`
  - `scripts/lint-draft-copy.mjs`
  - `package.json` script `"lint:copy": "node scripts/lint-draft-copy.mjs"`

**Interfaces:**

```ts
export type Status = {status:'draft'; source:'draft, pending specialist copy'};
export type Seo = {title:string; description:string};
export type Hero = {kicker:string; title:string; body:string; reassurance?:string; channels?:string[]};
export type Item = {title:string; body:string};
export type Faq = {q:string; a:string};
export type Quote = {excerpt:string; attribution:string};
export type Related = {label:string; href:string; body:string};
export type Cta = {title:string; body:string};
export type FeaturePage = Status & {kind:'feature'; slug:string; seo:Seo; hero:Hero;
  steps:{title:string; intro:string; items:Item[]};
  features:{title:string; intro:string; items:Item[]};
  goodToKnow:{title:string; items:string[]};
  faq:{title:string; items:Faq[]}; related:{title:string; items:Related[]}; cta:Cta};
export type ChannelPage = Status & {kind:'channel'; slug:string; channel:'WhatsApp'|'Instagram'|'Messenger'|'Website'; seo:Seo; hero:Hero;
  jobs:{title:string; intro:string; items:Item[]};
  triggers:{title:string; intro:string; items:Item[]};
  setup:{title:string; intro:string; items:Item[]};
  goodToKnow:{title:string; items:string[]};
  faq:{title:string; items:Faq[]}; related:{title:string; items:Related[]}; cta:Cta};
export type UseCasePage = Status & {kind:'usecase'; slug:string; seo:Seo; hero:Hero;
  walkthrough:{title:string; intro:string; steps:{label:string; customer:string; agent:string; note:string}[]};
  capabilities:{title:string; intro:string; items:Item[]};
  tools:{title:string; intro:string; names:string[]};
  quote?:Quote; goodToKnow:{title:string; items:string[]};
  faq:{title:string; items:Faq[]}; cta:Cta};
export type IndustryPage = Status & {kind:'industry'; slug:string; card:'ecommerce'|'healthcare'|'education'|'realestate'|null; seo:Seo; hero:Hero;
  questions:{title:string; intro:string; items:{text:string; channel:string}[]};
  jobs:{title:string; intro:string; items:Item[]};
  tools:{title:string; intro:string; names:string[]};
  quotes:Quote[]; goodToKnow:{title:string; items:string[]};
  faq:{title:string; items:Faq[]}; cta:Cta};
export type HubPage = Status & {kind:'hub'; seo:Seo; hero:Hero; cards:(Related & {built:boolean})[]; cta:Cta};
export type PricingPage = Status & {kind:'pricing'; seo:Seo; hero:Hero;
  plans:{name:string; for:string; price:string; credits:string; items:string[]; featured?:boolean}[];
  credits:{title:string; intro:string; items:Item[]};
  faq:{title:string; items:Faq[]}; cta:Cta};
export type ContentPage = Status & {kind:'content'; seo:Seo; hero:Hero;
  sections:{title:string; paragraphs:string[]; items?:Item[]}[]; cta:Cta};
```

- **Linter:** walks `content/**/*.json` and checks every string value against `/—/`, `/!/`, the banned-word list (case-insensitive, whole word), `/salesforce|stripe/i`, and `/1 credit = 1/i`.
  - It also confirms every `quote.attribution` exists in `app/testimonials.json` and that the excerpt is a substring of that quote.
  - On a violation it prints the file, the JSON path and the offending text, and exits with code 1.

- [ ] Write `types.ts` and the linter.
- [ ] Write a temporary `content/_probe.json` containing `"x":"a — b"` and run `npm run lint:copy`. Expected: exit 1, reporting `_probe.json`.
- [ ] Delete the probe and run it again. Expected: exit 0 (there is no content yet).
- [ ] Commit: `feat: content types and draft copy linter`

### Task 3: Section components and the subpage CSS

**Files:**
- Create:
  - `components/sections/index.tsx` (`'use client'` where interaction is needed)
  - `app/subpages.css`, imported in `app/layout.tsx` after the existing imports

**Interfaces:**
- Produces:
  - `PageHero({hero, onOpen, visual?:ReactNode})`
  - `SectionIntro({eyebrow?, title, intro?})`
  - `StepRows({items, visuals?:ReactNode[]})`
  - `FeatureList({items})`
  - `GoodToKnow({title, items})`
  - `QuoteCard({quote})`
  - `Faq({title, items})`
  - `RelatedCards({title, items})`
  - `LogoStrip({names})`, which uses an `/brands/integrations/<slug>.svg` image when it exists and a text chip otherwise
  - `CtaBand({cta, onOpen})`
  - `Reveal({children})`, an IntersectionObserver fade that is skipped under reduced motion
  - Mockups: `ChatMock({channel, lines:{from:'customer'|'agent'; text:string}[]})`, `BroadcastMock()`, `PlanCard(...)`
- Uses the existing `ChannelLogo` from `app/channel-chat.tsx` and `CustomerQuote` from `app/quote.tsx`.

- [ ] Build the components and the `sp-` CSS:
  - Gradient stage matching `.hero` / `.final-section`.
  - Card radii and shadows matching the industry cards.
  - Navy / yellow / soft-blue tokens.
- [ ] Run `npx tsc --noEmit`. It must pass.
- [ ] Commit: `feat: subpage section components and styles`

### Task 4: Feature template and `/features/whatsapp-broadcast/`

**Files:**
- Create:
  - `content/features/whatsapp-broadcast.json`
  - `components/templates/feature.tsx`
  - `app/features/[slug]/page.tsx`
  - `lib/content.ts`, with `getFeature(slug)`, `listFeatures()` and the equivalents for channels, use cases and industries, each loaded through `import.meta.glob('/content/<type>/*.json', {eager:true})`

**Content facts:**
- Connect WhatsApp through Meta.
- Choose the agent that handles replies.
- Use an approved WhatsApp template.
- Choose the audience from a customer list, a CSV, Shopify customers or a single tag.
- Personalise with names and offers.
- Schedule the send.
- See the estimated messaging cost before sending.
- Replies go back to the agent and into the inbox.
- Opt-outs are respected.
- Limit: up to 1,000 messages per send at present. This is the "Good to know" item.
- Delivered, read and click reporting.

- [ ] Write the JSON, the template and the route. The route exports `generateStaticParams` and `generateMetadata`, and calls `notFound()` for an unknown slug.
- [ ] Run `npm run lint:copy` and `npx tsc --noEmit`. Both must pass.
- [ ] `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5173/features/whatsapp-broadcast/` returns 200, and `/features/nope/` returns 404.
- [ ] Commit: `feat: feature template with WhatsApp broadcast draft`

### Task 5: Channel template and `/channels/whatsapp-chatbot/`

**Files:**
- Create:
  - `content/channels/whatsapp-chatbot.json`
  - `components/templates/channel.tsx`
  - `app/channels/[slug]/page.tsx`

**Content facts:**
- Connects to your WhatsApp Business number through the official API.
- One Meta connection covers WhatsApp, Instagram and Messenger.
- Product cards, cart and checkout link.
- Missed-call reply.
- Starter questions.
- Click-to-WhatsApp ads lead into a flow (in the specialist's launch scope).
- Order updates through Shopify and the 5 shipping tools.
- Handoff to the team.
- Limits follow WhatsApp's messaging tiers. Templates need Meta approval.

- [ ] Write, lint, type-check, curl for 200 and 404, then commit: `feat: channel template with WhatsApp draft`

### Task 6: Use case template and `/use-cases/ai-sales-agent/`

**Files:**
- Create:
  - `content/use-cases/ai-sales-agent.json`
  - `components/templates/usecase.tsx`
  - `app/use-cases/[slug]/page.tsx`

**Content facts:**
- Recommends from the connected catalogue.
- Checks stock in Shopify or WooCommerce.
- Adds to cart and shares a checkout link in WhatsApp or Instagram. No built-in payment.
- Saves lead details to the CRM, or to HubSpot.
- Hands off to a person.
- Only offers discounts you have set up.
- Quote: Mysa Living (Anika Rao).

- [ ] Write, lint, type-check, curl for 200 and 404, then commit: `feat: use case template with sales agent draft`

### Task 7: Industry template, `/industries/ecommerce/` and the `/industries/` overview

**Files:**
- Create:
  - `content/industries/ecommerce.json`
  - `content/hubs/industries.json`
  - `components/templates/industry.tsx`
  - `components/templates/hub.tsx`
  - `app/industries/[slug]/page.tsx`
  - `app/industries/page.tsx`
- Modify:
  - `app/industries.tsx`: add `export` to `IndustryMockup`. No other change.

**Content facts:**
- Product questions, size and stock.
- Order tracking through Shopify, WooCommerce and the shipping tools.
- Cart recovery and COD confirmation on WhatsApp for Shopify stores.
- Instagram comment to DM.
- Returns answered from your policy pages.
- Quotes: North & Pine, Nivara.
- The overview lists all 7 industries from the homepage copy. Only Ecommerce is marked `built:true`. The other cards open the preview dialog.

- [ ] Write, lint, type-check, curl `/industries/`, `/industries/ecommerce/` and `/industries/nope/`, then commit: `feat: industry and hub templates with ecommerce draft`

### Task 8: `/pricing/` and `/about/`

**Files:**
- Create:
  - `content/pages/pricing.json`
  - `content/pages/about.json`
  - `components/templates/pricing.tsx`
  - `components/templates/content.tsx`
  - `app/pricing/page.tsx`
  - `app/about/page.tsx`

**Pricing:**
- Plans: Free, Starter, Growth, Scale, Enterprise.
- Price and credits are "To be confirmed" for every plan.
- Feature bullets come only from the verified plan facts:
  - Free does not include order tracking, human handoff or channel connections.
  - Starter adds those, plus workflows, broadcasting and all integrations.
- Credits section: "A credit is not a reply. The number of credits a reply uses depends on the AI model you choose." Also covers extra credit packs, a usage screen, and that credits do not carry over.

**About:**
- Founder Reshmanth Jonnalagadda.
- What we believe: answers from your information, the action and not only the reply, your team in control.
- No stats.

- [ ] Write, lint, type-check, curl both for 200, then commit: `feat: pricing and about drafts`

### Task 9: Wire the routes, export the draft copy, verify

**Files:**
- Modify:
  - `components/site/routes.ts`: add the 7 built routes.
  - `app/page.tsx` capability links only where a built route exists. These go through `resolveLabel`. No copy changes.
- Create:
  - `scripts/export-draft-copy.mjs`, which writes `docs/subpage-copy-draft.md` from `content/**`
  - `package.json` script `"export:copy"`

- [ ] Run `npm run export:copy` and check that the markdown lists all 7 pages.
- [ ] Run, all passing:
  - `npx tsc --noEmit`
  - `npm run lint:copy`
  - `npm run check:copy`
  - `npm run build`
- [ ] At 1440 and 390, screenshot each of the 7 pages and check `document.documentElement.scrollWidth <= innerWidth` on each one.
- [ ] Re-run the homepage before/after screenshot check.
- [ ] Commit: `feat: wire subpage routes and export draft copy for review`
