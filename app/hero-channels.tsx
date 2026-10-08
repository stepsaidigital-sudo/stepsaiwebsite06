'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowDown,ArrowRight,Check,Phone,PhoneCall,Mic,Volume2,Pause,Play,RotateCcw} from 'lucide-react';
import {ChannelLogo} from './channel-chat';
import {LiveConversation} from './live-conversation';
import copy from './copy.json';

const channels=[
  {name:'WhatsApp',title:copy.journey.stages[0].items[0].title,description:copy.journey.stages[0].items[0].paragraphs[0],question:'Do you have the offer in a smaller size?',answer:'I can help you choose a size. Which item caught your eye?',result:'From campaign to conversation',tag:'Campaigns · Conversations · Follow-ups'},
  {name:'Instagram',title:copy.journey.stages[0].items[1].title,description:copy.journey.stages[0].items[1].paragraphs[0],question:'I saw your post. Could you send me the details?',answer:'Of course. What would you like to know about the collection?',result:'From a comment to a useful answer',tag:'Comments · Direct messages · Your team'},
  {name:'Messenger',title:copy.journey.stages[2].items[0].title,description:copy.journey.stages[2].items[0].paragraphs[0],question:'Can you help me understand your services?',answer:'Absolutely. Tell me what you’re looking for and I’ll help you find the right information.',result:'Help customers in the conversation',tag:'Questions · Answers · Human help'},
  {name:'Website',title:copy.journey.stages[1].items[1].title,description:copy.journey.stages[1].items[1].paragraphs[0],question:'Can I speak with your team about a demo?',answer:'Of course. Share a little about your business so our team can prepare for the conversation.',result:'A conversation your team can continue',tag:'Visitors · Enquiries · Customer context'},
  {name:'Phone calls',title:'A helpful voice on the other end.',description:'Let customers call your business as usual. Your AI calling agent can answer questions and help them take the next step.',question:'Can I arrange a visit tomorrow?',answer:'Of course. Would morning or afternoon work better for you?',result:'A normal phone call. A useful conversation.',tag:'Phone calls · Voice conversations · Your business'}
];

function VoiceScene({time,paused}:{time:number;paused:boolean}){return <div className={`voice-scene ${paused||time>=12000?'voice-paused':''}`}><div className="voice-call-label"><span className="voice-status-dot"/> {time<700?'Connecting…':time<12000?'Example phone conversation':'Conversation complete'} <span>00:{String(Math.floor(time/1000)).padStart(2,'0')}</span></div><div className="voice-orbit"><div><PhoneCall size={26}/></div></div><div className="voice-wave" aria-hidden="true">{[12,22,16,34,48,27,42,58,36,24,50,64,38,52,28,44,60,32,22,42,29,18,26,12].map((height,i)=><i key={i} style={{height,animationDelay:`${i*65}ms`}}/>)}</div><div className="voice-transcript">{[{at:1000,who:'Customer',text:'Can I arrange a visit tomorrow?'},{at:3900,who:'AI calling agent',text:'Of course. Would morning or afternoon work better for you?'},{at:7300,who:'Customer',text:'Afternoon would be perfect.'},{at:10600,who:'AI calling agent',text:'Let’s check the available afternoon times.'}].map(line=><div key={line.at} className={time>=line.at?'voice-line line-shown':'voice-line'} aria-hidden={time<line.at}><span>{line.who}</span><p>“{line.text}”</p></div>)}</div><div className="voice-controls"><span><Mic size={15}/> {time<700?'Connecting':time<3900?'Listening':time<7300?'Agent speaking':time<10600?'Listening':'Next step'}</span><Volume2 size={16}/></div></div>}

function SceneContext({index}:{index:number}){return <div className={`scene-context scene-context-${index}`} aria-hidden="true">{index===0?<><img src="/industries/ecommerce.png" alt=""/><div><small>A message worth opening</small><strong>A little something, picked for you.</strong><span>Explore the collection <ArrowRight size={12}/></span></div></>:index===1?<><img src="/industries/ecommerce.png" alt=""/><div><small>From your latest post</small><strong>“Details, please!”</strong><span>Comment → Conversation</span></div></>:index===2?<><span className="context-orb">?</span><div><small>A customer needs help</small><strong>Make the next step clear.</strong><span>From a question to an answer</span></div></>:<><div className="context-browser-dots"><i/><i/><i/></div><div><small>Your website</small><strong>Turn a visit into a conversation.</strong><span>A helpful welcome, right on your page</span></div></>}</div>}

export function HeroChannels(){
  const [active,setActive]=useState(0);
  const [pinned,setPinned]=useState(false);
  const [paused,setPaused]=useState(false),[visible,setVisible]=useState(false),[reduced,setReduced]=useState(false);
  const [replay,setReplay]=useState(0);
  // The clock is keyed to the channel and replay, so a new channel starts from zero on its first render.
  const key=`${active}-${replay}`;
  const [clock,setClock]=useState({key,t:0});
  const time=reduced?12000:clock.key===key?clock.t:0;
  const runway=useRef<HTMLDivElement>(null),frame=useRef<HTMLDivElement>(null);
  const step=useRef(480);
  useEffect(()=>{
    const mq=matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduced(mq.matches);sync();mq.addEventListener('change',sync);
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.3});observer.observe(frame.current!);
    return()=>{observer.disconnect();mq.removeEventListener('change',sync)};
  },[]);
  useEffect(()=>{
    if(paused||!visible||reduced||time>=12000)return;
    const timer=window.setInterval(()=>{if(!document.hidden)setClock(c=>({key,t:Math.min(12000,(c.key===key?c.t:0)+100)}))},100);
    return()=>window.clearInterval(timer);
  },[paused,visible,reduced,time>=12000,key]);
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
    <div ref={frame} className={`channel-theatre ${paused?'playback-paused':''}`}>
      <nav className="channel-icon-tabs" aria-label="Preview a customer channel">{channels.map((item,i)=><button key={item.name} aria-label={item.name} aria-pressed={active===i} aria-controls={`hero-channel-${i}`} onClick={()=>select(i)} onKeyDown={event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const next=(i+(event.key==='ArrowRight'?1:-1)+channels.length)%channels.length;select(next);event.currentTarget.parentElement?.querySelectorAll('button')[next]?.focus()}}}>{i===4?<Phone size={22}/>:<ChannelLogo channel={item.name}/>}<span>{item.name}</span></button>)}</nav>
      <div className="channel-presentation">{channels.map((item,i)=><article id={`hero-channel-${i}`} key={item.name} className={`channel-presentation-panel panel-${i} ${active===i?'is-current':''}`} aria-hidden={active!==i} inert={active!==i}>
        <div className="channel-explanation"><div className="channel-product-label"><span className="channel-story-number">0{i+1}</span><span>{['Start a conversation','Keep the interest going','Make help feel effortless','Welcome every visitor','Let the conversation flow'][i]}</span></div><h2>{item.title}</h2><p>{item.description}</p><a href="#product" className="channel-learn">Explore how it works <ArrowRight size={17}/></a></div>
        <div className={`channel-demo-canvas ${i===4?'is-voice':''}`}><span className="scene-illustration">Illustration</span>{i===4?<VoiceScene time={active===i?time:0} paused={paused||!visible||reduced}/>:<><SceneContext index={i}/><div className="channel-demo-conversation"><LiveConversation channel={item.name} question={item.question} answer={item.answer} time={active===i?time:0}/></div></>}<div className={`channel-demo-result ${time>=12000?'result-arrived':'result-waiting'}`} aria-hidden={time<12000}><span><Check size={15}/></span>{item.result}</div></div>
      </article>)}</div>
      <div className="conversation-playback"><span>{time>=12000?'Conversation complete':paused?'Animation paused':'A conversation, step by step'}</span><button aria-label={paused?'Resume conversation animation':'Pause conversation animation'} onClick={()=>setPaused(!paused)}>{paused?<Play size={13}/>:<Pause size={13}/>}</button><button aria-label="Replay conversation" onClick={()=>{setReplay(value=>value+1);setPaused(false)}}><RotateCcw size={13}/></button></div><div className="channel-scroll-cue"><span>0{active+1} <i>/ 0{channels.length}</i></span><span>{pinned?'Scroll to explore channels':'Choose a channel above'} <ArrowDown size={14}/></span><div aria-hidden="true">{channels.map((c,i)=><i key={c.name} className={i===active?'active':''}/>)}</div></div>
    </div>
  </div>
}
