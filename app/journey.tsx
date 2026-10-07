'use client';
import {useEffect,useRef,useState} from 'react';
import {Megaphone,ShoppingBag,Headphones,RotateCcw,Pause,Play,ArrowRight,ArrowLeft,Check,ChevronDown} from 'lucide-react';
import copy from './copy.json';
import {JourneyScene} from './journey-scene';
import {EngageStage} from './engage-stage';
const icons=[Megaphone,ShoppingBag,Headphones,RotateCcw];
const engageNames=['Send personalised WhatsApp campaigns','Turn Instagram comments into DMs','Run ads that open a WhatsApp chat','Manage Instagram comments'];
const summaries=['Send once. Start many conversations.','A public comment. A private conversation.','A click on your ad. A conversation on WhatsApp.','Useful answers. Your team in control.'];
type Position={chapter:number;feature:number};
export function Journey(){
 const [position,setPosition]=useState<Position>({chapter:0,feature:0});
 const [paused,setPaused]=useState(false),[hovered,setHovered]=useState(false),[visible,setVisible]=useState(false),[reduced,setReduced]=useState(false),[mobile,setMobile]=useState(false),[pinned,setPinned]=useState(false),[idle,setIdle]=useState(false),[pageVisible,setPageVisible]=useState(true),[replay,setReplay]=useState(0);
 const outer=useRef<HTMLDivElement>(null),frame=useRef<HTMLDivElement>(null),progress=useRef<HTMLSpanElement>(null),elapsed=useRef(0),positionRef=useRef(position),idleTimer=useRef<ReturnType<typeof setTimeout>|null>(null),step=useRef(360),physicalSlot=useRef(0),touch=useRef<{x:number;y:number}|null>(null);
 positionRef.current=position;
 const duration=mobile?8000:6000;
 const demoRunning=visible&&pageVisible&&!paused&&!reduced;
 const playing=demoRunning&&!hovered&&!idle&&position.chapter===0;
 const hold=()=>{setIdle(true);if(idleTimer.current)clearTimeout(idleTimer.current);idleTimer.current=setTimeout(()=>setIdle(false),4000)};
 const go=(chapter:number,feature:number,manual=true)=>{elapsed.current=0;if(progress.current)progress.current.style.transform='scaleX(0)';setPosition({chapter,feature});if(manual){setReplay(v=>v+1);hold()}};
 const move=(direction:number)=>{const p=positionRef.current;if(p.chapter===0){const next=p.feature+direction;if(next>3)go(1,0);else go(0,Math.max(0,next))}else if(direction<0&&p.chapter===1&&p.feature===0)go(0,3);else go(p.chapter,Math.max(0,Math.min(3,p.feature+direction)))};
 useEffect(()=>{
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const measure=()=>{setReduced(motion.matches);setMobile(innerWidth<760);const element=frame.current!;step.current=Math.max(280,Math.min(450,innerHeight*.5));const fits=innerWidth>=1050&&element.offsetHeight+106<innerHeight&&!motion.matches;setPinned(fits);outer.current!.style.height=fits?`${element.offsetHeight+step.current*4}px`:'auto'};
  const resize=new ResizeObserver(measure);resize.observe(frame.current!);window.addEventListener('resize',measure);motion.addEventListener('change',measure);measure();
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.6});observer.observe(frame.current!.querySelector('.cj-demo')!);
  const visibility=()=>setPageVisible(!document.hidden);document.addEventListener('visibilitychange',visibility);
  return()=>{resize.disconnect();observer.disconnect();window.removeEventListener('resize',measure);motion.removeEventListener('change',measure);document.removeEventListener('visibilitychange',visibility);if(idleTimer.current)clearTimeout(idleTimer.current)};
 },[]);
 useEffect(()=>{
  if(!pinned)return;let raf=0;
  physicalSlot.current=Math.max(0,Math.min(4,Math.floor((96-outer.current!.getBoundingClientRect().top)/step.current)));
  const onScroll=()=>{if(!visible)return;hold();cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const top=outer.current!.getBoundingClientRect().top;const slot=Math.max(0,Math.min(4,Math.floor((96-top)/step.current)));const delta=slot-physicalSlot.current;physicalSlot.current=slot;if(!delta)return;const p=positionRef.current;const virtual=p.chapter===0?p.feature:4;const next=Math.max(0,Math.min(4,virtual+delta));go(next===4?1:0,next===4?0:next,false)})};
  window.addEventListener('scroll',onScroll,{passive:true});return()=>{window.removeEventListener('scroll',onScroll);cancelAnimationFrame(raf)};
 },[pinned,visible]);
 useEffect(()=>{if(!playing)return;let raf=0,last=performance.now();const tick=(now:number)=>{elapsed.current+=now-last;last=now;if(progress.current)progress.current.style.transform=`scaleX(${Math.min(1,elapsed.current/duration)})`;if(elapsed.current>=duration){elapsed.current=0;setPosition(p=>p.feature<3?{chapter:0,feature:p.feature+1}:{chapter:1,feature:0});return}raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[playing,position,duration,replay]);
 useEffect(()=>{if(pinned||!visible)return;const onScroll=()=>hold();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[pinned,visible]);
 const chapter=copy.journey.stages[position.chapter];
 const selectChapter=(index:number)=>go(index,0);
 return <div ref={outer} className={`cj-runway ${pinned?'cj-pinned':''}`} data-chapter={position.chapter} data-feature={position.feature}><div ref={frame} className="cj-frame">
  <nav className="cj-chapters" aria-label="Steps AI journey chapters">{copy.journey.stages.map((item,index)=>{const Icon=icons[index];return <button key={item.label} aria-pressed={position.chapter===index} onClick={()=>selectChapter(index)} aria-controls="capability-panel"><span className="cj-chapter-icon"><Icon size={21}/></span><strong>{item.label}</strong><small>{position.chapter>index?<Check size={14}/>:<>0{index+1}</>}</small><i aria-hidden="true"/></button>})}</nav>
  <div className="cj-composition" id="capability-panel"><div className="cj-copy"><div className="cj-heading" key={position.chapter}><span className="cj-kicker">0{position.chapter+1} / THE CUSTOMER JOURNEY</span><h3>{chapter.title}</h3><p>{position.chapter===0?'Turn campaigns, comments and ads into conversations your AI agent can respond to.':chapter.paragraphs[0]}</p></div><div className="cj-features" aria-label={`${chapter.label} features`}>{chapter.items.map((item,index)=><button key={item.title} onClick={()=>go(position.chapter,index)} aria-pressed={position.feature===index} aria-controls="capability-demo"><small>0{index+1}</small><span>{position.chapter===0?engageNames[index]:item.title}</span>{position.feature===index?<ArrowRight size={16}/>:<span className="cj-feature-dot"/>}<i className="cj-feature-progress" aria-hidden="true">{position.feature===index&&<span ref={progress}/>}</i></button>)}</div><div className="cj-status"><span><i className={playing?'is-playing':''}/>{position.chapter===0?(reduced?'Choose a feature to explore':paused?'Story paused':hovered?'Paused while you explore':idle?'You’re in control':pinned?'Scroll to explore, or let the story play':'Watch the story, or choose a feature'):'Explore the chapter’s four features'}</span><span>0{position.feature+1} / 04</span></div></div>
  <div className="cj-demo" id="capability-demo" onPointerEnter={e=>{if(e.pointerType==='mouse')setHovered(true)}} onPointerLeave={()=>{setHovered(false);hold()}} onPointerDown={e=>{if(e.pointerType==='touch'){touch.current={x:e.clientX,y:e.clientY};hold()}}} onPointerUp={e=>{if(e.pointerType==='touch'&&touch.current){const dx=e.clientX-touch.current.x,dy=e.clientY-touch.current.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)move(dx<0?1:-1);touch.current=null}}}>
   {position.chapter===0?<EngageStage feature={position.feature} running={demoRunning} reduced={reduced} replay={replay}/>:<div className="cj-existing"><JourneyScene stage={position.chapter} index={position.feature}/></div>}
  </div></div>
  <div className="cj-bottom"><span className="cj-outcome"><Check size={14}/>{position.chapter===0?summaries[position.feature]:chapter.items[position.feature].title}</span><div className="cj-controls"><button aria-label="Previous capability" onClick={()=>move(-1)} disabled={position.chapter===0&&position.feature===0}><ArrowLeft size={15}/></button>{position.chapter===0&&<><button aria-label={paused?'Play Engage story':'Pause Engage story'} disabled={reduced} onClick={()=>setPaused(v=>!v)}>{paused?<Play size={14}/>:<Pause size={14}/>}</button><button aria-label="Replay Engage feature" onClick={()=>{elapsed.current=0;setReplay(v=>v+1);setPaused(false);hold()}}><RotateCcw size={14}/></button></>}<button aria-label="Next capability" onClick={()=>move(1)} disabled={position.chapter>0&&position.feature===3}><ArrowRight size={15}/></button></div><a href="#team" className="cj-skip">Continue down the page<ChevronDown size={13}/></a></div>
 </div></div>
}




