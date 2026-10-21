'use client';
import {ArrowRight} from 'lucide-react';
import copy from './copy.json';

export function Integrations({onOpen}:{onOpen:(label:string)=>void}){
  return <div id="integrations" className="integrations-showcase">
    <div className="integrations-intro">
      <h3>{copy.setup.items[4].title}</h3>
      <p>{copy.setup.items[4].paragraphs[0]}</p>
      <button className="text-link" onClick={()=>onOpen('View all integrations')}>
        View all integrations <ArrowRight size={19}/>
      </button>
    </div>
    <div className="integrations-stage">
      <div className="integrations-diagram-box">
        <img 
          src="/integrations-diagram.png" 
          alt="Steps AI Integrations: Connect WhatsApp, Instagram, and Website to Shopify, Google Calendar, HubSpot, Shiprocket, and Notion" 
          width={1120} 
          height={480} 
          className="integrations-diagram-img" 
        />
      </div>
    </div>
  </div>;
}

