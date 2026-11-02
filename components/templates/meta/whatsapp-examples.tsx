'use client';
import { useState } from 'react';
import { ArrowUpRight, CalendarDays, CheckCheck, ShoppingBag } from 'lucide-react';
import { asset } from '@/lib/asset';
import { ChannelPreview } from './channel-preview';
import { metaChannels } from './channel-content';
import styles from './whatsapp-examples.module.css';

const modes = ['Broadcast', 'Products', 'Booking'] as const;
type Mode = typeof modes[number];

/** Illustrated UI based on supplied WhatsApp references, not a live store. */
export function WhatsAppExamples() {
  const [mode, setMode] = useState<Mode>('Broadcast');
  return <div className={styles.examples}>
    <div className={styles.switcher} role="group" aria-label="WhatsApp examples">
      {modes.map(item => <button type="button" key={item} aria-pressed={mode === item} onClick={() => setMode(item)}>{item}</button>)}
    </div>
    <div className={styles.panel} aria-live="polite" aria-atomic="true">
      <ChannelPreview channel={{...metaChannels[0], messages: []}} showcase>
        {mode === 'Broadcast' && <div className={styles.template}>
          <img className={styles.campaign} src={asset('/images/meta-whatsapp-story-v12.webp')} alt="A new collection of blue and cream linen shirts" width={1200} height={900}/>
          <div className={styles.templateBody}><strong>A fresh collection, just for you.</strong><p>Our new linen shirts are here. Find your next favourite, or reply and we’ll help you choose.</p><small>Reply STOP to opt out <time>9:52 pm</time></small></div>
          <div className={styles.templateAction}><ArrowUpRight size={17}/>Visit site</div>
        </div>}
        {mode === 'Products' && <>
          <div className={styles.customer}>Show me linen shirts.<small>12:11 <CheckCheck size={13}/></small></div>
          <div className={styles.reply}>Here’s one from our collection. View the details or add it to your cart.</div>
          <div className={styles.template}>
            <img className={styles.productPhoto} src={asset('/images/meta-whatsapp-story-v12.webp')} alt="Blue linen shirt" width={1200} height={900}/>
            <div className={styles.productBody}><strong>Classic linen shirt</strong><p>Relaxed fit · Blue</p><b>₹1,299</b></div>
            <div className={styles.productActions}><span><ArrowUpRight size={15}/>View product</span><span><ShoppingBag size={15}/>Add to cart</span></div>
          </div>
        </>}
        {mode === 'Booking' && <>
          <div className={styles.customer}>Can I book an appointment?<small>9:29 <CheckCheck size={13}/></small></div>
          <div className={styles.reply}>We have 15- or 30-minute appointments. Which would you like?</div>
          <div className={styles.customer}>30 minutes, please.<small>9:29 <CheckCheck size={13}/></small></div>
          <div className={styles.reply}>Of course. Here’s the link to choose a time for your 30-minute appointment.<div className={styles.bookingLink}><CalendarDays size={16}/><span>Choose a time <ArrowUpRight size={14}/></span></div></div>
        </>}
      </ChannelPreview>
    </div>
  </div>;
}
