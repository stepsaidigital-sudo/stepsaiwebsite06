import { ArrowUpRight, Check, CalendarDays, Languages, MessageSquare } from 'lucide-react';
import styles from './demo-details.module.css';

export function DemoDetails() {
  return <div className={styles.details}>
    <section className={styles.section} aria-labelledby="demo-expectations">
      <div className={styles.split}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>WHAT YOU’LL GET FROM THE DEMO</span>
          <h2 id="demo-expectations">Your problem.<br/>A practical way forward.</h2>
          <p>Bring a customer challenge. We’ll show where Steps AI can help.</p>
          <ul className={styles.outcomes}>
            <li><Check size={18}/><div><h3>Talk through your use case</h3><p>Sales, support, bookings or follow-ups. Start with your priority.</p></div></li>
            <li><Check size={18}/><div><h3>See the relevant features</h3><p>Explore your channels, connected tools and team handoffs.</p></div></li>
            <li><Check size={18}/><div><h3>Understand what’s possible</h3><p>Know what’s supported and what needs connecting.</p></div></li>
          </ul>
        </div>
        <figure className={styles.visual}>
          <img src="/images/demo-discussion-v1.webp" alt="A laptop, notebook and planning materials prepared for a business walkthrough" width="1200" height="800" loading="lazy"/>
          <figcaption><MessageSquare size={19}/><span>A conversation about <strong>your business.</strong></span></figcaption>
        </figure>
      </div>
    </section>
    <section className={`${styles.section} ${styles.onboarding}`} aria-labelledby="demo-onboarding">
      <div className={`${styles.split} ${styles.reverse}`}>
        <figure className={styles.visual}>
          <img src="/images/demo-onboarding-v1.webp" alt="Business information and a laptop organised for a guided setup" width="1200" height="800" loading="lazy"/>
          <figcaption><Check size={19}/><span><strong>A clear path to setup.</strong></span></figcaption>
        </figure>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>FROM DEMO TO GETTING STARTED</span>
          <h2 id="demo-onboarding">Know how to start.</h2>
          <p>We’ll explain setup, what to prepare and what happens next.</p>
          <ol className={styles.steps}>
            <li><span>01</span><div><h3>Bring your business information</h3><p>Start with your website, FAQs and documents.</p></div></li>
            <li><span>02</span><div><h3>Choose your connections</h3><p>Discuss your channels and supported store, CRM or calendar tools.</p></div></li>
            <li><span>03</span><div><h3>Understand testing and handoff</h3><p>Review answers and learn when your team steps in.</p></div></li>
          </ol>
        </div>
      </div>
    </section>
    <section className={`${styles.section} ${styles.preferences}`} aria-labelledby="demo-preferences">
      <div className={styles.preferenceInner}>
        <div className={styles.preferenceHeading}><span className={styles.eyebrow}>LET’S MAKE IT COMFORTABLE</span><h2 id="demo-preferences">Your questions.<br/>Your team.</h2><p>Founders, business managers and technical teams are welcome. Bring the people and questions that matter.</p><a href="#main">Request your demo <ArrowUpRight size={17}/></a></div>
        <div className={styles.preferenceRows}>
          <article><span className={styles.icon}><Languages size={24}/></span><div><h3>English, Hindi or Telugu</h3><p>Choose your preferred language for the walkthrough and questions.</p><div className={styles.languageTags}><span>English</span><span lang="hi">हिन्दी</span><span lang="te">తెలుగు</span></div></div></article>
          <article><span className={styles.icon}><CalendarDays size={24}/></span><div><h3>A time that works for you</h3><p>Request a demo now. We’ll agree on a convenient time when we follow up.</p></div></article>
        </div>
      </div>
    </section>
  </div>;
}
