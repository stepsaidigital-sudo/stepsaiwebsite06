'use client';
import {useState} from 'react';
import {ArrowRight,Check,FileText,Globe,Headphones,PhoneCall,Play,RotateCcw,Send,ShieldCheck} from 'lucide-react';
import {ChannelLogo} from './channel-chat';
import copy from './copy.json';

export function SetupStory(){
 const [tone,setTone]=useState<'Friendly'|'Formal'>('Friendly');
 const [channel,setChannel]=useState('WhatsApp');
 const [tested,setTested]=useState(false);
 const reply=tone==='Friendly'?'Yes! We deliver to Pune in 3–5 working days.':'Delivery to Pune takes 3–5 working days.';
 return <div className="visual-story agent-story" aria-labelledby="agent-story-title">
  <header className="vs-heading"><h2 id="agent-story-title">{copy.setup.title}</h2><p>Your knowledge. Your rules. Your agent.</p></header>
  <div className="as-canvas">
   <svg className="as-connectors" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true"><path d="M250 220 C390 220 340 300 480 300 M250 460 C380 460 380 320 480 320 M720 300 C880 300 820 220 960 220 M720 320 C880 320 820 450 960 450"/></svg>
   <div className="as-sources"><span className="as-label"><Globe size={16}/>Your information</span><div className="as-website"><header><i/><i/><i/><span>northandpine.example</span></header><img src="/images/stories/homeware-still-life.webp" alt="Example business website featuring the same ivory vase and blue bowl" width="1536" height="1024" loading="lazy"/><div><strong>Objects for everyday living.</strong><span>North & Pine</span></div></div><div className="as-document"><FileText size={22}/><div><strong>Delivery & returns</strong><small>Business information</small></div><Check size={16}/></div></div>
   <div className="as-agent"><div className="as-agent-header"><span className="vs-brandmark">s</span><div><strong>Your AI agent</strong><small>North & Pine</small></div><span className="vs-status"><i/>Preview</span></div>
    <div className="as-agent-art" aria-hidden="true"><div className="as-orbit orbit-one"/><div className="as-orbit orbit-two"/><div className="as-core"><span>s</span></div><span className="as-knowledge"><FileText size={15}/><Check size={12}/></span><span className="as-channel">{channel==='Phone'?<PhoneCall size={22}/>:<ChannelLogo channel={channel}/>}</span></div>
    <div className="as-chat" aria-live="polite"><div className="as-question">Do you deliver to Pune?</div><div className="as-answer" key={tone}><span className="as-answer-name">Your agent · {channel}</span>{reply}<span className="as-source"><FileText size={12}/>Delivery & returns</span></div></div>
    <button className={`as-test ${tested?'is-tested':''}`} onClick={()=>setTested(v=>!v)}>{tested?<Check size={16}/>:<Play size={16}/>} {tested?'Example test complete':'Try this conversation'}{tested?<RotateCcw size={15}/>:<ArrowRight size={16}/>}</button>
    {tested&&<span className="as-test-result" role="status">Answer checked against the example source.</span>}
   </div>
   <div className="as-config"><div className="as-behaviour"><span className="as-label">Make it sound like you</span><div className="as-tone" role="group" aria-label="Example agent tone">{(['Friendly','Formal'] as const).map(t=><button key={t} aria-pressed={tone===t} onClick={()=>{setTone(t);setTested(false)}}>{t}{tone===t&&<Check size={14}/>}</button>)}</div><span className="as-rule"><Headphones size={17}/><span>Refunds go to your team</span><ShieldCheck size={17}/></span></div>
    <div className="as-channels"><span className="as-label">Meet customers anywhere</span><div className="as-channel-options" role="group" aria-label="Preview a connected channel">{['Website','WhatsApp','Instagram','Messenger','Phone'].map(c=><button key={c} aria-label={c} title={c} aria-pressed={channel===c} onClick={()=>{setChannel(c);setTested(false)}}>{c==='Phone'?<PhoneCall size={22}/>:<ChannelLogo channel={c}/>}</button>)}</div><span className="as-channel-name">{channel}<Check size={13}/></span></div>
    <div className="as-ready"><span className="as-ready-icon"><Send size={22}/></span><div><strong>Make it yours.</strong><a href="/book-a-demo/">See your agent in a demo<ArrowRight size={14}/></a></div></div>
   </div>
  </div><div className="as-footnote"><span><Check size={14}/>No coding needed</span><span>Interactive illustration · sample business</span></div>
  <div className="vs-sr-only"><p>{copy.setup.paragraphs[0]}</p>{copy.setup.items.slice(0,4).map(item=><p key={item.title}>{item.title}. {item.paragraphs[0]}</p>)}</div>
 </div>;
}
