import {ArrowRight, Check, Headphones, MessageSquare} from 'lucide-react';
import styles from './handoff-visual.module.css';
export function HandoffVisual(){return <div className={styles.stage}>
  <div className={styles.heading}><span><Headphones size={17}/>Human handoff</span><small>Example conversation</small></div>
  <div className={styles.grid}>
    <section className={styles.chat} aria-label="Customer conversation"><header><MessageSquare size={20}/><div><strong>Customer conversation</strong><small>History stays with the request</small></div></header><div className={styles.messages}><p className={styles.customer}>Can I speak to someone about my order?</p><p className={styles.agent}>Of course. I’m passing this conversation to our team.</p><div className={styles.event}>A teammate claimed the request</div><p className={styles.human}><strong>Your team</strong>I’ve read your messages. Could you share the order number?</p></div><footer><Check size={16}/>Continue in the same thread</footer></section>
    <div className={styles.arrow} aria-hidden="true"><ArrowRight size={25}/></div>
    <section className={styles.context} aria-label="What your teammate receives"><span className={styles.eyebrow}>In your inbox</span><h2>The context is already here.</h2><ul><li><Check size={17}/><div><strong>The full chat</strong><p>What the customer asked and what your agent answered.</p></div></li><li><Check size={17}/><div><strong>A claimed request</strong><p>A teammate takes ownership before replying.</p></div></li><li><Check size={17}/><div><strong>One conversation</strong><p>Your team replies, then resolves the handoff.</p></div></li></ul><span className={styles.badge}><Headphones size={16}/>With your team</span></section>
  </div></div>}
