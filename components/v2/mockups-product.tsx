"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CalendarCheck,
  CalendarDays,
  ChartColumn,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock,
  Code,
  Copy,
  FileText,
  FolderOpen,
  GitBranch,
  Globe,
  Headset,
  Hourglass,
  House,
  Inbox,
  List,
  Lock,
  Megaphone,
  MousePointer2,
  Paperclip,
  Plus,
  RotateCcw,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  Ticket,
  Upload,
  UserPlus,
  Users,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;
const st = (i: number): CSSVars => ({ "--i": i });

type Channel = "whatsapp" | "instagram" | "messenger" | "website";

const CHANNEL_NAME: Record<Channel, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  messenger: "Messenger",
  website: "Website",
};

const CHANNEL_LOGO: Record<Exclude<Channel, "website">, string> = {
  whatsapp: "/brands/whatsapp.png",
  instagram: "/brands/instagram-icon.png",
  messenger: "/brands/messenger.png",
};

const APPS: { slug: string; name: string; cat: string }[] = [
  { slug: "shopify", name: "Shopify", cat: "E-commerce" },
  { slug: "woocommerce", name: "WooCommerce", cat: "E-commerce" },
  { slug: "hubspot", name: "HubSpot", cat: "CRM" },
  { slug: "zendesk", name: "Zendesk", cat: "Support" },
  { slug: "google-calendar", name: "Google Calendar", cat: "Calendar" },
  { slug: "calendly", name: "Calendly", cat: "Calendar" },
  { slug: "cal-com", name: "Cal.com", cat: "Calendar" },
  { slug: "outlook-calendar", name: "Outlook Calendar", cat: "Calendar" },
  { slug: "square-appointments", name: "Square Appointments", cat: "Calendar" },
  { slug: "google-sheets", name: "Google Sheets", cat: "Productivity" },
  { slug: "notion", name: "Notion", cat: "Productivity" },
  { slug: "slack", name: "Slack", cat: "Productivity" },
  { slug: "google-drive", name: "Google Drive", cat: "Productivity" },
  { slug: "airtable", name: "Airtable", cat: "Productivity" },
  { slug: "outlook", name: "Outlook", cat: "Email" },
  { slug: "klaviyo", name: "Klaviyo", cat: "Marketing" },
  { slug: "shiprocket", name: "Shiprocket", cat: "Shipping" },
  { slug: "delhivery", name: "Delhivery", cat: "Shipping" },
  { slug: "dtdc", name: "DTDC", cat: "Shipping" },
  { slug: "ithink-logistics", name: "iThink Logistics", cat: "Shipping" },
  { slug: "wareiq", name: "WareIQ", cat: "Shipping" },
];

const AV_TONES = ["#dbe7ff", "#dcf5e8", "#fdebd3", "#efe3ff", "#ffe1e4", "#d9f3f6"];
const AV_INK = ["#1a56db", "#0e7a4a", "#b45309", "#6d28d9", "#be123c", "#0e7490"];

function Avatar({ name, size = 28 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  const k = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AV_TONES.length;
  return (
    <span
      className="pm-av"
      style={{ width: size, height: size, background: AV_TONES[k], color: AV_INK[k] }}
    >
      {initials}
    </span>
  );
}

function ChannelMark({ ch, size = 16 }: { ch: Channel; size?: number }) {
  if (ch === "website")
    return (
      <span className="pm-chmark pm-chmark--web" style={{ width: size, height: size }}>
        <Globe size={size - 5} />
      </span>
    );
  return <img className="pm-chmark" src={CHANNEL_LOGO[ch]} alt="" width={size} height={size} />;
}

function AppLogo({ slug, size = 28 }: { slug: string; size?: number }) {
  return (
    <span className="pm-applogo" style={{ width: size + 12, height: size + 12 }}>
      <img src={`/brands/integrations/${slug}.svg`} alt="" width={size} height={size} />
    </span>
  );
}

type Tone = "green" | "blue" | "amber" | "red" | "gray" | "purple";
function Pill({ tone = "gray", children, dot }: { tone?: Tone; children: ReactNode; dot?: boolean }) {
  return (
    <span className={`pm-pill pm-pill--${tone}`}>
      {dot && <i className="pm-pill-dot" />}
      {children}
    </span>
  );
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <span className={`pm-toggle${on ? " is-on" : ""}`}>
      <i />
    </span>
  );
}

function Select({ children, icon: Icon }: { children: ReactNode; icon?: LucideIcon }) {
  return (
    <span className="pm-select">
      {Icon && <Icon size={14} />}
      {children}
      <ChevronDown size={14} />
    </span>
  );
}

function Btn({
  children,
  kind = "ghost",
  icon: Icon,
  ring,
}: {
  children: ReactNode;
  kind?: "primary" | "ghost" | "soft";
  icon?: LucideIcon;
  ring?: boolean;
}) {
  return (
    <span className={`pm-btn pm-btn--${kind}${ring ? " pm-ring" : ""}`}>
      {Icon && <Icon size={14} />}
      {children}
      {ring && <Cursor />}
    </span>
  );
}

function Cursor() {
  return (
    <span className="pm-cursor" aria-hidden>
      <MousePointer2 size={18} fill="#0b1b3f" stroke="#fff" strokeWidth={1.5} />
    </span>
  );
}

function Head({ title, crumb, children, i = 0 }: { title: string; crumb?: string; children?: ReactNode; i?: number }) {
  return (
    <div className="pm-head pm-in" style={st(i)}>
      <div className="pm-head-t">
        {crumb && <span className="pm-crumb">{crumb}</span>}
        <strong className="pm-h">{title}</strong>
      </div>
      {children && <div className="pm-head-a">{children}</div>}
    </div>
  );
}

function Stepper({ steps, current, done }: { steps: string[]; current: number; done?: boolean }) {
  return (
    <div className="pm-steps pm-in" style={st(1)}>
      {steps.map((s, i) => {
        const state = done || i < current ? "done" : i === current ? "cur" : "todo";
        return (
          <span key={s} className={`pm-step is-${state}`}>
            <i>{state === "done" ? <Check size={12} strokeWidth={3} /> : i + 1}</i>
            <span className={state === "cur" ? "" : "pm-hs"}>{s}</span>
          </span>
        );
      })}
    </div>
  );
}

/** Screen root: accessible image wrapper + plays the entrance motion once in view. */
function Shot({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("pm-play");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("pm-play");
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`pm-shot ${className}`} role="img" aria-label={label}>
      <span className="pm-sr">Illustration with sample data</span>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App window                                                          */
/* ------------------------------------------------------------------ */

const NAV_OVERVIEW: [string, LucideIcon][] = [
  ["Home", House],
  ["Agents", Bot],
  ["Resources", FolderOpen],
  ["Workflows", Workflow],
  ["Campaigns", Megaphone],
  ["Calendar", CalendarDays],
];
const NAV_WORKSPACE: [string, LucideIcon][] = [
  ["Inbox", Inbox],
  ["Analytics", ChartColumn],
  ["CRM", Users],
];

export function AppWindow({
  title,
  active,
  children,
  compact,
}: {
  title: string;
  active?: string;
  children: ReactNode;
  compact?: boolean;
}) {
  const navItem = ([label, Icon]: [string, LucideIcon]) => (
    <span key={label} className={`pm-nav${label === active ? " is-active" : ""}`}>
      <Icon size={15} />
      {label}
      {label === "Inbox" && <b className="pm-nav-badge">3</b>}
    </span>
  );
  return (
    <div className={`pm-win${compact ? " pm-win--compact" : ""}`}>
      <div className="pm-chrome" aria-hidden>
        <span className="pm-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="pm-addr">
          <Lock size={12} />
          <span>{title}</span>
        </span>
        <span className="pm-chrome-sp" />
      </div>
      <div className="pm-body">
        {!compact && (
          <aside className="pm-side">
            <img className="pm-logo" src="/brands/steps-original.png" alt="" />
            <span className="pm-ws">
              <span className="pm-ws-mark">LH</span>
              <span>Lumen Home</span>
              <ChevronDown size={13} />
            </span>
            <span className="pm-nav-label">Overview</span>
            {NAV_OVERVIEW.map(navItem)}
            <span className="pm-nav-label">Workspace</span>
            {NAV_WORKSPACE.map(navItem)}
            <span className="pm-credits">
              <span className="pm-credits-row">
                <span>Credits used</span>
                <b>65%</b>
              </span>
              <span className="pm-bar">
                <i style={{ width: "65%" }} />
              </span>
              <span className="pm-muted">3,240 of 5,000</span>
            </span>
          </aside>
        )}
        <div className="pm-main">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Inbox                                                               */
/* ------------------------------------------------------------------ */

const CONVOS: { n: string; ch: Channel; t: string; p: string; live?: boolean; unread?: boolean; star?: boolean }[] = [
  { n: "Priya Sharma", ch: "whatsapp", t: "2m", p: "Sure, it's Flat 302, Green Park Residency, Pune.", live: true, unread: true },
  { n: "Rahul Mehta", ch: "instagram", t: "6m", p: "Is the walnut side table back in stock?", unread: true },
  { n: "Meera Shah", ch: "website", t: "18m", p: "Booked for Thursday 4 pm, thanks!", star: true },
  { n: "Arjun Nair", ch: "messenger", t: "32m", p: "Do you deliver to Kochi?" },
  { n: "Kavya Iyer", ch: "whatsapp", t: "1h", p: "Got the return pickup slot, thank you." },
];

export function InboxScreen({ highlight = "live" }: { highlight?: "live" | "reply" | "list" }) {
  const label =
    highlight === "reply"
      ? "Steps AI inbox: a team member has joined Priya Sharma's WhatsApp conversation and is replying while the AI is paused"
      : highlight === "list"
        ? "Steps AI inbox: one list of conversations from WhatsApp, Instagram, Messenger and the website, with filters for unread, starred and live requests"
        : "Steps AI inbox: Priya Sharma asked for a person on WhatsApp and the request is waiting to be claimed";
  return (
    <Shot label={label}>
      <AppWindow title="Inbox" active="Inbox">
        <div className="pm-inbox">
          <div className={`pm-ilist${highlight === "list" ? " pm-ring pm-ring--panel" : ""}`}>
            <div className="pm-ilist-head pm-in" style={st(0)}>
              <strong className="pm-h">Inbox</strong>
              <Search size={15} className="pm-muted" />
            </div>
            <div className="pm-tabs pm-in" style={st(1)}>
              <span className="is-on">All</span>
              <span>Unread</span>
              <span className="pm-hs">Starred</span>
              <span>
                Live <b className="pm-count">2</b>
              </span>
            </div>
            <div className="pm-ifilters pm-in" style={st(2)}>
              <Select>All agents</Select>
              <Select>All channels</Select>
            </div>
            {CONVOS.map((c, i) => (
              <div key={c.n} className={`pm-conv pm-in${i === 0 ? " is-sel" : ""}`} style={st(3 + i)}>
                <span className="pm-conv-av">
                  <Avatar name={c.n} size={30} />
                  <span className="pm-conv-ch">
                    <ChannelMark ch={c.ch} size={14} />
                  </span>
                </span>
                <span className="pm-conv-body">
                  <span className="pm-conv-top">
                    <b>{c.n}</b>
                    <span className="pm-muted">{c.t}</span>
                  </span>
                  <span className="pm-conv-prev">{c.p}</span>
                  {(c.live || c.star) && (
                    <span className="pm-conv-tags">
                      {c.live && (
                        <Pill tone="red" dot>
                          Live request
                        </Pill>
                      )}
                      {c.star && <Star size={13} fill="#f5b301" stroke="#f5b301" />}
                    </span>
                  )}
                </span>
                {c.unread && <i className="pm-unread" />}
              </div>
            ))}
          </div>

          <div className="pm-thread pm-hs">
            <div className="pm-thread-head pm-in" style={st(2)}>
              <Avatar name="Priya Sharma" size={30} />
              <span className="pm-thread-who">
                <b>
                  Priya Sharma <BadgeCheck size={14} className="pm-verified" />
                </b>
                <span className="pm-muted pm-row">
                  <ChannelMark ch="whatsapp" size={13} /> WhatsApp · Sales agent
                </span>
              </span>
              <Btn kind={highlight === "reply" ? "primary" : "ghost"} icon={CircleCheck}>
                Resolve
              </Btn>
            </div>
            <div className="pm-msgs">
              <div className="pm-msg pm-msg--in pm-in" style={st(4)}>
                Hi, I placed order #4821 yesterday. Can I change the delivery address?
              </div>
              <div className="pm-msg pm-msg--ai pm-in" style={st(5)}>
                <span className="pm-msg-by">
                  <Sparkles size={12} /> AI · Sales agent
                </span>
                I can see order #4821 (Oak bedside lamp, ₹2,499). It has already shipped, so I&apos;ve asked a team member to update the address.
              </div>
              <div className="pm-sys pm-in" style={st(6)}>
                <Headset size={13} /> Human handoff requested · 10:42 AM
              </div>
              <div className="pm-msg pm-msg--in pm-in" style={st(7)}>
                Sure, it&apos;s Flat 302, Green Park Residency, Pune.
              </div>
              {highlight === "reply" && (
                <>
                  <div className="pm-sys pm-in" style={st(8)}>
                    <UserPlus size={13} /> Ananya joined · AI replies paused
                  </div>
                  <div className="pm-msg pm-msg--human pm-in" style={st(9)}>
                    <span className="pm-msg-by">Ananya · You</span>
                    Done, Priya. The courier has the new address and you&apos;ll get a fresh tracking link shortly.
                  </div>
                </>
              )}
            </div>
            {highlight === "reply" ? (
              <div className="pm-composer pm-ring pm-in" style={st(10)}>
                <span className="pm-composer-text">Anything else I can help with today?</span>
                <Paperclip size={15} className="pm-muted" />
                <span className="pm-send">
                  <Send size={14} />
                </span>
                <Cursor />
              </div>
            ) : (
              <div className="pm-claim pm-in" style={st(8)}>
                <span className="pm-claim-t">
                  <b>Priya asked for a person</b>
                  <span className="pm-muted">Waiting 2 min · AI is holding the chat</span>
                </span>
                <Btn kind="primary" icon={UserPlus} ring={highlight === "live"}>
                  Claim
                </Btn>
              </div>
            )}
          </div>
        </div>
      </AppWindow>
    </Shot>
  );
}

/* ------------------------------------------------------------------ */
/* CRM                                                                 */
/* ------------------------------------------------------------------ */

const CUSTOMERS: { n: string; e: string; s: [string, Tone]; co: string; ch: Channel; a: string; c: string; v?: boolean }[] = [
  { n: "Priya Sharma", e: "priya.sharma@gmail.com", s: ["Customer", "green"], co: "Sharma Interiors", ch: "whatsapp", a: "Sales agent", c: "Today, 10:42", v: true },
  { n: "Rahul Mehta", e: "rahul@mehtaco.in", s: ["Lead", "blue"], co: "Mehta & Co", ch: "instagram", a: "Sales agent", c: "Today, 9:15" },
  { n: "Meera Shah", e: "meera@studiomeera.com", s: ["Qualified", "purple"], co: "Studio Meera", ch: "website", a: "Sales agent", c: "Yesterday", v: true },
  { n: "Arjun Nair", e: "arjun.nair@outlook.com", s: ["Lead", "blue"], co: "Nair Builders", ch: "messenger", a: "Support agent", c: "Oct 8" },
  { n: "Kavya Iyer", e: "kavya.iyer@gmail.com", s: ["Customer", "green"], co: "—", ch: "whatsapp", a: "Support agent", c: "Oct 7", v: true },
];
const TICKETS: { id: string; sub: string; s: [string, Tone]; p: [string, Tone]; r: string }[] = [
  { id: "TK-1048", sub: "Lamp arrived with a cracked shade", s: ["Open", "blue"], p: ["High", "red"], r: "Priya Sharma" },
  { id: "TK-1047", sub: "Refund for cancelled order #4790", s: ["Pending", "amber"], p: ["Medium", "amber"], r: "Rahul Mehta" },
  { id: "TK-1046", sub: "Missing screws in bookshelf kit", s: ["Open", "blue"], p: ["Medium", "amber"], r: "Arjun Nair" },
  { id: "TK-1045", sub: "Invoice needs GST number", s: ["Solved", "green"], p: ["Low", "gray"], r: "Meera Shah" },
  { id: "TK-1044", sub: "Change delivery address on #4821", s: ["Pending", "amber"], p: ["High", "red"], r: "Kavya Iyer" },
];
const LIVE: { id: string; u: string; ch: Channel; why: string; p: [string, Tone]; w: string }[] = [
  { id: "LR-218", u: "Priya Sharma", ch: "whatsapp", why: "Change address after dispatch", p: ["High", "red"], w: "2m" },
  { id: "LR-217", u: "Rohan Das", ch: "website", why: "Bulk order quote, 40 units", p: ["High", "red"], w: "5m" },
  { id: "LR-216", u: "Kavya Iyer", ch: "instagram", why: "Asked to talk to a person", p: ["Medium", "amber"], w: "9m" },
  { id: "LR-215", u: "Neha Kapoor", ch: "messenger", why: "Unhappy with delivery delay", p: ["Medium", "amber"], w: "14m" },
];

export function CrmScreen({ tab = "customers" }: { tab?: "customers" | "tickets" | "live" }) {
  const label =
    tab === "tickets"
      ? "Steps AI CRM tickets table with ticket ID, subject, status, priority and requester"
      : tab === "live"
        ? "Steps AI CRM live requests table listing customers waiting for a person, with reason and priority"
        : "Steps AI CRM customers table with name, email, status, company, source channel, agent and created date";
  return (
    <Shot label={label}>
      <AppWindow title="CRM" active="CRM">
        <div className="pm-pad">
          <Head title="CRM">
            <Btn icon={Plus} kind="primary">
              {tab === "tickets" ? "New ticket" : "Add customer"}
            </Btn>
          </Head>
          <div className="pm-tabs pm-tabs--line pm-in" style={st(1)}>
            <span className={tab === "customers" ? "is-on" : ""}>
              Customers <b className="pm-count pm-count--soft">1,248</b>
            </span>
            <span className={tab === "tickets" ? "is-on" : ""}>
              Tickets <b className="pm-count pm-count--soft">23</b>
            </span>
            <span className={tab === "live" ? "is-on" : ""}>
              Live requests <b className="pm-count">4</b>
            </span>
          </div>
          <div className="pm-toolbar pm-in" style={st(2)}>
            <span className="pm-search">
              <Search size={14} /> Search
            </span>
            <Select icon={List}>View: New this week</Select>
            <span className="pm-hs pm-row">
              <Select>Source: All</Select>
              <Select>Agent: All</Select>
            </span>
          </div>

          <div className="pm-table pm-in" style={st(3)}>
            {tab === "customers" && (
              <>
                <div className="pm-tr pm-th pm-cols-cust">
                  <span>Name</span>
                  <span>Status</span>
                  <span className="pm-hs">Company</span>
                  <span>Source</span>
                  <span className="pm-hs">Agent</span>
                  <span className="pm-hxs">Created</span>
                </div>
                {CUSTOMERS.map((r, i) => (
                  <div key={r.n} className="pm-tr pm-cols-cust pm-in" style={st(4 + i)}>
                    <span className="pm-cell-who">
                      <Avatar name={r.n} size={26} />
                      <span>
                        <b>
                          {r.n} {r.v && <BadgeCheck size={13} className="pm-verified" />}
                        </b>
                        <span className="pm-muted pm-ell">{r.e}</span>
                      </span>
                    </span>
                    <span>
                      <Pill tone={r.s[1]}>{r.s[0]}</Pill>
                    </span>
                    <span className="pm-hs pm-ell">{r.co}</span>
                    <span className="pm-row">
                      <ChannelMark ch={r.ch} size={14} />
                      <span className="pm-hxs">{CHANNEL_NAME[r.ch]}</span>
                    </span>
                    <span className="pm-hs pm-ell">{r.a}</span>
                    <span className="pm-hxs pm-muted">{r.c}</span>
                  </div>
                ))}
              </>
            )}
            {tab === "tickets" && (
              <>
                <div className="pm-tr pm-th pm-cols-tick">
                  <span>ID</span>
                  <span>Subject</span>
                  <span>Status</span>
                  <span className="pm-hxs">Priority</span>
                  <span className="pm-hs">Requester</span>
                </div>
                {TICKETS.map((r, i) => (
                  <div key={r.id} className="pm-tr pm-cols-tick pm-in" style={st(4 + i)}>
                    <span className="pm-mono">{r.id}</span>
                    <span className="pm-ell">
                      <b>{r.sub}</b>
                    </span>
                    <span>
                      <Pill tone={r.s[1]}>{r.s[0]}</Pill>
                    </span>
                    <span className="pm-hxs">
                      <Pill tone={r.p[1]} dot>
                        {r.p[0]}
                      </Pill>
                    </span>
                    <span className="pm-hs pm-cell-who">
                      <Avatar name={r.r} size={22} />
                      <span className="pm-ell">{r.r}</span>
                    </span>
                  </div>
                ))}
              </>
            )}
            {tab === "live" && (
              <>
                <div className="pm-tr pm-th pm-cols-live">
                  <span>ID</span>
                  <span>User</span>
                  <span className="pm-hs">Reason</span>
                  <span className="pm-hxs">Priority</span>
                  <span />
                </div>
                {LIVE.map((r, i) => (
                  <div key={r.id} className="pm-tr pm-cols-live pm-in" style={st(4 + i)}>
                    <span className="pm-mono">{r.id}</span>
                    <span className="pm-cell-who">
                      <span className="pm-conv-av">
                        <Avatar name={r.u} size={26} />
                        <span className="pm-conv-ch">
                          <ChannelMark ch={r.ch} size={13} />
                        </span>
                      </span>
                      <span>
                        <b className="pm-ell">{r.u}</b>
                        <span className="pm-muted pm-row">
                          <Clock size={12} /> waiting {r.w}
                        </span>
                      </span>
                    </span>
                    <span className="pm-hs pm-ell">{r.why}</span>
                    <span className="pm-hxs">
                      <Pill tone={r.p[1]} dot>
                        {r.p[0]}
                      </Pill>
                    </span>
                    <span>
                      <Btn kind={i === 0 ? "primary" : "soft"} ring={i === 0}>
                        Claim
                      </Btn>
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </AppWindow>
    </Shot>
  );
}

/* ------------------------------------------------------------------ */
/* Analytics                                                           */
/* ------------------------------------------------------------------ */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const CHATS = [152, 171, 160, 196, 214, 182, 209];
const MESSAGES = [1180, 1320, 1250, 1490, 1610, 1420, 1602];
const QUESTIONS: [string, number][] = [
  ["Where is my order?", 312],
  ["Return and exchange policy", 214],
  ["Delivery time to my city", 176],
  ["Is this item in stock?", 141],
  ["Is cash on delivery available?", 118],
  ["Change my delivery address", 74],
];
const CHANNEL_SPLIT: [string, number, string][] = [
  ["WhatsApp", 46, "#1A56DB"],
  ["Website", 28, "#5b8def"],
  ["Instagram", 18, "#9dbaf7"],
  ["Messenger", 8, "#cfdcf9"],
];

function KpiRow() {
  const kpis: [string, string, string, boolean][] = [
    ["Total chats", "1,284", "+12.4%", true],
    ["Total messages", "9,872", "+9.1%", true],
    ["Avg response time (AI only)", "4.2s", "-0.6s", true],
    ["Resolution rate", "87%", "+3 pts", true],
  ];
  return (
    <div className="pm-kpis">
      {kpis.map(([k, v, d], i) => (
        <div key={k} className="pm-kpi pm-in" style={st(1 + i)}>
          <span className="pm-muted pm-ell">{k}</span>
          <b>{v}</b>
          <span className="pm-delta">{d} vs prior week</span>
        </div>
      ))}
    </div>
  );
}

function LineChart() {
  const pts = (arr: number[], max: number) =>
    arr.map((v, i) => `${((i / (arr.length - 1)) * 300).toFixed(1)},${(100 - (v / max) * 100).toFixed(1)}`).join(" ");
  const msg = pts(MESSAGES, 2000);
  const chat = pts(CHATS, 240);
  return (
    <div className="pm-chart">
      <div className="pm-chart-legend">
        <span>
          <i style={{ background: "#1A56DB" }} /> Messages
        </span>
        <span>
          <i style={{ background: "#14b8a6" }} /> Chats
        </span>
      </div>
      <div className="pm-chart-plot">
        <span className="pm-yaxis">
          {["2k", "1.5k", "1k", "500", "0"].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </span>
        <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="pm-chart-svg" aria-hidden>
          <defs>
            <linearGradient id="pm-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#1A56DB" stopOpacity=".18" />
              <stop offset="1" stopColor="#1A56DB" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 25, 50, 75, 100].map((y) => (
            <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#e4eaf4" vectorEffect="non-scaling-stroke" />
          ))}
          <polygon points={`0,100 ${msg} 300,100`} fill="url(#pm-area)" />
          <polyline points={msg} fill="none" stroke="#1A56DB" strokeWidth="2.25" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          <polyline
            points={chat}
            fill="none"
            stroke="#14b8a6"
            strokeWidth="2"
            strokeDasharray="5 4"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
        </svg>
        <span className="pm-yaxis pm-yaxis--r pm-hxs">
          {["240", "180", "120", "60", "0"].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </span>
      </div>
      <div className="pm-xaxis">
        {DAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

function Donut() {
  const r = 42;
  const C = 2 * Math.PI * r;
  let cum = 0;
  return (
    <div className="pm-donut">
      <span className="pm-donut-fig">
        <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden>
          {CHANNEL_SPLIT.map(([n, pct, col]) => {
            const len = (pct / 100) * C;
            const el = (
              <circle
                key={n}
                cx="56"
                cy="56"
                r={r}
                fill="none"
                stroke={col}
                strokeWidth="16"
                strokeDasharray={`${len - 1.5} ${C - len + 1.5}`}
                strokeDashoffset={C / 4 - cum}
              />
            );
            cum += len;
            return el;
          })}
        </svg>
        <span className="pm-donut-c">
          <b>1,284</b>
          <span className="pm-muted">chats</span>
        </span>
      </span>
      <span className="pm-donut-legend">
        {CHANNEL_SPLIT.map(([n, pct, col]) => (
          <span key={n}>
            <i style={{ background: col }} />
            {n}
            <b>{pct}%</b>
          </span>
        ))}
      </span>
    </div>
  );
}

function heatLevel(d: number, h: number) {
  const peak = Math.exp(-((h - 12) ** 2) / 8) + 0.95 * Math.exp(-((h - 20) ** 2) / 5);
  const w = d >= 5 ? 0.75 : 1;
  const noise = ((d * 7 + h * 13) % 5) / 22;
  const v = Math.min(1, peak * w * 0.85 + noise);
  return Math.min(4, Math.floor(v * 5));
}

function Heatmap() {
  return (
    <div className="pm-heat">
      <div className="pm-heat-grid">
        {DAYS.map((d, di) => (
          <div key={d} className="pm-heat-row">
            <span className="pm-heat-day">{d}</span>
            {Array.from({ length: 24 }, (_, h) => (
              <i key={h} className={`pm-hl${heatLevel(di, h)}`} />
            ))}
          </div>
        ))}
        <div className="pm-heat-row pm-heat-x">
          <span className="pm-heat-day" />
          {["12 AM", "6 AM", "12 PM", "6 PM"].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
      <div className="pm-heat-legend">
        <span className="pm-muted">Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <i key={l} className={`pm-hl${l}`} />
        ))}
        <span className="pm-muted">More</span>
      </div>
    </div>
  );
}

function Questions() {
  const max = QUESTIONS[0][1];
  return (
    <div className="pm-qs">
      {QUESTIONS.map(([q, n], i) => (
        <div key={q} className="pm-q pm-in" style={st(7 + i)}>
          <span className="pm-q-rank">{i + 1}</span>
          <span className="pm-q-main">
            <span className="pm-q-top">
              <span className="pm-ell">{q}</span>
              <b>{n}</b>
            </span>
            <span className="pm-bar">
              <i style={{ width: `${(n / max) * 100}%` }} />
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

export function AnalyticsScreen({ focus = "overview" }: { focus?: "overview" | "heatmap" | "questions" }) {
  const label =
    focus === "heatmap"
      ? "Steps AI analytics: activity heatmap by weekday and hour showing busiest times around midday and 8 PM"
      : focus === "questions"
        ? "Steps AI analytics: what customers are asking, ranked, with order tracking at the top"
        : "Steps AI analytics: total chats, messages, AI response time and resolution rate, with a chats and messages chart and a channel breakdown";
  return (
    <Shot label={label}>
      <AppWindow title="Analytics" active="Analytics">
        <div className="pm-pad">
          <Head title="Analytics">
            <span className="pm-hxs">
              <Select icon={Bot}>All agents</Select>
            </span>
            <Select icon={CalendarDays}>Last 7 days</Select>
          </Head>
          <KpiRow />
          {focus === "overview" && (
            <div className="pm-grid-2">
              <div className="pm-card pm-ring pm-ring--panel pm-in" style={st(5)}>
                <span className="pm-card-t">Chats &amp; messages over time</span>
                <LineChart />
              </div>
              <div className="pm-card pm-in pm-hs" style={st(6)}>
                <span className="pm-card-t">Channel breakdown</span>
                <Donut />
              </div>
            </div>
          )}
          {focus === "heatmap" && (
            <div className="pm-card pm-ring pm-ring--panel pm-in" style={st(5)}>
              <span className="pm-card-t pm-row-between">
                Activity heatmap <span className="pm-muted">Peak: Fri, 8 PM</span>
              </span>
              <Heatmap />
            </div>
          )}
          {focus === "questions" && (
            <div className="pm-grid-2 pm-grid-2--q">
              <div className="pm-card pm-ring pm-ring--panel pm-in" style={st(5)}>
                <span className="pm-card-t pm-row-between">
                  What customers are asking <span className="pm-muted">chats</span>
                </span>
                <Questions />
              </div>
              <div className="pm-card pm-in pm-hs" style={st(6)}>
                <span className="pm-card-t">Channel breakdown</span>
                <Donut />
              </div>
            </div>
          )}
        </div>
      </AppWindow>
    </Shot>
  );
}

/* ------------------------------------------------------------------ */
/* Calendar                                                            */
/* ------------------------------------------------------------------ */

const CAL_SOURCES: { slug: string; name: string; tone: string }[] = [
  { slug: "google-calendar", name: "Google", tone: "blue" },
  { slug: "outlook-calendar", name: "Outlook", tone: "teal" },
  { slug: "calendly", name: "Calendly", tone: "purple" },
  { slug: "cal-com", name: "Cal.com", tone: "slate" },
  { slug: "square-appointments", name: "Square", tone: "green" },
];
// [day index, start hour, duration hours, title, source index, booked by AI]
const CAL_EVENTS: [number, number, number, string, number, boolean?][] = [
  [0, 9.5, 0.75, "Consultation · Rahul Mehta", 0],
  [0, 13, 1, "Showroom visit · Arjun Nair", 2],
  [1, 10, 1, "Team standup", 1],
  [1, 15, 0.75, "Intro call · Rohan Das", 3],
  [2, 11, 1, "Design consult · Kavya Iyer", 4],
  [2, 14.5, 1, "Supplier call", 0],
  [3, 9, 1, "Fitting · Neha Kapoor", 2],
  [3, 16, 1, "Consultation · Meera Shah", 0, true],
  [4, 10, 0.5, "Intro call · Priya Sharma", 3],
  [4, 12, 1, "Lunch with vendor", 1],
];
const CAL_START = 9;
const CAL_HOURS = 9;

export function CalendarScreen() {
  const days = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"];
  return (
    <Shot label="Steps AI calendar: one week view combining Google Calendar, Outlook, Calendly, Cal.com and Square bookings, including a consultation the AI booked for Thursday 4 PM">
      <AppWindow title="Calendar" active="Calendar">
        <div className="pm-pad">
          <Head title="Calendar">
            <span className="pm-row pm-calnav">
              <ChevronLeft size={15} />
              <b>Oct 12 – 16, 2026</b>
              <ChevronRight size={15} />
            </span>
            <span className="pm-seg pm-hxs">
              <span>Day</span>
              <span className="is-on">Week</span>
            </span>
          </Head>
          <div className="pm-calsrc pm-in" style={st(1)}>
            {CAL_SOURCES.map((s) => (
              <span key={s.slug} className={`pm-calsrc-i pm-ev--${s.tone}`}>
                <img src={`/brands/integrations/${s.slug}.svg`} alt="" width={14} height={14} />
                {s.name}
              </span>
            ))}
          </div>
          <div className="pm-cal pm-in" style={st(2)}>
            <div className="pm-cal-head">
              <span />
              {days.map((d, i) => (
                <span key={d} className={`${i === 3 ? "is-today" : ""}${i === 0 || i === 4 ? " pm-hs" : ""}`}>
                  {d}
                </span>
              ))}
            </div>
            <div className="pm-cal-body">
              <div className="pm-cal-times">
                {Array.from({ length: CAL_HOURS }, (_, i) => {
                  const h = CAL_START + i;
                  return <span key={h}>{h > 12 ? `${h - 12} PM` : h === 12 ? "12 PM" : `${h} AM`}</span>;
                })}
              </div>
              {days.map((d, di) => (
                <div key={d} className={`pm-cal-col${di === 0 || di === 4 ? " pm-hs" : ""}`}>
                  {CAL_EVENTS.filter((e) => e[0] === di).map(([, start, dur, title, src, ai], k) => (
                    <span
                      key={title}
                      className={`pm-ev pm-ev--${CAL_SOURCES[src].tone} pm-in${ai ? " pm-ring" : ""}`}
                      style={{
                        ...st(3 + di + k),
                        top: `${((start - CAL_START) / CAL_HOURS) * 100}%`,
                        height: `calc(${(dur / CAL_HOURS) * 100}% - 3px)`,
                      }}
                    >
                      <b className="pm-ell">{title}</b>
                      {ai ? (
                        <span className="pm-ev-ai">
                          <Sparkles size={11} /> Booked by AI
                        </span>
                      ) : (
                        dur >= 1 && <span className="pm-ell pm-ev-src">{CAL_SOURCES[src].name}</span>
                      )}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppWindow>
    </Shot>
  );
}

/* ------------------------------------------------------------------ */
/* Workflows                                                           */
/* ------------------------------------------------------------------ */

const WF: Record<
  "cart" | "cod" | "review",
  { name: string; trigger: string; wait: string; cond: string; msg: string; runs: [string, string, Tone, string][] }
> = {
  cart: {
    name: "Abandoned cart recovery",
    trigger: "Shopify · Cart abandoned",
    wait: "1 hour",
    cond: "If not purchased",
    msg: "Hi {{first_name}}, your Oak bedside lamp is still in your cart. Complete your order: {{cart_link}}",
    runs: [
      ["Priya Sharma", "Message sent", "blue", "2m"],
      ["Rahul Mehta", "Purchased, ended", "green", "14m"],
      ["Arjun Nair", "Waiting · 38m left", "amber", "22m"],
      ["Kavya Iyer", "Message sent", "blue", "1h"],
    ],
  },
  cod: {
    name: "COD order confirmation",
    trigger: "Shopify · Order placed",
    wait: "10 minutes",
    cond: "If payment is cash on delivery",
    msg: "Hi {{first_name}}, please reply YES to confirm order {{order_id}} ({{order_total}}, cash on delivery).",
    runs: [
      ["Meera Shah", "Message sent", "blue", "4m"],
      ["Rohan Das", "Prepaid, ended", "green", "11m"],
      ["Neha Kapoor", "Waiting · 6m left", "amber", "4m"],
      ["Priya Sharma", "Message sent", "blue", "48m"],
    ],
  },
  review: {
    name: "Post-delivery review request",
    trigger: "Shopify · Order fulfilled",
    wait: "3 days",
    cond: "If order is delivered",
    msg: "Hi {{first_name}}, how is your {{product_name}}? A quick review helps other shoppers: {{review_link}}",
    runs: [
      ["Kavya Iyer", "Message sent", "blue", "1h"],
      ["Arjun Nair", "Not delivered, ended", "gray", "3h"],
      ["Rahul Mehta", "Waiting · 2d left", "amber", "1d"],
      ["Meera Shah", "Message sent", "blue", "1d"],
    ],
  },
};

function WfNode({
  kind,
  title,
  sub,
  icon: Icon,
  logo,
  tone,
  i,
  ring,
}: {
  kind: string;
  title: string;
  sub?: ReactNode;
  icon?: LucideIcon;
  logo?: string;
  tone: string;
  i: number;
  ring?: boolean;
}) {
  return (
    <div className={`pm-node pm-node--${tone} pm-in${ring ? " pm-ring" : ""}`} style={st(i)}>
      <span className="pm-node-ic">
        {logo ? <img src={logo} alt="" width={18} height={18} /> : Icon && <Icon size={16} />}
      </span>
      <span className="pm-node-t">
        <span className="pm-node-k">{kind}</span>
        <b>{title}</b>
        {sub && <span className="pm-node-s">{sub}</span>}
      </span>
    </div>
  );
}

export function WorkflowScreen({ template = "cart" }: { template?: "cart" | "cod" | "review" }) {
  const w = WF[template];
  return (
    <Shot
      label={`Steps AI workflow builder: ${w.name}. ${w.trigger}, wait ${w.wait}, ${w.cond.toLowerCase()} send a WhatsApp message, otherwise end. Workflow is active with recent run history.`}
    >
      <AppWindow title="Workflows" active="Workflows">
        <div className="pm-pad pm-pad--flush">
          <Head title={w.name} crumb="Workflows /">
            <span className="pm-seg">
              <span>Draft</span>
              <span className="is-on is-live">
                <i className="pm-live-dot" />
                Active
              </span>
            </span>
          </Head>
          <div className="pm-wf">
            <div className="pm-canvas pm-in" style={st(1)}>
              <WfNode kind="Trigger" title={w.trigger} logo="/brands/integrations/shopify.svg" tone="green" i={2} />
              <span className="pm-wire pm-in" style={st(3)} />
              <WfNode kind="Wait" title={w.wait} icon={Hourglass} tone="amber" i={3} />
              <span className="pm-wire pm-in" style={st(4)} />
              <WfNode kind="Condition" title={w.cond} icon={GitBranch} tone="purple" i={4} />
              <div className="pm-branch pm-in" style={st(5)}>
                <div className="pm-branch-col">
                  <span className="pm-branch-tag pm-branch-tag--yes">Yes</span>
                  <WfNode
                    kind="Send WhatsApp message"
                    title="Template: reminder"
                    sub={<span className="pm-node-quote">{w.msg}</span>}
                    logo="/brands/whatsapp.png"
                    tone="wa"
                    i={6}
                    ring
                  />
                  <span className="pm-wire pm-wire--short pm-in" style={st(7)} />
                  <span className="pm-end pm-in" style={st(7)}>
                    End
                  </span>
                </div>
                <div className="pm-branch-col">
                  <span className="pm-branch-tag">No</span>
                  <span className="pm-end pm-in" style={st(6)}>
                    End
                  </span>
                </div>
              </div>
            </div>
            <div className="pm-runs pm-hs">
              <span className="pm-card-t pm-row-between pm-in" style={st(3)}>
                Run history <span className="pm-muted">142 this week</span>
              </span>
              {w.runs.map(([n, s, tone, t], i) => (
                <div key={n} className="pm-run pm-in" style={st(4 + i)}>
                  <Avatar name={n} size={24} />
                  <span className="pm-run-b">
                    <span className="pm-row-between">
                      <b className="pm-ell">{n}</b>
                      <span className="pm-muted">{t}</span>
                    </span>
                    <Pill tone={tone}>{s}</Pill>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppWindow>
    </Shot>
  );
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

type SkillId = "booking" | "ticket" | "customer" | "handoff" | "web" | "custom";
const SKILLS: { id: SkillId; name: string; desc: string; prov?: string; provName: string; on: boolean; Icon: LucideIcon; custom?: boolean }[] = [
  { id: "booking", name: "Book appointment", desc: "Books showroom visits and consultations", prov: "google-calendar", provName: "Google Calendar", on: true, Icon: CalendarCheck },
  { id: "ticket", name: "Create ticket", desc: "Logs issues that need a follow-up", provName: "Steps AI CRM", on: true, Icon: Ticket },
  { id: "customer", name: "Create customer", desc: "Saves new leads with name, phone and email", prov: "hubspot", provName: "HubSpot", on: true, Icon: UserPlus },
  { id: "handoff", name: "Human handoff", desc: "Brings your team into the chat", provName: "Inbox", on: true, Icon: Headset },
  { id: "web", name: "Web search", desc: "Looks up answers outside your knowledge", provName: "Built-in", on: false, Icon: Globe },
  { id: "custom", name: "Warranty lookup", desc: "Checks warranty status by order number", provName: "Custom skill", on: true, Icon: Wrench, custom: true },
];

const SKILL_EDIT: Record<
  "booking" | "handoff" | "ticket",
  { when: string; yes: string[]; no: string[]; settings: [string, ReactNode][] }
> = {
  booking: {
    when: "When a customer wants to book, move or ask about a showroom visit or design consultation.",
    yes: ["Can I come by Thursday afternoon?", "Book a consultation for next week"],
    no: ["What are your store hours?", "Cancel my order"],
    settings: [
      [
        "Calendar",
        <span key="c" className="pm-row">
          <img src="/brands/integrations/google-calendar.svg" alt="" width={14} height={14} /> Google Calendar
        </span>,
      ],
      ["Duration", "45 minutes"],
      ["Confirm before booking", <Toggle key="t" on />],
    ],
  },
  handoff: {
    when: "When the customer asks for a person, is upset, or needs an order changed after dispatch.",
    yes: ["Can I talk to someone?", "This is the third time my order is late"],
    no: ["Where is my order?", "Do you have this in blue?"],
    settings: [
      ["Wait for a human", "30 seconds"],
      ["Fallback message", <span key="f" className="pm-ell">Our team will reply on WhatsApp within 2 hours.</span>],
      ["Email alert", <span key="e" className="pm-row"><Toggle on /> <span className="pm-hxs">support@lumenhome.in</span></span>],
    ],
  },
  ticket: {
    when: "When an issue needs follow-up: a damaged item, a refund request or missing parts.",
    yes: ["My lamp arrived broken", "I still haven't got my refund"],
    no: ["How long does delivery take?", "Is this in stock?"],
    settings: [
      ["Default priority", <Pill key="p" tone="amber" dot>Medium</Pill>],
      ["Assign to", "Support team"],
      ["Notify customer", <Toggle key="t" on />],
    ],
  },
};

export function SkillsScreen({ editing = null }: { editing?: "booking" | "handoff" | "ticket" | null }) {
  const ed = editing ? SKILL_EDIT[editing] : null;
  const edSkill = SKILLS.find((s) => s.id === editing);
  const label = edSkill
    ? `Steps AI skill editor for ${edSkill.name}: a plain-English rule for when to use it, with examples that should and should not trigger it`
    : "Steps AI agent skills: book appointment with Google Calendar, create ticket, create customer in HubSpot, human handoff, web search switched off and a custom skill";
  return (
    <Shot label={label}>
      <AppWindow title="Agents · Sales agent" active="Agents">
        <div className="pm-pad">
          <Head title="Sales agent" crumb="Agents /">
            <Pill tone="green" dot>
              Live
            </Pill>
          </Head>
          <div className="pm-tabs pm-tabs--line pm-in" style={st(1)}>
            <span className="pm-hxs">Overview</span>
            <span className="pm-hs">Knowledge</span>
            <span className="is-on">Skills</span>
            <span>Channels</span>
            <span className="pm-hs">Apps</span>
          </div>
          {!ed ? (
            <div className="pm-skills">
              {SKILLS.map((s, i) => (
                <div key={s.id} className={`pm-skill pm-in${s.on ? "" : " is-off"}`} style={st(2 + i)}>
                  <span className="pm-skill-ic">
                    <s.Icon size={16} />
                  </span>
                  <span className="pm-skill-b">
                    <b>
                      {s.name} {s.custom && <Pill tone="purple">Custom</Pill>}
                    </b>
                    <span className="pm-muted pm-ell">{s.desc}</span>
                  </span>
                  <span className="pm-skill-prov pm-hs">
                    {s.prov && <img src={`/brands/integrations/${s.prov}.svg`} alt="" width={14} height={14} />}
                    {s.provName}
                  </span>
                  <Toggle on={s.on} />
                </div>
              ))}
            </div>
          ) : (
            <div className="pm-skedit">
              <div className="pm-sklist pm-hs">
                {SKILLS.map((s, i) => (
                  <span key={s.id} className={`pm-sklist-i pm-in${s.id === editing ? " is-sel" : ""}`} style={st(2 + i)}>
                    <s.Icon size={14} />
                    <span className="pm-ell">{s.name}</span>
                  </span>
                ))}
              </div>
              <div className="pm-editor pm-in" style={st(3)}>
                <span className="pm-row-between">
                  <b className="pm-editor-t">{edSkill?.name}</b>
                  <Toggle on />
                </span>
                <span className="pm-label">When to use</span>
                <span className="pm-textarea pm-ring">{ed?.when}</span>
                <div className="pm-examples">
                  <div className="pm-ex pm-in" style={st(5)}>
                    <span className="pm-label pm-label--yes">
                      <Check size={13} strokeWidth={3} /> Should trigger
                    </span>
                    {ed?.yes.map((x) => (
                      <span key={x} className="pm-ex-i">
                        &ldquo;{x}&rdquo;
                      </span>
                    ))}
                  </div>
                  <div className="pm-ex pm-in" style={st(6)}>
                    <span className="pm-label pm-label--no">Should not trigger</span>
                    {ed?.no.map((x) => (
                      <span key={x} className="pm-ex-i">
                        &ldquo;{x}&rdquo;
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pm-settings">
                  {ed?.settings.map(([k, v], i) => (
                    <span key={k} className="pm-set pm-in" style={st(7 + i)}>
                      <span className="pm-muted">{k}</span>
                      <span className="pm-set-v">{v}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </AppWindow>
    </Shot>
  );
}

/* ------------------------------------------------------------------ */
/* Apps                                                                */
/* ------------------------------------------------------------------ */

export function AppsScreen({
  highlight,
  connected = ["shopify", "google-calendar", "hubspot"],
}: {
  highlight?: string;
  connected?: string[];
}) {
  let list = APPS.slice(0, 12);
  if (highlight && !list.some((a) => a.slug === highlight)) {
    const h = APPS.find((a) => a.slug === highlight);
    if (h) list = [h, ...list.slice(0, 11)];
  }
  const hName = APPS.find((a) => a.slug === highlight)?.name;
  return (
    <Shot
      label={`Steps AI apps page under Resources: a grid of integrations with connected status${hName ? `, with ${hName} ready to add to an agent` : ""}`}
    >
      <AppWindow title="Resources · Apps" active="Resources">
        <div className="pm-pad">
          <Head title="Apps" crumb="Resources /">
            <span className="pm-search pm-hxs">
              <Search size={14} /> Search apps
            </span>
          </Head>
          <div className="pm-chips pm-in" style={st(1)}>
            <span className="is-on">All</span>
            <span>E-commerce</span>
            <span>Calendar</span>
            <span className="pm-hs">CRM &amp; support</span>
            <span className="pm-hs">Shipping</span>
          </div>
          <div className="pm-apps">
            {list.map((a, i) => {
              const isOn = connected.includes(a.slug);
              const isH = a.slug === highlight;
              return (
                <div key={a.slug} className={`pm-app pm-in${isH ? " pm-ring is-h" : ""}`} style={st(2 + i)}>
                  <span className="pm-app-top">
                    <AppLogo slug={a.slug} size={22} />
                    {isOn && (
                      <Pill tone="green" dot>
                        Connected
                      </Pill>
                    )}
                  </span>
                  <b className="pm-ell">{a.name}</b>
                  <span className="pm-muted">{a.cat}</span>
                  {isH ? (
                    <Btn kind="primary" icon={isOn ? Plus : Zap}>
                      {isOn ? "Add to agent" : "Connect"}
                    </Btn>
                  ) : (
                    !isOn && <Btn kind="ghost">Connect</Btn>
                  )}
                  {isH && <Cursor />}
                </div>
              );
            })}
          </div>
        </div>
      </AppWindow>
    </Shot>
  );
}

export function AppConnectCard({
  app,
  name,
  agent = "Sales agent",
  capabilities,
}: {
  app: string;
  name: string;
  agent?: string;
  capabilities: string[];
}) {
  return (
    <Shot
      className="pm-shot--card"
      label={`${name} connected to the Steps AI workspace and added to the ${agent}. It lets the agent: ${capabilities.join(", ")}`}
    >
      <div className="pm-acard">
        <div className="pm-acard-head pm-in" style={st(0)}>
          <AppLogo slug={app} size={26} />
          <span>
            <b className="pm-h">{name}</b>
            <span className="pm-muted">Resources · Apps</span>
          </span>
        </div>
        <div className="pm-acard-steps">
          <span className="pm-acard-step pm-in" style={st(1)}>
            <i>
              <Check size={13} strokeWidth={3} />
            </i>
            Connected to workspace
          </span>
          <span className="pm-acard-line pm-in" style={st(2)} />
          <span className="pm-acard-step pm-in" style={st(2)}>
            <i>
              <Check size={13} strokeWidth={3} />
            </i>
            Added to {agent}
          </span>
        </div>
        <span className="pm-label pm-in" style={st(3)}>
          What it unlocks
        </span>
        <ul className="pm-acard-caps">
          {capabilities.map((c, i) => (
            <li key={c} className="pm-in" style={st(4 + i)}>
              <CircleCheck size={15} />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Shot>
  );
}

/* ------------------------------------------------------------------ */
/* Campaigns                                                           */
/* ------------------------------------------------------------------ */

function CampaignSummary({ i }: { i: number }) {
  return (
    <div className="pm-csum pm-in pm-hs" style={st(i)}>
      <span className="pm-card-t">Diwali sale broadcast</span>
      <span className="pm-set">
        <span className="pm-muted">Sender</span>
        <span className="pm-set-v pm-row">
          <ChannelMark ch="whatsapp" size={14} /> Lumen Home
        </span>
      </span>
      <span className="pm-set">
        <span className="pm-muted">Template</span>
        <span className="pm-set-v pm-ell">diwali_offer · Marketing</span>
      </span>
      <div className="pm-wa">
        <span className="pm-wa-b">
          Hi Priya, our Diwali sale is live: 20% off lamps and decor till 2 Nov.
          <span className="pm-wa-link">lumenhome.in/diwali</span>
          <span className="pm-wa-t">10:30</span>
        </span>
      </div>
    </div>
  );
}

export function CampaignScreen({ step = "review" }: { step?: "audience" | "review" | "results" }) {
  const steps = ["Sender", "Template", "Audience", "Message", "Review"];
  const label =
    step === "audience"
      ? "Steps AI WhatsApp campaign, audience step: choose a CSV upload, saved list, Shopify customers or a tag; 842 Shopify customers matched, up to 1,000 recipients per send"
      : step === "results"
        ? "Steps AI WhatsApp campaign results: 806 sent, 788 delivered, 612 read and 18 failed with a retry failed button"
        : "Steps AI WhatsApp campaign review: 842 matched, 806 eligible, 36 skipped and the estimated cost, ready to launch now or schedule";
  return (
    <Shot label={label}>
      <AppWindow title="Campaigns" active="Campaigns">
        <div className="pm-pad">
          <Head title={step === "results" ? "Diwali sale broadcast" : "New broadcast"} crumb="Campaigns /">
            {step === "results" ? (
              <Pill tone="green" dot>
                Sent Oct 18, 10:30 AM
              </Pill>
            ) : (
              <span className="pm-muted pm-hxs">Draft saved</span>
            )}
          </Head>
          {step !== "results" && <Stepper steps={steps} current={step === "audience" ? 2 : 4} />}

          {step === "audience" && (
            <div className="pm-camp">
              <div className="pm-camp-main">
                <span className="pm-label pm-in" style={st(2)}>
                  Who should get this message?
                </span>
                <div className="pm-sources">
                  {(
                    [
                      [Upload, "Upload CSV", "Name and phone columns"],
                      [List, "Saved list", "VIP buyers · 214"],
                      [ShoppingBag, "Shopify customers", "Synced from your store"],
                      [Tag, "Tag", "Contacts with a CRM tag"],
                    ] as [LucideIcon, string, string][]
                  ).map(([Icon, t, s], i) => (
                    <span key={t} className={`pm-source pm-in${i === 2 ? " is-sel pm-ring" : ""}`} style={st(3 + i)}>
                      <span className="pm-radio" />
                      <Icon size={16} />
                      <span>
                        <b>{t}</b>
                        <span className="pm-muted pm-ell">{s}</span>
                      </span>
                    </span>
                  ))}
                </div>
                <span className="pm-filter pm-in" style={st(7)}>
                  <span className="pm-muted">Filter</span>
                  <Select>Ordered in the last 90 days</Select>
                </span>
                <div className="pm-matched pm-in" style={st(8)}>
                  <Users size={18} />
                  <span>
                    <b>842 contacts matched</b>
                    <span className="pm-muted">Max 1,000 recipients per send</span>
                  </span>
                  <span className="pm-bar pm-bar--wide">
                    <i style={{ width: "84.2%" }} />
                  </span>
                </div>
              </div>
              <CampaignSummary i={4} />
            </div>
          )}

          {step === "review" && (
            <div className="pm-camp">
              <div className="pm-camp-main">
                <div className="pm-stats">
                  {(
                    [
                      ["Matched", "842", "Shopify customers"],
                      ["Eligible", "806", "Opted in, valid number"],
                      ["Skipped", "36", "21 no opt-in, 15 invalid"],
                      ["Estimated cost", "₹696", "806 × ₹0.86 per message"],
                    ] as [string, string, string][]
                  ).map(([k, v, s], i) => (
                    <div key={k} className="pm-stat pm-in" style={st(2 + i)}>
                      <span className="pm-muted">{k}</span>
                      <b>{v}</b>
                      <span className="pm-muted pm-ell">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="pm-reviewlist pm-in" style={st(6)}>
                  <span className="pm-set">
                    <span className="pm-muted">Audience</span>
                    <span className="pm-set-v">Shopify · ordered in last 90 days</span>
                  </span>
                  <span className="pm-set">
                    <span className="pm-muted">Variables</span>
                    <span className="pm-set-v pm-ell">{"{{first_name}}"} → customer first name</span>
                  </span>
                </div>
                <div className="pm-actions pm-in" style={st(7)}>
                  <Btn icon={Clock}>Schedule</Btn>
                  <Btn kind="primary" icon={Send} ring>
                    Launch now
                  </Btn>
                </div>
              </div>
              <CampaignSummary i={5} />
            </div>
          )}

          {step === "results" && (
            <div className="pm-results">
              <div className="pm-stats pm-stats--4">
                {(
                  [
                    ["Sent", "806", "100%", 100],
                    ["Delivered", "788", "97.8%", 97.8],
                    ["Read", "612", "75.9%", 75.9],
                    ["Failed", "18", "2.2%", 2.2],
                  ] as [string, string, string, number][]
                ).map(([k, v, p, w], i) => (
                  <div key={k} className={`pm-stat pm-in${k === "Failed" ? " is-fail" : ""}`} style={st(1 + i)}>
                    <span className="pm-muted">{k}</span>
                    <b>{v}</b>
                    <span className="pm-bar">
                      <i style={{ width: `${Math.max(w, 3)}%` }} />
                    </span>
                    <span className="pm-muted">{p}</span>
                  </div>
                ))}
              </div>
              <div className="pm-table pm-in" style={st(5)}>
                <div className="pm-tr pm-th pm-cols-res">
                  <span>Recipient</span>
                  <span>Status</span>
                  <span className="pm-hxs">Updated</span>
                </div>
                {(
                  [
                    ["Priya Sharma", "Read", "green", "10:42 AM"],
                    ["Rahul Mehta", "Delivered", "blue", "10:31 AM"],
                    ["Meera Shah", "Read", "green", "10:36 AM"],
                    ["Arjun Nair", "Failed · not on WhatsApp", "red", "10:30 AM"],
                  ] as [string, string, Tone, string][]
                ).map(([n, s, tone, t], i) => (
                  <div key={n} className="pm-tr pm-cols-res pm-in" style={st(6 + i)}>
                    <span className="pm-cell-who">
                      <Avatar name={n} size={24} />
                      <b className="pm-ell">{n}</b>
                    </span>
                    <span>
                      <Pill tone={tone} dot>
                        {s}
                      </Pill>
                    </span>
                    <span className="pm-muted pm-hxs">{t}</span>
                  </div>
                ))}
              </div>
              <div className="pm-actions pm-in" style={st(10)}>
                <span className="pm-muted pm-hxs">18 messages failed to deliver</span>
                <Btn kind="primary" icon={RotateCcw} ring>
                  Retry failed
                </Btn>
              </div>
            </div>
          )}
        </div>
      </AppWindow>
    </Shot>
  );
}

/* ------------------------------------------------------------------ */
/* Agent setup                                                         */
/* ------------------------------------------------------------------ */

const PAGES: [string, string][] = [
  ["/", "Home"],
  ["/collections/lamps", "Lamps"],
  ["/products/oak-bedside-lamp", "Oak bedside lamp"],
  ["/pages/shipping-policy", "Shipping policy"],
  ["/pages/returns", "Returns and exchanges"],
  ["/pages/faq", "FAQ"],
];

export function AgentSetupScreen({ step = "website" }: { step?: "website" | "persona" | "channels" }) {
  const label =
    step === "persona"
      ? "Steps AI agent setup, persona step: pick a sales assistant, support agent or receptionist and set the tone"
      : step === "channels"
        ? "Steps AI agent setup, channels step: website widget installed and WhatsApp, Instagram and Messenger connected with one Meta login"
        : "Steps AI agent setup, website step: paste your website address and the agent finds and learns 48 pages";
  return (
    <Shot label={label}>
      <AppWindow title="Agents · New agent" active="Agents">
        <div className="pm-pad">
          <Head title="Create your agent" crumb="Agents /" />
          <Stepper steps={["Website", "Persona", "Channels", "Go live"]} current={step === "website" ? 0 : step === "persona" ? 1 : 2} />

          {step === "website" && (
            <div className="pm-setup">
              <span className="pm-label pm-in" style={st(2)}>
                Your website
              </span>
              <div className="pm-urlrow pm-in" style={st(3)}>
                <span className="pm-input">
                  <Globe size={15} className="pm-muted" />
                  https://lumenhome.in
                </span>
                <Btn kind="primary" icon={Search}>
                  Scan
                </Btn>
              </div>
              <div className="pm-found pm-in" style={st(4)}>
                <span className="pm-row-between">
                  <b>48 pages found</b>
                  <span className="pm-muted">Learning 36 of 48</span>
                </span>
                <span className="pm-bar">
                  <i className="pm-bar-live" style={{ width: "75%" }} />
                </span>
              </div>
              <div className="pm-pages">
                {PAGES.map(([p, t], i) => (
                  <span key={p} className="pm-page pm-in" style={st(5 + i)}>
                    <FileText size={14} className="pm-muted" />
                    <b className="pm-ell">{t}</b>
                    <span className="pm-muted pm-ell pm-hxs">{p}</span>
                    {i < 5 ? (
                      <span className="pm-ok">
                        <Check size={13} strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="pm-spin" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {step === "persona" && (
            <div className="pm-setup">
              <span className="pm-label pm-in" style={st(2)}>
                What should this agent do?
              </span>
              <div className="pm-personas">
                {(
                  [
                    [ShoppingBag, "Sales assistant", "Recommends products, answers stock and delivery questions, captures leads"],
                    [Headset, "Support agent", "Tracks orders, handles returns, creates tickets"],
                    [CalendarCheck, "Receptionist", "Answers questions and books appointments"],
                  ] as [LucideIcon, string, string][]
                ).map(([Icon, t, s], i) => (
                  <span key={t} className={`pm-persona pm-in${i === 0 ? " is-sel pm-ring" : ""}`} style={st(3 + i)}>
                    <span className="pm-skill-ic">
                      <Icon size={16} />
                    </span>
                    <b>{t}</b>
                    <span className="pm-muted">{s}</span>
                  </span>
                ))}
              </div>
              <div className="pm-setrow pm-in" style={st(6)}>
                <span className="pm-set">
                  <span className="pm-muted">Agent name</span>
                  <span className="pm-input pm-input--sm">Aria</span>
                </span>
                <span className="pm-set">
                  <span className="pm-muted">Tone</span>
                  <span className="pm-seg">
                    <span className="is-on">Friendly</span>
                    <span>Professional</span>
                  </span>
                </span>
              </div>
              <div className="pm-greet pm-in" style={st(7)}>
                <Avatar name="Aria" size={26} />
                <span className="pm-msg pm-msg--ai">
                  Hi, I&apos;m Aria from Lumen Home. Looking for something for your bedroom or living room?
                </span>
              </div>
            </div>
          )}

          {step === "channels" && (
            <div className="pm-setup">
              <div className="pm-chan pm-in" style={st(2)}>
                <span className="pm-chmark pm-chmark--web pm-chan-ic">
                  <Code size={16} />
                </span>
                <span className="pm-chan-b">
                  <b>Website widget</b>
                  <span className="pm-muted pm-ell">One line of code, works on Shopify and WordPress</span>
                </span>
                <span className="pm-row">
                  <Pill tone="green" dot>
                    Installed
                  </Pill>
                  <Copy size={14} className="pm-muted pm-hxs" />
                </span>
              </div>
              <div className="pm-meta pm-in" style={st(3)}>
                <span className="pm-row-between pm-meta-head">
                  <span>
                    <b>Meta channels</b>
                    <span className="pm-muted">One login connects all three</span>
                  </span>
                  <Btn kind="soft" icon={CircleCheck}>
                    Connected with Meta
                  </Btn>
                </span>
                {(
                  [
                    ["whatsapp", "WhatsApp", "+91 98200 41234"],
                    ["instagram", "Instagram", "@lumenhome"],
                    ["messenger", "Messenger", "Lumen Home page"],
                  ] as [Channel, string, string][]
                ).map(([ch, n, acct], i) => (
                  <div key={ch} className={`pm-chan pm-chan--in pm-in${i === 0 ? " pm-ring" : ""}`} style={st(4 + i)}>
                    <ChannelMark ch={ch} size={26} />
                    <span className="pm-chan-b">
                      <b>{n}</b>
                      <span className="pm-muted pm-ell">{acct}</span>
                    </span>
                    <Pill tone="green" dot>
                      Connected
                    </Pill>
                  </div>
                ))}
              </div>
              <div className="pm-actions pm-in" style={st(7)}>
                <Btn kind="primary" icon={ArrowRight}>
                  Continue to go live
                </Btn>
              </div>
            </div>
          )}
        </div>
      </AppWindow>
    </Shot>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

export function ProductMockupGallery() {
  const items: [string, ReactNode][] = [
    ["Inbox · list", <InboxScreen key="a" highlight="list" />],
    ["Inbox · live request", <InboxScreen key="b" highlight="live" />],
    ["Inbox · human reply", <InboxScreen key="c" highlight="reply" />],
    ["CRM · customers", <CrmScreen key="d" tab="customers" />],
    ["CRM · tickets", <CrmScreen key="e" tab="tickets" />],
    ["CRM · live requests", <CrmScreen key="f" tab="live" />],
    ["Analytics · overview", <AnalyticsScreen key="g" focus="overview" />],
    ["Analytics · heatmap", <AnalyticsScreen key="h" focus="heatmap" />],
    ["Analytics · questions", <AnalyticsScreen key="i" focus="questions" />],
    ["Calendar", <CalendarScreen key="j" />],
    ["Workflow · cart", <WorkflowScreen key="k" template="cart" />],
    ["Workflow · COD", <WorkflowScreen key="l" template="cod" />],
    ["Workflow · review", <WorkflowScreen key="m" template="review" />],
    ["Skills · list", <SkillsScreen key="n" />],
    ["Skills · booking", <SkillsScreen key="o" editing="booking" />],
    ["Skills · handoff", <SkillsScreen key="p" editing="handoff" />],
    ["Skills · ticket", <SkillsScreen key="q" editing="ticket" />],
    ["Apps", <AppsScreen key="r" highlight="shopify" />],
    [
      "App connect card",
      <AppConnectCard
        key="s"
        app="shopify"
        name="Shopify"
        capabilities={["Look up orders and delivery status", "Recommend products in stock", "Trigger cart and COD workflows"]}
      />,
    ],
    ["Campaign · audience", <CampaignScreen key="t" step="audience" />],
    ["Campaign · review", <CampaignScreen key="u" step="review" />],
    ["Campaign · results", <CampaignScreen key="v" step="results" />],
    ["Agent setup · website", <AgentSetupScreen key="w" step="website" />],
    ["Agent setup · persona", <AgentSetupScreen key="x" step="persona" />],
    ["Agent setup · channels", <AgentSetupScreen key="y" step="channels" />],
  ];
  return (
    <div className="pm-gallery">
      {items.map(([t, el]) => (
        <figure key={t} className="pm-gallery-i">
          <figcaption>{t}</figcaption>
          {el}
        </figure>
      ))}
    </div>
  );
}
