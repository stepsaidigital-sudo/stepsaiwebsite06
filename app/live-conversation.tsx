'use client';
import {CheckCheck} from 'lucide-react';
import {channelKind} from './channel-chat';

const followups:Record<string,[string,string]>={
  WhatsApp:['The ceramic vase. It’s a gift.','A lovely choice. I can help you check the size and delivery options.'],
  Instagram:['Is it available in cream?','Let me help you find the cream options from the collection.'],
  Messenger:['I’m looking for help with customer support.','I can explain how it works and help you speak with the team.'],
  Website:['We’re a small team with a lot of customer enquiries.','Thanks. I’ll include that context so the team can prepare for your demo.']
};
export function LiveConversation({channel,question,answer,time}:{channel:string;question:string;answer:string;time:number}){
  const kind=channelKind(channel),extra=followups[channel];
  const messages=[question,answer,...extra];
  const arrivals=[700,3700,6900,10500];
  return <div className={`channel-chat channel-${kind} live-chat`} aria-label={`${channel} animated conversation illustration`}><div className="native-chat-body">{messages.map((message,i)=>{const shown=time>=arrivals[i];const typing=!shown&&time>=arrivals[i]-(i%2?1900:550);return <div className={`live-message-slot slot-${i}`} key={message}><div className={`native-message ${i%2?'outgoing':'incoming'} ${shown?'message-arrived':'message-waiting'}`} aria-hidden={!shown}>{message}<small>10:{i<2?'24':'25'} {kind==='whatsapp'&&<CheckCheck size={12}/>}</small></div>{typing&&<div className={`chat-typing ${i%2?'agent-typing':'customer-typing'}`} aria-label={i%2?'Agent is typing':'Customer is typing'}><i/><i/><i/></div>}</div>})}</div></div>
}
