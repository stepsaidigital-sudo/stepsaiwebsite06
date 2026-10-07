'use client';
import {useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,Check,MessageSquare,Search,Users} from 'lucide-react';
import copy from './copy.json';
import originals from './testimonials.json';
const initials=['AR','LF','SF','SL'];
function ReviewVisual({index,preview=false}:{index:number;preview?:boolean}){
  return <div className={`review-visual review-visual-${index}`} aria-hidden={preview||undefined}>
    {index===0||index===2?<><img loading="lazy" decoding="async" src="/industries/ecommerce.png" alt={preview?'':'Illustrative product photography, not a customer photograph'}/><div className="review-image-conversation"><span><MessageSquare size={14}/> {index===0?'After-hours support':'Instagram conversations'}</span><div>{index===0?'A useful answer, even after closing time.':'Product questions. Answered in the conversation.'}<Check size={14}/></div></div></>:
    <div className="review-product-scene"><div className="review-app-top"><span className="mini-mark">s</span><span>{index===1?'Customer context':'Business knowledge'}</span><i/><i/><i/></div>{index===1?<><div className="review-context-avatar"><Users size={32}/></div><h4>Every conversation.<br/>More context.</h4><div className="review-context-row"><span>Customer interests</span><Check size={14}/></div><div className="review-context-row"><span>Business requirements</span><Check size={14}/></div><div className="review-context-row"><span>Conversation history</span><Check size={14}/></div><div className="review-context-tag"><MessageSquare size={14}/> Ready for your team</div></>:<><div className="review-doc-symbol"><BookOpen size={46}/></div><h4>Knowledge, within reach.</h4><div className="review-doc-search"><Search size={15}/><span>Ask a question naturally</span></div><div className="review-doc-answer"><span/><span/><span/><div><Check size={14}/> From your information</div></div></>}</div>}
    {!preview&&<span className="review-illustration-label">Illustrative business scene</span>}
  </div>
}
export function Reviews({onOpen}:{onOpen:(label:string)=>void}){
  const [active,setActive]=useState(0);
  const swipeStart=useRef<number|null>(null);
  const count=copy.testimonials.items.length;
  const pick=(index:number)=>setActive((index+count)%count);
  function Peek({offset}:{offset:number}){const i=(active+offset+count)%count;return <button className={`review-peek peek-${Math.abs(offset)}`} onClick={()=>pick(i)} aria-label={`Read ${copy.testimonials.items[i].title}`}><ReviewVisual index={i} preview/></button>}
  return <section id="stories" className="reviews-showcase"><div className="container">
    <div className="section-intro reviews-intro"><h2>{copy.testimonials.title}</h2><p>{copy.testimonials.paragraphs[0]}</p></div>
    <div id="review-stage" className="review-rail" role="region" aria-label="Customer testimonials" aria-roledescription="carousel" onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();pick(active+1)}if(event.key==='ArrowLeft'){event.preventDefault();pick(active-1)}}}>
      <Peek offset={-2}/><Peek offset={-1}/>
      <div className="review-main" onPointerDown={event=>{if(event.pointerType==='touch')swipeStart.current=event.clientX}} onPointerUp={event=>{if(swipeStart.current!==null){const delta=event.clientX-swipeStart.current;if(Math.abs(delta)>55)pick(active+(delta<0?1:-1));swipeStart.current=null}}}>
        {copy.testimonials.items.map((item,i)=>{const [name,role,company]=item.paragraphs[1].split(' | ');const original=originals.find(q=>q.attribution===item.paragraphs[1]);return <article className={`review-slide review-slide-${i}`} key={item.title} hidden={active!==i} aria-label={`${i+1} of ${count}`} aria-roledescription="slide"><div className="review-copy"><h3>{item.title}</h3><blockquote>{item.paragraphs[0]}</blockquote><div className="review-attribution"><span className="review-small-brand" aria-label={`${company} initials`}>{initials[i]}</span><div><span>{item.paragraphs[1]}</span></div></div>{original&&original.quote!==item.paragraphs[0]&&<details className="review-full-quote"><summary>Read full quote</summary><blockquote>{original.quote}</blockquote></details>}</div><ReviewVisual index={i}/></article>})}
      </div>
      <Peek offset={1}/><Peek offset={2}/>
    </div>
    <div className="review-controls"><button onClick={()=>pick(active-1)} aria-label="Previous customer story"><ArrowLeft size={20}/></button><div className="review-dots" role="group" aria-label="Choose a customer story">{copy.testimonials.items.map((item,i)=><button key={item.title} aria-label={`Show ${item.title}`} aria-pressed={active===i} onClick={()=>pick(i)}><span/></button>)}</div><button onClick={()=>pick(active+1)} aria-label="Next customer story"><ArrowRight size={20}/></button></div>
    <button className="text-link reviews-link" onClick={()=>onOpen('See customer stories')}>See customer stories <ArrowRight size={16}/></button>
  </div></section>
}

