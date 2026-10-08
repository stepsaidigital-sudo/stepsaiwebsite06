'use client';
import { AtSign, MessageSquare, Package, RotateCcw, ShoppingCart } from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { IndustryMockup } from '@/app/industries';
import { SiteFrame } from '@/components/site/shell';
import { CtaBand, Faq, FeatureList, GoodToKnow, LogoStrip, PageHero, QuoteCard, Reveal, SectionIntro } from '@/components/sections';
import { ContextCard, StepTheatre, TimedChat, type Scene } from '@/components/sections/step-theatre';
import type { IndustryPage } from '@/content/types';

type Line = { from: 'customer' | 'agent'; text: string; at: number };
const scene = (tab: string, Icon: typeof Package, channel: string, label: string, result: string, card: [string, string, string], lines: Line[], image = false): Scene => ({
  tab, icon: Icon === MessageSquare ? <ChannelLogo channel={channel} /> : <Icon size={20} />, label, result,
  render: t => <><ContextCard media={image ? <img src="/industries/ecommerce.png" alt="" /> : <span className="context-orb"><Icon size={18} /></span>} small={card[0]} title={card[1]} note={card[2]} /><TimedChat channel={channel} time={t} lines={lines} /></>,
});

// Animated scenes for "What your agent handles", keyed by industry slug.
// Industries without scenes list the jobs instead. Sample data is fictional.
const scenes: Record<string, Scene[]> = {
  ecommerce: [
    scene('Products', MessageSquare, 'WhatsApp', 'Before they buy', 'Checked in your store', ['From your catalogue', 'Linen shirt, medium.', 'In stock'], [
      { from: 'customer', text: 'Do you have the linen shirt in a medium?', at: 500 },
      { from: 'agent', text: 'Yes, medium is in stock in white and sand. Would you like to see both?', at: 2500 },
    ], true),
    scene('Orders', Package, 'WhatsApp', 'After they buy', 'Status from your delivery tool', ['Shopify and your delivery partner', 'Order #2087 has shipped.', 'Out for delivery today'], [
      { from: 'customer', text: 'Where is my order? It is #2087.', at: 500 },
      { from: 'agent', text: 'It has shipped and is out for delivery today.', at: 2500 },
    ]),
    scene('Carts', ShoppingCart, 'WhatsApp', 'Shopify stores', 'COD order confirmed before shipping', ['Cash on delivery', 'Please confirm your order.', 'Sent on WhatsApp'], [
      { from: 'agent', text: 'Hi Aisha, please confirm your cash on delivery order for the ceramic vase.', at: 500 },
      { from: 'customer', text: 'Confirmed, thank you.', at: 2400 },
    ], true),
    scene('Comments', AtSign, 'Instagram', 'From your posts', 'Comment turned into a DM', ['Comment on your post', '“PRICE”', 'Reply sent as a direct message'], [
      { from: 'agent', text: 'Thanks for your comment. The vase is in our new collection. Here is the link.', at: 900 },
      { from: 'customer', text: 'Does it come in cream?', at: 2800 },
    ]),
    scene('Returns', RotateCcw, 'Website', 'From your policy', 'Answered from your returns page', ['Your returns policy', 'Returns and exchanges.', 'From your policy pages'], [
      { from: 'customer', text: 'How do I return something that does not fit?', at: 500 },
      { from: 'agent', text: 'You can return unworn items within the period on our returns page. Shall I share the steps?', at: 2600 },
    ]),
  ],
};

export function IndustryTemplate({ page }: { page: IndustryPage }) {
  const pageScenes = scenes[page.slug];
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} visual={page.card && <div className="sp-industry-stage" aria-hidden="true"><div className="industry-arc" /><IndustryMockup kind={page.card} /></div>} />
    <section className="sp-section container"><SectionIntro eyebrow="What customers ask" title={page.questions.title} intro={page.questions.intro} /><Reveal><ul className="sp-chips sp-chips-float">{page.questions.items.map((item, i) => <li key={item.text} style={{ animationDelay: `${i * -1.3}s` }}><ChannelLogo channel={item.channel} /><span>{item.text}</span></li>)}</ul></Reveal></section>
    <section className="sp-section container"><SectionIntro title={page.jobs.title} intro={page.jobs.intro} />{pageScenes ? <StepTheatre items={page.jobs.items} scenes={pageScenes} /> : <FeatureList items={page.jobs.items} />}</section>
    <section className="sp-section container"><SectionIntro eyebrow="Integrations" title={page.tools.title} intro={page.tools.intro} /><Reveal><LogoStrip names={page.tools.names} /></Reveal></section>
    {page.quotes.length > 0 && <section className="sp-section container"><div className="sp-quotes">{page.quotes.map(quote => <QuoteCard key={quote.attribution} quote={quote} />)}</div></section>}
    <section className="sp-section container"><GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} /></section>
    <Faq title={page.faq.title} items={page.faq.items} />
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}
