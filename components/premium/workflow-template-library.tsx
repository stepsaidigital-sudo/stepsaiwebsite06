'use client';
import { useState } from 'react';
import { ArrowRight, Search, Workflow } from 'lucide-react';
import { workflowGroups, workflowTemplates } from '@/content/workflow-templates';
import { asset } from '@/lib/asset';
import styles from './workflow-template-library.module.css';

export function WorkflowTemplateLibrary() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<string>('All templates');
  const [platform, setPlatform] = useState('All platforms');
  const [limit, setLimit] = useState(9);
  const filtered = workflowTemplates.filter(item => (group === 'All templates' || item.group === group) && (platform === 'All platforms' || item.platform === platform) && `${item.platform} ${item.name} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase()));
  const clear = () => { setQuery(''); setGroup('All templates'); setPlatform('All platforms'); setLimit(9); };
  return <section id="workflow-templates" className={`container ${styles.section}`} aria-labelledby="workflow-library-title">
    <div className={styles.heading}><div><span className="wb-eyebrow">Ready-made workflows</span><h2 id="workflow-library-title">Start with the follow-up you need.</h2></div><p>Explore {workflowTemplates.length} ecommerce templates for Shopify and WhatsApp. Choose a starting point, review its steps and adapt it in your workspace.</p></div>
    <div className={styles.toolbar}><label className={styles.search}><Search size={18} /><span className={styles.srOnly}>Search workflow templates</span><input value={query} onChange={event => { setQuery(event.target.value); setLimit(9); }} placeholder="Search carts, shipping, reviews…" /></label><label className={styles.select}><span>Platform</span><select aria-label="Platform" value={platform} onChange={event => { setPlatform(event.target.value); setLimit(9); }}><option>All platforms</option><option>Shopify</option><option>WhatsApp</option></select></label></div>
    <div className={styles.filters} role="group" aria-label="Workflow purpose">{workflowGroups.map(label => <button key={label} aria-pressed={group === label} onClick={() => { setGroup(label); setLimit(9); }}>{label}</button>)}</div>
    <p className={styles.count} aria-live="polite">{filtered.length} {filtered.length === 1 ? 'template' : 'templates'}{query && ` matching “${query}”`}</p>
    <div className={styles.grid}>{filtered.slice(0, limit).map(item => <article key={`${item.platform}-${item.name}`} className={styles.card}>
      <div className={styles.meta}><img src={asset(item.platform === 'Shopify' ? '/brands/integrations/shopify.svg' : '/brands/whatsapp.png')} alt="" width={23} height={23} /><span>{item.platform}</span><small>{item.group}</small></div>
      <h3>{item.name}</h3><p>{item.description}</p>
      <div className={styles.bottom}><span><Workflow size={15} />{item.steps} steps</span><a href="https://app.stepsai.co/login">Open workspace <ArrowRight size={15} /></a></div>
    </article>)}</div>
    {!filtered.length && <div className={styles.empty}><h3>No matching templates.</h3><p>Try another search or clear your filters.</p><button onClick={clear}>Clear filters</button></div>}
    {filtered.length > limit && <button className={styles.more} onClick={() => setLimit(value => value + 9)}>Show more templates <span>{filtered.length - limit} more</span></button>}
    <p className={styles.note}>Open your workspace and choose the template by name in Workflow Builder. Review its settings before switching it on. WhatsApp workflows use approved message templates.</p>
  </section>;
}
