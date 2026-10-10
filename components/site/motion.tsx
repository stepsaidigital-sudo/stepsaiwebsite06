'use client';
import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Shared scroll motion for subpages. One observer reveals blocks as they
// scroll in; siblings get a stagger so grids cascade instead of popping in
// together. Blocks already on screen are shown straight away, and under
// reduced motion nothing is hidden at all.

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let observer: IntersectionObserver | null = null;

function shared() {
  observer ??= new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('sp-in'); observer!.unobserve(entry.target); }
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  return observer;
}

export function reveal(el: HTMLElement) {
  if (el.classList.contains('sp-in')) return () => {};
  // Already waiting (an effect that ran twice): watch it again.
  if (el.classList.contains('sp-reveal')) { shared().observe(el); return () => shared().unobserve(el); }
  const box = el.getBoundingClientRect();
  if (reducedMotion() || (box.top < innerHeight && box.bottom > 0)) { el.classList.add('sp-in'); return () => {}; }
  // Stagger by position among siblings of the same kind, capped so long
  // lists do not keep the last card waiting.
  const parent = el.parentElement;
  const peers = parent ? [...parent.children].filter(c => c.classList[0] === el.classList[0]) : [el];
  el.style.setProperty('--d', `${Math.min(peers.indexOf(el), 6) * 80}ms`);
  el.classList.add('sp-reveal');
  shared().observe(el);
  return () => shared().unobserve(el);
}

// Blocks that templates render without a <Reveal> wrapper.
const AUTO = '.sp-intro, .ig-card, .sp-card, .sp-feature, .faq-list > details, .sp-faq > div:first-child, .vs-row, .sp-logos li, .ig-filters, .cs-tabs, .ig-crumbs, .ig-group > h3, .m-rail-wrap';
// Cards that get the cursor-following light.
const SPOT = '.ig-card, .ig-use, .sp-card, .cs-story, .ig-job, .vs-fit-col, .sp-feature, .sp-plan';

export function useSiteMotion({ auto = AUTO, spots = SPOT }: { auto?: string; spots?: string } = {}) {
  useEffect(() => {
    const root = document.getElementById('main');
    if (!root) return;
    const stops: (() => void)[] = [];
    const scan = () => {
      root.querySelectorAll<HTMLElement>(auto).forEach(el => stops.push(reveal(el)));
      root.querySelectorAll<HTMLElement>(spots).forEach(el => {
        if (el.classList.contains('m-spot')) return;
        // Leave cards that already draw their own ::after alone.
        if (getComputedStyle(el, '::after').content !== 'none') return;
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
        el.classList.add('m-spot');
      });
    };
    scan();
    // Filters swap cards in and out, so newly rendered cards are picked up too.
    const mo = new MutationObserver(scan);
    mo.observe(root, { childList: true, subtree: true });

    // Cursor light: one listener for every card.
    const spot = (e: PointerEvent) => {
      const card = (e.target as Element).closest?.<HTMLElement>('.m-spot');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', spot, { passive: true });

    // Progress bar and hero drift, both driven from one scroll frame.
    const bar = document.querySelector<HTMLElement>('.m-progress');
    const hero = document.querySelector<HTMLElement>('.sp-hero');
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        bar?.style.setProperty('--p', String(max > 0 ? scrollY / max : 0));
        if (hero && !reducedMotion() && scrollY < innerHeight * 1.2) hero.style.setProperty('--sy', String(scrollY));
      });
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });

    // The closing call-to-action button leans a little towards the pointer.
    const magnets = [...document.querySelectorAll<HTMLElement>('.final-section .button')];
    const pull = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || reducedMotion()) return;
      for (const b of magnets) {
        const r = b.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        const near = Math.hypot(dx, dy) < 140;
        b.style.translate = near ? `${dx * 0.18}px ${dy * 0.25}px` : '';
      }
    };
    document.addEventListener('pointermove', pull, { passive: true });

    return () => {
      stops.forEach(stop => stop()); mo.disconnect();
      document.removeEventListener('pointermove', spot); document.removeEventListener('pointermove', pull);
      removeEventListener('scroll', onScroll); cancelAnimationFrame(frame);
    };
  }, [auto, spots]);
}

// A horizontal rail you can drag with the mouse (with momentum), swipe on
// touch, scroll with arrows or move through with the keyboard.
export function DragRail({ children, label }: { children: ReactNode; label: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0), [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = rail.current!;
    let down = false, moved = 0, lastX = 0, lastT = 0, velocity = 0, glide = 0;
    const sync = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 1);
      setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
    };
    const start = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      cancelAnimationFrame(glide);
      down = true; moved = 0; lastX = e.clientX; lastT = performance.now(); velocity = 0;
      el.classList.add('is-dragging');
    };
    const move = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - lastX, now = performance.now();
      el.scrollLeft -= dx; moved += Math.abs(dx);
      velocity = dx / Math.max(1, now - lastT); lastX = e.clientX; lastT = now;
    };
    const end = () => {
      if (!down) return;
      down = false; el.classList.remove('is-dragging');
      if (reducedMotion()) return;
      let v = velocity * 16;
      const step = () => { el.scrollLeft -= v; v *= 0.94; if (Math.abs(v) > 0.4) glide = requestAnimationFrame(step); };
      glide = requestAnimationFrame(step);
    };
    // A drag should not also open the card under the pointer.
    const click = (e: MouseEvent) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; } };
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    el.addEventListener('pointerdown', start);
    addEventListener('pointermove', move);
    addEventListener('pointerup', end);
    el.addEventListener('click', click, true);
    const ro = new ResizeObserver(sync); ro.observe(el);
    return () => {
      el.removeEventListener('scroll', sync); el.removeEventListener('pointerdown', start);
      removeEventListener('pointermove', move); removeEventListener('pointerup', end);
      el.removeEventListener('click', click, true); ro.disconnect(); cancelAnimationFrame(glide);
    };
  }, []);

  const nudge = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: reducedMotion() ? 'auto' : 'smooth' });
  return <div className="m-rail-wrap">
    <div ref={rail} className="m-rail" role="region" aria-label={label} tabIndex={0}>{children}</div>
    <div className="m-rail-bar">
      <span className="m-rail-hint">Drag or swipe to explore</span>
      <span className="m-rail-track" aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} /></span>
      <button aria-label="Previous" onClick={() => nudge(-1)} disabled={edges.start}><ArrowLeft size={18} /></button>
      <button aria-label="Next" onClick={() => nudge(1)} disabled={edges.end}><ArrowRight size={18} /></button>
    </div>
  </div>;
}

// Splits a heading into words that rise out of a mask. The full text stays
// available to screen readers through aria-label.
export function SplitWords({ text }: { text: string }) {
  return <>{text.split(' ').map((word, i) => <Fragment key={i}>{i > 0 && ' '}<span className="m-w" aria-hidden="true"><span style={{ ['--wi' as string]: i }}>{word}</span></span></Fragment>)}</>;
}
