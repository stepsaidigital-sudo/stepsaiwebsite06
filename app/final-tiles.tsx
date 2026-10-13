'use client';
import {useEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react';

// Closing section: stock photo tiles fly in from outside the frame when the section scrolls into view and settle
// into a mosaic around the headline. Six tiles on top, one tall tile either side of the headline, six below.
// The photos are decorative, so they have empty alt text.
const top=['ho-sales','ch-whatsapp','ho-support','in-health-hero','ho-booking','ch-instagram'];
const sides=['ho-receptionist','ho-lead'];
const bottom=['in-ecom-hero','ho-marketing','in-edu-hero','ch-website','in-fin-hero','ch-messenger'];

// Each tile starts pushed out from the centre of the mosaic, further for tiles further out; the delay grows the same way.
function Tile({name,col,row,className=''}:{name:string;col:number;row:number;className?:string}){
 const dx=(col-2.5)/2.5,dy=row-1;
 const style={'--fx':`${Math.round(dx*70)}vw`,'--fy':`${Math.round(dy*55)}vh`,'--d':`${Math.round((Math.abs(dx)+Math.abs(dy))*110)}ms`} as CSSProperties;
 return <span className={`ft-tile ${className}`} style={style}><img src={`/images/cta-tiles/${name}.webp`} alt="" width="480" height="360" loading="lazy" decoding="async"/></span>;
}

export function FinalTiles({children}:{children:ReactNode}){
 const root=useRef<HTMLDivElement>(null);const [shown,setShown]=useState(false);
 useEffect(()=>{const el=root.current;if(!el)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setShown(true);observer.disconnect()}},{threshold:.2});observer.observe(el);return()=>observer.disconnect()},[]);
 return <div className={`ft-mosaic${shown?' is-in':''}`} ref={root}>
  {top.map((name,i)=><Tile key={name} name={name} col={i} row={0} className={i>2?'ft-wide-only':''}/>)}
  <Tile name={sides[0]} col={0} row={1} className="ft-side"/>
  <div className="ft-panel">{children}</div>
  <Tile name={sides[1]} col={5} row={1} className="ft-side"/>
  {bottom.map((name,i)=><Tile key={name} name={name} col={i} row={2} className={i>2?'ft-wide-only':''}/>)}
 </div>;
}
