'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { facePhoto } from '@/components/site/faces';
import {
  BadgeCheck,
  Bookmark,
  Camera,
  CheckCheck,
  ChevronLeft,
  Ellipsis,
  Grid3x3,
  Heart,
  Image as ImageIcon,
  Info,
  Lock,
  MessageCircle,
  Mic,
  MicOff,
  Paperclip,
  Phone,
  PhoneOff,
  Plus,
  Reply,
  Send,
  ShoppingBag,
  ShoppingCart,
  Smile,
  Sparkles,
  Sticker,
  ThumbsUp,
  Video,
  Volume2,
  X,
} from 'lucide-react';

export type ChatMsg =
  | { from: 'customer' | 'business'; text: string; time?: string }
  | { from: 'business'; kind: 'template'; image?: string; title?: string; text: string; footer?: string; buttons?: string[]; time?: string }
  | { from: 'business'; kind: 'product'; image: string; name: string; price: string; cta?: string; time?: string }
  | { from: 'business'; kind: 'cart'; items: { name: string; qty: number; price: string }[]; total: string; cta: string; time?: string }
  | { from: 'business'; kind: 'order'; order: string; status: string; steps: string[]; current: number; time?: string }
  | { from: 'customer' | 'business'; kind: 'buttons'; text: string; buttons: string[]; time?: string }
  | { kind: 'system'; text: string }
  | { from: 'agent-note'; text: string };

type Theme = 'wa' | 'ig' | 'ms' | 'web';
type Side = 'in' | 'out' | 'center';

const AVATAR_TINTS = ['#7c5cff', '#0ea5e9', '#f97316', '#10b981', '#e11d48', '#a16207', '#2563eb'];

function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

function initials(name: string) {
  return name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function tint(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_TINTS[h % AVATAR_TINTS.length];
}

function sideOf(m: ChatMsg): Side {
  if (!('from' in m) || m.from === 'agent-note') return 'center';
  return m.from === 'customer' ? 'out' : 'in';
}

function msgText(m: ChatMsg) {
  if ('text' in m) return m.text;
  if (m.kind === 'product') return `${m.name}, ${m.price}`;
  if (m.kind === 'cart') return `Cart total ${m.total}`;
  return `Order ${m.order}: ${m.status}`;
}

/** Short plain-language summary of a conversation for aria-labels. */
function describe(messages: ChatMsg[]) {
  return messages
    .filter((m) => sideOf(m) !== 'center')
    .slice(0, 4)
    .map((m) => `${sideOf(m) === 'out' ? 'Customer' : 'Business'}: ${msgText(m).slice(0, 90)}`)
    .join('. ');
}

/** Staggered reveal timings: business messages get a typing indicator first. */
function schedule(messages: ChatMsg[]) {
  let t = 0.3;
  return messages.map((m) => {
    const side = sideOf(m);
    if (side === 'in') {
      const typing = t;
      const show = t + 0.9;
      t = show + 0.6;
      return { show, typing };
    }
    const show = t + (side === 'out' ? 0.3 : 0.1);
    t = show + (side === 'out' ? 0.8 : 0.5);
    return { show, typing: show };
  });
}

/** Adds `mk-play` once the mockup scrolls into view, which starts its CSS animations. */
function usePlayOnView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('mk-play');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add('mk-play');
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function withKeyword(text: string) {
  return text.split(/(\b[A-Z]{3,}\b)/).map((part, i) =>
    i % 2 ? (
      <mark key={i} className="mk-kw">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function Avatar({ src, name, className, ring }: { src?: string; name: string; className?: string; ring?: boolean }) {
  const photo = src ?? facePhoto(name);
  const face = (
    <span className={cx('mk-avatar', className)} style={photo ? undefined : { background: tint(name) }} aria-hidden="true">
      {photo ? <img src={photo} alt="" /> : initials(name)}
    </span>
  );
  return ring ? <span className="mk-ring">{face}</span> : face;
}

function StatusBar({ dark }: { dark?: boolean }) {
  return (
    <div className={cx('mk-status', dark && 'is-dark')} aria-hidden="true">
      <span className="mk-status-time">9:41</span>
      <span className="mk-status-icons">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <path d="M7.5 2.2c2.2 0 4.2.8 5.7 2.2l1.1-1.1A9.6 9.6 0 0 0 7.5.6 9.6 9.6 0 0 0 .7 3.3l1.1 1.1a8 8 0 0 1 5.7-2.2Zm0 3.2c1.3 0 2.5.5 3.4 1.3l1.1-1.1a6.4 6.4 0 0 0-9 0l1.1 1.1c.9-.8 2.1-1.3 3.4-1.3Zm0 3.2c-.5 0-1 .2-1.3.5l1.3 1.4 1.3-1.4c-.3-.3-.8-.5-1.3-.5Z" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
          <rect x=".5" y=".5" width="21" height="11" rx="3" fill="none" stroke="currentColor" strokeOpacity=".4" />
          <rect x="2" y="2" width="16" height="8" rx="1.6" />
          <path d="M23 4v4c.8-.3 1.3-1.1 1.3-2S23.8 4.3 23 4Z" opacity=".5" />
        </svg>
      </span>
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx('mk-phone', className)}>
      <div className="mk-screen">
        <span className="mk-island" aria-hidden="true" />
        {children}
        <span className="mk-home" aria-hidden="true" />
      </div>
    </div>
  );
}

function Meta({ time, out }: { time: string; out: boolean }) {
  return (
    <span className="mk-meta">
      {time}
      {out && <CheckCheck className="mk-ticks" size={16} aria-hidden="true" />}
    </span>
  );
}

function Message({ m, theme, index }: { m: ChatMsg; theme: Theme; index: number }) {
  if (!('from' in m)) return <span className="mk-system">{m.text}</span>;
  if (m.from === 'agent-note')
    return (
      <span className="mk-note">
        <Sparkles size={13} aria-hidden="true" />
        {m.text}
      </span>
    );

  const out = m.from === 'customer';
  const time = m.time ?? `10:${String(12 + index).padStart(2, '0')}`;
  const meta = theme === 'wa' ? <Meta time={time} out={out} /> : null;

  if (!('kind' in m))
    return (
      <div className="mk-bubble">
        <span className="mk-text">{m.text}</span>
        {meta}
      </div>
    );

  switch (m.kind) {
    case 'template':
      return (
        <div className="mk-bubble mk-card">
          {m.image && <img className="mk-card-img" src={m.image} alt="" />}
          <div className="mk-card-body">
            {m.title && <span className="mk-card-title">{m.title}</span>}
            <span className="mk-text">{m.text}</span>
            {m.footer && <span className="mk-card-foot">{m.footer}</span>}
            {meta}
          </div>
          {m.buttons && m.buttons.length > 0 && (
            <div className="mk-card-btns">
              {m.buttons.map((b) => (
                <span key={b} className="mk-card-btn">
                  <Reply size={15} aria-hidden="true" />
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    case 'product':
      return (
        <div className="mk-bubble mk-card">
          <img className="mk-card-img mk-product-img" src={m.image} alt="" />
          <div className="mk-card-body">
            <span className="mk-card-title">{m.name}</span>
            <span className="mk-price">{m.price}</span>
            {meta}
          </div>
          <div className="mk-card-btns">
            <span className="mk-card-btn">{m.cta ?? 'View'}</span>
          </div>
        </div>
      );
    case 'cart':
      return (
        <div className="mk-bubble mk-card">
          <div className="mk-card-body">
            <span className="mk-cart-head">
              <ShoppingCart size={16} aria-hidden="true" />
              {m.items.reduce((n, it) => n + it.qty, 0)} items in your cart
            </span>
            <ul className="mk-cart-list">
              {m.items.map((it) => (
                <li key={it.name}>
                  <span>
                    {it.qty} x {it.name}
                  </span>
                  <span>{it.price}</span>
                </li>
              ))}
            </ul>
            <span className="mk-cart-total">
              <span>Total</span>
              <strong>{m.total}</strong>
            </span>
            {meta}
          </div>
          <div className="mk-card-btns">
            <span className="mk-card-btn">{m.cta}</span>
          </div>
        </div>
      );
    case 'order':
      return (
        <div className="mk-bubble mk-card mk-order">
          <div className="mk-card-body">
            <span className="mk-order-id">Order {m.order}</span>
            <span className="mk-card-title">{m.status}</span>
            <ol className="mk-track" style={{ '--mk-n': m.steps.length } as CSSProperties}>
              {m.steps.map((s, j) => (
                <li key={s} className={cx(j <= m.current && 'is-done', j === m.current && 'is-current')}>
                  <span className="mk-track-dot" />
                  <span className="mk-track-label">{s}</span>
                </li>
              ))}
            </ol>
            {meta}
          </div>
        </div>
      );
    case 'buttons':
      return (
        <div className={cx('mk-buttons', theme === 'wa' && 'mk-bubble mk-card')}>
          {theme === 'wa' ? (
            <div className="mk-card-body">
              <span className="mk-text">{m.text}</span>
              {meta}
            </div>
          ) : (
            <div className="mk-bubble">
              <span className="mk-text">{m.text}</span>
            </div>
          )}
          <div className={theme === 'wa' ? 'mk-card-btns' : 'mk-chips'}>
            {m.buttons.map((b) => (
              <span key={b} className={theme === 'wa' ? 'mk-card-btn' : 'mk-chip'}>
                {theme === 'wa' && <Reply size={15} aria-hidden="true" />}
                {b}
              </span>
            ))}
          </div>
        </div>
      );
  }
}

function ChatLog({
  messages,
  theme,
  animate,
  name,
  avatar,
}: {
  messages: ChatMsg[];
  theme: Theme;
  animate?: boolean;
  name: string;
  avatar?: string;
}) {
  const plan = schedule(messages);
  const sides = messages.map(sideOf);
  const lastOut = sides.lastIndexOf('out');
  const withAvatars = theme === 'ig' || theme === 'ms';

  return (
    <div className={cx('mk-chat', `mk-chat-${theme}`)}>
      {messages.map((m, i) => {
        const side = sides[i];
        const first = sides[i - 1] !== side;
        const lastOfGroup = sides[i + 1] !== side;
        const style = animate
          ? ({ '--mk-d': `${plan[i].show}s`, '--mk-t': `${plan[i].typing}s` } as CSSProperties)
          : undefined;
        return (
          <div key={i} className={cx('mk-row', `is-${side}`, first && 'is-first', animate && 'mk-anim')} style={style}>
            {animate && side === 'in' && (
              <span className="mk-typing" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            )}
            <div className="mk-item">
              {withAvatars && side === 'in' && (
                <span className="mk-row-av">{lastOfGroup && <Avatar src={avatar} name={name} />}</span>
              )}
              <div className="mk-stack">
                <Message m={m} theme={theme} index={i} />
                {theme === 'ig' && i === lastOut && i === messages.length - 1 && <span className="mk-seen">Seen</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const SR_NOTE = <span className="mk-sr">Illustration with sample data</span>;

export function WhatsAppPhone({
  business,
  verified,
  avatar,
  messages,
  animate,
  label,
}: {
  business: string;
  verified?: boolean;
  avatar?: string;
  messages: ChatMsg[];
  animate?: boolean;
  label?: string;
}) {
  const ref = usePlayOnView<HTMLDivElement>();
  return (
    <figure className="mk-figure">
      <div
        ref={ref}
        className="mk-root"
        role="img"
        aria-label={`WhatsApp chat with ${business}${verified ? ', a verified business' : ''}. ${describe(messages)}. Illustration with sample data.`}
      >
        {SR_NOTE}
        <PhoneFrame className="mk-wa">
          <StatusBar />
          <header className="mk-head mk-wa-head" aria-hidden="true">
            <ChevronLeft className="mk-back" size={26} />
            <Avatar src={avatar} name={business} className="mk-head-av" />
            <span className="mk-head-text">
              <span className="mk-head-name">
                <span className="mk-ellipsis">{business}</span>
                {verified && <BadgeCheck className="mk-verified" size={16} fill="#25D366" color="#fff" />}
              </span>
              <span className="mk-head-sub">Business account</span>
            </span>
            <Video size={22} />
            <Phone size={19} />
          </header>
          <ChatLog messages={messages} theme="wa" animate={animate} name={business} avatar={avatar} />
          <div className="mk-wa-input" aria-hidden="true">
            <span className="mk-wa-field">
              <Smile size={20} />
              <span className="mk-placeholder">Message</span>
              <Paperclip size={18} />
              <Camera size={19} />
            </span>
            <span className="mk-wa-mic">
              <Mic size={19} />
            </span>
          </div>
        </PhoneFrame>
      </div>
      {label && <figcaption className="mk-label">{label}</figcaption>}
    </figure>
  );
}

export function InstagramDM({
  account,
  avatar,
  messages,
  animate,
}: {
  account: string;
  avatar?: string;
  messages: ChatMsg[];
  animate?: boolean;
}) {
  const ref = usePlayOnView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="mk-root"
      role="img"
      aria-label={`Instagram direct message conversation with ${account}. ${describe(messages)}. Illustration with sample data.`}
    >
      {SR_NOTE}
      <PhoneFrame className="mk-ig">
        <StatusBar />
        <header className="mk-head mk-ig-head" aria-hidden="true">
          <ChevronLeft className="mk-back" size={26} />
          <Avatar src={avatar} name={account} className="mk-head-av" ring />
          <span className="mk-head-text">
            <span className="mk-head-name">
              <span className="mk-ellipsis">{account}</span>
            </span>
            <span className="mk-head-sub">Business chat</span>
          </span>
          <Phone size={20} />
          <Video size={23} />
        </header>
        <ChatLog messages={messages} theme="ig" animate={animate} name={account} avatar={avatar} />
        <div className="mk-ig-input" aria-hidden="true">
          <span className="mk-ig-cam">
            <Camera size={17} />
          </span>
          <span className="mk-placeholder">Message...</span>
          <Mic size={20} />
          <ImageIcon size={20} />
          <Sticker size={20} />
        </div>
      </PhoneFrame>
    </div>
  );
}

export function InstagramComments({
  account,
  postImage,
  caption,
  comments,
  dmSent,
}: {
  account: string;
  postImage: string;
  caption: string;
  comments: { user: string; text: string; reply?: string }[];
  dmSent?: string;
}) {
  const ref = usePlayOnView<HTMLDivElement>();
  const hit = comments.find((c) => c.reply);
  return (
    <div
      ref={ref}
      className="mk-root"
      role="img"
      aria-label={`Instagram post by ${account} with comments.${hit ? ` ${hit.user} commented "${hit.text}" and ${account} replied "${hit.reply}".` : ''}${dmSent ? ` A direct message was sent automatically: "${dmSent}".` : ''} Illustration with sample data.`}
    >
      {SR_NOTE}
      <PhoneFrame className="mk-igc">
        <StatusBar />
        <header className="mk-igc-top" aria-hidden="true">
          <ChevronLeft size={26} />
          <span>Posts</span>
        </header>
        <div className="mk-igc-scroll" aria-hidden="true">
          <div className="mk-igc-author">
            <Avatar name={account} ring />
            <strong className="mk-ellipsis">{account}</strong>
            <Ellipsis size={20} />
          </div>
          <img className="mk-igc-img" src={postImage} alt="" />
          <div className="mk-igc-actions">
            <Heart size={23} />
            <MessageCircle size={22} />
            <Send size={21} />
            <Bookmark size={22} className="mk-igc-save" />
          </div>
          <p className="mk-igc-caption">
            <strong>{account}</strong> {withKeyword(caption)}
          </p>
          <ul className="mk-igc-comments">
            {comments.map((c, i) => (
              <li key={i} className={cx('mk-igc-c', c.reply && 'is-hit')}>
                <Avatar name={c.user} />
                <div className="mk-igc-cbody">
                  <p>
                    <strong>{c.user}</strong> {withKeyword(c.text)}
                  </p>
                  <span className="mk-igc-meta">{2 + i}m · Reply</span>
                  {c.reply && (
                    <div className="mk-igc-reply">
                      <Avatar name={account} />
                      <div>
                        <p>
                          <strong>{account}</strong> {c.reply}
                        </p>
                        <span className="mk-igc-meta">Just now · Author</span>
                      </div>
                    </div>
                  )}
                </div>
                <Heart size={13} className="mk-igc-like" />
              </li>
            ))}
          </ul>
        </div>
        {dmSent && (
          <div className="mk-igc-toast" aria-hidden="true">
            <img src="/brands/instagram-icon.png" alt="" />
            <span className="mk-igc-toast-text">
              <strong>{account}</strong> sent you a message
              <span className="mk-ellipsis">{dmSent}</span>
            </span>
            <span className="mk-igc-toast-time">now</span>
          </div>
        )}
      </PhoneFrame>
    </div>
  );
}

export function MessengerChat({
  page,
  avatar,
  messages,
  animate,
}: {
  page: string;
  avatar?: string;
  messages: ChatMsg[];
  animate?: boolean;
}) {
  const ref = usePlayOnView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="mk-root"
      role="img"
      aria-label={`Facebook Messenger conversation with ${page}. ${describe(messages)}. Illustration with sample data.`}
    >
      {SR_NOTE}
      <PhoneFrame className="mk-ms">
        <StatusBar />
        <header className="mk-head mk-ms-head" aria-hidden="true">
          <ChevronLeft className="mk-back" size={26} />
          <span className="mk-ms-av">
            <Avatar src={avatar} name={page} className="mk-head-av" />
            <span className="mk-online" />
          </span>
          <span className="mk-head-text">
            <span className="mk-head-name">
              <span className="mk-ellipsis">{page}</span>
            </span>
            <span className="mk-head-sub">Typically replies instantly</span>
          </span>
          <Phone size={19} />
          <Video size={22} />
          <Info size={20} />
        </header>
        <ChatLog messages={messages} theme="ms" animate={animate} name={page} avatar={avatar} />
        <div className="mk-ms-input" aria-hidden="true">
          <Plus size={21} />
          <Camera size={20} />
          <ImageIcon size={20} />
          <Mic size={20} />
          <span className="mk-ms-field">
            <span className="mk-placeholder">Aa</span>
            <Smile size={18} />
          </span>
          <ThumbsUp size={21} />
        </div>
      </PhoneFrame>
    </div>
  );
}

function brandName(site: string) {
  const host = site.replace(/^https?:\/\//, '').replace(/^www\./, '');
  const base = host.split(/[./]/)[0] ?? host;
  return base.charAt(0).toUpperCase() + base.slice(1);
}

export function WebsiteWidget({
  site,
  heroImage,
  brandColor = '#0c3474',
  messages,
  quickQuestions,
  animate,
}: {
  site: string;
  heroImage?: string;
  brandColor?: string;
  messages: ChatMsg[];
  quickQuestions?: string[];
  animate?: boolean;
}) {
  const ref = usePlayOnView<HTMLDivElement>();
  const name = brandName(site);
  const chipDelay = schedule(messages).at(-1)?.show ?? 0;
  return (
    <div
      ref={ref}
      className="mk-root mk-web-root"
      role="img"
      aria-label={`Chat widget open on the ${site} website. ${describe(messages)}. Illustration with sample data.`}
    >
      {SR_NOTE}
      <div className="mk-browser" style={{ '--mk-brand': brandColor } as CSSProperties}>
        <div className="mk-browser-bar" aria-hidden="true">
          <span className="mk-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="mk-url">
            <Lock size={12} />
            <span className="mk-ellipsis">{site}</span>
          </span>
        </div>
        <div className="mk-browser-view">
          <div className="mk-store" aria-hidden="true">
            <nav className="mk-store-nav">
              <strong>{name}</strong>
              <span>Shop</span>
              <span>New in</span>
              <span>Sale</span>
              <ShoppingBag size={18} />
            </nav>
            <div className="mk-store-hero">
              {heroImage && <img src={heroImage} alt="" />}
              <div className="mk-store-copy">
                <i />
                <i />
                <b />
              </div>
            </div>
            <div className="mk-store-grid">
              {[0, 1, 2, 3].map((k) => (
                <div key={k} className="mk-store-card">
                  <span />
                  <i />
                  <i />
                </div>
              ))}
            </div>
          </div>
          <div className="mk-widget">
            <div className="mk-widget-head" aria-hidden="true">
              <span className="mk-widget-logo">{name.charAt(0)}</span>
              <span className="mk-head-text">
                <strong className="mk-ellipsis">{name}</strong>
                <span>
                  <i className="mk-live-dot" />
                  AI agent · replies instantly
                </span>
              </span>
              <X size={18} />
            </div>
            <ChatLog messages={messages} theme="web" animate={animate} name={name} />
            {quickQuestions && quickQuestions.length > 0 && (
              <div
                className={cx('mk-chips mk-widget-chips', animate && 'mk-anim-chips')}
                style={animate ? ({ '--mk-d': `${chipDelay + 0.5}s` } as CSSProperties) : undefined}
                aria-hidden="true"
              >
                {quickQuestions.map((q) => (
                  <span key={q} className="mk-chip">
                    {q}
                  </span>
                ))}
              </div>
            )}
            <div className="mk-widget-input" aria-hidden="true">
              <span className="mk-placeholder">Ask me anything</span>
              <span className="mk-widget-send">
                <Send size={15} />
              </span>
            </div>
            <span className="mk-widget-foot" aria-hidden="true">
              Powered by Steps AI
            </span>
          </div>
          <span className="mk-launcher" aria-hidden="true">
            <X size={22} />
          </span>
        </div>
      </div>
    </div>
  );
}

const WAVE = [6, 12, 20, 30, 18, 26, 36, 22, 14, 28, 40, 30, 18, 24, 34, 20, 12, 26, 32, 16, 10, 20, 14, 8];

export function CallScreen({
  caller,
  business,
  language = 'English',
  transcript,
  status,
}: {
  caller: string;
  business: string;
  language?: string;
  transcript: { who: 'caller' | 'agent'; text: string }[];
  status?: string;
}) {
  const ref = usePlayOnView<HTMLDivElement>();
  const lines = transcript.slice(-3);
  return (
    <div
      ref={ref}
      className="mk-root"
      role="img"
      aria-label={`Live phone call from ${caller} to ${business}, answered by the Steps AI receptionist in ${language}. ${lines
        .map((l) => `${l.who === 'caller' ? caller : 'AI receptionist'}: ${l.text}`)
        .join(' ')} Illustration with sample data.`}
    >
      {SR_NOTE}
      <PhoneFrame className="mk-call">
        <StatusBar dark />
        <div className="mk-call-top" aria-hidden="true">
          <span className="mk-call-badge">
            <img src="/brands/steps-original.png" alt="" />
            Steps AI receptionist · {language}
          </span>
          <Avatar name={caller} className="mk-call-av" />
          <span className="mk-call-name mk-ellipsis">{caller}</span>
          <span className="mk-call-sub mk-ellipsis">Calling {business}</span>
          <span className="mk-call-timer">
            00:42{status ? ` · ${status}` : ''}
          </span>
        </div>
        <div className="mk-wave" aria-hidden="true">
          {WAVE.map((h, i) => (
            <i key={i} style={{ '--h': `${h}px`, '--i': i } as CSSProperties} />
          ))}
        </div>
        <div className="mk-transcript" aria-hidden="true">
          <span className="mk-transcript-head">
            <i className="mk-rec" />
            Live transcript
          </span>
          {lines.map((l, i) => (
            <p key={i} className={cx('mk-tline', `is-${l.who}`)} style={{ '--mk-d': `${0.4 + i * 0.9}s` } as CSSProperties}>
              <span>{l.who === 'caller' ? caller.split(' ')[0] : 'AI receptionist'}</span>
              {l.text}
            </p>
          ))}
        </div>
        <div className="mk-call-btns" aria-hidden="true">
          <span>
            <i>
              <MicOff size={20} />
            </i>
            mute
          </span>
          <span>
            <i>
              <Grid3x3 size={20} />
            </i>
            keypad
          </span>
          <span>
            <i>
              <Volume2 size={20} />
            </i>
            speaker
          </span>
          <span>
            <i className="is-end">
              <PhoneOff size={20} />
            </i>
            end
          </span>
        </div>
      </PhoneFrame>
    </div>
  );
}

export function MessagingMockupGallery() {
  return (
    <div className="mk-gallery">
      <WhatsAppPhone
        business="Kurti Corner"
        verified
        animate
        label="WhatsApp broadcast with an AI reply"
        messages={[
          { kind: 'system', text: 'Today' },
          {
            from: 'business',
            kind: 'template',
            image: '/industries/ecommerce.png',
            title: 'The festive edit is live',
            text: 'Hi Priya, our new cotton kurtas just landed. Flat 20% off till Sunday, free delivery above ₹999.',
            footer: 'Reply STOP to opt out',
            buttons: ['Shop now', 'Talk to us'],
            time: '10:02',
          },
          { from: 'customer', text: 'Is the indigo one there in SIZE M?', time: '10:05' },
          { from: 'agent-note', text: 'Answered by your AI agent' },
          { from: 'business', text: 'Yes, the indigo kurta is in stock in M. It is ₹1,299 after the discount. Want me to add it to your cart?', time: '10:05' },
        ]}
      />
      <WhatsAppPhone
        business="Kurti Corner"
        verified
        animate
        label="Order tracking on WhatsApp"
        messages={[
          { from: 'customer', text: 'Hi, where is my order?', time: '18:20' },
          { from: 'business', text: 'Hi Rahul, here is the latest on your order.', time: '18:20' },
          { from: 'business', kind: 'order', order: '#KC-20418', status: 'Out for delivery today', steps: ['Ordered', 'Packed', 'Shipped', 'Delivered'], current: 2, time: '18:20' },
          { from: 'business', kind: 'buttons', text: 'Anything else I can help with?', buttons: ['Change address', 'Talk to a person'], time: '18:21' },
        ]}
      />
      <InstagramComments
        account="glowbyanu"
        postImage="/industries/ecommerce.png"
        caption="New vitamin C serum, 30 ml. Comment PRICE and we will DM you the details."
        comments={[
          { user: 'meera.k', text: 'PRICE', reply: 'Sent you a DM with the price and link.' },
          { user: 'rahul_92', text: 'Does it suit oily skin?' },
        ]}
        dmSent="Hi Meera, the serum is ₹649. Tap to order: glowbyanu.in/serum"
      />
      <InstagramDM
        account="glowbyanu"
        animate
        messages={[
          { from: 'business', text: 'Hi Meera, the vitamin C serum is ₹649 for 30 ml. Here is the link: glowbyanu.in/serum' },
          { from: 'customer', text: 'Is it okay for sensitive skin?' },
          { from: 'business', text: 'Yes. It is fragrance free and has 10% vitamin C, so it is gentle. Do a patch test on day one.' },
          { from: 'customer', text: 'Perfect, ordering now' },
        ]}
      />
      <MessengerChat
        page="Urban Nest Realty"
        animate
        messages={[
          { from: 'customer', text: 'Is the 2BHK in Kondapur still available?' },
          { from: 'business', text: 'Yes, it is. 1,150 sq ft, ₹28,000 a month, ready to move in.' },
          { from: 'business', kind: 'buttons', text: 'Would you like to visit?', buttons: ['Saturday 11 am', 'Sunday 4 pm'] },
          { from: 'customer', text: 'Saturday 11 am' },
          { from: 'agent-note', text: 'Visit booked, Sam notified' },
        ]}
      />
      <WebsiteWidget
        site="casaloom.in"
        heroImage="/industries/realestate.png"
        brandColor="#8a5a3b"
        animate
        messages={[
          { from: 'business', text: 'Hi there. Looking for something for your home?' },
          { from: 'customer', text: 'Do you have linen cushion covers?' },
          { from: 'business', text: 'Yes, 14 designs from ₹499. The sage and ivory ones are bestsellers. Want to see them?' },
        ]}
        quickQuestions={['Delivery time?', 'Return policy', 'Track my order']}
      />
      <CallScreen
        caller="Meera Nair"
        business="Sunrise Dental Clinic"
        status="Booking"
        transcript={[
          { who: 'caller', text: 'Hi, I would like to book a cleaning this week.' },
          { who: 'agent', text: 'Sure. I have Thursday at 11 am or Friday at 4 pm. Which works for you?' },
          { who: 'caller', text: 'Thursday at 11 is perfect.' },
          { who: 'agent', text: 'Done. You are booked with Dr. Rao on Thursday at 11 am. I will send a WhatsApp confirmation.' },
        ]}
      />
    </div>
  );
}
