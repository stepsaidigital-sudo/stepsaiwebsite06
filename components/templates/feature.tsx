'use client';
import { SiteFrame } from '@/components/site/shell';
import { BroadcastMock, ChatMock, CtaBand, Faq, FeatureList, GoodToKnow, PageHero, RelatedCards, Reveal, SectionIntro, StepRows } from '@/components/sections';
import type { FeaturePage } from '@/content/types';
import { ChannelLogo } from '@/app/channel-chat';
import { Check, FileSpreadsheet, ShoppingBag, Tag, Users } from 'lucide-react';

function AudienceMock() {
  const options: [typeof Users, string, string, boolean][] = [[Users, 'Customer list', 'Saved in Steps AI', false], [FileSpreadsheet, 'Upload a CSV', 'Name and number columns', false], [ShoppingBag, 'Shopify customers', 'From your connected store', false], [Tag, 'Customers with a tag', 'returning customer', true]];
  return <Reveal className="sp-broadcast">
    <div className="mock-window-title"><span className="mock-icon"><Users size={19} /></span><div><strong>Choose your audience</strong><small>Illustration</small></div></div>
    <div className="sp-broadcast-body">{options.map(([Icon, label, detail, picked], i) => <div key={label} className={`sp-broadcast-row sp-line ${picked ? 'sp-picked' : ''}`} style={{ transitionDelay: `${150 + i * 160}ms` }}><Icon size={17} /><span>{label}<small>{detail}</small></span>{picked && <Check size={16} />}</div>)}</div>
  </Reveal>;
}

function ConnectMock() {
  const rows: [string, string][] = [['Meta account', 'Connected'], ['WhatsApp number', 'Business number'], ['Replies handled by', 'Sales agent']];
  return <Reveal className="sp-broadcast">
    <div className="mock-window-title"><span className="mock-icon"><ChannelLogo channel="WhatsApp" /></span><div><strong>WhatsApp connection</strong><small>Illustration</small></div></div>
    <div className="sp-broadcast-body">{rows.map(([label, value], i) => <div key={label} className="sp-broadcast-row sp-line" style={{ transitionDelay: `${150 + i * 180}ms` }}><Check size={17} /><span>{label}</span><strong>{value}</strong></div>)}</div>
  </Reveal>;
}

// Step mockups for the broadcast page. Other features fall back to text-only
// steps until they get their own illustrations.
const stepVisuals: Record<string, React.ReactNode[]> = {
  'whatsapp-broadcast': [
    <ConnectMock key="connect" />,
    <AudienceMock key="audience" />,
    <ChatMock key="personal" channel="WhatsApp" lines={[{ from: 'agent', text: 'Hi Priya, our new collection is in. Reply SIZE and we will help you choose.' }]} />,
    <ChatMock key="reply" channel="WhatsApp" lines={[{ from: 'agent', text: 'Hi Priya, our new collection is in. Reply SIZE and we will help you choose.' }, { from: 'customer', text: 'SIZE. Do you have the linen shirt in medium?' }, { from: 'agent', text: 'Yes, medium is in stock. Would you like the link?' }]} />,
  ],
};

export function FeatureTemplate({ page }: { page: FeaturePage }) {
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} visual={page.slug === 'whatsapp-broadcast' ? <BroadcastMock /> : undefined} />
    <section className="sp-section container"><SectionIntro eyebrow="How it works" title={page.steps.title} intro={page.steps.intro} /><StepRows items={page.steps.items} visuals={stepVisuals[page.slug]} /></section>
    <section className="sp-section container sp-split"><SectionIntro title={page.features.title} intro={page.features.intro} /><FeatureList items={page.features.items} /></section>
    <section className="sp-section container"><GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} /></section>
    <Faq title={page.faq.title} items={page.faq.items} />
    <RelatedCards title={page.related.title} items={page.related.items} onOpen={onOpen} />
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}
