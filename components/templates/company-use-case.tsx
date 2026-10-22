'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { DEMO_URL } from '@/components/site/routes';
import cases from '@/content/company-use-cases.json';
import { companyCaseDetails } from '@/content/company-case-details';
import { CompanyLogo } from './company-logo';
import styles from './company-cases.module.css';

type Company = typeof cases[number];
export function CompanyUseCase({ company }: { company: Company }) {
  const detail = companyCaseDetails[company.slug];
  const sections = [['overview', 'Company context'], ['challenge', 'Customer need'], ['journey', 'Proposed conversation'], ['handoff', 'The next step'], ['questions', 'Common questions']];
  const related = cases.filter(item => item.researched && item.slug !== company.slug).slice(company.slug === 'pardewale' ? 1 : 0, company.slug === 'pardewale' ? 4 : 3);
  return <SiteFrame>{() => <div className="cs2">
    <section className="container cs2-hero-wrap">
      <Link href="/case-studies/" className={styles.back}><ArrowLeft size={16} />All companies</Link>
      <div className="cs2-hero-banner"><div className="cs2-hero-ambient" aria-hidden="true" /><div className="cs2-hero-content">
        <p className={styles.heroLabel}>Illustrative use case · {company.industry}</p>
        <h1 className="cs2-hero-title">{company.name}</h1>
        <p className="cs2-hero-subtitle">{company.title}</p>
        <p className={styles.notice}>A proposed example of how Steps AI could help. This is not a customer testimonial, a confirmed deployment description or a measured result.</p>
      </div></div>
    </section>
    <section className={`container ${styles.detail}`}>
      <div className={styles.articleLayout}>
        <aside className={`${styles.panel} ${styles.sidebar}`} aria-label="Company and page navigation">
          <CompanyLogo name={company.name} logo={company.logo} />
          <p className={styles.label}>{company.industry}</p>
          <p className={styles.body}>{company.title}</p>
          <nav aria-label="On this page" className={styles.toc}><p className={styles.label}>ON THIS PAGE</p>{sections.map(([id, title], index) => <a key={id} href={`#${id}`}><span aria-hidden="true">0{index + 1}</span>{title}</a>)}</nav>
          <Link href={DEMO_URL} className={styles.sidebarCta}>Explore a similar flow <ArrowRight size={16} aria-hidden="true" /></Link>
        </aside>
        <article className={styles.article}>
          <section id="overview" className={styles.articleSection}>
          <p className={styles.label}>01 / COMPANY CONTEXT</p>
          <h2>{company.about ? `A closer look at ${company.name}` : `An enquiry flow for ${company.name}`}</h2>
          <p className={styles.body}>{company.about ?? 'This example explores a general customer enquiry, without assuming a specific product catalogue or service offering.'}</p>
          <p className={styles.body}>{detail?.context ?? 'A visitor may arrive with a simple question or a request that needs a team member. The proposed conversation starts by understanding that request, then identifies whether approved information is available or a handoff is needed.'}</p>
          </section>
          <section id="challenge" className={styles.articleSection}>
          <p className={styles.label}>02 / CUSTOMER NEED</p><h2>What the customer needs to decide</h2>
          <p className={styles.body}>{company.challenge}</p>
          <div className={styles.question}><small className={styles.label}>EXAMPLE CUSTOMER QUESTION</small><p>{company.question}</p></div>
          <h3>Details that make the answer useful</h3>
          <ul className={styles.inputs}>{(detail?.collect ?? ['The visitor’s question', 'Relevant product or service reference', 'Preferred next step']).map(item => <li key={item}>{item}</li>)}</ul>
          </section>
          <section id="journey" className={styles.articleSection}>
          <p className={styles.label}>03 / PROPOSED CONVERSATION</p>
          <h2>How the conversation could work</h2>
          <p className={styles.body}>For this {company.name} example, the conversation follows three stages: understand the request, share relevant information and make the next action clear.</p>
          <ol className={styles.journey}>{company.steps.map((step, index) => <li key={step}><span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span><div><h3>{['Understand the request', 'Guide the decision', 'Connect with the team'][index]}</h3><p className={styles.body}>{step}</p></div></li>)}</ol>
          </section>
          <section id="handoff" className={styles.articleSection}>
          <p className={styles.label}>04 / THE NEXT STEP</p><h2>A useful enquiry, ready to continue</h2>
          <p className={styles.body}>{detail?.handoff ?? 'A clear summary of the visitor’s question for the appropriate team to review.'} The customer should know what has been answered and what still needs confirmation.</p>
          <div className={styles.takeaway}><h3>What the team would receive</h3><p className={styles.body}>The original question, relevant preferences shared during the conversation and the unresolved request. Contact details would be collected only when needed for an agreed follow-up.</p></div>
          <h3>What would need to be in place</h3><p className={styles.body}>Approved {company.researched ? company.industry.toLowerCase() : 'company'} information, a named team to handle exceptions and a clear process for follow-up. Live availability, quotes or bookings would require the appropriate system connection and confirmation rules.</p>
          </section>
          <section id="questions" className={styles.articleSection}>
          <p className={styles.label}>05 / COMMON QUESTIONS</p><h2>More about this {company.name} example</h2>
          <div className={styles.faq}>
          {detail && <details open><summary>{detail.faq[0]}</summary><p className={styles.body}>{detail.faq[1]}</p></details>}
          <details><summary>Is this a published customer success story?</summary><p className={styles.body}>This is an illustrative workflow for {company.name}, not a record of a confirmed implementation. No performance figures or customer endorsements are claimed.</p></details>
          <details><summary>How could a similar flow be adapted for my business?</summary><p className={styles.body}>Start with a common customer question, the information your team is comfortable sharing and the action that should follow. A demo can explore the conversation using your own catalogue or service information.</p></details>
          </div></section>
          <section className={styles.articleSection}><h2>Explore more conversation examples</h2><div className={styles.related}>{related.map(item => <Link key={item.slug} href={`/case-studies/${item.slug}/`}><span className={styles.label}>{item.industry}</span><h3>{item.name}</h3><p>{item.title}</p><ArrowRight size={18} aria-hidden="true" /></Link>)}</div></section>
        </article>
      </div>
    </section>
    <section className="container cs2-cta"><h2>Try a flow like this for your business.</h2><p>Bring your catalogue or service information and explore the conversation in a demo.</p><div className="cs2-cta-buttons"><Link href={DEMO_URL} className="cs2-btn cs2-btn-primary">Book a demo <ArrowRight size={15} /></Link><Link href="/case-studies/" className="cs2-btn cs2-btn-secondary">Explore other companies</Link></div></section>
  </div>}</SiteFrame>;
}
