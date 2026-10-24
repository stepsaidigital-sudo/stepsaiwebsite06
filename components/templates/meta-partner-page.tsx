'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { DEMO_URL } from '@/components/site/routes';
import { asset } from '@/lib/asset';
import styles from './meta-partner-page.module.css';

import { metaChannels as channels } from './meta/channel-content';
import { ChannelPreview } from './meta/channel-preview';
import { PartnerBenefits } from './meta/partner-benefits';
import { ChannelStories } from './meta/channel-stories';

export function MetaPartnerPage() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-revealed', 'true');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    pageRef.current?.querySelectorAll('[data-meta-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion(); updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= .35), { threshold: .35 });
    if (previewRef.current) observer.observe(previewRef.current);
    return () => { observer.disconnect(); preference.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', updateVisibility); };
  }, []);
  useEffect(() => {
    if (!inView || hovered || stopped || reducedMotion || !pageVisible) return;
    const timer = window.setTimeout(() => setSelected(current => (current + 1) % channels.length), 8000);
    return () => window.clearTimeout(timer);
  }, [selected, inView, hovered, stopped, reducedMotion, pageVisible]);
  return <SiteFrame>{() => <div ref={pageRef} className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true"/>
      <div className={styles.wrap}><div className={styles.heroGrid}>
        <div className={styles.intro}><div className={styles.partnership}><img src={asset('/brands/meta.svg')} alt="Meta" width={38} height={26}/><span>Meta Business Partner</span></div><h1>AI agents for<br/><span>WhatsApp, Instagram and Messenger.</span></h1><p>Send WhatsApp broadcasts and answer customer questions across all three channels.</p><div className={styles.actions}><Link className={styles.primary} href={DEMO_URL}>Request a demo <ArrowRight size={17}/></Link></div></div>
        <div ref={previewRef} className={styles.heroVisual} onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)} onPointerDown={event => { if (event.pointerType !== 'mouse') setStopped(true); }} onFocusCapture={event => { if (event.target.matches(':focus-visible')) setStopped(true); }}>

          <div className={styles.channelSwitch} role="group" aria-label="Preview a channel">{channels.map((channel, i) => <button key={channel.name} type="button" aria-pressed={selected === i} onPointerEnter={event => { if (event.pointerType === 'mouse') setSelected(i); }} onClick={() => setSelected(i)} onKeyDown={() => setStopped(true)}><img src={asset('/brands/' + channel.icon)} alt="" width={24} height={24}/>{channel.name}</button>)}</div>
          <div className={styles.heroChat} key={selected}><ChannelPreview channel={channels[selected]}/></div>
        </div>
      </div></div>
    </section>
    <ChannelStories/>
    <PartnerBenefits/>
    <section className={styles.questions}><div className={styles.wrap}><h2>Before you connect.</h2><div>
      <details><summary>Do the same features work on all three channels?</summary><p>Each app works differently. Instagram can send a private reply when someone comments your chosen keyword. WhatsApp broadcasts use message templates approved by Meta. We’ll show you what works for your business.</p></details>
      <details><summary>Can my team take over a conversation?</summary><p>Yes. Your team can step in from the shared inbox and read the conversation before replying.</p></details>
      <details><summary>Is this the Steps AI partner program?</summary><p>This page explains our Meta partnership. Agency and affiliate opportunities are part of the <Link href="/partners/">Steps AI partner program</Link>.</p></details>
    </div></div></section>
    <section className={styles.cta}><div className={styles.wrap} data-meta-reveal><div className={styles.ctaLogos}>{channels.map(channel => <img key={channel.name} src={asset('/brands/' + channel.icon)} alt={channel.name} width={29} height={29}/>)}</div><h2>See what your agent can do.</h2><p>Bring your customer questions. We’ll show you how Steps AI can help.</p><Link className={styles.primary} href={DEMO_URL}>Request a demo <ArrowRight size={17}/></Link><small>English, Hindi or Telugu · A time that works for you</small></div></section>
  </div>}</SiteFrame>;
}
