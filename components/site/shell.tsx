'use client';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import copy from '@/app/copy.json';
import nav from '@/content/site/nav.json';
import { resolveLabel } from './routes';
import { MegaMenus } from './mega-menu';
import { useSiteMotion } from './motion';
import './ui-readability.css';

import { asset } from '@/lib/asset';
export type Open = { onOpen: (label: string) => void };
type Place = { onHome?: boolean };

export function Brand({ onHome = true }: Place) {
  return <a className="brand" href={onHome ? '#top' : '/'} aria-label="Steps AI home"><img className="brand-original" src={asset("/brands/steps-original.png")} alt="" /><span>Steps AI</span></a>;
}

export function Action({ children = 'Book a demo', onOpen, className = '' }: Open & { children?: string; className?: string }) {
  return <button className={`button ${className}`} onClick={() => onOpen(children)}>{children}</button>;
}

// Navigation labels resolve to their public destinations.
function LabelLink({ label, onOpen, onHome, after }: Open & { label: string; onHome: boolean; after?: () => void }) {
  const { href } = resolveLabel(label, onHome);
  if (href) return <a href={href} onClick={after}>{label}</a>;
  return <button onClick={() => { after?.(); onOpen(label); }}>{label}</button>;
}

// Shared action navigation. Unmapped enquiries lead to the contact page.
export function openOrGo(onHome: boolean) {
  return (label: string) => {
    const { href } = resolveLabel(label, onHome);
    window.location.assign(href ?? '/contact/');
  };
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
  return <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}><div className="container header-inner"><Brand onHome={onHome} /><button ref={toggle} className="menu-toggle icon-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav id="main-nav" aria-label="Main navigation" className={open ? 'nav open' : 'nav'}><MegaMenus onOpen={onOpen} onNavigate={close} only={['Product', 'Solutions']} /><LabelLink label="Pricing" onOpen={onOpen} onHome={onHome} after={close} /><LabelLink label="Integrations" onOpen={onOpen} onHome={onHome} after={close} /><MegaMenus onOpen={onOpen} onNavigate={close} only={['Resources']} /><span className="nav-spacer" /><LabelLink label="Log in" onOpen={onOpen} onHome={onHome} after={close} /><Action onOpen={onOpen} /></nav></div></header>;
}

export function Footer({ onOpen, onHome = true }: Open & Place) {
  return <footer className="container"><div className="footer-top"><Brand onHome={onHome} /><p>{copy.footer.paragraphs[0]}</p></div><div className="footer-groups">{copy.footer.paragraphs.slice(1).map(group => { const [title, links] = group.split(': '); return <div key={title}><h3>{title}</h3>{links?.split(' | ').flatMap(label => label === 'Use cases' ? nav.menus.find(menu => menu.label === 'Solutions')?.columns.find(column => column.title === 'By job')?.items.map(item => item.label) ?? [] : [label]).map(label => <LabelLink key={label} label={label} onOpen={onOpen} onHome={onHome} />)}</div>; })}</div><div className="footer-bottom"><span>Steps AI</span></div></footer>;
}

// Subpage wrapper with shared navigation. Children receive onOpen via render prop.
export function SiteFrame({ children }: { children: (onOpen: (label: string) => void) => React.ReactNode }) {
  const open = openOrGo(false);
  useSiteMotion();
  return <><div className="m-progress" aria-hidden="true" /><a className="skip-link" href="#main">Skip to content</a><div id="top" /><Header onOpen={open} onHome={false} /><main id="main" className="sp-main">{children(open)}</main><Footer onOpen={open} onHome={false} /></>;
}
