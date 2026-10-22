'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Package, ShoppingBag, ShoppingCart, Tag, Truck, Workflow } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { CtaBand, Faq } from '@/components/sections';
import { ChannelLogo } from '@/app/channel-chat';
import { asset } from '@/lib/asset';
import type { IntegrationApp, IntegrationPage } from '@/content/types';
import styles from './shopify-integration.module.css';

const featureIcons = [Truck, ShoppingBag, ShoppingCart, Tag, Workflow, Package, ShoppingBag];

export function ShopifyIntegration({ page, related }: { page: IntegrationPage; related: IntegrationApp[] }) {
  const [active, setActive] = useState(0);
  const steps = page.walkthrough?.steps ?? [];
  const step = steps[active];
  return <SiteFrame>{onOpen => <div className={styles.page}>
    <section className={styles.hero}>
      <div className="container">
        <Link className={styles.back} href="/integrations/"><ArrowLeft size={14} />All integrations</Link>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className={styles.identity}><img src={asset('/brands/integrations/shopify.svg')} alt="" width={32} height={36} /><span>{page.hero.kicker}</span></div>
            <h1>{page.hero.title}</h1>
            <p>{page.hero.body}</p>
            <div className={styles.actions}><button className="button" onClick={() => onOpen('Book a demo')}>Book a demo <ArrowRight size={17} /></button><a href="#shopify-journey">Explore the shopping journey <ArrowRight size={16} /></a></div>
            <div className={styles.channels}>{page.hero.channels?.map(channel => <span key={channel}><ChannelLogo channel={channel} />{channel}</span>)}</div>
          </div>
          <div className={styles.heroVisual}>
            <img className={styles.heroImage} src={asset('/images/integrations/shopify/linen-store-hero.webp')} width={1200} height={900} alt="Linen shirt packed for an online order in a clothing store studio" fetchPriority="high" />
            <div className={styles.visualLabel}><img src={asset('/brands/integrations/shopify.svg')} alt="" width={21} height={24} />Store data → Steps AI → Customer</div>
            <div className={styles.orderCard}><span className={styles.eyebrow}>Illustrative conversation</span><p>{page.demo.lines[0].text}</p><div><Check size={16} /><strong>{page.demo.lookup.title}</strong><span>Fulfilled</span></div><p className={styles.reply}>{page.demo.lines[1].text}</p></div>
          </div>
        </div>
        <div className={styles.reassurance}><Check size={18} /><p>{page.hero.reassurance}</p></div>
      </div>
    </section>

    <nav className={`container ${styles.sectionNav}`} aria-label="Shopify page sections"><a href="#shopify-journey">Customer journey</a><a href="#shopify-capabilities">Capabilities</a><a href="#shopify-workflows">Workflows</a><a href="#shopify-setup">Setup</a><a href="#shopify-faq">Questions</a></nav>

    {step && <section id="shopify-journey" className={`container ${styles.section}`}>
      <div className={styles.sectionHead}><div><span className={styles.eyebrow}>The shopping journey</span><h2>{page.walkthrough!.title}</h2></div><p>{page.walkthrough!.intro}</p></div>
      <div className={styles.journey}>
        <div className={styles.steps} role="group" aria-label="Choose a shopping journey step">{steps.map((item, index) => <button key={item.label} aria-pressed={index === active} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{item.label}</strong><p>{item.note}</p></div><ArrowRight size={17} /></button>)}</div>
        <div className={styles.stage} aria-live="polite" aria-atomic="true">
          <div className={styles.stageHeader}><span><ChannelLogo channel="WhatsApp" />Shopping conversation</span><small>Illustration · {active + 1} / {steps.length}</small></div>
          <div className={styles.stageContent}>
            <div className={styles.product}><ShoppingBag size={24} /><div><strong>Linen shirt</strong><span>Sand · Medium</span></div><span className={styles.status}>{['Catalogue', 'In stock', 'SUMMER10', 'Checkout'][active]}</span></div>
            <p className={styles.customer}>{step.customer}</p>
            <div className={styles.agent}><img src={asset('/brands/steps-original.png')} alt="Steps AI" width={28} height={28} /><p>{step.agent}</p></div>
            <div className={styles.result}><Check size={17} />{step.result}</div>
          </div>
          <div className={styles.stageFooter}><span>Payment stays on your Shopify checkout.</span><button onClick={() => setActive((active + 1) % steps.length)}>{active === steps.length - 1 ? 'Start again' : 'Next step'}<ArrowRight size={16} /></button></div>
        </div>
      </div>
    </section>}

    <section id="shopify-capabilities" className={styles.capabilityBand}><div className="container">
      <div className={styles.sectionHead}><div><span className={styles.eyebrow}>Connected to your store</span><h2>{page.useCases.title}</h2></div><p>{page.useCases.intro}</p></div>
      <div className={styles.capabilities}>{page.useCases.items.map((item, index) => { const Icon = featureIcons[index] ?? ShoppingBag; return <article key={item.title}><Icon size={23} /><div><h3>{item.title}</h3><p>{item.body}</p></div></article>; })}</div>
    </div></section>

    {page.workflows && <section id="shopify-workflows" className={`container ${styles.section} ${styles.workflowLayout}`}>
      <div className={styles.workflowIntro}><span className={styles.eyebrow}>After the conversation</span><h2>{page.workflows.title}</h2><p>{page.workflows.intro}</p><div className={styles.workflowKey}><span>Store event</span><ArrowRight size={16} /><span>Your workflow</span><ArrowRight size={16} /><span>Follow-up</span></div><Link href="/features/workflow-builder/">Explore the workflow builder <ArrowRight size={16} /></Link></div>
      <div className={styles.workflows}>{page.workflows.items.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div>
    </section>}

    <section id="shopify-setup" className={styles.setupBand}><div className="container">
      <div className={styles.sectionHead}><div><span className={styles.eyebrow}>How to connect</span><h2>Connect Shopify in three steps.</h2></div><p>Connect your store, add it to your agent and choose the features you want to use.</p></div>
      <ol className={styles.setup}>{page.setup.items.map((item, index) => <li key={item.title}><span>{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div>{index === 0 && <div className={styles.setupPath} aria-label="Setup navigation"><span>Resources</span><ArrowRight size={14} /><span>Apps</span><ArrowRight size={14} /><span>Shopify</span></div>}</li>)}</ol>
      <aside className={styles.notes}><h3>{page.goodToKnow.title}</h3><ul>{page.goodToKnow.items.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul></aside>
    </div></section>
    <div id="shopify-faq"><Faq title={page.faq.title} items={page.faq.items} /></div>
    <section className={`container ${styles.related}`}><span className={styles.eyebrow}>Keep your tools connected</span><h2>Works alongside the rest of your store.</h2><div>{related.slice(0, 3).map(app => <Link key={app.slug} href={`/integrations/${app.slug}/`}><img src={asset(`/brands/integrations/${app.slug}.svg`)} alt="" width={32} height={32} /><span><strong>{app.name}</strong><small>{app.category}</small></span><ArrowRight size={18} /></Link>)}</div></section>
    <CtaBand cta={page.cta} onOpen={onOpen} />
  </div>}</SiteFrame>;
}
