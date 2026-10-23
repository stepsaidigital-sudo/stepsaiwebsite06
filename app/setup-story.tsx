'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowRight,Check,FileText,Globe} from 'lucide-react';
import copy from './copy.json';
import {asset} from '@/lib/asset';
import {DEMO_URL} from '@/components/site/routes';
import styles from './setup-story.module.css';

const steps=[
 {title:'Add your business',body:'Your company name and website.'},
 {title:'Add your resources',body:'Your FAQs, documents and guides.'},
 {title:'Connect your tools',body:'Shopify, your CRM and calendar.'},
];
export function SetupStory(){
 const [active,setActive]=useState(0);
 const [visible,setVisible]=useState(false),[reduced,setReduced]=useState(true),[manual,setManual]=useState(false),[hovered,setHovered]=useState(false);
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>setReduced(media.matches);
  sync(); media.addEventListener('change',sync);
  let inView=false;
  const update=()=>setVisible(inView&&!document.hidden);
  const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;update();},{threshold:.4});
  if(root.current)observer.observe(root.current);
  document.addEventListener('visibilitychange',update);
  return ()=>{observer.disconnect();media.removeEventListener('change',sync);document.removeEventListener('visibilitychange',update);};
 },[]);
 useEffect(()=>{
  if(!visible||reduced||manual||hovered||active===2)return;
  const timer=window.setTimeout(()=>setActive(step=>step+1),5500);
  return ()=>window.clearTimeout(timer);
 },[visible,reduced,manual,hovered,active]);
 return <div className={styles.section} aria-labelledby="agent-story-title">

  <div ref={root} className={styles.layout} data-manual={manual} onPointerEnter={event=>{if(event.pointerType==='mouse')setHovered(true);}} onPointerLeave={()=>setHovered(false)} onFocusCapture={()=>setManual(true)}>
  <header className={styles.heading}><span>SET UP YOUR AGENT · NO CODING NEEDED</span><h2 id="agent-story-title">{copy.setup.title}</h2><p>Add your website, resources and tools. No coding needed.</p></header>
   <div className={styles.steps} role="group" aria-label="Explore the agent setup steps">{steps.map((step,i)=><button key={step.title} aria-pressed={active===i} aria-controls="setup-workspace" onClick={()=>{setManual(true);setActive(i);}}><span className={styles.number}>0{i+1}</span><span><strong>{step.title}</strong><span>{step.body}</span></span><ArrowRight size={18}/></button>)}<a className={styles.demo} href={DEMO_URL}>Book a demo <ArrowRight size={17}/></a></div>
   <div className={styles.workspace} id="setup-workspace" role="region" aria-label={steps[active].title+': example setup'}>
    <header className={styles.topbar}><span><img src={asset('/brands/steps-original.png')} width="845" height="449" alt=""/>Steps AI</span></header>
    <div className={styles.progress} aria-hidden="true">{steps.map((step,i)=><span key={step.title} data-current={i===active}>{i<active?<Check size={14}/>:i+1}<span>{['Business','Information','Connections'][i]}</span></span>)}</div>
    <div key={active} className={styles.panel}>
     <div className={styles.panelTitle}><span>AGENT SETUP</span><h3>{['Start with your business.','Give your agent the answers.','Connect the tools you use.'][active]}</h3></div>
     {active===0?<div className={styles.business}><dl><div><dt>Company name</dt><dd>Lumen Home</dd></div><div><dt>Business website</dt><dd><Globe size={17}/>lumenhome.in</dd></div></dl></div>:active===1?<div className={styles.resources}>{[{icon:Globe,title:'Your website',detail:'Products and services'},{icon:FileText,title:'FAQs & policies',detail:'Policies and common questions'},{icon:FileText,title:'Documents & guides',detail:'Product and service guides'}].map(({icon:Icon,title,detail})=><div key={title}><Icon size={23}/><span><strong>{title}</strong><small>{detail}</small></span><Check size={17}/></div>)}</div>:<div className={styles.tools}>{[{logo:'shopify',name:'Shopify',detail:'Products, stock and orders'},{logo:'hubspot',name:'HubSpot',detail:'Customer details and follow-up'},{logo:'google-calendar',name:'Google Calendar',detail:'Availability and appointments'}].map(tool=><div key={tool.name}><img src={asset('/brands/integrations/'+tool.logo+'.svg')} width="30" height="30" alt=""/><span><strong>{tool.name}</strong><small>{tool.detail}</small></span><span className={styles.connected}><Check size={13}/>Connected</span></div>)}</div>}
     <div className={styles.note}><Check size={16}/><span>{['Built around your business.','Answers from your information.','You choose what your agent can do.'][active]}</span></div>
    </div>
   </div>
  </div>
 </div>;
}
