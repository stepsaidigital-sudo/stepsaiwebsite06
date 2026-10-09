'use client';
import {useEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react';
import {Megaphone,ShoppingBag,Headphones,RotateCcw,Check,CheckCheck,GraduationCap,UserRound,CalendarCheck,Stethoscope,MoreHorizontal,MoreVertical,Paperclip,SendHorizontal,ChevronLeft,Phone,Video,Camera,Mic,MicOff,Image as ImageIcon,Smile,Volume2,Grid3x3,PhoneOff,BadgeCheck,ShoppingCart} from 'lucide-react';
import copy from './copy.json';

const icons=[Megaphone,ShoppingBag,Headphones,RotateCcw];
// Example customer messages, one per stage. The same line appears in the card's mockup.
const quotes=['I saw your post. Could you send me the details?','Can I book a doctor’s appointment for Saturday morning?','Are admissions still open for the data science course?','I left something in my cart. Is it still available?'];

// One step of a mockup; --d is its entrance delay once the card is live.
const style=(d:number)=>({'--d':`${d}ms`} as CSSProperties);
const In=({d,className='',children}:{d:number;className?:string;children:ReactNode})=><div className={`js-in ${className}`} style={style(d)}>{children}</div>;
const Typing=({d,className=''}:{d:number;className?:string})=><div className={`js-typing ${className}`} style={style(d)}><i/><i/><i/></div>;

/* 01 Engage: an Instagram DM that starts from a comment on a post. */
function InstagramMock(){
  return <div className="mk mk-ig">
    <div className="ig-head"><ChevronLeft size={22}/><span className="ig-avatar"><span>ys</span></span><div><strong>yourstore</strong><small>Active now</small></div><Phone size={20}/><Video size={22}/></div>
    <div className="ig-body">
      <In d={100} className="ig-context"><span className="ig-post"/><div><small>You commented on yourstore’s post</small><strong>“Details, please!”</strong></div></In>
      <In d={700} className="ig-msg ig-out">{quotes[0]}</In>
      <Typing d={1300} className="ig-msg ig-in"/>
      <In d={2400} className="ig-msg ig-in">Of course! Here’s the new collection. Which piece caught your eye?</In>
      <In d={3000} className="ig-card"><span className="ig-card-art"/><div><strong>The Weekend Collection</strong><small>yourstore.com</small></div></In>
      <In d={3600} className="ig-seen">Seen</In>
    </div>
    <div className="ig-input"><span className="ig-cam"><Camera size={17}/></span><span className="ig-field">Message…</span><Mic size={20}/><ImageIcon size={20}/><Smile size={20}/></div>
  </div>;
}

/* 02 Convert: the business's own website chat. */
function WebsiteMock(){
  return <div className="mk mk-web">
    <div className="web-head"><span className="web-avatar"><Stethoscope size={22}/></span><div><strong>Clinic assistant</strong><small><i/>Online now</small></div><MoreHorizontal size={22}/></div>
    <div className="web-body">
      <In d={100} className="web-msg web-out">{quotes[1]}<small>10:24 <CheckCheck size={14}/></small></In>
      <Typing d={700} className="web-msg web-in"/>
      <In d={1800} className="web-msg web-in">Of course! Here are Saturday’s open slots. Which suits you best?<small>10:24</small></In>
      <In d={2300} className="web-slots"><span>09:00</span><span>10:00</span><span className="web-pick">11:30</span></In>
      <In d={3300} className="web-done"><span className="web-tick"><Check size={20}/></span><div><strong>Appointment booked!</strong><span>General consultation · Saturday, 11:30</span><small>A confirmation and reminder are on their way.</small></div><time>10:25</time></In>
    </div>
    <div className="web-input"><Paperclip size={19}/><span>Send a message…</span><span className="web-send"><SendHorizontal size={18}/></span></div>
  </div>;
}

/* 03 Support: the AI calling agent answers an institute's admissions line (edtech focus). */
function CallMock(){
  const bars=[10,18,12,26,34,20,30,40,24,16,32,22,14,28,18,10];
  return <div className="mk mk-call">
    <div className="call-head"><span className="call-avatar"><GraduationCap size={22}/></span><div><strong>Admissions line · AI calling agent</strong><small><i/>On call · 01:12</small></div><span className="call-live">Live</span></div>
    <div className="call-wave" aria-hidden="true">{bars.map((h,i)=><i key={i} style={{height:h,animationDelay:`${i*70}ms`}}/>)}</div>
    <div className="call-body">
      <In d={100} className="call-line"><span>Student</span><p>“{quotes[2]}”</p></In>
      <In d={1300} className="call-line call-agent"><span>AI calling agent</span><p>“Yes, they are. I can share the fees and timings, or book a call with a counsellor.”</p></In>
      <In d={2300} className="call-order call-enquiry"><UserRound size={18}/><div><strong>Enquiry saved</strong><dl><div><dt>Course</dt><dd>Data Science</dd></div><div><dt>Batch</dt><dd>Weekend</dd></div><div><dt>Follow-up</dt><dd>Counsellor call</dd></div></dl></div></In>
      <In d={3200} className="call-ticket"><CalendarCheck size={15}/>Counsellor call booked for tomorrow</In>
    </div>
    <div className="call-controls"><span><MicOff size={18}/></span><span><Grid3x3 size={18}/></span><span><Volume2 size={18}/></span><span className="call-end"><PhoneOff size={19}/></span></div>
  </div>;
}

/* 04 Bring customers back: a WhatsApp checkout reminder. */
function WhatsAppMock(){
  return <div className="mk mk-wa">
    <div className="wa-head"><ChevronLeft size={22}/><span className="wa-avatar">YS</span><div><strong>Your Store <BadgeCheck size={15}/></strong><small>online</small></div><Video size={20}/><Phone size={18}/><MoreVertical size={19}/></div>
    <div className="wa-body">
      <span className="wa-date">TODAY</span>
      <In d={100} className="wa-msg wa-in wa-template"><span className="wa-art"><ShoppingCart size={26}/></span><p>You left something in your cart. Want to finish your order?</p><small>10:24</small><div className="wa-buttons"><span>Complete my order</span><span>Not now</span></div></In>
      <In d={1000} className="wa-msg wa-out">{quotes[3]}<small>10:26 <CheckCheck size={15}/></small></In>
      <Typing d={1600} className="wa-msg wa-in"/>
      <In d={2700} className="wa-msg wa-in">Yes, it’s still in your cart. Here’s your link to finish the order.<span className="wa-link">yourstore.com/checkout</span><small>10:26</small></In>
      <In d={3400} className="wa-system"><Check size={13}/>Order completed</In>
    </div>
    <div className="wa-input"><span className="wa-field"><Smile size={20}/><span>Message</span><Paperclip size={18}/><Camera size={18}/></span><span className="wa-mic"><Mic size={19}/></span></div>
  </div>;
}

const mockups=[<InstagramMock key="ig"/>,<WebsiteMock key="web"/>,<CallMock key="call"/>,<WhatsAppMock key="wa"/>];
const channels=['Instagram','Clinic website chat','Admissions phone call','WhatsApp'];

export function Journey(){
  const stack=useRef<HTMLDivElement>(null);
  const [active,setActive]=useState(-1);
  useEffect(()=>{
    // The newest card past 60% of the viewport is the active one; it and the cards before it play their mockups.
    let raf=0;
    const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const cards=[...stack.current!.children] as HTMLElement[];let next=-1;cards.forEach((card,i)=>{if(card.getBoundingClientRect().top<innerHeight*.6)next=i});setActive(next)})};
    // Cards pin while stacking; on shorter screens they scale down so a pinned card still fits under the nav.
    const fit=()=>{const el=stack.current!;const card=el.firstElementChild as HTMLElement;const zoom=Number(getComputedStyle(el).getPropertyValue('--fit'))||1;const natural=card.getBoundingClientRect().height/zoom;const lastTop=104+16*(el.children.length-1);const scale=Math.min(1,(innerHeight-lastTop-16)/natural);el.style.setProperty('--fit',String(Math.max(.7,scale)));el.classList.toggle('js-no-pin',scale<.7)};
    const resize=()=>{fit();update()};
    fit();update();addEventListener('scroll',update,{passive:true});addEventListener('resize',resize);
    return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',update);removeEventListener('resize',resize)};
  },[]);
  return <div ref={stack} className="js-stack">
    {copy.journey.stages.map((stage,i)=>{const Icon=icons[i];return <article key={stage.label} className={`js-card${i<=active?' is-live':''}${i<active?' is-behind':''}`} style={{'--i':i} as CSSProperties} aria-labelledby={`stage-${i}`}>
      <div className="js-copy">
        <span className="js-kicker"><span className="js-icon"><Icon size={20}/></span><span>0{i+1}</span><span className="js-slash">/</span>{stage.label}</span>
        <h3 id={`stage-${i}`}>{stage.title}</h3>
        <p>{stage.paragraphs[0]}</p>
        <blockquote className="js-quote"><p>“{quotes[i]}”</p><cite>Example customer message · {channels[i]}</cite></blockquote>
        <ul className="js-chips">{stage.items.map(item=><li key={item.title}><span><Check size={13}/></span>{item.title}</li>)}</ul>
      </div>
      <div className="js-mock" aria-hidden="true">{mockups[i]}<span className="js-illus">Illustration</span></div>
    </article>})}
  </div>;
}
