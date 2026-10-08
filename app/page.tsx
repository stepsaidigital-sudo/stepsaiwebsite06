'use client';
import { useState } from 'react';
import { Globe, MessageSquare, Plus } from 'lucide-react';
import copy from './copy.json';
import {Journey} from './journey';
import {Integrations} from './integrations';
import {TeamStory} from './team-story';
import {Industries} from './industries';
import {Reviews} from './reviews';
import {ChannelLogo} from './channel-chat';
import {ScrollPolish} from './showcase';
import {HeroChannels} from './hero-channels';
import {SetupStory} from './setup-story';
import {Action,Footer,Header,UnresolvedDialog,openOrGo,type Open} from '@/components/site/shell';

function Hero({onOpen}:Open){return <section className="hero container"><div className="hero-copy"><div className="eyebrow"><span className="tiny-mark"/>{copy.hero.title}</div><h1>Your AI agent for marketing,<br className="desktop-break"/> sales and <span className="highlight">support.</span></h1><p className="hero-description">{copy.hero.paragraphs[1]}</p><div className="channels">{['Website','WhatsApp','Instagram','Messenger'].map(c=><span key={c}><ChannelLogo channel={c}/>{c}</span>)}</div><Action onOpen={onOpen}/><p className="reassurance">{copy.hero.paragraphs[4]}</p></div><HeroChannels/></section>}
function Intro({title,description}:{title:string;description:string}){return <div className="section-intro"><h2>{title}</h2><p>{description}</p></div>}
function ProductJourney({onOpen}:Open){return <section id="product" className="product-section container"><Intro title={copy.journey.title} description={copy.journey.paragraphs[0]}/><Journey/><div className="section-action"><Action onOpen={onOpen}/></div></section>}
function TeamOverview(){return <TeamStory/>}
function Setup({onOpen}:Open){return <section id="setup" className="setup-section container"><Intro title={copy.setup.title} description={copy.setup.paragraphs[0]}/><SetupStory/><Integrations onOpen={onOpen}/><div className="agent-page"><div><h3>{copy.setup.items[5].title}</h3><p>{copy.setup.items[5].paragraphs[0]}</p></div><div className="agent-page-mini"><Globe size={23}/><span>Your business<br/><strong>Your AI agent</strong></span><MessageSquare size={28}/></div></div></section>}
function BusinessFit({onOpen}:Open){return <Industries onOpen={onOpen}/>}
function Testimonials({onOpen}:Open){return <Reviews onOpen={onOpen}/>}
function FAQ({onOpen}:Open){return <section id="faq" className="faq-section container"><div><span className="section-kicker">FAQ</span><h2>{copy.faq.title}</h2></div><div className="faq-list">{copy.faq.items.map((item,i)=><details key={item.title}><summary>{item.title}<Plus size={18}/></summary><p>{item.paragraphs[0]}</p>{i===6&&<button className="text-link" onClick={()=>onOpen('View pricing')}>View pricing</button>}</details>)}</div></section>}
export default function Home(){const [route,setRoute]=useState('');const open=openOrGo(setRoute,true);return <><a className="skip-link" href="#main">Skip to content</a><div id="top"/><Header onOpen={setRoute}/><ScrollPolish/><main id="main"><Hero onOpen={open}/><ProductJourney onOpen={open}/><TeamOverview/><Setup onOpen={open}/><BusinessFit onOpen={open}/><Testimonials onOpen={open}/><FAQ onOpen={open}/><section className="final-section"><div className="container"><img className="final-original" src="/brands/steps-original.png" alt=""/><h2>{copy.final.title}</h2><p>{copy.final.paragraphs[0]}</p><Action onOpen={open} className="yellow"/></div></section></main><Footer onOpen={setRoute}/>{route&&<UnresolvedDialog label={route} close={()=>setRoute('')}/>}</>}

