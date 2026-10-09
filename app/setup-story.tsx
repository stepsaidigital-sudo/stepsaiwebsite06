'use client';
import {useEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react';
import {Check,FileText,Globe,Settings2,Radio,Play,Pause,RotateCcw,Headphones,ShieldCheck,Sparkles,Rocket,MousePointer2,PhoneCall,Eye,X,Send,ShoppingBag,CalendarCheck} from 'lucide-react';
import {ChannelLogo} from './channel-chat';
import copy from './copy.json';
import {usePinnedTour} from './use-pinned-tour';

// "Set it up for the way your business works": the mirror of the team section.
// An "Agent builder" app on the left plays through the four setup steps; the copy,
// step list and tour controls on the right share the team section's ps-* styles.
// Copy is the SEO specialist's, word for word (docs/seo-homepage-source.md). Mockup data is illustrative.

const icons=[FileText,Settings2,Radio,Rocket];
const steps=['Information','Personality','Channels','Go live'];
const DURATION=5000;

// An element that animates in once its pane is current; --d is its delay.
const A=({d,className='',children}:{d:number;className?:string;children?:ReactNode})=><div className={`sb-a ${className}`} style={{'--d':`${d}ms`} as CSSProperties}>{children}</div>;
const Cursor=()=><span className="sb-cursor" aria-hidden="true"><MousePointer2 size={20}/></span>;

/* 01: paste a URL and watch pages and documents get read, one by one. */
function SourcesPane(){
  return <div className="sb-pane-inner">
    <A d={0} className="sb-pane-title"><strong>Business information</strong><small>What your agent answers from</small></A>
    <A d={150} className="sb-field"><small>Website</small><span className="sb-input sb-url"><Globe size={14}/><span className="sb-typed sb-typed-url">yourstore.com</span><span className="sb-ok" style={{'--d':'1000ms'} as CSSProperties}><Check size={12}/></span></span></A>
    <A d={900} className="sb-reading"><span>Reading your pages</span><b><i/>Live</b></A>
    {[['/products','Page'],['/faq','Page'],['/shipping-returns','Page'],['Price list.pdf','Document']].map(([path,kind],i)=><A key={path} d={1200+i*350} className="sb-page"><FileText size={14}/><code>{path}</code><small>{kind}</small><span className="sb-indexed" style={{'--d':`${1500+i*350}ms`} as CSSProperties}><Check size={12}/>Read</span></A>)}
    <A d={2900} className="sb-ready"><Sparkles size={14}/><b>Knowledge ready</b>&nbsp;· 48 pages and 3 documents</A>
  </div>;
}

/* 02: pick a persona, set the tone, write instructions and handover rules (product UI). */
const personas=[{name:'Product guide',role:'Helps shoppers choose',bg:'#e6f0ff',fg:'#1d5fb8',Icon:ShoppingBag},{name:'Support helper',role:'Answers order questions',bg:'#e9f8ef',fg:'#1f6a45',Icon:Headphones},{name:'Booking assistant',role:'Fills your calendar',bg:'#fff3d6',fg:'#8a5a00',Icon:CalendarCheck}];
function TonePane(){
  return <div className="sb-pane-inner sb-ui">
    <A d={0} className="sb-pane-title"><strong>Persona</strong><small>How Ava sounds and when your team steps in</small></A>
    <A d={150} className="sb-personas">{personas.map(({name,role,bg,fg,Icon},i)=><span key={name} className={i===0?'sb-persona sb-persona-pick':'sb-persona'}><i style={{background:bg,color:fg}}><Icon size={14}/></i><b>{name}</b><small>{role}</small><em><Check size={10}/></em></span>)}</A>
    <A d={450} className="sb-row2"><div className="sb-field"><small>Tone</small><span className="sb-segment"><i className="sb-thumb"/><span>Formal</span><span className="sb-picked">Friendly</span><span>Playful</span></span></div></A>
    <A d={650} className="sb-field"><small>Instructions</small><span className="sb-input sb-area"><span className="sb-typed sb-typed-long">Keep answers short. Offer to book a call when someone asks about pricing.</span></span></A>
    <A d={850} className="sb-rule"><Headphones size={15}/><span>Hand over to your team for refunds</span><i className="sb-toggle"/></A>
    <Cursor/>
  </div>;
}

/* 03: switch the agent on for each channel. */
function ChannelsPane(){
  const list=[['Website','Chat widget on your site'],['WhatsApp','Business number'],['Instagram','DMs and comments'],['Messenger','Facebook Page'],['Phone calls','AI calling agent']];
  return <div className="sb-pane-inner">
    <A d={0} className="sb-pane-title"><strong>Channels</strong><small>Where your agent answers</small></A>
    {list.map(([name,detail],i)=><A key={name} d={150+i*120} className="sb-channel"><span className="sb-ch-logo">{name==='Phone calls'?<PhoneCall size={15}/>:<ChannelLogo channel={name}/>}</span><div><strong>{name}</strong><small>{detail}</small></div><i className="sb-switch" style={{'--d':`${900+i*380}ms`} as CSSProperties}/></A>)}
    <A d={3000} className="sb-meta"><ShieldCheck size={14}/>One Meta login connects WhatsApp, Instagram and Messenger</A>
  </div>;
}

/* 04: preview the real widget, check the answer's source, then Go live (product UI). */
function TestPane(){
  return <div className="sb-pane-inner sb-ui sb-test">
    <A d={0} className="sb-test-bar"><span className="sb-preview"><Eye size={13}/>Preview</span><small>Only you can see this</small><span className="sb-golive"><Rocket size={14}/>Go live</span></A>
    <div className="sb-widget">
      <div className="sb-w-head"><span className="sb-w-av">A<i/></span><div><strong>Ava</strong><small>Active</small></div><X size={15}/></div>
      <div className="sb-w-body">
        <A d={200} className="sb-w-m sb-w-in">Hello! How can I help you today?</A>
        <A d={700} className="sb-w-m sb-w-out">Do you deliver to Pune?</A>
        <A d={1400} className="sb-w-m sb-w-in">Yes, we deliver to Pune in 3 to 5 working days. Want me to check a pin code?</A>
        <A d={1900} className="sb-w-source"><FileText size={11}/>Answered from FAQs › Delivery</A>
      </div>
      <div className="sb-w-compose"><span>Hop in! I’ll help you</span><i><Send size={12}/></i></div>
      <small className="sb-w-powered">Powered by <b>STEPS AI</b></small>
    </div>
    <A d={3700} className="sb-live"><i/>Live on 5 channels</A>
    <Cursor/>
  </div>;
}

const panes=[<SourcesPane key="s"/>,<TonePane key="t"/>,<ChannelsPane key="c"/>,<TestPane key="x"/>];

function Builder({current}:{current:number}){
  return <div className="sb">
    <div className="sb-bar"><span className="sb-logo"><Sparkles size={15}/></span><strong>Agent builder</strong><span className="sb-pill"><i/>{current===3?'Ava · Live':'Ava · Draft'}</span><span className="sb-dots" aria-hidden="true"><i/><i/><i/></span></div>
    <div className="sb-main">
      <nav className="sb-side" aria-hidden="true">{steps.map((step,i)=><span key={step} className={i<current?'is-done':i===current?'is-now':''}><b>{i<current?<Check size={12}/>:i+1}</b>{step}</span>)}<span className="sb-side-meter"><i style={{transform:`scaleY(${(current+1)/4})`}}/></span></nav>
      <div className="sb-panes">{panes.map((pane,i)=><div key={i} aria-hidden={current!==i} inert={current!==i} className={`sb-pane setup-scene ${current===i?'is-current':i<current?'is-before':'is-after'}`}>{pane}</div>)}</div>
    </div>
  </div>;
}

export function SetupStory(){
  const items=copy.setup.items.slice(0,4);
  const root=useRef<HTMLDivElement>(null),elapsed=useRef(0);
  const [timed,setTimed]=useState(0),[cycle,setCycle]=useState(0),[paused,setPaused]=useState(false),[visible,setVisible]=useState(false),[pageVisible,setPageVisible]=useState(true),[reduced,setReduced]=useState(false);
  // Pinned (desktop): scroll picks the step. Otherwise the tour autoplays on a timer.
  const tour=usePinnedTour(root,4);
  const current=tour.pinned?tour.index:timed;
  const running=visible&&pageVisible&&!paused&&!reduced;
  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);
    const visibility=()=>setPageVisible(!document.hidden);document.addEventListener('visibilitychange',visibility);
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.25});observer.observe(root.current!);
    return()=>{media.removeEventListener('change',update);document.removeEventListener('visibilitychange',visibility);observer.disconnect()};
  },[]);
  useEffect(()=>{
    // Advance one step every DURATION ms while the section is on screen, like the team tour.
    if(!running||tour.pinned)return;let frame=0,last=performance.now();
    const tick=(now:number)=>{elapsed.current+=Math.min(now-last,80);last=now;if(elapsed.current>=DURATION){elapsed.current=0;setTimed(c=>{if(c===3)setCycle(v=>v+1);return (c+1)%4});return}frame=requestAnimationFrame(tick)};
    frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
  },[timed,running,tour.pinned]);
  const select=(i:number)=>{if(tour.pinned){tour.go(i);return}elapsed.current=0;setTimed(i);setPaused(true)};
  const bar=(i:number)=>tour.pinned?{animation:'none',transform:`scaleX(${i<current?1:i===current?tour.progress:0})`}:{animationPlayState:running?'running':'paused',animationDuration:`${DURATION}ms`};
  return <div ref={root} className={`setup-runway ${tour.pinned?'is-pinned':''}`} style={tour.runwayStyle}><div className="ps-pin"><div className={`setup-tour ps-layout ${visible&&pageVisible?'':'is-offscreen'}`}>
    <div className="ps-copy">
      <h2>{copy.setup.title}</h2>
      <p className="setup-lead">{copy.setup.paragraphs[0]}</p>
      <div className="ps-features" aria-label="Setup tour scenes">{items.map((item,i)=>{const Icon=icons[i];return <button key={item.title} aria-pressed={current===i} onClick={()=>select(i)}><Icon size={21}/><span><span className="setup-step-title">{item.title}</span>{current===i&&<span className="setup-detail" key={current}>{item.paragraphs[0]}</span>}</span><small>0{i+1}</small></button>})}</div>
    </div>
    <div className="ps-visual setup-visual">
      <div className="ps-frame-header"><span><i/>Your agent, set up your way</span><div>{!tour.pinned&&<><button aria-label={paused?'Play setup tour':'Pause setup tour'} disabled={reduced} onClick={()=>setPaused(v=>!v)}>{paused?<Play size={14}/>:<Pause size={14}/>}</button><button aria-label="Replay setup tour" onClick={()=>{elapsed.current=0;setTimed(0);setCycle(v=>v+1);setPaused(false)}}><RotateCcw size={14}/></button></>}<b>0{current+1} / 04</b></div></div>
      <Builder key={cycle} current={current}/>
      <div className="ps-timeline" aria-hidden="true">{items.map((item,i)=><i key={tour.pinned?i:`${cycle}-${current}-${i}`} className={i===current?'is-current':i<current?'is-complete':''}><span style={bar(i)}/></i>)}</div>
    </div>
  </div></div></div>;
}
