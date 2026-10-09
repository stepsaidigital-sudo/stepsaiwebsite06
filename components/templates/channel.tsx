'use client';
import { BookOpen, Headphones, Package, ShoppingBag, Truck } from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { ChatMock, CtaBand, Faq, FeatureList, GoodToKnow, PageHero, RelatedCards, Reveal, SectionIntro, StepRows } from '@/components/sections';
import { ContextCard, scenesFor, StepTheatre, TimedChat, type Scene } from '@/components/sections/step-theatre';
import type { ChannelPage } from '@/content/types';

type Line = { from: 'customer' | 'agent'; text: string; at: number };
const chat = (channel: string, lines: Line[], t: number) => <TimedChat channel={channel} time={t} lines={lines} />;

// Animated scenes for "What your agent does", keyed by channel slug. Channels
// without scenes show the jobs as a plain list. Sample data is fictional.
const scenes: Record<string, Scene[]> = {
  'whatsapp-chatbot': [
    {
      tab: 'Answers', icon: <BookOpen size={20} />, label: 'Any time of day', result: 'Answered from your FAQs',
      render: t => <><ContextCard media={<span className="context-orb"><BookOpen size={18} /></span>} small="Your business information" title="Website, documents and FAQs." note="The agent answers from what you add" />{chat('WhatsApp', [
        { from: 'customer', text: 'Hi, do you deliver on Sundays?', at: 500 },
        { from: 'agent', text: 'We deliver Monday to Saturday. Orders placed on Sunday go out on Monday morning.', at: 2400 },
        { from: 'customer', text: 'Perfect, thank you.', at: 4300 },
      ], t)}</>,
    },
    {
      tab: 'Products', icon: <ShoppingBag size={20} />, label: 'Help them choose', result: 'Checkout link shared in the chat',
      render: t => <><ContextCard media={<img src="/industries/ecommerce.png" alt="" />} small="From your catalogue" title="Ceramic vase, cream." note="Added to cart" />{chat('WhatsApp', [
        { from: 'customer', text: 'Is the ceramic vase available in cream?', at: 500 },
        { from: 'agent', text: 'Yes, the cream vase is in stock. I have added it to your cart.', at: 2400 },
        { from: 'agent', text: 'Here is your checkout link whenever you are ready.', at: 4200 },
      ], t)}</>,
    },
    {
      tab: 'Orders', icon: <Truck size={20} />, label: 'After they buy', result: 'Order status from your delivery tool',
      render: t => <><ContextCard media={<span className="context-orb"><Package size={18} /></span>} small="Shopify and your delivery partner" title="Order #1042 is on its way." note="Tracking from your shipping tool" />{chat('WhatsApp', [
        { from: 'customer', text: 'Where is my order? It is #1042.', at: 500 },
        { from: 'agent', text: 'Your order has shipped and is out for delivery today.', at: 2400 },
        { from: 'customer', text: 'Great, I will be home.', at: 4300 },
      ], t)}</>,
    },
    {
      tab: 'Handoff', icon: <Headphones size={20} />, label: 'When a person is needed', result: 'Moved to your shared inbox',
      render: t => <><ContextCard media={<span className="context-orb"><Headphones size={18} /></span>} small="Shared inbox" title="Your team picks it up." note="With the full conversation" />{chat('WhatsApp', [
        { from: 'customer', text: 'I would like to change the address on my order.', at: 500 },
        { from: 'agent', text: 'I will pass this to our team so they can update it for you.', at: 2400 },
        { from: 'agent', text: 'Hi, this is Sam from the team. I can help with that.', at: 4400 },
      ], t)}</>,
    },
  ],
};

const heroLines: Record<string, { from: 'customer' | 'agent'; text: string }[]> = {
  'whatsapp-chatbot': [
    { from: 'customer', text: 'Do you have this in a smaller size?' },
    { from: 'agent', text: 'Yes, the small one is in stock. Shall I add it to your cart?' },
    { from: 'customer', text: 'Yes please.' },
    { from: 'agent', text: 'Done. Here is your checkout link.' },
  ],
};

export function ChannelTemplate({ page }: { page: ChannelPage }) {
  const pageScenes = scenesFor(scenes[page.slug], page.jobs.items);
  const lines = heroLines[page.slug];
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} visual={lines && <ChatMock channel={page.channel} title="Your store" lines={lines} />} />
    <section className="sp-section container"><SectionIntro eyebrow={<><ChannelLogo channel={page.channel} />{page.channel}</>} title={page.jobs.title} intro={page.jobs.intro} />{pageScenes ? <StepTheatre items={page.jobs.items} scenes={pageScenes} /> : <FeatureList items={page.jobs.items} />}</section>
    <section className="sp-section container sp-split"><SectionIntro title={page.triggers.title} intro={page.triggers.intro} /><FeatureList items={page.triggers.items} /></section>
    <section className="sp-section container"><SectionIntro eyebrow="Setup" title={page.setup.title} intro={page.setup.intro} /><StepRows items={page.setup.items} /></section>
    <section className="sp-section container"><GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} /></section>
    <Faq title={page.faq.title} items={page.faq.items} />
    <RelatedCards title={page.related.title} items={page.related.items} onOpen={onOpen} />
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}
