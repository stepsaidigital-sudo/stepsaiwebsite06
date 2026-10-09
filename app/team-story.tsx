'use client';
import {useEffect,useRef,useState} from 'react';
import {Inbox,ChartNoAxesCombined,MessageCircleQuestion,Headphones,Pause,Play,RotateCcw} from 'lucide-react';
import copy from './copy.json';
import {ProductStage} from './product-story';
import {usePinnedTour} from './use-pinned-tour';
const states=[
 {key:'conversations',title:'Customer conversations, together',icon:Inbox,transition:'inbox-to-activity',duration:2500},
 {key:'activity',title:'Performance at a glance',icon:ChartNoAxesCombined,transition:'internal-scroll',duration:2500},
 {key:'questions',title:'Understand what customers ask',icon:MessageCircleQuestion,transition:'conversation-handoff',duration:2500},
 {key:'handoff',title:'Your team steps in when needed',icon:Headphones,transition:'soft-reset',duration:2500}
];
export function TeamStory(){return <StorySection/>}
export function StorySection(){
 const root=useRef<HTMLElement>(null),elapsed=useRef(0);
 const [timed,setTimed]=useState(0),[cycle,setCycle]=useState(0),[paused,setPaused]=useState(false),[visible,setVisible]=useState(false),[pageVisible,setPageVisible]=useState(true),[reduced,setReduced]=useState(false);
 const [manual,setManual]=useState(false);
 // Pinned (desktop): scroll picks the scene. Otherwise the tour autoplays on a timer.
 const tour=usePinnedTour(root,states.length);
 const current=tour.pinned?tour.index:timed;
 const running=visible&&pageVisible&&!paused&&!reduced;
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);const visibility=()=>setPageVisible(!document.hidden);document.addEventListener('visibilitychange',visibility);const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.15});if(root.current)observer.observe(root.current);return()=>{media.removeEventListener('change',update);document.removeEventListener('visibilitychange',visibility);observer.disconnect()}},[]);
 useEffect(()=>{if(!running||tour.pinned)return;let frame=0,last=performance.now();const tick=(now:number)=>{elapsed.current+=Math.min(now-last,80);last=now;if(elapsed.current>=states[timed].duration){elapsed.current=0;setTimed((timed+1)%states.length);if(timed===3)setCycle(v=>v+1);return}frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame)},[timed,running,tour.pinned]);
 const select=(index:number)=>{if(tour.pinned){tour.go(index);return}elapsed.current=0;setTimed(index);setPaused(true);setManual(true)};
 const bar=(index:number)=>tour.pinned?{animation:'none',transform:`scaleX(${index<current?1:index===current?tour.progress:0})`}:{animationPlayState:running?'running':'paused'};
 return <section id="team" ref={root} className={`product-story ${tour.pinned?'is-pinned':''}`} style={tour.runwayStyle}><div className="ps-pin"><div className="container ps-layout"><div className="ps-copy"><h2>{copy.team.title}</h2><div className="ps-features" aria-label="Product tour scenes">{states.map((state,index)=>{const Icon=state.icon;return <button key={state.key} aria-pressed={current===index} onClick={()=>select(index)}><Icon size={21}/><span>{state.title}</span><small>0{index+1}</small></button>})}</div></div><div className="ps-visual"><div className="ps-frame-header"><span><i/>One workspace, every conversation</span><div>{!tour.pinned&&<><button aria-label={paused?'Play product tour':'Pause product tour'} disabled={reduced} onClick={()=>{setManual(false);setPaused(v=>!v)}}>{paused?<Play size={14}/>:<Pause size={14}/>}</button><button aria-label="Replay product tour" onClick={()=>{setManual(false);elapsed.current=0;setTimed(0);setCycle(v=>v+1);setPaused(false)}}><RotateCcw size={14}/></button></>}<b>0{current+1} / 04</b></div></div><ProductStage current={current} cycle={cycle} running={running} reduced={reduced||manual}/><div className="ps-timeline" aria-hidden="true">{states.map((state,index)=><i key={tour.pinned?state.key:`${cycle}-${current}-${state.key}`} className={index===current?'is-current':index<current?'is-complete':''}><span style={bar(index)}/></i>)}</div></div></div></div></section>
}
