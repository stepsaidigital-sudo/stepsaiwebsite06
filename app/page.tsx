'use client';
import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Globe, Camera, Send, Check, Plus, Minus, Menu, X, Play, RotateCcw, CalendarDays, ShoppingBag, Users, FileText, GitBranch, Headphones, Search, Settings2, Inbox, Paperclip, ShieldCheck, Megaphone, BookOpen, CheckCheck } from 'lucide-react';
import copy from './copy.json';
import {Journey} from './journey';
import {Integrations} from './integrations';
import {TeamStory} from './team-story';
import {Industries} from './industries';
import {Reviews} from './reviews';
import {CustomerQuote as Quote} from './quote';
import {ChannelLogo} from './channel-chat';
import {ProductScene, ScrollPolish} from './showcase';
import {HeroChannels} from './hero-channels';
import {Action,Footer,Header,UnresolvedDialog,openOrGo,type Open} from '@/components/site/shell';

const stageIds=['engage','convert','support','return'];
const channelIcons=[Globe,MessageSquare,Camera,MessageSquare];
function Bubble({children,customer=false,delay=0}:{children:React.ReactNode;customer?:boolean;delay?:number}){return <div className={`bubble ${customer?'customer':'agent'} sequence-item`} style={{animationDelay:`${delay}ms`}}>{children}</div>}
function Hero({onOpen}:Open){return <section className="hero container"><div className="hero-copy"><div className="eyebrow"><span className="tiny-mark"/>{copy.hero.title}</div><h1>Your AI agent for marketing,<br className="desktop-break"/> sales and <span className="highlight">support.</span></h1><p className="hero-description">{copy.hero.paragraphs[1]}</p><div className="channels">{['Website','WhatsApp','Instagram','Messenger'].map((c,i)=>{const Icon=channelIcons[i];return <span key={c}><ChannelLogo channel={c}/>{c}</span>})}</div><Action onOpen={onOpen}/><p className="reassurance">{copy.hero.paragraphs[4]}</p></div><HeroChannels/></section>}
function Intro({title,description}:{title:string;description:string}){return <div className="section-intro"><h2>{title}</h2><p>{description}</p></div>}
function ProductJourney({onOpen}:Open){return <section id="product" className="product-section container"><Intro title={copy.journey.title} description={copy.journey.paragraphs[0]}/><Journey/><div className="section-action"><Action onOpen={onOpen}/></div></section>}
function TeamOverview(){return <TeamStory/>}
function Workflow(){const [tested,setTested]=useState(false);return <div className="workflow"><div className="workflow-toolbar"><span><GitBranch size={18}/> Follow-up workflow</span><button onClick={()=>setTested(!tested)}><Play size={14}/>{tested?'Reset preview':'Test workflow'}</button></div><div className="workflow-canvas"><div className="workflow-node"><MessageSquare size={20}/><div><small>Trigger</small><strong>New customer enquiry</strong></div><Check size={16}/></div><span className="wire"/><div className="workflow-node"><Users size={20}/><div><small>Action</small><strong>Ask and save details</strong></div>{tested&&<Check size={16}/>}</div><span className="wire"/><div className="workflow-node condition"><GitBranch size={20}/><div><small>Condition</small><strong>Needs a person?</strong></div></div><div className="workflow-branches"><div><span>Yes</span><div className="workflow-node"><Headphones size={19}/><strong>Notify your team</strong></div></div><div><span>No</span><div className="workflow-node"><Send size={19}/><strong>Send a reply</strong></div></div></div></div><div className="workflow-status" role="status"><Check size={16}/>{tested?'Preview complete · sample enquiry routed to your team':'Preview the flow before switching it on'}</div></div>}
function Setup({onOpen}:Open){return <section id="setup" className="setup-section container"><Intro title={copy.setup.title} description={copy.setup.paragraphs[0]}/><div className="setup-grid"><div className="setup-content">{copy.setup.items.slice(0,4).map((item,i)=>{const Icon=[FileText,Settings2,GitBranch,Play][i];return <article key={item.title}><Icon size={23}/><div><h3>{item.title}</h3><p>{item.paragraphs[0]}</p></div></article>})}</div><Workflow/></div><Integrations onOpen={onOpen}/><div className="agent-page"><div><h3>{copy.setup.items[5].title}</h3><p>{copy.setup.items[5].paragraphs[0]}</p></div><div className="agent-page-mini"><Globe size={23}/><span>Your business<br/><strong>Your AI agent</strong></span><MessageSquare size={28}/></div></div></section>}
function BusinessFit({onOpen}:Open){return <Industries onOpen={onOpen}/>}
function Testimonials({onOpen}:Open){return <Reviews onOpen={onOpen}/>}
function FAQ({onOpen}:Open){return <section id="faq" className="faq-section container"><div><span className="section-kicker">FAQ</span><h2>{copy.faq.title}</h2></div><div className="faq-list">{copy.faq.items.map((item,i)=><details key={item.title}><summary>{item.title}<Plus size={18}/></summary><p>{item.paragraphs[0]}</p>{i===6&&<button className="text-link" onClick={()=>onOpen('View pricing')}>View pricing</button>}</details>)}</div></section>}
export default function Home(){const [route,setRoute]=useState('');const open=openOrGo(setRoute,true);return <><a className="skip-link" href="#main">Skip to content</a><div id="top"/><Header onOpen={setRoute}/><ScrollPolish/><main id="main"><Hero onOpen={open}/><ProductJourney onOpen={open}/><TeamOverview/><Setup onOpen={open}/><BusinessFit onOpen={open}/><Testimonials onOpen={open}/><FAQ onOpen={open}/><section className="final-section"><div className="container"><img className="final-original" src="/brands/steps-original.png" alt=""/><h2>{copy.final.title}</h2><p>{copy.final.paragraphs[0]}</p><Action onOpen={open} className="yellow"/></div></section></main><Footer onOpen={setRoute}/>{route&&<UnresolvedDialog label={route} close={()=>setRoute('')}/>}</>}




