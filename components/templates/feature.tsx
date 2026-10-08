'use client';
import { CalendarDays, Check, FileSpreadsheet, Inbox, Megaphone, MessageSquare, Send, ShoppingBag, Tag, Users } from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { BroadcastMock, CtaBand, Faq, FeatureList, GoodToKnow, PageHero, RelatedCards, Reveal, SectionIntro, StepRows } from '@/components/sections';
import { ContextCard, SceneRow, SceneWindow, StepTheatre, TimedChat, type Scene } from '@/components/sections/step-theatre';
import type { FeaturePage } from '@/content/types';

// Animated "How it works" scenes, keyed by feature slug. A feature without
// scenes falls back to plain numbered steps. Sample data is fictional.
const scenes: Record<string, Scene[]> = {
  'whatsapp-broadcast': [
    {
      tab: 'Connect', icon: <ChannelLogo channel="WhatsApp" />, label: 'Set up once', result: 'Replies go to your sales agent',
      render: t => <>
        <ContextCard media={<span className="context-orb"><ChannelLogo channel="WhatsApp" /></span>} small="Connected through Meta" title="Your WhatsApp Business number." note="One connection for every campaign" />
        <SceneWindow icon={<ChannelLogo channel="WhatsApp" />} title="WhatsApp connection" sub="Settings · Channels">
          <SceneRow show={t >= 600} icon={<Check size={15} />} label="Meta account" value="Connected" />
          <SceneRow show={t >= 1700} icon={<Check size={15} />} label="WhatsApp number" value="Business number" />
          <SceneRow show={t >= 2900} icon={<MessageSquare size={15} />} label="Replies handled by" value="Sales agent" picked={t >= 4200} />
        </SceneWindow>
      </>,
    },
    {
      tab: 'Audience', icon: <Users size={20} />, label: 'Choose who hears from you', result: 'Audience ready: returning customers',
      render: t => <>
        <ContextCard media={<span className="context-orb"><Megaphone size={18} /></span>} small="New broadcast" title="New arrivals template." note={<>Approved by Meta <Check size={11} /></>} />
        <SceneWindow icon={<Users size={18} />} title="Choose your audience" sub="Broadcast · Step 2 of 3">
          <SceneRow show={t >= 500} icon={<Users size={15} />} label="Customer list" />
          <SceneRow show={t >= 1000} icon={<FileSpreadsheet size={15} />} label="Upload a CSV" />
          <SceneRow show={t >= 1500} icon={<ShoppingBag size={15} />} label="Shopify customers" />
          <SceneRow show={t >= 2000} icon={<Tag size={15} />} label="Tag: returning customer" value={t >= 3400 ? <Check size={15} /> : ''} picked={t >= 3400} />
        </SceneWindow>
      </>,
    },
    {
      tab: 'Schedule', icon: <CalendarDays size={20} />, label: 'Make it personal', result: 'Scheduled for Friday, 10:00 AM',
      render: t => <>
        <ContextCard media={<img src="/industries/ecommerce.png" alt="" />} small="A message worth opening" title="A little something, picked for you." note="Personalised for each customer" />
        <SceneWindow icon={<ChannelLogo channel="WhatsApp" />} title="Message preview" sub="Template · New arrivals">
          <div className={`sp-template-bubble ${t >= 400 ? 'message-arrived' : 'message-waiting'}`}>Hi <b className={t >= 1800 ? 'is-filled' : ''}>{t >= 1800 ? 'Priya' : 'first_name'}</b>, our new collection is in. Reply SIZE and we will help you choose.</div>
          <SceneRow show={t >= 2800} icon={<CalendarDays size={15} />} label="Send on" value="Friday, 10:00 AM" />
          <SceneRow show={t >= 3800} icon={<Send size={15} />} label="Estimated cost" value="Shown before you send" picked={t >= 4800} />
        </SceneWindow>
      </>,
    },
    {
      tab: 'Replies', icon: <MessageSquare size={20} />, label: 'Follow up every reply', result: 'Saved to your shared inbox',
      render: t => <>
        <ContextCard media={<span className="context-orb"><Inbox size={18} /></span>} small="Shared inbox" title="Every reply, in one place." note="Your team can step in at any time" />
        <TimedChat channel="WhatsApp" time={t} lines={[
          { from: 'agent', text: 'Hi Priya, our new collection is in. Reply SIZE and we will help you choose.', at: 300 },
          { from: 'customer', text: 'SIZE. Do you have the linen shirt in medium?', at: 1700 },
          { from: 'agent', text: 'Yes, medium is in stock. Would you like the link?', at: 3600 },
          { from: 'customer', text: 'Yes please.', at: 4900 },
        ]} />
      </>,
    },
  ],
};

export function FeatureTemplate({ page }: { page: FeaturePage }) {
  const pageScenes = scenes[page.slug];
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} visual={page.slug === 'whatsapp-broadcast' ? <BroadcastMock /> : undefined} />
    <section className="sp-section container"><SectionIntro eyebrow="How it works" title={page.steps.title} intro={page.steps.intro} />{pageScenes ? <StepTheatre items={page.steps.items} scenes={pageScenes} /> : <StepRows items={page.steps.items} />}</section>
    <section className="sp-section container sp-split"><SectionIntro title={page.features.title} intro={page.features.intro} /><FeatureList items={page.features.items} /></section>
    <section className="sp-section container"><GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} /></section>
    <Faq title={page.faq.title} items={page.faq.items} />
    <RelatedCards title={page.related.title} items={page.related.items} onOpen={onOpen} />
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}
