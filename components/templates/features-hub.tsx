'use client';

import { ArrowDown, ArrowRight, ArrowUpRight, CalendarCheck, Check, GitBranch, Headphones, Inbox, MessageCircle, Send, Sparkles, Tag, Users } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { CtaBand } from '@/components/sections';
import { ChannelLogo } from '@/app/channel-chat';
import { asset } from '@/lib/asset';
import type { HubPage } from '@/content/types';
import styles from './features-hub.module.css';

function Workspace() {
  return <div className={styles.workspace} aria-label="Example of a conversation connected to a customer record">
    <header className={styles.windowHeader}><img src={asset('/brands/steps-mark.png')} width="28" height="20" alt=""/><strong>Steps AI</strong><span>Team workspace</span><i aria-hidden="true"/></header>
    <div className={styles.workspaceBody}>
      <aside className={styles.sidebar}><span><Inbox size={17}/>Inbox</span><span><Users size={17}/>Contacts</span><span><GitBranch size={17}/>Workflows</span><div className={styles.channelRow}>{['WhatsApp','Instagram','Messenger','Website'].map(c=><ChannelLogo key={c} channel={c}/>)}</div></aside>
      <div className={styles.thread}><header><img src={asset('/images/features/avatars/fox.webp')} width="36" height="36" alt=""/><div><strong>Aisha</strong><small>Website conversation</small></div><MessageCircle size={16}/></header><div className={styles.messages}><p>Can I book a store visit on Friday?</p><p>Of course. What’s your email? I’ll share your request with the team.</p><p>aisha@example.com</p></div><div className={styles.saved}><span><Check size={15}/>Contact saved</span><strong>Aisha · Store visit</strong><small><Tag size={12}/>Booking enquiry</small></div><div className={styles.composer}>Reply to the conversation <Send size={15}/></div></div>
    </div>
    <footer><span><Check size={14}/>Conversation</span><ArrowRight size={13}/><span>Customer record</span><ArrowRight size={13}/><span>Next step</span></footer>
  </div>;
}

function Preview({ index }: { index: number }) {
  if(index===0) return <div className={`${styles.preview} ${styles.photo}`}><img src={asset('/images/features/skills/appointment-setup.webp')} alt="Appointment calendar at a quiet reception desk" width="1200" height="900" loading="lazy"/><div className={styles.photoNote}><CalendarCheck size={20}/><div><strong>Book an appointment</strong><small>Check calendar → confirm a time</small></div><Check size={17}/></div></div>;
  if(index===1) return <div className={`${styles.preview} ${styles.inboxPreview}`}><div className={styles.miniHeader}><Inbox size={18}/>All conversations<span>One inbox</span></div>{[['cat','Maya','Where is my order?','WhatsApp'],['rabbit','James','Is this available in blue?','Instagram'],['owl','Aisha','Can I book a visit?','Website']].map(([avatar,name,message,channel])=><div className={styles.inboxRow} key={name}><img src={asset(`/images/features/avatars/${avatar}.webp`)} width="34" height="34" alt=""/><div><strong>{name}</strong><small>{message}</small></div><ChannelLogo channel={channel}/></div>)}</div>;
  if(index===2) return <div className={`${styles.preview} ${styles.handoff}`}><span className={styles.smallLabel}>Same conversation. Your team.</span><p>Can someone help with my request?</p><span className={styles.transfer}><Headphones size={16}/>Passed to your team</span><p>I’ve read your messages. Let me help.</p><small><Check size={13}/>Conversation history included</small></div>;
  if(index===3) return <div className={`${styles.preview} ${styles.record}`}><div className={styles.miniHeader}><Users size={18}/>Customer record<Check size={16}/></div><strong>Aisha</strong><dl><div><dt>Email</dt><dd>aisha@example.com</dd></div><div><dt>Request</dt><dd>Store visit</dd></div><div><dt>Preferred day</dt><dd>Friday</dd></div></dl><span><Tag size={13}/>Booking enquiry</span></div>;
  if(index===4) return <div className={`${styles.preview} ${styles.analytics}`}><span className={styles.miniHeader}>What customers ask</span><small>Conversation topics</small>{['Product questions','Order updates','Appointments'].map((label,i)=><div key={label}><span>{label}</span><i style={{width:`${[88,64,42][i]}%`}}/></div>)}<span className={styles.smallLabel}>Understand the questions behind the chats</span></div>;
  if(index===5) return <div className={`${styles.preview} ${styles.photo}`}><img src={asset('/images/features/workflow-builder/order-follow-up.webp')} alt="An order being packed beside a workflow on a laptop" width="1200" height="900" loading="lazy"/><div className={styles.flow}><span><GitBranch size={16}/>Order fulfilled</span><ArrowRight size={16}/><span><Send size={16}/>Send an update</span></div></div>;
  return <div className={`${styles.preview} ${styles.broadcast}`}><div className={styles.campaign}><span><ChannelLogo channel="WhatsApp"/>Your store</span><strong>A little something for your next visit.</strong><p>Share an offer with customers who want to hear from you.</p><div>View the collection <ArrowUpRight size={14}/></div></div><div className={styles.audience}><Users size={17}/><strong>Past customers</strong><small>Choose your audience</small></div></div>;
}

export function FeaturesHub({ page }: { page: HubPage }) {
  return <SiteFrame>{onOpen=><div className={styles.page}>
    <section className={`container ${styles.hero}`}>
      <div className={styles.heroCopy}><span className={styles.eyebrow}><Sparkles size={15}/>{page.hero.kicker}</span><h1>{page.hero.title}</h1><p>{page.hero.body}</p><div className={styles.actions}><button className="button" onClick={()=>onOpen('Book a demo')}>Book a demo <ArrowRight size={16}/></button><a href="#feature-library">Browse features <ArrowDown size={16}/></a></div><div className={styles.heroFoot}><span>For your agent.</span><span>For your team.</span><span>For every conversation.</span></div></div>
      <div className={styles.heroVisual}><Workspace/></div>
    </section>
    <section id="feature-library" className={`container ${styles.library}`} aria-labelledby="features-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>The platform</span><h2 id="features-title">{page.cardsTitle}</h2></div><p>From the first question to the next step.</p></div><div className={styles.grid}>{page.cards.map((card,index)=><a href={card.href} key={card.href} className={`${styles.card} ${index<2||index>4?styles.wide:''}`}><Preview index={index}/><div className={styles.cardCopy}><span className={styles.number}>0{index+1}</span><h3>{card.label}</h3><p>{card.body}</p><span className={styles.cardLink}>See {card.label.toLowerCase()} <ArrowUpRight size={17}/></span></div></a>)}</div></section>
    <CtaBand cta={page.cta} onOpen={onOpen}/>
  </div>}</SiteFrame>;
}
