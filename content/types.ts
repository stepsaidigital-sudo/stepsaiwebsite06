// Shapes for subpage copy. Every file is a draft until the SEO specialist's
// final copy replaces it; the layouts read only these fields.
export type Status = { status: 'draft'; source: 'draft, pending specialist copy' };
export type Seo = { title: string; description: string };
export type Hero = { kicker: string; title: string; body: string; reassurance?: string; channels?: string[] };
export type Item = { title: string; body: string };
export type Faq = { q: string; a: string };
export type Quote = { excerpt: string; attribution: string };
export type Related = { label: string; href: string; body: string };
export type Cta = { title: string; body: string };
type Block = { title: string; intro: string; items: Item[] };
type FaqBlock = { title: string; items: Faq[] };
type Notes = { title: string; items: string[] };

export type FeaturePage = Status & {
  kind: 'feature'; slug: string; seo: Seo; hero: Hero;
  steps: Block; features: Block; goodToKnow: Notes;
  faq: FaqBlock; related: { title: string; items: Related[] }; cta: Cta;
};

export type ChannelPage = Status & {
  kind: 'channel'; slug: string; channel: 'WhatsApp' | 'Instagram' | 'Messenger' | 'Website'; seo: Seo; hero: Hero;
  jobs: Block; triggers: Block; setup: Block; goodToKnow: Notes;
  faq: FaqBlock; related: { title: string; items: Related[] }; cta: Cta;
};

export type UseCasePage = Status & {
  kind: 'usecase'; slug: string; seo: Seo; hero: Hero;
  walkthrough: { title: string; intro: string; steps: { label: string; customer: string; agent: string; note: string }[] };
  capabilities: Block; tools: { title: string; intro: string; names: string[] };
  quote?: Quote; goodToKnow: Notes; faq: FaqBlock; cta: Cta;
};

export type IndustryPage = Status & {
  kind: 'industry'; slug: string; card: 'ecommerce' | 'healthcare' | 'education' | 'realestate' | null; seo: Seo; hero: Hero;
  questions: { title: string; intro: string; items: { text: string; channel: string }[] };
  jobs: Block; tools: { title: string; intro: string; names: string[] };
  quotes: Quote[]; goodToKnow: Notes; faq: FaqBlock; cta: Cta;
};

export type HubPage = Status & { kind: 'hub'; seo: Seo; hero: Hero; cards: (Related & { built: boolean })[]; cta: Cta };

export type PricingPage = Status & {
  kind: 'pricing'; seo: Seo; hero: Hero;
  plans: { name: string; for: string; price: string; credits: string; items: string[]; featured?: boolean }[];
  credits: Block; faq: FaqBlock; cta: Cta;
};

export type ContentPage = Status & {
  kind: 'content'; seo: Seo; hero: Hero;
  sections: { title: string; paragraphs: string[]; items?: Item[] }[]; cta: Cta;
};
