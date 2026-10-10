'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { CtaBand, Faq, PageHero, Reveal, SectionIntro } from '@/components/sections';
import type { IntegrationsHub } from '@/content/types';
import { AppCard, AppLogo } from './integration';

// Connected apps orbit the Steps AI mark. The ring turns slowly on its own,
// and can be dragged to spin it, carrying on with a little momentum.
function LogoCloud({ slugs }: { slugs: string[] }) {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ring.current!;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let angle = 0, velocity = 0, dragging = false, lastX = 0, frame = 0;
    const tick = () => {
      // After a flick, the speed eases back to a slow cruise.
      if (!dragging) { angle += velocity; velocity = velocity * 0.95 + (still ? 0 : 0.06) * 0.05; }
      el.style.setProperty('--rot', `${angle}deg`);
      frame = requestAnimationFrame(tick);
    };
    const down = (e: PointerEvent) => { dragging = true; lastX = e.clientX; velocity = 0; el.classList.add('is-dragging'); el.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => { if (!dragging) return; const dx = e.clientX - lastX; lastX = e.clientX; angle += dx * 0.45; velocity = dx * 0.45; };
    const up = () => { dragging = false; el.classList.remove('is-dragging'); };
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
  }, []);
  return <div ref={ring} className="ig-cloud" aria-hidden="true">
    <div className="ig-cloud-core"><img src="/brands/steps-original.png" alt="" width={56} height={56} draggable={false} /></div>
    {slugs.map((slug, i) => <span key={slug} className="ig-cloud-item" style={{ ['--a' as string]: `${(360 / slugs.length) * i}deg`, ['--r' as string]: i % 2 ? '168px' : '112px', animationDelay: `${i * 90}ms` }}><AppLogo slug={slug} size={30} /></span>)}
    <span className="ig-cloud-hint">Drag to spin</span>
  </div>;
}

export function IntegrationsHubTemplate({ page }: { page: IntegrationsHub }) {
  const [filter, setFilter] = useState('All');
  const names = Object.fromEntries(page.apps.map(app => [app.slug, app.name]));
  const groups = (filter === 'All' ? page.categories : [filter]).map(category => ({ category, apps: page.apps.filter(app => app.category === category) }));
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} visual={<LogoCloud slugs={['shopify', 'google-calendar', 'hubspot', 'shiprocket', 'zendesk', 'calendly', 'woocommerce', 'google-sheets', 'notion', 'slack', 'delhivery', 'klaviyo']} />} />

    <section className="sp-section container" id="directory">
      <SectionIntro eyebrow={`${page.apps.length} integrations`} title="Every app you can connect." intro="Choose an app to see what it lets your agent do, how a conversation goes and how to set it up." />
      <div className="ig-filters" role="group" aria-label="Filter integrations by category">
        {['All', ...page.categories].map(category => <button key={category} className={filter === category ? 'is-active' : ''} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}<small>{category === 'All' ? page.apps.length : page.apps.filter(app => app.category === category).length}</small></button>)}
      </div>
      {groups.map(group => <div key={group.category} className="ig-group"><h3>{group.category}</h3><div className="ig-grid">{group.apps.map(app => <AppCard key={app.slug} app={app} />)}</div></div>)}
    </section>

    <section className="sp-section ig-jobs-band"><div className="container">
      <SectionIntro eyebrow="Use cases" title={page.jobs.title} intro={page.jobs.intro} />
      <div className="ig-jobs">{page.jobs.items.map(job => <Reveal key={job.title} className="ig-job">
        <h3>{job.title}</h3><p>{job.body}</p>
        <div className="ig-job-apps">{job.apps.map(slug => <a key={slug} href={`/integrations/${slug}/`}><AppLogo slug={slug} size={20} />{names[slug]}</a>)}</div>
      </Reveal>)}</div>
    </div></section>

    <section className="sp-section container"><Reveal className="ig-custom"><div><h2>{page.custom.title}</h2><p>{page.custom.body}</p></div><button className="button" onClick={() => onOpen('Request an integration')}>Request an integration <ArrowRight size={17} /></button></Reveal></section>
    <Faq title={page.faq.title} items={page.faq.items} />
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}
