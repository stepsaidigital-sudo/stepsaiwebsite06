'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { CtaBand, Faq } from '@/components/sections';
import { ChannelLogo } from '@/app/channel-chat';
import { asset } from '@/lib/asset';
import type { IntegrationApp, IntegrationPage } from '@/content/types';
import { integrationImages } from './integration-images';
import styles from './shopify-integration.module.css';

export function IntegrationDetail({ page, related }: { page: IntegrationPage; related: IntegrationApp[] }) {
  const [active, setActive] = useState(0);
  const steps = page.walkthrough?.steps ?? [];
  const step = steps[active];
  const image = integrationImages[page.slug];
  const logo = asset(`/brands/integrations/${page.slug}.svg`);
  const question = page.demo.lines.find(line => line.from === 'customer')?.text;
  const answer = page.demo.lines.find(line => line.from === 'agent')?.text;
  return <SiteFrame>{onOpen => <div className={styles.page}>
    <section className={styles.hero}><div className="container">
      <Link className={styles.back} href="/integrations/"><ArrowLeft size={14} />All integrations</Link>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <div className={styles.identity}><img src={logo} alt="" width={32} height={36} /><span>{page.hero.kicker}</span></div>
          <h1>{page.hero.title}</h1><p>{page.hero.body}</p>
          <div className={styles.actions}><button className="button" onClick={() => onOpen('Book a demo')}>Book a demo <ArrowRight size={17} /></button><a href="#integration-setup">How to connect <ArrowRight size={16} /></a></div>
          <div className={styles.channels}>{page.hero.channels?.map(channel => <span key={channel}><ChannelLogo channel={channel} />{channel}</span>)}</div>
        </div>
        <div className={styles.heroVisual}>
          <img className={styles.heroImage} src={asset(image.src)} alt={image.alt} width={1200} height={900} fetchPriority="high" />
          <div className={styles.visualLabel}><img src={logo} alt="" width={24} height={24} />{page.name} + Steps AI</div>
          <div className={styles.orderCard}><span className={styles.eyebrow}>Illustrative conversation</span><p>{question}</p><p className={styles.reply}>{answer}</p></div>
        </div>
      </div>
      {page.hero.reassurance && <div className={styles.reassurance}><Check size={18} /><p>{page.hero.reassurance}</p></div>}
    </div></section>
    <nav className={`container ${styles.sectionNav}`} aria-label={`${page.name} page sections`}><a href="#integration-capabilities">Capabilities</a><a href="#integration-example">{step ? 'Customer journey' : 'In practice'}</a>{page.workflows && <a href="#integration-workflows">Workflows</a>}<a href="#integration-setup">How to connect</a><a href="#integration-faq">Questions</a></nav>
    <section id="integration-capabilities" className={`container ${styles.section}`}>
      <div className={styles.sectionHead}><div><span className={styles.eyebrow}>{page.category}</span><h2>{page.useCases.title}</h2></div><p>{page.useCases.intro}</p></div>
      <div className={styles.capabilities}>{page.useCases.items.map(item => <article key={item.title}><Check size={22} /><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div>
    </section>
    <section id="integration-example" className={styles.capabilityBand}><div className="container">
      <div className={styles.sectionHead}><div><span className={styles.eyebrow}>In practice</span><h2>{page.walkthrough?.title ?? `A conversation connected to ${page.name}.`}</h2></div><p>{page.walkthrough?.intro ?? 'See the conversation alongside the information in your connected tool. Sample data is shown for illustration.'}</p></div>
      <div className={styles.journey}>
        {step ? <div className={styles.steps} role="group" aria-label={`${page.name} journey steps`}>{steps.map((item, index) => <button key={item.label} aria-pressed={active === index} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{item.label}</strong><p>{item.note}</p></div><ArrowRight size={17} /></button>)}</div>
          : <div className={styles.record}><div className={styles.identity}><img src={logo} alt="" width={32} height={32} /><span>{page.demo.lookup.title}</span></div><dl>{page.demo.lookup.rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><small>Illustrative record</small></div>}
        <div className={styles.stage}>
          <div className={styles.stageHeader}><span><ChannelLogo channel={page.demo.channel} />{page.demo.channel} conversation</span><small>Illustration{step && ` · ${active + 1} / ${steps.length}`}</small></div>
          <div className={styles.stageContent} aria-live={step ? 'polite' : 'off'} aria-atomic="true">
            {step ? <><p className={styles.customer}>{step.customer}</p><div className={styles.agent}><img src={asset('/brands/steps-original.png')} alt="Steps AI" width={28} height={28} /><p>{step.agent}</p></div><div className={styles.result}><Check size={17} />{step.result ?? step.label}</div></>
              : page.demo.lines.map((line, index) => line.from === 'customer' ? <p key={index} className={styles.customer}>{line.text}</p> : <div key={index} className={styles.agent}><img src={asset('/brands/steps-original.png')} alt="Steps AI" width={28} height={28} /><p>{line.text}</p></div>)}
          </div>
          {step && <div className={styles.stageFooter}><span>{step.note}</span><button onClick={() => setActive((active + 1) % steps.length)}>{active === steps.length - 1 ? 'Start again' : 'Next step'}<ArrowRight size={16} /></button></div>}
        </div>
      </div>
    </div></section>
    {page.workflows && <section id="integration-workflows" className={`container ${styles.section} ${styles.workflowLayout}`}><div className={styles.workflowIntro}><span className={styles.eyebrow}>Connected workflows</span><h2>{page.workflows.title}</h2><p>{page.workflows.intro}</p><Link href="/features/workflow-builder/">Explore the workflow builder <ArrowRight size={16} /></Link></div><div className={styles.workflows}>{page.workflows.items.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div></section>}
    <section id="integration-setup" className={styles.setupBand}><div className="container">
      <div className={styles.sectionHead}><div><span className={styles.eyebrow}>How to connect</span><h2>{page.setup.title}</h2></div><p>{page.setup.intro}</p></div>
      <ol className={styles.setup}>{page.setup.items.map((item, index) => <li key={item.title}><span>{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol>
      <aside className={styles.notes}><h3>{page.goodToKnow.title}</h3><ul>{page.goodToKnow.items.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul></aside>
    </div></section>
    <div id="integration-faq"><Faq title={page.faq.title} items={page.faq.items} /></div>
    <section className={`container ${styles.related}`}><span className={styles.eyebrow}>Explore more</span><h2>Integrations that work well with {page.name}.</h2><div>{related.slice(0, 3).map(app => <Link key={app.slug} href={`/integrations/${app.slug}/`}><img src={asset(`/brands/integrations/${app.slug}.svg`)} alt="" width={32} height={32} /><span><strong>{app.name}</strong><small>{app.category}</small></span><ArrowRight size={18} /></Link>)}</div></section>
    <CtaBand cta={page.cta} onOpen={onOpen} />
  </div>}</SiteFrame>;
}
