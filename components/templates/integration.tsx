'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check, Workflow } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { DragRail } from '@/components/site/motion';
import { ChatMock, CtaBand, Faq, FeatureList, GoodToKnow, PageHero, Reveal, SectionIntro, StepRows } from '@/components/sections';
import { ContextCard, StepTheatre, TimedChat, type Scene } from '@/components/sections/step-theatre';
import type { IntegrationApp, IntegrationPage } from '@/content/types';

export function AppLogo({ slug, size = 40 }: { slug: string; size?: number }) {
  return <img className="ig-logo" src={`/brands/integrations/${slug}.svg`} alt="" width={size} height={size} />;
}

// Steps AI and the app, joined by a live line, above the chat and the record
// the agent looked up. Illustrative only, with fictional sample data.
function ConnectedDemo({ page }: { page: IntegrationPage }) {
  return <div className="ig-demo">
    <Reveal className="ig-link-bar">
      <span className="ig-node"><img src="/brands/steps-original.png" alt="" width={28} height={28} />Steps AI</span>
      <span className="ig-wire" aria-hidden="true"><i /></span>
      <span className="ig-node"><AppLogo slug={page.slug} size={28} />{page.name}</span>
    </Reveal>
    <ChatMock channel={page.demo.channel} title="Your business" lines={page.demo.lines} />
    <Reveal className="ig-lookup">
      <div className="ig-lookup-head"><AppLogo slug={page.slug} size={22} /><strong>{page.demo.lookup.title}</strong><small>Illustration</small></div>
      {page.demo.lookup.rows.map(([label, value], i) => <div key={label} className="ig-lookup-row" style={{ animationDelay: `${700 + i * 260}ms` }}><span>{label}</span><strong>{value}</strong></div>)}
      <div className="ig-lookup-ok" style={{ animationDelay: `${800 + page.demo.lookup.rows.length * 260}ms` }}><Check size={13} /> Checked before replying</div>
    </Reveal>
  </div>;
}

function walkthroughScenes(page: IntegrationPage): Scene[] {
  const steps = page.walkthrough!.steps;
  return steps.map((step, i) => ({
    tab: `Step ${i + 1}`, icon: <AppLogo slug={page.slug} size={20} />, label: step.label, result: step.result ?? step.label,
    render: t => <>
      <ContextCard media={<span className="context-orb ig-orb"><AppLogo slug={page.slug} size={22} /></span>} small={`Step ${i + 1} of ${steps.length}`} title={step.label + '.'} note={<><Check size={11} /> {step.result ?? page.name}</>} />
      <TimedChat channel={page.demo.channel} time={t} lines={[{ from: 'customer', text: step.customer, at: 500 }, { from: 'agent', text: step.agent, at: 2600 }]} />
    </>,
  }));
}

export function IntegrationTemplate({ page, related }: { page: IntegrationPage; related: IntegrationApp[] }) {
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} visual={<ConnectedDemo page={page} />} />
    <nav className="container ig-crumbs" aria-label="Breadcrumb"><Link href="/integrations/"><ArrowLeft size={15} />All integrations</Link><span>/</span><span>{page.category}</span><span>/</span><strong>{page.name}</strong></nav>

    <section className="sp-section container">
      <SectionIntro eyebrow="Use cases" title={page.useCases.title} intro={page.useCases.intro} />
      <div className="ig-uses">{page.useCases.items.map((item, i) =>
        <Reveal key={item.title} className="ig-use"><span className="ig-use-n">{String(i + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.body}</p></Reveal>)}</div>
    </section>

    {page.walkthrough && <section className="sp-section container"><SectionIntro eyebrow="Walkthrough" title={page.walkthrough.title} intro={page.walkthrough.intro} /><StepTheatre items={page.walkthrough.steps.map(step => ({ title: step.label, body: step.note }))} scenes={walkthroughScenes(page)} /></section>}

    {page.workflows && <section className="sp-section container sp-split"><SectionIntro eyebrow={<><Workflow size={14} /> Workflows</>} title={page.workflows.title} intro={page.workflows.intro} /><FeatureList items={page.workflows.items} /></section>}

    <section className="sp-section container"><SectionIntro eyebrow="Setup" title={page.setup.title} intro={page.setup.intro} /><StepRows items={page.setup.items} /></section>
    <section className="sp-section container"><GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} /></section>
    <Faq title={page.faq.title} items={page.faq.items} />

    <section className="sp-section container">
      <SectionIntro eyebrow="Related" title="Integrations that work well alongside." />
      <DragRail label="Related integrations">{related.map(app => <AppCard key={app.slug} app={app} />)}</DragRail>
      <Link className="text-link ig-all" href="/integrations/">See all integrations <ArrowUpRight size={18} /></Link>
    </section>
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}

export function AppCard({ app }: { app: IntegrationApp }) {
  return <a className="ig-card" href={`/integrations/${app.slug}/`}>
    <span className="ig-card-logo"><AppLogo slug={app.slug} size={34} /></span>
    <span className="ig-card-text"><strong>{app.name}</strong><small>{app.category}</small><span>{app.body}</span></span>
    <ArrowUpRight size={18} className="ig-card-arrow" />
  </a>;
}
