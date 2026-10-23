'use client';
import {useEffect,useRef,useState,type ReactNode} from 'react';
import {ArrowRight,Check,CheckCheck,ChevronLeft,Phone,Video,MoreVertical,Camera,Mic,Smile,Plus,Send,Info,ChartNoAxesCombined,ShoppingBag,Headphones,PauseCircle,UserRound,Mail,CalendarDays,Tag,Inbox,Search,type LucideIcon} from 'lucide-react';
import {ChannelLogo} from './channel-chat';
import copy from './copy.json';

import { asset } from '@/lib/asset';
import { AnalyticsMock } from '@/components/premium/analytics-mock';
// "See the conversations, customers and results in one place": the same pattern as the hero. Tabs pick one of the
// four team.items. Each one plays a platform-accurate customer chat (messages arrive one by one, with typing dots),
// and a floating Steps AI card shows what your team sees on its side. Sample business and data throughout.
type Msg={from:'customer'|'agent'|'human'|'event';text:ReactNode};
type Story={label:string;cta:string;Icon:LucideIcon;channel:'WhatsApp'|'Website'|'Instagram';href:string;contact:string;handle:string;messages:Msg[];card:ReactNode};

const stories:Story[]=[
 {label:'Inbox',cta:'Manage conversations',Icon:Inbox,channel:'WhatsApp',href:'/features/unified-inbox/',contact:'',handle:'',messages:[],card:null},
 {label:'Customer details',cta:'See how it works',Icon:UserRound,channel:'Website',href:'/features/crm/',contact:'Steps AI',handle:'Typically replies instantly',
  messages:[{from:'customer',text:'Can I book a store visit on Friday?'},{from:'agent',text:'Of course. Could I have your name and email to confirm the visit?'},{from:'customer',text:'Aisha Khan, aisha@example.com'},{from:'agent',text:'Thanks, Aisha. Friday is noted, and the team will confirm your time by email.'}],
  card:<><header className="tv-card-head"><UserRound size={16}/><strong>Contact saved</strong><span className="tv-pill tv-pill-ok"><Check size={12}/>CRM</span></header>
   <div className="tv-profile"><span className="tv-avatar tv-avatar-2">A</span><div><strong>Aisha Khan</strong><small><ChannelLogo channel="Website"/>From website chat</small></div></div>
   <dl className="tv-fields"><div><dt><Mail size={13}/>Email</dt><dd>aisha@example.com</dd></div><div><dt><CalendarDays size={13}/>Preferred day</dt><dd>Friday</dd></div><div><dt><Info size={13}/>Request</dt><dd>Store visit</dd></div></dl>
   <div className="tv-tags"><span><Tag size={12}/>Booking enquiry</span><span><Tag size={12}/>Follow up this week</span></div></>},
 {label:'Human help',cta:'Human handoff',Icon:Headphones,channel:'Instagram',href:'/features/human-handoff/',contact:'yourstore',handle:'Your Store',
  messages:[{from:'customer',text:'Is this jacket available in blue?'},{from:'agent',text:'Yes, the blue jacket is in stock in M and L.'},{from:'customer',text:'Can I change the size after it arrives?'},{from:'event',text:'Priya joined from the Instagram app'},{from:'human',text:'Hi James, Priya here. Yes, we can help you exchange the size.'}],
  card:<><header className="tv-card-head"><Headphones size={16}/><strong>Team handover</strong><span className="tv-pill tv-pill-warm">Priya</span></header>
   <ol className="tv-steps"><li><Check size={13}/>Priya read the full chat first</li><li><Check size={13}/>Replied from the Instagram app</li><li className="is-paused"><PauseCircle size={13}/>AI paused in this chat</li></ol>
   <div className="tv-toggle"><span>AI agent</span><i aria-hidden="true"><b/></i><small>Paused</small></div></>},
 {label:'Results',cta:'Track results',Icon:ChartNoAxesCombined,channel:'WhatsApp',href:'/features/analytics/',contact:'Your Store',handle:'Business account',
  messages:[],card:null}
];
const TOTAL=9000;

// Inbox tab: a unified inbox, not a single channel. Conversations from every connected channel arrive in one list,
// each tagged by what the customer wants; the sidebar shows the connected channels and tag counts. Static view.
const inboxRows=[
 {name:'Maya',channel:'WhatsApp',text:'Where is my order?',tag:'Order',status:'AI answered',tone:'ok'},
 {name:'James',channel:'Instagram',text:'Is this jacket in blue?',tag:'Product',status:'AI answered',tone:'ok'},
 {name:'Aisha',channel:'Website',text:'Can I book a visit on Friday?',tag:'Booking',status:'New',tone:'new'},
 {name:'Leo',channel:'Messenger',text:'Do you deliver to Dubai?',tag:'Delivery',status:'AI answered',tone:'ok'},
 {name:'Nora',channel:'WhatsApp',text:'I’d like to return my order',tag:'Return',status:'Alex',tone:'team'},
 {name:'Ravi',channel:'Instagram',text:'Price for two sets?',tag:'Lead',status:'AI answered',tone:'ok'}
];
const inboxChannels=['WhatsApp','Instagram','Messenger','Website'],inboxTags=['Order','Product','Booking','Delivery','Return','Lead'];
function UnifiedInbox(){
 const arrived=inboxRows,list=inboxRows;
 const count=(key:'channel'|'tag',value:string)=>arrived.filter(r=>r[key]===value).length;
 return <div className="tv-inbox"><header className="tv-inbox-top"><span className="tv-card-brand"><span>s</span>Steps AI</span><strong>Inbox</strong><span className="tv-search"><Search size={14}/>Search conversations</span><span className="tv-pill tv-pill-ok"><i className="tv-dot"/>4 channels</span></header>
  <div className="tv-inbox-main"><aside className="tv-inbox-side"><small>Connected channels</small>{inboxChannels.map(ch=><div key={ch} className="tv-side-row"><ChannelLogo channel={ch}/><span>{ch}</span><b>{count('channel',ch)}</b></div>)}<small>Tags</small><div className="tv-side-tags">{inboxTags.map(t=><span key={t} className={`tv-tag tv-tag-${t.toLowerCase()}`}>{t}<b>{count('tag',t)}</b></span>)}</div></aside>
   <div className="tv-inbox-list"><div className="tv-list-head"><strong>All conversations</strong><span>{arrived.length} open</span></div>{list.map((r,i)=><div key={r.name} className={`tv-irow${i===0?' is-new':''}`}><span className={`tv-avatar tv-avatar-${inboxRows.indexOf(r)%4}`}>{r.name[0]}<em><ChannelLogo channel={r.channel}/></em></span><div><strong>{r.name}<small>{r.channel}</small></strong><p>{r.text}</p></div><div className="tv-irow-meta"><span className={`tv-tag tv-tag-${r.tag.toLowerCase()}`}>{r.tag}</span><span className={`tv-state tv-state-${r.tone}`}>{r.status}</span></div></div>)}</div></div></div>;
}


function Chat({story,time}:{story:Story;time:number}){
 const kind=story.channel.toLowerCase();const step=TOTAL/(story.messages.length+1);
 const head=kind==='whatsapp'?<header className="tv-head"><ChevronLeft size={20}/><span className="tv-head-avatar"><img src={asset("/images/stories/homeware-still-life.webp")} alt="" width="34" height="34"/></span><div><strong>{story.contact}</strong><small>{story.handle}</small></div><Video size={19}/><Phone size={17}/><MoreVertical size={17}/></header>
  :kind==='instagram'?<header className="tv-head"><ChevronLeft size={22}/><span className="tv-head-avatar tv-ig-ring"><b>YS</b></span><div><strong>{story.contact}</strong><small>{story.handle}</small></div><Phone size={19}/><Video size={20}/></header>
  :<header className="tv-head"><span className="tv-head-avatar tv-web-mark">s</span><div><strong>{story.contact}</strong><small><i className="tv-dot"/>{story.handle}</small></div><MoreVertical size={17}/></header>;
 const input=kind==='whatsapp'?<footer className="tv-input"><Plus size={20}/><span>Message</span><Smile size={18}/><Camera size={18}/><Mic size={18}/></footer>
  :kind==='instagram'?<footer className="tv-input"><span className="tv-ig-cam"><Camera size={15}/></span><span>Message…</span><Mic size={18}/></footer>
  :<footer className="tv-input"><span>Type your message…</span><Send size={17}/></footer>;
 return <div className={`tv-chat tv-${kind}`}>{head}<div className="tv-body">{story.messages.map((m,i)=>{const at=step*(i+.6),shown=time>=at,typing=!shown&&time>=at-900&&m.from!=='event';
  return <div key={i} className={`tv-slot tv-from-${m.from}`}>{shown?<div className={`tv-msg ${m.from==='event'?'tv-event':''}`}>{m.from==='human'&&<span className="tv-who">Priya · Your team</span>}{m.text}{m.from!=='event'&&<small>10:{24+i}{kind==='whatsapp'&&m.from==='customer'&&<CheckCheck size={13}/>}</small>}</div>:typing?<div className="tv-typing" aria-hidden="true"><i/><i/><i/></div>:null}</div>})}</div>{input}</div>;
}

export function TeamStory(){
 const [active,setActive]=useState(0),[time,setTime]=useState(0),[auto,setAuto]=useState(true),[visible,setVisible]=useState(false),[reduced,setReduced]=useState(false);
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduced(mq.matches);sync();mq.addEventListener('change',sync);
  const observer=new IntersectionObserver(([e])=>setVisible(e.isIntersecting),{threshold:.35});observer.observe(root.current!);return()=>{observer.disconnect();mq.removeEventListener('change',sync)}},[]);
 // Play the chat while the section is on screen; once it has finished, move on to the next tab until someone picks one.
 const done=time>=TOTAL+1800;
 useEffect(()=>{if(!visible||reduced||done)return;const timer=window.setInterval(()=>{if(!document.hidden)setTime(t=>Math.min(TOTAL+1800,t+100))},100);return()=>window.clearInterval(timer)},[visible,reduced,done]);
 useEffect(()=>{if(done&&auto){setActive(a=>(a+1)%stories.length);setTime(0)}},[done,auto]);
 const pick=(i:number)=>{setAuto(false);setActive(i);setTime(0)};
 const shownTime=reduced?TOTAL:time,story=stories[active],item=copy.team.items[active];
 return <section id="team" ref={root} className="tv-section" aria-labelledby="workspace-title"><div className="container">
  <header className="tv-heading"><h2 id="workspace-title">{copy.team.title}</h2><p>{copy.team.paragraphs[0]}</p></header>
  <div className="tv-tabs" role="tablist" aria-label="What your team can see">{stories.map((s,i)=><button key={s.label} role="tab" id={`tv-tab-${i}`} aria-selected={active===i} aria-controls="tv-panel" onClick={()=>pick(i)} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const n=(i+(e.key==='ArrowRight'?1:-1)+stories.length)%stories.length;pick(n);(e.currentTarget.parentElement?.children[n] as HTMLElement|undefined)?.focus()}}}><s.Icon size={19}/><span>{s.label}</span>{active===i&&auto&&!reduced&&<i className="tv-progress" style={{transform:`scaleX(${Math.min(1,shownTime/(TOTAL+1800))})`}}/>}</button>)}</div>
  <div className="tv-panel" id="tv-panel" role="tabpanel" aria-labelledby={`tv-tab-${active}`} key={active}>
   <div className="tv-copy"><span className="tv-kicker"><b>0{active+1}</b>{story.label}</span><h3>{item.title}</h3><p>{item.paragraphs[0]}</p><a href={story.href} className="tv-link">{story.cta} <ArrowRight size={16}/></a></div>
   <div className={`tv-stage${active===0?' is-inbox':active===3?' is-results':''}`}>{active===0?<UnifiedInbox/>:active===3?<AnalyticsMock compact/>:<><Chat story={story} time={shownTime}/><div className={`tv-card${shownTime>=TOTAL*.55?' is-in':''}`}><div className="tv-card-brand"><span>s</span>Steps AI · your team’s view</div>{story.card}</div></>}</div>
  </div>
 </div></section>;
}
export const StorySection=TeamStory;
