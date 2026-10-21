'use client';
import { useEffect, useState } from 'react';
import { Check, Globe } from 'lucide-react';
import { AppLogo } from './integration';

import { asset } from '@/lib/asset';
export type HubApp = { slug: string; name: string; channel: string; question?: string; answer?: string; found?: string };

// Diagram geometry, in viewBox units. Nodes are placed with the same numbers
// as percentages so the HTML tiles sit exactly on the SVG line ends. Channels
// sit high enough that their wires never pass under the reply card.
const W = 1000, H = 380, CORE = { x: 500, y: 112 };
const CHANNELS = [
  { name: 'WhatsApp', y: 64, icon: <img src={asset("/brands/whatsapp.png")} alt="" width={22} height={22} /> },
  { name: 'Instagram', y: 124, icon: <img src={asset("/brands/instagram-icon.png")} alt="" width={22} height={22} /> },
  { name: 'Website', y: 184, icon: <Globe size={19} /> },
];
const APP_Y = [50, 120, 190, 260, 330];
const left = (y: number) => `M150 ${y} C 300 ${y}, 330 ${CORE.y}, 452 ${CORE.y}`;
const right = (y: number) => `M548 ${CORE.y} C 670 ${CORE.y}, 700 ${y}, 850 ${y}`;
const DOWN = `M${CORE.x} 160 L${CORE.x} 206`;
const pos = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

// Timeline of one exchange, in ms: the message beams in, the agent checks the
// app, the result comes back, then the reply types out.
const AT = { checking: 900, found: 1900, typing: 2300, hold: 2600 };

// Customer channels flow into Steps AI, which reaches into the connected apps.
// One app at a time: a beam carries the message in, the card shows the lookup
// trace, and the reply types out. Sample conversations from each app's page.
export function HubDiagram({ apps }: { apps: HubApp[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState(0);
  const app = apps[active];
  const answer = app.answer ?? '';
  const channel = Math.max(CHANNELS.findIndex(c => c.name === app.channel), 0);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setPhase(3); setTyped(answer.length); return; }
    setPhase(0); setTyped(0);
    const t = [setTimeout(() => setPhase(1), AT.checking), setTimeout(() => setPhase(2), AT.found), setTimeout(() => setPhase(3), AT.typing)];
    return () => t.forEach(clearTimeout);
  }, [active, answer.length]);

  // Type two characters per tick, then hold before the next app.
  useEffect(() => {
    if (phase < 3) return;
    if (typed < answer.length) { const t = setTimeout(() => setTyped(n => n + 2), 26); return () => clearTimeout(t); }
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setActive(a => (a + 1) % apps.length), AT.hold);
    return () => clearTimeout(t);
  }, [phase, typed, answer.length, paused, apps.length]);

  const pick = (i: number) => { setPaused(true); if (i !== active) setActive(i); };

  return <div className="igh-stage" onMouseLeave={() => setPaused(false)}>
    <svg className="igh-wires" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="igh-beam-l" gradientUnits="userSpaceOnUse" x1="150" y1="0" x2="452" y2="0"><stop offset="0" stopColor="#2c9cfa" stopOpacity="0" /><stop offset=".6" stopColor="#2c9cfa" /><stop offset="1" stopColor="#7fd3ff" /></linearGradient>
        <linearGradient id="igh-beam-r" gradientUnits="userSpaceOnUse" x1="548" y1="0" x2="850" y2="0"><stop offset="0" stopColor="#7fd3ff" /><stop offset=".5" stopColor="#2c9cfa" /><stop offset="1" stopColor="#f8b403" /></linearGradient>
      </defs>
      {CHANNELS.map((c, i) => <path key={c.name} d={left(c.y)} className={`igh-rail ${i === channel ? 'is-on' : ''}`} />)}
      {APP_Y.map((y, i) => <path key={y} d={right(y)} className={`igh-rail ${i === active ? 'is-on' : ''}`} />)}
      <path d={DOWN} className={`igh-rail igh-rail-down ${phase >= 3 ? 'is-on' : ''}`} />
      <g key={active}>
        <path d={left(CHANNELS[channel].y)} pathLength={1} className="igh-beam igh-beam-in" stroke="url(#igh-beam-l)" />
        <path d={right(APP_Y[active])} pathLength={1} className="igh-beam igh-beam-out" stroke="url(#igh-beam-r)" />
        <path d={right(APP_Y[active])} pathLength={1} className="igh-beam igh-beam-back" stroke="url(#igh-beam-r)" />
      </g>
    </svg>

    {CHANNELS.map((c, i) => <span key={c.name} className={`igh-channel ${i === channel ? 'is-on' : ''}`} style={pos(90, c.y)}>{c.icon}{c.name}</span>)}

    <span className={`igh-core ${phase === 1 ? 'is-thinking' : ''}`} style={pos(CORE.x, CORE.y)}><img src={asset("/brands/steps-original.png")} alt="" width={50} height={50} /></span>

    {apps.map((a, i) => <a key={a.slug} href={`/integrations/${a.slug}/`} className={`igh-app ${i === active ? 'is-on' : ''} ${i === active && phase >= 1 ? 'is-hit' : ''}`} style={pos(910, APP_Y[i])}
      onMouseEnter={() => pick(i)} onFocus={() => pick(i)} onBlur={() => setPaused(false)} aria-label={`${a.name} integration`}>
      <AppLogo slug={a.slug} size={28} /><span>{a.name}</span><i className="igh-dot" aria-hidden="true" />
    </a>)}

    <div className="igh-card" key={app.slug} aria-hidden="true">
      <div className="igh-card-head"><span>{CHANNELS[channel].icon}</span><strong>{app.channel}</strong><small>Just now</small></div>
      <p className="igh-msg igh-in">{app.question}</p>
      <div className="igh-trace">
        {phase >= 1 && <span className={`igh-step ${phase >= 2 ? 'is-done' : ''}`}><i>{phase >= 2 ? <Check size={11} strokeWidth={3} /> : null}</i><AppLogo slug={app.slug} size={14} />{phase >= 2 ? <b>{app.found || `Found in ${app.name}`}</b> : <>Checking {app.name}<em>…</em></>}</span>}
      </div>
      {phase >= 3 && <p className="igh-msg igh-out">{answer.slice(0, typed)}{typed < answer.length && <span className="igh-caret" />}</p>}
    </div>
    <p className="igh-sr" aria-live="polite">{`${app.channel} example. Customer: ${app.question} Steps AI checked ${app.name}. Reply: ${answer}`}</p>
  </div>;
}

// Overlapping app logos, with a count for the rest.
export function LogoStack({ slugs, max = 5 }: { slugs: string[]; max?: number }) {
  return <span className="igh-stack">{slugs.slice(0, max).map(s => <span key={s}><AppLogo slug={s} size={22} /></span>)}{slugs.length > max && <span className="igh-more">+{slugs.length - max}</span>}</span>;
}

// A delivery moving through its stages, for the order tracking job.
export function TrackingStrip() {
  return <div className="igh-track" aria-hidden="true">
    {['Ordered', 'Shipped', 'Out for delivery'].map((s, i) => <span key={s} className={i < 2 ? 'is-done' : 'is-now'}><i>{i < 2 && <Check size={11} />}</i>{s}</span>)}
  </div>;
}
