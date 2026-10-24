'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { asset } from '@/lib/asset';
import { metaChannels } from './channel-content';
import styles from './channel-stories.module.css';

const scenes = [
  { image: 'whatsapp', alt: 'Hands preparing a new linen collection in a clothing studio', caption: 'An offer. A reply. A helpful conversation.', label: 'Broadcasts & replies' },
  { image: 'instagram', alt: 'Hands packing a blue garment for a customer delivery', caption: 'Every order starts with a question.', label: 'Questions in your DMs' },
  { image: 'messenger', alt: 'A small business preparing matching gift boxes for a team', caption: 'Small questions. Bigger opportunities.', label: 'Facebook conversations' },
];
export function ChannelStories() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.setAttribute('data-visible', 'true'); observer.unobserve(entry.target); } });
    }, { threshold: .15 });
    root.current?.querySelectorAll('figure').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <section ref={root} className={styles.section} id="meta-channels" aria-labelledby="channel-stories-heading">
    <div className={styles.wrap}>
      <header className={styles.heading} data-meta-reveal><div><span>Made for real conversations</span><h2 id="channel-stories-heading">Three channels.<br/>One helpful agent.</h2></div><p>From a new collection to a delivery question, be there when customers reach out.</p></header>
      <div className={styles.channelLine} aria-hidden="true">{metaChannels.map(channel => <span key={channel.name}><img src={asset('/brands/' + channel.icon)} alt="" width={21} height={21}/>{channel.name}</span>)}</div>
      {metaChannels.map((channel, index) => <article className={styles.story} key={channel.name} data-platform={channel.name}>
        <div className={styles.copy}><span className={styles.label}><img src={asset('/brands/' + channel.icon)} alt="" width={26} height={26}/>{channel.name} agent</span><h3>{channel.title}<br/><span>{channel.second}</span></h3><p>{channel.body}</p><Link href={'/channels/' + channel.slug + '/'}>See the {channel.name} agent <ArrowUpRight size={17}/></Link></div>
        <figure className={styles.visual}><img className={styles.photo} src={asset('/images/meta-' + scenes[index].image + '-story-v12.webp')} alt={scenes[index].alt} width={1200} height={900} loading="lazy"/><div className={styles.platform}><img src={asset('/brands/' + channel.icon)} alt="" width={22} height={22}/><span>{scenes[index].label}</span></div><figcaption>{scenes[index].caption}</figcaption></figure>
      </article>)}
    </div>
  </section>;
}
