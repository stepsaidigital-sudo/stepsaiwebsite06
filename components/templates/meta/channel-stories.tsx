'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, BookOpen, Users } from 'lucide-react';
import { asset } from '@/lib/asset';
import { metaChannels } from './channel-content';
import type { ChatMessage } from './channel-content';
import { ChannelPreview } from './channel-preview';
import { WhatsAppExamples } from './whatsapp-examples';
import styles from './channel-stories.module.css';

const scenes = ['whatsapp', 'instagram', 'messenger'];
// Illustrative conversations, separate from the approved hero messages.
const conversations: ChatMessage[][] = [
  [
    { sender: 'customer', text: 'Is the blue linen shirt available?', time: '10:24' },
    { sender: 'business', text: 'Yes, it is. Which size would you like?', time: '10:24' },
    { sender: 'customer', text: 'Medium. Do you deliver to Pune?', time: '10:25' },
    { sender: 'business', text: 'Yes, we deliver to Pune. Share your PIN code so I can check the delivery time.', time: '10:25' },
  ],
  [
    { sender: 'customer', text: 'Hi! Is the shirt in your latest post cotton?', time: '11:02' },
    { sender: 'business', text: 'Hi! That one is pure linen. It has a relaxed fit.', time: '11:02' },
    { sender: 'customer', text: 'How should I wash it?', time: '11:03' },
    { sender: 'business', text: 'Use a gentle cold wash and let it air-dry. Avoid tumble drying.', time: '11:03' },
  ],
  [
    { sender: 'customer', text: 'Hi, can you help me with my order?', time: '12:14' },
    { sender: 'business', text: 'Of course! Could you share your order number?', time: '12:14' },
    { sender: 'customer', text: "It’s #1042.", time: '12:15' },
    { sender: 'business', text: 'Thanks! I’ll help you check that. One moment, please.', time: '12:15' },
  ],
];
export function ChannelStories() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.setAttribute('data-visible', 'true'); observer.unobserve(entry.target); } });
    }, { threshold: .15 });
    root.current?.querySelectorAll('[data-showcase]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <section ref={root} className={styles.section} id="meta-channels" aria-labelledby="channel-stories-heading">
    <div className={styles.wrap}>
      <div className={styles.overview}><header className={styles.heading} data-meta-reveal><div><span>How it works across Meta</span><h2 id="channel-stories-heading">Three channels.<br/>One helpful agent.</h2></div><p>From a new collection to a delivery question, be there when customers reach out.</p></header><div className={styles.highlights}><article><MessageCircle size={23}/><h3>Answer questions</h3><p>Help customers in the apps they use.</p></article><article><BookOpen size={23}/><h3>Know your business</h3><p>Reply using your information.</p></article><article><Users size={23}/><h3>Bring in your team</h3><p>Step in when a person is needed.</p></article></div></div>
      <div className={styles.channelLine} aria-hidden="true">{metaChannels.map(channel => <span key={channel.name}><img src={asset('/brands/' + channel.icon)} alt="" width={21} height={21}/>{channel.name}</span>)}</div>
      <div className={styles.cards}>{metaChannels.map((channel, index) => <article className={styles.story} key={channel.name} data-platform={channel.name}>
        <div className={styles.copy}><span className={styles.label}><img src={asset('/brands/' + channel.icon)} alt="" width={26} height={26}/>{channel.name} agent</span><h3>{channel.title}<br/><span>{channel.second}</span></h3><p>{channel.body}</p><Link href={'/channels/' + channel.slug + '/'}>See the {channel.name} agent <ArrowUpRight size={17}/></Link></div>
        <div className={styles.visual} data-showcase data-channel={channel.name}>
          <img className={styles.photo} src={asset('/images/meta-' + scenes[index] + '-story-v12.webp')} alt="" width={1200} height={900} loading="lazy"/>
          <div className={styles.platform}><img src={asset('/brands/' + channel.icon)} alt="" width={22} height={22}/><span>{channel.name === 'Instagram' ? 'Instagram DMs' : channel.name === 'WhatsApp' ? 'WhatsApp Business' : 'Facebook Messenger'}</span></div>
          {index === 0 ? <WhatsAppExamples/> : <ChannelPreview channel={{...channel, messages: conversations[index]}} showcase/>}
        </div>
      </article>)}</div>
    </div>
  </section>;
}
