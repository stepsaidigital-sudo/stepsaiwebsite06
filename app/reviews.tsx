'use client';
import { SplitWords } from '@/components/site/motion';
import {useState} from 'react';
import {ArrowRight,Pause,Play} from 'lucide-react';
import copy from './copy.json';
import reviews from './testimonials.json';

// "See what changes for your customers and your team": every customer review from
// testimonials.json as compact cards in two rows scrolling right to left (like the
// integrations strip). Add or remove reviews in testimonials.json; the rows follow.

type Review={brand:string;quote:string;attribution:string};
const initials=(brand:string)=>brand.replace(/[^A-Za-z &]/g,'').split(/[ &]+/).filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join('');

function Card({review,hidden}:{review:Review;hidden?:boolean}){
  const [name,role,company]=review.attribution.split(' | ');
  return <figure className="rv-card" aria-hidden={hidden||undefined} title={review.quote}>
    <blockquote>{review.quote}</blockquote>
    <figcaption><span className="rv-logo">{initials(review.brand)}</span><span><strong>{name}</strong><small>{role} · {company}</small></span></figcaption>
  </figure>;
}

export function Reviews({onOpen}:{onOpen:(label:string)=>void}){
  const [paused,setPaused]=useState(false);
  const list=reviews as Review[];
  const half=Math.ceil(list.length/2);
  const rows=[list.slice(0,half),list.slice(half)];
  return <section id="stories" className="reviews-showcase rv"><div className="container">
    <div className="section-intro reviews-intro rv-intro"><h2 aria-label={copy.testimonials.title}><SplitWords text={copy.testimonials.title}/></h2><p>{copy.testimonials.paragraphs[0]}</p></div>
  </div>
    <div className="rv-rows" data-paused={paused} role="region" aria-label="Customer reviews">
      {rows.map((row,r)=><div className={`rv-row rv-row-${r}`} key={r}><div className="rv-track">
        {[0,1].map(copyIndex=><div className="rv-set" key={copyIndex}>{row.map(review=><Card key={review.brand} review={review} hidden={copyIndex>0}/>)}</div>)}
      </div></div>)}
    </div>
  <div className="container rv-foot">
    <button className="rv-pause" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?<Play size={13}/>:<Pause size={13}/>}<span>{paused?'Resume':'Pause'}</span></button>
    <button className="text-link reviews-link" onClick={()=>onOpen('See customer stories')}>See customer stories <ArrowRight size={16}/></button>
  </div></section>;
}
