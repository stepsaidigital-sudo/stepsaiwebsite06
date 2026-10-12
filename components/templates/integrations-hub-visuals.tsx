'use client';
import { useEffect, useState } from 'react';
import { Check, Globe } from 'lucide-react';
import { AppLogo } from './integration';

export type HubApp = { slug: string; name: string; channel: string; question?: string; answer?: string };

// Diagram geometry, in viewBox units. Nodes are placed with the same numbers
// as percentages so the HTML tiles sit exactly on the SVG line ends.
const W = 1000, H = 380, CORE = { x: 500, y: 118 };
const CHANNELS = [
  { name: 'WhatsApp', y: 100, icon: <img src="/brands/whatsapp.png" alt="" width={22} height={22} /> },
  { name: 'Instagram', y: 180, icon: <img src="/brands/instagram-icon.png" alt="" width={22} height={22} /> },
  { name: 'Website', y: 260, icon: <Globe size={19} /> },
];
const APP_Y = [50, 120, 190, 260, 330];
const left = (y: number) => `M150 ${y} C 300 ${y}, 330 ${CORE.y}, 452 ${CORE.y}`;
const right = (y: number) => `M548 ${CORE.y} C 670 ${CORE.y}, 700 ${y}, 850 ${y}`;
const pos = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

// Customer channels flow into Steps AI, which reaches into the connected apps.
// Every few seconds one app lights up and the card shows the reply it made
// possible. Sample conversations from each app's page, illustrative only.
export function HubDiagram({ apps }: { apps: HubApp[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setActive(a => (a + 1) % apps.length), 3600);
    return () => clearInterval(t);
  }, [paused, apps.length]);
  const app = apps[active];
  const channel = CHANNELS.findIndex(c => c.name === app.channel);

  return <div className="igh-stage" onMouseLeave={() => setPaused(false)}>
    <svg className="igh-wires" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      {CHANNELS.map((c, i) => <path key={c.name} d={left(c.y)} className={i === channel ? 'is-on' : ''} />)}
      {APP_Y.map((y, i) => <path key={y} d={right(y)} className={i === active ? 'is-on' : ''} />)}
      <circle key={`l${active}`} r="5" className="igh-pulse" opacity="0"><set attributeName="opacity" to="1" begin="0s" /><animateMotion dur="0.9s" fill="freeze" path={left(CHANNELS[Math.max(channel, 0)].y)} /></circle>
      <circle key={`r${active}`} r="5" className="igh-pulse" opacity="0"><set attributeName="opacity" to="1" begin="0.9s" /><animateMotion dur="0.9s" begin="0.9s" fill="freeze" path={right(APP_Y[active])} /></circle>
    </svg>

    {CHANNELS.map((c, i) => <span key={c.name} className={`igh-channel ${i === channel ? 'is-on' : ''}`} style={pos(90, c.y)}>{c.icon}{c.name}</span>)}

    <span className="igh-core" style={pos(CORE.x, CORE.y)}><img src="/brands/steps-original.png" alt="" width={50} height={50} /></span>

    {apps.map((a, i) => <a key={a.slug} href={`/integrations/${a.slug}/`} className={`igh-app ${i === active ? 'is-on' : ''}`} style={pos(910, APP_Y[i])}
      onMouseEnter={() => { setPaused(true); setActive(i); }} onFocus={() => { setPaused(true); setActive(i); }} aria-label={a.name}>
      <AppLogo slug={a.slug} size={28} /><span>{a.name}</span>
    </a>)}

    <div className="igh-card" key={app.slug} aria-live="polite">
      <div className="igh-card-head"><span>{CHANNELS[Math.max(channel, 0)].icon}</span><strong>{app.channel}</strong><small>Just now</small></div>
      <p className="igh-msg igh-in">{app.question}</p>
      <p className="igh-msg igh-out">{app.answer}</p>
      <span className="igh-used"><AppLogo slug={app.slug} size={16} />Checked in {app.name}<Check size={13} /></span>
    </div>
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
