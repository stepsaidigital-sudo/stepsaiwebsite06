'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, BarChart3, BookOpen, CalendarCheck, ChevronDown, Code2, FileText, GitBranch, Inbox, LifeBuoy, Megaphone, PhoneCall, Scale, ShoppingBag, Sparkles, Star, Headphones, Users, UserPlus } from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import nav from '@/content/site/nav.json';
import { builtRoutes } from './routes';

type NavItem = { label: string; href: string; body: string };
type Column = { title: string; style: string; items: NavItem[] };
type Menu = { label: string; columns: Column[] };

// Icon tile per menu label. Tints come from the homepage scene canvases.
const tiles: Record<string, [ReactNode, string]> = {
  'WhatsApp broadcast': [<Megaphone key="i" size={19} />, 'green'],
  'Unified inbox': [<Inbox key="i" size={19} />, 'blue'],
  CRM: [<Users key="i" size={19} />, 'lilac'],
  Analytics: [<BarChart3 key="i" size={19} />, 'yellow'],
  'Agent skills': [<Sparkles key="i" size={19} />, 'peach'],
  'Workflow builder': [<GitBranch key="i" size={19} />, 'mint'],
  'AI sales agent': [<ShoppingBag key="i" size={19} />, 'green'],
  'AI support agent': [<Headphones key="i" size={19} />, 'blue'],
  'AI lead capture agent': [<UserPlus key="i" size={19} />, 'lilac'],
  'AI booking agent': [<CalendarCheck key="i" size={19} />, 'yellow'],
  'AI marketing agent': [<Megaphone key="i" size={19} />, 'peach'],
  'AI receptionist': [<PhoneCall key="i" size={19} />, 'mint'],
  Blog: [<FileText key="i" size={19} />, 'blue'],
  'Customer stories': [<Star key="i" size={19} />, 'yellow'],
  Compare: [<Scale key="i" size={19} />, 'lilac'],
  'Help centre': [<LifeBuoy key="i" size={19} />, 'mint'],
  'Developer docs': [<Code2 key="i" size={19} />, 'peach'],
};
const channelOf: Record<string, string> = { 'Website chatbot': 'Website', 'WhatsApp chatbot': 'WhatsApp', 'Instagram chatbot': 'Instagram', 'Messenger chatbot': 'Messenger', 'Chat page': 'Website' };

const live = new Set(Object.values(builtRoutes));

// A built page is a real link; anything else opens the preview notice.
function Entry({ item, tile, onOpen, done }: { item: NavItem; tile: boolean; onOpen: (label: string) => void; done: () => void }) {
  const [icon, tint] = tiles[item.label] ?? [<BookOpen key="i" size={19} />, 'blue'];
  const inner = tile
    ? <><span className={`mm-tile mm-${tint}`}>{icon}</span><span className="mm-text"><strong>{item.label}</strong>{item.body && <small>{item.body}</small>}</span></>
    : <>{channelOf[item.label] && <ChannelLogo channel={channelOf[item.label]} />}<span>{item.label}</span>{live.has(item.href) && <ArrowUpRight size={14} className="mm-live" />}</>;
  const cls = tile ? 'mm-entry mm-tile-entry' : 'mm-entry mm-link-entry';
  return live.has(item.href)
    ? <a className={cls} href={item.href} onClick={done}>{inner}</a>
    : <button className={cls} onClick={() => { done(); onOpen(item.label); }}>{inner}</button>;
}

// Product, Solutions and Resources dropdowns. On wide screens they open on
// hover or click as floating panels; inside the mobile menu they expand in place.
export function MegaMenus({ onOpen, onNavigate }: { onOpen: (label: string) => void; onNavigate: () => void }) {
  const [active, setActive] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!active) return;
    const away = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setActive(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); triggers.current[active]?.focus(); setActive(null); } };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc, true);
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', esc, true); };
  }, [active]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const hoverable = () => matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1201px)').matches;
  const later = (next: string | null, ms: number) => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setActive(next), ms); };
  const done = () => { setActive(null); onNavigate(); };

  return <div className="mm-root" ref={root} onBlur={e => { if (!root.current?.contains(e.relatedTarget as Node)) setActive(null); }}>
    {(nav.menus as Menu[]).map(menu => {
      const open = active === menu.label;
      const id = `mm-${menu.label.toLowerCase()}`;
      return <div key={menu.label} className={`mm-item ${open ? 'is-open' : ''}`}
        onPointerEnter={e => { if (e.pointerType === 'mouse' && hoverable()) later(menu.label, active ? 0 : 90); }}
        onPointerLeave={e => { if (e.pointerType === 'mouse' && hoverable()) later(null, 160); }}>
        <button ref={el => { triggers.current[menu.label] = el; }} className="mm-trigger" aria-expanded={open} aria-controls={id} onClick={() => { window.clearTimeout(timer.current); setActive(open ? null : menu.label); }}>
          {menu.label}<ChevronDown size={15} />
        </button>
        <div id={id} className="mm-panel" hidden={!open}>
          {menu.columns.map(column => <div key={column.title} className={`mm-column mm-${column.style}`}>
            <span className="mm-heading">{column.title}</span>
            {column.items.map(item => <Entry key={item.label} item={item} tile={column.style === 'tiles'} onOpen={onOpen} done={done} />)}
          </div>)}
        </div>
      </div>;
    })}
  </div>;
}
