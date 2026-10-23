'use client';
import { useEffect, useRef } from 'react';
import { CalendarDays, CircleCheck, Globe, ShoppingBag, UserPlus } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { CALENDLY_URL } from '@/components/site/routes';
import { Float, LivePhone } from '@/components/premium/kit';

// /book-a-demo/: Calendly's inline scheduler, so visitors pick a time straight away.

const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css';
type CalendlyWindow = Window & { Calendly?: { initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void } };

const sees = [
  { icon: <Globe size={18} />, title: 'Your own website, answered', body: 'We point an agent at your site and ask it the questions your customers ask.' },
  { icon: <ShoppingBag size={18} />, title: 'Real orders and bookings', body: 'If you use Shopify, WooCommerce or a calendar, we show the agent checking live data.' },
  { icon: <UserPlus size={18} />, title: 'What happens when it cannot answer', body: 'You see the handoff to your team and what the conversation looks like in the inbox.' },
];

// Loads Calendly's widget the first time the page is shown, then draws the scheduler in the div.
function CalendlyInline() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const url = `${CALENDLY_URL}?${new URLSearchParams({ hide_gdpr_banner: '1', background_color: 'ffffff', text_color: '0b1b3f', primary_color: '0c3474' })}`;
    const init = () => {
      const calendly = (window as CalendlyWindow).Calendly;
      if (cancelled || !calendly) return;
      el.innerHTML = '';
      calendly.initInlineWidget({ url, parentElement: el });
    };
    if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = WIDGET_CSS;
      document.head.appendChild(link);
    }
    if ((window as CalendlyWindow).Calendly) init();
    else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_JS}"]`);
      if (!script) {
        script = document.createElement('script');
        script.src = WIDGET_JS;
        script.async = true;
        document.body.appendChild(script);
      }
      script.addEventListener('load', init, { once: true });
    }
    return () => { cancelled = true; el.innerHTML = ''; };
  }, []);
  return <div ref={ref} className="bd-cal" />;
}

export function BookDemoTemplate() {
  return <SiteFrame>{() => <div className="wb pp">
    <section className="wb-hero pp-hero bd-hero"><div className="container bd-layout">
      <div className="bd-copy">
        <div className="wb-kicker pp-kicker"><span className="pp-kicker-ico"><CalendarDays size={16} /></span>Book a demo</div>
        <h1>See your agent answer <span className="wb-accent">your</span> customers.</h1>
        <p className="wb-lead">Pick a time that suits you. We will set up a demo around your own website, channels and tools, so you see real answers instead of a scripted tour.</p>
        <ul className="bd-sees">{sees.map(s => <li key={s.title}><span>{s.icon}</span><div><strong>{s.title}</strong><small>{s.body}</small></div></li>)}</ul>
        <div className="bd-phone"><LivePhone kind="WhatsApp" business="Your store" className="pp-hero-phone" period={9000} lines={[
          { from: 'customer', text: 'Where is my order 2087?', at: 400 },
          { from: 'agent', text: 'It has shipped and is out for delivery today.', at: 2300 },
          { from: 'customer', text: 'Can I speak to someone?', at: 4600 },
          { from: 'agent', text: 'Of course. Someone from our team will join shortly.', at: 6500 },
        ]} /><Float className="bd-float">{<div className="pp-result"><span><CircleCheck size={16} /></span><div><strong>Answered from your store</strong><small>This is what the demo shows</small></div></div>}</Float></div>
      </div>

      <div className="bd-card"><CalendlyInline /></div>
    </div></section>
  </div>}</SiteFrame>;
}
