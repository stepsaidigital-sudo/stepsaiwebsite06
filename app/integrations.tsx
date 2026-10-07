'use client';
import {useState} from 'react';
import {ArrowRight,Pause,Play} from 'lucide-react';
import copy from './copy.json';

const assets=['shopify','woocommerce','google-calendar','calendly','hubspot','zendesk','google-drive','notion'];
export function Integrations({onOpen}:{onOpen:(label:string)=>void}){
  const [paused,setPaused]=useState(false);
  const names=copy.setup.items[4].paragraphs[1].split(' | ');
  const rows=[[0,2,4,6,1,3,5,7],[5,7,1,3,6,0,2,4]];
  return <div id="integrations" className="integrations-showcase">
    <div className="integrations-intro"><h3>{copy.setup.items[4].title}</h3><p>{copy.setup.items[4].paragraphs[0]}</p><button className="text-link" onClick={()=>onOpen('View all integrations')}>View all integrations <ArrowRight size={19}/></button></div>
    <div className="logo-ribbons" data-paused={paused} aria-label="Supported integrations">
      {rows.map((row,r)=><div className={`logo-ribbon ribbon-${r}`} key={r}><div className="logo-track">{[0,1,2].map(repeat=><div className="logo-set" key={repeat} aria-hidden={r>0||repeat>0?true:undefined}>{row.map(index=><div className="integration-tile" key={index} title={names[index]}><img src={`/brands/integrations/${assets[index]}.svg`} alt={r===0&&repeat===0?names[index]:''} width="64" height="64"/><span>{names[index]}</span></div>)}</div>)}</div></div>)}
    </div>
    <button className="logo-motion-control" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?<Play size={13}/>:<Pause size={13}/>}<span>{paused?'Resume motion':'Pause motion'}</span></button>
  </div>
}
