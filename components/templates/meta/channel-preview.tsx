import { ArrowLeft, Phone, Video, MoreVertical, Smile, Plus, Mic, Camera, Image as ImageIcon, Heart, ThumbsUp, CheckCheck } from 'lucide-react';
import { MetaChannel } from './channel-content';
import styles from './channel-preview.module.css';
import type { ReactNode } from 'react';

/** Illustrative customer-side chat. Decorative app controls are not interactive. */
export function ChannelPreview({ channel, compact = false, showcase = false, children }: { channel: MetaChannel; compact?: boolean; showcase?: boolean; children?: ReactNode }) {
  const whatsapp = channel.name === 'WhatsApp';
  const instagram = channel.name === 'Instagram';
  return <figure className={`${styles.preview} ${compact ? styles.compact : ''} ${showcase ? styles.showcase : ''}`} data-app={channel.name} aria-label={`${channel.name} example conversation`}>
    <div className={styles.chatHeader}>
      <ArrowLeft size={21} aria-hidden="true"/>
      <div className={styles.avatar} aria-hidden="true">{channel.business === 'Linen & Co.' ? 'L' : 'E'}</div>
      <div className={styles.identity}><strong>{channel.business}</strong><span>{channel.handle}</span></div>
      <div className={styles.headerIcons} aria-hidden="true"><Phone size={19}/><Video size={21}/>{whatsapp && <MoreVertical size={19}/>}</div>
    </div>
    <div className={styles.thread} tabIndex={compact ? 0 : undefined} role={compact ? 'region' : undefined} aria-label={compact ? 'Example conversation' : undefined}>
      <span className={styles.date}>{whatsapp || showcase ? 'Today' : 'Today 10:24 AM'}</span>
      {channel.messages.map((message, i) => <div key={i} className={styles.bubble} data-sender={message.sender}>
        <span>{message.text}</span>
        {(whatsapp || showcase) && <small>{message.time}{whatsapp && message.sender === 'customer' && <CheckCheck size={14}/>}</small>}
      </div>)}
      {children}

    </div>
    <div className={styles.composer} aria-hidden="true">
      {whatsapp ? <><Plus size={22}/><div className={styles.input}><span>Message</span><Smile size={20}/></div><Camera size={21}/><Mic size={20}/></> : <div className={styles.input}>{instagram ? <span className={styles.camera}><Camera size={17}/></span> : <Plus size={20}/>}<span>{instagram ? 'Message…' : 'Aa'}</span><Mic size={20}/><ImageIcon size={20}/>{instagram ? <Heart size={20}/> : <ThumbsUp size={20}/>}</div>}
    </div>
  </figure>;
}
