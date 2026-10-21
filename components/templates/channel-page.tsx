'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight, AtSign, BadgeCheck, BookOpen, Bot, Building2, Check, Clock, Code2, Eye, EyeOff, FileText, Globe, GraduationCap, Headphones,
  Image as ImageIcon, Inbox, LayoutTemplate, Link2, Megaphone, MessageCircle, MessageSquare, Monitor, MousePointerClick, Palette,
  PhoneMissed, Plug, Search, Send, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Stethoscope, Tag, Timer, UserPlus, Users, Video,
} from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';
import { SplitWords } from '@/components/site/motion';
import {
  Bubble, Capabilities, Card, Chip, CtaBlock, FaqBlock, Float, FlowStrip, GoodToKnow, HeroScene, IndustryExamples, LivePhone, PremiumHero, Row,
  StepBand, convo, type Line, type Scenario, type Stage,
} from '@/components/premium/kit';
import { handoffStory } from '@/components/templates/agent-page';
import { industryScenarios } from '@/components/templates/agent-industries';
import type { ChannelPage } from '@/content/types';

import { asset } from '@/lib/asset';
// The five channel pages on the premium template. Copy comes from content/channels/*.json.
// Platform screens follow each platform's own look; everything around them uses the Steps AI palette.
// Mockups are illustrations with fictional sample data.

const PRODUCT = asset('/industries/ecommerce.png');
const result = (icon: ReactNode, title: string, sub: string) => <div className="pp-result"><span>{icon}</span><div><strong>{title}</strong><small>{sub}</small></div></div>;
const stack = (...items: ReactNode[]) => <div className="pp-cta-stack">{items.map((item, i) => <Float key={i}>{item}</Float>)}</div>;
const side = (lines: [('customer' | 'agent'), string][], done: string) => <div className="wb-chat">
  {lines.map(([who, text], i) => <Bubble key={i} who={who} delay={300 + i * 1000}>{text}</Bubble>)}
  <div className="pp-step-result" style={{ animationDelay: `${400 + lines.length * 1000}ms` }}><Check size={14} />{done}</div>
</div>;

const ind = {
  ecommerce: { industry: 'Ecommerce', href: '/solutions/ecommerce/', photo: asset('/photos/industry-ecommerce.jpg'), icon: <ShoppingBag size={16} /> },
  healthcare: { industry: 'Healthcare', href: '/solutions/healthcare/', photo: asset('/photos/industry-healthcare.jpg'), icon: <Stethoscope size={16} /> },
  education: { industry: 'Education', href: '/solutions/education/', photo: asset('/photos/industry-education.jpg'), icon: <GraduationCap size={16} /> },
  realestate: { industry: 'Real estate', href: '/solutions/real-estate/', photo: asset('/photos/industry-realestate.jpg'), icon: <Building2 size={16} /> },
};

// Industry examples for a channel: reuse the agent pages' conversations on that channel, one per industry,
// topped up with channel-only examples where the agent pages have none.
const extra: Scenario[] = [
  { ...ind.education, kind: 'Instagram', business: 'Northfield Academy', did: ['Answered from the course pages', 'Shared the brochure in the DM', 'Saved the student as a lead'], lines: convo(
    ['Is the design course online?', 'Yes, it is fully online with live weekend classes.'],
    ['Can you send the fees?', 'Sent the brochure with fees. May I have your email?']) },
  { ...ind.healthcare, kind: 'Instagram', business: 'City Care Clinic', did: ['Answered the timing question', 'Offered free slots', 'Booked the visit'], lines: convo(
    ['Is the skin clinic open on Saturday?', 'Yes, from 10 to 4. Would you like a slot?'],
    ['Yes, 11 please.', 'Booked for Saturday at 11. See you then.']) },
  { ...ind.ecommerce, kind: 'Website', business: 'Lumen Home', did: ['Answered from the product page', 'Checked stock', 'Added to cart in the chat'], lines: convo(
    ['Does the sofa come in grey?', 'Yes, the Arlo sofa comes in grey and it is in stock.'],
    ['Add it to my cart.', 'Added. You can check out right here in the chat.']) },
  { ...ind.realestate, kind: 'Website', business: 'Skyline Homes', did: ['Answered the project question', 'Collected name and phone', 'Booked a site visit'], lines: convo(
    ['Is Skyline Park ready to move in?', 'Tower A is ready to move in. Tower B hands over in March.'],
    ['Can I visit on Sunday?', 'Of course. May I have your name and phone to book it?']) },
  { ...ind.ecommerce, kind: 'Messenger', business: 'Lumen Home', did: ['Answered the delivery question', 'Shared a product link', 'Saved the customer to the CRM'], lines: convo(
    ['Do you deliver to Pune?', 'Yes, delivery to Pune takes 2 to 3 days.'],
    ['Send me the bowl set link.', 'Here you go. The bowl set is in stock.']) },
  { ...ind.healthcare, kind: 'Messenger', business: 'City Care Clinic', did: ['Answered from clinic information', 'Offered appointment times', 'Booked into the calendar'], lines: convo(
    ['What are your clinic timings?', 'We are open 9 to 7 on weekdays and 9 to 1 on Saturday.'],
    ['Can I see Dr. Nair tomorrow?', 'Tomorrow at 5:30 is free. Shall I book it?']) },
  { ...ind.education, kind: 'Messenger', business: 'Northfield Academy', did: ['Answered the admission question', 'Collected parent details', 'Passed it to the office'], lines: convo(
    ['Is there a school bus to Kondapur?', 'Yes, route 4 covers Kondapur.'],
    ['Can someone call me about fees?', 'Sure. May I have your name and number?']) },
  { ...ind.realestate, kind: 'Messenger', business: 'Skyline Homes', did: ['Shared the price range', 'Sent the brochure', 'Saved the lead'], lines: convo(
    ['What do 2 BHK homes cost?', '2 BHK homes start at 84 lakh. Want the brochure?'],
    ['Yes please.', 'Sent. Our team can also call you if that helps.']) },
];

function channelScenarios(channel: string): Scenario[] {
  const all = [...Object.values(industryScenarios).flatMap(s => s.scenarios), ...extra].filter(s => s.kind === channel);
  const seen = new Set<string>();
  return all.filter(s => !seen.has(s.industry) && seen.add(s.industry)).slice(0, 4);
}

/* ---------- per-channel design ---------- */

type Design = {
  accent: string[]; photo: string; alt: string; logo: ReactNode;
  hero: ReactNode; stageCards: ReactNode[]; stageSides: ReactNode[]; bandCta: { label: string; icon: ReactNode };
  jobIcons: [ReactNode, string][]; setupIcons: ReactNode[]; industries?: { title: string; intro: string; kind: string };
  ctaArt: [ReactNode, ReactNode];
};

const waHero: Line[] = [
  { from: 'customer', text: 'Do you deliver to Pune?', at: 400 },
  { from: 'agent', text: 'Yes, delivery to Pune takes 2 to 3 days.', at: 2300 },
  { from: 'customer', text: 'Show me the cream vase.', at: 4600 },
  { from: 'agent', text: 'Here it is. It is in stock.', at: 6500, card: <div className="pp-products"><div className="pp-product pp-product-wide"><img src={PRODUCT} alt="" /><div><strong>Ceramic vase · Cream</strong><small>₹2,450</small><b>Add to cart</b></div></div></div> },
];

const designs: Record<string, Design> = {
  'whatsapp-chatbot': {
    accent: ['day and night'], photo: asset('/photos/ch-whatsapp.jpg'), alt: 'Customer chatting on WhatsApp, answered by an AI agent', logo: <ChannelLogo channel="WhatsApp" />,
    hero: <HeroScene photo={asset("/photos/ch-whatsapp.jpg")} alt="Customer chatting on WhatsApp, answered by an AI agent">
      <LivePhone kind="WhatsApp" business="Lumen Home" className="pp-hero-phone" period={11000} lines={waHero} />
      <Float className="pp-pos-tr"><div className="pp-float-head"><BadgeCheck size={14} />Official WhatsApp Business API</div><Row icon={<ChannelLogo channel="WhatsApp" />} title="+91 98xxx xxx10" sub="Connected through Meta" /></Float>
      <Float className="pp-pos-br">{result(<Clock size={16} />, 'Answered at 11:42 PM', 'No waiting for opening hours')}</Float>
      <span className="pp-bubble-logo pp-pos-logo"><ChannelLogo channel="WhatsApp" /></span>
    </HeroScene>,
    stageCards: [
      <Card key="0" title="Missed call" status={<Chip tone="soft"><PhoneMissed size={11} />11:05 AM</Chip>}>
        <Row icon={<PhoneMissed size={15} />} title="+91 98xxx xxx12" sub="Call not answered" delay={200} />
        <Row icon={<ChannelLogo channel="WhatsApp" />} title="WhatsApp message sent" sub="“Sorry we missed your call…”" picked delay={450} />
      </Card>,
      <Card key="1" title="Starter questions" status={<Chip>Shown on open</Chip>}>
        <Row icon={<MessageSquare size={15} />} title="What are your delivery times?" delay={200} picked />
        <Row icon={<MessageSquare size={15} />} title="Where is my order?" delay={350} />
        <Row icon={<MessageSquare size={15} />} title="What are your opening hours?" delay={500} />
      </Card>,
      <Card key="2" title="Click-to-WhatsApp ad" status={<Chip tone="green"><Check size={11} />Running</Chip>}>
        <Row icon={<Megaphone size={15} />} title="Festive lamps" sub="Ad opens a WhatsApp chat" delay={200} />
        <Row icon={<Bot size={15} />} title="Agent picks it up" sub="Answers and guides the next step" picked delay={450} />
      </Card>,
      <Card key="3" title="Campaign replies" status={<Chip tone="soft">Your agent</Chip>}>
        <Row icon={<Send size={15} />} title="New arrivals" sub="Sent to returning customers" delay={200} />
        <Row icon={<MessageCircle size={15} />} title="Every reply answered" sub="Straight away, by your agent" picked delay={450} />
      </Card>,
    ],
    stageSides: [
      side([['agent', 'Sorry we missed your call. How can we help?'], ['customer', 'Has my order shipped?']], 'Call turned into a chat'),
      side([['customer', 'What are your delivery times?'], ['agent', 'Most orders arrive in 2 to 4 days.']], 'Started with one tap'),
      side([['customer', 'Hi, I saw your ad for the lamps.'], ['agent', 'Welcome! Brass or ceramic, which do you prefer?']], 'Ad chat picked up'),
      side([['customer', 'SIZE. Medium please.'], ['agent', 'Medium is in stock. Here is the link.']], 'Reply answered'),
    ],
    bandCta: { label: 'Connect WhatsApp', icon: <ChannelLogo channel="WhatsApp" /> },
    jobIcons: [[<BookOpen key="a" size={20} />, 'blue'], [<ShoppingBag key="b" size={20} />, 'violet'], [<Send key="c" size={20} />, 'blue'], [<Headphones key="d" size={20} />, 'violet']],
    setupIcons: [<Plug key="a" size={24} />, <BookOpen key="b" size={24} />, <Check key="c" size={24} />],
    industries: { title: 'WhatsApp for every kind of business.', intro: 'Stores, clinics, schools and property teams all answer customers where they already message.', kind: 'WhatsApp' },
    ctaArt: [stack(result(<PhoneMissed size={15} />, 'Missed call', 'Turned into a chat'), result(<MessageSquare size={15} />, 'Question answered', 'At 11:42 PM')), stack(result(<ShoppingBag size={15} />, 'Product shared', 'With a checkout link'), result(<Headphones size={15} />, 'Team joined', 'With the full history'))],
  },

  'instagram-chatbot': {
    accent: ['into sales'], photo: asset('/photos/ch-instagram.jpg'), alt: 'Brand owner creating product content for Instagram', logo: <ChannelLogo channel="Instagram" />,
    hero: <HeroScene photo={asset("/photos/ch-instagram.jpg")} alt="Brand owner creating product content for Instagram">
      <LivePhone kind="Instagram" business="Lumen Home" handle="lumenhome" className="pp-hero-phone" period={11000} lines={[
        { from: 'agent', text: 'Thanks for commenting PRICE! The linen set is ₹2,800.', at: 400 },
        { from: 'customer', text: 'Is M available?', at: 2600 },
        { from: 'agent', text: 'Yes, M is in stock. Here is the link to buy.', at: 4700 },
      ]} />
      <Float className="pp-pos-tr"><div className="pp-float-head"><MessageCircle size={14} />New comment on your Reel</div><div className="pp-comment"><span className="wb-avatar wb-mint">A</span><p><b>anu.k</b> PRICE</p></div><small className="pp-track-label">Keyword matched · DM sent</small></Float>
      <Float className="pp-pos-br">{result(<AtSign size={16} />, 'Comment turned into a DM', 'Your agent takes it from there')}</Float>
      <span className="pp-bubble-logo pp-pos-logo"><ChannelLogo channel="Instagram" /></span>
    </HeroScene>,
    stageCards: [
      <Card key="0" title="Keyword trigger" status={<Chip tone="green"><Check size={11} />On</Chip>}>
        <Row icon={<Tag size={15} />} title="PRICE, LINK" sub="Words that start a DM" delay={200} />
        <Row icon={<Send size={15} />} title="“Here are the details you asked for”" sub="Reply sent in the DM" picked delay={450} />
      </Card>,
      <Card key="1" title="Trigger scope" status={<Chip>One Reel</Chip>}>
        <Row icon={<Video size={15} />} title="Festive collection Reel" sub="Posted 2 days ago" picked delay={200} />
        <Row icon={<Eye size={15} />} title="Live comments" sub="Included" delay={450} />
      </Card>,
      <Card key="2" title="Quick replies" status={<Chip tone="soft">Waits for a tap</Chip>}>
        <div className="pp-slots pp-slots-card"><span className="is-picked">Sizes <Check size={11} /></span><span>Delivery</span><span>Talk to us</span></div>
        <Row icon={<ArrowRight size={15} />} title="Branch: Sizes" sub="Sends the size guide" delay={400} />
      </Card>,
      <Card key="3" title="Comments" status={<Chip>Your posts</Chip>}>
        <Row icon={<span className="wb-avatar wb-peach">R</span>} title="rahul.m · Love this!" sub="Reply" delay={200} />
        <Row icon={<span className="wb-avatar wb-mint">S</span>} title="spam.deals · Free followers" sub="Hidden" end={<EyeOff size={15} />} picked delay={450} />
      </Card>,
    ],
    stageSides: [
      side([['customer', 'PRICE'], ['agent', 'Thanks. The linen set is ₹2,800. Want the link?']], 'Comment turned into a DM'),
      side([['customer', 'LINK'], ['agent', 'Here is the festive collection.']], 'Reel trigger fired'),
      side([['customer', 'Sizes'], ['agent', 'Here is the size guide. Which size do you usually wear?']], 'Branched on the tap'),
      side([['customer', 'Is this back in stock?'], ['agent', 'Yes, it is back. I have sent you the link.']], 'Comment answered'),
    ],
    bandCta: { label: 'Connect Instagram', icon: <ChannelLogo channel="Instagram" /> },
    jobIcons: [[<MessageCircle key="a" size={20} />, 'blue'], [<AtSign key="b" size={20} />, 'violet'], [<ImageIcon key="c" size={20} />, 'blue'], [<ShoppingBag key="d" size={20} />, 'violet']],
    setupIcons: [<Plug key="a" size={24} />, <Bot key="b" size={24} />, <Tag key="c" size={24} />],
    industries: { title: 'Instagram for every kind of business.', intro: 'Product launches, course enquiries, clinic bookings and property enquiries, all answered in the DMs.', kind: 'Instagram' },
    ctaArt: [stack(result(<AtSign size={15} />, 'Comment to DM', 'Keyword PRICE'), result(<MessageCircle size={15} />, 'DM answered', 'In seconds')), stack(result(<ShoppingBag size={15} />, 'Link shared', 'In the chat'), result(<Headphones size={15} />, 'Team can step in', 'Replying pauses the AI'))],
  },

  'messenger-chatbot': {
    accent: ['your Facebook page'], photo: asset('/photos/ch-messenger.jpg'), alt: 'Customer messaging a business on Messenger', logo: <ChannelLogo channel="Messenger" />,
    hero: <HeroScene photo={asset("/photos/ch-messenger.jpg")} alt="Customer messaging a business on Messenger">
      <LivePhone kind="Messenger" business="Lumen Home" className="pp-hero-phone" period={11000} lines={convo(
        ['Are you open on Sunday?', 'Yes, our store is open 10 to 6 on Sundays.'],
        ['Do you have the bowl set?', 'Yes, it is in stock. Here is the link.'])} />
      <Float className="pp-pos-tr"><div className="pp-float-head"><Globe size={14} />Facebook page</div><Row icon={<ChannelLogo channel="Messenger" />} title="Lumen Home" sub="Connected through Meta" /></Float>
      <Float className="pp-pos-br">{result(<Inbox size={16} />, 'In your shared inbox', 'Next to WhatsApp and Instagram')}</Float>
      <span className="pp-bubble-logo pp-pos-logo"><ChannelLogo channel="Messenger" /></span>
    </HeroScene>,
    stageCards: [
      <Card key="0" title="Facebook page" status={<Chip tone="green"><Check size={11} />Connected</Chip>}>
        <Row icon={<ChannelLogo channel="Messenger" />} title="Lumen Home" sub="Page messages answered by your agent" picked delay={200} />
        <Row icon={<Clock size={15} />} title="Any time of day" sub="No waiting for your team" delay={450} />
      </Card>,
      <Card key="1" title="Your information" status={<Chip>Used everywhere</Chip>}>
        <Row icon={<Globe size={15} />} title="Website pages" sub="12 pages" delay={200} />
        <Row icon={<FileText size={15} />} title="Returns policy.pdf" sub="Document" delay={350} />
        <Row icon={<BookOpen size={15} />} title="FAQs" sub="Edited once, used on every channel" picked delay={500} />
      </Card>,
      <Card key="2" title="Unified inbox" status={<Chip>All channels</Chip>}>
        <Row icon={<ChannelLogo channel="Messenger" />} title="Meera · Open on Sunday?" sub="AI replied" delay={200} />
        <Row icon={<ChannelLogo channel="WhatsApp" />} title="Priya · Where is my order?" sub="AI replied" delay={350} />
        <Row icon={<ChannelLogo channel="Instagram" />} title="Rahul · Is M available?" sub="AI replied" picked delay={500} />
      </Card>,
    ],
    stageSides: [
      side([['customer', 'Hi, are you open today?'], ['agent', 'Yes, we are open until 8 tonight.']], 'Page message answered'),
      side([['customer', 'What is your returns policy?'], ['agent', 'Unworn items can be returned within the period on our returns page.']], 'Same answer on every channel'),
      side([['customer', 'Can I talk to someone?'], ['agent', 'Of course. Our team will join this chat shortly.']], 'Visible in one inbox'),
    ],
    bandCta: { label: 'Connect Messenger', icon: <ChannelLogo channel="Messenger" /> },
    jobIcons: [[<MessageSquare key="a" size={20} />, 'blue'], [<ShoppingBag key="b" size={20} />, 'violet'], [<UserPlus key="c" size={20} />, 'blue'], [<Headphones key="d" size={20} />, 'violet']],
    setupIcons: [<Plug key="a" size={24} />, <Bot key="b" size={24} />, <Check key="c" size={24} />],
    industries: { title: 'Messenger for every kind of business.', intro: 'Many customers still message the Facebook page first. Here is what they get back.', kind: 'Messenger' },
    ctaArt: [stack(result(<ChannelLogo channel="Messenger" />, 'Page message', 'Answered any time'), result(<BookOpen size={15} />, 'One set of answers', 'For every channel')), stack(result(<Inbox size={15} />, 'One inbox', 'All channels together'), result(<Headphones size={15} />, 'Team can step in', 'With the full history'))],
  },

  'website-chatbot': {
    accent: ['even at 11pm'], photo: asset('/photos/ch-website.jpg'), alt: 'Visitor browsing a website in the evening, with the chat widget answering', logo: <Globe size={16} />,
    hero: <HeroScene photo={asset("/photos/ch-website.jpg")} alt="Visitor browsing a website in the evening, with the chat widget answering">
      <LivePhone kind="Website" business="Lumen Home" className="pp-hero-phone" period={11000} lines={convo(
        ['Does the Arlo sofa come in grey?', 'Yes, it comes in grey and it is in stock.'],
        ['Add it to my cart.', 'Added. You can check out right here.'])} />
      <Float className="pp-pos-tr"><div className="pp-float-head"><Sparkles size={14} />Quick questions</div><div className="pp-skill-list pp-plain-list"><span>Do you deliver to my area?</span><span>What is your returns policy?</span><span>Is there a showroom?</span></div></Float>
      <Float className="pp-pos-br">{result(<Clock size={16} />, 'Answered at 11:04 PM', 'From your own pages')}</Float>
      <span className="pp-bubble-logo pp-pos-logo"><Globe size={28} /></span>
    </HeroScene>,
    stageCards: [
      <Card key="0" title="Display" status={<Chip>Per device</Chip>}>
        <Row icon={<Monitor size={15} />} title="Desktop" sub="Floating widget" picked delay={200} />
        <Row icon={<Smartphone size={15} />} title="Mobile" sub="Inline search bar" delay={450} />
      </Card>,
      <Card key="1" title="Position" status={<Chip>Bottom left</Chip>}>
        <div className="pp-grid9">{Array.from({ length: 9 }, (_, i) => <i key={i} className={i === 6 ? 'is-picked' : ''} />)}</div>
        <small className="pp-track-label">Clear of your add-to-cart button on mobile</small>
      </Card>,
      <Card key="2" title="When it appears" status={<Chip>After 10 seconds</Chip>}>
        <div className="pp-slots pp-slots-card"><span>Straight away</span><span>5 sec</span><span className="is-picked">10 sec <Check size={11} /></span><span>30 sec</span><span>1 min</span></div>
      </Card>,
      <Card key="3" title="Brand" status={<Chip>Light theme</Chip>}>
        <Row icon={<Palette size={15} />} title="Your colours" sub={<span className="pp-swatches"><i style={{ background: '#0c3474' }} /><i style={{ background: '#2c9cfa' }} /><i style={{ background: '#f8b403' }} /></span>} delay={200} />
        <Row icon={<MessageSquare size={15} />} title="“Hi! Looking for something special?”" sub="Your greeting" picked delay={450} />
      </Card>,
    ],
    stageSides: [
      side([['customer', 'Do you ship to Chennai?'], ['agent', 'Yes, orders to Chennai arrive in 3 to 4 days.']], 'Shown the way you chose'),
      side([['customer', 'Is the lamp back in stock?'], ['agent', 'Yes, it is back. Want me to add it to your cart?']], 'Out of the way on mobile'),
      side([['agent', 'Hi! Looking for something special?'], ['customer', 'A gift under 3,000.']], 'Opened after 10 seconds'),
      side([['agent', 'Hi! Looking for something special?'], ['customer', 'Yes, a lamp for my desk.']], 'Matches your brand'),
    ],
    bandCta: { label: 'Get the script', icon: <Code2 size={18} /> },
    jobIcons: [[<BookOpen key="a" size={20} />, 'blue'], [<Sparkles key="b" size={20} />, 'violet'], [<ShoppingBag key="c" size={20} />, 'blue'], [<UserPlus key="d" size={20} />, 'violet']],
    setupIcons: [<Code2 key="a" size={24} />, <LayoutTemplate key="b" size={24} />, <ShieldCheck key="c" size={24} />],
    industries: { title: 'A website chatbot for every kind of business.', intro: 'Shoppers, patients, parents and home buyers get an answer while they are still on your site.', kind: 'Website' },
    ctaArt: [stack(result(<MessageSquare size={15} />, 'Visitor answered', 'At 11:04 PM'), result(<ShoppingBag size={15} />, 'Added to cart', 'Inside the chat')), stack(result(<UserPlus size={15} />, 'Lead saved', 'To your CRM'), result(<Palette size={15} />, 'Your brand', 'Logo and colours'))],
  },

  'chat-page': {
    accent: ['Share your agent’s page'], photo: asset('/photos/ch-chatpage.jpg'), alt: 'Small business owner sharing her chat page link from her phone', logo: <Link2 size={16} />,
    hero: <HeroScene photo={asset("/photos/ch-chatpage.jpg")} alt="Small business owner sharing her chat page link from her phone">
      <LivePhone kind="ChatPage" business="Bake House" className="pp-hero-phone" period={10000} chips={['Order a cake', 'Delivery areas', 'Prices']} links={['See our menu', 'Follow us on Instagram']} lines={convo(
        ['Can I order a cake for Saturday?', 'Yes! Which flavour and size would you like?'])} />
      <Float className="pp-pos-tr"><div className="pp-float-head"><Link2 size={14} />Your link</div><div className="pp-link-pill">steps.ai/bakehouse</div><small className="pp-track-label">In your Instagram bio and WhatsApp status</small></Float>
      <Float className="pp-pos-br">{result(<ShieldCheck size={16} />, 'Verified lead', 'Email sent to you')}</Float>
      <span className="pp-bubble-logo pp-pos-logo"><Link2 size={26} /></span>
    </HeroScene>,
    stageCards: [
      <Card key="0" title="Branding" status={<Chip>Preview</Chip>}>
        <Row icon={<ImageIcon size={15} />} title="Logo" sub="bakehouse-logo.png" delay={200} />
        <Row icon={<Palette size={15} />} title="Colours" sub={<span className="pp-swatches"><i style={{ background: '#7a3e1d' }} /><i style={{ background: '#fdf3e7' }} /></span>} picked delay={450} />
      </Card>,
      <Card key="1" title="Welcome message" status={<Chip>Light and dark</Chip>}>
        <div className="pp-rule"><p>Hi! Ask about cakes, delivery or prices.</p></div>
        <Row icon={<MessageSquare size={15} />} title="Placeholder" sub="“Ask a question”" delay={400} />
      </Card>,
      <Card key="2" title="Search preview" status={<Chip>For search engines</Chip>}>
        <div className="pp-serp"><small>steps.ai › bakehouse</small><strong>Bake House · Custom cakes in Hyderabad</strong><p>Order cakes for birthdays and events. Ask about flavours, delivery and prices.</p></div>
      </Card>,
      <Card key="3" title="Publish" status={<Chip tone="green"><Check size={11} />Live</Chip>}>
        <Row icon={<Monitor size={15} />} title="Desktop preview" sub="Checked" delay={200} />
        <Row icon={<Smartphone size={15} />} title="Mobile preview" sub="Checked" delay={350} />
        <Row icon={<Link2 size={15} />} title="steps.ai/bakehouse" sub="Public link" picked delay={500} />
      </Card>,
    ],
    stageSides: [
      side([['customer', 'Do you make eggless cakes?'], ['agent', 'Yes, every cake can be made eggless.']], 'Looks like your brand'),
      side([['agent', 'Hi! Ask about cakes, delivery or prices.'], ['customer', 'Delivery to Gachibowli?']], 'Your greeting first'),
      side([['customer', 'cake shop near me open sunday'], ['agent', 'We take Sunday orders until 2 PM.']], 'Easy to find'),
      side([['customer', 'Saw your link in the bio!'], ['agent', 'Welcome! What can I help you with?']], 'Published and shared'),
    ],
    bandCta: { label: 'Create your page', icon: <Link2 size={18} /> },
    jobIcons: [[<BookOpen key="a" size={20} />, 'blue'], [<Sparkles key="b" size={20} />, 'violet'], [<Link2 key="c" size={20} />, 'blue'], [<ShieldCheck key="d" size={20} />, 'violet']],
    setupIcons: [<LayoutTemplate key="a" size={24} />, <Palette key="b" size={24} />, <Send key="c" size={24} />],
    ctaArt: [stack(result(<Link2 size={15} />, 'Link shared', 'Bio and status'), result(<MessageSquare size={15} />, 'Question answered', 'Any time')), stack(result(<ShieldCheck size={15} />, 'Lead verified', 'Email or phone code'), result(<Search size={15} />, 'Search-friendly', 'Your title and description'))],
  },
};

const channelLinks: Record<string, ReactNode> = {
  'WhatsApp chatbot': <ChannelLogo channel="WhatsApp" />, 'Instagram chatbot': <ChannelLogo channel="Instagram" />,
  'Messenger chatbot': <ChannelLogo channel="Messenger" />, 'Website chatbot': <Globe size={20} />,
};

export function ChannelPageTemplate({ page }: { page: ChannelPage }) {
  const d = designs[page.slug];
  const checks = (page.hero.reassurance ?? '').split('. ').map(s => s.replace(/\.$/, '')).filter(Boolean);
  const stages: Stage[] = page.triggers.items.map((item, i) => ({
    pill: `Step ${i + 1} of ${page.triggers.items.length}`, title: item.title, body: item.body, card: d.stageCards[i], side: d.stageSides[i],
  }));
  const scenarios = d.industries ? channelScenarios(d.industries.kind) : [];
  return <SiteFrame>{onOpen => <div className="wb pp">
    <PremiumHero kicker={page.hero.kicker} icon={d.logo} title={page.hero.title} accent={d.accent} body={page.hero.body} checks={checks} visual={d.hero} onOpen={onOpen} />
    <Capabilities title={page.jobs.title} intro={page.jobs.intro} items={page.jobs.items} icons={d.jobIcons} />
    <section id="how" className="container pp-head pp-walk-head"><span className="wb-eyebrow">{page.triggers.title.startsWith('Why') ? 'Why it helps' : 'Start more conversations'}</span><h2>{page.triggers.title}</h2><p>{page.triggers.intro}</p></section>
    <StepBand stages={stages} cta={d.bandCta} onOpen={onOpen} label={page.triggers.title} />
    {d.industries && scenarios.length > 1 && <IndustryExamples title={d.industries.title} intro={d.industries.intro} scenarios={scenarios} noPhoto />}
    <FlowStrip eyebrow="Setup" title={page.setup.title} intro={page.setup.intro} items={page.setup.items.map((item, i) => ({ ...item, icon: d.setupIcons[i], tint: i % 2 ? 'violet' : 'blue' }))} />
    {handoffStory({ customer: 'Priya Nair', ask: 'Can I speak to someone about a bulk order?', agentLine: 'Of course. I have passed this to our team.', team: 'Hi Priya, Alex here. How many pieces do you need?' })}
    <GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} />
    <FaqBlock title={page.faq.title} items={page.faq.items} />
    <section className="container wb-split wb-related">
      <div className="wb-split-copy"><span className="wb-eyebrow">Channels</span><h2 aria-label={page.related.title}><SplitWords text={page.related.title} /></h2><p>One agent, one inbox, every channel your customers use.</p></div>
      <div className="wb-related-cards">{page.related.items.map(item => <Reveal key={item.label}><Link className="wb-related-card" href={item.href}>
        <span className="wb-related-logo pp-related-ico">{channelLinks[item.label] ?? <Link2 size={20} />}</span>
        <span><strong>{item.label}</strong><small>{item.body}</small></span><ArrowRight size={15} />
      </Link></Reveal>)}</div>
    </section>
    <CtaBlock title={page.cta.title} body={page.cta.body} onOpen={onOpen} art={d.ctaArt[0]} artRight={d.ctaArt[1]} />
  </div>}</SiteFrame>;
}
