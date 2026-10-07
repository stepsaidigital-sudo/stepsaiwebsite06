import {ArrowLeft,Globe,Phone,Video,MoreVertical,Smile,Plus,Mic,Camera,Heart,Image as ImageIcon,CheckCheck,Send} from 'lucide-react';
export function channelKind(channel:string){return channel.includes('WhatsApp')?'whatsapp':channel==='Instagram'?'instagram':channel==='Messenger'?'messenger':'website'}
export function ChannelLogo({channel}:{channel:string}){const kind=channelKind(channel);return kind==='website'?<Globe size={20}/>:<img className="channel-logo" src={`/brands/${kind==='instagram'?'instagram-icon':kind}.png`} width="24" height="24" alt=""/>}
export function ChannelChat({channel,question,answer,options,comments=false}:{channel:string;question:string;answer:string;options?:string[];comments?:boolean}){
  const kind=channelKind(channel);
  return <div className={`channel-chat channel-${kind} ${comments?'is-comments':''}`} aria-label={`${channel} ${comments?'comment':'conversation'} illustration`}>
    <div className="channel-brand"><ChannelLogo channel={channel}/><strong>{kind==='website'?'Website':channel.includes('WhatsApp')?'WhatsApp':channel}</strong><span>Illustration</span></div>
    <div className="native-chat-header"><ArrowLeft size={19}/><span className="business-avatar">S</span><div><strong>{comments?'Comments':'Your business'}</strong><small>{comments?'Your post':'Business account'}</small></div>{!comments&&<><Phone size={17}/><Video size={19}/></>}<MoreVertical size={18}/></div>
    <div className="native-chat-body"><span className="chat-date">Today</span>
      <div className="native-message incoming">{comments&&<b>customer</b>}{question}<small>10:24 {kind==='whatsapp'&&<CheckCheck size={12}/>}</small></div>
      <div className="native-message outgoing">{comments&&<b>your_business</b>}{answer}<small>10:24 {kind==='whatsapp'&&<CheckCheck size={12}/>}</small></div>
      {options&&<div className="native-options">{options.map(option=><span key={option}>{option}</span>)}</div>}
    </div>
    <div className="native-composer">{kind==='instagram'?<Camera size={21}/>:kind==='messenger'?<Plus size={21}/>:<Smile size={21}/>}<span>{comments?'Add a comment…':'Message…'}</span>{kind==='instagram'?<><Mic size={19}/><ImageIcon size={19}/><Heart size={19}/></>:kind==='messenger'?<><ImageIcon size={19}/><Mic size={19}/></>:kind==='whatsapp'?<><Plus size={21}/><Mic size={21}/></>:<Send size={19}/>}</div>
  </div>
}
