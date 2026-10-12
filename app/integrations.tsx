'use client';
import {useState,type CSSProperties} from 'react';
import {ArrowRight,Pause,Play} from 'lucide-react';
import copy from './copy.json';

// Official logos only (letter-mark placeholders like Klaviyo, Outlook and the carriers stay off the homepage).
// brand = the tint used for each tile's glow.
const apps=[
  {slug:'shopify',name:'Shopify',brand:'#95bf47'},
  {slug:'woocommerce',name:'WooCommerce',brand:'#7f54b3'},
  {slug:'google-calendar',name:'Google Calendar',brand:'#4285f4'},
  {slug:'calendly',name:'Calendly',brand:'#006bff'},
  {slug:'hubspot',name:'HubSpot',brand:'#ff7a59'},
  {slug:'zendesk',name:'Zendesk',brand:'#03363d'},
  {slug:'google-drive',name:'Google Drive',brand:'#0f9d58'},
  {slug:'notion',name:'Notion',brand:'#37352f'},
  {slug:'google-sheets',name:'Google Sheets',brand:'#34a853'},
  {slug:'airtable',name:'Airtable',brand:'#18bfff'},
  {slug:'slack',name:'Slack',brand:'#e01e5a'},
  {slug:'cal-com',name:'Cal.com',brand:'#292929'},
  {slug:'square-appointments',name:'Square Appointments',brand:'#3e4348'},
];
const rows=[[0,2,4,6,8,10,12],[1,3,5,7,9,11,0,4]];

export function Integrations({onOpen}:{onOpen:(label:string)=>void}){
  const [paused,setPaused]=useState(false);
  return <div id="integrations" className="integrations-showcase">
    <div className="integrations-intro"><h3>{copy.setup.items[4].title}</h3><p>{copy.setup.items[4].paragraphs[0]}</p><button className="text-link" onClick={()=>onOpen('View all integrations')}>View all integrations <ArrowRight size={19}/></button></div>
    <div className="integrations-stage">
      <div className="logo-ribbons" data-paused={paused} aria-label="Supported integrations">
        {rows.map((row,r)=><div className={`logo-ribbon ribbon-${r}`} key={r}><div className="logo-track">{[0,1,2].map(repeat=><div className="logo-set" key={repeat} aria-hidden={r>0||repeat>0?true:undefined}>{row.map((index,k)=>{const app=apps[index];return <div className="integration-tile" key={`${index}-${k}`} title={app.name} style={{'--brand':app.brand} as CSSProperties}><img src={`/brands/integrations/${app.slug}.svg`} alt={r===0&&repeat===0?app.name:''} width="64" height="64"/><span>{app.name}</span></div>})}</div>)}</div></div>)}
      </div>
    </div>
    <button className="logo-motion-control" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?<Play size={13}/>:<Pause size={13}/>}<span>{paused?'Resume motion':'Pause motion'}</span></button>
  </div>
}
