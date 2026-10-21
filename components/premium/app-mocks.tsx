'use client';
import { Face } from '@/components/site/face';
import type { ReactNode } from 'react';
import {
  BadgeCheck, Bell, Bot, CalendarDays, Check, CircleDot, Clock, Filter, GitBranch, Hand, Inbox, LayoutGrid, Mail, MessageSquare,
  Play, Search, Send, ShoppingCart, Star, StickyNote, Ticket, Users, Workflow, Zap,
} from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { useLoop } from './kit';

import { asset } from '@/lib/asset';
// Light-theme recreations of the Steps AI inbox, CRM and workflow builder, in the same
// app frame as the analytics mockup. Designed at 1000px wide for ScaleBox. Fictional
// sample data; each screen plays a short loop while it is on screen.

const on = (t: number, at: number) => t >= at;
const fade = (t: number, at: number) => `ax-fade ${on(t, at) ? 'is-in' : ''}`;

function Frame({ active, menu, children, label, loopRef }: { active: number; menu: ReactNode; children: ReactNode; label: string; loopRef: React.Ref<HTMLDivElement> }) {
  const rail = [LayoutGrid, Bot, Inbox, Users, Workflow, MessageSquare];
  return <div ref={loopRef} className="am ax" role="img" aria-label={label}>
    <nav className="am-rail"><img src={asset("/brands/steps-original.png")} alt="" />{rail.map((Icon, i) => <span key={i} className={i === active ? 'is-on' : ''}><Icon size={15} /></span>)}<span className="am-rail-end"><Bell size={15} /></span></nav>
    {menu}
    <div className="ax-main">{children}</div>
  </div>;
}

/* ---------- Unified inbox: a live request arrives, is claimed and answered ---------- */

const CONVOS = [
  { name: 'Anu Sharma', ch: 'WhatsApp', text: 'My order arrived damaged', agent: 'Support desk', time: 'now' },
  { name: 'Rahul Verma', ch: 'Instagram', text: 'Is the linen shirt back in M?', agent: 'Sales assistant', time: '2m', tag: 'AI replied' },
  { name: 'Meera Iyer', ch: 'Website', text: 'Bulk order for 40 pieces', agent: 'Sales assistant', time: '9m', star: true },
  { name: 'Karan Mehta', ch: 'Messenger', text: 'Do you ship to Pune?', agent: 'Support desk', time: '14m', tag: 'AI replied' },
  { name: 'Priya Nair', ch: 'WhatsApp', text: 'Where is my order 2087?', agent: 'Support desk', time: '21m', tag: 'AI replied' },
  { name: 'Dev Patel', ch: 'Website', text: 'Can I change my size?', agent: 'Support desk', time: '35m', unread: true },
];

export function InboxMock() {
  const [ref, t] = useLoop(12000);
  const claimed = on(t, 4200);
  return <Frame loopRef={ref} active={2} label="Steps AI unified inbox with a live request being claimed and answered (illustration)"
    menu={<aside className="ax-list">
      <div className="ax-list-head"><strong>Inbox</strong><span><Search size={14} /></span></div>
      <div className="ax-tabs"><span className="is-on">All</span><span>Unread <b>2</b></span><span>Starred</span><span className="ax-live">Live <b>1</b></span></div>
      <div className="ax-selects"><span><Filter size={12} />All channels</span><span><Bot size={12} />All agents</span></div>
      {CONVOS.map((c, i) => <div key={c.name} className={`ax-convo ${i === 0 ? 'is-on' : ''} ${i === 0 && !on(t, 600) ? 'is-new' : ''}`}>
        <span className="ax-avatar"><Face name={c.name} initials={c.name[0]} /><i><ChannelLogo channel={c.ch} /></i></span>
        <div><strong>{c.name}<small>{c.time}</small></strong><p>{c.text}</p>
          <em>{c.agent}{i === 0 ? <b className={claimed ? 'ax-pill-green' : 'ax-pill-amber'}>{claimed ? 'With Ananya' : 'Live request'}</b> : c.tag ? <b>{c.tag}</b> : null}{c.star && <Star size={12} className="ax-star" />}{c.unread && <i className="ax-dot" />}</em></div>
      </div>)}
    </aside>}>
    <div className="ax-thread">
      <header className="ax-thread-head"><span className="ax-avatar"><Face name="Anu Sharma" initials="A" /><i><ChannelLogo channel="WhatsApp" /></i></span><div><strong>Anu Sharma</strong><small>WhatsApp · Support desk</small></div>
        <span className={claimed ? 'ax-pill-green' : 'ax-pill-amber'}>{claimed ? <><Check size={12} />Claimed by Ananya</> : <><Hand size={12} />Wants a person</>}</span></header>
      <div className="ax-msgs">
        <p className={`ax-in ${fade(t, 300)}`}>Hi, my order 1042 arrived and the box is damaged. The bottle inside is broken.</p>
        <p className={`ax-out ax-ai ${fade(t, 1300)}`}><small><Bot size={11} />AI agent</small>I am sorry about that. I will connect you with our team so they can sort out a replacement.</p>
        <span className={`ax-sys ${fade(t, 2400)}`}><Hand size={12} />Live request created</span>
        <span className={`ax-sys ax-sys-green ${fade(t, 4200)}`}><Check size={12} />Ananya claimed this conversation</span>
        <p className={`ax-out ax-team ${fade(t, 5800)}`}><small><span className="ax-mini-face"><Face name="Ananya" initials="A" /></span>Ananya</small>Hi Anu, I have arranged a free replacement. It ships today with tracking on WhatsApp.</p>
        <p className={`ax-in ${fade(t, 7600)}`}>Thank you, that was quick!</p>
        <span className={`ax-sys ${fade(t, 9000)}`}><CircleDot size={12} />Handoff resolved</span>
      </div>
      <footer className="ax-compose">{claimed ? <><span>Reply to Anu…</span><b><Send size={14} /></b></> : <button className={on(t, 2400) ? 'is-pulse' : ''}><Hand size={14} />Claim conversation</button>}</footer>
    </div>
    <aside className="ax-side">
      <div className="ax-side-who"><span className="ax-avatar ax-avatar-lg"><Face name="Anu Sharma" initials="A" /></span><strong>Anu Sharma</strong><small><BadgeCheck size={12} />Phone verified</small></div>
      <dl><dt>Phone</dt><dd>+91 98••• ••210</dd><dt>Email</dt><dd>anu.s@mail.com</dd><dt>Source</dt><dd><ChannelLogo channel="WhatsApp" />WhatsApp</dd><dt>Agent</dt><dd>Support desk</dd></dl>
      <div className={`ax-ticket ${fade(t, 2400)}`}><Ticket size={13} /><div><strong>Damaged item</strong><small>Ticket #T-208 · Open</small></div></div>
    </aside>
  </Frame>;
}

/* ---------- CRM: a record arrives from a chat and opens with its history ---------- */

const PEOPLE = [
  { name: 'Rahul Verma', phone: true, email: 'rahul.v@mail.com', ch: 'Instagram', agent: 'Sales assistant', when: 'Today' },
  { name: 'Meera Iyer', phone: false, email: 'meera@studio.in', ch: 'Website', agent: 'Sales assistant', when: 'Today' },
  { name: 'Karan Mehta', phone: true, email: 'karan.m@mail.com', ch: 'Messenger', agent: 'Support desk', when: 'Yesterday' },
  { name: 'Priya Nair', phone: true, email: 'priya.n@mail.com', ch: 'WhatsApp', agent: 'Support desk', when: 'Yesterday' },
  { name: 'Dev Patel', phone: false, email: 'dev.p@mail.com', ch: 'Website', agent: 'Support desk', when: 'Sep 8' },
];

export function CrmMock() {
  const [ref, t] = useLoop(11000);
  const open = on(t, 3800);
  return <Frame loopRef={ref} active={3} label="Steps AI CRM table with a new customer record from a chat (illustration)"
    menu={<aside className="am-menu"><small>CRM</small><span className="is-on"><Users size={14} />Customers</span><span><Ticket size={14} />Tickets</span><span><Hand size={14} />Live requests</span>
      <small className="ax-menu-sub">Saved views</small><span><Star size={14} />New this week</span><span><Star size={14} />WhatsApp leads</span></aside>}>
    <header className="am-head"><div><strong><Users size={15} />Customers</strong><small>Every person your agents have spoken to</small></div><span><CalendarDays size={12} /> Last 7 days</span><span>All agents</span></header>
    <div className="ax-toolbar"><span className="ax-search"><Search size={13} />Search customers</span><span className="ax-filter"><Filter size={12} />Source: All</span><span className="ax-filter">Agent: All</span><span className="ax-count">1,248 customers</span></div>
    <div className="ax-table-wrap">
      <table className="ax-table"><thead><tr><th>Name</th><th>Email</th><th>Source</th><th>Agent</th><th>Added</th></tr></thead>
        <tbody>
          <tr className={`ax-new ${on(t, 1200) ? 'is-in' : ''} ${open ? 'is-sel' : ''}`}><td><span className="ax-avatar"><Face name="Anu Sharma" initials="A" /></span>Anu Sharma<BadgeCheck size={13} className="ax-ok" /><b className="ax-pill-blue">New from chat</b></td><td>anu.s@mail.com</td><td><ChannelLogo channel="WhatsApp" />WhatsApp</td><td>Support desk</td><td>Just now</td></tr>
          {PEOPLE.map(p => <tr key={p.name}><td><span className="ax-avatar"><Face name={p.name} initials={p.name[0]} /></span>{p.name}{p.phone && <BadgeCheck size={13} className="ax-ok" />}</td><td>{p.email}</td><td><ChannelLogo channel={p.ch} />{p.ch}</td><td>{p.agent}</td><td>{p.when}</td></tr>)}
        </tbody></table>
      <aside className={`ax-drawer ${open ? 'is-open' : ''}`}>
        <div className="ax-side-who"><span className="ax-avatar ax-avatar-lg"><Face name="Anu Sharma" initials="A" /></span><strong>Anu Sharma</strong><small><BadgeCheck size={12} />Phone verified</small></div>
        <dl><dt>Order number</dt><dd>1042</dd><dt>City</dt><dd>Bengaluru</dd><dt>Plan interest</dt><dd>Gift bundle</dd></dl>
        <small className="ax-drawer-label">Activity</small>
        <div className={`ax-act ${fade(t, 4600)}`}><MessageSquare size={12} />Chat on WhatsApp with Support desk</div>
        <div className={`ax-act ${fade(t, 5400)}`}><Ticket size={12} />Ticket #T-208 opened</div>
        <div className={`ax-act ${fade(t, 6200)}`}><StickyNote size={12} />Note: send replacement today</div>
      </aside>
    </div>
  </Frame>;
}

/* ---------- Workflow builder: a cart recovery flow goes live and runs ---------- */

type Node = { icon: ReactNode; kind: string; title: string; sub: string; tone: string };
const FLOW: Node[] = [
  { icon: <ShoppingCart size={15} />, kind: 'Trigger', title: 'Checkout abandoned', sub: 'Shopify', tone: 'green' },
  { icon: <Clock size={15} />, kind: 'Wait', title: '1 hour', sub: 'Then continue', tone: 'slate' },
  { icon: <GitBranch size={15} />, kind: 'Condition', title: 'Order completed?', sub: 'Compare earlier step', tone: 'amber' },
];

export function WorkflowMock() {
  const [ref, t] = useLoop(12000);
  const live = on(t, 1600);
  const step = live ? Math.min(5, Math.floor((t - 1600) / 1300)) : -1; // which node the run has reached
  const lit = (i: number) => step >= i ? 'is-lit' : '';
  return <Frame loopRef={ref} active={4} label="Steps AI workflow builder with a cart recovery workflow switched on and running (illustration)"
    menu={<aside className="am-menu ax-steps-menu"><small>Add a step</small>
      {[[<Clock key="a" size={14} />, 'Wait'], [<GitBranch key="b" size={14} />, 'Condition'], [<ChannelLogo key="c" channel="WhatsApp" />, 'WhatsApp message'], [<MessageSquare key="d" size={14} />, 'Website message'], [<Mail key="e" size={14} />, 'Email'], [<Zap key="f" size={14} />, 'HTTP request']].map(([i, l]) => <span key={l as string}>{i}{l}</span>)}
      <small className="ax-menu-sub">Templates</small><span><Star size={14} />COD confirmation</span><span><Star size={14} />Review request</span></aside>}>
    <header className="am-head"><div><strong><Workflow size={15} />Cart recovery</strong><small>Template · Shopify</small></div>
      <span className={`ax-toggle ${live ? 'is-on' : ''}`}><i />{live ? 'Active' : 'Draft'}</span><span><Play size={12} /> Run history</span></header>
    <div className="ax-canvas">
      <div className="ax-flow">
        {FLOW.map((n, i) => <div key={n.title} className="ax-flow-step"><div className={`ax-node ax-tone-${n.tone} ${lit(i)}`}><span>{n.icon}</span><div><small>{n.kind}</small><strong>{n.title}</strong><em>{n.sub}</em></div>{step === i && <i className="ax-runner" />}</div><b className={`ax-wire ${lit(i + 1)}`} /></div>)}
        <div className="ax-branches">
          <div><span className="ax-branch-label">No</span>
            <div className={`ax-node ax-tone-wa ${lit(3)}`}><span><ChannelLogo channel="WhatsApp" /></span><div><small>Send message</small><strong>Cart reminder</strong><em>Approved WhatsApp template</em></div>{step === 3 && <i className="ax-runner" />}</div>
            <b className={`ax-wire ${lit(4)}`} />
            <div className={`ax-node ax-tone-blue ${lit(4)}`}><span><Mail size={15} /></span><div><small>Send email</small><strong>Still thinking it over?</strong><em>After 1 day · On error: retry</em></div>{step >= 4 && <i className="ax-runner" />}</div>
          </div>
          <div><span className="ax-branch-label">Yes</span><div className="ax-node ax-tone-slate ax-node-end"><span><Check size={15} /></span><div><small>End</small><strong>Order placed</strong></div></div></div>
        </div>
      </div>
      <aside className="ax-runs"><strong>Run history</strong>
        {[['Shopper #4412', 'Running', 'amber'], ['Shopper #4409', 'Recovered', 'green'], ['Shopper #4405', 'Recovered', 'green'], ['Shopper #4398', 'Skipped', 'slate']].map(([n, s, c], i) => <div key={n} className={`ax-run ${i === 0 ? fade(t, 2000) : ''}`}><span>{n}</span><b className={`ax-pill-${c}`}>{i === 0 && step >= 4 ? 'Email sent' : s}</b></div>)}
        <div className="ax-runs-total"><small>Recovered this month</small><strong>14 checkouts</strong></div>
      </aside>
    </div>
  </Frame>;
}
