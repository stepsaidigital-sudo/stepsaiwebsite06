'use client';
import { BarChart3, CalendarDays, Check, Clock, FileSpreadsheet, GitBranch, Headphones, Inbox, Megaphone, MessageSquare, Send, ShoppingBag, Sparkles, Star, Tag, Ticket, UserPlus, Users } from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { BroadcastMock, CtaBand, Faq, FeatureList, GoodToKnow, PageHero, RelatedCards, Reveal, SectionIntro, StepRows } from '@/components/sections';
import { ContextCard, scenesFor, SceneRow, SceneWindow, StepTheatre, TimedChat, type Scene } from '@/components/sections/step-theatre';
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

// Hero product windows for features without a bespoke page. Illustrative,
// with fictional sample data; rows tick in as the page loads.
const heroVisuals: Record<string, React.ReactNode> = {
  'unified-inbox': <SceneWindow icon={<Inbox size={18} />} title="Shared inbox" sub="All agents · Illustration">
    <SceneRow show icon={<ChannelLogo channel="WhatsApp" />} label="Priya · Where is my order?" value="AI replied" />
    <SceneRow show icon={<ChannelLogo channel="Instagram" />} label="Rahul · Is the cream one back?" value="AI replied" />
    <SceneRow show icon={<Headphones size={15} />} label="Anu · Can I speak to someone?" value="Live request" picked />
    <SceneRow show icon={<Star size={15} />} label="Meera · Bulk order for 40 pieces" value="Starred" />
  </SceneWindow>,
  crm: <SceneWindow icon={<Users size={18} />} title="Customers" sub="CRM · Illustration">
    <SceneRow show icon={<UserPlus size={15} />} label="Meera Shah · Lumen Home" value="Website chat" />
    <SceneRow show icon={<UserPlus size={15} />} label="Rahul Mehta" value="Instagram" />
    <SceneRow show icon={<Ticket size={15} />} label="Ticket · Item arrived damaged" value="Open" picked />
    <SceneRow show icon={<Headphones size={15} />} label="Live request · Bulk order" value="Assigned" />
  </SceneWindow>,
  analytics: <SceneWindow icon={<BarChart3 size={18} />} title="Performance" sub="Last 7 days · Illustration">
    <SceneRow show icon={<MessageSquare size={15} />} label="Total chats" value="1,284" />
    <SceneRow show icon={<Clock size={15} />} label="Avg AI response time" value="2.1s" />
    <SceneRow show icon={<Sparkles size={15} />} label="Top question" value="Delivery times" picked />
    <SceneRow show icon={<CalendarDays size={15} />} label="Busiest hour" value="9 to 11 PM" />
  </SceneWindow>,
  skills: <SceneWindow icon={<Sparkles size={18} />} title="Agent skills" sub="Sales agent · Illustration">
    <SceneRow show icon={<CalendarDays size={15} />} label="Book appointment" value="Google Calendar" picked />
    <SceneRow show icon={<Ticket size={15} />} label="Create ticket" value="On" />
    <SceneRow show icon={<UserPlus size={15} />} label="Create customer" value="HubSpot" />
    <SceneRow show icon={<Headphones size={15} />} label="Human handoff" value="30 seconds" />
  </SceneWindow>,
  'workflow-builder': <SceneWindow icon={<GitBranch size={18} />} title="Cart recovery" sub="Workflow · Active · Illustration">
    <SceneRow show icon={<ShoppingBag size={15} />} label="When a cart is abandoned" value="Shopify" />
    <SceneRow show icon={<Clock size={15} />} label="Wait" value="1 hour" />
    <SceneRow show icon={<Check size={15} />} label="If not purchased" value="Condition" />
    <SceneRow show icon={<Send size={15} />} label="Send WhatsApp reminder" value="Template" picked />
  </SceneWindow>,
};

export function FeatureTemplate({ page }: { page: FeaturePage }) {
  const pageScenes = scenesFor(scenes[page.slug], page.steps.items);
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} visual={page.slug === 'whatsapp-broadcast' ? <BroadcastMock /> : heroVisuals[page.slug] && <div className="sp-feature-hero">{heroVisuals[page.slug]}</div>} />
    <section className="sp-section container"><SectionIntro eyebrow="How it works" title={page.steps.title} intro={page.steps.intro} />{pageScenes ? <StepTheatre items={page.steps.items} scenes={pageScenes} /> : <StepRows items={page.steps.items} />}</section>
    <section className="sp-section container sp-split"><SectionIntro title={page.features.title} intro={page.features.intro} /><FeatureList items={page.features.items} /></section>
    <section className="sp-section container"><GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} /></section>
    <Faq title={page.faq.title} items={page.faq.items} />
    <RelatedCards title={page.related.title} items={page.related.items} onOpen={onOpen} />
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}
