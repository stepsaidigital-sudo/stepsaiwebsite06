'use client';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import copy from '@/app/copy.json';
import { resolveLabel } from './routes';
import { MegaMenus } from './mega-menu';

export type Open = { onOpen: (label: string) => void };
type Place = { onHome?: boolean };

export function Brand({ onHome = true }: Place) {
  return <a className="brand" href={onHome ? '#top' : '/'} aria-label="Steps AI home"><img className="brand-original" src="/brands/steps-original.png" alt="" /><span>Steps AI</span></a>;
}

export function Action({ children = 'Book a demo', onOpen, className = '' }: Open & { children?: string; className?: string }) {
  return <button className={`button ${className}`} onClick={() => onOpen(children)}>{children}</button>;
}

// A label becomes a link when it has somewhere real to go, otherwise a button
// that opens the preview notice.
function LabelLink({ label, onOpen, onHome, after }: Open & { label: string; onHome: boolean; after?: () => void }) {
  const { href } = resolveLabel(label, onHome);
  if (href) return <a href={href} onClick={after}>{label}</a>;
  return <button onClick={() => { after?.(); onOpen(label); }}>{label}</button>;
}

// The onOpen used by page content: a label with a built page or a homepage
// section navigates there, anything else opens the preview notice.
export function openOrGo(setRoute: (label: string) => void, onHome: boolean) {
  return (label: string) => {
    const { href } = resolveLabel(label, onHome);
    if (href) window.location.assign(href);
    else setRoute(label);
  };
}

export function UnresolvedDialog({ label, close }: { label: string; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); return () => ref.current?.close(); }, []);
  return <dialog ref={ref} className="route-dialog" onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }}><button className="icon-button close" onClick={close} aria-label="Close"><X size={22} /></button><span className="section-kicker">Design preview</span><h2>{label}</h2><p>This preview does not include that destination yet. The production page still needs to be connected.</p><button className="button" onClick={close}>Back to the preview</button></dialog>;
}

export function Header({ onOpen, onHome = true }: Open & Place) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);
  // The floating pill lifts slightly once the page has scrolled.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const close = () => setOpen(false);
  return <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}><div className="container header-inner"><Brand onHome={onHome} /><button ref={toggle} className="menu-toggle icon-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav id="main-nav" aria-label="Main navigation" className={open ? 'nav open' : 'nav'}><MegaMenus onOpen={onOpen} onNavigate={close} /><LabelLink label="Pricing" onOpen={onOpen} onHome={onHome} after={close} /><span className="nav-spacer" /><button onClick={() => { close(); onOpen('Log in'); }}>Log in</button><Action onOpen={onOpen} /></nav></div></header>;
}

export function Footer({ onOpen, onHome = true }: Open & Place) {
  return <footer className="container"><div className="footer-top"><Brand onHome={onHome} /><p>{copy.footer.paragraphs[0]}</p></div><div className="footer-groups">{copy.footer.paragraphs.slice(1, 7).map(group => { const [title, links] = group.split(': '); return <div key={title}><h3>{title}</h3>{links?.split(' | ').map(label => <LabelLink key={label} label={label} onOpen={onOpen} onHome={onHome} />)}</div>; })}</div><div className="footer-bottom"><span>Steps AI</span><div>{['Privacy policy', 'Terms of service'].map(label => <LabelLink key={label} label={label} onOpen={onOpen} onHome={onHome} />)}</div></div></footer>;
}

// Subpage wrapper: shared header and footer, plus the preview notice for
// destinations that are not built yet. Children receive onOpen via render prop.
export function SiteFrame({ children }: { children: (onOpen: (label: string) => void) => React.ReactNode }) {
  const [route, setRoute] = useState('');
  const open = openOrGo(setRoute, false);
  return <><a className="skip-link" href="#main">Skip to content</a><div id="top" /><Header onOpen={setRoute} onHome={false} /><main id="main" className="sp-main">{children(open)}</main><Footer onOpen={setRoute} onHome={false} />{route && <UnresolvedDialog label={route} close={() => setRoute('')} />}</>;
}
