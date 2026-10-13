'use client';
import { SplitWords } from '@/components/site/motion';
import { HoverTransition } from '@/components/ui/hover-transition';
import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {ArrowRight,Quote} from 'lucide-react';
import copy from './copy.json';
import reviews from './testimonials.json';

// "See what changes for your customers and your team": a row of photo cards that moves on by one card at a time.
// Each card front is a photo of that kind of business with the brand and the outcome; hovering or focusing a card
// wipes the full review over it (components/ui/hover-transition) and stops the row. Quotes and names come from testimonials.json; the photo and outcome line per brand live in `extra` below.
type Review={brand:string;quote:string;attribution:string};
const extra:Record<string,{photo:string;outcome:string}>={
 'North & Pine':{photo:'north-pine',outcome:'Order-status questions have almost disappeared'},
 'LatticeFlow Labs':{photo:'latticeflow',outcome:'Sales calls start with the full context'},
 'Casa Noma':{photo:'casa-noma',outcome:'Monday mornings are quiet on WhatsApp'},
 'Aster & Row':{photo:'aster-row',outcome:'After-hours questions answered'},
 'Nivara':{photo:'nivara',outcome:'Size, stock and returns handled'},
 'RelayDesk':{photo:'relaydesk',outcome:'Leads arrive ready to talk'},
 'Sunday Form':{photo:'sunday-form',outcome:'Launches without the DM pile-up'},
 'Stacklane':{photo:'stacklane',outcome:'Customers find answers in the docs'},
 'Mysa Living':{photo:'mysa-living',outcome:'Product picks that actually fit'},
 'Northstar SaaS':{photo:'northstar',outcome:'Enquiries captured mid-conversation'}
};
const initials=(brand:string)=>brand.replace(/[^A-Za-z &]/g,'').split(/[ &]+/).filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join('');
const list=(reviews as Review[]).filter(r=>extra[r.brand]);
const STEP=3200;

function Front({review}:{review:Review}){
 const [name]=review.attribution.split(' | ');const e=extra[review.brand];
 return <div className="rvx-face rvx-front"><img src={`/images/reviews/${e.photo}.webp`} alt="" width="960" height="720" loading="lazy" decoding="async"/>
  <span className="rvx-brand"><b>{initials(review.brand)}</b>{review.brand}</span>
  <div className="rvx-front-copy"><h3>{e.outcome}</h3><p>{name}</p></div></div>;
}
function Back({review}:{review:Review}){
 const [name,role,company]=review.attribution.split(' | ');const e=extra[review.brand];
 return <div className="rvx-face rvx-back"><img src={`/images/reviews/${e.photo}.webp`} alt="" width="960" height="720" loading="lazy" decoding="async"/>
  <div className="rvx-back-copy"><Quote size={24}/><blockquote>{review.quote}</blockquote><footer><b>{initials(review.brand)}</b><span><strong>{name}</strong><small>{role} · {company}</small></span></footer></div></div>;
}

// The row moves on by one card at a time and stops while the pointer (or keyboard focus) is on it. The list is
// rendered twice so the row can loop: after passing the last card it jumps back by one full set without animating.
export function Reviews({onOpen}:{onOpen:(label:string)=>void}){
 const [index,setIndex]=useState(0),[hold,setHold]=useState(false),[visible,setVisible]=useState(false),[snap,setSnap]=useState(false);
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{const observer=new IntersectionObserver(([e])=>setVisible(e.isIntersecting),{threshold:.3});observer.observe(root.current!);return()=>observer.disconnect()},[]);
 useEffect(()=>{if(!visible||hold||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const timer=window.setTimeout(()=>{setSnap(false);setIndex(i=>i+1)},STEP);return()=>window.clearTimeout(timer)},[index,visible,hold]);
 const loop=()=>{if(index>=list.length){setSnap(true);setIndex(i=>i-list.length)}};
 return <section id="stories" ref={root} className="rvx" aria-labelledby="rvx-title"><div className="container">
  <div className="rvx-intro"><h2 id="rvx-title" aria-label={copy.testimonials.title}><SplitWords text={copy.testimonials.title}/></h2><p>{copy.testimonials.paragraphs[0]}</p></div></div>
  <div className="rvx-viewport" role="region" aria-label="Customer reviews" onMouseEnter={()=>setHold(true)} onMouseLeave={()=>setHold(false)} onFocusCapture={()=>setHold(true)} onBlurCapture={()=>setHold(false)}>
   <div className={`rvx-track${snap?' is-snapping':''}`} style={{'--i':index} as CSSProperties} onTransitionEnd={e=>{if(e.target===e.currentTarget)loop()}}>
    {[0,1].map(set=>list.map(review=><div key={`${set}-${review.brand}`} className="rvx-slot" aria-hidden={set>0||undefined} inert={set>0}>
     <HoverTransition effect="wipe" direction="bottom" duration={0.7} label={`Review from ${review.brand}: ${extra[review.brand].outcome}`} className="rvx-card" defaultComponent={<Front review={review}/>} hoverComponent={<Back review={review}/>}/>
    </div>))}
   </div>
  </div>
  <div className="container rvx-foot"><button className="text-link reviews-link" onClick={()=>onOpen('See customer stories')}>See customer stories <ArrowRight size={16}/></button></div>
 </section>;
}
