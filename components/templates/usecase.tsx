'use client';
import { Check, MessageSquare, PackageCheck, ShoppingBag, ShoppingCart } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { ChatMock, CtaBand, Faq, FeatureList, GoodToKnow, LogoStrip, PageHero, QuoteCard, Reveal, SectionIntro } from '@/components/sections';
import { ContextCard, StepTheatre, TimedChat, type Scene } from '@/components/sections/step-theatre';
import type { UseCasePage } from '@/content/types';

const icons = [MessageSquare, ShoppingBag, PackageCheck, ShoppingCart];

// The walkthrough is data-driven: each step becomes one theatre scene, with
// the customer line arriving first and the agent's reply after it.
function walkthroughScenes(page: UseCasePage, channel: string): Scene[] {
  return page.walkthrough.steps.map((step, i) => {
    const Icon = icons[i % icons.length];
    return {
      tab: `Step ${i + 1}`, icon: <Icon size={20} />, label: step.label, result: step.result ?? step.label,
      render: t => <>
        <ContextCard media={i === 1 || i === 2 ? <img src="/industries/ecommerce.png" alt="" /> : <span className="context-orb"><Icon size={18} /></span>} small={`Step ${i + 1} of ${page.walkthrough.steps.length}`} title={step.label + '.'} note={<><Check size={11} /> {channel}</>} />
        <TimedChat channel={channel} time={t} lines={[{ from: 'customer', text: step.customer, at: 500 }, { from: 'agent', text: step.agent, at: 2600 }]} />
      </>,
    };
  });
}

export function UseCaseTemplate({ page }: { page: UseCasePage }) {
  const channel = page.hero.channels?.[0] ?? 'WhatsApp';
  const first = page.walkthrough.steps[0], last = page.walkthrough.steps.at(-1)!;
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} visual={<ChatMock channel={channel} title="Your store" lines={[{ from: 'customer', text: first.customer }, { from: 'agent', text: first.agent }, { from: 'customer', text: last.customer }, { from: 'agent', text: last.agent }]} />} />
    <section className="sp-section container"><SectionIntro eyebrow="Walkthrough" title={page.walkthrough.title} intro={page.walkthrough.intro} /><StepTheatre items={page.walkthrough.steps.map(step => ({ title: step.label, body: step.note }))} scenes={walkthroughScenes(page, channel)} /></section>
    <section className="sp-section container sp-split"><SectionIntro title={page.capabilities.title} intro={page.capabilities.intro} /><FeatureList items={page.capabilities.items} /></section>
    <section className="sp-section container"><SectionIntro eyebrow="Integrations" title={page.tools.title} intro={page.tools.intro} /><Reveal><LogoStrip names={page.tools.names} /></Reveal></section>
    {page.quote && <section className="sp-section container"><QuoteCard quote={page.quote} /></section>}
    <section className="sp-section container"><GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} /></section>
    <Faq title={page.faq.title} items={page.faq.items} />
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}
