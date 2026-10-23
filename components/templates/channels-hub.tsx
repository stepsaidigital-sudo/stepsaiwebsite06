'use client';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Globe, Headphones, MessageCircle, Phone, PhoneIncoming, PhoneOutgoing } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { CtaBand } from '@/components/sections';
import { ChannelLogo } from '@/app/channel-chat';
import { asset } from '@/lib/asset';
import type { HubPage } from '@/content/types';
import styles from './channels-hub.module.css';

const scenes=[
  {channel:'Website',image:'/images/channels/website/evening-furniture-chat.webp',alt:'A calm furniture shopping workspace',title:'Turn browsing into a conversation.',question:'Will this fit a small living room?',answer:'Tell me the space you have. I can help you choose.',outcome:'Product discovery'},
  {channel:'WhatsApp',image:'/images/channels/whatsapp/gift-delivery-message.webp',alt:'A gift parcel ready for delivery',title:'Be there for the next question.',question:'Can you check my order?',answer:'Of course. Please share your order number.',outcome:'Order support'},
  {channel:'Instagram',image:'/images/channels/instagram/linen-reel-studio.webp',alt:'A linen product arranged for an Instagram reel',title:'Keep the conversation going after the post.',question:'I saw your reel. Is this available in blue?',answer:'I can help with colours and sizes. Which size do you need?',outcome:'Comments to conversations'},
  {channel:'Messenger',image:'/images/channels/messenger/local-shop-page-message.webp',alt:'A local business workspace with a customer message',title:'Give your Facebook visitors a helpful reply.',question:'Can I visit your shop this weekend?',answer:'We’re open on Saturday. What would you like help with?',outcome:'Business enquiries'}
];

function ConversationDesk(){return <div className={styles.desk}>
  <div className={styles.deskHeader}><img src={asset('/brands/steps-mark.png')} alt="" width="30" height="24"/><strong>Steps AI</strong><span>Customer conversations</span></div>
  <div className={styles.deskBody}><div className={styles.rail}>{['Website','WhatsApp','Instagram','Messenger'].map(c=><span key={c}><ChannelLogo channel={c}/></span>)}<span><Phone size={19}/></span></div><div className={styles.deskContent}>
    <div className={styles.deskTitle}><div><small>YOUR TEAM’S WORKSPACE</small><h2>Every conversation has a next step.</h2></div><span className={styles.online}>Connected</span></div>
    <div className={styles.enquiry}><ChannelLogo channel="WhatsApp"/><div><strong>Order enquiry</strong><p>“Can you check my order?”</p></div><span>Support</span></div>
    <div className={styles.enquiry}><ChannelLogo channel="Instagram"/><div><strong>Product question</strong><p>“Does this come in blue?”</p></div><span>Sales</span></div>
    <div className={`${styles.enquiry} ${styles.voiceRow}`}><Phone size={20}/><div><strong>Counselling call</strong><p>“I’d like to know about the next intake.”</p></div><span>Voice</span></div>
    <div className={styles.nextStep}><Check size={16}/><span>Business knowledge. Customer context. Your team.</span></div>
  </div></div>
</div>}

export function ChannelsHub({page}:{page:HubPage}){return <SiteFrame>{onOpen=><div className={styles.page}>
  <section className={`container ${styles.hero}`}><div className={styles.heroCopy}><span className={styles.eyebrow}>CHAT + VOICE · ONE PLATFORM</span><h1>{page.hero.title}</h1><p>{page.hero.body}</p><div className={styles.actions}><button className="button" onClick={()=>onOpen('Book a demo')}>Book a demo <ArrowRight size={16}/></button><a href="#channel-library">Find your channel <ArrowDown size={16}/></a></div><div className={styles.channelNames}>{['Website','WhatsApp','Instagram','Messenger'].map(c=><span key={c}><ChannelLogo channel={c}/>{c}</span>)}<span><Phone size={16}/>Calling agent</span></div></div><div className={styles.heroVisual}><ConversationDesk/><div className={styles.voiceNote}><Headphones size={19}/><div><strong>More than messages.</strong><span>Voice is part of your customer experience, too.</span></div></div></div></section>
  <section id="channel-library" className={`container ${styles.library}`}><header className={styles.sectionHead}><div><span className={styles.eyebrow}>CHOOSE HOW YOU CONNECT</span><h2>Different channels.<br/>The same business behind every reply.</h2></div><p>Start where your customers already are. Explore what each channel can do for your business.</p></header>
    <a className={styles.callFeature} href="/channels/ai-calling-agent/"><div className={styles.callCopy}><span className={styles.callLabel}><Phone size={18}/>AI calling agent</span><h3>A helpful voice.<br/>A clear next step.</h3><p>Answer incoming calls, speak to new leads and let website visitors talk to your agent. Understand the enquiry, capture the details and connect people with your team.</p><div className={styles.callTypes}><span><PhoneIncoming size={15}/>Inbound calls</span><span><PhoneOutgoing size={15}/>Outbound calls</span><span><Globe size={15}/>Web voice</span></div><small>English, Hindi and Telugu</small><strong className={styles.link}>Meet your calling agent <ArrowUpRight size={18}/></strong></div><div className={styles.callVisual}><img src={asset('/images/jobs/ai-calling-agent/voice-consultation-desk.webp')} alt="A quiet consultation desk with a phone and laptop, without people" width="1200" height="900" loading="lazy"/><div className={styles.phone}><div className={styles.speaker}/><span className={styles.phoneIcon}><Phone size={25}/></span><strong>Admissions team</strong><small>AI calling agent</small><div className={styles.wave} aria-hidden="true">{[12,22,32,18,38,26,16,30,20,12].map((h,i)=><i key={i} style={{height:h}}/>)}</div><div className={styles.transcript}><small>CALLER</small><p>Are applications open for the next intake?</p><small>AI AGENT</small><p>Yes. Which course are you interested in?</p></div><span className={styles.phoneFoot}>Understand. Qualify. Follow up.</span></div></div></a>
    <div className={styles.grid}>{scenes.map((scene,i)=>{const card=page.cards[i];return <a key={scene.channel} href={card.href} className={styles.card}><div className={styles.cardVisual}><img src={asset(scene.image)} alt={scene.alt} width="1200" height="900" loading="lazy"/><div className={styles.chat}><header><ChannelLogo channel={scene.channel}/><strong>Your business</strong><MessageCircle size={14}/></header><p>{scene.question}</p><p>{scene.answer}</p><small><Check size={12}/>{scene.outcome}</small></div></div><div className={styles.cardCopy}><span><ChannelLogo channel={scene.channel}/>{card.label}</span><h3>{scene.title}</h3><p>{card.body}</p><strong className={styles.link}>See {scene.channel} in action <ArrowUpRight size={17}/></strong></div></a>})}</div>
  </section><CtaBand cta={page.cta} onOpen={onOpen}/>
</div>}</SiteFrame>}
