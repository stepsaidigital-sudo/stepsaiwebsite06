'use client';
import {useState} from 'react';
import {ArrowUpRight,Check,CheckCheck,Headphones,Inbox,MessageCircle,UserRound,ChartNoAxesCombined,ArrowRight,Package,Send} from 'lucide-react';
import {ChannelLogo} from './channel-chat';
import copy from './copy.json';

const views=[{label:'Inbox',Icon:Inbox},{label:'Customer',Icon:UserRound},{label:'Team',Icon:Headphones},{label:'Results',Icon:ChartNoAxesCombined}];
export function TeamStory(){
 const [view,setView]=useState(0);
 return <section id="team" className="visual-story workspace-story" aria-labelledby="workspace-title">
  <div className="container">
   <header className="vs-heading"><h2 id="workspace-title">{copy.team.title}</h2><p>Every message. The full picture.</p></header>
   <div className="ws-canvas" data-view={view}>
    <div className="ws-topline"><span className="ws-brand"><span className="vs-brandmark">s</span>Your workspace</span><span className="vs-demo">Illustrative demo</span></div>
    <div className="ws-layout">
     <aside className="ws-inbox"><div className="vs-ui-heading"><Inbox size={18}/><strong>Inbox</strong><span>3</span></div>
      {[['M','Maya','Where is my order?','WhatsApp'],['J','James','Is this available?','Instagram'],['A','Aisha','Can I book a visit?','Website']].map(([initial,name,message,channel],i)=><div key={name} className={`ws-contact ${i===0?'selected':''}`}><span className={`vs-avatar avatar-${i}`}>{initial}</span><div><strong>{name}</strong><small>{message}</small></div><span title={channel}><ChannelLogo channel={channel}/></span></div>)}
      <div className="ws-channel-strip">{['Website','WhatsApp','Instagram','Messenger'].map(channel=><span key={channel} title={channel}><ChannelLogo channel={channel}/></span>)}</div>
      <div className="ws-catalogue"><img src="/images/stories/homeware-still-life.webp" alt="Ivory vase and blue bowl from the example homeware store" width="1536" height="1024" loading="lazy"/><span>North & Pine<ArrowUpRight size={14}/></span></div>
     </aside>
     <div className="ws-conversation"><header><span className="vs-avatar avatar-0">M</span><div><strong>Maya Patel</strong><small><ChannelLogo channel="WhatsApp"/>WhatsApp</small></div><span className="vs-status"><i/>{view===2?'Alex joined':'Open'}</span></header>
      <div className="ws-messages" key={view}><span className="ws-date">Today · 10:24</span><div className="ws-bubble ws-in">Where is my order?</div><div className="ws-order"><Package size={24}/><div><strong>Order #2087</strong><small>Out for delivery</small></div><Check size={16}/></div><div className="ws-bubble ws-out">Your order is out for delivery today.<CheckCheck size={14}/></div>
       {view===2?<><div className="ws-bubble ws-in">Could someone help with a return, too?</div><div className="ws-event"><Headphones size={14}/>Alex joined · history included</div><div className="ws-bubble ws-human">Hi Maya, I can help with that.</div></>:<div className="ws-event"><Check size={14}/>{view===1?'Saved to Maya’s customer record':view===3?'Order question answered':'Answered by your agent'}</div>}
      </div><div className="ws-composer"><span>{view===2?'Alex is replying · team handling':'Conversation history stays here'}</span><Send size={16}/></div>
     </div>
     <aside className={`ws-context ${view===1?'is-highlighted':''}`}>
      {view===3?<div className="ws-analytics"><ChartNoAxesCombined size={24}/><strong>What customers ask</strong><small>Example conversations</small>{[['Order status',18],['Returns',9],['Products',5]].map(([label,count])=><div className="ws-topic" key={label}><span>{label}<b>{count}</b></span><i><em style={{width:`${Number(count)/18*100}%`}}/></i></div>)}<div className="ws-analytics-note"><Check size={15}/>Maya’s order question is included.</div></div>:<><div className="ws-profile"><span className="vs-avatar avatar-0">M</span><strong>Maya Patel</strong><small>Returning customer</small></div><div className="ws-record"><span>Customer details</span><strong>maya@example.com</strong><span className="ws-label">Order enquiry</span></div><div className="ws-history"><strong>One connected history</strong><span><MessageCircle size={14}/>WhatsApp conversation</span><span><Package size={14}/>Order #2087</span><span><Headphones size={14}/>{view===2?'Assigned to Alex':'Team can take over'}</span></div></>}
     </aside>
    </div>
    <div className={`ws-results ${view===3?'is-highlighted':''}`}><span><ChartNoAxesCombined size={19}/><strong>Results</strong></span><span><b>Order status</b><small>Question answered</small></span><span><b>Maya Patel</b><small>Customer record linked</small></span><span><b>{view===2?'Alex':'AI agent'}</b><small>{view===2?'Handling the return':'Handled the enquiry'}</small></span><a href="/features/analytics/" aria-label="Explore analytics"><ArrowUpRight size={21}/></a></div>
   </div>
   <div className="vs-controls" role="group" aria-label="Explore the connected workspace">{views.map(({label,Icon},i)=><button key={label} aria-pressed={view===i} onClick={()=>setView(i)}><Icon size={17}/>{label}{view===i&&<ArrowRight size={15}/>}</button>)}</div>
   <p className="vs-sr-only" role="status">{['Inbox: the agent answers the order enquiry.','Customer: contact details and conversation history are linked.','Team: Alex joins the conversation with its history.','Results: example question categories and counts are shown.'][view]}</p>
   <div className="vs-sr-only"><p>{copy.team.paragraphs[0]}</p>{copy.team.items.map(item=><p key={item.title}>{item.title}. {item.paragraphs[0]}</p>)}</div>
  </div>
 </section>;
}
export const StorySection=TeamStory;
