'use client';
import {useEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react';
import {Megaphone,ShoppingBag,Headphones,RotateCcw,Check,CheckCheck,GraduationCap,UserRound,CalendarCheck,Stethoscope,MoreHorizontal,MoreVertical,Paperclip,SendHorizontal,ChevronLeft,Phone,Video,Camera,Mic,MicOff,Smile,Volume2,Grid3x3,PhoneOff,BadgeCheck,ShoppingCart,X,ArrowUpRight,Plus,Send} from 'lucide-react';
import copy from './copy.json';

const icons=[Megaphone,ShoppingBag,Headphones,RotateCcw];
// Example customer messages, one per stage. The same line appears in the card's mockup.
const quotes=['Which one should I buy, the Dune or the Sol vase?','Can I book a doctor’s appointment for Saturday morning?','Are admissions still open for the data science course?','I left something in my cart. Is it still available?'];

// One step of a mockup; --d is its entrance delay once the card is live.
const style=(d:number)=>({'--d':`${d}ms`} as CSSProperties);
const In=({d,className='',children}:{d:number;className?:string;children:ReactNode})=><div className={`js-in ${className}`} style={style(d)}>{children}</div>;
const Typing=({d,className=''}:{d:number;className?:string})=><div className={`js-typing ${className}`} style={style(d)}><i/><i/><i/></div>;

/* 01 Engage: the Steps AI shopping widget on a store website, comparing two products.
   Matches the real widget: Shopper header, sky-blue customer bubbles, product cards, composer. */
const wsProducts=[
  {name:'Sol Ceramic Vase',price:'₹1,890',was:'₹2,690',off:'30% off',crop:true,note:'Wide, steady base. Made for everyday flowers on a bedside or dining table.'},
  {name:'Dune Ceramic Vase',price:'₹2,450',was:'₹3,500',off:'30% off',crop:false,note:'A tall 32 cm silhouette for long stems and statement arrangements.'},
];
function StoreMock(){
  return <div className="mk ws">
    <div className="ws-head"><ChevronLeft size={20}/><span className="ws-av"><UserRound size={18}/><i/></span><div><strong>Shopper</strong><small>Active</small></div><ShoppingCart size={18}/><MoreHorizontal size={18}/><X size={18}/></div>
    <div className="ws-body">
      <In d={100} className="ws-m ws-in">Hello! Need help choosing?</In>
      <In d={600} className="ws-m ws-out">{quotes[0]}</In>
      <Typing d={1100} className="ws-m ws-in"/>
      <In d={2100} className="ws-m ws-in">Go with the <b>Sol Ceramic Vase</b> at <b>₹1,890</b> for a bedside or dining table. The <b>Dune</b> is taller, made for long stems.</In>
      <In d={2600} className="ws-showing">Showing 2 products</In>
      {wsProducts.map((p,i)=><In key={p.name} d={2900+i*300} className="ws-card"><img className={p.crop?'ws-crop':''} src="/industries/ecommerce.png" alt=""/><div><strong>{p.name}<ArrowUpRight size={12}/></strong><span className="ws-price"><b>{p.price}</b><s>{p.was}</s><em>{p.off}</em></span><small>{p.note}</small></div><span className="ws-add"><Plus size={13}/>Add to cart</span></In>)}
    </div>
    <div className="ws-compose"><span>Hop in! I’ll help you</span><i><Mic size={15}/></i><i className="ws-send"><Send size={14}/></i></div>
    <small className="ws-powered">Powered by <b>STEPS AI</b></small>
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

const mockups=[<StoreMock key="store"/>,<WebsiteMock key="web"/>,<CallMock key="call"/>,<WhatsAppMock key="wa"/>];
const channels=['Store website','Clinic website chat','Admissions phone call','WhatsApp'];

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
