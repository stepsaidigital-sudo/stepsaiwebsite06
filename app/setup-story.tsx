'use client';
import {useEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react';
import {Check,FileText,Globe,Settings2,GitBranch,Play,Pause,RotateCcw,MessageSquare,Users,Send,Headphones,ShieldCheck,Sparkles,Rocket,MousePointer2} from 'lucide-react';
import copy from './copy.json';

// "Set it up for the way your business works": the mirror of the team section.
// An "Agent builder" app on the left plays through the four setup steps; the copy,
// step list and tour controls on the right share the team section's ps-* styles.
// Copy is the SEO specialist's, word for word. Mockup data is illustrative.

const icons=[FileText,Settings2,GitBranch,Play];
const steps=['Information','Personality','Follow-up','Test'];
const DURATION=5000;

// An element that animates in once its pane is current; --d is its delay.
const A=({d,className='',children}:{d:number;className?:string;children?:ReactNode})=><div className={`sb-a ${className}`} style={{'--d':`${d}ms`} as CSSProperties}>{children}</div>;
const Cursor=()=><span className="sb-cursor" aria-hidden="true"><MousePointer2 size={20}/></span>;

function SourcesPane(){
  return <div className="sb-pane-inner">
    <A d={0} className="sb-pane-title"><strong>Knowledge sources</strong><small>What your agent can answer from</small></A>
    {[[Globe,'Website pages','yourstore.com'],[FileText,'FAQs','Returns, delivery and sizing'],[FileText,'Price list.pdf','Uploaded document']].map(([Icon,name,detail],i)=>{const I=Icon as typeof Globe;return <A key={name as string} d={200+i*250} className="sb-source"><span className="sb-source-icon"><I size={16}/></span><div><strong>{name as string}</strong><small>{detail as string}</small><span className="sb-progress"><i style={{'--d':`${400+i*450}ms`} as CSSProperties}/></span></div><span className="sb-synced" style={{'--d':`${1300+i*450}ms`} as CSSProperties}><Check size={13}/>Synced</span></A>})}
    <A d={2900} className="sb-shared"><Users size={14}/>Shared with your Sales and Support agents</A>
  </div>;
}

function TonePane(){
  return <div className="sb-pane-inner">
    <A d={0} className="sb-pane-title"><strong>Agent settings</strong><small>Name, tone and instructions</small></A>
    <A d={150} className="sb-field"><small>Name</small><span className="sb-input"><span className="sb-typed sb-typed-name">Ava</span></span></A>
    <A d={350} className="sb-field"><small>Tone</small><span className="sb-segment"><i className="sb-thumb"/><span>Formal</span><span className="sb-picked">Friendly</span><span>Playful</span></span></A>
    <A d={550} className="sb-field"><small>Instructions</small><span className="sb-input sb-area"><span className="sb-typed sb-typed-long">Keep answers short. Offer to book a call when someone asks about pricing.</span></span></A>
    <A d={800} className="sb-rule"><Headphones size={15}/><span>Call in your team for refund requests</span><i className="sb-toggle"/></A>
    <Cursor/>
  </div>;
}

function FlowPane(){
  return <div className="sb-pane-inner sb-flow">
    <A d={0} className="sb-pane-title"><strong>Follow-up workflow</strong><small>Runs after every new enquiry</small></A>
    <A d={200} className="sb-node"><MessageSquare size={15}/><div><small>Trigger</small><strong>New customer enquiry</strong></div></A>
    <i className="sb-wire" style={{'--d':'500ms'} as CSSProperties}/>
    <A d={700} className="sb-node"><Users size={15}/><div><small>Action</small><strong>Ask and save details</strong></div></A>
    <i className="sb-wire" style={{'--d':'1000ms'} as CSSProperties}/>
    <A d={1200} className="sb-node sb-condition"><GitBranch size={15}/><div><small>Condition</small><strong>Needs a person?</strong></div></A>
    <div className="sb-branches">
      <A d={1700} className="sb-node sb-small"><Headphones size={14}/><div><small>Yes</small><strong>Notify your team</strong></div></A>
      <A d={1900} className="sb-node sb-small"><Send size={14}/><div><small>No</small><strong>Send a reply</strong></div></A>
    </div>
    <A d={2900} className="sb-status"><Check size={14}/>Preview complete · sample enquiry routed to your team</A>
  </div>;
}

function TestPane(){
  return <div className="sb-pane-inner">
    <A d={0} className="sb-pane-title"><strong>Test conversation</strong><small>Only you can see this</small></A>
    <div className="sb-chat">
      <A d={250} className="sb-bubble sb-in">Do you deliver to Pune?</A>
      <A d={900} className="sb-bubble sb-out">Yes, we deliver to Pune in 3 to 5 working days.</A>
    </div>
    <A d={1600} className="sb-check"><ShieldCheck size={14}/>Answer found in your FAQs</A>
    <A d={1900} className="sb-check"><Check size={14}/>Workflow test passed</A>
    <A d={2300} className="sb-golive"><Rocket size={15}/>Go live</A>
    <Cursor/>
  </div>;
}

const panes=[<SourcesPane key="s"/>,<TonePane key="t"/>,<FlowPane key="f"/>,<TestPane key="x"/>];

function Builder({current}:{current:number}){
  return <div className="sb">
    <div className="sb-bar"><span className="sb-logo"><Sparkles size={15}/></span><strong>Agent builder</strong><span className="sb-pill"><i/>{current===3?'Ava · Ready':'Ava · Draft'}</span><span className="sb-dots" aria-hidden="true"><i/><i/><i/></span></div>
    <div className="sb-main">
      <nav className="sb-side" aria-hidden="true">{steps.map((step,i)=><span key={step} className={i<current?'is-done':i===current?'is-now':''}><b>{i<current?<Check size={12}/>:i+1}</b>{step}</span>)}<span className="sb-side-meter"><i style={{transform:`scaleY(${(current+1)/4})`}}/></span></nav>
      <div className="sb-panes">{panes.map((pane,i)=><div key={i} aria-hidden={current!==i} inert={current!==i} className={`sb-pane setup-scene ${current===i?'is-current':i<current?'is-before':'is-after'}`}>{pane}</div>)}</div>
    </div>
  </div>;
}

export function SetupStory(){
  const items=copy.setup.items.slice(0,4);
  const root=useRef<HTMLDivElement>(null),elapsed=useRef(0);
  const [current,setCurrent]=useState(0),[cycle,setCycle]=useState(0),[paused,setPaused]=useState(false),[visible,setVisible]=useState(false),[pageVisible,setPageVisible]=useState(true),[reduced,setReduced]=useState(false);
  const running=visible&&pageVisible&&!paused&&!reduced;
  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);
    const visibility=()=>setPageVisible(!document.hidden);document.addEventListener('visibilitychange',visibility);
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.25});observer.observe(root.current!);
    return()=>{media.removeEventListener('change',update);document.removeEventListener('visibilitychange',visibility);observer.disconnect()};
  },[]);
  useEffect(()=>{
    // Advance one step every DURATION ms while the section is on screen, like the team tour.
    if(!running)return;let frame=0,last=performance.now();
    const tick=(now:number)=>{elapsed.current+=Math.min(now-last,80);last=now;if(elapsed.current>=DURATION){elapsed.current=0;setCurrent(c=>{if(c===3)setCycle(v=>v+1);return (c+1)%4});return}frame=requestAnimationFrame(tick)};
    frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
  },[current,running]);
  const select=(i:number)=>{elapsed.current=0;setCurrent(i);setPaused(true)};
  return <div ref={root} className={`setup-tour ps-layout ${visible&&pageVisible?'':'is-offscreen'}`}>
    <div className="ps-copy">
      <h2>{copy.setup.title}</h2>
      <p className="setup-lead">{copy.setup.paragraphs[0]}</p>
      <div className="ps-features" aria-label="Setup tour scenes">{items.map((item,i)=>{const Icon=icons[i];return <button key={item.title} aria-pressed={current===i} onClick={()=>select(i)}><Icon size={21}/><span>{item.title}</span><small>0{i+1}</small></button>})}</div>
      <p className="setup-detail" key={current}>{items[current].paragraphs[0]}</p>
      <p className="ps-playback-note">{reduced?'Choose a step to explore.':paused?'Tour paused. Explore a step or press play.':'A short tour, one step at a time.'}</p>
    </div>
    <div className="ps-visual setup-visual">
      <div className="ps-frame-header"><span><i/>Your agent, set up your way</span><div><button aria-label={paused?'Play setup tour':'Pause setup tour'} disabled={reduced} onClick={()=>setPaused(v=>!v)}>{paused?<Play size={14}/>:<Pause size={14}/>}</button><button aria-label="Replay setup tour" onClick={()=>{elapsed.current=0;setCurrent(0);setCycle(v=>v+1);setPaused(false)}}><RotateCcw size={14}/></button><b>0{current+1} / 04</b></div></div>
      <Builder key={cycle} current={current}/>
      <div className="ps-timeline" aria-hidden="true">{items.map((item,i)=><i key={`${cycle}-${current}-${i}`} className={i===current?'is-current':i<current?'is-complete':''}><span style={{animationPlayState:running?'running':'paused',animationDuration:`${DURATION}ms`}}/></i>)}</div>
    </div>
  </div>;
}
