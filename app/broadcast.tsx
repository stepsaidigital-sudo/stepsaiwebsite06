'use client';
import {useEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react';
import {Megaphone,AtSign,MessageCircle,ChevronLeft,Phone,Video,MoreHorizontal,CheckCheck,ExternalLink,CornerUpLeft,Heart,Send,Bookmark,Camera,Mic,Image as ImageIcon,Plus,Sticker,Users,Tag,Check,Bot} from 'lucide-react';
import {ChannelLogo} from './channel-chat';

// Broadcast & Instagram, for visitors who come for campaigns. On desktop the section pins
// and scrolling moves through three stories; on phones the tabs switch on tap and auto-play.
// Inside the phone each screen follows the current iOS app (WhatsApp, Instagram); outside
// it, Steps AI colours only. Mockup content is illustrative.

const DURATION=7000;
const tabs=[
  {key:'wa',channel:'WhatsApp',icon:Megaphone,title:'WhatsApp broadcast',line:'Send an approved template to a tagged audience. Replies go straight to your agent.'},
  {key:'c2d',channel:'Instagram',icon:AtSign,title:'Comment to DM',line:'A keyword comment on your post opens a DM, and your agent takes it from there.'},
  {key:'dm',channel:'Instagram',icon:MessageCircle,title:'Instagram DM',line:'Story replies and DMs get an answer straight away, day or night.'},
];

const B=({d,className='',children}:{d:number;className?:string;children?:ReactNode})=><div className={`bx ${className}`} style={{'--d':`${d}ms`} as CSSProperties}>{children}</div>;
const Typing=({d,className}:{d:number;className:string})=><div className={`bx-typing ${className}`} style={{'--d':`${d}ms`} as CSSProperties}><i/><i/><i/></div>;

/* iOS status bar with the real glyph shapes. */
function StatusBar(){
  return <div className="ios-status"><span className="ios-time">9:41</span><span className="ios-glyphs" aria-hidden="true">
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
    <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.6c2.2 0 4.2.9 5.7 2.3l1.1-1.1A9.6 9.6 0 0 0 8 1C5.4 1 3 2 1.2 3.8l1.1 1.1A8 8 0 0 1 8 2.6Zm0 3.2c1.3 0 2.5.5 3.4 1.3l1.1-1.1A6.4 6.4 0 0 0 8 4.2c-1.7 0-3.3.7-4.5 1.8l1.1 1.1c.9-.8 2.1-1.3 3.4-1.3Zm0 3.2c-.6 0-1.1.2-1.5.6L8 11.1l1.5-1.5c-.4-.4-.9-.6-1.5-.6Z"/></svg>
    <svg width="27" height="13" viewBox="0 0 27 13" fill="currentColor"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="20" height="9" rx="2"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" opacity=".45"/></svg>
  </span></div>;
}
const HomeBar=()=><span className="ios-home" aria-hidden="true"/>;

/* WhatsApp (iOS, light): an approved marketing template, a quick-reply tap, the agent's answer. */
function WhatsAppScreen(){
  return <div className="scr wa">
    <div className="bcw-nav"><StatusBar/><div className="bcw-head"><span className="bcw-back"><ChevronLeft size={26} strokeWidth={2.2}/>12</span><img className="bcw-av" src="/industries/ecommerce.png" alt=""/><div><strong>Your Store <svg className="bcw-badge" width="15" height="15" viewBox="0 0 24 24"><path d="M12 1.5l2.6 1.9 3.2-.2 1 3.1 2.6 1.9-1 3.1 1 3.1-2.6 1.9-1 3.1-3.2-.2L12 22.5l-2.6-1.9-3.2.2-1-3.1L2.6 15.8l1-3.1-1-3.1 2.6-1.9 1-3.1 3.2.2z"/><path d="M8 12.2l2.6 2.6L16.2 9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></strong><small>Business account</small></div><Video size={23} strokeWidth={1.8}/><Phone size={20} strokeWidth={1.8}/></div></div>
    <div className="bcw-chat">
      <span className="bcw-day">Today</span>
      <B d={700} className="bcw-tpl-wrap">
        <div className="bcw-b bcw-in bcw-tpl">
          <img className="bcw-img" src="/industries/ecommerce.png" alt=""/>
          <p><b>The weekend sale is live</b><br/>Hi Priya, members get early access to the new ceramics.</p>
          <small className="bcw-foot">Reply STOP to opt out</small><small className="bcw-time">10:00</small>
        </div>
        <div className="bcw-btn"><ExternalLink size={15}/>Shop the sale</div>
        <div className="bcw-btn"><CornerUpLeft size={15}/>Show me more</div>
      </B>
      <B d={2400} className="bcw-b bcw-out">Show me more<small className="bcw-time">10:02 <CheckCheck size={15}/></small></B>
      <Typing d={3000} className="bcw-b bcw-in"/>
      <B d={4100} className="bcw-b bcw-in">Here are this week’s best sellers. Any you like?<small className="bcw-time">10:02</small></B>
    </div>
    <div className="bcw-compose"><Plus size={24} strokeWidth={1.8}/><span className="bcw-field"><Sticker size={19} strokeWidth={1.7}/></span><Camera size={22} strokeWidth={1.8}/><Mic size={22} strokeWidth={1.8}/></div>
    <HomeBar/>
  </div>;
}

/* Instagram iOS DM header and composer, shared by both Instagram stories. */
const IgHead=()=><div className="bci-nav"><StatusBar/><div className="bci-head"><ChevronLeft size={28} strokeWidth={1.9}/><span className="bci-ring"><span>ys</span></span><div><strong>Your Store</strong><small>yourstore</small></div><Phone size={22} strokeWidth={1.7}/><Video size={25} strokeWidth={1.7}/></div></div>;
const IgCompose=()=><div className="bci-compose"><span className="bci-cam"><Camera size={17} strokeWidth={2}/></span><em>Message…</em><Mic size={21} strokeWidth={1.7}/><ImageIcon size={21} strokeWidth={1.7}/><Sticker size={21} strokeWidth={1.7}/></div>;

/* Comment to DM: a keyword comment in the comments sheet, then the DM thread. */
function CommentScreen(){
  return <div className="scr ig c2d">
    <div className="c2d-track">
      <div className="c2d-pane">
        <div className="bci-nav"><StatusBar/><div className="bcp-top"><ChevronLeft size={28} strokeWidth={1.9}/><div><small>YOURSTORE</small><strong>Posts</strong></div></div></div>
        <div className="bcp-head"><span className="bci-ring sm"><span>ys</span></span><strong>yourstore</strong><MoreHorizontal size={20}/></div>
        <img className="bcp-img" src="/industries/ecommerce.png" alt=""/>
        <div className="bcp-actions"><Heart size={24} strokeWidth={1.8}/><MessageCircle size={23} strokeWidth={1.8}/><Send size={22} strokeWidth={1.8}/><Bookmark size={23} strokeWidth={1.8}/></div>
        <p className="bcp-likes">1,204 likes</p>
        <p className="bcp-cap"><b>yourstore</b> New arrivals are here. Comment <b>LINK</b> and we’ll send you the details.</p>
        <div className="bcp-sheet">
          <span className="bcp-grab"/><strong className="bcp-sheet-title">Comments</strong>
          <B d={800} className="bcp-c"><span className="bcp-cav">pk</span><div><p><b>priya.k</b> <small>1m</small></p><p>LINK</p><small>Reply</small></div><Heart size={13}/></B>
          <B d={1700} className="bcp-c"><span className="bci-ring xs"><span>ys</span></span><div><p><b>yourstore</b> <small>Now</small></p><p>Sent! Check your DMs.</p><small>Reply</small></div><Heart size={13}/></B>
        </div>
      </div>
      <div className="c2d-pane">
        <IgHead/>
        <div className="bci-thread">
          <span className="bci-stamp">Today 10:04</span>
          <B d={3400} className="bci-m bci-in">Hi Priya! Here’s the new arrivals collection you asked about.</B>
          <B d={3900} className="bci-card"><img className="bci-card-img" src="/industries/ecommerce.png" alt=""/><div><strong>New arrivals</strong><small>yourstore.com</small></div></B>
          <B d={4700} className="bci-m bci-out">Do you have it in medium?</B>
          <Typing d={5200} className="bci-m bci-in"/>
          <B d={6100} className="bci-m bci-in">Yes, medium is in stock. Shall I hold one for you?</B>
        </div>
        <IgCompose/>
      </div>
    </div>
    <HomeBar/>
  </div>;
}

/* Instagram DM: a story reply turns into a conversation with the agent. */
function DmScreen(){
  return <div className="scr ig">
    <IgHead/>
    <div className="bci-thread">
      <span className="bci-stamp">Today 21:18</span>
      <B d={500} className="bci-story"><small>You replied to their story</small><img className="bci-story-img" src="/industries/ecommerce.png" alt=""/></B>
      <B d={1100} className="bci-m bci-out">Do you deliver to Bengaluru?</B>
      <Typing d={1700} className="bci-m bci-in"/>
      <B d={2800} className="bci-m bci-in">Yes, we do. Share your pin code and I’ll check delivery times.</B>
      <B d={3900} className="bci-m bci-out">560001</B>
      <B d={4900} className="bci-m bci-in">It arrives in 2 days. Want me to send the link?</B>
      <B d={5500} className="bci-seen">Seen</B>
    </div>
    <IgCompose/>
    <HomeBar/>
  </div>;
}

const screens=[<WhatsAppScreen key="wa"/>,<CommentScreen key="c2d"/>,<DmScreen key="dm"/>];

/* Cards beside the phone: the campaign behind the WhatsApp story, the result of each Instagram one. */
function SideCards({tab}:{tab:number}){
  return <>
    <div className={`bc-float bc-composer ${tab===0?'is-on':''}`} aria-hidden="true">
      <span className="bc-float-label"><Megaphone size={14}/>New campaign</span>
      <dl><div><dt>Template</dt><dd>weekend_sale</dd></div><div><dt>Audience</dt><dd><Tag size={12}/>VIP customers</dd></div><div><dt>Recipients</dt><dd><Users size={12}/>842</dd></div></dl>
      <span className="bc-send"><Send size={14}/>Send campaign</span>
    </div>
    <div className={`bc-float bc-agent ${tab===0?'is-on':''}`} aria-hidden="true"><Bot size={15}/>Replies go to your agent</div>
    <div className={`bc-float bc-result ${tab!==0?'is-on':''}`} aria-hidden="true">
      <span className="bc-tick"><Check size={15}/></span>
      <div><strong>{tab===1?'Lead saved · priya.k':'Lead saved · Bengaluru'}</strong><small>{tab===1?'Comment → DM':'Story reply → DM'}</small></div>
    </div>
  </>;
}

export function Broadcast(){
  const root=useRef<HTMLElement>(null),elapsed=useRef(0),bars=useRef<(HTMLElement|null)[]>([]);
  const [tab,setTab]=useState(0),[pinned,setPinned]=useState(false),[visible,setVisible]=useState(false),[pageVisible,setPageVisible]=useState(true),[reduced,setReduced]=useState(false);
  useEffect(()=>{
    // Pin and scroll-drive on roomy screens; tap and auto-play elsewhere.
    const pinQuery=matchMedia('(min-width: 901px) and (min-height: 600px)'),motion=matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>{setReduced(motion.matches);setPinned(pinQuery.matches&&!motion.matches)};sync();
    pinQuery.addEventListener('change',sync);motion.addEventListener('change',sync);
    const visibility=()=>setPageVisible(!document.hidden);document.addEventListener('visibilitychange',visibility);
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.2});observer.observe(root.current!);
    return()=>{pinQuery.removeEventListener('change',sync);motion.removeEventListener('change',sync);document.removeEventListener('visibilitychange',visibility);observer.disconnect()};
  },[]);
  useEffect(()=>{
    // Pinned: the scroll position through the tall runway picks the story and fills its bar.
    if(!pinned)return;let raf=0;
    const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const r=root.current!.getBoundingClientRect();const span=r.height-innerHeight;const p=Math.min(.9999,Math.max(0,-r.top/span))*tabs.length;const i=Math.floor(p);setTab(i);bars.current.forEach((bar,j)=>bar?.style.setProperty('transform',`scaleX(${j===i?p-i:0})`))})};
    update();addEventListener('scroll',update,{passive:true});addEventListener('resize',update);
    return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',update);removeEventListener('resize',update)};
  },[pinned]);
  const autoplay=!pinned&&visible&&pageVisible&&!reduced;
  useEffect(()=>{
    // Not pinned: each story plays for DURATION ms, then the next takes over.
    if(!autoplay)return;let frame=0,last=performance.now();
    const tick=(now:number)=>{elapsed.current+=Math.min(now-last,80);last=now;const t=Math.min(1,elapsed.current/DURATION);bars.current.forEach((bar,j)=>bar?.style.setProperty('transform',`scaleX(${j===tab?t:0})`));if(t>=1){elapsed.current=0;setTab(v=>(v+1)%tabs.length);return}frame=requestAnimationFrame(tick)};
    frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
  },[tab,autoplay]);
  const pick=(i:number)=>{
    if(pinned){const r=root.current!.getBoundingClientRect();const span=r.height-innerHeight;scrollTo({top:scrollY+r.top+span*(i+.08)/tabs.length,behavior:'smooth'});return}
    elapsed.current=0;setTab(i);
  };
  const held=!visible||!pageVisible;
  return <section id="broadcast" ref={root} className={`broadcast ${pinned?'is-pinned':''} ${held?'is-held':''}`} aria-labelledby="broadcast-title">
    <div className="bc-pin"><div className="container bc-layout">
      <div className="bc-copy">
        <span className="bc-eyebrow">Campaigns &amp; Instagram</span>
        <h2 id="broadcast-title">Send a campaign. Every reply lands with your agent.</h2>
        <p className="bc-lead">Broadcast on WhatsApp, turn Instagram comments into DMs and let your agent answer everyone who writes back.</p>
        <p className="bc-guide"><span className="bc-mouse" aria-hidden="true"><i/></span>{pinned?'Scroll to move through each channel, or pick one.':'Pick a channel to see it in action.'}</p>
        <div className="bc-tabs" role="tablist" aria-label="Campaign channels">{tabs.map((t,i)=>{const Icon=t.icon;return <button key={t.key} role="tab" aria-selected={tab===i} aria-controls="bc-stage" className={`bc-tab bc-tab-${i} ${tab===i?'is-active':''}`} onClick={()=>pick(i)}>
          <span className="bc-tab-icon"><Icon size={18}/></span><span className="bc-tab-text"><small>0{i+1}</small><strong>{t.title}</strong><span>{t.line}</span></span><span className="bc-tab-logo"><ChannelLogo channel={t.channel}/></span>
          <span className="bc-tab-bar"><i ref={el=>{bars.current[i]=el}}/></span>
        </button>})}</div>
      </div>
      <div className="bc-stage" id="bc-stage" role="tabpanel" aria-label={`${tabs[tab].title} example`}>
        {tabs.map((t,i)=><span key={t.key} className={`bc-art bc-art-${i} ${tab===i?'is-on':''}`} aria-hidden="true"/>)}
        <div className="bc-phone" aria-hidden="true"><span className="bc-btn bc-btn-a"/><span className="bc-btn bc-btn-b"/><span className="bc-btn bc-btn-c"/><div className="bc-phone-core"><span className="ios-island"/>{screens.map((s,i)=><div key={i} className={`bc-screen ${tab===i?'is-active':''}`}>{s}</div>)}</div></div>
        <SideCards tab={tab}/>
        <span className="bc-illus">Illustration</span>
      </div>
    </div></div>
  </section>;
}
