'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, Check, CheckCheck, Pause, Play, RotateCcw } from 'lucide-react';
import { channelKind } from '@/app/channel-chat';
import type { Item } from '@/content/types';

// "How it works" in the homepage channel-theatre style: the panel pins while
// the page scrolls through the steps, and each step plays a short animated
// scene. Reuses the homepage hero-channels classes so both read as one system.

export type Scene = { tab: string; icon: ReactNode; label: string; result: string; render: (time: number) => ReactNode };

const END = 6500;

// Scenes live in code and copy lives in JSON, so they can drift apart when the
// copy changes. Templates use the theatre only when the counts still match.
export function scenesFor(scenes: Scene[] | undefined, items: unknown[]) {
  if (!scenes) return undefined;
  if (scenes.length === items.length) return scenes;
  if (process.env.NODE_ENV !== 'production') console.warn(`StepTheatre: ${scenes.length} scenes for ${items.length} items, showing a list instead.`);
  return undefined;
}

export function StepTheatre({ items, scenes }: { items: Item[]; scenes: Scene[] }) {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [time, setTime] = useState(0), [paused, setPaused] = useState(false), [visible, setVisible] = useState(false), [reduced, setReduced] = useState(false);
  const [replay, setReplay] = useState(0);
  const runway = useRef<HTMLDivElement>(null), frame = useRef<HTMLDivElement>(null);
  const step = useRef(480);
  const count = items.length;

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)'); const sync = () => setReduced(mq.matches); sync(); mq.addEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 }); observer.observe(frame.current!);
    return () => { observer.disconnect(); mq.removeEventListener('change', sync); };
  }, []);
  useEffect(() => { setTime(reduced ? END : 0); }, [active, replay, reduced]);
  useEffect(() => {
    if (paused || !visible || reduced || time >= END) return;
    const timer = window.setInterval(() => { if (!document.hidden) setTime(value => Math.min(END, value + 100)); }, 100);
    return () => window.clearInterval(timer);
  }, [paused, visible, reduced, time >= END]);

  // Pin only when the whole panel fits the viewport, as on the homepage.
  useEffect(() => {
    const outer = runway.current!, inner = frame.current!;
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const measure = () => {
      step.current = Math.max(420, innerHeight * 0.7);
      const fits = innerWidth >= 760 && inner.offsetHeight + 100 <= innerHeight && !mq.matches;
      setPinned(fits);
      outer.style.height = fits ? `${inner.offsetHeight + step.current * count}px` : 'auto';
    };
    const observer = new ResizeObserver(measure); observer.observe(inner);
    window.addEventListener('resize', measure); mq.addEventListener('change', measure); measure();
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); mq.removeEventListener('change', measure); };
  }, [count]);
  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const travelled = 92 - runway.current!.getBoundingClientRect().top;
        setActive(Math.max(0, Math.min(count - 1, Math.floor((travelled + step.current * 0.08) / step.current))));
      });
    };
    window.addEventListener('scroll', update, { passive: true }); update();
    return () => { window.removeEventListener('scroll', update); cancelAnimationFrame(raf); };
  }, [pinned, count]);

  const select = (i: number) => {
    setActive(i);
    if (pinned) window.scrollTo({ top: scrollY + runway.current!.getBoundingClientRect().top - 92 + i * step.current, behavior: 'instant' });
  };

  return <div className={`channel-runway sp-theatre ${pinned ? 'channel-pinned' : ''}`} ref={runway}>
    <div ref={frame} className={`channel-theatre ${paused ? 'playback-paused' : ''}`}>
      <nav className="channel-icon-tabs" aria-label="Steps">{scenes.map((scene, i) =>
        <button key={scene.tab} aria-pressed={active === i} aria-controls={`step-panel-${i}`} onClick={() => select(i)} onKeyDown={event => {
          if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
          event.preventDefault();
          const next = (i + (event.key === 'ArrowRight' ? 1 : -1) + count) % count;
          select(next);
          (event.currentTarget.parentElement?.querySelectorAll('button')[next] as HTMLButtonElement | undefined)?.focus();
        }}>{scene.icon}<span>{scene.tab}</span></button>)}</nav>
      <div className="channel-presentation">{items.map((item, i) => {
        const scene = scenes[i];
        const current = active === i;
        return <article id={`step-panel-${i}`} key={item.title} className={`channel-presentation-panel panel-${i % 4} ${current ? 'is-current' : ''}`} aria-hidden={!current} inert={!current}>
          <div className="channel-explanation"><div className="channel-product-label"><span className="channel-story-number">0{i + 1}</span><span>{scene.label}</span></div><h3>{item.title}</h3><p>{item.body}</p></div>
          <div className="channel-demo-canvas"><span className="scene-illustration">Illustration</span>{scene.render(current ? time : 0)}<div className={`channel-demo-result ${time >= END - 800 && current ? 'result-arrived' : 'result-waiting'}`}><span><Check size={15} /></span>{scene.result}</div></div>
        </article>;
      })}</div>
      <div className="conversation-playback"><span>{time >= END ? 'Step complete' : paused ? 'Animation paused' : 'Each step, played out'}</span><button aria-label={paused ? 'Resume animation' : 'Pause animation'} onClick={() => setPaused(!paused)}>{paused ? <Play size={13} /> : <Pause size={13} />}</button><button aria-label="Replay step" onClick={() => { setReplay(value => value + 1); setPaused(false); }}><RotateCcw size={13} /></button></div>
      <div className="channel-scroll-cue"><span>0{active + 1} <i>/ 0{count}</i></span><span>{pinned ? 'Scroll to follow each step' : 'Choose a step above'} <ArrowDown size={14} /></span><div aria-hidden="true">{items.map((item, i) => <i key={item.title} className={i === active ? 'active' : ''} />)}</div></div>
    </div>
  </div>;
}

// The tilted context card that sits behind each scene on the homepage.
export function ContextCard({ media, small, title, note }: { media: ReactNode; small: string; title: string; note: ReactNode }) {
  return <div className="scene-context" aria-hidden="true">{media}<div><small>{small}</small><strong>{title}</strong><span>{note}</span></div></div>;
}

// A chat whose messages arrive one by one, with typing dots before each.
export function TimedChat({ channel, lines, time }: { channel: string; lines: { from: 'customer' | 'agent'; text: string; at: number }[]; time: number }) {
  const kind = channelKind(channel);
  return <div className="channel-demo-conversation"><div className={`channel-chat channel-${kind} live-chat`} aria-label={`${channel} conversation illustration`}><div className="native-chat-body">{lines.map((line, i) => {
    const shown = time >= line.at;
    const typing = !shown && time >= line.at - (line.from === 'agent' ? 1400 : 500);
    return <div className={`live-message-slot sp-slot-${line.from}`} key={i}><div className={`native-message ${line.from === 'agent' ? 'outgoing' : 'incoming'} ${shown ? 'message-arrived' : 'message-waiting'}`} aria-hidden={!shown}>{line.text}<small>10:2{i} {kind === 'whatsapp' && <CheckCheck size={12} />}</small></div>{typing && <div className={`chat-typing ${line.from === 'agent' ? 'agent-typing' : 'customer-typing'}`}><i /><i /><i /></div>}</div>;
  })}</div></div></div>;
}

// A product window in the same frame as the chats, with rows that tick in.
export function SceneWindow({ icon, title, sub, children }: { icon: ReactNode; title: string; sub: string; children: ReactNode }) {
  return <div className="channel-demo-conversation"><div className="channel-chat sp-scene-window"><div className="native-chat-header">{icon}<div><strong>{title}</strong><small>{sub}</small></div></div><div className="sp-scene-body">{children}</div></div></div>;
}

export function SceneRow({ show, icon, label, value, picked = false }: { show: boolean; icon: ReactNode; label: string; value?: ReactNode; picked?: boolean }) {
  return <div className={`sp-scene-row ${show ? 'message-arrived' : 'message-waiting'} ${picked ? 'is-picked' : ''}`}>{icon}<span>{label}</span>{value !== undefined && <strong>{value}</strong>}</div>;
}
