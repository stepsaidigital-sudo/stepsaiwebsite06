'use client';
import {useCallback,useEffect,useState,type RefObject} from 'react';

// Shared by the team and setup tours: on roomy screens the section becomes a tall runway whose
// panel pins below the navbar, and scroll position picks the step (one step per STEP_VH of scroll).
// Elsewhere (phones, short screens, reduced motion) it returns pinned=false and the caller autoplays.
export const STEP_VH=60;
const PIN_QUERY='(min-width: 1000px) and (min-height: 600px)';

export function usePinnedTour(ref:RefObject<HTMLElement|null>,count:number){
  const [pinned,setPinned]=useState(false),[index,setIndex]=useState(0),[progress,setProgress]=useState(0);
  useEffect(()=>{
    const pin=matchMedia(PIN_QUERY),motion=matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>setPinned(pin.matches&&!motion.matches);sync();
    pin.addEventListener('change',sync);motion.addEventListener('change',sync);
    return()=>{pin.removeEventListener('change',sync);motion.removeEventListener('change',sync)};
  },[]);
  useEffect(()=>{
    if(!pinned)return;let raf=0;
    const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{
      const r=ref.current!.getBoundingClientRect(),span=r.height-innerHeight;
      const p=Math.min(.9999,Math.max(0,-r.top/span))*count,i=Math.floor(p);
      setIndex(i);setProgress(p-i);
    })};
    update();addEventListener('scroll',update,{passive:true});addEventListener('resize',update);
    return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',update);removeEventListener('resize',update)};
  },[pinned,count,ref]);
  // Jump the page so step i is showing (used by the feature buttons while pinned).
  const go=useCallback((i:number)=>{
    const r=ref.current!.getBoundingClientRect(),span=r.height-innerHeight;
    scrollTo({top:scrollY+r.top+span*(i+.04)/count,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  },[count,ref]);
  const runwayStyle=pinned?{height:`calc(100vh + ${count*STEP_VH}vh)`}:undefined;
  return {pinned,index,progress,go,runwayStyle};
}
