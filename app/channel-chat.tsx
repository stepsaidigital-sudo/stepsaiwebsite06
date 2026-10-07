import {Globe,CheckCheck} from 'lucide-react';
export function channelKind(channel:string){return channel.includes('WhatsApp')?'whatsapp':channel==='Instagram'?'instagram':channel==='Messenger'?'messenger':'website'}
export function ChannelLogo({channel}:{channel:string}){const kind=channelKind(channel);return kind==='website'?<Globe size={20}/>:<img className="channel-logo" src={`/brands/${kind==='instagram'?'instagram-icon':kind}.png`} width="24" height="24" alt=""/>}
export function ChannelChat({channel,question,answer,options,comments=false}:{channel:string;question:string;answer:string;options?:string[];comments?:boolean}){
  const kind=channelKind(channel);
  return <div className={`channel-chat channel-${kind} ${comments?'is-comments':''}`} aria-label={`${channel} ${comments?'comment':'conversation'} illustration`}>
    <div className="native-chat-body"><span className="chat-date">Today</span>
      <div className="native-message incoming">{comments&&<b>customer</b>}{question}<small>10:24 {kind==='whatsapp'&&<CheckCheck size={12}/>}</small></div>
      <div className="native-message outgoing">{comments&&<b>your_business</b>}{answer}<small>10:24 {kind==='whatsapp'&&<CheckCheck size={12}/>}</small></div>
      {options&&<div className="native-options">{options.map(option=><span key={option}>{option}</span>)}</div>}
    </div>
  </div>
}

