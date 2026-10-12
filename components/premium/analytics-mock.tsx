'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Activity, ArrowDown, ArrowUp, Bell, Briefcase, CalendarDays, Flag, Globe, Hash, LayoutGrid, Layers, MessageSquare, Monitor,
  ShoppingBag, DollarSign,
} from 'lucide-react';

// Light-theme recreation of the Steps AI analytics Overview screen (from the product's own dashboard).
// Sample store data; numbers count up and the chart draws itself when the mockup comes into view.

const STATS = { revenue: 41800, conversations: 612, response: 2.2, conversion: 9.0, cart: 10640, leads: 74, deflected: 88.2 };
const LINE = { labels: ['Sep 2', 'Sep 3', 'Sep 4', 'Sep 5', 'Sep 6', 'Sep 7', 'Sep 8', 'Sep 9', 'Sep 10'], chats: [0, 6, 8, 2, 0, 8, 33, 19, 21], messages: [0, 16, 36, 6, 0, 126, 95, 58, 120] };
const PIE = [
  { name: 'Website widget', pct: 62, color: '#2c9cfa' },
  { name: 'WhatsApp', pct: 26, color: '#25d366' },
  { name: 'Instagram', pct: 10, color: '#d62976' },
  { name: 'Messenger', pct: 2, color: '#0a7cff' },
];
const inr = (v: number) => '₹' + Math.round(v).toLocaleString('en-IN');

function useProgress(duration = 2200) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setP(1); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => { const x = Math.min(1, (now - start) / duration); setP(x * (2 - x)); if (x < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }, { threshold: .25 });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [duration]);
  return [ref, p] as const;
}

function path(values: number[], w: number, h: number, max: number) {
  const pts = values.map((v, i) => [i * (w / (values.length - 1)), h - (v / max) * h] as const);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return { d, pts };
}

function LineChart({ p }: { p: number }) {
  const w = 520, h = 170, max = 140;
  const chats = path(LINE.chats, w, h, max), msgs = path(LINE.messages, w, h, max);
  return <svg className="am-line" viewBox={`-30 -10 ${w + 40} ${h + 34}`} aria-hidden="true">
    <defs>
      <linearGradient id="am-g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2c9cfa" stopOpacity=".28" /><stop offset="1" stopColor="#2c9cfa" stopOpacity="0" /></linearGradient>
      <linearGradient id="am-g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0c3474" stopOpacity=".18" /><stop offset="1" stopColor="#0c3474" stopOpacity="0" /></linearGradient>
      <clipPath id="am-clip"><rect x="-4" y="-10" width={(w + 8) * p} height={h + 20} /></clipPath>
    </defs>
    {[0, 35, 70, 105, 140].map(v => <g key={v}><line x1="0" x2={w} y1={h - (v / max) * h} y2={h - (v / max) * h} className="am-grid" /><text x="-8" y={h - (v / max) * h + 4} className="am-tick" textAnchor="end">{v}</text></g>)}
    {LINE.labels.map((l, i) => <text key={l} x={i * (w / 8)} y={h + 20} className="am-tick" textAnchor="middle">{l}</text>)}
    <g clipPath="url(#am-clip)">
      <path d={`${msgs.d} L${w},${h} L0,${h}Z`} fill="url(#am-g2)" />
      <path d={`${chats.d} L${w},${h} L0,${h}Z`} fill="url(#am-g1)" />
      <path d={msgs.d} className="am-stroke" stroke="#0c3474" />
      <path d={chats.d} className="am-stroke" stroke="#2c9cfa" />
      {msgs.pts.map(([x, y], i) => <circle key={`m${i}`} cx={x} cy={y} r="3.2" className="am-dot" stroke="#0c3474" />)}
      {chats.pts.map(([x, y], i) => <circle key={`c${i}`} cx={x} cy={y} r="3.2" className="am-dot" stroke="#2c9cfa" />)}
    </g>
  </svg>;
}

function Donut({ p }: { p: number }) {
  const r = 52, c = 2 * Math.PI * r;
  let offset = 0;
  return <div className="am-donut">
    <svg viewBox="0 0 140 140" aria-hidden="true">
      <circle cx="70" cy="70" r={r} className="am-donut-track" />
      {PIE.map(s => { const len = (s.pct / 100) * c * p; const el = <circle key={s.name} cx="70" cy="70" r={r} stroke={s.color} strokeDasharray={`${Math.max(0, len - 2)} ${c}`} strokeDashoffset={-offset} className="am-donut-seg" />; offset += (s.pct / 100) * c * p; return el; })}
    </svg>
    <div className="am-donut-mid"><strong>₹{(STATS.revenue * p / 1000).toFixed(1)}K</strong><small>Total</small></div>
  </div>;
}

const rail = [LayoutGrid, ShoppingBag, Layers, DollarSign, Flag, Monitor, Hash, MessageSquare, Activity];

export function AnalyticsMock({ compact = false }: { compact?: boolean }) {
  const [ref, p] = useProgress();
  return <div ref={ref} className={`am ${compact ? 'is-compact' : ''}`} role="img" aria-label="Steps AI analytics overview with revenue, conversations, response time and channel breakdown (illustration)">
    <nav className="am-rail"><img src="/brands/steps-original.png" alt="" />{rail.map((Icon, i) => <span key={i} className={i === 8 ? 'is-on' : ''}><Icon size={15} /></span>)}<span className="am-rail-end"><Bell size={15} /></span></nav>
    <aside className="am-menu"><small>Analytics</small><span className="is-on"><CalendarDays size={14} />Overview</span><span><Globe size={14} />Geo</span><div className="am-plan"><small>Current plan</small><strong>Scale plan</strong><i /></div></aside>
    <div className="am-main">
      <header className="am-head"><div><strong><LayoutGrid size={15} />Overview</strong><small>Performance overview across your agents</small></div><span>Sep 2 – Sep 9, 2026</span><span>All agents</span></header>
      <div className="am-store"><b>WearBliss</b><i />Shopify clothing brand<i />~190–200 orders/month<i />AOV ₹750<span><CalendarDays size={12} />30 days</span></div>
      <div className="am-kpis">
        <div><small>Steps AI assisted revenue</small><strong>{inr(STATS.revenue * p)}</strong><em className="is-up"><ArrowUp size={11} />12.6% <span>vs last 30 days</span></em></div>
        <div><small>Conversations handled</small><strong>{Math.round(STATS.conversations * p)}</strong><em><b>84.5%</b> <span>automated resolution</span></em></div>
        <div><small>Avg response time</small><strong>{(STATS.response * p).toFixed(1)} sec</strong><em className="is-up"><ArrowDown size={11} />94% <span>vs human response</span></em></div>
        <div><small>Conversion rate</small><strong>{(STATS.conversion * p).toFixed(1)}%</strong><em className="is-up"><ArrowUp size={11} />1.4% <span>vs last 30 days</span></em></div>
      </div>
      <div className="am-charts">
        <div className="am-card am-card-line"><strong>Chats &amp; messages over time</strong><small>Daily volume across the selected date range</small><LineChart p={p} /><div className="am-legend"><span><i style={{ background: '#2c9cfa' }} />Chats</span><span><i style={{ background: '#0c3474' }} />Messages</span></div></div>
        <div className="am-card"><strong>Channel revenue &amp; traffic</strong><small>Revenue distribution across channels</small><div className="am-donut-row"><Donut p={p} /><ul>{PIE.map(s => <li key={s.name}><i style={{ background: s.color }} />{s.name}<b>{s.pct}%</b></li>)}</ul></div></div>
      </div>
      {!compact && <>
        <div className="am-kpis am-kpis-3">
          <div><small>Abandoned cart recoveries</small><strong>{inr(STATS.cart * p)}</strong><em><span>14 recovered checkouts</span></em></div>
          <div><small>High-intent leads</small><strong>{Math.round(STATS.leads * p)}</strong><em><span>Leads captured</span></em></div>
          <div><small>Repetitive tickets deflected</small><strong>{(STATS.deflected * p).toFixed(1)}%</strong><em><span>Sizing · Delivery · COD · Returns · Tracking</span></em></div>
        </div>
        <div className="am-card am-table"><strong>Agent performance</strong><small>Conversations, response times and CRM activity per agent</small>
          <table><thead><tr><th>Agent</th><th>Conversations</th><th>Avg msgs/chat</th><th>Avg response</th><th>Tickets</th><th>Leads</th></tr></thead>
            <tbody><tr><td><Briefcase size={13} />WearBliss</td><td>{Math.round(STATS.conversations * p)}</td><td>3.4</td><td>{(STATS.response * p).toFixed(1)} sec</td><td>95</td><td>{Math.round(STATS.leads * p)}</td></tr></tbody></table>
        </div>
      </>}
    </div>
  </div>;
}

// Renders a fixed-width desktop screen scaled down to fit its container.
export function ScaleBox({ width = 1000, children }: { width?: number; children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null), inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ s: 1, h: 0 });
  useEffect(() => {
    const ro = new ResizeObserver(() => { const w = outer.current!.clientWidth; const s = Math.min(1, w / width); setBox({ s, h: inner.current!.offsetHeight * s }); });
    ro.observe(outer.current!); ro.observe(inner.current!);
    return () => ro.disconnect();
  }, [width]);
  return <div ref={outer} className="am-scale" style={{ height: box.h || undefined }}><div ref={inner} style={{ width, transform: `scale(${box.s})`, transformOrigin: 'top left' }}>{children}</div></div>;
}
