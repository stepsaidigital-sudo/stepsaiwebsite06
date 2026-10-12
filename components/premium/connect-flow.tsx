'use client';
import { useEffect, useRef, useState } from 'react';
import { Bot, Check, KeyRound, LayoutGrid, Lock, LogIn, MessageSquare, MousePointerClick, Pause, Play, Search, ShieldCheck, ToggleRight, Zap } from 'lucide-react';

// "How to connect" walkthrough: the real steps in the Steps AI dashboard
// (Resources → Apps → sign in → switch on for agents → live), played as a short animated demo.
// With several apps it connects each one in turn. Screens are illustrations with sample data.

export type ConnectApp = { slug: string; name: string; category: string; question?: string; answer?: string };

const LIBRARY = ['shopify', 'woocommerce', 'google-calendar', 'calendly', 'hubspot', 'zendesk', 'google-drive', 'notion', 'shiprocket', 'delhivery', 'slack', 'airtable'];
const STEP_MS = 3000, LIVE_MS = 4600;

function signIn(app: ConnectApp): { label: string; icon: 'google' | 'microsoft' | 'key' | 'app'; field?: string } {
  if (/^google/.test(app.slug)) return { label: 'Sign in with Google', icon: 'google' };
  if (/^outlook/.test(app.slug)) return { label: 'Sign in with Microsoft', icon: 'microsoft' };
  if (app.category === 'Shipping') return { label: 'Connect with your API key', icon: 'key', field: 'API key' };
  if (app.slug === 'shopify') return { label: 'Install the Steps AI app', icon: 'app', field: 'yourstore.myshopify.com' };
  if (app.slug === 'woocommerce') return { label: 'Connect your store', icon: 'key', field: 'https://yourstore.com' };
  return { label: `Sign in to ${app.name}`, icon: 'app' };
}

const logo = (slug: string, size = 22) => <img src={`/brands/integrations/${slug}.svg`} alt="" width={size} height={size} />;
const STEPS = [
  { icon: <LayoutGrid size={18} />, title: 'Open Apps', cap: () => 'Resources, then Apps, in your dashboard' },
  { icon: <MousePointerClick size={18} />, title: 'Pick the app', cap: (a: ConnectApp) => `Search and select ${a.name}` },
  { icon: <LogIn size={18} />, title: 'Sign in', cap: () => 'Allow access once' },
  { icon: <ToggleRight size={18} />, title: 'Switch on', cap: () => 'Turn it on for each agent' },
  { icon: <Zap size={18} />, title: 'Live', cap: () => 'Answers now use live data' },
];

export function ConnectFlow({ app, apps, title, intro }: { app?: ConnectApp; apps?: ConnectApp[]; title?: string; intro?: string }) {
  const list = apps ?? (app ? [app] : []);
  const root = useRef<HTMLElement>(null);
  const [ai, setAi] = useState(0), [step, setStep] = useState(0), [paused, setPaused] = useState(false), [seen, setSeen] = useState(false);
  const a = list[ai], auth = signIn(a);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: .3 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!seen || paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const last = step === STEPS.length - 1;
    const t = window.setTimeout(() => {
      if (!last) setStep(step + 1);
      else { setStep(0); setAi(i => (i + 1) % list.length); }
    }, last ? LIVE_MS : STEP_MS);
    return () => window.clearTimeout(t);
  }, [step, paused, seen, list.length]);
  const pickApp = (i: number) => { setAi(i); setStep(0); };
  const tiles = [a.slug, ...LIBRARY.filter(s => s !== a.slug)].slice(0, 9);

  return <section ref={root} id="connect" className="cf-wrap"><div className="container">
    <div className="cf-head"><span className="cf-eyebrow"><Zap size={14} />How to connect</span><h2>{title ?? `Connect ${a.name} in a few minutes.`}</h2><p>{intro ?? 'Five steps. No code.'}</p></div>

    {list.length > 1 && <div className="cf-apps" role="tablist" aria-label="Choose an app to watch it connect">{list.map((x, i) =>
      <button key={x.slug} role="tab" aria-selected={i === ai} className={i === ai ? 'is-on' : ''} onClick={() => pickApp(i)} title={x.name}>{logo(x.slug, 26)}<span>{x.name}</span></button>)}</div>}

    <ol className="cf-rail" aria-label={`Steps to connect ${a.name}`}>{STEPS.map((s, i) => <li key={s.title} className={`${i === step ? 'is-active' : ''} ${i < step ? 'is-done' : ''}`}>
      <button onClick={() => { setStep(i); setPaused(true); }} aria-current={i === step ? 'step' : undefined}>
        <span className="cf-node">{i < step ? <Check size={18} /> : s.icon}</span>
        <strong>{s.title}</strong><small>{s.cap(a)}</small>
      </button>
      {i < STEPS.length - 1 && <i className="cf-link"><b style={{ transitionDuration: i === step - 1 ? '600ms' : '0ms' }} /></i>}
    </li>)}</ol>

    <div className="cf-stage">
      <div className="cf-screen" aria-hidden="true">
        <div className="cf-bar-top"><i /><i /><i /><span><Lock size={11} />app.stepsai.co/resources/apps{step >= 1 ? `/${a.slug}` : ''}</span>
          <button className="cf-play" onClick={() => setPaused(p => !p)} aria-label={paused ? 'Play' : 'Pause'} tabIndex={-1}>{paused ? <Play size={12} /> : <Pause size={12} />}</button></div>
        <div className="cf-body">
          <nav className="cf-side"><img src="/brands/steps-original.png" alt="" /><span>Home</span><span>Agents</span><span className="is-on">Resources</span><span>Workflows</span><span>Inbox</span><span>CRM</span></nav>
          <div className="cf-main" key={`${ai}-${step}`}>
            {step <= 1 && <>
              <div className="cf-title"><strong>Apps</strong><small>Connect the tools your agents use</small></div>
              <div className="cf-search"><Search size={14} />{step === 1 ? <b className="cf-typed">{a.name}</b> : <span>Search apps</span>}</div>
              <div className="cf-grid">{tiles.map((s, i) => <span key={s} className={`cf-tile ${s === a.slug && step === 1 ? 'is-picked' : ''} ${step === 1 && s !== a.slug ? 'is-dim' : ''}`} style={{ animationDelay: `${i * 45}ms` }}>{logo(s, 26)}</span>)}</div>
              {step === 1 && <span className="cf-cursor" />}
            </>}
            {step === 2 && <div className="cf-modal">
              <div className="cf-modal-logos"><img src="/brands/steps-original.png" alt="" /><span className="cf-dots"><i /><i /><i /></span>{logo(a.slug, 34)}</div>
              <strong>Connect {a.name}</strong>
              {auth.field && <span className="cf-field">{auth.icon === 'key' && <KeyRound size={13} />}<b className="cf-typed">{auth.field === 'API key' ? '••••••••••••3f9a' : auth.field}</b></span>}
              <span className={`cf-auth cf-auth-${auth.icon}`}>{auth.icon === 'google' && <i className="cf-g">G</i>}{auth.icon === 'microsoft' && <i className="cf-ms"><b /><b /><b /><b /></i>}{auth.label}</span>
              <span className="cf-secure"><ShieldCheck size={12} />Stored securely. Disconnect any time.</span>
            </div>}
            {step === 3 && <>
              <div className="cf-title"><span className="cf-app-head">{logo(a.slug, 30)}<span><strong>{a.name}</strong><small className="cf-ok"><Check size={11} />Connected</small></span></span></div>
              <div className="cf-agents">
                {['Sales assistant', 'Support desk', 'Lead capture'].map((x, i) => <span key={x} className="cf-agent"><Bot size={14} />{x}<i className={`cf-toggle ${i < 2 ? 'is-on' : ''}`} style={{ animationDelay: `${400 + i * 450}ms` }} /></span>)}
              </div>
            </>}
            {step === 4 && <div className="cf-test">
              <div className="cf-chat">
                <p className="cf-q">{a.question ?? `Can you check this in ${a.name}?`}</p>
                <span className="cf-lookup">{logo(a.slug, 14)}Checking {a.name}</span>
                <p className="cf-a"><MessageSquare size={13} />{a.answer ?? `Done. Here is what I found in ${a.name}.`}</p>
              </div>
              <span className="cf-live"><Check size={14} />{a.name} is live for your agents</span>
            </div>}
          </div>
        </div>
      </div>
      <div className="cf-orbit" aria-hidden="true">{LIBRARY.filter(s => s !== a.slug).slice(0, 6).map((s, i) => <span key={s} className={`cf-orb cf-orb-${i}`}>{logo(s, 24)}</span>)}</div>
    </div>
  </div></section>;
}
