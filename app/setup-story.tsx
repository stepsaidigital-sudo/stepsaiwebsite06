'use client';
import {useEffect,useRef,useState} from 'react';
import {Check,FileText,Globe,BookOpen,Settings2,GitBranch,Play,MessageSquare,Users,Send,Headphones,UserRound,ShieldCheck,FlaskConical} from 'lucide-react';
import copy from './copy.json';

// "Set it up for the way your business works": the four setup features scroll
// past while a sticky stage on the other side shows the matching product view.
// Copy is the SEO specialist's, word for word. Mockup data is illustrative.

const icons=[FileText,Settings2,GitBranch,Play];

function Workflow(){const [tested,setTested]=useState(false);return <div className="workflow"><div className="workflow-toolbar"><span><GitBranch size={18}/> Follow-up workflow</span><button onClick={()=>setTested(!tested)}><Play size={14}/>{tested?'Reset preview':'Test workflow'}</button></div><div className="workflow-canvas"><div className="workflow-node"><MessageSquare size={20}/><div><small>Trigger</small><strong>New customer enquiry</strong></div><Check size={16}/></div><span className="wire"/><div className="workflow-node"><Users size={20}/><div><small>Action</small><strong>Ask and save details</strong></div>{tested&&<Check size={16}/>}</div><span className="wire"/><div className="workflow-node condition"><GitBranch size={20}/><div><small>Condition</small><strong>Needs a person?</strong></div></div><div className="workflow-branches"><div><span>Yes</span><div className="workflow-node"><Headphones size={19}/><strong>Notify your team</strong></div></div><div><span>No</span><div className="workflow-node"><Send size={19}/><strong>Send a reply</strong></div></div></div></div><div className="workflow-status" role="status"><Check size={16}/>{tested?'Preview complete · sample enquiry routed to your team':'Preview the flow before switching it on'}</div></div>}

function Window({icon:Icon,title,sub,children}:{icon:typeof FileText;title:string;sub:string;children:React.ReactNode}){return <div className="ss-window"><div className="ss-window-title"><span className="ss-window-icon"><Icon size={17}/></span><div><strong>{title}</strong><small>{sub}</small></div></div><div className="ss-window-body">{children}</div></div>}

function Knowledge(){return <Window icon={BookOpen} title="Knowledge sources" sub="Shared across your agents">
  {[[Globe,'Website pages','yourstore.com'],[FileText,'FAQs','Returns, delivery and sizing'],[FileText,'Documents','Price list.pdf']].map(([Icon,name,detail],i)=>{const I=Icon as typeof Globe;return <div key={name as string} className="ss-row" style={{animationDelay:`${120+i*160}ms`}}><I size={16}/><span>{name as string}<small>{detail as string}</small></span><Check size={15} className="ss-tick"/></div>})}
  <div className="ss-chips" style={{animationDelay:'640ms'}}><span>Sales agent</span><span>Support agent</span><span>Booking agent</span></div>
</Window>}

function Personality(){return <Window icon={UserRound} title="Agent settings" sub="Name, tone and instructions">
  <div className="ss-field" style={{animationDelay:'120ms'}}><small>Name</small><strong>Ava</strong></div>
  <div className="ss-field" style={{animationDelay:'260ms'}}><small>Tone</small><div className="ss-tone"><span>Formal</span><span className="is-picked">Friendly</span><span>Playful</span></div></div>
  <div className="ss-field" style={{animationDelay:'400ms'}}><small>Instructions</small><p className="ss-typed">Keep answers short. Offer to book a call when someone asks about pricing.</p></div>
  <div className="ss-rule" style={{animationDelay:'560ms'}}><Headphones size={16}/><span>Call in your team for refund requests</span><i className="ss-toggle"/></div>
</Window>}

function TestRun(){return <Window icon={FlaskConical} title="Test conversation" sub="Only you can see this">
  <div className="ss-test-chat">
    <div className="ss-bubble in" style={{animationDelay:'150ms'}}>Do you deliver to Pune?</div>
    <div className="ss-bubble out" style={{animationDelay:'700ms'}}>Yes, we deliver to Pune in 3 to 5 working days.</div>
  </div>
  <div className="ss-checks"><span style={{animationDelay:'1200ms'}}><ShieldCheck size={15}/>Answer found in your FAQs</span><span style={{animationDelay:'1500ms'}}><Check size={15}/>Workflow test passed</span></div>
</Window>}

const visuals=[<Knowledge key="k"/>,<Personality key="p"/>,<Workflow key="w"/>,<TestRun key="t"/>];

export function SetupStory(){
  const items=copy.setup.items.slice(0,4);
  const [active,setActive]=useState(0);
  const refs=useRef<(HTMLElement|null)[]>([]);
  useEffect(()=>{
    // The feature crossing the middle of the viewport is the active one.
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActive(Number((entry.target as HTMLElement).dataset.index))}),{rootMargin:'-45% 0px -45% 0px'});
    refs.current.forEach(el=>el&&observer.observe(el));
    return()=>observer.disconnect();
  },[]);
  const go=(i:number)=>{setActive(i);refs.current[i]?.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})};
  return <div className="ss-grid" style={{['--ss-progress' as string]:`${(active+1)/items.length}`}}>
    <ol className="ss-list">{items.map((item,i)=>{const Icon=icons[i];return <li key={item.title} ref={el=>{refs.current[i]=el}} data-index={i} className={`ss-feature ${active===i?'is-active':''}`}>
      <div className="ss-card"><button className="ss-feature-head" onClick={()=>go(i)} aria-current={active===i?'step':undefined}><span className="ss-number">0{i+1}</span><Icon size={22}/><h3>{item.title}</h3></button>
      <p>{item.paragraphs[0]}</p></div>
      <div className="ss-inline-visual">{visuals[i]}</div>
    </li>})}</ol>
    <div className="ss-stage"><div className="ss-stage-inner">
      <span className="ss-stage-label">Illustration</span>
      {visuals.map((visual,i)=><div key={i} className={`ss-scene ${active===i?'is-current':''}`}>{active===i&&visual}</div>)}
      <div className="ss-dots">{items.map((item,i)=><button key={item.title} tabIndex={-1} aria-label={`Show ${item.title}`} className={active===i?'active':''} onClick={()=>go(i)}/>)}</div>
    </div></div>
  </div>
}
