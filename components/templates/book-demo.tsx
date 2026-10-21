'use client';
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Check, CircleCheck, Globe, Loader2, MessageSquare, ShoppingBag, UserPlus } from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { CALENDLY_URL } from '@/components/site/routes';
import { Float, LivePhone } from '@/components/premium/kit';

// /book-a-demo/: a short form that posts to /api/demo-request. The request is only shown as sent
// when the server confirms it; otherwise the visitor is told it did not go through.

const channels = ['Website', 'WhatsApp', 'Instagram', 'Messenger'];
const sees = [
  { icon: <Globe size={18} />, title: 'Your own website, answered', body: 'We point an agent at your site and ask it the questions your customers ask.' },
  { icon: <ShoppingBag size={18} />, title: 'Real orders and bookings', body: 'If you use Shopify, WooCommerce or a calendar, we show the agent checking live data.' },
  { icon: <UserPlus size={18} />, title: 'What happens when it cannot answer', body: 'You see the handoff to your team and what the conversation looks like in the inbox.' },
];

type State = 'idle' | 'sending' | 'sent' | 'error' | 'not-configured';

export function BookDemoTemplate() {
  const [state, setState] = useState<State>('idle'), [picked, setPicked] = useState<string[]>(['WhatsApp']), [calendly, setCalendly] = useState(CALENDLY_URL);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState('sending');
    // Prefill Calendly with what they just typed, for the "pick a time" step.
    setCalendly(`${CALENDLY_URL}?${new URLSearchParams({ name: String(form.get('name') ?? ''), email: String(form.get('email') ?? '') })}`);
    try {
      const res = await fetch('/api/demo-request/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...Object.fromEntries(form), channels: picked.join(', ') }) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      setState(res.ok && json.ok ? 'sent' : json.error === 'not-configured' ? 'not-configured' : 'error');
    } catch { setState('error'); }
  }
  return <SiteFrame>{() => <div className="wb pp">
    <section className="wb-hero pp-hero bd-hero"><div className="container bd-layout">
      <div className="bd-copy">
        <div className="wb-kicker pp-kicker"><span className="pp-kicker-ico"><CalendarDays size={16} /></span>Book a demo</div>
        <h1>See your agent answer <span className="wb-accent">your</span> customers.</h1>
        <p className="wb-lead">Tell us a little about your business. We will set up a demo around your own website, channels and tools, so you see real answers instead of a scripted tour.</p>
        <ul className="bd-sees">{sees.map(s => <li key={s.title}><span>{s.icon}</span><div><strong>{s.title}</strong><small>{s.body}</small></div></li>)}</ul>
        <div className="bd-phone"><LivePhone kind="WhatsApp" business="Your store" className="pp-hero-phone" period={9000} lines={[
          { from: 'customer', text: 'Where is my order 2087?', at: 400 },
          { from: 'agent', text: 'It has shipped and is out for delivery today.', at: 2300 },
          { from: 'customer', text: 'Can I speak to someone?', at: 4600 },
          { from: 'agent', text: 'Of course. Someone from our team will join shortly.', at: 6500 },
        ]} /><Float className="bd-float">{<div className="pp-result"><span><CircleCheck size={16} /></span><div><strong>Answered from your store</strong><small>This is what the demo shows</small></div></div>}</Float></div>
      </div>

      <div className="bd-card">
        {state === 'sent' ? <div className="bd-done"><span><Check size={26} /></span><h2>Thank you. Your request is in.</h2><p>Pick a time now, or we will reply by email to arrange one that suits you.</p><a className="wb-btn" href={calendly} target="_blank" rel="noopener noreferrer">Pick a time <CalendarDays size={16} /></a><Link className="bd-back" href="/">Back to the homepage <ArrowRight size={14} /></Link></div> : <form onSubmit={submit} noValidate={false}>
          <h2>Book your demo</h2>
          <p className="bd-sub">It takes a minute. Fields marked * are required.</p>
          <div className="bd-row"><label>Your name *<input name="name" required autoComplete="name" placeholder="Priya Shah" /></label><label>Work email *<input name="email" type="email" required autoComplete="email" placeholder="priya@yourstore.com" /></label></div>
          <div className="bd-row"><label>Company *<input name="company" required autoComplete="organization" placeholder="Your business" /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" /></label></div>
          <label>Website<input name="website" type="url" placeholder="https://yourstore.com" /></label>
          <fieldset><legend>Where do customers message you?</legend><div className="bd-chips">{channels.map(c => {
            const on = picked.includes(c);
            return <button type="button" key={c} aria-pressed={on} className={on ? 'is-on' : ''} onClick={() => setPicked(p => on ? p.filter(x => x !== c) : [...p, c])}>{c === 'Website' ? <Globe size={14} /> : <ChannelLogo channel={c} />}{c}</button>;
          })}</div></fieldset>
          <label>What would you like to see?<textarea name="message" rows={3} placeholder="For example: order tracking on WhatsApp for our Shopify store." /></label>
          <input className="bd-hp" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="wb-btn bd-submit" disabled={state === 'sending'}>{state === 'sending' ? <><Loader2 size={16} className="bd-spin" />Sending</> : <>Book my demo <ArrowRight size={16} /></>}</button>
          {state === 'error' && <p className="bd-msg is-error" role="alert">Something went wrong and your request was not sent. Please try again in a moment.</p>}
          {state === 'not-configured' && <p className="bd-msg is-error" role="alert">Demo requests are not connected yet, so this was not sent. Please try again later.</p>}
          <p className="bd-fine"><MessageSquare size={13} />We only use these details to arrange your demo.</p>
        </form>}
      </div>
    </div></section>
  </div>}</SiteFrame>;
}
