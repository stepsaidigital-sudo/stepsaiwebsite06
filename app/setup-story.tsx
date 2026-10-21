'use client';
import {useState} from 'react';
import {ArrowRight,Check,ChevronRight,FileText,Globe,LayoutDashboard,MessageCircle,Send,Sparkles} from 'lucide-react';
import copy from './copy.json';

const goals=[
 {id:'messaging',label:'WhatsApp messaging',detail:'Reach your customers',icon:Send},
 {id:'agent',label:'AI agent',detail:'Answer and assist',icon:Sparkles},
 {id:'website',label:'Website chat',detail:'Welcome website visitors',icon:Globe},
] as const;
type Goal=typeof goals[number]['id'];
const photo='/images/stories/homeware-still-life.webp';

export function SetupStory(){
 const [goal,setGoal]=useState<Goal>('agent');
 return <div className="visual-story setup-journey" aria-labelledby="agent-story-title">
  <header className="vs-heading"><h2 id="agent-story-title">{copy.setup.title}</h2><p>A little about your business. A clear next step.</p></header>
  <div className="sj-shell">
   <div className="sj-topbar"><span className="sj-brand"><img src="/brands/steps-original.png" width="46" height="27" alt=""/>Steps AI</span><span>One simple start. Your own path.</span></div>
   <div className="sj-journey">
    <section aria-labelledby="sj-business-title"><div className="sj-step"><span>1</span><h3 id="sj-business-title">Your business</h3></div>
     <div className="sj-business-content"><div className="sj-field"><span>Business name</span><strong>Lumen Home</strong></div><div className="sj-field"><span>Website</span><strong><Globe size={14}/>lumenhome.in</strong></div>
      <div className="sj-site-preview"><img src={photo} width="1536" height="1024" alt="Sample homeware website with an ivory vase, blue bowl and linen" loading="lazy"/><span>Lumen Home<small>Made for everyday living.</small></span></div>
      <div className="sj-discovery"><span><Check size={14}/></span><div><strong>Home &amp; living</strong><small>Industry from your website</small></div></div>
     </div>
    </section>
    <div className="sj-connector" aria-hidden="true"><ArrowRight size={18}/></div>
    <section aria-labelledby="sj-goals-title"><div className="sj-step"><span>2</span><h3 id="sj-goals-title">Your goal</h3></div>
     <div className="sj-goal-list" role="group" aria-label="Choose an example setup goal">{goals.map(({id,label,detail,icon:Icon})=><button key={id} aria-pressed={goal===id} aria-controls="sj-next-step" onClick={()=>setGoal(id)}><span className="sj-goal-icon">{id==='messaging'?<img src="/brands/whatsapp.png" width="24" height="24" alt=""/>:<Icon size={23}/>}</span><span><strong>{label}</strong><small>{detail}</small></span><ChevronRight size={17}/></button>)}</div>
     <span className="sj-choice-hint">Choose a goal to explore <ArrowRight size={13}/></span>
    </section>
    <div className="sj-connector" aria-hidden="true"><ArrowRight size={18}/></div>
    <section aria-labelledby="sj-next-title"><div className="sj-step"><span>3</span><h3 id="sj-next-title">Your next step</h3></div>
     <div className="sj-dashboard" id="sj-next-step"><header><LayoutDashboard size={16}/><span>Lumen Home</span><span className="sj-preview-label">Preview</span></header>
      <div className="sj-dashboard-body" key={goal}><div className="sj-dashboard-title"><span>YOUR WORKSPACE</span><h4>{goal==='messaging'?'Bring customers closer.':goal==='agent'?'Meet your new agent.':'Be there when they browse.'}</h4></div>
       {goal==='messaging'?<div className="sj-message-scene"><div className="sj-message-banner"><img src="/brands/whatsapp.png" width="23" height="23" alt=""/>WhatsApp<span>Draft</span></div><img className="sj-message-photo" src={photo} width="1536" height="1024" alt="Sample homeware collection message" loading="lazy"/><div className="sj-message-copy">A little something for your home.<span>Explore the collection <ArrowRight size={13}/></span></div></div>:goal==='agent'?<div className="sj-agent-scene"><div className="sj-agent-identity"><img src="/brands/steps-original.png" width="41" height="24" alt=""/><div><strong>Lumen Home assistant</strong><small>Customer support</small></div></div><div className="sj-chat-question">How do I care for my linen?</div><div className="sj-chat-answer">A gentle, cool wash works best.<span><FileText size={12}/>Product care guide · sample</span></div></div>:<div className="sj-web-scene"><div className="sj-browser-bar"><i/><i/><i/><span>lumenhome.in</span></div><img src={photo} width="1536" height="1024" alt="Sample website with a chat widget" loading="lazy"/><div className="sj-widget"><span><MessageCircle size={15}/>Lumen Home</span><strong>Make yourself at home.</strong><small>What can we help you find?</small></div><span className="sj-widget-launcher"><MessageCircle size={18}/></span></div>}
       <div className="sj-connection"><span className="sj-connection-logo">{goal==='website'?<Globe size={23}/>:<img src="/brands/whatsapp.png" width="25" height="25" alt=""/>}</span><div><strong>{goal==='website'?'Add chat to your website':goal==='agent'?'Choose where your agent helps':'Connect your WhatsApp account'}</strong><small>{goal==='website'?'Shopify or another website':goal==='agent'?'WhatsApp or your website':'Continue with Meta'}</small></div><ArrowRight size={16}/></div>
      </div>
     </div>
    </section>
   </div>
   <div className="sj-bottom"><span><Check size={15}/>Guided from the start</span><a href="/book-a-demo/">See your setup in a demo<ArrowRight size={16}/></a></div>
  </div>
  <div className="sj-caption"><span>Sample business shown. Connections and any required approvals come next.</span></div>
  <span className="vs-sr-only" role="status">{goals.find(item=>item.id===goal)!.label} example selected. {goal==='messaging'?'Preview a draft message, then connect WhatsApp through Meta.':goal==='agent'?'Preview an assistant reply, then choose WhatsApp or your website.':'Preview website chat, then add it to Shopify or another website.'}</span>
 </div>;
}
