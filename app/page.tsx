'use client';
import { SplitWords } from '@/components/site/motion';
import { LetterCascade } from '@/components/ui/letter-cascade';
import { HomeMotion } from './home-motion';
import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import copy from './copy.json';
import {Journey} from './journey';
import {Integrations} from './integrations';
import {TeamStory} from './team-story';
import {Industries} from './industries';
import {ClientWall} from '@/components/site/client-wall';
import {ScrollPolish} from './showcase';
import {HeroChannels} from './hero-channels';
import {SetupStory} from './setup-story';
import {Broadcast} from './broadcast';
import {FinalTiles} from './final-tiles';
import {Action,Footer,Header,UnresolvedDialog,openOrGo,type Open} from '@/components/site/shell';

// Same words as before; each one is a span so motion.css can stagger them in.
// Hero title: each word fades in on load (motion.css), and hovering a word flips its letters in a wave (LetterCascade).
function KineticTitle(){const c=(text:string)=><LetterCascade text={text} className="lc-word" staggerDuration={0.03}/>;const w=(text:string,i:number)=><span className="kw" style={{'--i':i} as React.CSSProperties}>{c(text)}</span>;return <h1 className="kinetic-title" aria-label="Your AI agent for marketing, sales and support.">{w('Your',0)} {w('AI',1)} {w('agent',2)} {w('for',3)} {w('marketing,',4)}<br className="desktop-break"/> {w('sales',5)} {w('and',6)} <span className="kw highlight" style={{'--i':7} as React.CSSProperties}>{c('support.')}</span></h1>}
function Hero({onOpen}:Open){return <section className="hero container"><div className="hero-copy"><div className="eyebrow"><span className="tiny-mark"/>{copy.hero.title}</div><KineticTitle/><p className="hero-description">{copy.hero.paragraphs[1]}</p><Action onOpen={onOpen}/><ul className="reassurance reassurance-list">{copy.hero.paragraphs[4].split(/(?<=\.) /).map(point=><li key={point}><Check size={12} strokeWidth={3}/>{point.replace(/\.$/,'')}</li>)}</ul></div><HeroChannels/></section>}
function Intro({title,description}:{title:string;description:string}){return <div className="section-intro"><h2 aria-label={title}><SplitWords text={title}/></h2><p>{description}</p></div>}
function ProductJourney(){return <section id="product" className="product-section journey-band"><div className="container"><Intro title={copy.journey.title} description={copy.journey.paragraphs[0]}/><Journey/></div></section>}
function TeamOverview(){return <TeamStory/>}
function Setup({onOpen}:Open){return <section id="setup" className="setup-section container"><SetupStory/><Integrations onOpen={onOpen}/></section>}
function BusinessFit({onOpen}:Open){return <Industries onOpen={onOpen}/>}
// Real Steps AI clients (no quotes until a client gives one). See components/site/client-wall.tsx.
function Testimonials(){return <section id="stories" className="home-clients"><div className="container"><div className="home-clients-intro"><h2 aria-label={copy.testimonials.title}><SplitWords text={copy.testimonials.title}/></h2><p>{copy.testimonials.paragraphs[0]}</p></div><ClientWall limit={8} compact/><a className="home-clients-all" href="/case-studies/">See all businesses using Steps AI</a></div></section>}
function FAQ({onOpen}:Open){return <section id="faq" className="faq-section container"><div><span className="section-kicker">FAQ</span><h2 aria-label={copy.faq.title}><SplitWords text={copy.faq.title}/></h2></div><div className="faq-list">{copy.faq.items.map((item,i)=><details key={item.title}><summary>{item.title}<Plus size={18}/></summary><p>{item.paragraphs[0]}</p>{i===6&&<button className="text-link" onClick={()=>onOpen('View pricing')}>View pricing</button>}</details>)}</div></section>}
export default function Home(){const [route,setRoute]=useState('');const open=openOrGo(setRoute,true);return <><a className="skip-link" href="#main">Skip to content</a><div id="top"/><Header onOpen={open}/><ScrollPolish/><HomeMotion/><main id="main"><Hero onOpen={open}/><ProductJourney/><BusinessFit onOpen={open}/><TeamOverview/><Setup onOpen={open}/><Broadcast/><Testimonials/><FAQ onOpen={open}/><section className="final-section"><div className="container"><FinalTiles><img className="final-original" src="/brands/steps-original.png" alt=""/><h2 aria-label={copy.final.title}><SplitWords text={copy.final.title}/></h2><p>{copy.final.paragraphs[0]}</p><div><Action onOpen={open} className="yellow"/></div></FinalTiles></div></section></main><Footer onOpen={open}/>{route&&<UnresolvedDialog label={route} close={()=>setRoute('')}/>}</>}

