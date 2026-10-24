import { BookOpen, Headphones, Wrench } from 'lucide-react';
import styles from './partner-benefits.module.css';

const benefits = [
  { icon: Wrench, title: 'Help with setup', body: 'Get guidance on connecting your accounts and setting up your agent.' },
  { icon: BookOpen, title: 'Guidance for your team', body: 'Know what your agent can do and when your team can take over.' },
  { icon: Headphones, title: 'A route to Meta support', body: 'Meta partner support may help with platform issues, depending on eligibility and availability.' },
];

export function PartnerBenefits() {
  return <section className={styles.section} aria-labelledby="meta-partnership-heading">
    <div className={styles.inner}>
      <div className={styles.copy} data-meta-reveal>
        <h2 id="meta-partnership-heading">A team you can turn to.</h2>
        <p>From setting up your channels to understanding an issue, our team helps you find the next step.</p>
      </div>
      <div className={styles.benefits}>
        <div className={styles.grid}>{benefits.map(({ icon: Icon, title, body }) => <article key={title}><Icon size={23} strokeWidth={1.5} aria-hidden="true"/><h3>{title}</h3><p>{body}</p></article>)}</div>
      </div>
    </div>
  </section>;
}
