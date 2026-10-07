'use client';
import {useState} from 'react';
import {ArrowUpRight,Check,ChevronRight,Megaphone,ShoppingBag,BookOpen,GitBranch,RotateCcw,ArrowDown,CalendarDays,Users,Send} from 'lucide-react';
import {demos} from './product-demos';
import {ChannelChat,ChannelLogo} from './channel-chat';
const icons=[Megaphone,ShoppingBag,BookOpen,GitBranch];
export function JourneyScene({stage,index}:{stage:number;index:number}){
 const d=demos[stage][index];const Icon=icons[stage];const [replay,setReplay]=useState(0);
 return <div className={`journey-studio studio-${stage}`}>
  <div className="studio-heading"><span className="studio-app-icon"><Icon size={17}/></span><strong>{d.title}</strong><span className="studio-channel"><ChannelLogo channel={d.channel}/>{d.channel}</span></div>
  <div className="studio-canvas" key={`${stage}-${index}-${replay}`}>
   <div className="studio-context">
    <div className="studio-context-top"><span>{d.contextLabel}</span><span className="studio-status"><i/>Ready</span></div>
    {stage===1&&index===0?<div className="studio-catalogue"><img src="/industries/ecommerce.png" alt="Ceramic serving set from the example catalogue"/><div><small>From your catalogue</small><h4>{d.context}</h4><span>Matched to the conversation <Check size={12}/></span></div></div>:<h4>{d.context}</h4>}
    <div className="studio-fields">{d.fields.map(([label,value],i)=><div key={label}><span className="studio-field-icon">{stage===0?<Users size={14}/>:stage===1?<CalendarDays size={14}/>:stage===2?<BookOpen size={14}/>:<GitBranch size={14}/>}</span><div><small>{label}</small><strong>{value}</strong></div><Check size={12}/></div>)}</div>
   </div>
   <div className="studio-connection"><span/><i><ArrowDown size={14}/></i><span/></div>
   <div className="studio-conversation"><div className="studio-chat-label"><span><i/>{d.chatLabel}</span><small>Example conversation</small></div><ChannelChat channel={d.channel} question={d.question} answer={d.answer} options={d.options} comments={stage===0&&index===3}/></div>
   <div className="studio-result"><span><Check size={17}/></span><div><strong>{d.result}</strong><p>{d.detail}</p></div><ArrowUpRight size={18}/></div>
  </div>
  <div className="studio-footer"><small>{d.footnote}</small><button aria-label="Replay product preview" onClick={()=>setReplay(replay+1)}><RotateCcw size={13}/><span>Replay</span></button></div>
 </div>
}
