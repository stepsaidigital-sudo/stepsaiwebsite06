// Shapes for subpage copy. Every file is a draft until the SEO specialist's
// final copy replaces it; the layouts read only these fields.
// final = copy confirmed from an official Steps AI source; source says where it came from.
export type Status = { status: 'draft' | 'final'; source: string };
export type Seo = { title: string; description: string };
export type HeroImage = { src: string; alt: string; width: number; height: number };
export type Hero = { kicker: string; title: string; body: string; reassurance?: string; channels?: string[]; accent?: string[]; image?: HeroImage };
export type Item = { title: string; body: string };
export type Faq = { q: string; a: string };
export type Quote = { excerpt: string; attribution: string };
export type Related = { label: string; href: string; body: string; logo?: string };
export type Cta = { title: string; body: string; action?: string };
type Block = { title: string; intro: string; items: Item[] };
type FaqBlock = { title: string; items: Faq[] };
type Notes = { title: string; items: string[] };

export type FeaturePage = Status & {
  kind: 'feature'; slug: string; seo: Seo; hero: Hero;
  flow?: Item[]; steps: Block; features: Block; goodToKnow: Notes;
  faq: FaqBlock; related: { title: string; intro?: string; items: Related[] }; cta: Cta;
};

export type ChannelPage = Status & {
  kind: 'channel'; slug: string; channel: 'WhatsApp' | 'Instagram' | 'Messenger' | 'Website'; seo: Seo; hero: Hero;
  jobs: Block; triggers: Block; setup: Block; goodToKnow: Notes;
  faq: FaqBlock; related: { title: string; items: Related[] }; cta: Cta;
};

export type UseCasePage = Status & {
  kind: 'usecase'; slug: string; seo: Seo; hero: Hero;
  walkthrough: { title: string; intro: string; steps: { label: string; customer: string; agent: string; note: string; result?: string }[] };
  capabilities: Block; tools: { title: string; intro: string; names: string[] };
  quote?: Quote; goodToKnow: Notes; faq: FaqBlock; cta: Cta;
};

export type IndustryPage = Status & {
  kind: 'industry'; slug: string; card: 'ecommerce' | 'healthcare' | 'education' | 'realestate' | null; seo: Seo; hero: Hero;
  questions: { title: string; intro: string; items: { text: string; channel: string }[] };
  jobs: Block; tools: { title: string; intro: string; names: string[] };
  quotes: Quote[]; goodToKnow: Notes; faq: FaqBlock; cta: Cta;
  problems?: { title: string; intro: string; items: { pain: string; scene: string; fix: string; agent: string; ask?: string; reply?: string; count?: string }[] };
  agents?: { title: string; intro: string; items: { slug: string; does: string[]; photo?: string }[] };
  journey?: { title: string; intro: string; stages: { title: string; body: string; customer: string; agent: string; result: string; card: { title: string; chip: string; rows: string[][] } }[] };
};

// One page per connected app. Deep pages add a step-by-step walkthrough and
// ready-made workflows; standard pages share the same layout without them.
export type IntegrationPage = Status & {
  kind: 'integration'; slug: string; name: string; category: string; depth: 'deep' | 'standard'; seo: Seo; hero: Hero;
  demo: { channel: string; lines: { from: 'customer' | 'agent'; text: string }[]; lookup: { title: string; rows: string[][] } };
  useCases: Block;
  walkthrough?: { title: string; intro: string; steps: { label: string; customer: string; agent: string; note: string; result?: string }[] };
  workflows?: Block;
  setup: Block; goodToKnow: Notes; faq: FaqBlock; cta: Cta;
};

export type IntegrationApp = { slug: string; name: string; category: string; body: string };

// /integrations/: every connected app, grouped by category, plus the jobs
// they make possible.
export type IntegrationsHub = Status & {
  kind: 'integrations-hub'; seo: Seo; hero: Hero; categories: string[]; apps: IntegrationApp[];
  jobs: { title: string; intro: string; items: (Item & { apps: string[] })[] };
  custom: Cta; faq: FaqBlock; cta: Cta;
};

// Customer stories grouped by the agent they use. Every story is the customer's
// own quote; industry and tags only restate what the quote says.
export type Story = Quote & { brand: string; industry: string; tags: string[] };
export type CaseStudyPage = Status & {
  kind: 'case-study'; slug: string; agent: string; agentPage: string; seo: Seo; hero: Hero;
  stories: Story[]; capabilities: Block; goodToKnow: Notes; cta: Cta;
};
export type CaseStudiesHub = Status & { kind: 'case-studies-hub'; seo: Seo; hero: Hero; agents: { slug: string; label: string; count: number }[]; cta: Cta };

// Steps AI against one competitor: a side-by-side table, then an honest view of
// when each one is the better fit.
export type ComparePage = Status & {
  kind: 'compare'; slug: string; competitor: string; seo: Seo; hero: Hero;
  glance: { title: string; intro: string; rows: { label: string; steps: string; them: string }[] };
  ours: Block; theirs: Block; switching: Block; goodToKnow: Notes; faq: FaqBlock; cta: Cta;
};

export type HubPage = Status & { kind: 'hub'; seo: Seo; hero: Hero; cards: (Related & { built: boolean })[]; cta: Cta };

export type PricingPage = Status & {
  kind: 'pricing'; seo: Seo; hero: Hero;
  creditNote: { title: string; badge: string; body: string };
  plans: { name: string; for: string; monthly: number | null; annual: number | null; priceLabel?: string; credits: string; cta: string; items: string[]; featured?: boolean; badge?: string }[];
  addons: { eyebrow: string; title: string; intro: string; packs: { credits: string; price: string }[]; note: string; link: string };
  compare: { eyebrow: string; title: string; intro: string; plans: string[]; groups: { title: string; rows: [string, (string | boolean)[]][] }[] };
  faq: FaqBlock; cta: Cta;
};

// Legal text in order: sub-headings, paragraphs and bullet lists (used instead of paragraphs when present).
export type LegalBlock = { h3: string } | { p: string } | { ul: string[] };
export type ContentPage = Status & {
  kind: 'content'; seo: Seo; hero: Hero;
  sections: { title: string; paragraphs: string[]; items?: (Item & { href?: string })[]; body?: LegalBlock[] }[]; cta: Cta;
};

// Help centre (learning centre). Topics group lessons; a lesson is structured data so the
// page renders steps, where-to-click paths, callouts, tables and FAQs consistently.
// Media the team can attach later. image: a file in public/help/ or a full URL. video: an .mp4 file or a YouTube link.
export type HelpMedia = { type: 'image' | 'video' | 'youtube'; src: string; alt?: string; caption?: string };
export type HelpTopic = { slug: string; title: string; summary: string; icon: string; cover?: string; group?: 'featured' | 'beginner' | 'advanced' };
export type HelpCallout = { type: 'tip' | 'note' | 'warning'; text: string };
export type HelpLesson = {
  slug: string; topic: string; title: string; summary: string;
  level: 'Beginner' | 'Intermediate'; plans?: string;
  before?: string[];
  video?: HelpMedia;
  steps: { title: string; body: string; path?: string; media?: HelpMedia }[];
  table?: { caption: string; columns: string[]; rows: string[][] };
  callouts?: HelpCallout[];
  faq?: { q: string; a: string }[];
  related?: string[];
};
