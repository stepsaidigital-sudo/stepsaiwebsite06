'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowRight,Check,Phone} from 'lucide-react';
import {ChannelLogo} from './channel-chat';
import {LiveConversation,type Product} from './live-conversation';
import {PhoneFrame,CallScreen} from '@/components/premium/kit';

import { asset } from '@/lib/asset';
// Hero copy is its own (not the journey section's), so each tab describes the conversation its mockup plays.
// `panel` keeps each channel's original panel-N styling after the tabs were reordered.
type Channel={name:string;href:string;cta:string;panel:number;label:string;title:string;description:string;messages?:string[];products?:Product[];result:string};
const channels:Channel[]=[
  {name:'Website',href:'/channels/website-ai-agent/',cta:'Explore website agent',panel:3,label:'Help them buy',title:'Help shoppers choose and buy on your website',description:'Shoppers tell your agent what they need and how much they want to spend. It shows matching products from your catalogue, adds them to the cart and answers questions before checkout.',
    messages:['need a housewarming gift under ₹2,000','These two fit your budget. The Sol Ceramic Vase is the one most people pick for a new home.','add the sol vase. do you gift wrap?','Added to your cart. Gift wrap is ₹99, and you can add a note at checkout.'],
    products:[{name:'Sol Ceramic Vase',price:'₹1,890.00',was:'₹2,690.00',off:'30% off',description:'Hand-finished stoneware vase with a matte glaze. Fits a small bunch of stems.',image:asset('/images/stories/homeware-still-life.webp')},{name:'Dune Vase and Bowl Set',price:'₹1,650.00',was:'₹2,350.00',off:'30% off',description:'Speckled stoneware vase and serving bowl, packed in a gift box.',image:asset('/industries/ecommerce.webp')}],
    result:'From a question to a full cart'},
  {name:'WhatsApp',href:'/channels/whatsapp-ai-agent/',cta:'Explore WhatsApp agent',panel:0,label:'Check an order',title:'Answer order questions on WhatsApp',description:'Customers message you about their order. Your agent looks it up in Shopify and replies with the actual status. If a change needs a person, it hands the chat to your team.',
    messages:['hi, i ordered a linen shirt on monday. order 4821. when will it come?','Found it. Order #4821 shipped yesterday and is due on Friday.','can i change the address? i’ll be at office that day','It has already shipped, so the address has to be changed with the courier. I’ve passed this to our team and Priya will reply here shortly.'],
    result:'Real order status, then a person for the change'},
  {name:'Phone calls',href:'/channels/ai-calling-agent/',cta:'Explore AI calling agent',panel:4,label:'Pick up the phone',title:'Call your leads and answer every call',description:'Your AI calling agent calls new leads to check whether they’re interested. It also confirms orders, books appointments and answers when customers call you. Every call is saved with a transcript.',
    result:''},
  {name:'Instagram',href:'/channels/instagram-ai-agent/',cta:'Explore Instagram agent',panel:1,label:'From comment to DM',title:'Reply to Instagram comments in DMs',description:'When someone comments a word like PRICE on your post, your agent sends them a DM with the details. Then it keeps answering their questions.',
    messages:['hi, commented on ur reel. price for the kantha jacket?','It’s ₹3,450 and comes in S to XL. Shipping is free on orders over ₹2,000. Need help with the size?','im usually M but shoulders are always tight on me','It’s a relaxed fit, so most people stay with their usual size. M fits up to a 40 inch chest. Here’s the link for M.'],
    result:'From a comment to an order link'},
  {name:'Messenger',href:'/channels/messenger-ai-agent/',cta:'Explore Messenger agent',panel:2,label:'Handle a return',title:'Handle exchanges on Messenger',description:'Your agent answers from your return policy and checks the delivery date. It then creates a ticket so your team can arrange the pickup.',
    messages:['The shoes are one size too small. Can I exchange them?','Please share your order ID, the size you need and whether the shoes are unworn.','Order #4821. I need UK 9, and they’re unworn.','Thanks. I checked order #4821: it was delivered 5 days ago, within our 15-day exchange window. UK 9 is in stock. Shall I raise an exchange request?','Yes, please.','I’ve created your exchange request for UK 9. Our team will message you here to arrange the pickup.'],
    result:'Policy answer, ticket created'}
];
const chatDuration=(count:number)=>400+Math.max(0,count-1)*1800+900;
const isCall=(c:Channel)=>c.name==='Phone calls';

// A fixed excerpt keeps the call controls in place while visitors read.
const callPreview={business:'Horizon Overseas Education',result:'Lead checked, counsellor call booked',lines:[
  {at:0,who:'Rahul',text:'Can I speak to a counsellor on Saturday at 11?'},
  {at:1,who:'AI assistant',text:'Your counsellor call is booked for Saturday at 11.'}
]};
function CallPhone(){return <div className="hero-call"><PhoneFrame dark><CallScreen business={callPreview.business} transcript={callPreview.lines} t={18000} label="Outgoing call · Transcript"/></PhoneFrame></div>}

export function HeroChannels(){
  const [active,setActive]=useState(0);
  const [pinned,setPinned]=useState(false);
  // The pause/replay strip was removed from the hero; playback always runs while the panel is visible.
  const paused=false,replay=0;
  const [visible,setVisible]=useState(false),[reduced,setReduced]=useState(false);
  // Only chat previews need a playback clock.
  const duration=isCall(channels[active])?0:chatDuration(channels[active].messages!.length);
  // The clock is keyed to the channel and replay, so a new channel starts from zero on its first render.
  const key=`${active}-${replay}`;
  const [clock,setClock]=useState({key,t:0});
  const time=reduced?duration:clock.key===key?clock.t:0;
  const runway=useRef<HTMLDivElement>(null),frame=useRef<HTMLDivElement>(null);
  const step=useRef(480);
  useEffect(()=>{
    const mq=matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduced(mq.matches);sync();mq.addEventListener('change',sync);
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.3});observer.observe(frame.current!);
    return()=>{observer.disconnect();mq.removeEventListener('change',sync)};
  },[]);
  useEffect(()=>{
    if(paused||!visible||reduced||time>=duration)return;
    const timer=window.setInterval(()=>{if(!document.hidden)setClock(c=>({key,t:Math.min(duration,(c.key===key?c.t:0)+100)}))},100);
    return()=>window.clearInterval(timer);
  },[paused,visible,reduced,time>=duration,key,duration]);
  useEffect(()=>{
    const outer=runway.current!,inner=frame.current!;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    // The scale is worked out once per window size. Recomputing it whenever the content resized (chat bubbles
    // arriving) fed back into itself: the new scale changed the measured size, which changed the scale (blinking).
    let scaleKey='',lastScale=1;
    const measure=()=>{
      step.current=Math.max(420,innerHeight*.7);
      // Decide pinning from the natural (unscaled) size, which pinning itself never changes.
      // Measuring the pinned layout here made the hero flip pinned/unpinned in a loop (blinking).
      const pres=inner.querySelector('.channel-presentation') as HTMLElement,tabs=inner.querySelector('.channel-icon-tabs') as HTMLElement;
      const zoom=parseFloat(getComputedStyle(pres).zoom)||1;
      const presNatural=pres.getBoundingClientRect().height/zoom;
      const natural=tabs.offsetHeight+presNatural+60;
      const fits=innerWidth>=760&&natural+100<=innerHeight&&!reduced.matches;
      // Scale up into the room left on taller screens, never past what fits, never below 1.
      const key=`${innerWidth}x${innerHeight}x${fits}`;
      if(key!==scaleKey){scaleKey=key;lastScale=fits&&innerWidth>=1000?Math.max(1,Math.min(1.4,(innerHeight-104-tabs.offsetHeight-125)/presNatural)):1}
      outer.style.setProperty('--hero-z',lastScale.toFixed(3));
      setPinned(fits);
      outer.style.height=fits?`${inner.offsetHeight+step.current*channels.length}px`:'auto';
    };
    const observer=new ResizeObserver(measure);observer.observe(inner);
    window.addEventListener('resize',measure);reduced.addEventListener('change',measure);measure();
    // Web fonts change the natural height, so size once more after they load.
    document.fonts?.ready.then(()=>{scaleKey='';measure()});
    return()=>{observer.disconnect();window.removeEventListener('resize',measure);reduced.removeEventListener('change',measure)};
  },[]);
  useEffect(()=>{
    if(!pinned)return;
    let raf=0;
    const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{
      const travelled=92-runway.current!.getBoundingClientRect().top;
      setActive(Math.max(0,Math.min(channels.length-1,Math.floor((travelled+step.current*.08)/step.current))));
    })};
    window.addEventListener('scroll',update,{passive:true});update();
    return()=>{window.removeEventListener('scroll',update);cancelAnimationFrame(raf)};
  },[pinned]);
  const select=(i:number)=>{
    setActive(i);
    if(pinned)window.scrollTo({top:scrollY+runway.current!.getBoundingClientRect().top-92+i*step.current,behavior:'instant'});
  };
  return <div id="showcase" className={`channel-runway ${pinned?'channel-pinned':''}`} ref={runway} data-channel={channels[active].name}>
    <div ref={frame} className={`channel-theatre ${paused?'playback-paused':''}`}>
      <nav className="channel-icon-tabs" aria-label="Preview a customer channel">{channels.map((item,i)=><button key={item.name} aria-label={item.name} aria-pressed={active===i} aria-controls={`hero-channel-${i}`} onClick={()=>select(i)} onKeyDown={event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const next=(i+(event.key==='ArrowRight'?1:-1)+channels.length)%channels.length;select(next);event.currentTarget.parentElement?.querySelectorAll('button')[next]?.focus()}}}>{isCall(item)?<Phone size={22}/>:<ChannelLogo channel={item.name}/>}<span>{item.name}</span></button>)}</nav>
      <div className="channel-presentation">{channels.map((item,i)=>{
        const t=active===i?time:0;
        // The call excerpt is static; chat results appear after playback.
        const call=isCall(item)?callPreview:null;
        const result=call?call.result:item.result;
        const arrived=call?true:t>=chatDuration(item.messages!.length);
        return <article id={`hero-channel-${i}`} key={item.name} className={`channel-presentation-panel panel-${item.panel} ${active===i?'is-current':''}`} aria-hidden={active!==i} inert={active!==i}>
          <div className="channel-explanation"><div className="channel-product-label"><span className="channel-story-number">0{i+1}</span><span>{item.label}</span></div><h2>{item.title}</h2><p>{item.description}</p><a href={item.href} className="channel-learn">{item.cta} <ArrowRight size={17}/></a></div>
          <div className={`channel-demo-canvas ${call?'is-call':''}`}>{call?<CallPhone/>:<><div className="channel-demo-conversation"><LiveConversation channel={item.name} messages={item.messages!} products={item.products} time={t}/></div></>}<div key={result} className={`channel-demo-result ${arrived?'result-arrived':'result-waiting'}`} aria-hidden={!arrived}><span><Check size={15}/></span>{result}</div></div>
        </article>})}</div>
    </div>
  </div>
}
