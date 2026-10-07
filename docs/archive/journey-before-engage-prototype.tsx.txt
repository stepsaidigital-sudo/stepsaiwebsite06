'use client';
import {useEffect,useRef,useState} from 'react';
import {Plus,Minus,Megaphone,ShoppingBag,Headphones,RotateCcw} from 'lucide-react';
import copy from './copy.json';
import {JourneyScene} from './journey-scene';
const stageIcons=[Megaphone,ShoppingBag,Headphones,RotateCcw];
import {CustomerQuote} from './quote';

// One product story. Native page scrolling advances the panel; no wheel interception.
export function Journey(){
  const [current,setCurrent]=useState(0);
  const [features,setFeatures]=useState([0,0,0,0]);
  const [pinned,setPinned]=useState(false);
  const runway=useRef<HTMLDivElement>(null);
  const frame=useRef<HTMLDivElement>(null);
  const step=useRef(640);
  useEffect(()=>{
    const outer=runway.current!, inner=frame.current!;
    const reduce=matchMedia('(prefers-reduced-motion: reduce)');
    const measure=()=>{
      step.current=Math.max(520,innerHeight*.8);
      const fits=inner.offsetHeight+110<innerHeight && innerWidth>=1000 && !reduce.matches;
      setPinned(fits);
      outer.style.height=fits?`${inner.offsetHeight+step.current*4}px`:'auto';
    };
    const observer=new ResizeObserver(measure);observer.observe(inner);
    window.addEventListener('resize',measure);reduce.addEventListener('change',measure);measure();
    return()=>{observer.disconnect();window.removeEventListener('resize',measure);reduce.removeEventListener('change',measure)};
  },[]);
  useEffect(()=>{
    if(!pinned)return;
    let raf=0;
    const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{
      const y=92-runway.current!.getBoundingClientRect().top;
      setCurrent(Math.max(0,Math.min(3,Math.floor((y+step.current*.18)/step.current))));
    })};
    window.addEventListener('scroll',update,{passive:true});update();
    return()=>{window.removeEventListener('scroll',update);cancelAnimationFrame(raf)};
  },[pinned]);
  function select(i:number){
    setCurrent(i);
    if(pinned)window.scrollTo({top:scrollY+runway.current!.getBoundingClientRect().top-92+i*step.current,behavior:'instant'});
    else frame.current?.scrollIntoView({block:'start',behavior:'instant'});
  }
  return <div ref={runway} className={`journey-runway ${pinned?'is-pinned':''}`} data-current={current}>
    <div ref={frame} className="journey-frame">
      <nav className="journey-tabs" aria-label="Customer journey">{copy.journey.stages.map((stage,i)=>{const Icon=stageIcons[i];return <button key={stage.label} aria-pressed={current===i} aria-controls={`journey-panel-${i}`} onClick={()=>select(i)}><span className="journey-tab-icon"><Icon size={18}/></span><span className="journey-tab-name">{stage.label}</span><span className="journey-tab-number">0{i+1}</span></button>})}</nav>
      <div className="journey-panels">{copy.journey.stages.map((stage,index)=>{
        const feature=features[index];
        return <article key={stage.label} id={`journey-panel-${index}`} className={`journey-stage stage-${index} ${current===index?'is-active':''}`} aria-hidden={current!==index} inert={current!==index}>
          <div className="stage-copy"><h3>{stage.title}</h3><p className="stage-description">{stage.paragraphs[0]}</p><div className="features">{stage.items.map((item,i)=><div className={`feature ${feature===i?'active':''}`} key={item.title}><h4><button id={`feature-${index}-${i}`} aria-expanded={feature===i} aria-controls={`feature-panel-${index}-${i}`} onClick={()=>setFeatures(previous=>previous.map((value,j)=>j===index?i:value))}><span>{item.title}</span>{feature===i?<Minus size={18}/>:<Plus size={18}/>}</button></h4><div id={`feature-panel-${index}-${i}`} role="region" aria-labelledby={`feature-${index}-${i}`} hidden={feature!==i}><p>{item.paragraphs[0]}</p></div></div>)}</div>
          {stage.items[feature].paragraphs.length>2&&<CustomerQuote paragraphs={stage.items[feature].paragraphs.slice(1)} className="contextual"/>}</div>
          <div className="stage-media"><JourneyScene stage={index} index={feature}/></div>
        </article>
      })}</div>
    </div>
  </div>
}
