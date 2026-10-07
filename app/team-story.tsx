'use client';
import {useEffect,useRef,useState} from 'react';
import {Inbox,Users,Headphones,ChartNoAxesCombined} from 'lucide-react';
import copy from './copy.json';
import {InboxPreview} from './inbox-preview';
const labels=['Unified inbox','Customer details','Human handoff','Insights'];
const icons=[Inbox,Users,Headphones,ChartNoAxesCombined];
export function TeamStory(){
 const [active,setActive]=useState(0);
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const media=matchMedia('(min-width: 1100px) and (min-height: 780px)');
  let frame=0;
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   if(!media.matches||!root.current||(root.current.contains(document.activeElement)&&['INPUT','TEXTAREA'].includes(document.activeElement?.tagName||'')))return;
   const steps=Array.from(root.current.querySelectorAll<HTMLElement>('.team-story-step'));
   let index=0,distance=Infinity;
   steps.forEach((step,i)=>{const rect=step.getBoundingClientRect(),d=Math.abs(rect.top+rect.height/2-innerHeight*.5);if(d<distance){index=i;distance=d}});
   setActive(index);
  })};
  window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
 },[]);
 return <section id="team" className="team-section team-story"><div className="container"><div className="section-intro"><h2>{copy.team.title}</h2><p>{copy.team.paragraphs[0]}</p></div><div className="team-story-layout" ref={root}>
  <div className="team-story-preview"><div className="team-story-tabs" aria-label="Explore the workspace">{labels.map((label,i)=><button key={label} aria-pressed={active===i} onClick={()=>setActive(i)}><span>0{i+1}</span>{label}</button>)}</div><div className="team-story-caption"><span><i/>One workspace, every conversation</span><b>0{active+1} / 04</b></div><InboxPreview stage={active}/></div>
  <div className="team-story-steps">{copy.team.items.map((item,i)=>{const Icon=icons[i];return <article className={`team-story-step ${active===i?'is-active':''}`} key={item.title}><button aria-pressed={active===i} onClick={()=>setActive(i)}><span className="team-story-icon"><Icon size={22}/></span><span className="team-story-number">0{i+1}</span><h3>{item.title}</h3></button><p>{item.paragraphs[0]}</p><span className="team-story-progress" aria-hidden="true"/></article>})}</div>
 </div></div></section>
}
