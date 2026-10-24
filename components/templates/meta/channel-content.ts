export type ChatMessage = { sender: 'business' | 'customer'; text: string; time: string };
export type MetaChannel = {
  name: string; icon: string; slug: string; title: string; second: string;
  body: string; business: string; handle: string; messages: ChatMessage[];
};
export const metaChannels: MetaChannel[] = [
  {
    name: 'WhatsApp', icon: 'whatsapp.png', slug: 'whatsapp-ai-agent',
    title: 'An offer starts it.', second: 'A conversation follows.',
    body: 'Send offers and updates. Your agent answers replies and helps customers with their questions.',
    business: 'Linen & Co.', handle: 'Business account',
    messages: [
      { sender: 'business', text: 'Our new linen collection is here. Need help choosing?', time: '10:24' },
      { sender: 'customer', text: 'Do you have a blue shirt in medium?', time: '10:24' },
      { sender: 'business', text: 'Happy to help. Would you like a casual or a formal shirt?', time: '10:25' },
    ],
  },
  {
    name: 'Instagram', icon: 'instagram-icon.png', slug: 'instagram-ai-agent',
    title: 'They ask in a DM.', second: 'Your agent replies.',
    body: 'Answer everyday questions about your business, products and delivery, right in the conversation.',
    business: 'Linen & Co.', handle: 'linenandco · Instagram',
    messages: [
      { sender: 'customer', text: 'Could you please help me?', time: '10:24' },
      { sender: 'business', text: 'Hi! Of course. How can I help?', time: '10:24' },
      { sender: 'customer', text: 'Do you deliver across India? I need it by next Friday.', time: '10:25' },
      { sender: 'business', text: 'Delivery times depend on your location. What is your PIN code?', time: '10:25' },
    ],
  },
  {
    name: 'Messenger', icon: 'messenger.png', slug: 'messenger-ai-agent',
    title: 'A Facebook message.', second: 'A helpful reply.',
    body: 'Help people who message your Facebook page. Bring in your team when the conversation needs a person.',
    business: 'The Everyday Store', handle: 'Typically replies instantly',
    messages: [
      { sender: 'customer', text: 'Can someone help with a large order?', time: '10:24' },
      { sender: 'business', text: 'Of course. What do you have in mind?', time: '10:24' },
      { sender: 'customer', text: 'I need 20 gift sets for our team.', time: '10:25' },
      { sender: 'business', text: 'Happy to help. Share your preferred date and I can pass your enquiry to our team.', time: '10:25' },
    ],
  },
];
