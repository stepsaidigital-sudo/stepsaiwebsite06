'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowDown,ArrowRight,Check,Globe} from 'lucide-react';
import {ChannelChat,ChannelLogo} from './channel-chat';
import copy from './copy.json';

const channels=[
  {name:'WhatsApp',title:copy.journey.stages[0].items[0].title,description:copy.journey.stages[0].items[0].paragraphs[0],question:'Do you have the offer in a smaller size?',answer:'I can help you choose a size. Which item caught your eye?',result:'From campaign to conversation',tag:'Campaigns · Conversations · Follow-ups'},
  {name:'Instagram',title:copy.journey.stages[0].items[1].title,description:copy.journey.stages[0].items[1].paragraphs[0],question:'I saw your post. Could you send me the details?',answer:'Of course. What would you like to know about the collection?',result:'From a comment to a useful answer',tag:'Comments · Direct messages · Your team'},
  {name:'Messenger',title:copy.journey.stages[2].items[0].title,description:copy.journey.stages[2].items[0].paragraphs[0],question:'Can you help me understand your services?',answer:'Absolutely. Tell me what you’re looking for and I’ll help you find the right information.',result:'Help customers in the conversation',tag:'Questions · Answers · Human help'},
  {name:'Website',title:copy.journey.stages[1].items[1].title,description:copy.journey.stages[1].items[1].paragraphs[0],question:'Can I speak with your team about a demo?',answer:'Of course. Share a little about your business so our team can prepare for the conversation.',result:'A conversation your team can continue',tag:'Visitors · Enquiries · Customer context'}
];

export function HeroChannels(){
  const [active,setActive]=useState(0);
  const [pinned,setPinned]=useState(false);
  const runway=useRef<HTMLDivElement>(null),frame=useRef<HTMLDivElement>(null);
  const step=useRef(480);
  useEffect(()=>{
    const outer=runway.current!,inner=frame.current!;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const measure=()=>{
      step.current=Math.max(420,innerHeight*.7);
      const fits=innerWidth>=760&&inner.offsetHeight+100<=innerHeight&&!reduced.matches;
      setPinned(fits);
      outer.style.height=fits?`${inner.offsetHeight+step.current*channels.length}px`:'auto';
    };
    const observer=new ResizeObserver(measure);observer.observe(inner);
    window.addEventListener('resize',measure);reduced.addEventListener('change',measure);measure();
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
    <div ref={frame} className="channel-theatre">
      <nav className="channel-icon-tabs" aria-label="Preview a customer channel">{channels.map((item,i)=><button key={item.name} aria-label={item.name} aria-pressed={active===i} aria-controls={`hero-channel-${i}`} onClick={()=>select(i)} onKeyDown={event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const next=(i+(event.key==='ArrowRight'?1:-1)+channels.length)%channels.length;select(next);event.currentTarget.parentElement?.querySelectorAll('button')[next]?.focus()}}}><ChannelLogo channel={item.name}/><span>{item.name}</span></button>)}</nav>
      <div className="channel-presentation">{channels.map((item,i)=><article id={`hero-channel-${i}`} key={item.name} className={`channel-presentation-panel panel-${i} ${active===i?'is-current':''}`} aria-hidden={active!==i} inert={active!==i}>
        <div className="channel-explanation"><div className="channel-product-label"><img src="/brands/steps-original.png" alt=""/><span>Steps AI <span className="channel-label-divider">/</span> {item.name}</span></div><h2>{item.title}</h2><p>{item.description}</p><a href="#product" className="channel-learn">Explore how it works <ArrowRight size={17}/></a></div>
        <div className="channel-demo-canvas"><div className="channel-demo-top"><ChannelLogo channel={item.name}/><span>{item.name}</span><small>Illustration</small></div><div className="channel-demo-conversation"><ChannelChat channel={item.name} question={item.question} answer={item.answer}/></div><div className="channel-demo-result"><span><Check size={15}/></span>{item.result}</div><div className="channel-demo-tag">{item.tag}</div></div>
      </article>)}</div>
      <div className="channel-scroll-cue"><span>0{active+1} <i>/ 04</i></span><span>{pinned?'Scroll to explore channels':'Choose a channel above'} <ArrowDown size={14}/></span><div aria-hidden="true">{channels.map((c,i)=><i key={c.name} className={i===active?'active':''}/>)}</div></div>
    </div>
  </div>
}
