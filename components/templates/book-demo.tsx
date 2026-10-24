'use client';
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Check, Globe, Loader2, Phone, ArrowUpRight } from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { CALENDLY_URL } from '@/components/site/routes';
import styles from './book-demo.module.css';
import { DemoDetails } from './demo-details';

// /book-a-demo/: a short form that posts to /api/demo-request. The request is only shown as sent
// when the server confirms it; otherwise the visitor is told it did not go through.

const channels = ['Website', 'WhatsApp', 'Instagram', 'Messenger', 'Phone calls'];

type State = 'idle' | 'sending' | 'sent' | 'error' | 'not-configured';

export function BookDemoTemplate() {
  const [state, setState] = useState<State>('idle'), [picked, setPicked] = useState<string[]>([]), [calendly, setCalendly] = useState(CALENDLY_URL);
  const [dialCode, setDialCode] = useState('+91');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const phone = String(form.get('phone') ?? '').trim();
    const prefix = dialCode === 'other' ? String(form.get('customDialCode') ?? '').trim() : dialCode;
    form.set('phone', phone ? phone.startsWith('+') ? phone : `${prefix} ${phone}`.trim() : '');
    form.delete('customDialCode');
    setState('sending');
    // Prefill Calendly with what they just typed, for the "pick a time" step.
    setCalendly(`${CALENDLY_URL}?${new URLSearchParams({ name: String(form.get('name') ?? ''), email: String(form.get('email') ?? '') })}`);
    try {
      const res = await fetch('/api/demo-request/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...Object.fromEntries(form), channels: picked.join(', ') }) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      setState(res.ok && json.ok ? 'sent' : json.error === 'not-configured' ? 'not-configured' : 'error');
    } catch { setState('error'); }
  }
  return <SiteFrame>{() => <div className={`wb pp ${styles.demo}`}>
    <section className="wb-hero pp-hero bd-hero"><div className="container bd-layout">
      <div className="bd-copy">
        <div className="wb-kicker pp-kicker"><span className="pp-kicker-ico"><CalendarDays size={16} /></span>Request a demo</div>
        <h1><span className={styles.desktopTitle}>See what your<br/><span className={styles.headlineAccent}>AI agent can do.</span></span><span className={styles.mobileTitle}>Request a demo</span></h1>
        <p className="wb-lead">Your customer questions. Your business tools. A personal walkthrough of how Steps AI brings them together.</p>
        <div className={styles.highlights}><span><Check size={14}/> Your use case</span><span><Check size={14}/> Your channels</span><span><Check size={14}/> Your questions answered</span></div>
      </div>

      <div className="bd-card">
        {state === 'sent' ? <div className="bd-done" role="status"><span><Check size={26} /></span><h2>You’re all set.</h2><p>Your demo request is in. Our team will contact you by email to find a time that works for you.</p><div className={styles.scheduleOption}><strong>Prefer to choose a time now?</strong><p>Booking a slot is optional. Your request is already submitted.</p><a className="wb-btn" href={calendly} target="_blank" rel="noopener noreferrer">Choose a time <CalendarDays size={16} /></a></div><Link className="bd-back" href="/">Back to the homepage <ArrowRight size={14} /></Link></div> : <form onSubmit={submit} noValidate={false}>
          <div className={styles.formHeading}><h2>Let’s talk about your business.</h2><p className="bd-sub">Leave your details. We’ll help you take the next step.</p></div>
          <label className={styles.primaryLabel}>Your name *<input name="name" required autoComplete="name" placeholder="Your full name" /></label><label className={styles.primaryLabel}>Email *<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
          <label>Company *<input name="company" required autoComplete="organization" placeholder="Your company name" /></label>
          <fieldset className={styles.phoneField}><legend>Phone number <span>Optional</span></legend><div className={styles.phoneRow}><select aria-label="Country calling code" value={dialCode} onChange={e => setDialCode(e.target.value)}><option value="+91">India (+91)</option><option value="+1">US / Canada (+1)</option><option value="+44">UK (+44)</option><option value="+971">UAE (+971)</option><option value="+61">Australia (+61)</option><option value="+65">Singapore (+65)</option><option value="+966">Saudi Arabia (+966)</option><option value="+49">Germany (+49)</option><option value="+33">France (+33)</option><option value="+27">South Africa (+27)</option><option value="other">Other country</option></select><input aria-label="Phone number" name="phone" type="tel" autoComplete="tel-national" placeholder="Phone number" /></div>{dialCode === 'other' && <label className={styles.customCode}>Country calling code<input name="customDialCode" required type="tel" autoComplete="tel-country-code" placeholder="e.g. +81" pattern="\+[1-9][0-9]{0,3}" /></label>}</fieldset>
          <details className={styles.optional}><summary>Tailor your demo <span>Optional</span></summary><div className={styles.optionalBody}>
          <label>Website<input name="website" type="url" placeholder="https://yourstore.com" /></label>
          <fieldset><legend>Which channels would you like to explore?</legend><div className="bd-chips">{channels.map(c => {
            const on = picked.includes(c);
            return <button type="button" key={c} aria-pressed={on} className={on ? 'is-on' : ''} onClick={() => setPicked(p => on ? p.filter(x => x !== c) : [...p, c])}>{c === 'Website' ? <Globe size={14} /> : c==='Phone calls'?<Phone size={14}/>:<ChannelLogo channel={c} />}{c}</button>;
          })}</div></fieldset>
          <label>What would you like to see?<textarea name="message" rows={3} placeholder="For example: order tracking on WhatsApp for our Shopify store." /></label>
          </div></details>
          <input className="bd-hp" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className={styles.submitGroup}><button className="wb-btn bd-submit" disabled={state === 'sending'}>{state === 'sending' ? <><Loader2 size={16} className="bd-spin" />Sending your request</> : <>Request my demo <ArrowRight size={16} /></>}</button><p className={styles.reassurance}>Choose a time later. We’ll follow up by email.</p></div>
          {state === 'error' && <p className="bd-msg is-error" role="alert">Something went wrong and your request was not sent. Please try again in a moment.</p>}
          {state === 'not-configured' && <p className="bd-msg is-error" role="alert">Demo requests are not connected yet, so this was not sent. Please try again later.</p>}
          <p className="bd-fine">By submitting, you agree to be contacted about your demo. <Link href="/privacy-policy/">Privacy policy <ArrowUpRight size={12}/></Link></p>
        </form>}
      </div>
    </div></section>
    <DemoDetails />
  </div>}</SiteFrame>;
}
