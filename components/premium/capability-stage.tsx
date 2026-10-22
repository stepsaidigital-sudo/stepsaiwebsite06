'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, BookOpen, Bot, CalendarCheck, CalendarDays, Check, CheckCheck, ChevronRight, CircleCheck, FileText, Globe, Headphones, Inbox, Link2, Mail, MapPin, MessageCircle, Mic, MoreHorizontal, Package, Phone, Play, Search, Send, ShieldCheck, Shirt, ShoppingBag, ShoppingCart, Tag, Ticket, Truck, User, Users, Workflow } from 'lucide-react';
import type { Item } from '@/content/types';
import { IndustryCapability, industryStories } from './industry-capability';
import {CommerceCapability,commercePhoto,commerceStories} from './commerce-capability';

type Kind = 'answer' | 'shop' | 'delivery' | 'handoff' | 'booking' | 'lead' | 'campaign' | 'comments' | 'voice' | 'workflow' | 'analytics' | 'inbox' | 'records' | 'ticket' | 'search' | 'calculator';

// Explicit content-to-scene mapping keeps unrelated capabilities from receiving a generic illustration.
const groups: Record<Kind, string[]> = {
  answer: ['Answer questions from your information', 'Answer from your information', 'Show suggested questions', 'Answer direct messages', 'Reply to stories', 'Answer common questions', 'Answer from your pages', 'Suggest quick questions', 'Answer before booking', 'Answer from your help content', 'Answer product, size and stock questions', 'Answer return questions from your policy', 'Answer course questions', 'Explain products and processes', 'Share clinic information', 'Answer property questions', 'Answer from your docs', 'Answer property and package questions'],
  shop: ['Share products and a checkout link', 'Help customers buy', 'Help shoppers buy', 'Recommend from your catalogue', 'Check stock in your store', 'Add to cart and share checkout', 'Offer only your discounts', 'Link to what matters'],
  delivery: ['Send order updates', 'Check orders and deliveries', 'Tell customers where their order is', 'Send order and shipping updates', 'Track delivery and retry failures'],
  handoff: ['Hand over to your team', 'Hand over cleanly', 'Hand over to a person', 'Pass personal questions to a person', 'Pass clinical questions to your team', 'Hand over hot leads'],
  booking: ['Help customers buy or book', 'Book into your calendar', 'See every booking together', 'Book appointments', 'Book counselling', 'Book adviser calls', 'Book site visits', 'Book demos'],
  lead: ['Capture leads', 'Collect booking details', 'Collect the fields you need', 'Verify leads', 'Save lead details', 'Save customers and leads', 'Capture enquiries', 'Ask about requirements', 'Qualify leads', 'Capture booking enquiries', 'Collect details with forms'],
  campaign: ['Send WhatsApp campaigns', 'Send offers on WhatsApp', 'Send to a saved list or CSV', 'Reach your Shopify customers', 'Target one tag at a time', 'Personalise names and offers', 'Respect opt-outs automatically', 'Use approved templates'],
  comments: ['Turn comments into DMs', 'Turn Instagram comments into DMs'],
  voice: ['Answer inbound calls', 'Speak three languages', 'Take messages after hours', 'Call leads back', 'Answer missed calls on WhatsApp', 'Answer phone calls'],
  workflow: ['Follow up automatically', 'Recover carts and checkouts', 'Confirm cash on delivery orders', 'Win back customers', 'Alert your team', 'Branch on conditions', 'Choose what happens on errors', 'Let AI follow up on replies', 'Recover carts and confirm COD orders', 'Follow up', 'Build custom skills'],
  analytics: ['Chats and messages over time', 'Channel breakdown', 'Activity heat map', 'What customers are asking', 'Agent comparison', 'Leads by topic and source', 'Where customers are', 'See revenue from campaigns'],
  inbox: ['See every agent in one place', 'Filter by channel and agent', 'Star and track unread', 'Claim a live request', 'See the customer next to the chat', 'Work on mobile'],
  records: ['Save to your CRM or HubSpot', 'Tag the conversation', 'Keep a record', 'Manage three tables', 'Add your own fields', 'Save views', 'Keep notes and history', 'Filter by source and agent', 'See duplicates merged', 'Use HubSpot instead'],
  ticket: ['Create tickets', 'Create support tickets'],
  search: ['Search the web'],
  calculator: ['Calculate shipment landed cost', 'Check the cost before you send'],
};
export const capabilityKinds = Object.fromEntries(Object.entries(groups).flatMap(([kind, titles]) => titles.map(title => [title, kind]))) as Record<string, Kind>;

const labels: Record<Kind, string> = { answer: 'Answers', shop: 'Shopping', delivery: 'Updates', handoff: 'Your team', booking: 'Bookings', lead: 'Leads', campaign: 'Campaigns', comments: 'Comment to DM', voice: 'Calls', workflow: 'Follow-ups', analytics: 'Insights', inbox: 'Inbox', records: 'Customer records', ticket: 'Tickets', search: 'Web search', calculator: 'Cost preview' };
const shortLabels: Record<string, string> = {
  'Show suggested questions': 'Starter questions', 'Suggest quick questions': 'Quick questions', 'Reply to stories': 'Story replies', 'Answer direct messages': 'Direct messages', 'Link to what matters': 'Useful links',
  'Book into your calendar': 'Book a slot', 'See every booking together': 'All bookings', 'Collect booking details': 'Booking details', 'Answer before booking': 'Quick answers',
  'Collect the fields you need': 'Your fields', 'Verify leads': 'Verification', 'Save to your CRM or HubSpot': 'CRM sync', 'Tag the conversation': 'Tags',
  'Follow up automatically': 'Follow-ups', 'See revenue from campaigns': 'Revenue', 'Answer inbound calls': 'Inbound calls', 'Speak three languages': 'Languages', 'Take messages after hours': 'After hours', 'Call leads back': 'Callbacks', 'Keep a record': 'Call history',
  'Recommend from your catalogue': 'Recommendations', 'Check stock in your store': 'Live stock', 'Add to cart and share checkout': 'Checkout', 'Save lead details': 'Lead details', 'Offer only your discounts': 'Your discounts',
  'Answer missed calls on WhatsApp': 'Missed calls', 'Chats and messages over time': 'Volume', 'Channel breakdown': 'Channels', 'Activity heat map': 'Activity', 'What customers are asking': 'Questions', 'Agent comparison': 'Agents', 'Leads by topic and source': 'Lead sources', 'Where customers are': 'Locations',
  'Book appointments': 'Appointments', 'Save customers and leads': 'Customer details', 'Build custom skills': 'Custom skills', 'Calculate shipment landed cost': 'Shipment cost',
  'Recover carts and confirm COD orders': 'Cart recovery', 'Answer return questions from your policy': 'Returns', 'Capture booking enquiries': 'Enquiries', 'Book adviser calls': 'Adviser calls', 'Book site visits': 'Site visits', 'Book counselling': 'Counselling', 'Book demos': 'Demos',
};
const glyphs = { answer: BookOpen, shop: ShoppingBag, delivery: Truck, handoff: Headphones, booking: CalendarDays, lead: User, campaign: Send, comments: MessageCircle, voice: Phone, workflow: Workflow, analytics: Globe, inbox: Inbox, records: Users, ticket: Ticket, search: Search, calculator: Package };

function Lines({ count = 3 }: { count?: number }) { return <div className="cv-lines">{Array.from({ length: count }, (_, i) => <i key={i} />)}</div>; }
function Avatar({ team = false }: { team?: boolean }) { return <span className={`cv-avatar ${team ? 'is-team' : ''}`}>{team ? <Headphones size={21} /> : <Bot size={21} />}</span>; }
function Window({ children, title, icon, className = '' }: { children: ReactNode; title: string; icon?: ReactNode; className?: string }) { return <div className={`cv-window ${className}`}><div className="cv-window-bar">{icon ?? <MessageCircle size={17} />}<b>{title}</b><MoreHorizontal size={18} /></div>{children}</div>; }
function Bubble({ children, outgoing = false }: { children: ReactNode; outgoing?: boolean }) { return <div className={`cv-bubble ${outgoing ? 'is-outgoing' : ''}`}>{children}<CheckCheck size={13} /></div>; }
function Composer() { return <div className="cv-composer"><span /><Send size={18} /></div>; }
function Seal({ children, icon }: { children: ReactNode; icon?: ReactNode }) { return <div className="cv-seal">{icon ?? <CircleCheck size={19} />}<span>{children}</span></div>; }

const answerExamples:Record<string,[string,string,string]>={
 'Answer course questions':['Is this course suitable for beginners?','Yes. The course starts with the fundamentals. Here’s the course outline.','Course information'],
 'Explain products and processes':['What documents do I need?','Here’s the checklist from your application guide.','Application guide'],
 'Share clinic information':['Are you open on Saturday?','Yes, the clinic is open on Saturday. Would you like help with a booking?','Clinic information'],
 'Answer property questions':['Can I arrange a site visit?','Yes. Share your preferred day and I’ll help with the next step.','Property information'],
 'Answer property and package questions':['Is breakfast included?','Yes, breakfast is included in this package.','Package details'],
 'Answer from your docs':['Where can I find the setup guide?','Here’s the guide, with each setup step in order.','Setup guide'],
 'Answer before booking':['What should I bring?','Here’s the preparation checklist for your appointment.','Booking information'],
 'Reply to stories':['Can you tell me more about this?','Of course. Here are the details and a link to learn more.','Your business information'],
};
function AnswerScene({ title }: { title: string }) { const suggested = title === 'Show suggested questions' || title === 'Suggest quick questions'; const [question,answer,source]=answerExamples[title]??['Are you open on Saturday?','Yes, we’re open on Saturday. How can we help?','Business hours']; return <div className="cv-composition cv-answer cv-readable-answer">
  <div className="cv-knowledge"><div><Globe size={21}/><strong>Your website</strong></div><div><FileText size={21}/><strong>{source}</strong><span>Information you provide</span></div><div><BookOpen size={21}/><strong>FAQs & documents</strong></div><span><Check size={16}/>Your information, used in the reply</span></div>
  <div className="cv-bridge"><ArrowRight /></div>
  <Window title="Example conversation"><div className="cv-chat">{suggested ? <div className="cv-suggestions">{['Opening hours', 'How it works', 'Talk to us'].map(s => <span key={s}>{s}<ChevronRight size={13} /></span>)}</div> : <><Bubble outgoing>{question}</Bubble><div className="cv-answer-row"><Avatar /><Bubble>{answer}</Bubble></div><span className="cv-citation"><Link2 size={13}/>{source}</span></>}</div></Window>
</div>; }
function ShopScene({ title }: { title: string }) { if (title === 'Link to what matters') return <div className="cv-composition"><Window title="Useful links" icon={<Link2 size={18} />}><div className="cv-chat cv-suggestions">{['Catalogue', 'Booking page', 'Social profiles'].map(s => <span key={s}><Link2 size={16} />{s}<ChevronRight size={16} /></span>)}</div><Composer /></Window></div>; const stock = title === 'Check stock in your store'; const discount = title === 'Offer only your discounts'; return <div className="cv-composition cv-shopping">
  <div className="cv-products">{['sand', 'blue'].map((tone, i) => <div className={`cv-product ${tone}`} key={tone}><Shirt size={88} strokeWidth={1.1} /><span className="cv-swatches"><i /><i /><i /></span>{i === 0 && <span className="cv-product-check"><Check size={17} /></span>}</div>)}</div>
  <Window title={stock ? 'Inventory' : discount ? 'Store offer' : 'Your cart'} icon={stock ? <Package size={18} /> : discount ? <Tag size={18} /> : <ShoppingCart size={18} />}><div className="cv-cart-row"><span className="cv-cart-thumb"><Shirt size={35} /></span><div><b>Linen shirt</b><small>Medium · Sand</small></div><b>{stock ? <Check size={18} /> : '× 1'}</b></div><div className="cv-checkout">{stock ? 'In stock' : discount ? 'Approved discount' : 'Checkout'} <ArrowRight size={18} /></div></Window>
  <Seal>{stock ? 'Checked in your store' : discount ? 'Your rules applied' : 'Checkout link shared'}</Seal>
</div>; }
function DeliveryScene() { return <div className="cv-composition cv-delivery">
  <div className="cv-route"><div className="cv-route-line" /><span className="cv-route-start"><Package size={33} /></span><span className="cv-route-truck"><Truck size={43} /></span><span className="cv-route-end"><MapPin size={30} /></span><i className="cv-map-block one" /><i className="cv-map-block two" /><i className="cv-map-block three" /></div>
  <div className="cv-tracking"><span><Check size={15} /></span><i /><span><Check size={15} /></span><i /><span className="is-current"><Truck size={18} /></span><i /><span><MapPin size={17} /></span></div>
  <Seal icon={<Truck size={20} />}>Out for delivery</Seal>
</div>; }
function HandoffScene() { return <div className="cv-composition cv-handoff">
  <Window title="Shared conversation"><div className="cv-chat"><Bubble outgoing>Can I speak to your team?</Bubble><div className="cv-answer-row"><Avatar /><div className="cv-transfer"><Lines count={2} /><span><CheckCheck size={16} /></span></div></div><div className="cv-joined"><Headphones size={17} />Teammate joined</div><div className="cv-answer-row"><Avatar team /><Bubble>I’m here to help.</Bubble></div></div><Composer /></Window>
  <div className="cv-handoff-path"><Avatar /><span /><ArrowDown /><span /><Avatar team /></div><Seal>History included</Seal>
</div>; }
function BookingScene() { return <div className="cv-composition cv-booking">
  <Window title="Calendar" icon={<CalendarDays size={18} />}><div className="cv-calendar-days">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((x, i) => <small key={i}>{x}</small>)}{Array.from({ length: 21 }, (_, i) => <span key={i} className={i === 11 ? 'is-picked' : ''}>{i + 1}</span>)}</div></Window>
  <div className="cv-times"><span>10:00</span><span className="is-picked">11:30 <Check size={17} /></span><span>14:00</span></div><Seal icon={<CalendarCheck size={20} />}>Added to calendar</Seal>
</div>; }
function LeadScene({ title }: { title: string }) { const verify = title === 'Verify leads'; return <div className="cv-composition cv-leads">
  <div className="cv-lead-chat"><Bubble outgoing>Let’s talk.</Bubble><Bubble><User size={17} /><Lines count={1} /></Bubble><Bubble outgoing><Mail size={17} /><Lines count={1} /></Bubble></div><ArrowRight className="cv-lead-arrow" />
  <Window title={verify ? 'Contact verification' : 'New enquiry'} icon={verify ? <ShieldCheck size={18} /> : <User size={18} />}><div className="cv-profile"><span className="cv-person"><User size={32} /></span><Lines count={2} /></div>{verify ? <div className="cv-code">{[4, 2, 8, 1].map(n => <span key={n}>{n}</span>)}<ShieldCheck size={24} /></div> : [User, Mail, Tag].map((Icon, i) => <div className="cv-field" key={i}><Icon size={17} /><Lines count={1} /><Check size={15} /></div>)}</Window><Seal>{verify ? 'Contact verified' : 'Details captured'}</Seal>
</div>; }
function CampaignScene() { return <div className="cv-composition cv-campaign">
  <div className="cv-campaign-message"><Send size={32} /><Lines count={2} /><span className="cv-message-tag"><Tag size={13} />first_name</span></div>
  <div className="cv-fanout"><i /><i /><i /></div><div className="cv-recipients">{[0, 1, 2].map(i => <div key={i}><span className="cv-person"><User size={27} /></span><div className="cv-recipient-msg"><Lines count={2} /><CheckCheck size={15} /></div></div>)}</div>
</div>; }
function CommentsScene() { return <div className="cv-composition cv-comments">
  <div className="cv-social-post"><div className="cv-post-image"><ShoppingBag size={72} strokeWidth={1.1} /></div><div className="cv-post-comment"><span className="cv-person"><User size={18} /></span><b>PRICE</b><MessageCircle size={20} /></div></div><ArrowRight className="cv-comment-arrow" /><Window title="Direct message"><div className="cv-chat"><Bubble>Here’s the link.</Bubble><div className="cv-link-preview"><Link2 size={20} /><Lines count={2} /><ChevronRight size={18} /></div></div><Composer /></Window>
</div>; }
function VoiceScene({ title }: { title: string }) { if (title === 'Answer missed calls on WhatsApp') return <div className="cv-composition"><Window title="WhatsApp"><div className="cv-chat"><span className="cv-joined"><Phone size={18} />Missed call</span><div className="cv-answer-row"><Avatar /><Bubble>How can we help?</Bubble></div><Bubble outgoing><Lines count={2} /></Bubble></div><Composer /></Window><Seal>Reply sent in chat</Seal></div>; return <div className="cv-composition cv-voice"><div className="cv-call-disc"><Phone size={44} strokeWidth={1.5} /></div><div className="cv-wave">{[16, 25, 39, 58, 32, 76, 48, 92, 61, 35, 72, 52, 29, 42, 20].map((h, i) => <i key={i} style={{ height: h }} />)}</div>{title === 'Speak three languages' ? <div className="cv-language-chips"><span>English</span><span>हिन्दी</span><span>తెలుగు</span></div> : <div className="cv-voice-controls"><Mic size={22} /><span><Phone size={24} /></span><MoreHorizontal size={23} /></div>}<Seal>{title === 'Take messages after hours' ? 'Message saved' : 'Call connected'}</Seal></div>; }
function WorkflowScene() { return <div className="cv-composition cv-workflow"><div className="cv-flow-node"><ShoppingCart size={28} /><span /><Check size={17} /></div><div className="cv-flow-stem" /><div className="cv-condition"><Workflow size={25} /></div><div className="cv-branches"><div><i /><div className="cv-flow-node"><Send size={25} /><Lines count={1} /></div></div><div><i /><div className="cv-flow-node"><Headphones size={25} /><Lines count={1} /></div></div></div><Seal>Next step connected</Seal></div>; }
function AnalyticsScene({ title }: { title: string }) {
  if (title === 'Activity heat map') return <div className="cv-composition cv-analytics"><div className="cv-activity"><div className="cv-heatmap">{Array.from({ length: 84 }, (_, i) => <i key={i} style={{ opacity: .15 + ((i * 7) % 9) / 11 }} />)}</div><span>Morning</span><span>Evening</span></div></div>;
  if (title === 'Where customers are') return <div className="cv-composition cv-locations"><Globe size={180} strokeWidth={.8} /><div>{['Asia', 'Europe', 'Americas'].map((s, i) => <div className="cv-location-row" key={s}><MapPin size={18} /><span>{s}</span><i style={{ width: 100 - i * 25 }} /></div>)}</div></div>;
  const rows = title === 'Channel breakdown' ? ['WhatsApp', 'Instagram', 'Website'] : title === 'Agent comparison' ? ['Sales', 'Support', 'Booking'] : title === 'What customers are asking' ? ['Products', 'Orders', 'Returns'] : title === 'Leads by topic and source' ? ['Website', 'Campaign', 'Instagram'] : null;
  if (rows) return <div className="cv-composition"><div className="cv-horizontal-chart">{rows.map((s, i) => <div key={s}><span>{s}</span><i style={{ width: `${90 - i * 23}%` }} /></div>)}</div></div>;
  return <div className="cv-composition cv-analytics"><div className="cv-chart"><div className="cv-chart-axis"><small>Mon</small><small>Wed</small><small>Fri</small><small>Sun</small></div><div className="cv-bars">{[28, 46, 39, 63, 48, 84, 70].map((h, i) => <span key={i} style={{ height: `${h}%` }}><i /></span>)}</div></div><span className="cv-chart-key"><i />{title === 'See revenue from campaigns' ? 'Campaign revenue' : 'Conversations'}</span></div>;
}
function InboxScene() { return <div className="cv-composition cv-inbox"><Window title="Inbox" icon={<Inbox size={18} />}><div className="cv-inbox-body"><div className="cv-inbox-list">{[0, 1, 2, 3].map(i => <div key={i} className={i === 1 ? 'is-picked' : ''}><span className="cv-person"><User size={18} /></span><Lines count={2} /><i /></div>)}</div><div className="cv-chat"><Bubble outgoing><Lines count={2} /></Bubble><Bubble><Lines count={3} /></Bubble><div className="cv-assigned"><Avatar team /><Check size={17} /></div></div></div></Window></div>; }
function RecordsScene({ title }: { title: string }) { const calls = title === 'Keep a record'; return <div className="cv-composition cv-records"><Window title={calls ? 'Call history' : 'Customers'} icon={calls ? <Phone size={18} /> : <Users size={18} />}><div className="cv-table"><div className="cv-table-head">{calls ? <Phone size={16} /> : <User size={16} />}{calls ? <Mic size={16} /> : <Mail size={16} />}<Tag size={16} /></div>{[0, 1, 2, 3].map(i => <div className={i === 1 ? 'is-picked' : ''} key={i}><span className="cv-person">{calls ? <Phone size={17} /> : <User size={17} />}</span>{calls ? <span className="cv-recording"><Play size={13} fill="currentColor" /><i /><small>{['02:14', '01:38', '03:05', '00:52'][i]}</small></span> : <Lines count={1} />}<span className="cv-table-tag" /></div>)}</div></Window><Seal>{calls ? 'Recordings saved' : 'Context saved'}</Seal></div>; }
function TicketScene() { return <div className="cv-composition cv-ticket"><div className="cv-ticket-message"><Bubble outgoing>I need a little more help.</Bubble><div className="cv-answer-row"><Avatar /><Lines count={2} /></div></div><ArrowRight /><Window title="Support ticket" icon={<Ticket size={18} />}><div className="cv-ticket-paper"><Ticket size={40} /><Lines /><div className="cv-assigned"><Avatar team /><span>Assigned</span><Check size={17} /></div></div></Window></div>; }
function SearchScene() { return <div className="cv-composition cv-search"><div className="cv-search-bar"><Search size={23} /><Lines count={1} /><ArrowRight size={23} /></div><div className="cv-search-results">{[0, 1, 2].map(i => <div key={i}><Globe size={23} /><Lines count={2} />{i === 0 && <Check size={18} />}</div>)}</div><Seal>Source found</Seal></div>; }
function CalculatorScene() { return <div className="cv-composition cv-calculator"><div className="cv-parcel"><Package size={82} strokeWidth={1.2} /><div><span>1.2 kg</span><MapPin size={18} /></div></div><Window title="Cost preview" icon={<Package size={18} />}><div className="cv-calculator-paper">{['Base', 'Tax', 'Total'].map((x, i) => <div key={x}><span>{x}</span><span>{['100', '18', '118'][i]}</span></div>)}</div></Window></div>; }

const scenes: Record<Kind, (props: { title: string }) => ReactNode> = { answer: AnswerScene, shop: ShopScene, delivery: DeliveryScene, handoff: HandoffScene, booking: BookingScene, lead: LeadScene, campaign: CampaignScene, comments: CommentsScene, voice: VoiceScene, workflow: WorkflowScene, analytics: AnalyticsScene, inbox: InboxScene, records: RecordsScene, ticket: TicketScene, search: SearchScene, calculator: CalculatorScene };

export function CapabilityStage({ title, intro, items, icons, plainBackground = false, industry }: { title: string; intro: string; items: Item[]; icons: [ReactNode, string][]; plainBackground?: boolean; industry?: string }) {
  const [selected, setSelected] = useState(0);
  const section = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    if (!industry || !section.current) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener('change', updateMotion);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(section.current);
    return () => { observer.disconnect(); media.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', updateVisibility); };
  }, [industry]);
  useEffect(() => {
    if (!industry || paused || hovered || focused || !visible || !pageVisible || reducedMotion || items.length < 2) return;
    const timer = window.setTimeout(() => {
      if (!document.hidden) setSelected(current => (current + 1) % items.length);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [industry, paused, hovered, focused, visible, pageVisible, reducedMotion, selected, items.length]);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = items[selected];
  const kind = capabilityKinds[active.title] ?? 'answer';
  const Scene = scenes[kind];
  const commerce=commerceStories[active.title];
  const industryStory = industry ? industryStories[industry]?.[selected] : undefined;

  return <section ref={section} id="capabilities" className="container cv-section" aria-labelledby={`${uid}-heading`}>
    <h2 id={`${uid}-heading`}>{title}</h2>
    <p className="cv-sr-only">{intro} Select a capability to view an illustrative demonstration.</p>
    <div className="cv-theatre" onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)} onPointerDown={() => setPaused(true)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="cv-tabs" role="tablist" aria-label={title}>
        {items.map((item, i) => { const itemKind = capabilityKinds[item.title] ?? 'answer'; const Icon = glyphs[itemKind]; return <button key={item.title} ref={el => { tabs.current[i] = el; }} role="tab" id={`${uid}-tab-${i}`} aria-controls={`${uid}-panel`} aria-selected={selected === i} aria-label={item.title} title={item.title} tabIndex={selected === i ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={event => {
          const next = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? (i + 1) % items.length : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? (i + items.length - 1) % items.length : event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : -1;
          if (next >= 0) { event.preventDefault(); setSelected(next); tabs.current[next]?.focus(); }
        }}><span>{icons[i % icons.length]?.[0] ?? <Icon size={22} />}</span><span className="cv-tab-label">{shortLabels[item.title] ?? labels[itemKind]}</span></button>; })}
      </div>
      <div className={`cv-stage cv-kind-${kind}${commerce?' cv-commerce':''}${plainBackground&&!commerce?' cv-industry-plain':''}${industryStory?' cv-industry-story':''}`} id={`${uid}-panel`} role="tabpanel" tabIndex={0} aria-labelledby={`${uid}-tab-${selected}`} aria-describedby={`${uid}-description`}>
        {commerce&&<img className="cv-commerce-backdrop" src={commercePhoto} width="1536" height="1024" alt="" loading="lazy"/>}
        <div className="cv-stage-heading"><h3>{commerce?.benefit??industryStory?.benefit??active.title}</h3>{(commerce||industryStory)&&<p>{active.title}</p>}</div>
        <p className="cv-sr-only" id={`${uid}-description`}>{active.body}</p>
        <div className="cv-scene" key={selected}>{commerce?<CommerceCapability title={active.title}/>:industryStory?<IndustryCapability industry={industry!} story={industryStory}/>:<Scene title={active.title}/>}</div>
      </div>
    </div>
    {industry && !reducedMotion && <button className="cv-playback" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? 'Resume walkthrough' : 'Pause walkthrough'}</button>}
  </section>;
}
