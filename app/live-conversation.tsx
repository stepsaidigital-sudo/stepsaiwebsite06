'use client';
import {useEffect,useRef} from 'react';
import {ArrowUpRight,Check,CheckCheck,ChevronLeft,Mic,MoreHorizontal,Plus,SendHorizontal,ShoppingCart,UserRound,X} from 'lucide-react';
import {channelKind} from './channel-chat';

export type Product={name:string;price:string;was:string;off:string;description:string;image:string};
const arrivals=[700,3700,6900,10500];

// Four messages, customer first, then alternating customer / agent. Shown from the customer’s phone: their own
// messages on the right in the app colour, the business agent’s replies on the left (typing dots only for the agent).
export function LiveConversation({channel,messages,products,time}:{channel:string;messages:string[];products?:Product[];time:number}){
  const kind=channelKind(channel);
  if(kind==='website')return <ShopperWidget messages={messages} products={products??[]} time={time}/>;
  return <div className={`channel-chat channel-${kind} live-chat`} aria-label={`${channel} animated conversation illustration`}><div className="native-chat-body">{messages.map((message,i)=>{const shown=time>=arrivals[i];const typing=!shown&&time>=arrivals[i]-(i%2?1900:550);const agent=i%2===1;return <div className={`live-message-slot slot-${i} ${agent?'from-agent':'from-customer'}`} key={message}><div className={`native-message ${agent?'incoming':'outgoing'} ${shown?'message-arrived':'message-waiting'}`} aria-hidden={!shown}>{message}<small>10:{i<2?'24':'25'} {kind==='whatsapp'&&!agent&&<CheckCheck size={12}/>}</small></div>{typing&&agent&&<div className="chat-typing agent-typing" aria-label="Agent is typing"><i/><i/><i/></div>}</div>})}</div></div>
}

// Website tab: the real Steps AI "Shopper" widget. Customer on the right in blue, agent on the left in grey,
// product cards under the agent's first reply, and a fixed-height body that keeps the newest message in view.
function ShopperWidget({messages,products,time}:{messages:string[];products:Product[];time:number}){
  const body=useRef<HTMLDivElement>(null);
  const added=time>=arrivals[3];
  const step=arrivals.filter(a=>time>=a).length,typing=step<4&&step%2===1&&time>=arrivals[step]-1900;
  useEffect(()=>{const el=body.current;if(el)el.scrollTo({top:el.scrollHeight,behavior:time===0?'auto':'smooth'})},[step,typing,time===0]);
  return <div className="hc-w" aria-label="Website shopping assistant animated conversation illustration">
    <header className="hc-w-head"><ChevronLeft size={18}/><span className="hc-w-avatar"><UserRound size={18}/><i/></span><div><strong>Shopper</strong><small>Active</small></div><span className="hc-w-cart"><ShoppingCart size={18}/>{added&&<b>1</b>}</span><MoreHorizontal size={18}/><X size={17}/></header>
    <div className="hc-w-body" ref={body}>
      {messages.slice(0,step).map((message,i)=><div key={message} className={`hc-w-msg ${i%2?'agent':'customer'}`}>
        <p>{message}</p>
        {i===1&&products.length>0&&<><small className="hc-w-showing">Showing {products.length} products</small>{products.map((p,n)=>{const inCart=added&&n===0;return <div className="hc-w-product" key={p.name}><img src={p.image} alt="" width="84" height="84"/><div><strong>{p.name}<ArrowUpRight size={12}/></strong><span className="hc-w-price"><b>{p.price}</b><s>{p.was}</s><em>{p.off}</em></span><span className={`hc-w-add ${inCart?'in-cart':''}`}>{inCart?<><Check size={13}/>Added to cart</>:<><Plus size={13}/>Add to cart</>}</span></div><p>{p.description}</p></div>})}</>}
      </div>)}
      {typing&&<div className={`hc-w-typing ${step%2?'agent':'customer'}`}><i/><i/><i/></div>}
    </div>
    <footer className="hc-w-foot"><div><span>Hop in! I’ll help you</span><Mic size={15}/><b><SendHorizontal size={14}/></b></div><small>Powered by <strong>STEPS AI</strong></small></footer>
  </div>
}
