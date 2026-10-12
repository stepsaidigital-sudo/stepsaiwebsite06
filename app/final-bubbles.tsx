import {Check} from 'lucide-react';
import {ChannelLogo} from './channel-chat';

// Closing section: customer messages from each channel float around the heading, each with its
// "answered" tick. Decorative only; the questions mirror the team-tour mockup.
const bubbles=[
  {channel:'WhatsApp',text:'Where is my order?'},
  {channel:'Instagram',text:'Is this available in blue?'},
  {channel:'Messenger',text:'Can I book for Friday?'},
  {channel:'Website',text:'Do you deliver to Bengaluru?'},
];
export function FinalBubbles(){
  return <div className="final-bubbles" aria-hidden="true">{bubbles.map((b,i)=><div className={`final-bubble final-bubble-${i}`} key={b.channel}><span className="final-bubble-logo"><ChannelLogo channel={b.channel}/></span><span>{b.text}</span><i><Check size={12}/></i></div>)}</div>;
}
