'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight, BadgeCheck, BarChart3, BookOpen, Bot, CalendarCheck, CalendarDays, Check, CircleCheck, Clock, FileText, Globe, Headphones,
  Inbox, Languages, Link2, Mail, Megaphone, MessageCircle, MessageSquare, PackageCheck, PhoneCall, PhoneIncoming, Search, Send,
  ShieldCheck, ShoppingBag, ShoppingCart, Sparkles, Tag, Ticket, Truck, UserCheck, UserPlus, Users, Voicemail, Workflow,
} from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';
import {
  Bubble, Capabilities, IndustryExamples, Card, Chip, ChannelRow, CtaBlock, FaqBlock, Float, GoodToKnow, HeroScene, LiveCall, LivePhone, PhotoStory,
  PremiumHero, QuoteBlock, Row, StepBand, ToolCards, type Line, type Stage,
} from '@/components/premium/kit';
import type { UseCasePage } from '@/content/types';
import { industryScenarios } from './agent-industries';

// The six AI agent pages, on the premium template. Copy comes from content/use-cases/*.json;
// this file only adds each page's colour, photos and illustrative mockups (fictional sample data).

const PRODUCT = '/industries/ecommerce.png';

/* ---------- shared stories (sections inside pages, not pages of their own) ---------- */

function InboxHandoff({ customer, ask, agentLine, team }: { customer: string; ask: string; agentLine: string; team: string }) {
  return <div className="pp-inbox">
    <div className="pp-inbox-head"><span className="wb-avatar wb-peach">{customer[0]}</span><div><strong>{customer}</strong><small>Shared inbox · Live request</small></div><Chip tone="soft"><Headphones size={11} />Needs a person</Chip></div>
    <div className="pp-inbox-thread">
      <p className="is-customer">{ask}</p>
      <p className="is-agent">{agentLine}</p>
      <span className="pp-inbox-event"><UserCheck size={14} />Alex joined with the full history</span>
      <p className="is-team">{team}</p>
    </div>
    <div className="pp-inbox-foot"><span><i className="pp-online" />Assigned to Alex</span><span><Bot size={13} />AI replies paused</span></div>
  </div>;
}

export function handoffStory(theme: { customer: string; ask: string; agentLine: string; team: string }, reverse = false, photo?: string) {
  return <PhotoStory key="handoff" id="handoff" reverse={reverse} tint="warm" eyebrow="Human handoff" title="Your team steps in, with the whole conversation."
    body="When a customer asks for a person, or the agent reaches something it should not handle, the chat moves to your shared inbox with the full history. Nobody has to repeat themselves."
    points={['Set a wait time and a fallback message', 'Email the right person when someone is needed', 'On Instagram, replying from the app pauses the AI']}
    photo={photo} alt="A team member stepping in to help a customer"
    overlay={<InboxHandoff {...theme} />} />;
}

function catalogStory(photo: string) {
  return <PhotoStory key="catalog" id="catalogue" eyebrow="Product catalogue" title="Your catalogue, right inside the chat."
    body="Connect Shopify or WooCommerce and your agent recommends real products, checks stock and sends a checkout link, without the customer leaving the conversation."
    points={['Products and prices from your own store', 'Stock checked before anything is suggested', 'Cart and checkout link in WhatsApp and Instagram']}
    photo={photo} alt="Products from a store catalogue"
    overlay={<LivePhone kind="WhatsApp" business="Lumen Home" className="pp-story-phone" period={9000} lines={[
      { from: 'customer', text: 'Something decorative under 3,000?', at: 400 },
      { from: 'agent', text: 'Two picks from the collection:', at: 2000, card: <div className="pp-products">
        <div className="pp-product"><img src={PRODUCT} alt="" /><div><strong>Ceramic vase</strong><small>₹2,450</small><b>View</b></div></div>
        <div className="pp-product"><img src={PRODUCT} alt="" style={{ objectPosition: '85% 50%' }} /><div><strong>Bowl set</strong><small>₹2,800</small><b>View</b></div></div>
      </div> },
      { from: 'customer', text: 'The vase, in cream.', at: 4600 },
      { from: 'agent', text: 'In stock. Here is your checkout link.', at: 6400 },
    ]} />} />;
}

const leadStory = <PhotoStory key="lead" id="leads" reverse eyebrow="Lead generation" title="Every interested visitor becomes a lead you can follow up."
  body="Your agent answers first, then asks only for the details you switched on. Each lead is saved with where it came from, so your team follows up with context."
  points={['Name, email, company and your own custom fields', 'Verify by email or phone code', 'Saved to your CRM or HubSpot, tagged by source']}
  photo="/photos/st-leads.jpg" alt="Business meeting about a new enquiry"
  overlay={<Card title="New lead" status={<Chip tone="green"><Check size={11} />Saved</Chip>}>
    <Row icon={<UserPlus size={15} />} title="Meera Shah" sub="meera@lumenhome.in · Verified" />
    <Row icon={<Tag size={15} />} title="Lumen Home" sub="Tag: quote request · Source: website" />
    <Row icon={<img src="/brands/integrations/hubspot.svg" alt="" width={16} height={16} />} title="Synced to HubSpot" sub="Owner: sales team" picked />
  </Card>} />;

/* ---------- the other agents: one platform, many jobs ---------- */

const agents = [
  { slug: 'ai-sales-agent', label: 'AI sales agent', body: 'Help customers choose and buy', icon: <ShoppingBag size={18} />, tint: 'violet' },
  { slug: 'ai-support-agent', label: 'AI support agent', body: 'Answer questions at any hour', icon: <Headphones size={18} />, tint: 'teal' },
  { slug: 'ai-lead-capture-agent', label: 'AI lead capture agent', body: 'Collect details in the chat', icon: <UserPlus size={18} />, tint: 'amber' },
  { slug: 'ai-booking-agent', label: 'AI booking agent', body: 'Book appointments and demos', icon: <CalendarDays size={18} />, tint: 'green' },
  { slug: 'ai-receptionist', label: 'AI receptionist', body: 'Answer calls and take bookings', icon: <PhoneCall size={18} />, tint: 'blue' },
  { slug: 'ai-marketing-agent', label: 'AI marketing agent', body: 'Campaigns and comment replies', icon: <Megaphone size={18} />, tint: 'rose' },
];

export function OtherAgents({ current, title = 'One agent can do more than one job.' }: { current: string; title?: string }) {
  return <section className="container pp-agents-wrap">
    <div className="pp-head"><span className="wb-eyebrow">One platform</span><h2>{title}</h2><p>Give the same agent the skills it needs, or run a separate agent for each job. They share your information, inbox and contacts.</p></div>
    <div className="pp-agents">{agents.filter(a => a.slug !== current).map(a => <Reveal key={a.slug}><Link className="pp-agent" href={`/use-cases/${a.slug}/`}>
      <span className={`pp-cap-ico wb-${a.tint}`}>{a.icon}</span><span><strong>{a.label}</strong><small>{a.body}</small></span><ArrowRight size={15} />
    </Link></Reveal>)}</div>
  </section>;
}

/* ---------- per-page design ---------- */

type Design = {
  icon: ReactNode; accent: string[]; photo: string; alt: string;
  hero: (page: UseCasePage) => ReactNode;
  cards: ReactNode[]; bandCta: { label: string; icon: ReactNode };
  capIcons: [ReactNode, string][]; stories: ReactNode[]; ctaArt: [ReactNode, ReactNode];
};

const chat = (page: UseCasePage, steps: number[], gap = 2300): Line[] => steps.flatMap((s, i) => {
  const step = page.walkthrough.steps[s];
  return [{ from: 'customer' as const, text: step.customer, at: 400 + i * gap * 2 }, { from: 'agent' as const, text: step.agent, at: 400 + i * gap * 2 + gap }];
});

const result = (icon: ReactNode, title: string, sub: string) => <div className="pp-result"><span>{icon}</span><div><strong>{title}</strong><small>{sub}</small></div></div>;
const ctaStack = (...items: ReactNode[]) => <div className="pp-cta-stack">{items.map((item, i) => <Float key={i}>{item}</Float>)}</div>;

const designs: Record<string, Design> = {
  'ai-sales-agent': {
    icon: <ShoppingBag size={16} />, accent: ['choose and buy'], photo: '/photos/sales.jpg', alt: 'Customer shopping on her phone, with a WhatsApp sales conversation',
    hero: page => <HeroScene photo="/photos/sales.jpg" alt="Customer shopping on her phone, with a WhatsApp sales conversation">
      <LivePhone kind="WhatsApp" business="Lumen Home" className="pp-hero-phone" period={14000} lines={chat(page, [0, 1, 3])} />
      <Float className="pp-pos-tr"><div className="pp-float-head"><Sparkles size={14} />Picked from your catalogue</div><div className="pp-products"><div className="pp-product"><img src={PRODUCT} alt="" /><div><strong>Ceramic vase</strong><small>₹2,450 · In stock</small></div></div></div></Float>
      <Float className="pp-pos-br">{result(<ShoppingCart size={16} />, 'Checkout link sent', 'Payment on your own checkout')}</Float>
      <span className="pp-bubble-logo pp-pos-logo"><ChannelLogo channel="WhatsApp" /></span>
    </HeroScene>,
    cards: [
      <Card key="0" title="What the customer needs" status={<Chip>Understanding</Chip>}>
        <Row icon={<Sparkles size={15} />} title="Gift for a new home" sub="Occasion" delay={200} />
        <Row icon={<Tag size={15} />} title="Around ₹3,000" sub="Budget" delay={400} />
        <Row icon={<MessageSquare size={15} />} title="Practical or decorative?" sub="One short question" picked delay={600} />
      </Card>,
      <Card key="1" title="From your catalogue" status={<Chip tone="green"><Check size={11} />Shopify</Chip>}>
        <Row icon={<img src={PRODUCT} alt="" className="pp-thumb" />} title="Ceramic vase" sub="₹2,450 · Decor" picked delay={200} />
        <Row icon={<img src={PRODUCT} alt="" className="pp-thumb" style={{ objectPosition: '85% 50%' }} />} title="Serving bowl set" sub="₹2,800 · Kitchen" delay={400} />
      </Card>,
      <Card key="2" title="Stock check" status={<Chip tone="green"><PackageCheck size={11} />In stock</Chip>}>
        <Row icon={<Search size={15} />} title="Ceramic vase · Cream" sub="Checked in your store just now" delay={200} />
        <Row icon={<PackageCheck size={15} />} title="12 available" sub="Ready to ship" picked delay={450} />
      </Card>,
      <Card key="3" title="Cart" status={<Chip>1 item</Chip>}>
        <Row icon={<img src={PRODUCT} alt="" className="pp-thumb" />} title="Ceramic vase · Cream" sub="₹2,450" delay={200} />
        <Row icon={<Link2 size={15} />} title="Checkout link sent" sub="Customer pays on your checkout page" picked delay={450} />
      </Card>,
    ],
    bandCta: { label: 'Connect your store', icon: <img src="/brands/integrations/shopify.svg" alt="" /> },
    capIcons: [[<Sparkles key="a" size={20} />, 'violet'], [<PackageCheck key="b" size={20} />, 'teal'], [<ShoppingCart key="c" size={20} />, 'rose'], [<UserPlus key="d" size={20} />, 'amber'], [<Tag key="e" size={20} />, 'violet'], [<Headphones key="f" size={20} />, 'blue']],
    stories: [catalogStory('/photos/st-catalog-sales.jpg'), handoffStory({ customer: 'Rahul Mehta', ask: 'I need 40 vases for an event. Can someone help?', agentLine: 'That is a large order, so I am bringing in our team.', team: 'Hi Rahul, Alex here. I can do a bulk price for 40.' }, true, '/photos/ho-sales.jpg')],
    ctaArt: [ctaStack(result(<Sparkles size={15} />, 'Two picks', 'From your catalogue'), result(<PackageCheck size={15} />, 'In stock', 'Checked in your store')), ctaStack(result(<ShoppingCart size={15} />, 'Added to cart', 'Ceramic vase'), result(<Link2 size={15} />, 'Checkout link', 'Sent in the chat'))],
  },

  'ai-support-agent': {
    icon: <Headphones size={16} />, accent: ['before they reach your team'], photo: '/photos/support.jpg', alt: 'Small business owner answering customers, with a WhatsApp support conversation',
    hero: page => <HeroScene photo="/photos/support.jpg" alt="Small business owner answering customers, with a WhatsApp support conversation">
      <LivePhone kind="WhatsApp" business="Lumen Home" className="pp-hero-phone" period={14000} lines={chat(page, [0, 1, 2])} />
      <Float className="pp-pos-tr"><div className="pp-float-head"><Truck size={14} />Order #2087</div><div className="pp-track"><i className="is-done" /><i className="is-done" /><i className="is-now" /><i /></div><small className="pp-track-label">Out for delivery today</small></Float>
      <Float className="pp-pos-br">{result(<Ticket size={16} />, 'Ticket #431 created', 'Photo attached · Team notified')}</Float>
      <span className="pp-bubble-logo pp-pos-logo"><ChannelLogo channel="WhatsApp" /></span>
    </HeroScene>,
    cards: [
      <Card key="0" title="Order #2087" status={<Chip tone="green"><Truck size={11} />Shipped</Chip>}>
        <Row icon={<img src="/brands/integrations/shopify.svg" alt="" width={16} height={16} />} title="Found in Shopify" sub="2 items · Paid" delay={200} />
        <Row icon={<img src="/brands/integrations/shiprocket.svg" alt="" width={16} height={16} />} title="Out for delivery" sub="Carrier status, checked just now" picked delay={450} />
      </Card>,
      <Card key="1" title="Answer source" status={<Chip>Your help content</Chip>}>
        <Row icon={<BookOpen size={15} />} title="Returns policy" sub="yourstore.com/returns" picked delay={200} />
        <Row icon={<FileText size={15} />} title="“Unworn items can be returned…”" sub="Matched passage" delay={450} />
      </Card>,
      <Card key="2" title="Ticket #431" status={<Chip tone="soft">Open</Chip>}>
        <Row icon={<Ticket size={15} />} title="Item arrived damaged" sub="Order #2087" delay={200} />
        <Row icon={<FileText size={15} />} title="Photo attached" sub="Required field collected" delay={400} />
        <Row icon={<Mail size={15} />} title="Support team emailed" sub="Notified on creation" picked delay={600} />
      </Card>,
      <Card key="3" title="Live request" status={<Chip tone="soft"><Headphones size={11} />Claimed</Chip>}>
        <Row icon={<UserCheck size={15} />} title="Alex joined" sub="Full conversation history" picked delay={200} />
        <Row icon={<Bot size={15} />} title="AI replies paused" sub="Until your team hands back" delay={450} />
      </Card>,
    ],
    bandCta: { label: 'Connect your store', icon: <img src="/brands/integrations/shopify.svg" alt="" /> },
    capIcons: [[<Truck key="a" size={20} />, 'teal'], [<BookOpen key="b" size={20} />, 'blue'], [<Ticket key="c" size={20} />, 'amber'], [<Headphones key="d" size={20} />, 'violet'], [<PhoneIncoming key="e" size={20} />, 'green']],
    stories: [handoffStory({ customer: 'Priya Shah', ask: 'Can I speak to someone about the damaged vase?', agentLine: 'Of course. I have passed this to our team.', team: 'Hi Priya, Alex here. A replacement is on its way.' }, false, '/photos/ho-support.jpg')],
    ctaArt: [ctaStack(result(<Truck size={15} />, 'Order checked', 'Out for delivery'), result(<BookOpen size={15} />, 'Policy answered', 'From your returns page')), ctaStack(result(<Ticket size={15} />, 'Ticket created', 'Photo attached'), result(<UserCheck size={15} />, 'Team joined', 'Full history'))],
  },

  'ai-lead-capture-agent': {
    icon: <UserPlus size={16} />, accent: ['still talking to you'], photo: '/photos/lead-capture.jpg', alt: 'Business buyer on a laptop, with a website chat collecting lead details',
    hero: page => <HeroScene photo="/photos/lead-capture.jpg" alt="Business buyer on a laptop, with a website chat collecting lead details">
      <LivePhone kind="Website" business="Lumen Home" className="pp-hero-phone" period={14000} lines={chat(page, [0, 1, 2])} />
      <Float className="pp-pos-tr"><div className="pp-float-head"><UserPlus size={14} />Collecting details</div><div className="pp-fields"><span><b>Name</b>Meera</span><span><b>Work email</b>meera@lumenhome.in</span><span><b>Company</b>Lumen Home</span></div></Float>
      <Float className="pp-pos-br">{result(<img src="/brands/integrations/hubspot.svg" alt="" width={18} height={18} />, 'Lead saved to HubSpot', 'Tagged: quote request')}</Float>
      <span className="pp-bubble-logo pp-pos-logo"><Globe size={28} /></span>
    </HeroScene>,
    cards: [
      <Card key="0" title="Answered first" status={<Chip>Your information</Chip>}>
        <Row icon={<BookOpen size={15} />} title="Plans and channels" sub="From your pricing page" picked delay={200} />
        <Row icon={<MessageSquare size={15} />} title="No form yet" sub="The agent answers before it asks" delay={450} />
      </Card>,
      <Card key="1" title="Lead fields" status={<Chip tone="soft">3 switched on</Chip>}>
        <Row icon={<UserCheck size={15} />} title="Name" sub="Required" delay={200} />
        <Row icon={<Mail size={15} />} title="Work email" sub="Required · Verify by code" picked delay={400} />
        <Row icon={<Users size={15} />} title="Company" sub="Optional" delay={600} />
      </Card>,
      <Card key="2" title="New lead" status={<Chip tone="green"><Check size={11} />Saved</Chip>}>
        <Row icon={<UserPlus size={15} />} title="Meera Shah · Lumen Home" sub="meera@lumenhome.in" delay={200} />
        <Row icon={<Tag size={15} />} title="Source: website chat" sub="Agent: Sales assistant" delay={400} />
        <Row icon={<img src="/brands/integrations/hubspot.svg" alt="" width={16} height={16} />} title="Synced to HubSpot" sub="Ready for follow-up" picked delay={600} />
      </Card>,
    ],
    bandCta: { label: 'Connect HubSpot', icon: <img src="/brands/integrations/hubspot.svg" alt="" /> },
    capIcons: [[<FileText key="a" size={20} />, 'amber'], [<ShieldCheck key="b" size={20} />, 'green'], [<UserPlus key="c" size={20} />, 'blue'], [<Tag key="d" size={20} />, 'violet']],
    stories: [leadStory, handoffStory({ customer: 'Meera Shah', ask: 'We have three stores. Could someone call me today?', agentLine: 'I have saved your details and alerted our team.', team: 'Hi Meera, Alex here. Free at 4 for a quick call?' }, false, '/photos/ho-lead.jpg')],
    ctaArt: [ctaStack(result(<MessageSquare size={15} />, 'Question answered', 'Before any form'), result(<Mail size={15} />, 'Email verified', 'By code')), ctaStack(result(<UserPlus size={15} />, 'Lead saved', 'With its source'), result(<Users size={15} />, 'Team follows up', 'With context'))],
  },

  'ai-booking-agent': {
    icon: <CalendarDays size={16} />, accent: ['any time of day'], photo: '/photos/booking.jpg', alt: 'Clinic reception, with a WhatsApp booking conversation',
    hero: page => <HeroScene photo="/photos/booking.jpg" alt="Clinic reception, with a WhatsApp booking conversation">
      <LivePhone kind="WhatsApp" business="City Care Clinic" className="pp-hero-phone" period={14000} lines={chat(page, [0, 1, 2])} />
      <Float className="pp-pos-tr"><div className="pp-float-head"><CalendarDays size={14} />Thursday</div><div className="pp-slots"><span>11:00</span><span className="is-picked">3:30 <Check size={11} /></span><span>5:00</span></div></Float>
      <Float className="pp-pos-br">{result(<CalendarCheck size={16} />, 'Booked · Thu 3:30', 'Added to Google Calendar')}</Float>
      <span className="pp-bubble-logo pp-pos-logo"><ChannelLogo channel="WhatsApp" /></span>
    </HeroScene>,
    cards: [
      <Card key="0" title="First consultation" status={<Chip>Service</Chip>}>
        <Row icon={<Clock size={15} />} title="45 minutes" sub="From your service list" picked delay={200} />
        <Row icon={<FileText size={15} />} title="Bring previous reports" sub="Preparation note" delay={450} />
      </Card>,
      <Card key="1" title="Free this week" status={<Chip tone="soft"><img src="/brands/integrations/google-calendar.svg" alt="" width={12} height={12} />Google Calendar</Chip>}>
        <div className="pp-slots pp-slots-card"><span>Thu 11:00</span><span className="is-picked">Thu 3:30 <Check size={11} /></span><span>Fri 10:00</span><span>Fri 4:30</span></div>
      </Card>,
      <Card key="2" title="Booking confirmed" status={<Chip tone="green"><Check size={11} />Booked</Chip>}>
        <Row icon={<CalendarCheck size={15} />} title="Thursday, 3:30 PM" sub="First consultation · 45 min" picked delay={200} />
        <Row icon={<UserCheck size={15} />} title="Priya" sub="Name and phone collected" delay={450} />
      </Card>,
    ],
    bandCta: { label: 'Connect your calendar', icon: <img src="/brands/integrations/google-calendar.svg" alt="" /> },
    capIcons: [[<CalendarCheck key="a" size={20} />, 'green'], [<UserCheck key="b" size={20} />, 'blue'], [<CalendarDays key="c" size={20} />, 'teal'], [<MessageSquare key="d" size={20} />, 'violet']],
    stories: [handoffStory({ customer: 'Priya Rao', ask: 'Can I ask the doctor something before I book?', agentLine: 'Let me bring in the clinic team for that.', team: 'Hi Priya, this is the front desk. Happy to help.' }, false, '/photos/ho-booking.jpg')],
    ctaArt: [ctaStack(result(<MessageSquare size={15} />, 'Question answered', '45 min consultation'), result(<CalendarDays size={15} />, 'Times offered', 'From your calendar')), ctaStack(result(<CalendarCheck size={15} />, 'Booked', 'Thursday, 3:30'), result(<Check size={15} />, 'Details saved', 'Name and phone'))],
  },

  'ai-receptionist': {
    icon: <PhoneCall size={16} />, accent: ['even when you cannot'], photo: '/photos/receptionist.jpg', alt: 'Front desk on a phone call, with a live call transcript',
    hero: page => <HeroScene photo="/photos/receptionist.jpg" alt="Front desk on a phone call, with a live call transcript">
      <LiveCall business="City Care Clinic" className="pp-hero-phone" period={13000} transcript={page.walkthrough.steps.flatMap((s, i) => [{ who: 'Caller', text: s.customer, at: 600 + i * 4000 }, { who: 'AI receptionist', text: s.agent, at: 2400 + i * 4000 }])} />
      <Float className="pp-pos-tr"><div className="pp-float-head"><Languages size={14} />Speaks</div><div className="pp-langs"><span className="is-picked">English</span><span>हिन्दी</span><span>తెలుగు</span></div></Float>
      <Float className="pp-pos-br">{result(<CalendarCheck size={16} />, 'Saturday 11:00 booked', 'Confirmation sent')}</Float>
      <span className="pp-bubble-logo pp-pos-logo"><PhoneIncoming size={26} /></span>
    </HeroScene>,
    cards: [
      <Card key="0" title="Incoming call" status={<Chip tone="green"><PhoneIncoming size={11} />Answered</Chip>}>
        <Row icon={<PhoneCall size={15} />} title="Known caller" sub="Greeted by name" picked delay={200} />
        <Row icon={<Clock size={15} />} title="Open Saturday, 9 to 1" sub="From your business hours" delay={450} />
      </Card>,
      <Card key="1" title="Booking" status={<Chip tone="green"><Check size={11} />Booked</Chip>}>
        <Row icon={<CalendarCheck size={15} />} title="Saturday, 11:00 AM" sub="Added to your calendar" picked delay={200} />
        <Row icon={<MessageCircle size={15} />} title="Confirmation sent" sub="To the caller" delay={450} />
      </Card>,
      <Card key="2" title="Transfer" status={<Chip tone="soft"><Headphones size={11} />Connecting</Chip>}>
        <Row icon={<Headphones size={15} />} title="To the clinic team" sub="Report question" picked delay={200} />
        <Row icon={<Voicemail size={15} />} title="After hours?" sub="Voicemail becomes a callback ticket" delay={450} />
      </Card>,
    ],
    bandCta: { label: 'Connect a phone number', icon: <PhoneCall size={18} /> },
    capIcons: [[<PhoneIncoming key="a" size={20} />, 'blue'], [<Languages key="b" size={20} />, 'violet'], [<Voicemail key="c" size={20} />, 'amber'], [<PhoneCall key="d" size={20} />, 'green'], [<Inbox key="e" size={20} />, 'teal']],
    stories: [handoffStory({ customer: 'Caller · +91 98xxx', ask: 'Can I speak to the doctor about my report?', agentLine: 'Of course, I will transfer you to the team now.', team: 'Call transferred · Dr. Nair’s desk' }, false, '/photos/ho-receptionist.jpg')],
    ctaArt: [ctaStack(result(<PhoneIncoming size={15} />, 'Call answered', 'In three languages'), result(<CalendarCheck size={15} />, 'Visit booked', 'Saturday, 11:00')), ctaStack(result(<Headphones size={15} />, 'Transferred', 'To your team'), result(<Voicemail size={15} />, 'Callback ticket', 'After hours'))],
  },

  'ai-marketing-agent': {
    icon: <Megaphone size={16} />, accent: ['turn into sales'], photo: '/photos/marketing.jpg', alt: 'Customer reading a campaign message, with an Instagram conversation',
    hero: page => <HeroScene photo="/photos/marketing.jpg" alt="Customer reading a campaign message, with an Instagram conversation">
      <LivePhone kind="Instagram" business="Lumen Home" handle="lumenhome" className="pp-hero-phone" period={12000} lines={[
        { from: 'agent', text: 'Thanks for your comment. Here are the details you asked for.', at: 400 },
        { from: 'customer', text: 'Medium in the linen shirt?', at: 2600 },
        { from: 'agent', text: page.walkthrough.steps[1].agent, at: 4800 },
      ]} />
      <Float className="pp-pos-tr"><div className="pp-float-head"><MessageCircle size={14} />Comment on your Reel</div><div className="pp-comment"><span className="wb-avatar wb-mint">A</span><p><b>anu.k</b> PRICE</p></div><small className="pp-track-label">Keyword matched · DM sent</small></Float>
      <Float className="pp-pos-br">{result(<Megaphone size={16} />, 'Campaign replies', 'Answered by your agent')}</Float>
      <span className="pp-bubble-logo pp-pos-logo"><ChannelLogo channel="Instagram" /></span>
    </HeroScene>,
    cards: [
      <Card key="0" title="New arrivals campaign" status={<Chip tone="green"><Check size={11} />Approved template</Chip>}>
        <Row icon={<Tag size={15} />} title="Returning customers" sub="Audience by tag" delay={200} />
        <Row icon={<Send size={15} />} title="Sent Friday, 10:00 AM" sub="Cost shown before sending" picked delay={450} />
      </Card>,
      <Card key="1" title="Reply answered" status={<Chip tone="soft">Your agent</Chip>}>
        <Row icon={<PackageCheck size={15} />} title="Linen shirt · Medium" sub="In stock" delay={200} />
        <Row icon={<Link2 size={15} />} title="Checkout link sent" sub="In the same chat" picked delay={450} />
      </Card>,
      <Card key="2" title="Comment to DM" status={<Chip tone="green"><Check size={11} />Live</Chip>}>
        <Row icon={<MessageCircle size={15} />} title="Keyword: PRICE" sub="On posts and Reels" delay={200} />
        <Row icon={<ChannelLogo channel="Instagram" />} title="DM sent to anu.k" sub="Agent takes it from there" picked delay={450} />
      </Card>,
    ],
    bandCta: { label: 'Connect WhatsApp', icon: <ChannelLogo channel="WhatsApp" /> },
    capIcons: [[<Megaphone key="a" size={20} />, 'rose'], [<MessageCircle key="b" size={20} />, 'violet'], [<Workflow key="c" size={20} />, 'teal'], [<BarChart3 key="d" size={20} />, 'amber']],
    stories: [catalogStory('/photos/st-catalog-marketing.jpg'), handoffStory({ customer: 'Anu K.', ask: 'Can I get a custom colour for a bulk order?', agentLine: 'Let me check with the team for you.', team: 'Hi Anu, we can do that. How many pieces?' }, true, '/photos/ho-marketing.jpg')],
    ctaArt: [ctaStack(result(<Send size={15} />, 'Campaign sent', 'Approved template'), result(<MessageCircle size={15} />, 'Comment to DM', 'Keyword PRICE')), ctaStack(result(<Bot size={15} />, 'Replies answered', 'By your agent'), result(<BarChart3 size={15} />, 'Revenue tracked', 'Shopify orders'))],
  },
};

const pillFor = (i: number, label: string) => `Step ${i + 1} · ${label.split(' ').slice(0, 2).join(' ')}`;

export function AgentPageTemplate({ page }: { page: UseCasePage }) {
  const d = designs[page.slug];
  const checks = (page.hero.reassurance ?? '').split('. ').map(s => s.replace(/\.$/, '')).filter(Boolean);
  const stages: Stage[] = page.walkthrough.steps.map((step, i) => ({
    pill: pillFor(i, step.label), title: step.label, body: step.note,
    card: d.cards[i],
    side: <div className="wb-chat">
      <Bubble who="customer" delay={300}>{step.customer}</Bubble>
      <Bubble who="agent" delay={1300}>{step.agent}</Bubble>
      {step.result && <div className="pp-step-result" style={{ animationDelay: '2200ms' }}><CircleCheck size={14} />{step.result}</div>}
    </div>,
  }));
  return <SiteFrame>{onOpen => <div className={`wb pp`}>
    <PremiumHero kicker={page.hero.kicker} icon={d.icon} title={page.hero.title} accent={d.accent} body={page.hero.body} checks={checks} visual={d.hero(page)} onOpen={onOpen} />
    {page.hero.channels && <ChannelRow channels={page.hero.channels} />}
    <section id="how" className="container pp-head pp-walk-head"><span className="wb-eyebrow">Walkthrough</span><h2>{page.walkthrough.title}</h2><p>{page.walkthrough.intro}</p></section>
    <StepBand stages={stages} cta={d.bandCta} onOpen={onOpen} label={`${page.hero.kicker} walkthrough`} />
    {industryScenarios[page.slug] && <IndustryExamples {...industryScenarios[page.slug]} />}
    <Capabilities title={page.capabilities.title} intro={page.capabilities.intro} items={page.capabilities.items} icons={d.capIcons} />
    {d.stories}
    <ToolCards title={page.tools.title} intro={page.tools.intro} names={page.tools.names} />
    {page.quote && <QuoteBlock excerpt={page.quote.excerpt} attribution={page.quote.attribution} href={`/case-studies/${page.slug}/`} />}
    <GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} />
    <FaqBlock title={page.faq.title} items={page.faq.items} />
    <OtherAgents current={page.slug} />
    <CtaBlock title={page.cta.title} body={page.cta.body} onOpen={onOpen} art={d.ctaArt[0]} artRight={d.ctaArt[1]} />
  </div>}</SiteFrame>;
}
