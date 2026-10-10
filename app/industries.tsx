'use client';
import { SplitWords } from '@/components/site/motion';
import {useLayoutEffect,useRef,useState} from 'react';
import {ArrowUpRight,Check,CalendarDays,MessageSquare,BookOpen,MapPin,ChevronRight} from 'lucide-react';
import copy from './copy.json';
import {ChannelLogo} from './channel-chat';

const featured=[{index:0,key:'ecommerce'},{index:4,key:'healthcare'},{index:3,key:'education'},{index:2,key:'realestate'}];
const remaining=[1,5,6];

export function IndustryMockup({kind}:{kind:string}){
  return <div className={`industry-demo demo-${kind}`}>
    {kind==='ecommerce'?<><div className="industry-demo-bar"><ChannelLogo channel="WhatsApp"/><strong>Your store</strong><span>Shopping assistant</span></div><div className="commerce-product"><img loading="lazy" decoding="async" src="/industries/ecommerce.png" alt="Cream ceramic vase and bowl"/><div><small>Picked for you</small><strong>A little something<br/>for their new home.</strong><span><Check size={12}/> From your catalogue</span></div></div><div className="industry-demo-message">I can help you find a thoughtful gift.</div><div className="industry-demo-choice">Explore products <ArrowUpRight size={15}/></div></>:
    kind==='healthcare'?<><div className="industry-demo-bar"><CalendarDays size={18}/><strong>Your clinic</strong><span>Appointments</span></div><div className="clinic-profile"><img loading="lazy" decoding="async" src="/industries/healthcare.png" alt="Illustrative clinic doctor"/><div><small>Find a time that works</small><strong>Let’s plan your visit.</strong><span>Choose an available time</span></div></div><div className="appointment-date"><CalendarDays size={15}/><strong>Tuesday</strong><span>Available times</span></div><div className="industry-time-slots"><span>10:00 AM</span><span className="time-selected">2:30 PM <Check size={12}/></span><span>4:00 PM</span></div><div className="industry-demo-note">Clinic information. Booking help. One chat.</div></>:
    kind==='education'?<><div className="education-photo"><img loading="lazy" decoding="async" src="/industries/education.png" alt="University student learning with a laptop"/><span><BookOpen size={14}/> Your next chapter</span></div><div className="education-course"><small>Explore your options</small><strong>Find a course that fits you.</strong><div className="course-tags"><span>Course details</span><span>Admissions</span></div></div><div className="industry-demo-choice">Book counselling <ArrowUpRight size={15}/></div></>:
    <><div className="property-photo"><img loading="lazy" decoding="async" src="/industries/realestate.png" alt="Illustrative contemporary home with a landscaped courtyard"/><span><MapPin size={13}/> A place to call home</span></div><div className="property-detail"><small>From enquiry to visit</small><strong>See it for yourself.</strong><span>Ask questions. Share what you need.</span></div><div className="industry-demo-choice">Arrange a visit <CalendarDays size={15}/></div></>}
  </div>
}

export function Industries({onOpen}:{onOpen:(label:string)=>void}){
  const [active,setActive]=useState(0);
  const row=useRef<HTMLDivElement>(null);
  const prior=useRef<DOMRect[]>([]);
  const animations=useRef<Animation[]>([]);
  function select(index:number){
    if(index===active)return;
    animations.current.forEach(animation=>animation.cancel());
    prior.current=Array.from(row.current!.children).map(element=>element.getBoundingClientRect());
    setActive(index);
  }
  useLayoutEffect(()=>{
    if(!prior.current.length||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const cards=Array.from(row.current!.children) as HTMLElement[];
    animations.current=cards.flatMap((card,i)=>{
      const before=prior.current[i],after=card.getBoundingClientRect();
      const dx=before.left-after.left;
      const skin=card.querySelector('.industry-card-skin')!;
      const content=card.querySelector('.industry-card-content')!;
      const timing={duration:450,easing:'cubic-bezier(0.23,1,0.32,1)'};
      return [skin.animate([{transform:`translateX(${dx}px) scaleX(${before.width/after.width})`},{transform:'none'}],timing),content.animate([{transform:`translateX(${dx}px)`},{transform:'none'}],timing)];
    });
    return()=>animations.current.forEach(animation=>animation.cancel());
  },[active]);
  return <section id="solutions" className="industry-showcase"><div className="container">
    <div className="section-intro"><h2 aria-label={copy.business.title}><SplitWords text={copy.business.title}/></h2><p>{copy.business.paragraphs[0]}</p></div>
    <p className="industry-selection-hint">Select an industry to see it in action.</p>
    <div ref={row} className="industry-deck" data-active={active}>
      {featured.map(({index,key},i)=>{const item=copy.business.items[index];return <article className={`industry-expand-card industry-${key} ${i===active?'is-selected':''}`} key={key} onPointerEnter={event=>{if(event.pointerType==='mouse'&&matchMedia('(hover: hover) and (pointer: fine)').matches)select(i)}} onClick={()=>select(i)}>
        <div className="industry-card-skin" aria-hidden="true"/>
        <div className="industry-card-content"><div className="industry-card-heading"><h3><button aria-expanded={active===i} aria-controls={`industry-visual-${key}`} onClick={()=>select(i)} onFocus={()=>select(i)} onKeyDown={event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const next=(i+(event.key==='ArrowRight'?1:3))%4;select(next);(row.current!.children[next].querySelector('button') as HTMLButtonElement).focus()}}}>{item.title}<ChevronRight size={18}/></button></h3><p>{item.paragraphs[1]}</p><p className="industry-customer-question">{item.paragraphs[0]}</p></div>
        <div className="industry-art"><div className="industry-arc" aria-hidden="true"/><div className="industry-active-visual" id={`industry-visual-${key}`} aria-hidden={active!==i}><IndustryMockup kind={key}/></div></div></div>
      </article>})}
    </div>
    <div className="industry-deck-footer"><span className="industry-page-count" aria-hidden="true"><b>0{active+1}</b><span>/ 04</span><i/></span><button className="text-link" onClick={()=>onOpen('Explore solutions')}>Explore solutions <ArrowUpRight size={17}/></button></div>
    <div className="other-industries">{remaining.map(index=>{const item=copy.business.items[index];return <details key={item.title}><summary>{item.title}<ChevronRight size={17}/></summary><p className="other-industry-question">{item.paragraphs[0]}</p><p>{item.paragraphs[1]}</p></details>})}</div>
  </div></section>
}
